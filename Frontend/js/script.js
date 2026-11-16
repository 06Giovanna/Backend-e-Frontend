/**
 * ============================================================================
 * SOLUTION TECH — SCRIPT PRINCIPAL (js/script.js)
 * ============================================================================
 */

const appState = {
  currentScreen: 'screen-1',
  role: null,
  gender: '',
  age: '',
  needs: [],
  otherNeed: '',
  selectedInstitution: null,
  donorData: {
    name: '',
    phone: '',
    cpf: '',
    email: '',
    item: ''
  },
  lastBotMessage: 'Olá! Eu sou o assistente de voz da Solution Tech. Aperte o botão OUVIR para escutar toda a tela ou toque no microfone para falar comigo.'
};

const MARINGA_CENTER = [-23.4253, -51.9386];
const PARQUE_INGA_COORDS = [-23.4267, -51.9333];

const helpInstitutions = [
  {
    id: 'help-1',
    name: 'Projeto Acolher',
    address: 'Rua Pioneiro Miguel Saldanha, 312 — Maringá - PR',
    distance: 'Aprox. 1,2 km (demonstrativo)',
    type: 'ong',
    services: ['Acolhimento', 'Roupas', 'Cobertores', 'Orientação Social'],
    hours: 'Atendimento demonstrativo: Seg a Sáb, 08h às 18h',
    coords: [-23.4195, -51.9420]
  },
  {
    id: 'help-2',
    name: 'Casa de Passagem Maringá',
    address: 'Av. Tiradentes, 3170 — Maringá - PR',
    distance: 'Aprox. 1,8 km (demonstrativo)',
    type: 'abrigo',
    services: ['Abrigo', 'Banho', 'Alimento', 'Pernoite'],
    hours: 'Atendimento demonstrativo: 24 horas',
    coords: [-23.4238, -51.9565]
  },
  {
    id: 'help-3',
    name: 'Comunidade São Francisco',
    address: 'Av. Morangueira, 4750 — Maringá - PR',
    distance: 'Aprox. 2,5 km (demonstrativo)',
    type: 'ong',
    services: ['Alimento', 'Saúde', 'Cestas Básicas'],
    hours: 'Atendimento demonstrativo: Seg a Sex, 09h às 17h',
    coords: [-23.4012, -51.9378]
  },
  {
    id: 'help-4',
    name: 'Instituto Soma',
    address: 'Rua Santos Dumont, 388 — Maringá - PR',
    distance: 'Aprox. 0,9 km (demonstrativo)',
    type: 'ong',
    services: ['Alimento', 'Roupas', 'Apoio Comunitário'],
    hours: 'Atendimento demonstrativo: Seg a Sex, 08h às 17h',
    coords: [-23.4282, -51.9355]
  }
];

const donationReceivers = [
  {
    id: 'don-1',
    name: 'Central Solidária Maringá',
    address: 'Av. Brasil, 2450 — Centro, Maringá - PR',
    distance: 'Aprox. 1,1 km (demonstrativo)',
    acceptedTypes: ['Alimentos', 'Roupas', 'Cobertores', 'Higiene'],
    details: 'Ponto demonstrativo de triagem e distribuição de donativos.',
    coords: [-23.4215, -51.9362]
  },
  {
    id: 'don-2',
    name: 'Rede Maringá Sem Fome',
    address: 'Av. Colombo, 5120 — Zona 07, Maringá - PR',
    distance: 'Aprox. 2,3 km (demonstrativo)',
    acceptedTypes: ['Alimentos'],
    details: 'Recebe alimentos não perecíveis e hortifrúti para cozinhas comunitárias (demonstrativo).',
    coords: [-23.4085, -51.9445]
  },
  {
    id: 'don-3',
    name: 'Bazar Beneficente Esperança',
    address: 'Rua Neo Alves Martins, 1890 — Maringá - PR',
    distance: 'Aprox. 1,4 km (demonstrativo)',
    acceptedTypes: ['Roupas', 'Cobertores'],
    details: 'Coleta de agasalhos, calçados e cobertores em bom estado (demonstrativo).',
    coords: [-23.4240, -51.9310]
  },
  {
    id: 'don-4',
    name: 'Núcleo Cuidar & Proteger',
    address: 'Av. Mauá, 1620 — Zona 03, Maringá - PR',
    distance: 'Aprox. 1,6 km (demonstrativo)',
    acceptedTypes: ['Higiene', 'Roupas', 'Alimentos'],
    details: 'Recebe kits de higiene pessoal e itens básicos (demonstrativo).',
    coords: [-23.4295, -51.9295]
  }
];

const foodAndShelterLocations = [
  {
    id: 'fs-1',
    category: 'alimentacao',
    name: 'Restaurante Popular Comunitário (Demo)',
    address: 'Av. Duque de Caxias, 910 — Maringá - PR',
    distance: 'Aprox. 1,0 km (demonstrativo)',
    hours: 'Almoço demonstrativo: 11h às 14h',
    details: 'Refeições completas gratuitas ou a custo simbólico.',
    coords: [-23.4220, -51.9398]
  },
  {
    id: 'fs-2',
    category: 'alimentacao',
    name: 'Cozinha Solidária Zona Norte (Demo)',
    address: 'Av. Mandacaru, 2140 — Maringá - PR',
    distance: 'Aprox. 2,7 km (demonstrativo)',
    hours: 'Jantar demonstrativo: 18h às 20h',
    details: 'Distribuição de marmitas e sopas quentes.',
    coords: [-23.4045, -51.9510]
  },
  {
    id: 'fs-3',
    category: 'abrigo',
    name: 'Casa de Passagem Maringá',
    address: 'Av. Tiradentes, 3170 — Maringá - PR',
    distance: 'Aprox. 1,8 km (demonstrativo)',
    hours: 'Acolhimento demonstrativo: 24 horas',
    details: 'Vagas para pernoite, banho quente e café da manhã.',
    coords: [-23.4238, -51.9565]
  },
  {
    id: 'fs-4',
    category: 'abrigo',
    name: 'Albergue Noturno Fraternidade (Demo)',
    address: 'Rua Joubert de Carvalho, 740 — Maringá - PR',
    distance: 'Aprox. 1,3 km (demonstrativo)',
    hours: 'Entrada demonstrativa: 19h às 22h',
    details: 'Acolhimento temporário com dormitórios e higiene.',
    coords: [-23.4202, -51.9435]
  }
];

const mapsRegistry = {};
const markersRegistry = {};

document.addEventListener('DOMContentLoaded', () => {
  setupInputMasks();
  renderHelpInstitutions();
  renderDonorPoints();
  renderFilteredDonations('Todos');
  renderFoodAndShelter('todos');
  initChatbot();
  setupAccessibilityButtons();
});

function setupAccessibilityButtons() {
  document.getElementById('btn-global-listen').addEventListener('click', readCurrentScreenAloud);
  document.getElementById('btn-global-stop').addEventListener('click', stopSpeech);
  document.getElementById('btn-font-size').addEventListener('click', () => {
    document.documentElement.classList.toggle('large-text');
  });
}

function navigateTo(screenId) {
  stopSpeech();
  document.querySelectorAll('.screen').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (!target) return;

  target.classList.add('active');
  appState.currentScreen = screenId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.top-nav-bar').forEach(nav => nav.classList.remove('open'));

  setTimeout(() => {
    if (screenId === 'screen-6') initOrRefreshMap('map-help', helpInstitutions, 'help');
    if (screenId === 'screen-9') initOrRefreshMap('map-donor', donationReceivers, 'donor');
    if (screenId === 'screen-10') initOrRefreshMap('map-donations-area', donationReceivers, 'donor');
    if (screenId === 'screen-11') initOrRefreshMap('map-food-shelter', foodAndShelterLocations, 'foodshelter');
  }, 150);

  updateChatbotContextForScreen(screenId);
}

function toggleMobileNav(navId) {
  const nav = document.getElementById(navId);
  if (nav) nav.classList.toggle('open');
}

function goToRoleMap() {
  navigateTo(appState.role === 'doador' ? 'screen-9' : 'screen-6');
}

function selectProfile(role) {
  appState.role = role;
  navigateTo(role === 'doador' ? 'screen-8' : 'screen-3');
}

function selectSingleOption(field, value, cardElement) {
  appState[field] = value;
  const parent = cardElement.parentElement;
  parent.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
  cardElement.classList.add('selected');
}

function validateStepAndGo(field, nextScreen, errorMessage) {
  if (!appState[field]) {
    speakText(errorMessage);
    alert(errorMessage);
    return;
  }
  navigateTo(nextScreen);
}

function toggleNeed(needValue, cardElement) {
  const idx = appState.needs.indexOf(needValue);
  if (idx > -1) {
    appState.needs.splice(idx, 1);
    cardElement.classList.remove('selected');
  } else {
    appState.needs.push(needValue);
    cardElement.classList.add('selected');
  }
}

function confirmOtherNeed() {
  const input = document.getElementById('other-need-input');
  const val = input.value.trim();
  if (val) {
    appState.otherNeed = val;
    speakText(`Necessidade adicionada: ${val}`);
  }
}

function proceedFromNeeds() {
  const input = document.getElementById('other-need-input');
  appState.otherNeed = input.value.trim();

  if (appState.needs.length === 0 && !appState.otherNeed) {
    const msg = 'Por favor, selecione pelo menos uma necessidade ou escreva no campo Outro.';
    speakText(msg);
    alert(msg);
    return;
  }
  navigateTo('screen-6');
}

function renderHelpInstitutions() {
  const container = document.getElementById('help-ongs-list');
  container.innerHTML = helpInstitutions.map(inst => `
    <div class="inst-card">
      <div class="inst-card-top">
        <span class="inst-name"><i class="fa-solid fa-hand-holding-heart"></i> ${inst.name}</span>
        <span class="inst-distance">${inst.distance}</span>
      </div>
      <p class="inst-address"><i class="fa-solid fa-location-dot"></i> ${inst.address}</p>
      <div class="inst-tags">
        ${inst.services.map(s => `<span class="inst-tag">${s}</span>`).join('')}
      </div>
      <div class="inst-card-actions">
        <button type="button" class="btn-card-sm btn-card-select" onclick="selectInstitutionForTicket('${inst.id}')">
          <i class="fa-solid fa-ticket"></i> Gerar Ticket
        </button>
        <button type="button" class="btn-card-sm btn-card-details" onclick="focusMarkerOnMap('map-help', ${inst.coords[0]}, ${inst.coords[1]})">
          <i class="fa-solid fa-map-pin"></i> Ver no Mapa
        </button>
      </div>
    </div>
  `).join('');
}

function selectInstitutionForTicket(instId) {
  const inst = helpInstitutions.find(item => item.id === instId) || helpInstitutions[0];
  appState.selectedInstitution = inst;

  document.getElementById('ticket-inst-name').textContent = inst.name;
  document.getElementById('ticket-inst-address').textContent = inst.address;

  const allNeeds = [...appState.needs];
  if (appState.otherNeed) allNeeds.push(`Outro: ${appState.otherNeed}`);

  document.getElementById('ticket-user-summary').innerHTML = `
    <strong>Perfil:</strong> ${appState.gender || 'Não informado'} | <strong>Idade:</strong> ${appState.age || 'Não informada'}<br/>
    <strong>Necessidades:</strong> ${allNeeds.length ? allNeeds.join(', ') : 'Apoio geral'}
  `;

  const randomCode = Math.floor(100 + Math.random() * 900);
  document.getElementById('ticket-protocol').textContent = `PROTOCOLO: #ST-2026-${randomCode}`;

  navigateTo('screen-7');
}

function printTicket() {
  speakText('Preparando impressão do seu ticket.');
  window.print();
}

function renderDonorPoints() {
  const container = document.getElementById('donor-points-list');
  container.innerHTML = donationReceivers.map(inst => `
    <div class="inst-card">
      <div class="inst-card-top">
        <span class="inst-name"><i class="fa-solid fa-box-open"></i> ${inst.name}</span>
        <span class="inst-distance">${inst.distance}</span>
      </div>
      <p class="inst-address"><i class="fa-solid fa-location-dot"></i> ${inst.address}</p>
      <div class="inst-tags">
        ${inst.acceptedTypes.map(t => `<span class="inst-tag">Recebe: ${t}</span>`).join('')}
      </div>
      <div class="inst-card-actions">
        <button type="button" class="btn-card-sm btn-card-select" onclick="openInstitutionModal('${inst.id}', 'donor')">
          <i class="fa-solid fa-circle-info"></i> Detalhes
        </button>
        <button type="button" class="btn-card-sm btn-card-details" onclick="focusMarkerOnMap('map-donor', ${inst.coords[0]}, ${inst.coords[1]})">
          <i class="fa-solid fa-map-pin"></i> Ver no Mapa
        </button>
      </div>
    </div>
  `).join('');
}

function filterDonations(type, chipBtn) {
  if (chipBtn) {
    document.querySelectorAll('#donation-filters .chip').forEach(c => c.classList.remove('active'));
    chipBtn.classList.add('active');
  }
  renderFilteredDonations(type);

  const filtered = type === 'Todos'
    ? donationReceivers
    : donationReceivers.filter(d => d.acceptedTypes.includes(type));

  if (mapsRegistry['map-donations-area']) {
    updateMapMarkers('map-donations-area', filtered, 'donor');
  }
}

function renderFilteredDonations(type) {
  const container = document.getElementById('donations-filtered-list');
  const filtered = type === 'Todos'
    ? donationReceivers
    : donationReceivers.filter(d => d.acceptedTypes.includes(type));

  container.innerHTML = filtered.map(inst => `
    <div class="inst-card">
      <div class="inst-card-top">
        <span class="inst-name">${inst.name}</span>
        <span class="inst-distance">${inst.distance}</span>
      </div>
      <p class="inst-address"><i class="fa-solid fa-location-dot"></i> ${inst.address}</p>
      <div class="inst-tags">
        ${inst.acceptedTypes.map(t => `<span class="inst-tag">${t}</span>`).join('')}
      </div>
      <div class="inst-card-actions">
        <button type="button" class="btn-card-sm btn-card-select" onclick="openInstitutionModal('${inst.id}', 'donor')">
          <i class="fa-solid fa-eye"></i> Visualizar Informações
        </button>
        <button type="button" class="btn-card-sm btn-card-details" onclick="focusMarkerOnMap('map-donations-area', ${inst.coords[0]}, ${inst.coords[1]})">
          <i class="fa-solid fa-location-crosshairs"></i> Localizar no Mapa
        </button>
      </div>
    </div>
  `).join('');
}

function openFoodShelterScreen(category) {
  navigateTo('screen-11');
  filterFoodShelter(category);
}

function filterFoodShelter(category) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (category === 'alimentacao') document.getElementById('btn-cat-food').classList.add('active');
  else if (category === 'abrigo') document.getElementById('btn-cat-shelter').classList.add('active');
  else document.getElementById('btn-cat-all').classList.add('active');

  const heading = document.getElementById('food-shelter-heading');
  heading.textContent = category === 'alimentacao'
    ? 'LOCAIS DE ALIMENTAÇÃO'
    : category === 'abrigo'
      ? 'LOCAIS DE ABRIGO'
      : 'ALIMENTAÇÃO E ABRIGO';

  renderFoodAndShelter(category);

  const filtered = category === 'todos'
    ? foodAndShelterLocations
    : foodAndShelterLocations.filter(item => item.category === category);

  setTimeout(() => {
    if (mapsRegistry['map-food-shelter']) {
      updateMapMarkers('map-food-shelter', filtered, 'foodshelter');
    }
  }, 180);
}

function renderFoodAndShelter(category) {
  const container = document.getElementById('food-shelter-list');
  const filtered = category === 'todos'
    ? foodAndShelterLocations
    : foodAndShelterLocations.filter(item => item.category === category);

  container.innerHTML = filtered.map(item => `
    <div class="inst-card">
      <div class="inst-card-top">
        <span class="inst-name">
          <i class="fa-solid ${item.category === 'alimentacao' ? 'fa-utensils' : 'fa-bed'}"></i>
          ${item.name}
        </span>
        <span class="inst-distance">${item.distance}</span>
      </div>
      <p class="inst-address"><i class="fa-solid fa-location-dot"></i> ${item.address}</p>
      <p class="inst-address"><i class="fa-solid fa-clock"></i> ${item.hours}</p>
      <div class="inst-card-actions">
        <button type="button" class="btn-card-sm btn-card-select" onclick="openInstitutionModal('${item.id}', 'foodshelter')">
          <i class="fa-solid fa-circle-info"></i> Informações
        </button>
        <button type="button" class="btn-card-sm btn-card-details" onclick="focusMarkerOnMap('map-food-shelter', ${item.coords[0]}, ${item.coords[1]})">
          <i class="fa-solid fa-map-pin"></i> Ver no Mapa
        </button>
      </div>
    </div>
  `).join('');
}

function openInstitutionModal(id, sourceType) {
  let item = null;
  if (sourceType === 'donor') {
    item = donationReceivers.find(d => d.id === id);
    document.getElementById('modal-inst-category').textContent = 'PONTO DE DOAÇÃO';
    document.getElementById('modal-inst-details').textContent = `${item.details} Aceita: ${item.acceptedTypes.join(', ')}.`;
  } else {
    item = foodAndShelterLocations.find(f => f.id === id);
    document.getElementById('modal-inst-category').textContent = item.category === 'alimentacao' ? 'ALIMENTAÇÃO' : 'ABRIGO';
    document.getElementById('modal-inst-details').textContent = `${item.hours}. ${item.details}`;
  }

  if (!item) return;

  document.getElementById('modal-inst-title').textContent = item.name;
  document.getElementById('modal-inst-address').textContent = item.address;
  document.getElementById('modal-inst-distance').textContent = item.distance;

  const actionBtn = document.getElementById('modal-btn-action');
  actionBtn.textContent = 'FECHAR E VOLTAR AO MAPA';
  actionBtn.onclick = closeInstitutionModal;

  document.getElementById('institution-modal').classList.remove('hidden');
}

function closeInstitutionModal() {
  document.getElementById('institution-modal').classList.add('hidden');
}

function speakModalContent() {
  const title = document.getElementById('modal-inst-title').textContent;
  const addr = document.getElementById('modal-inst-address').textContent;
  const det = document.getElementById('modal-inst-details').textContent;
  speakText(`${title}. Endereço: ${addr}. ${det}`);
}

function setupInputMasks() {
  const phoneInput = document.getElementById('donor-phone');
  const cpfInput = document.getElementById('donor-cpf');

  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) {
      e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
      e.target.value = `(${v}`;
    }
  });

  cpfInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) {
      e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    } else if (v.length > 6) {
      e.target.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    } else if (v.length > 3) {
      e.target.value = `${v.slice(0, 3)}.${v.slice(3)}`;
    } else {
      e.target.value = v;
    }
  });
}

function submitDonorForm(event) {
  event.preventDefault();

  const name = document.getElementById('donor-name').value.trim();
  const phone = document.getElementById('donor-phone').value.trim();
  const cpf = document.getElementById('donor-cpf').value.trim();
  const email = document.getElementById('donor-email').value.trim();
  const item = document.getElementById('donor-item').value.trim();

  let isValid = true;

  ['err-name', 'err-phone', 'err-cpf', 'err-email', 'err-item'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  if (name.length < 3) {
    document.getElementById('err-name').textContent = 'Informe seu nome completo.';
    isValid = false;
  }
  if (phone.replace(/\D/g, '').length < 10) {
    document.getElementById('err-phone').textContent = 'Informe um telefone válido com DDD.';
    isValid = false;
  }
  if (cpf.replace(/\D/g, '').length !== 11) {
    document.getElementById('err-cpf').textContent = 'Informe um CPF válido com 11 dígitos.';
    isValid = false;
  }
  if (!email.includes('@') || !email.includes('.')) {
    document.getElementById('err-email').textContent = 'Informe um e-mail válido.';
    isValid = false;
  }
  if (item.length < 2) {
    document.getElementById('err-item').textContent = 'Informe o que deseja doar.';
    isValid = false;
  }

  if (!isValid) {
    speakText('Por favor, verifique os campos destacados no formulário.');
    return;
  }

  appState.donorData = { name, phone, cpf, email, item };

  const banner = document.getElementById('donor-greeting-banner');
  banner.innerHTML = `
    <span><i class="fa-solid fa-circle-check"></i> Olá, <strong>${name}</strong>! Doação informada: <strong>${item}</strong></span>
    <span>Maringá - PR</span>
  `;

  navigateTo('screen-9');
}

function initOrRefreshMap(mapId, dataList, mode) {
  if (typeof L === 'undefined') {
    const el = document.getElementById(mapId);
    if (el) el.innerHTML = '<p style="padding:20px;">Mapa de Maringá-PR (Parque do Ingá). Verifique sua conexão para carregar os blocos do OpenStreetMap.</p>';
    return;
  }

  if (!mapsRegistry[mapId]) {
    const map = L.map(mapId).setView(MARINGA_CENTER, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapsRegistry[mapId] = map;
    markersRegistry[mapId] = L.layerGroup().addTo(map);
  } else {
    mapsRegistry[mapId].invalidateSize();
  }

  updateMapMarkers(mapId, dataList, mode);
}

function updateMapMarkers(mapId, dataList, mode) {
  const map = mapsRegistry[mapId];
  const layerGroup = markersRegistry[mapId];
  if (!map || !layerGroup) return;

  layerGroup.clearLayers();

  const userIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background:#e53935;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 8px rgba(0,0,0,0.4);"></div>',
    iconSize: [18, 18]
  });

  L.marker(MARINGA_CENTER, { icon: userIcon })
    .addTo(layerGroup)
    .bindPopup('<strong>Sua Localização (Maringá - PR)</strong><br>Próximo ao Parque do Ingá');

  L.circleMarker(PARQUE_INGA_COORDS, {
    radius: 7,
    color: '#0d8a53',
    fillColor: '#0d8a53',
    fillOpacity: 0.7
  }).addTo(layerGroup).bindPopup('<strong>Parque do Ingá</strong><br>Ponto de referência em Maringá-PR');

  dataList.forEach(item => {
    const color = item.type === 'abrigo' || item.category === 'abrigo'
      ? '#0a2540'
      : item.category === 'alimentacao'
        ? '#0d8a53'
        : '#1d63dc';

    const instIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background:${color};width:22px;height:22px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
      iconSize: [22, 22]
    });

    const popupAction = mode === 'help'
      ? `<br><button style="margin-top:6px;padding:5px 10px;background:#0a2540;color:#fff;border:none;border-radius:6px;cursor:pointer;" onclick="selectInstitutionForTicket('${item.id}')">Gerar Ticket</button>`
      : '';

    L.marker(item.coords, { icon: instIcon })
      .addTo(layerGroup)
      .bindPopup(`<strong>${item.name}</strong><br>${item.address}<br><small>${item.distance}</small>${popupAction}`);
  });
}

function centerMap(mapId) {
  if (mapsRegistry[mapId]) {
    mapsRegistry[mapId].setView(MARINGA_CENTER, 14);
  }
}

function focusMarkerOnMap(mapId, lat, lng) {
  if (mapsRegistry[mapId]) {
    mapsRegistry[mapId].setView([lat, lng], 16);
  }
}

let recognition = null;
let isListening = false;

const screenVoiceGuides = {
  'screen-1': 'Você está na Página Inicial da Solution Tech. Aperte o botão azul central Buscar ajuda agora para começar.',
  'screen-2': 'Tela de Escolha de Perfil. Escolha o botão DOADOR se quiser doar itens, ou o botão ANÔNIMO se você precisa de ajuda.',
  'screen-3': 'Tela de Identificação. Escolha uma das opções disponíveis: Mulher, Homem ou Outro, e depois aperte Avançar.',
  'screen-4': 'Tela de Idade. Selecione a faixa de idade correspondente e aperte Avançar.',
  'screen-5': 'Tela de Necessidades. Você pode escolher mais de uma necessidade, como Abrigo, Alimento, Banho, Saúde, Roupas ou Cobertores. Também pode usar o microfone no campo Outro.',
  'screen-6': 'Tela de Localização para Ajuda em Maringá. Veja as instituições próximas disponíveis, como Projeto Acolher e Casa de Passagem Maringá, e selecione uma para gerar seu ticket.',
  'screen-7': 'Seu ticket está pronto! Aperte o botão Imprimir Ticket para obter seu comprovante do local escolhido.',
  'screen-8': 'Tela de Cadastro do Doador. Preencha seu nome, telefone, CPF, e-mail e o que deseja doar, depois aperte Avançar.',
  'screen-9': 'Tela de Localização para Doadores. Veja os pontos de coleta em Maringá que recebem doações perto de você.',
  'screen-10': 'Área de Doações. Filtre pelo tipo de item que deseja doar e veja as instituições disponíveis.',
  'screen-11': 'Área de Alimentação e Abrigo. Alterne entre os botões Alimentação e Abrigo para consultar os locais e horários demonstrativos.'
};

function initChatbot() {
  addChatMessage('bot', appState.lastBotMessage);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      const micBtn = document.getElementById('btn-chatbot-mic');
      const micLabel = document.getElementById('mic-btn-label');
      if (micBtn) micBtn.classList.add('listening');
      if (micLabel) micLabel.textContent = 'OUVINDO... FALE AGORA';
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleUserCommand(transcript);
    };

    recognition.onerror = (event) => {
      stopListeningVisuals();
      if (event.error === 'not-allowed') {
        botReply('A permissão do microfone foi bloqueada no navegador. Você ainda pode usar o botão OUVIR ou tocar nas opções da tela.');
      } else {
        botReply('Não consegui ouvir claramente. Toque no microfone e tente falar novamente.');
      }
    };

    recognition.onend = () => {
      stopListeningVisuals();
    };
  }
}

function stopListeningVisuals() {
  isListening = false;
  const micBtn = document.getElementById('btn-chatbot-mic');
  const micLabel = document.getElementById('mic-btn-label');
  if (micBtn) micBtn.classList.remove('listening');
  if (micLabel) micLabel.textContent = 'TOQUE PARA FALAR';
}

function toggleChatbot() {
  const win = document.getElementById('chatbot-window');
  win.classList.toggle('hidden');
  if (!win.classList.contains('hidden')) {
    const guide = screenVoiceGuides[appState.currentScreen] || appState.lastBotMessage;
    speakText(guide);
  }
}

function updateChatbotContextForScreen(screenId) {
  const guide = screenVoiceGuides[screenId];
  if (guide) {
    appState.lastBotMessage = guide;
    const win = document.getElementById('chatbot-window');
    if (win && !win.classList.contains('hidden')) {
      addChatMessage('bot', guide);
    }
  }
}

function addChatMessage(sender, text) {
  const container = document.getElementById('chatbot-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function botReply(text) {
  appState.lastBotMessage = text;
  addChatMessage('bot', text);
  speakText(text);
}

function repeatLastBotMessage() {
  speakText(appState.lastBotMessage);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.96;

  const stopBtn = document.getElementById('btn-global-stop');
  utterance.onstart = () => {
    if (stopBtn) stopBtn.classList.remove('hidden');
  };
  utterance.onend = () => {
    if (stopBtn) stopBtn.classList.add('hidden');
  };
  utterance.onerror = () => {
    if (stopBtn) stopBtn.classList.add('hidden');
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const stopBtn = document.getElementById('btn-global-stop');
  if (stopBtn) stopBtn.classList.add('hidden');
}

function readCurrentScreenAloud() {
  const activeScreen = document.querySelector('.screen.active');
  if (!activeScreen) return;

  const screenTitle = activeScreen.getAttribute('data-screen-title') || '';
  const textsToRead = [`Você está na tela: ${screenTitle}.`];

  const elements = activeScreen.querySelectorAll(
    'h1, h2, .hero-subtitle, .section-subtitle, .header-sub, .profile-card, .select-card-horizontal .card-label, .age-card, .need-card span, .inst-card, .ticket-paper, .input-group label, .btn-primary, .btn-next'
  );

  elements.forEach(el => {
    const cleanText = el.innerText.replace(/\s+/g, ' ').trim();
    if (cleanText && !textsToRead.includes(cleanText)) {
      textsToRead.push(cleanText);
    }
  });

  const guide = screenVoiceGuides[appState.currentScreen];
  if (guide) textsToRead.push(`Orientação: ${guide}`);

  const fullSpeech = textsToRead.join('. ');
  addChatMessage('bot', 'Lendo todo o conteúdo da tela atual em voz alta...');
  speakText(fullSpeech);
}

function toggleChatbotMicrophone() {
  if (!recognition) {
    const fallbackMsg = 'Seu navegador não suporta reconhecimento de voz por microfone. Mas você pode usar o botão OUVIR para escutar todas as telas e tocar nos botões grandes.';
    botReply(fallbackMsg);
    return;
  }

  if (isListening) {
    recognition.stop();
  } else {
    stopSpeech();
    try {
      recognition.start();
    } catch (e) {
      stopListeningVisuals();
    }
  }
}

function startDictationForInput(inputId, btnElement) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speakText('Reconhecimento de voz não suportado neste navegador. Digite no campo ao lado.');
    return;
  }

  const inputRec = new SpeechRecognition();
  inputRec.lang = 'pt-BR';
  btnElement.classList.add('recording');

  inputRec.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    document.getElementById(inputId).value = spoken;
    appState.otherNeed = spoken;
    speakText(`Você disse: ${spoken}`);
  };

  inputRec.onend = () => {
    btnElement.classList.remove('recording');
  };

  inputRec.start();
}

function submitChatbotText(event) {
  event.preventDefault();
  const input = document.getElementById('chatbot-text-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  handleUserCommand(text);
}

function handleUserCommand(rawText) {
  addChatMessage('user', rawText);
  const cmd = rawText.toLowerCase();

  if (cmd.includes('comida') || cmd.includes('fome') || cmd.includes('aliment') || cmd.includes('comer')) {
    botReply('Certo! Vou ajudar você a encontrar locais próximos que oferecem alimentação.');
    openFoodShelterScreen('alimentacao');
    return;
  }

  if (cmd.includes('abrigo') || cmd.includes('dormir') || cmd.includes('casa') || cmd.includes('teto')) {
    botReply('Entendido! Estou abrindo os locais de abrigo e acolhimento disponíveis.');
    openFoodShelterScreen('abrigo');
    return;
  }

  if (cmd.includes('doar') || cmd.includes('doação') || cmd.includes('doacoes') || cmd.includes('roupa')) {
    botReply('Que ótima atitude! Vou mostrar os locais onde você pode entregar suas doações.');
    if (cmd.includes('roupa')) {
      navigateTo('screen-10');
      filterDonations('Roupas', null);
    } else {
      navigateTo('screen-10');
    }
    return;
  }

  if (cmd.includes('não sei') || cmd.includes('nao sei') || cmd.includes('ajuda') || cmd.includes('explica') || cmd.includes('apertar')) {
    const guide = screenVoiceGuides[appState.currentScreen] || 'Toque nos botões azuis para avançar.';
    botReply(guide);
    return;
  }

  if (cmd.includes('início') || cmd.includes('inicio') || cmd.includes('começar')) {
    botReply('Voltando para a página inicial.');
    navigateTo('screen-1');
    return;
  }

  if (cmd.includes('ticket') || cmd.includes('imprimir')) {
    if (appState.currentScreen === 'screen-7') {
      botReply('Vou abrir a janela de impressão do seu ticket agora.');
      printTicket();
    } else {
      botReply('Escolha uma instituição na tela de localização para gerar seu ticket.');
      navigateTo('screen-6');
    }
    return;
  }

  if (cmd.includes('ler') || cmd.includes('ouvir')) {
    readCurrentScreenAloud();
    return;
  }

  botReply('Entendi sua mensagem. Você pode dizer: preciso de comida, preciso de abrigo, quero doar roupas ou não sei o que apertar.');
}