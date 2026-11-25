'use strict';

(() => {
  const {translate} = PortfolioLanguage;
  const svgNS = 'http://www.w3.org/2000/svg';
  const lanes = [
    ['laneClient', 'Клиент', 0, 88],
    ['laneAccount', 'Аккаунт', 88, 150],
    ['laneFinance', 'Финансы', 238, 96],
    ['laneIntegration', 'Интеграция', 334, 106]
  ];

  function svgNode(name, attrs = {}, text) {
    const element = document.createElementNS(svgNS, name);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function label(parent, x, y, key, russian, className = 'diagram-label') {
    parent.append(svgNode('text', {x, y, class:className}, translate(key, russian)));
  }

  function task(parent, x, y, width, height, lines, accent = false) {
    parent.append(svgNode('rect', {x, y, width, height, rx:8, class:accent ? 'diagram-task diagram-task-accent' : 'diagram-task'}));
    lines.forEach(([key, russian], index) => label(parent, x + width / 2,
      y + height / 2 + (index - (lines.length - 1) / 2) * 17 + 4, key, russian));
  }

  function gateway(parent, x, y, sign) {
    parent.append(
      svgNode('path', {d:'M ' + x + ' ' + (y-19) + ' l 19 19 -19 19 -19 -19 z', class:'diagram-gateway'}),
      svgNode('text', {x, y:y+6, class:'diagram-sign'}, sign)
    );
  }

  function frame(model, titleKey, title, descKey, description) {
    const svg = document.getElementById(model + '-diagram');
    const markerId = model + '-arrow';
    const marker = svgNode('marker', {id:markerId, viewBox:'0 0 8 8', markerWidth:8, markerHeight:8,
      refX:7, refY:4, orient:'auto', markerUnits:'userSpaceOnUse'});
    marker.append(svgNode('path', {d:'M0 0 8 4 0 8z', class:'diagram-arrow'}));
    const defs = svgNode('defs');
    defs.append(marker);
    svg.replaceChildren(
      svgNode('title', {id:model + '-svg-title'}, translate(titleKey, title)),
      svgNode('desc', {id:model + '-svg-desc'}, translate(descKey, description)),
      defs
    );
    for (const [key, ru, y, height] of lanes) {
      svg.append(
        svgNode('rect', {x:0, y, width:1210, height, class:'diagram-lane'}),
        svgNode('rect', {x:0, y, width:112, height, class:'diagram-lane-head'})
      );
      label(svg, 56, y + height / 2 + 5, key, ru, 'diagram-lane-label');
    }
    const flow = svgNode('g', {'aria-hidden':'true'});
    const steps = svgNode('g', {'aria-hidden':'true'});
    svg.append(flow, steps);
    return {
      steps,
      wire(d, annotation = false) {
        flow.append(svgNode('path', {
          d,
          class:annotation ? 'diagram-flow diagram-flow-note' : 'diagram-flow',
          ...(annotation ? {} : {'marker-end':'url(#' + markerId + ')'})
        }));
      }
    };
  }

  function drawCurrent() {
    const {steps, wire} = frame('as-is', 'asIsLabel', 'Схема текущего онбординга',
      'asIsDesc', 'Клиенту пишут 4-5 раз. Три специалиста разбирают доступы в общем чате. Таймера SLA нет.');
    for (const d of ['M143 177H155', 'M300 177H348', 'M506 177H570', 'M725 177H1034',
      'M649 203V263', 'M748 287H1101V203', 'M603 203V225H492V386H520', 'M662 386H700',
      'M842 386H880', 'M1022 386H1143V203', 'M1169 177H1184']) wire(d);
    for (const d of ['M221 63V151', 'M414 63V151', 'M605 63V151', 'M797 63V111H671V151',
      'M989 63V111H1076V151']) wire(d, true);
    const contacts = [
      ['touchContract','Запрос договора'],
      ['touchEdits','Правки договора'],
      ['touchBilling','Реквизиты'],
      ['touchAccess','Запрос доступов'],
      ['touchFollowup','Уточнение']
    ];
    contacts.forEach((contact, index) => task(steps, 149 + 192 * index, 25, 145, 38, [contact]));
    steps.append(svgNode('circle', {cx:132, cy:177, r:10, class:'diagram-event'}));
    task(steps, 155, 151, 145, 52, [['requestInParts','Запросы по частям']]);
    task(steps, 348, 151, 158, 52, [['agreeInChat','Согласовать условия']]);
    task(steps, 570, 151, 155, 52, [['sharedChat','Общий чат']]);
    task(steps, 1034, 151, 135, 52, [['handOverAccess','Выдать доступ']]);
    steps.append(svgNode('circle', {cx:1195, cy:177, r:10, class:'diagram-event diagram-end'}));
    task(steps, 600, 263, 148, 50, [['manualBilling','Счет и оплата']]);
    task(steps, 520, 362, 142, 48, [['specialistOne','Специалист 1']]);
    task(steps, 700, 362, 142, 48, [['specialistTwo','Специалист 2']]);
    task(steps, 880, 362, 142, 48, [['specialistThree','Специалист 3']]);
    label(steps, 208, 391, 'noTimer', 'Без таймера SLA', 'diagram-note');
  }

  function drawProposed() {
    const {steps, wire} = frame('to-be', 'toBeLabel', 'Схема целевого онбординга',
      'toBeDesc', 'Договор и intake-анкета уходят одним пакетом. Финансы и интеграция работают параллельно. Доступ выдается после подтверждения оплаты и готовности интеграции.');
    for (const d of ['M144 177H155', 'M310 177H330V69', 'M383 69V112H415V177H425',
      'M444 158V124H501', 'M641 124H670V158', 'M463 177H651', 'M689 177H721',
      'M740 196V284H767', 'M757 177H763V379H779', 'M921 284H967V177H980',
      'M939 379H999V196', 'M1018 177H1039', 'M1105 150V69']) wire(d);
    wire('M929 405H1027V390H1043');
    steps.append(svgNode('circle', {cx:133, cy:177, r:10, class:'diagram-event'}));
    task(steps, 155, 151, 155, 52, [['startPack1','Договор + intake-анкета'], ['startPack2','Отправить вместе']], true);
    task(steps, 260, 20, 168, 49, [['clientPack1','Подписать и заполнить'], ['clientPack2','стартовый пакет']], true);
    gateway(steps, 444, 177, '×');
    label(steps, 444, 217, 'editsQuestion', 'Есть правки?', 'diagram-note');
    label(steps, 471, 116, 'yes', 'Да', 'diagram-note');
    label(steps, 554, 200, 'noLawyer', 'Нет: типовой без юриста', 'diagram-note');
    task(steps, 501, 102, 140, 45, [['agreeEdits','Согласовать правки']]);
    gateway(steps, 670, 177, '×');
    gateway(steps, 740, 177, '+');
    label(steps, 740, 217, 'splitGate', 'Параллельный старт', 'diagram-note');
    task(steps, 767, 258, 154, 52, [['financeTask1','Отправить счет'], ['financeTask2','Подтвердить оплату']], true);
    task(steps, 779, 352, 160, 53, [['integrateTask1','Подготовить интеграцию'], ['integrateTask2','Один владелец задачи']], true);
    steps.append(
      svgNode('circle', {cx:916,cy:405,r:13,class:'diagram-timer'}),
      svgNode('circle', {cx:916,cy:405,r:9,class:'diagram-timer-ring'}),
      svgNode('path', {d:'M916 399v6l4 2',class:'diagram-timer-ring'})
    );
    label(steps, 879, 430, 'slaTimer', 'SLA 48ч', 'diagram-note');
    task(steps, 1043, 368, 134, 44, [['escalate','Эскалация']]);
    gateway(steps, 999, 177, '+');
    label(steps, 997, 219, 'gateLabel', 'Гейт оплаты', 'diagram-note');
    task(steps, 1039, 150, 132, 54, [['handOverAccess','Выдать доступ']], true);
    task(steps, 1012, 20, 153, 49, [['clientAccess','Получить доступ']], true);
    wire('M1165 44H1180');
    steps.append(svgNode('circle', {cx:1191, cy:44, r:10, class:'diagram-event diagram-end'}));
  }

  function drawDiagrams() {
    drawCurrent();
    drawProposed();
  }
  document.addEventListener('portfolio:language', drawDiagrams);
  drawDiagrams();
})();
