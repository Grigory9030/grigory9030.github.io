'use strict';

const SEED = [
  {
    "id": 1,
    "branch": "Клиент A · витрина",
    "title": "Веб-релиз корзины: сценарии приемки",
    "channel": "Веб-релиз",
    "owner": "PM",
    "deadline": "04.12.2026",
    "budgetText": "85 000 ₽",
    "budgetNum": 85000,
    "kpiTarget": "Оплата, отмена и повторный вход пройдены на тесте",
    "status": "В работе",
    "priority": "Высокий",
    "note": "Владелец релиза согласовал окно выкладки. План отката проверен на тестовом окружении."
  },
  {
    "id": 2,
    "branch": "Клиент A · платежи",
    "title": "Сверка сумм заказа и оплат перед релизом",
    "channel": "Data QA",
    "owner": "Аналитик",
    "deadline": "01.12.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Все расхождения разобраны по ID заказа",
    "status": "Контроль факта",
    "priority": "Высокий",
    "note": "Сначала агрегировать товары и платежи по заказу. Заказы без оплаты проверить отдельным списком."
  },
  {
    "id": 3,
    "branch": "Клиент B · новый запуск",
    "title": "Подготовить договор и intake-анкету",
    "channel": "Онбординг",
    "owner": "Аккаунт",
    "deadline": "27.11.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Один стартовый пакет передан клиенту",
    "status": "На согласовании",
    "priority": "Высокий",
    "note": "Уточнить владельца решения и собрать реквизиты в анкете. Типовой договор готов."
  },
  {
    "id": 4,
    "branch": "Клиент B · интеграция",
    "title": "Проверить API-доступ к учетной системе",
    "channel": "Интеграция",
    "owner": "Технический специалист",
    "deadline": "03.12.2026",
    "budgetText": "24 000 ₽",
    "budgetNum": 24000,
    "kpiTarget": "Тестовый запрос и сверка контрольной записи пройдены",
    "status": "В работе",
    "priority": "Высокий",
    "note": "Владелец задачи один. Через 48 часов без ответа проверить блокер и эскалировать аккаунту."
  },
  {
    "id": 5,
    "branch": "Клиент C · квартальный обзор",
    "title": "Собрать материалы к QBR",
    "channel": "QBR",
    "owner": "Аккаунт",
    "deadline": "08.12.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "План и факт по KPI согласованы до встречи",
    "status": "К запуску",
    "priority": "Средний",
    "note": "Собрать динамику каналов, средний чек и решения по гипотезам. Отдельно отметить источники данных."
  },
  {
    "id": 6,
    "branch": "Клиент A · платежи",
    "title": "Устранить дубли платежного вебхука",
    "channel": "Data QA",
    "owner": "Аналитик",
    "deadline": "26.11.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Одна валидная запись на payment_id",
    "status": "Завершено",
    "priority": "Высокий",
    "note": "Проверка на демо-выгрузке пройдена. Для отбора первого события использован ROW_NUMBER."
  },
  {
    "id": 7,
    "branch": "Клиент A · витрина",
    "title": "Проверить мобильную оплату после выкладки",
    "channel": "Веб-релиз",
    "owner": "QA",
    "deadline": "07.12.2026",
    "budgetText": "12 000 ₽",
    "budgetNum": 12000,
    "kpiTarget": "Все критичные сценарии проходят на мобильных",
    "status": "К запуску",
    "priority": "Высокий",
    "note": "Проверить расчет корзины, переход на страницу оплаты и повторное открытие заказа."
  },
  {
    "id": 8,
    "branch": "Клиент C · промо",
    "title": "Оценить подарок от порога корзины",
    "channel": "Промо и аналитика",
    "owner": "Маркетинг",
    "deadline": "09.12.2026",
    "budgetText": "36 000 ₽",
    "budgetNum": 36000,
    "kpiTarget": "Маржа на корзину выше контроля",
    "status": "В работе",
    "priority": "Средний",
    "note": "Зафиксировать порог, себестоимость подарка и контрольную группу до запуска."
  },
  {
    "id": 9,
    "branch": "Клиент B · новый запуск",
    "title": "Подтвердить оплату перед выдачей доступа",
    "channel": "Онбординг",
    "owner": "Финансы",
    "deadline": "05.12.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Факт оплаты подтвержден до выдачи доступа",
    "status": "На согласовании",
    "priority": "Высокий",
    "note": "Аккаунт выдает доступ после двух сигналов: оплата подтверждена, интеграция готова."
  },
  {
    "id": 10,
    "branch": "Клиент A · аналитика",
    "title": "Обновить отчет по статусам заказов",
    "channel": "Data QA",
    "owner": "Аналитик",
    "deadline": "02.12.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Оплачено и доставлено показаны отдельно",
    "status": "Контроль факта",
    "priority": "Средний",
    "note": "Сверить контрольный день, фильтры каналов и итоги с источником."
  },
  {
    "id": 11,
    "branch": "Клиент C · квартальный обзор",
    "title": "Зафиксировать решения и инициативы Q+1",
    "channel": "QBR",
    "owner": "PM",
    "deadline": "12.12.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "У каждой инициативы есть владелец и срок",
    "status": "К запуску",
    "priority": "Средний",
    "note": "Подготовить четыре приоритета. Обновить реестр решений после встречи."
  },
  {
    "id": 12,
    "branch": "Клиент B · интеграция",
    "title": "Снять с плана отдельный ручной импорт",
    "channel": "Интеграция",
    "owner": "PM",
    "deadline": "28.11.2026",
    "budgetText": "0 ₽",
    "budgetNum": 0,
    "kpiTarget": "Сценарий импорта закрыт решением команды",
    "status": "Отменено",
    "priority": "Низкий",
    "note": "Запланирован один API-канал. Ручная загрузка понадобится только при недоступности основного источника."
  }
];

const STEPS = [
  "Согласованы цель запуска, критерии приемки и владельцы задач.",
  "Проверены роли, доступы и тестовое окружение.",
  "Назначены ответственные за сверку источников, оплат и статусов.",
  "Подтверждены бюджет, сроки и зависимости со стороны клиента.",
  "Пройдены критичные сценарии и зафиксирован план отката.",
  "Подготовлены клиентская инструкция и сообщение о запуске.",
  "Есть окно контрольной проверки после релиза и контакт на случай эскалации.",
  "Назначен разбор план / факт, обновлены реестр решений и материалы QBR."
];

const TASK_KEY = 'gk_demo_launches_v2';
const LEGACY_TASK_KEY = 'gk_demo_launches_v1';
const CHECK_KEY = 'gk_demo_launch_checklist_v2';
const STATUSES = ['К запуску', 'В работе', 'На согласовании', 'Контроль факта', 'Завершено', 'Отменено'];
const PRIORITIES = ['Высокий', 'Средний', 'Низкий'];

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
// Replace untouched v1 examples. Keep edited rows and user-added tasks from the old tracker.
const legacyExampleHashes = {
  "1": "b0e78d95",
  "2": "8f10b82e",
  "3": "50dca1ab",
  "4": "29141363",
  "5": "c4b128ec",
  "6": "72eb8567",
  "7": "58d3ecfb",
  "8": "83cbaac6",
  "9": "e90fd825",
  "10": "9b791ff0",
  "11": "9c737982",
  "12": "861b7f41"
};
const taskFields = Object.keys(SEED[0]);
function exampleHash(task) {
  const canonical = JSON.stringify(taskFields.map(field => task[field]));
  let hash = 2166136261;
  for (let index = 0; index < canonical.length; index++) {
    hash = Math.imul(hash ^ canonical.charCodeAt(index), 16777619);
  }
  return (hash >>> 0).toString(16);
}
function migrateTasks() {
  const examples = initialTasks();
  const previous = read(LEGACY_TASK_KEY, validTasks, []);
  const retained = previous.filter(task => exampleHash(task) !== legacyExampleHashes[task.id]);
  const exampleIds = new Set(examples.map(task => task.id));
  let nextId = Math.max(...examples.map(task => task.id), ...retained.map(task => task.id)) + 1;
  return examples.concat(retained.map(task => exampleIds.has(task.id) ? {...task, id:nextId++} : task));
}

const currentTasks = read(TASK_KEY, validTasks, null);
let tasks = currentTasks ?? migrateTasks();
const CHANNELS = [...new Set([...SEED, ...tasks].map(task => task.channel))];
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

const columns = {id:'ID',branch:'Проект / контур',title:'Задача',channel:'Направление',owner:'Ответственный',deadline:'Срок',budgetText:'Бюджет',budgetNum:'Бюджет (₽)',kpiTarget:'Целевой KPI',status:'Статус',priority:'Приоритет',note:'Заметка'};
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

