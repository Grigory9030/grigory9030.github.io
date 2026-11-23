'use strict';

const SEED = [
  {
    "id": 1,
    "branch": "Сеть (24 точки)",
    "title": "Внедрение скрипта кассовой допродажи напитка к комбо",
    "channel": "Кассовые допродажи",
    "owner": "Григорий (Маркетинг)",
    "deadline": "28.11.2026",
    "budgetText": "0 ₽ (скрипт и памятки)",
    "budgetNum": 0,
    "kpiTarget": "Допродажи >= 52% чеков",
    "status": "Контроль факта",
    "priority": "Высокий",
    "note": "По выгрузке OLAP за 3 недели доля выросла с 38% до 51,4%. В 4 отстающих точках назначен повторный разбор с управляющими."
  },
  {
    "id": 2,
    "branch": "Кластер Юг (8 точек)",
    "title": "Оптимизация раздачи флаеров у ТРЦ по CPA доп. чека",
    "channel": "BTL и промоутеры",
    "owner": "Григорий (Маркетинг)",
    "deadline": "30.11.2026",
    "budgetText": "95 000 ₽",
    "budgetNum": 95000,
    "kpiTarget": "CPA доп. чека <= 190 ₽",
    "status": "В работе",
    "priority": "Высокий",
    "note": "Отключили 5 убыточных точек раздачи с CPA выше 420 ₽, бюджет перераспределен на 3 локации с подтвержденным возвратом купонов."
  },
  {
    "id": 3,
    "branch": "ТРЦ Галерея",
    "title": "Запуск welcome-оффера «500 баллов» через QR на столах",
    "channel": "CRM и лояльность",
    "owner": "Анна (Дизайн)",
    "deadline": "02.12.2026",
    "budgetText": "24 000 ₽",
    "budgetNum": 24000,
    "kpiTarget": "Конверсия в 1-ю покупку >= 60%",
    "status": "На согласовании",
    "priority": "Высокий",
    "note": "Макет тейбл-тентов с индивидуальным UTM готов, ждет подписи управляющего. Проверить доставку триггера на 7-й день перед стартом."
  },
  {
    "id": 4,
    "branch": "Сеть (24 точки)",
    "title": "Пересчет фудкоста и доплаты для зимнего комбо-сета",
    "channel": "Меню и экономика",
    "owner": "Григорий (Маркетинг)",
    "deadline": "26.11.2026",
    "budgetText": "0 ₽ (финмодель)",
    "budgetNum": 0,
    "kpiTarget": "Фудкост <= 31%, маржа >= 62%",
    "status": "Завершено",
    "priority": "Высокий",
    "note": "Базовый вариант скидки -40% давал просадку маржи на 44%. Пересобрали сет через высокомаржинальный гарнир, точка безубыточности снижена до +18% чеков."
  },
  {
    "id": 5,
    "branch": "Центральный парк",
    "title": "Карта торговой территории (КТТ) и база 25 B2B-партнеров",
    "channel": "Локальный маркетинг / КТТ",
    "owner": "Григорий (Маркетинг)",
    "deadline": "05.12.2026",
    "budgetText": "15 000 ₽",
    "budgetNum": 15000,
    "kpiTarget": "5 кросс-партнерств с отелями и БЦ",
    "status": "В работе",
    "priority": "Средний",
    "note": "Собран реестр ближайших БЦ, отелей и фитнес-клубов в радиусе 700 м. Подготовлены персональные офферы на корпоративные обеды."
  },
  {
    "id": 6,
    "branch": "Доставка (12 зон)",
    "title": "Аудит Яндекс Директа и чистка убыточных кампаний РСЯ",
    "channel": "Контекст / Директ",
    "owner": "Тимур (Трафик)",
    "deadline": "29.11.2026",
    "budgetText": "180 000 ₽",
    "budgetNum": 180000,
    "kpiTarget": "Снизить CPA заказа с 1 650 до <= 950 ₽",
    "status": "Контроль факта",
    "priority": "Высокий",
    "note": "За 6 месяцев Поиск давал CPA 890 ₽ при CR 10,8%, РСЯ — 1 720 ₽ при CR 0,7%. Перенесли 65% бюджета в Поиск и брендовый трафик."
  },
  {
    "id": 7,
    "branch": "ТРЦ Северный",
    "title": "Согласование световой вывески и 4 навигационных стрелок",
    "channel": "Геосервисы и навигация",
    "owner": "Дмитрий (Операции)",
    "deadline": "10.12.2026",
    "budgetText": "68 000 ₽",
    "budgetNum": 68000,
    "kpiTarget": "+12% входящего трафика с 1-го этажа",
    "status": "На согласовании",
    "priority": "Средний",
    "note": "Смета типографии утверждена, ждем письменное разрешение от УК ТРЦ на монтаж двух конструкций у эскалатора."
  },
  {
    "id": 8,
    "branch": "Сеть (24 точки)",
    "title": "Аудит выгрузок кассовой системы: ошибка пробития доставки",
    "channel": "Меню и экономика",
    "owner": "Григорий (Маркетинг)",
    "deadline": "25.11.2026",
    "budgetText": "0 ₽ (аудит)",
    "budgetNum": 0,
    "kpiTarget": "100% корректная наполняемость чека",
    "status": "Завершено",
    "priority": "Высокий",
    "note": "Выявили, что зона доставки пробивалась как 1 ₽ × километры, искажая число позиций в чеке. Передали ТЗ в поддержку кассового ПО, отчет пересобран."
  },
  {
    "id": 9,
    "branch": "Аэропорт / Вокзал",
    "title": "Запуск линейки завтраков и обновление карточек в 2ГИС / Картах",
    "channel": "Геосервисы и навигация",
    "owner": "Анна (Дизайн)",
    "deadline": "04.12.2026",
    "budgetText": "32 000 ₽",
    "budgetNum": 32000,
    "kpiTarget": "+20% маршрутов в утренние часы",
    "status": "К запуску",
    "priority": "Средний",
    "note": "Фотосъемка завершена, тексты и витрина меню готовы к загрузке в Яндекс Бизнес и 2ГИС."
  },
  {
    "id": 10,
    "branch": "Доставка (12 зон)",
    "title": "Цепочка брошенной корзины в CRM (подарок вместо скидки)",
    "channel": "CRM и лояльность",
    "owner": "Григорий (Маркетинг)",
    "deadline": "08.12.2026",
    "budgetText": "12 000 ₽",
    "budgetNum": 12000,
    "kpiTarget": "Возврат >= 9% брошенных корзин",
    "status": "К запуску",
    "priority": "Средний",
    "note": "3 касания (1 ч, 24 ч, 72 ч). Подарочная позиция обходится в 3 раза дешевле прямой скидки -15% по себестоимости."
  },
  {
    "id": 11,
    "branch": "Южный молл",
    "title": "Тест купонной акции «Бизнес-ланч» у соседнего БЦ",
    "channel": "BTL и промоутеры",
    "owner": "Подрядчик (Печать)",
    "deadline": "03.12.2026",
    "budgetText": "28 000 ₽",
    "budgetNum": 28000,
    "kpiTarget": "Конверсия купонов >= 7,5%",
    "status": "В работе",
    "priority": "Низкий",
    "note": "Тираж 1 500 шт. с уникальным промокодом в кассе. Первый замер возврата запланирован через 72 часа после старта раздачи."
  },
  {
    "id": 12,
    "branch": "Сеть (24 точки)",
    "title": "Акция «1+1 на десерты» в пиковые выходные",
    "channel": "Меню и экономика",
    "owner": "Дмитрий (Операции)",
    "deadline": "27.11.2026",
    "budgetText": "40 000 ₽",
    "budgetNum": 40000,
    "kpiTarget": "Рост маржи категории >= +10%",
    "status": "Отменено",
    "priority": "Низкий",
    "note": "Отменена после расчета экономики: в пиковые часы зал и так загружен на 95%, акция отдавала бы маржу существующим гостям без притока новых чеков."
  }
];

const STEPS = [
  "Просчитана экономика акции: фудкост, валовая маржа и точка безубыточности (рост чеков в %).",
  "Выбран уникальный код скидки/промокода в кассовом ПО (iiko / r-keeper) для точного трекинга факта.",
  "Согласованы макеты POSM, юридические условия и минимальный порог чека на носителе.",
  "Проведена тестовая пробивка акции на 1 кассе и проверена корректность выгрузки в OLAP.",
  "Проверена разметка UTM/QR-ссылок и фактическая доставляемость CRM-триггеров на тестовый номер.",
  "Управляющим и кассирам отправлена одностраничная памятка с условиями и скриптом допродажи.",
  "Получен фотоотчет размещения всех носителей в зале и на входе до открытия смены.",
  "Поставлено напоминание на контрольный замер план/факт через 72 часа и итоговый P&L по завершении."
];

const TASK_KEY = 'gk_demo_launches_v1';
const CHECK_KEY = 'gk_demo_launch_checklist_v1';
const STATUSES = ['К запуску', 'В работе', 'На согласовании', 'Контроль факта', 'Завершено', 'Отменено'];
const PRIORITIES = ['Высокий', 'Средний', 'Низкий'];
const CHANNELS = [...new Set(SEED.map(task => task.channel))];
const cash = new Intl.NumberFormat('ru-RU', {maximumFractionDigits:2});
const rub = value => cash.format(value) + ' ₽';
const el = id => document.getElementById(id);
const dateISO = date => date.split('.').reverse().join('-');
const dateRU = date => date.split('-').reverse().join('.');
const initialTasks = () => SEED.map(task => ({...task}));
const initialChecks = () => STEPS.map((_, index) => index < 3);
function validTasks(value) {
  return Array.isArray(value) && value.length > 0 && value.every(task => task && Number.isSafeInteger(task.id) &&
    Object.keys(SEED[0]).every(key => typeof task[key] === typeof SEED[0][key]) &&
    Number.isFinite(task.budgetNum) && task.budgetNum >= 0 && STATUSES.includes(task.status) && PRIORITIES.includes(task.priority)) &&
    new Set(value.map(task => task.id)).size === value.length;
}
function validChecks(value) {
  return Array.isArray(value) && value.length === STEPS.length && value.every(mark => typeof mark === 'boolean');
}

let storageAvailable = true;
let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  el('toast').textContent = message;
  el('toast').classList.add('show');
  toastTimer = setTimeout(() => el('toast').classList.remove('show'), 3000);
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch {
    storageAvailable = false;
    toast('Хранилище недоступно. Изменения действуют только в этой вкладке.');
  }
}
function read(key, validate, fallback) {
  if (!storageAvailable) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const value = JSON.parse(raw);
      if (validate(value)) return value;
    }
  } catch { /* Continue with this tab's valid copy. */ }
  return fallback;
}
let tasks = read(TASK_KEY, validTasks, initialTasks());
let checks = read(CHECK_KEY, validChecks, initialChecks());
write(TASK_KEY, tasks);
write(CHECK_KEY, checks);
let statusFilter = '';
let preset = 'all';
let selectedId = tasks[0].id;
let pane = 'registry';

const popup = el('status-options');
const statusButtons = STATUSES.map((status, index) => {
  const option = document.createElement('div');
  option.id = 'status-option-' + index;
  option.className = 'status-option tone-' + index;
  option.setAttribute('role', 'option');
  option.append(node('span', status), node('span', '✓', 'status-check'));
  option.lastElementChild.setAttribute('aria-hidden', 'true');
  return option;
});
popup.append(...statusButtons);
const dropdownEase = PortfolioMotion.easing(300, 23, 420);
const optionEase = PortfolioMotion.easing(300, 24, 300);
const statusEase = PortfolioMotion.easing(340, 26, 300);
let statusTrigger = null;
let activeOption = 0;
let menuMotion = [];

function stopStatusMotion() {
  for (const animation of menuMotion) animation.cancel();
  menuMotion = [];
}

function positionStatusMenu() {
  const anchor = statusTrigger.getBoundingClientRect();
  const table = statusTrigger.closest('.scroll-table').getBoundingClientRect();
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  if (anchor.bottom <= Math.max(0, table.top) || anchor.top >= Math.min(height, table.bottom) ||
      anchor.right <= Math.max(0, table.left) || anchor.left >= Math.min(width, table.right)) {
    closeStatusMenu();
    return;
  }
  const margin = 8;
  const gap = 6;
  const below = height - anchor.bottom - gap - margin;
  const above = anchor.top - gap - margin;
  const fullHeight = popup.scrollHeight + 2;
  const opensUp = below < fullHeight && above > below;
  const available = opensUp ? above : below;
  const menuWidth = Math.min(width - 2 * margin, Math.max(192, anchor.width));
  const left = PortfolioMotion.clamp(anchor.left, margin, width - margin - menuWidth);
  popup.style.width = menuWidth + 'px';
  popup.style.left = left + 'px';
  popup.style.maxHeight = Math.max(0, available) + 'px';
  popup.style.top = (opensUp ? anchor.top - gap - popup.offsetHeight : anchor.bottom + gap) + 'px';
  popup.style.transformOrigin = opensUp ? 'center bottom' : 'center top';
}

function focusOption(index, scroll = false) {
  activeOption = PortfolioMotion.clamp(index, 0, STATUSES.length - 1);
  statusButtons.forEach((option, i) => option.classList.toggle('active', i === activeOption));
  const option = statusButtons[activeOption];
  statusTrigger.setAttribute('aria-activedescendant', option.id);
  if (scroll) {
    if (option.offsetTop < popup.scrollTop) popup.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > popup.scrollTop + popup.clientHeight) {
      popup.scrollTop = option.offsetTop + option.offsetHeight - popup.clientHeight;
    }
  }
}

function closeStatusMenu() {
  if (!statusTrigger) return;
  stopStatusMotion();
  statusTrigger.setAttribute('aria-expanded', 'false');
  statusTrigger.removeAttribute('aria-activedescendant');
  statusTrigger = null;
  popup.hidden = true;
}

function openStatusMenu(trigger) {
  closeStatusMenu();
  statusTrigger = trigger;
  const selected = Number(trigger.dataset.statusIndex);
  statusButtons.forEach((option, i) => option.setAttribute('aria-selected', String(i === selected)));
  trigger.setAttribute('aria-expanded', 'true');
  popup.hidden = false;
  positionStatusMenu();
  if (!statusTrigger) return;
  focusOption(selected, true);
  if (!PortfolioMotion.reduced.matches) {
    menuMotion.push(popup.animate([
      {transform:'scale(.94, .12)', opacity:.25},
      {transform:'scale(1)', opacity:1}
    ], {duration:420, easing:dropdownEase}));
    statusButtons.forEach((option, index) => {
      menuMotion.push(option.animate([
        {transform:'translateY(-7px)', opacity:0},
        {transform:'translateY(0)', opacity:1}
      ], {duration:300, delay:30 + index * 26, easing:optionEase, fill:'backwards'}));
    });
  }
}

function commitStatus(index) {
  const trigger = statusTrigger;
  const id = Number(trigger.closest('tr').dataset.id);
  closeStatusMenu();
  if (index === Number(trigger.dataset.statusIndex)) return;
  selectedId = id;
  trigger.focus({preventScroll:true});
  updateTask(id, {status:STATUSES[index]});
  if (!PortfolioMotion.reduced.matches) {
    el('row-status-value-' + id)?.animate([
      {transform:'translateY(6px)', opacity:.3},
      {transform:'translateY(0)', opacity:1}
    ], {duration:300, easing:statusEase});
  }
  if (storageAvailable) toast('Статус сохранен');
}

function onStatusKey(event) {
  const open = statusTrigger === event.currentTarget;
  if (event.key === 'Tab') {
    closeStatusMenu();
    return;
  }
  if (event.key === 'Escape' && open) {
    event.preventDefault();
    closeStatusMenu();
    return;
  }
  if (open && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    commitStatus(activeOption);
    return;
  }
  const navigation = {ArrowDown:activeOption + 1, ArrowUp:activeOption - 1, Home:0, End:STATUSES.length - 1};
  if (Object.hasOwn(navigation, event.key)) {
    if (!open && (event.key === 'Home' || event.key === 'End')) return;
    event.preventDefault();
    if (open) focusOption(navigation[event.key], true);
    else openStatusMenu(event.currentTarget);
    return;
  }
  if (open && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    const index = STATUSES.findIndex(status => status.toLowerCase().startsWith(event.key.toLowerCase()));
    if (index !== -1) focusOption(index, true);
  }
}

statusButtons.forEach((option, index) => {
  option.addEventListener('pointerenter', () => { if (statusTrigger) focusOption(index); });
  option.addEventListener('pointerdown', event => { if (event.pointerType === 'mouse') event.preventDefault(); });
  option.addEventListener('click', () => { if (statusTrigger) commitStatus(index); });
});
document.addEventListener('pointerdown', event => {
  if (statusTrigger && !statusTrigger.contains(event.target) && !popup.contains(event.target)) closeStatusMenu();
});
document.addEventListener('focusin', event => {
  if (statusTrigger && event.target !== statusTrigger && !popup.contains(event.target)) closeStatusMenu();
});
window.addEventListener('resize', () => { if (statusTrigger) positionStatusMenu(); });
window.addEventListener('scroll', event => {
  if (statusTrigger && event.target !== popup) positionStatusMenu();
}, {capture:true, passive:true});
PortfolioMotion.reduced.addEventListener('change', () => { if (PortfolioMotion.reduced.matches) stopStatusMotion(); });

function optionList(select, values) {
  select.replaceChildren(...values.map(value => new Option(value, value)));
}
function visibleTasks() {
  const query = el('search').value.trim().toLocaleLowerCase('ru');
  const channel = el('channel').value;
  const sort = el('sort').value;
  return tasks.filter(task => {
    if (statusFilter && task.status !== statusFilter) return false;
    if (channel && task.channel !== channel) return false;
    if (preset === 'high' && task.priority !== 'Высокий') return false;
    if (preset === 'money' && task.budgetNum <= 0) return false;
    return !query || Object.values(task).join(' ').toLocaleLowerCase('ru').includes(query);
  }).sort((a, b) => {
    let difference;
    if (sort === 'budget') difference = b.budgetNum - a.budgetNum;
    else if (sort === 'deadline') difference = dateISO(a.deadline).localeCompare(dateISO(b.deadline));
    else difference = PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);
    return difference || a.id - b.id;
  });
}
function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function renderCounters() {
  const active = tasks.filter(task => STATUSES.indexOf(task.status) < 3);
  el('active-count').textContent = active.length;
  el('active-budget').textContent = rub(active.reduce((sum, task) => sum + task.budgetNum, 0));
  el('done-count').textContent = tasks.filter(task => task.status === 'Контроль факта' || task.status === 'Завершено').length;
  el('total').textContent = '(' + tasks.length + ')';
  for (const button of el('counts').children) {
    const status = button.dataset.status;
    button.lastElementChild.textContent = status ? tasks.filter(task => task.status === status).length : tasks.length;
    button.setAttribute('aria-pressed', String(status === statusFilter));
  }
  for (const button of document.querySelectorAll('.quick-filters button')) {
    button.setAttribute('aria-pressed', String(button.dataset.preset === preset));
  }
}
function createRow(task) {
  const row = document.createElement('tr');
  row.dataset.id = task.id;
  row.classList.toggle('selected', selectedId === task.id);
  const titleButton = node('button', task.title, 'task-title');
  titleButton.type = 'button';
  titleButton.setAttribute('aria-controls','details');
  if (selectedId === task.id) titleButton.setAttribute('aria-current','true');
  const identity = row.insertCell();
  identity.append(titleButton, node('small', task.branch));
  row.insertCell().textContent = task.channel;
  const statusIndex = STATUSES.indexOf(task.status);
  const status = node('button', undefined, 'row-status tone-' + statusIndex);
  status.type = 'button';
  status.dataset.statusIndex = statusIndex;
  status.setAttribute('role', 'combobox');
  status.setAttribute('aria-controls', popup.id);
  status.setAttribute('aria-expanded', 'false');
  status.setAttribute('aria-haspopup', 'listbox');
  status.setAttribute('aria-label', 'Статус: ' + task.title);
  const value = node('span', task.status);
  value.id = 'row-status-value-' + task.id;
  status.setAttribute('aria-describedby', value.id);
  status.append(value);
  status.addEventListener('click', () => {
    if (statusTrigger === status) closeStatusMenu();
    else openStatusMenu(status);
  });
  status.addEventListener('keydown', onStatusKey);
  row.insertCell().append(status);
  row.insertCell().append(node('span', task.priority, 'priority prio-' + PRIORITIES.indexOf(task.priority)));
  row.insertCell().textContent = task.deadline;
  row.insertCell().textContent = rub(task.budgetNum);
  return row;
}
function renderDetails(task) {
  el('details').hidden = !task || pane !== 'registry';
  if (!task) return;
  el('detail-title').textContent = task.title;
  el('detail-meta').textContent = task.branch + ' · ' + task.channel + ' · ' + task.status;
  el('detail-owner').textContent = task.owner;
  el('detail-kpi').textContent = task.kpiTarget;
  el('detail-budget-text').textContent = task.budgetText;
  el('edit-priority').value = task.priority;
  el('edit-deadline').value = dateISO(task.deadline);
  if (Number(el('edit-budget').value) !== task.budgetNum || !el('edit-budget').value) el('edit-budget').value = task.budgetNum;
  if (el('edit-note').value !== task.note) el('edit-note').value = task.note;
}
function render() {
  closeStatusMenu();
  const visible = visibleTasks();
  const selected = visible.find(task => task.id === selectedId) || visible[0];
  selectedId = selected?.id ?? null;
  const focusRow = document.activeElement.closest('#rows tr');
  const focusSelector = document.activeElement.matches('.row-status') ? '.row-status' : '.task-title';
  el('rows').replaceChildren(...visible.map(createRow));
  if (focusRow) {
    const replacement = el('rows').querySelector('tr[data-id="' + focusRow.dataset.id + '"] ' + focusSelector);
    (replacement || el('counts').querySelector('[aria-pressed="true"]'))?.focus({preventScroll:true});
  }
  el('empty').hidden = visible.length > 0;
  el('row-count').textContent = 'Показано ' + visible.length + ' из ' + tasks.length;
  renderCounters();
  renderDetails(selected);
}
function updateTask(id, changes) {
  tasks = read(TASK_KEY, validTasks, tasks);
  const task = tasks.find(item => item.id === id);
  if (task) {
    Object.assign(task, changes);
    write(TASK_KEY, tasks);
  }
  render();
}
function clearFilters() {
  el('search').value = '';
  el('channel').value = '';
  el('sort').value = 'priority';
  statusFilter = '';
  preset = 'all';
}
for (const status of ['', ...STATUSES]) {
  const button = node('button', status || 'Все');
  button.dataset.status = status;
  button.append(node('span'));
  button.addEventListener('click', () => {
    statusFilter = status;
    if (preset === 'control') preset = 'all';
    render();
  });
  el('counts').append(button);
}
for (const channel of CHANNELS) el('channel').add(new Option(channel,channel));
for (const key of ['channel','sort']) el(key).addEventListener('change', render);
el('search').addEventListener('input', render);
el('clear-filters').addEventListener('click', () => { clearFilters(); render(); });
for (const button of document.querySelectorAll('.quick-filters button')) {
  button.addEventListener('click', () => {
    clearFilters();
    preset = button.dataset.preset;
    if (preset === 'control') statusFilter = 'Контроль факта';
    render();
  });
}
el('rows').addEventListener('click', event => {
  const row = event.target.closest('tr');
  if (!row || event.target.closest('.row-status')) return;
  selectedId = Number(row.dataset.id);
  render();
});
optionList(el('edit-priority'), PRIORITIES);
el('edit-priority').addEventListener('change', event => updateTask(selectedId,{priority:event.target.value}));
el('edit-deadline').addEventListener('change', event => {
  if (event.target.validity.valid) updateTask(selectedId,{deadline:dateRU(event.target.value)});
});
el('edit-budget').addEventListener('input', event => {
  if (!event.target.validity.valid) return;
  const amount = event.target.valueAsNumber;
  updateTask(selectedId,{budgetNum:amount, budgetText:rub(amount)});
});
el('edit-note').addEventListener('input', event => updateTask(selectedId,{note:event.target.value}));

function renderChecklist() {
  const done = checks.filter(Boolean).length;
  el('progress-text').textContent = done + ' / ' + STEPS.length;
  el('progress').value = done;
  [...el('steps').querySelectorAll('input')].forEach((input, index) => { input.checked = checks[index]; });
}
STEPS.forEach((text,index) => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    checks = read(CHECK_KEY,validChecks,checks);
    checks[index] = checkbox.checked;
    write(CHECK_KEY,checks);
    renderChecklist();
  });
  label.append(checkbox,node('span',text));
  li.append(label);
  el('steps').append(li);
});
const tabs = [...document.querySelectorAll('.launch-tabs [role="tab"]')];
function showTab(tab) {
  pane = tab.getAttribute('aria-controls');
  for (const item of tabs) {
    const active = item === tab;
    item.setAttribute('aria-selected',String(active));
    item.tabIndex = active ? 0 : -1;
    el(item.getAttribute('aria-controls')).hidden = !active;
  }
  render();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => showTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[1] : tabs[1-index];
    showTab(target);
    target.focus();
  });
});

const motionTime = wait => new Promise(resolve => setTimeout(resolve, wait));
const buttonSpring = PortfolioMotion.easing(300, 22, 320);
const labelSpring = PortfolioMotion.easing(220, 20, 320);
const actionButtons = [
  [el('markdown'), 'Скопировано'],
  [el('reset-demo'), 'Сброшено'],
  [el('save-task'), 'Добавлено']
];
for (const [button, message] of actionButtons) {
  const label = button.textContent;
  const face = node('span', undefined, 'action-face');
  const resting = node('span', label, 'action-label');
  const spinner = node('span', undefined, 'action-spinner');
  const done = node('span', undefined, 'action-done');
  done.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  done.append(message);
  face.append(spinner, done);
  button.classList.add('motion-action');
  button.style.setProperty('--button-spring', buttonSpring);
  button.style.setProperty('--label-spring', labelSpring);
  button.setAttribute('aria-label', label);
  face.setAttribute('aria-hidden', 'true');
  resting.setAttribute('aria-hidden', 'true');
  button.replaceChildren(resting, face);
}

async function actionFeedback(button, work) {
  if (button.dataset.actionState) return;
  button.dataset.actionState = 'loading';
  button.setAttribute('aria-busy', 'true');
  const loading = motionTime(PortfolioMotion.reduced.matches ? 0 : 210);
  try {
    const success = await work();
    if (success === false) return;
    await loading;
    button.removeAttribute('aria-busy');
    button.dataset.actionState = 'success';
    await motionTime(PortfolioMotion.reduced.matches ? 300 : 680);
  } finally {
    delete button.dataset.actionState;
    button.removeAttribute('aria-busy');
  }
}

const form = el('add-form');
const saveTask = el('save-task');
optionList(form.elements.channel, CHANNELS);
optionList(form.elements.status, STATUSES);
optionList(form.elements.priority, PRIORITIES);
el('add-task').addEventListener('click', () => {
  if (saveTask.dataset.actionState) return;
  form.reset();
  form.elements.priority.value = 'Средний';
  for (const key of ['owner','branch']) optionList(el(key + '-list'), [...new Set(tasks.map(task => task[key]))]);
  el('add-dialog').showModal();
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (saveTask.dataset.actionState) return;
  const values = Object.fromEntries(new FormData(form));
  for (const key of ['title','branch','owner','kpiTarget']) {
    values[key] = values[key].trim();
    if (!values[key]) {
      form.elements[key].focus();
      toast('Заполните поле содержательным текстом.');
      return;
    }
  }
  await actionFeedback(saveTask, () => {
    tasks = read(TASK_KEY,validTasks,tasks);
    const id = Math.max(...tasks.map(task => task.id)) + 1;
    const budgetNum = Number(values.budgetNum);
    tasks.push({...values,id,deadline:dateRU(values.deadline),budgetNum,budgetText:rub(budgetNum)});
    write(TASK_KEY,tasks);
    clearFilters();
    selectedId = id;
    showTab(tabs[0]);
    if (storageAvailable) toast('Задача добавлена');
  });
  el('add-dialog').close();
});
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => button.closest('dialog').close());
el('reset-demo').addEventListener('click', () => {
  if (!el('reset-demo').dataset.actionState) el('reset-dialog').showModal();
});
el('confirm-reset').addEventListener('click', () => {
  el('reset-dialog').close();
  actionFeedback(el('reset-demo'), () => {
    tasks = initialTasks();
    checks = initialChecks();
    write(TASK_KEY,tasks);
    write(CHECK_KEY,checks);
    clearFilters();
    selectedId = tasks[0].id;
    renderChecklist();
    showTab(tabs[0]);
    if (storageAvailable) toast('Исходные задачи и чек-лист восстановлены');
  });
});
window.addEventListener('storage', event => {
  if (event.key === TASK_KEY) { tasks = read(TASK_KEY,validTasks,initialTasks()); render(); }
  if (event.key === CHECK_KEY) { checks = read(CHECK_KEY,validChecks,initialChecks()); renderChecklist(); }
});

const columns = {id:'ID',branch:'Точка / кластер',title:'Задача',channel:'Направление',owner:'Ответственный',deadline:'Срок',budgetText:'Бюджет',budgetNum:'Бюджет (₽)',kpiTarget:'Целевой KPI',status:'Статус',priority:'Приоритет',note:'Заметка'};
el('csv').addEventListener('click', () => {
  const escapeCSV = value => {
    const raw = String(value);
    const safe = typeof value === 'string' && /^\s*[=+@-]/.test(raw) ? "'" + raw : raw;
    return '"' + safe.replaceAll('"','""') + '"';
  };
  const matrix = [Object.values(columns), ...tasks.map(task => Object.keys(columns).map(key => task[key]))];
  const csv = '\uFEFF' + matrix.map(row => row.map(escapeCSV).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'demo_marketing_launches.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('CSV сформирован · ' + tasks.length + ' задач');
});
function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.className = 'clipboard-fallback';
  document.body.append(area);
  area.select();
  try { return document.execCommand('copy'); }
  finally { area.remove(); el('markdown').focus(); }
}
el('markdown').addEventListener('click', () => actionFeedback(el('markdown'), async () => {
  const keys = ['title','branch','channel','status','priority','deadline','budgetText'];
  const visible = visibleTasks();
  const matrix = [keys.map(key => columns[key]), keys.map(() => '---'), ...visible.map(task => keys.map(key => task[key]))];
  const clean = value => String(value).replaceAll('\\','\\\\').replaceAll('|','\\|').replace(/\r?\n/g,' ');
  const text = matrix.map(row => '| ' + row.map(clean).join(' | ') + ' |').join('\n');
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; }
  catch { try { copied = fallbackCopy(text); } catch {} }
  toast(copied ? 'Markdown скопирован · строк: ' + visible.length : 'Браузер запретил доступ к буферу обмена');
  return copied;
}));
renderChecklist();
render();

