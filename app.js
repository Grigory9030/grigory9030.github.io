'use strict';

const {clamp, spring, snap, step, run} = PortfolioMotion;

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
menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
});
document.querySelector('#main-nav').addEventListener('click', () => menu.setAttribute('aria-expanded', 'false'));
for (const link of document.querySelectorAll('#main-nav a')) rollText(link, [link]);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

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
  zoom.textContent = zoomed ? 'Вписать в экран' : 'Увеличить';
});
document.querySelector('#close-viewer').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('close', () => {
  stage.classList.remove('zoomed');
  zoom.setAttribute('aria-pressed', 'false');
  zoom.textContent = 'Увеличить';
});

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function showCase(active) {
  for (const tab of tabs) {
    const selected = tab === active;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
}
tabs.forEach((tab, index) => {
  rollText(tab, [tab.querySelector('.case-num'), tab.querySelector('b')]);
  tab.addEventListener('click', () => showCase(tab));
  tab.addEventListener('keydown', event => {
    const next = {ArrowDown:(index + 1) % tabs.length, ArrowUp:(index + tabs.length - 1) % tabs.length, Home:0, End:tabs.length - 1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    showCase(tabs[next]);
    tabs[next].focus();
  });
});

const presets = {
  dish: {base:120, cost:30, promo:69, volume:36, budget:0},
  set: {base:1200, cost:240, promo:900, volume:20, budget:0}
};
const presetButtons = [...document.querySelectorAll('[data-preset]')];
const sliders = [...document.querySelectorAll('[data-field]')];
const numberFields = Object.fromEntries(sliders.map(slider => [slider.dataset.field, document.getElementById(slider.dataset.field)]));
const result = Object.fromEntries(['target','growth','food','profits','ad-row','ad-cost','verdict','discount-label'].map(id => [id, document.getElementById(id)]));
const integer = new Intl.NumberFormat('ru');
const money = new Intl.NumberFormat('ru', {minimumFractionDigits:0, maximumFractionDigits:2});
const oneDecimal = new Intl.NumberFormat('ru', {minimumFractionDigits:1, maximumFractionDigits:1});
const ratio = new Intl.NumberFormat('ru', {minimumFractionDigits:2, maximumFractionDigits:2});
const currency = cents => money.format(cents / 100) + ' ₽';
const russianPlural = new Intl.PluralRules('ru');

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
const targetMetric = statMetric(result.target, ([target]) => units(Math.round(target)) + '/день');
const percent = value => oneDecimal.format(value) + '%';
const foodMetric = statMetric(result.food, ([normal, promo]) =>
  percent(normal) + ' → ' + (promo === undefined ? '—' : percent(promo)));
const marginMetric = statMetric(result.profits, ([normal, promo, delta]) =>
  currency(normal) + ' → ' + currency(promo) +
  (delta === undefined ? '' : ' (' + (delta > 0 ? '+' : '') + percent(delta) + ')'));
let isSet = false;
let lastManualInput = -Infinity;
function units(count) {
  if (!isSet) return integer.format(count) + ' шт.';
  const forms = {one:'сет', few:'сета', many:'сетов', other:'сета'};
  return integer.format(count) + ' ' + forms[russianPlural.select(count)];
}
function verdict(level, text) {
  result.verdict.dataset.level = level;
  result.verdict.textContent = text;
}
function calculate(immediate = false) {
  const valid = Object.values(numberFields).every(input => input.validity.valid && Number.isFinite(input.valueAsNumber));
  result['ad-row'].hidden = true;
  if (!valid) {
    for (const update of [targetMetric, foodMetric, marginMetric]) update('—', true);
    for (const id of ['growth','ad-cost','discount-label']) result[id].textContent = '—';
    verdict('risk', 'Проверьте поля. Базовая цена и объем должны быть положительными, себестоимость, промо-цена и бюджет — от нуля.');
    return;
  }

  // Currency in cents keeps equal prices and costs exactly equal.
  const base = Math.round(numberFields.base.valueAsNumber * 100);
  const cost = Math.round(numberFields.cost.valueAsNumber * 100);
  const promo = Math.round(numberFields.promo.valueAsNumber * 100);
  const budget = Math.round(numberFields.budget.valueAsNumber * 100);
  const volume = numberFields.volume.valueAsNumber;
  const regularMargin = base - cost;
  const promoMargin = promo - cost;
  const discount = (1 - promo / base) * 100;
  result['discount-label'].textContent = (discount >= 0 ? 'Скидка ' : 'Наценка ') + oneDecimal.format(Math.abs(discount)) + '%';
  const food = [cost / base * 100];
  if (promo > 0) food.push(cost / promo * 100);
  foodMetric(food, immediate);
  const margins = [regularMargin, promoMargin];
  if (regularMargin > 0) margins.push((promoMargin / regularMargin - 1) * 100);
  marginMetric(margins, immediate);
  result['ad-row'].hidden = budget === 0;
  if (budget > 0) {
    result['ad-cost'].textContent = promoMargin > 0
      ? '+' + units(Math.ceil(budget / promoMargin)) + ' за 30 дней сверх базового порога'
      : 'Промо-маржа не покрывает рекламный бюджет.';
  }
  if (promoMargin <= 0) {
    targetMetric('Недостижима', true);
    result.growth.textContent = '';
    verdict('loss', promoMargin < 0 ? 'Убыток с каждой продажи. Промо-цена ниже себестоимости.' : 'Нулевая маржа. Каждая продажа покрывает только себестоимость.');
    return;
  }
  if (regularMargin <= 0) {
    targetMetric([0], true);
    result.growth.textContent = 'Базовая валовая прибыль равна нулю или отрицательна.';
    verdict('risk', 'Сначала проверьте базовую цену и себестоимость. Процент роста от убыточной базы неинформативен.');
    return;
  }
  const multiplier = regularMargin / promoMargin;
  const growth = (multiplier - 1) * 100;
  const target = Math.ceil(volume * regularMargin / promoMargin);
  targetMetric([target], immediate);
  result.growth.textContent = '×' + ratio.format(multiplier) + ' / ' + (growth > 0 ? '+' : '') + integer.format(Math.round(growth)) + '% к базовому объему, без бюджета';
  if (regularMargin * 100 > promoMargin * 180) {
    verdict('risk', 'Высокий риск просадки валовой прибыли. Нужен рост более 80%. Проверьте вариант с жестким лимитом или доплатой.');
  } else {
    verdict('ok', 'Промо-маржа положительная. При указанном объеме акция сохраняет базовую валовую прибыль.');
  }
}

function setPreset(name) {
  isSet = name === 'set';
  document.querySelector('#unit-note').hidden = name !== 'set';
  for (const slider of sliders) {
    const id = slider.dataset.field;
    slider.max = slider.dataset.initialMax;
    numberFields[id].value = presets[name][id];
    slider.value = presets[name][id];
    jelly.get(slider).sync();
  }
  presetButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.preset === name)));
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
presetButtons.forEach(button => button.addEventListener('click', () => setPreset(button.dataset.preset)));
document.querySelector('#reset-calc').addEventListener('click', () => setPreset('dish'));
setPreset('dish');

