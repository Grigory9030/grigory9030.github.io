'use strict';

const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
});
document.querySelector('#main-nav').addEventListener('click', () => menu.setAttribute('aria-expanded', 'false'));
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
let isSet = false;
function units(count) {
  if (!isSet) return integer.format(count) + ' шт.';
  const forms = {one:'сет', few:'сета', many:'сетов', other:'сета'};
  return integer.format(count) + ' ' + forms[russianPlural.select(count)];
}
function verdict(level, text) {
  result.verdict.dataset.level = level;
  result.verdict.textContent = text;
}
function calculate() {
  const valid = Object.values(numberFields).every(input => input.validity.valid && Number.isFinite(input.valueAsNumber));
  result['ad-row'].hidden = true;
  if (!valid) {
    for (const id of ['target','growth','food','profits','ad-cost','discount-label']) result[id].textContent = '—';
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
  const promoFood = promo > 0 ? oneDecimal.format(cost / promo * 100) + '%' : '—';
  result.food.textContent = oneDecimal.format(cost / base * 100) + '% → ' + promoFood;
  let change = '';
  if (regularMargin > 0) {
    const delta = (promoMargin / regularMargin - 1) * 100;
    change = ' (' + (delta > 0 ? '+' : '') + oneDecimal.format(delta) + '%)';
  }
  result.profits.textContent = currency(regularMargin) + ' → ' + currency(promoMargin) + change;
  result['ad-row'].hidden = budget === 0;
  if (budget > 0) {
    result['ad-cost'].textContent = promoMargin > 0
      ? '+' + units(Math.ceil(budget / promoMargin)) + ' за 30 дней сверх базового порога'
      : 'Промо-маржа не покрывает рекламный бюджет.';
  }
  if (promoMargin <= 0) {
    result.target.textContent = 'Недостижима';
    result.growth.textContent = '';
    verdict('loss', promoMargin < 0 ? 'Убыток с каждой продажи. Промо-цена ниже себестоимости.' : 'Нулевая маржа. Каждая продажа покрывает только себестоимость.');
    return;
  }
  if (regularMargin <= 0) {
    result.target.textContent = units(0) + '/день';
    result.growth.textContent = 'Базовая валовая прибыль равна нулю или отрицательна.';
    verdict('risk', 'Сначала проверьте базовую цену и себестоимость. Процент роста от убыточной базы неинформативен.');
    return;
  }
  const multiplier = regularMargin / promoMargin;
  const growth = (multiplier - 1) * 100;
  const target = Math.ceil(volume * regularMargin / promoMargin);
  result.target.textContent = units(target) + '/день';
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
  }
  presetButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.preset === name)));
  calculate();
}
for (const slider of sliders) {
  const input = numberFields[slider.dataset.field];
  slider.dataset.initialMax = slider.max;
  input.addEventListener('input', () => {
    if (input.validity.valid && Number.isFinite(input.valueAsNumber)) {
      slider.max = Math.max(Number(slider.max), input.valueAsNumber);
      slider.value = input.value;
    }
    presetButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
    calculate();
  });
  slider.addEventListener('input', () => {
    input.value = slider.value;
    input.dispatchEvent(new Event('input'));
  });
}
presetButtons.forEach(button => button.addEventListener('click', () => setPreset(button.dataset.preset)));
document.querySelector('#reset-calc').addEventListener('click', () => setPreset('dish'));
setPreset('dish');

