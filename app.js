'use strict';

const {clamp, spring, snap, step, run} = PortfolioMotion;

const t = (key, russian) => PortfolioLanguage.translate(key, russian);
const message = (key, russian, values) => t(key, russian).replace(/\{(\w+)\}/g, (_, name) => values[name]);

function slidingPill(group) {
  const options = [...group.querySelectorAll(':scope > .pill-option')];
  const shape = document.createElement('span');
  shape.className = 'pill-shape';
  shape.setAttribute('aria-hidden', 'true');
  group.prepend(shape);
  const values = Array.from({length:4}, () => spring(0, 340, 26, .1));
  let positioned = false;
  let preview = null;

  function draw(dt) {
    let moving = false;
    for (const value of values) moving = step(value, dt) || moving;
    const [x,y,width,height] = values.map(value => value.value);
    shape.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    shape.style.width = Math.max(0, width) + 'px';
    shape.style.height = Math.max(0, height) + 'px';
    return moving;
  }

  function update() {
    const target = preview ?? options.find(option =>
      option.matches('[aria-current="location"], [aria-pressed="true"], [aria-selected="true"]')
    );
    if (!target?.offsetWidth) {
      shape.hidden = true;
      positioned = false;
      return;
    }
    const next = [target.offsetLeft, target.offsetTop, target.offsetWidth, target.offsetHeight];
    values.forEach((value, index) => { value.target = next[index]; });
    if (positioned) run(draw);
    else {
      values.forEach(value => snap(value));
      draw(0);
      positioned = true;
    }
    shape.hidden = false;
  }

  const observer = new ResizeObserver(update);
  observer.observe(group);
  options.forEach(option => observer.observe(option));
  if (group.matches('nav')) {
    group.addEventListener('pointerover', event => {
      if (event.pointerType !== 'mouse') return;
      const link = event.target.closest('.pill-option');
      if (link) { preview = link; update(); }
    });
    group.addEventListener('pointerleave', () => { preview = null; update(); });
  }
  update();
  return update;
}

const pills = new Map([...document.querySelectorAll('[data-pill]')].map(group => [group, slidingPill(group)]));
document.addEventListener('portfolio:language', () => pills.forEach(update => update()));

function rollText(trigger, labels) {
  const glyphs = labels.flatMap(label => {
    const original = label.textContent;
    const accessible = document.createElement('span');
    accessible.className = 'motion-sr';
    accessible.textContent = original;
    const display = document.createElement('span');
    display.setAttribute('aria-hidden', 'true');
    const glyphs = [];
    for (const part of original.match(/\S+|\s+/gu)) {
      if (!part.trim()) {
        display.append(part);
        continue;
      }
      const word = document.createElement('span');
      word.className = 'roll-word';
      for (const letter of part) {
        const glyph = document.createElement('span');
        glyph.className = 'roll-glyph';
        const strip = document.createElement('span');
        strip.className = 'roll-strip';
        for (let face = 0; face < 2; face++) {
          const side = document.createElement('span');
          side.textContent = letter;
          strip.append(side);
        }
        glyph.append(strip);
        word.append(glyph);
        glyphs.push({strip, state:spring(0, 380, 24)});
      }
      display.append(word);
    }
    label.replaceChildren(accessible, display);
    return glyphs;
  });
  let active = false;
  let hovering = false;
  let focused = false;
  let touched = false;
  let tapTimer;
  let elapsed = 0;
  function draw(dt) {
    elapsed += dt;
    let moving = false;
    glyphs.forEach(({strip, state}, index) => {
      if (dt && elapsed < index * .03) {
        moving = true;
        return;
      }
      state.target = Number(active);
      moving = step(state, dt) || moving;
      strip.style.transform = 'translateY(' + (-50 * state.value) + '%)';
    });
    return moving;
  }
  function sync() {
    const next = hovering || focused || touched;
    if (next === active) return;
    active = next;
    elapsed = 0;
    run(draw);
  }
  trigger.addEventListener('pointerenter', event => { hovering = event.pointerType === 'mouse'; sync(); });
  trigger.addEventListener('pointerleave', () => { hovering = false; sync(); });
  trigger.addEventListener('focus', () => { focused = trigger.matches(':focus-visible'); sync(); });
  trigger.addEventListener('blur', () => { focused = false; sync(); });
  trigger.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') return;
    clearTimeout(tapTimer);
    touched = true;
    sync();
    tapTimer = setTimeout(() => { touched = false; sync(); }, 620);
  });
}

const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
const navLinks = [...nav.querySelectorAll('a')];
const navSections = navLinks.map(link => document.getElementById(link.hash.slice(1)));
const siteHeader = document.querySelector('.site-header');
const pageForMenu = matchMedia('(max-width: 720px)');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  pills.get(nav)();
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) menu.setAttribute('aria-expanded', 'false');
});
document.addEventListener('pointerdown', event => {
  if (pageForMenu.matches && !siteHeader.contains(event.target)) menu.setAttribute('aria-expanded', 'false');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

let currentSection = -1;
let scrollFrame = 0;
function syncNavigation() {
  scrollFrame = 0;
  const anchorLine = siteHeader.getBoundingClientRect().bottom + 64;
  let current = 0;
  navSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= anchorLine) current = index;
  });
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
    current = navSections.length - 1;
  }
  if (current === currentSection) return;
  currentSection = current;
  navLinks.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pills.get(nav)();
}
function queueNavigation() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncNavigation);
}
window.addEventListener('scroll', queueNavigation, {passive:true});
window.addEventListener('resize', queueNavigation);
window.addEventListener('hashchange', queueNavigation);
document.addEventListener('portfolio:language', queueNavigation);
syncNavigation();

const lightbox = document.querySelector('#lightbox');
const stage = lightbox.querySelector('.image-stage');
const zoom = document.querySelector('#zoom');
document.querySelector('#show-dashboard').addEventListener('click', event => {
  if (!lightbox.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  lightbox.showModal();
  document.querySelector('#close-viewer').focus();
});
zoom.addEventListener('click', () => {
  const zoomed = stage.classList.toggle('zoomed');
  zoom.setAttribute('aria-pressed', String(zoomed));
  zoom.textContent = zoomed ? t('fit','Вписать в экран') : t('zoom','Увеличить');
});
document.querySelector('#close-viewer').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('close', () => {
  stage.classList.remove('zoomed');
  zoom.setAttribute('aria-pressed', 'false');
  zoom.textContent = t('zoom','Увеличить');
});

document.addEventListener('portfolio:language', () => {
  zoom.textContent = stage.classList.contains('zoomed') ? t('fit','Вписать в экран') : t('zoom','Увеличить');
});

for (const list of document.querySelectorAll('[role="tablist"]')) {
  const tabs = [...list.querySelectorAll(':scope > [role="tab"]')];
  const vertical = list.getAttribute('aria-orientation') === 'vertical';

  function select(active) {
    for (const tab of tabs) {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    }
    pills.get(list)?.();
  }

  tabs.forEach((tab, index) => {
    if (vertical) rollText(tab, [tab.querySelector('.case-num')]);
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const positions = {
        [vertical ? 'ArrowDown' : 'ArrowRight']:(index + 1) % tabs.length,
        [vertical ? 'ArrowUp' : 'ArrowLeft']:(index + tabs.length - 1) % tabs.length,
        Home:0,
        End:tabs.length - 1
      };
      const next = positions[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
}

const sqlTokens = /--[^\n]*|'(?:[^']|'')*'|\b(?:SELECT|COUNT|DISTINCT|CASE|WHEN|THEN|ELSE|END|AS|SUM|ROUND|NULLIF|FROM|LEFT|JOIN|ON|WHERE|AND|WITH|GROUP|ORDER|BY|COALESCE|OVER|PARTITION|ROW_NUMBER|DESC|ASC)\b|\b\d+(?:\.\d+)?\b/g;
for (const code of document.querySelectorAll('[data-sql]')) {
  const sql = code.textContent;
  const content = document.createDocumentFragment();
  let start = 0;
  for (const token of sql.matchAll(sqlTokens)) {
    content.append(sql.slice(start, token.index));
    const span = document.createElement('span');
    const value = token[0];
    span.className = /^[-']/.test(value) ? 'sql-literal' : /^\d/.test(value) ? 'sql-number' : 'sql-keyword';
    span.textContent = value;
    content.append(span);
    start = token.index + value.length;
  }
  content.append(sql.slice(start));
  code.replaceChildren(content);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(value); return; }
    catch { /* The fallback also supports file previews. */ }
  }
  const input = document.createElement('textarea');
  input.className = 'clipboard-fallback';
  input.value = value;
  input.setAttribute('readonly', '');
  document.body.append(input);
  input.select();
  try {
    if (!document.execCommand('copy')) throw new Error('Copy unavailable');
  } finally {
    input.remove();
  }
}

const copyStatus = document.getElementById('copy-status');
for (const button of document.querySelectorAll('[data-copy-sql]')) {
  let resetTimer;
  function resetCopy() {
    clearTimeout(resetTimer);
    button.removeAttribute('data-copied');
    button.textContent = t('copy','Копировать');
    copyStatus.textContent = '';
  }

  button.addEventListener('click', async () => {
    resetCopy();
    const query = button.closest('.code-card').querySelector('code').textContent;
    try {
      await copyText(query);
      button.dataset.copied = 'true';
      button.textContent = t('copied','Скопировано');
      copyStatus.textContent = button.textContent;
    } catch {
      copyStatus.textContent = t('copyFail','Буфер обмена недоступен. Выделите и скопируйте SQL вручную.');
    } finally {
      button.focus({preventScroll:true});
      resetTimer = setTimeout(resetCopy, 2200);
    }
  });
  document.addEventListener('portfolio:language', resetCopy);
}

const presets = {
  dish: {base:120, cost:30, promo:69, volume:36, budget:0},
  set: {base:1200, cost:240, promo:900, volume:20, budget:0},
  coupon: {base:1000, cost:250, promo:850, volume:40, budget:36000},
  gift: {base:1300, cost:780, promo:1500, volume:40, budget:0, gift:120}
};
const presetButtons = [...document.querySelectorAll('[data-preset]')];
const sliders = [...document.querySelectorAll('[data-field]')];
const numberFields = Object.fromEntries(sliders.map(slider => [slider.dataset.field, document.getElementById(slider.dataset.field)]));
const result = Object.fromEntries(['target','growth','food','profits','ad-row','ad-cost','ad-total-row','ad-total','verdict','discount-label'].map(id => [id, document.getElementById(id)]));
const budgetDays = 30;
const currency = cents => money.format(cents / 100) + ' ' + t('currency','₽');
let integer, money, oneDecimal, ratio, plural;
function updateFormats() {
  const locale = PortfolioLanguage.language === 'en' ? 'en-US' : 'ru-RU';
  integer = new Intl.NumberFormat(locale);
  money = new Intl.NumberFormat(locale, {maximumFractionDigits:2});
  oneDecimal = new Intl.NumberFormat(locale, {minimumFractionDigits:1, maximumFractionDigits:1});
  ratio = new Intl.NumberFormat(locale, {minimumFractionDigits:2, maximumFractionDigits:2});
  plural = new Intl.PluralRules(locale);
}
updateFormats();

function jellySlider(input) {
  const rail = document.createElement('div');
  rail.className = 'jelly-range';
  const art = document.createElement('div');
  art.className = 'jelly-art';
  art.setAttribute('aria-hidden', 'true');
  art.innerHTML = '<span class="jelly-track"><span></span></span>' +
    '<span class="jelly-blobs"><span class="jelly-drop"></span><span class="jelly-thumb"></span></span>' +
    '<span class="jelly-value"></span>';
  input.before(rail);
  rail.append(art, input);
  const fill = art.querySelector('.jelly-track span');
  const blobs = art.querySelector('.jelly-blobs');
  const thumb = art.querySelector('.jelly-thumb');
  const drop = art.querySelector('.jelly-drop');
  const bubble = art.querySelector('.jelly-value');
  const x = spring(0, 900, 50, .02);
  const trail = spring(0, 260, 18, .04);
  const lift = spring(0, 420, 22);
  const press = spring(1, 520, 16);
  const radius = 11;
  let width = rail.clientWidth;
  let pointer = null;
  let hover = false;
  let overdrag = 0;
  let tracking = false;
  const travel = () => Math.max(1, width - 2 * radius);
  const valueX = () => radius + travel() * ((input.valueAsNumber - Number(input.min)) /
    (Number(input.max) - Number(input.min)));
  snap(x, valueX());
  snap(trail, x.value);

  function draw(dt) {
    const movingX = step(x, dt);
    trail.target = x.value;
    const movingTrail = step(trail, dt);
    const lifting = step(lift, dt);
    const pressing = step(press, dt);
    const stretch = 1 + Math.min(Math.abs(x.velocity) / 2400, .4);
    const lag = clamp(trail.value - x.value, -14, 14);
    const rise = -34 * lift.value;
    const alpha = clamp((lift.value - .25) / .65, 0, 1);
    const scale = Math.max(.5, .5 + .5 * lift.value);
    blobs.style.transform = 'translateX(' + x.value + 'px)';
    thumb.style.transform = 'scale(' + (stretch * press.value) + ',' + (press.value / stretch) + ')';
    drop.style.transform = 'translate(' + lag + 'px,' + rise + 'px) scale(' + scale + ')';
    bubble.style.setProperty('--bubble-x', (x.value + lag) + 'px');
    bubble.style.transform = 'translateY(' + rise + 'px) rotate(' + clamp(lag * .8, -12, 12) + 'deg)';
    bubble.style.opacity = alpha;
    fill.style.transform = 'scaleX(' + clamp((x.value - radius) / travel(), 0, 1) + ')';
    rail.classList.toggle('jelly-lifted', lift.value > .02);
    return movingX || movingTrail || lifting || pressing;
  }

  function sync() {
    x.target = valueX() + overdrag;
    lift.target = tracking || input.matches(':focus-visible') ? 1 : 0;
    press.target = tracking ? 1.16 : hover ? 1.08 : 1;
    const text = money.format(input.valueAsNumber);
    if (bubble.textContent !== text) {
      bubble.textContent = text;
      bubble.style.setProperty('--bubble-half', (text.length * .5 + 1.15) + 'ch');
    }
    run(draw);
  }

  function move(event) {
    const px = event.clientX - rail.getBoundingClientRect().left;
    const bounded = clamp(px, radius, radius + travel());
    const excess = px - bounded;
    overdrag = Math.sign(excess) * (1 - 1 / (1 + Math.abs(excess) * .55 / 12)) * 12;
    const from = Number(input.min);
    const before = input.value;
    input.valueAsNumber = from + (bounded - radius) / travel() * (Number(input.max) - from);
    if (input.value !== before) input.dispatchEvent(new Event('input', {bubbles:true}));
    else sync();
  }
  rail.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    pointer = event.pointerId;
    tracking = true;
    rail.setPointerCapture(pointer);
    input.focus({preventScroll:true});
    x.stiffness = 900;
    x.damping = 50;
    move(event);
  });
  rail.addEventListener('pointermove', event => { if (pointer === event.pointerId) move(event); });
  function release(event) {
    if (pointer !== event.pointerId) return;
    pointer = null;
    tracking = false;
    overdrag = 0;
    x.stiffness = 300;
    x.damping = 14;
    sync();
  }
  for (const type of ['pointerup','pointercancel','lostpointercapture']) rail.addEventListener(type, release);
  rail.addEventListener('pointerenter', event => { hover = event.pointerType === 'mouse'; sync(); });
  rail.addEventListener('pointerleave', () => { hover = false; sync(); });
  input.addEventListener('focus', sync);
  input.addEventListener('blur', sync);
  input.addEventListener('keydown', () => {
    x.stiffness = 420;
    x.damping = 34;
  });
  new ResizeObserver(() => {
    width = rail.clientWidth;
    snap(x, valueX() + overdrag);
    snap(trail, x.value);
    sync();
  }).observe(rail);
  sync();
  return {sync, get dragging() { return tracking; }};
}

function statMetric(element, format) {
  const visible = document.createElement('span');
  visible.className = 'stat-value';
  visible.setAttribute('aria-hidden', 'true');
  const exact = document.createElement('span');
  exact.className = 'motion-sr';
  element.append(visible, exact);
  const progress = spring(1, 160, 22);
  let shown = [];
  let from = [];
  let to = [];
  function draw(dt) {
    if (!to.length) return false;
    const moving = step(progress, dt);
    shown = moving ? to.map((value, index) => from[index] + (value - from[index]) * progress.value) : to;
    const text = format(shown);
    if (visible.textContent !== text) visible.textContent = text;
    return moving;
  }
  return (values, immediate) => {
    const numeric = Array.isArray(values);
    const text = numeric ? format(values) : values;
    if (exact.textContent === text && !immediate) return;
    exact.textContent = text;
    to = numeric ? values : [];
    if (immediate || !numeric || shown.length !== to.length) {
      shown = to;
      snap(progress, 1);
      if (visible.textContent !== text) visible.textContent = text;
      return;
    }
    from = shown;
    snap(progress, 0);
    progress.target = 1;
    run(draw);
  };
}

const jelly = new Map(sliders.map(slider => [slider, jellySlider(slider)]));
const perDay = () => t('perDay','/день');
const targetMetric = statMetric(result.target, ([target]) => units(Math.round(target)) + perDay());
const percent = value => oneDecimal.format(value) + '%';
const costMetric = statMetric(result.food, ([normal, promo]) =>
  percent(normal) + ' → ' + (promo === undefined ? '-' : percent(promo)));
const marginMetric = statMetric(result.profits, ([normal, promo, delta]) =>
  currency(normal) + ' → ' + currency(promo) +
  (delta === undefined ? '' : ' (' + (delta > 0 ? '+' : '') + percent(delta) + ')'));
let mode = 'dish';
let lastManualInput = -Infinity;

const nameForms = {
  ru: {
    set:{one:'комплект', few:'комплекта', many:'комплектов', other:'комплекта'},
    gift:{one:'заказ', few:'заказа', many:'заказов', other:'заказа'}
  },
  en: {
    set:{one:'bundle', other:'bundles'}, gift:{one:'order', other:'orders'},
    dish:{one:'unit', other:'units'}, coupon:{one:'unit', other:'units'}
  }
};

function units(count, formatter = integer) {
  const forms = nameForms[PortfolioLanguage.language][mode];
  return formatter.format(count) + ' ' + (forms?.[plural.select(count)] ?? 'шт.');
}

function verdict(level, text) {
  result.verdict.dataset.level = level;
  result.verdict.textContent = text;
}

function emptyResult(text) {
  for (const update of [targetMetric, costMetric, marginMetric]) update('-', true);
  for (const id of ['growth','discount-label']) result[id].textContent = '-';
  verdict('risk', text);
}

function calculate(immediate = false) {
  const valid = Object.values(numberFields).every(input =>
    input.disabled || (input.validity.valid && Number.isFinite(input.valueAsNumber))
  );
  result['ad-row'].hidden = true;
  result['ad-total-row'].hidden = true;
  if (!valid) {
    emptyResult(t('invalidCalc','Проверьте поля. Базовая цена и объем должны быть положительными. Себестоимость, промо-цена, подарок и бюджет - от нуля.'));
    return;
  }

  // Use cents so equal prices and costs produce exactly zero margin.
  const base = Math.round(numberFields.base.valueAsNumber * 100);
  const cost = Math.round(numberFields.cost.valueAsNumber * 100);
  const promo = Math.round(numberFields.promo.valueAsNumber * 100);
  const budget = Math.round(numberFields.budget.valueAsNumber * 100);
  const volume = numberFields.volume.valueAsNumber;
  const isGift = mode === 'gift';
  if (isGift && promo < base) {
    emptyResult(t('giftBelowBase','Укажите порог подарка на уровне базового среднего чека или выше.'));
    return;
  }
  const giftCost = isGift ? Math.round(numberFields.gift.valueAsNumber * 100) : 0;
  // Assume the base cost share also applies to the projected qualifying basket.
  const promoCost = isGift ? Math.round(promo * cost / base) + giftCost : cost;
  const regularMargin = base - cost;
  const promoMargin = promo - promoCost;
  if (isGift) {
    result['discount-label'].textContent = t('giftPercent','Стоимость подарка от суммы корзины ') + percent(giftCost / promo * 100);
  } else {
    const discount = (1 - promo / base) * 100;
    result['discount-label'].textContent = (discount >= 0 ? t('discountWord','Скидка ') : t('markupWord','Наценка ')) + percent(Math.abs(discount));
  }
  const shares = [cost / base * 100];
  if (promo > 0) shares.push(promoCost / promo * 100);
  costMetric(shares, immediate);
  const margins = [regularMargin, promoMargin];
  if (regularMargin > 0) margins.push((promoMargin / regularMargin - 1) * 100);
  marginMetric(margins, immediate);

  if (budget > 0) {
    result['ad-row'].hidden = false;
    const extra = promoMargin > 0 ? Math.ceil(budget / promoMargin) : 0;
    result['ad-cost'].textContent = promoMargin > 0
      ? message('adExtra','{extra} за 30 дней ({daily}/день в среднем)', {extra:'+'+units(extra), daily:'+'+units(extra / budgetDays, money)})
      : t('adImpossible','Промо-маржа не покрывает рекламный бюджет.');
  }
  if (promoMargin <= 0) {
    targetMetric(t('impossible','Недостижима'), true);
    result.growth.textContent = '';
    verdict('loss', promoMargin < 0 ? t('loss','Убыток с каждой продажи. Промо-цена ниже себестоимости.') :
      t('zeroMargin','Нулевая маржа. Каждая продажа покрывает только себестоимость.'));
    return;
  }
  if (regularMargin <= 0) {
    targetMetric([0], true);
    result.growth.textContent = t('baseLoss','Базовая валовая прибыль равна нулю или отрицательна.');
    verdict('risk', t('fixBase','Сначала проверьте базовую цену и себестоимость. Процент роста от убыточной базы неинформативен.'));
    return;
  }
  const multiplier = regularMargin / promoMargin;
  const growth = Math.round((multiplier - 1) * 100);
  const target = Math.ceil(volume * regularMargin / promoMargin);
  targetMetric([target], immediate);
  result.growth.textContent = message('growth','{ratio} / {growth}% к базовому объему, без бюджета',
    {ratio:'×'+ratio.format(multiplier), growth:(growth > 0 ? '+' : '')+integer.format(growth)});
  const periodProfit = volume * regularMargin * budgetDays + budget;
  const targetWithBudget = budget ? Math.ceil(periodProfit / (promoMargin * budgetDays)) : target;
  if (budget) {
    result['ad-total'].textContent = units(targetWithBudget) + perDay();
    result['ad-total-row'].hidden = false;
  }
  if (periodProfit * 100 > volume * promoMargin * budgetDays * 180) {
    verdict('risk', t('highRisk','Высокий риск просадки валовой прибыли. Нужен рост более 80%. Проверьте вариант с жестким лимитом или доплатой.'));
  } else {
    const advice = budget
      ? message('workableBudget','Цель для сохранения базовой валовой прибыли с учетом бюджета - от {units} в день.', {units:units(targetWithBudget)})
      : message('workable','Цель для сохранения базовой валовой прибыли - от {units} в день.', {units:units(targetWithBudget)});
    verdict('ok', advice);
  }
}

function syncCalcLabels() {
  const isGift = mode === 'gift';
  const labels = {
    base:isGift ? t('baseBasket','Средний чек до акции') : t('basePrice','Базовая цена'),
    cost:isGift ? t('basketCost','Себестоимость корзины до акции') : t('skuCost','Себестоимость SKU'),
    promo:isGift ? t('basketThreshold','Порог корзины / расчетный чек') : t('promoPrice','Промо-цена'),
    volume:isGift ? t('basketVolume','Заказы в день до акции') : t('baseVolume','Базовые продажи в день'),
    gift:t('giftCost','Себестоимость подарка'),
    budget:t('budget','Рекламный бюджет на 30 дней')
  };
  for (const slider of sliders) {
    const id = slider.dataset.field;
    document.getElementById(id + '-label').textContent = labels[id];
    slider.setAttribute('aria-label', labels[id] + ', ' + t('slider','ползунок'));
  }
  document.getElementById('volume-unit').textContent = isGift ? t('orderUnit','заказы') :
    mode === 'set' ? t('bundleUnit','комплекты') : t('itemUnit','шт.');
  document.getElementById('margin-label').textContent = isGift ? t('marginBasket','Валовая маржа с корзины до / в акции') :
    t('marginBeforeAfter','Валовая маржа с единицы до / в акции');
}

function setPreset(name) {
  mode = name;
  const isGift = mode === 'gift';
  document.getElementById('unit-note').hidden = mode !== 'set';
  document.getElementById('gift-note').hidden = !isGift;
  document.getElementById('gift-control').hidden = !isGift;
  numberFields.gift.disabled = !isGift;
  for (const slider of sliders) {
    const id = slider.dataset.field;
    if (id === 'gift') slider.disabled = !isGift;
    slider.max = slider.dataset.initialMax;
    numberFields[id].value = presets[name][id] ?? 0;
    slider.value = numberFields[id].value;
    jelly.get(slider).sync();
  }
  for (const button of presetButtons) button.setAttribute('aria-pressed', String(button.dataset.preset === name));
  syncCalcLabels();
  calculate();
}

function manualInput(dragging = false) {
  presetButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  const now = performance.now();
  calculate(dragging || now - lastManualInput < 80);
  lastManualInput = now;
}

for (const slider of sliders) {
  const input = numberFields[slider.dataset.field];
  slider.dataset.initialMax = slider.max;
  input.addEventListener('input', () => {
    if (input.validity.valid && Number.isFinite(input.valueAsNumber)) {
      slider.max = Math.max(Number(slider.max), input.valueAsNumber);
      slider.value = input.value;
      jelly.get(slider).sync();
    }
    manualInput();
  });
  slider.addEventListener('input', () => {
    input.value = slider.value;
    const view = jelly.get(slider);
    view.sync();
    manualInput(view.dragging);
  });
}
for (const button of presetButtons) button.addEventListener('click', () => setPreset(button.dataset.preset));
document.getElementById('reset-calc').addEventListener('click', () => setPreset('dish'));
document.getElementById('calc-form').addEventListener('submit', event => event.preventDefault());
document.addEventListener('portfolio:language', () => {
  updateFormats();
  syncCalcLabels();
  for (const view of jelly.values()) view.sync();
  calculate(true);
});
setPreset('dish');

