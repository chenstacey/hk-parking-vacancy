// ── API ───────────────────────────────────────────────────────────────────
const INFO_URL    = 'https://resource.data.one.gov.hk/td/carpark/basic_info_all.json';
const VACANCY_URL = 'https://resource.data.one.gov.hk/td/carpark/vacancy_all.json';
const REFRESH_MS  = 60_000;

// ── Labels ────────────────────────────────────────────────────────────────
const VEHICLE_LABELS = { P: '私家車', M: '電單車', L: '輕型貨車', H: '重型貨車', C: '旅遊巴' };

const DISTRICT_LABELS = {
  'Central & Western': '中西區',
  'Eastern':           '東區',
  'Southern':          '南區',
  'Wan Chai':          '灣仔',
  'Kowloon City':      '九龍城',
  'Kwun Tong':         '觀塘',
  'Sham Shui Po':      '深水埗',
  'Wong Tai Sin':      '黃大仙',
  'Yau Tsim Mong':     '油尖旺',
  'Islands':           '離島',
  'Kwai Tsing':        '葵青',
  'North':             '北區',
  'Sai Kung':          '西貢',
  'Sha Tin':           '沙田',
  'Tai Po':            '大埔',
  'Tsuen Wan':         '荃灣',
  'Tuen Mun':          '屯門',
  'Yuen Long':         '元朗',
};

// ── Region groupings ──────────────────────────────────────────────────────
const REGIONS = [
  {
    id: 'hki', label: '港島',
    districts: ['Central & Western', 'Wan Chai', 'Eastern', 'Southern'],
  },
  {
    id: 'kln', label: '九龍',
    districts: ['Yau Tsim Mong', 'Sham Shui Po', 'Kowloon City', 'Wong Tai Sin', 'Kwun Tong'],
  },
  {
    id: 'nt', label: '新界',
    districts: ['Kwai Tsing', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long', 'North', 'Tai Po', 'Sha Tin', 'Sai Kung', 'Islands'],
  },
];

function getRegionDistricts(regionId) {
  const r = REGIONS.find(r => r.id === regionId);
  return r ? r.districts : null; // null = 全部
}

// ── Favourites (localStorage) ─────────────────────────────────────────────
function getFavourites() {
  try { return JSON.parse(localStorage.getItem('favourites') || '[]'); }
  catch (_) { return []; }
}

function isFavourite(parkId) {
  return getFavourites().includes(parkId);
}

function toggleFavourite(parkId) {
  const favs = getFavourites();
  const idx  = favs.indexOf(parkId);
  if (idx === -1) favs.push(parkId);
  else favs.splice(idx, 1);
  localStorage.setItem('favourites', JSON.stringify(favs));
  return idx === -1; // true = added
}

// ── Vacancy styling ───────────────────────────────────────────────────────
function vacancyStyle(vacancy, vacancyType) {
  if (vacancyType === 'C' || vacancy < 0)
    return { label: '關閉', bg: 'bg-gray-50', badge: 'bg-gray-100 text-gray-400', num: 'text-gray-300', dot: 'bg-gray-300' };
  if (vacancy === 0)
    return { label: '滿位', bg: 'bg-red-50',    badge: 'bg-red-100 text-red-600',      num: 'text-red-500',    dot: 'bg-red-400' };
  if (vacancy < 5)
    return { label: '極少', bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-600', num: 'text-orange-500', dot: 'bg-orange-400' };
  if (vacancy <= 20)
    return { label: '有限', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700', num: 'text-yellow-600', dot: 'bg-yellow-400' };
  return        { label: '充裕', bg: 'bg-green-50',  badge: 'bg-green-100 text-green-700',  num: 'text-green-600',  dot: 'bg-green-500' };
}

// ── Get private-car vacancy for a park from vacancy_all data ──────────────
function getParkVacancy(parkId, allVacancy) {
  const parks = allVacancy?.car_park || [];
  const park  = parks.find(p => p.park_id === parkId);
  if (!park) return null;
  const pvt = (park.vehicle_type || []).find(vt => vt.type === 'P');
  if (!pvt) return null;
  const hourly = (pvt.service_category || []).find(sc => sc.category === 'HOURLY');
  return hourly || null;
}

// ── Format HK time ────────────────────────────────────────────────────────
function formatHKTime(dateStr) {
  if (!dateStr) return '—';
  const t = dateStr.split(' ')[1];
  return t ? t.substring(0, 5) : dateStr;
}

// ── Search / filter ───────────────────────────────────────────────────────
// districts: single string, array of strings, or null/'' for all
function searchCarparks(query, districts, allInfo) {
  let results = allInfo || [];
  if (districts && districts.length) {
    const distArr = Array.isArray(districts) ? districts : [districts];
    results = results.filter(p => distArr.includes(p.district_en));
  }
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    results = results.filter(p =>
      (p.name_tc          || '').toLowerCase().includes(q) ||
      (p.name_en          || '').toLowerCase().includes(q) ||
      (p.displayAddress_tc|| '').toLowerCase().includes(q) ||
      (p.displayAddress_en|| '').toLowerCase().includes(q)
    );
  }
  return results;
}

// ── Fetch helpers ─────────────────────────────────────────────────────────
async function fetchAllInfo() {
  const res = await fetch(INFO_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`INFO ${res.status}`);
  return res.json();
}

async function fetchAllVacancy() {
  const res = await fetch(VACANCY_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`VACANCY ${res.status}`);
  return res.json();
}

// ── Tab bar HTML (injected into each page) ────────────────────────────────
function renderTabBar(active) {
  const tabs = [
    { id: 'home', href: 'index.html',  icon: '⊙', label: '首頁'  },
    { id: 'list', href: 'list.html',   icon: '☰', label: '列表'  },
    { id: 'map',  href: 'map.html',    icon: '◎', label: '地圖'  },
  ];
  return `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20 pb-safe">
      <div class="max-w-md mx-auto flex">
        ${tabs.map(t => `
          <a href="${t.href}" class="flex-1 flex flex-col items-center py-2 gap-0.5 ${t.id === active ? 'text-blue-500' : 'text-gray-400'} active:bg-gray-50">
            <span class="text-xl leading-none">${t.icon}</span>
            <span class="text-[10px] font-medium">${t.label}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

// ── Shared page shell CSS (injected via <style> in each page) ─────────────
const SHARED_STYLE = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    -webkit-tap-highlight-color: transparent;
    padding-bottom: 64px;
  }
  @keyframes spin     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeIn   { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .spinning   { animation: spin 0.6s linear infinite; }
  .fade-in    { animation: fadeIn 0.3s ease-out forwards; }
  .pulse-dot  { animation: pulseDot 1.5s ease-in-out infinite; }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
  }
`;
