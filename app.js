// ── Language ──────────────────────────────────────────────────────────────
function getLang() {
  return localStorage.getItem('lang') || 'tc';
}
function setLang(lang) {
  localStorage.setItem('lang', lang);
  location.reload();
}
function t(key) {
  return (STRINGS[getLang()] || STRINGS.tc)[key] || key;
}

// Carpark name / address helpers
function parkName(park) {
  return getLang() === 'en' ? (park.name_en || park.name_tc) : (park.name_tc || park.name_en);
}
function parkAddress(park) {
  return getLang() === 'en'
    ? (park.displayAddress_en || park.displayAddress_tc)
    : (park.displayAddress_tc || park.displayAddress_en);
}
function parkRemark(park) {
  return getLang() === 'en' ? (park.remark_en || park.remark_tc) : (park.remark_tc || park.remark_en);
}
function parkDistrict(park) {
  return getLang() === 'en' ? (park.district_en || '') : (park.district_tc || park.district_en || '');
}

// Renders the EN/中 toggle button HTML
function renderLangToggle() {
  const lang = getLang();
  return `
    <button onclick="setLang('${lang === 'tc' ? 'en' : 'tc'}')"
      class="text-xs font-semibold text-gray-400 border border-gray-200 rounded-lg px-2.5 py-1 active:bg-gray-100 transition-colors shrink-0">
      ${lang === 'tc' ? 'EN' : '中'}
    </button>`;
}

// ── Strings ───────────────────────────────────────────────────────────────
const STRINGS = {
  tc: {
    // Vacancy status
    ample: '充裕', limited: '有限', scarce: '極少', full: '滿位', closed: '關閉',
    // Vehicle types
    P: '私家車', M: '電單車', L: '輕型貨車', H: '重型貨車', C: '旅遊巴',
    // Regions
    hki: '港島', kln: '九龍', nt: '新界', all: '全部',
    allDistricts: '全區',
    // Tab bar
    home: '首頁', list: '列表', map: '地圖',
    // Index
    hk: '香港', appTitle: '停車場空位',
    searchPlaceholder: '輸入停車場名稱…',
    allCarparks: '全部列表', searchFilter: '搜索 · 篩選地區',
    mapView: '地圖視圖', comingSoon: '搜索地址 · 查看咪表',
    favourites: '⭐ 收藏夾', browseAll: '瀏覽全部',
    noFavourites: '尚無收藏',
    noFavHint: '在停車場詳情頁點擊 ★ 即可收藏',
    browseCarparks: '瀏覽停車場',
    suggested: '📍 推薦',
    dataSource: '數據來源：香港運輸署開放數據',
    // List
    carparks: '停車場', loading: '載入中…',
    loadError: '無法獲取數據', checkNetwork: '請檢查網絡連接', retry: '重試',
    countCarparks: n => `共 ${n} 個停車場`,
    noResults: '找不到相關停車場',
    // Detail
    lastUpdated: t => `最後更新：${t}`,
    lastSuccess: t => `上次成功：${t}`,
    noConnection: '無法連線',
    refreshNow: '立即更新',
    noVacancyData: '暫無空位資料',
    spaces: '個空位', estimated: '(估算)',
    evSpaces: n => `⚡ 電動車充電位　${n} 個`,
    disSpaces: n => `♿ 殘障車位　${n} 個`,
    rates: '收費資訊', carparkInfo: '停車場資訊',
    district: '地區', phone: '電話', website: '網站', heightLimit: '車高限制',
    autoRefresh: '每60秒自動更新',
    openStatus: '開放中', closedStatus: '已關閉', loadingStatus: '載入中',
    favourite: '收藏',
    // Map
    viewDetails: '查看詳情', privateCar: '私家車',
    mapLoading: '地圖載入中…', mapError: '無法載入地圖數據',
    // Address search & meters
    searchAddressPlaceholder: '輸入地址搜索附近…',
    searching: '搜索中…', noAddressResult: '找不到該地址',
    meters: '咪表', carparks: '停車場',
    meterVacant: '空置', meterOccupied: '已泊', meterOff: '停用',
    nearbyRadius: '800米範圍', loadingMeters: '載入咪表數據…',
    openMap: '在地圖查看',
  },
  en: {
    // Vacancy status
    ample: 'Ample', limited: 'Limited', scarce: 'Scarce', full: 'Full', closed: 'Closed',
    // Vehicle types
    P: 'Private Car', M: 'Motorcycle', L: 'Light Goods', H: 'Heavy Goods', C: 'Coach',
    // Regions
    hki: 'HK Island', kln: 'Kowloon', nt: 'New Territories', all: 'All',
    allDistricts: 'All Districts',
    // Tab bar
    home: 'Home', list: 'List', map: 'Map',
    // Index
    hk: 'Hong Kong', appTitle: 'Parking Vacancy',
    searchPlaceholder: 'Search carpark name…',
    allCarparks: 'All Carparks', searchFilter: 'Search · Filter by district',
    mapView: 'Map View', comingSoon: 'Search address · View meters',
    favourites: '⭐ Favourites', browseAll: 'Browse All',
    noFavourites: 'No favourites yet',
    noFavHint: 'Tap ★ on a carpark detail page to add favourites',
    browseCarparks: 'Browse Carparks',
    suggested: '📍 Suggested',
    dataSource: 'Data: Transport Department, HKSAR',
    // List
    carparks: 'Carparks', loading: 'Loading…',
    loadError: 'Unable to load data', checkNetwork: 'Please check your network connection', retry: 'Retry',
    countCarparks: n => `${n} carparks`,
    noResults: 'No carparks found',
    // Detail
    lastUpdated: t => `Updated: ${t}`,
    lastSuccess: t => `Last success: ${t}`,
    noConnection: 'Connection failed',
    refreshNow: 'Refresh',
    noVacancyData: 'No vacancy data available',
    spaces: ' spaces', estimated: '(est.)',
    evSpaces: n => `⚡ EV charging　${n} spaces`,
    disSpaces: n => `♿ Accessible　${n} spaces`,
    rates: 'Parking Rates', carparkInfo: 'Carpark Info',
    district: 'District', phone: 'Phone', website: 'Website', heightLimit: 'Height Limit',
    autoRefresh: 'Auto-refresh every 60s',
    openStatus: 'Open', closedStatus: 'Closed', loadingStatus: 'Loading',
    favourite: 'Favourite',
    // Map
    viewDetails: 'View Details', privateCar: 'Private Car',
    mapLoading: 'Loading map data…', mapError: 'Unable to load map data',
    // Address search & meters
    searchAddressPlaceholder: 'Search address for nearby…',
    searching: 'Searching…', noAddressResult: 'Address not found',
    meters: 'Meters', carparks: 'Carparks',
    meterVacant: 'Vacant', meterOccupied: 'Occupied', meterOff: 'Off',
    nearbyRadius: '800m radius', loadingMeters: 'Loading meter data…',
    openMap: 'View on Map',
    spaces: ' spaces',
  },
};

// ── API ───────────────────────────────────────────────────────────────────
const INFO_URL    = 'https://resource.data.one.gov.hk/td/carpark/basic_info_all.json';
const VACANCY_URL = 'https://resource.data.one.gov.hk/td/carpark/vacancy_all.json';
const REFRESH_MS  = 60_000;

// ── Labels (use t() at runtime) ───────────────────────────────────────────
function vehicleLabel(type) { return t(type) || type; }

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
    return { label: t('closed'),  bg: 'bg-gray-50',   badge: 'bg-gray-100 text-gray-400',    num: 'text-gray-300',   dot: 'bg-gray-300' };
  if (vacancy === 0)
    return { label: t('full'),    bg: 'bg-red-50',    badge: 'bg-red-100 text-red-600',       num: 'text-red-500',    dot: 'bg-red-400' };
  if (vacancy < 5)
    return { label: t('scarce'),  bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-600', num: 'text-orange-500', dot: 'bg-orange-400' };
  if (vacancy <= 20)
    return { label: t('limited'), bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700', num: 'text-yellow-600', dot: 'bg-yellow-400' };
  return        { label: t('ample'),  bg: 'bg-green-50',  badge: 'bg-green-100 text-green-700',  num: 'text-green-600',  dot: 'bg-green-500' };
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

// ── Meter API ─────────────────────────────────────────────────────────────
const METER_INFO_URL     = 'https://resource.data.one.gov.hk/td/psiparkingspaces/spaceinfo/parkingspaces.csv';
const METER_VACANCY_URL  = 'https://resource.data.one.gov.hk/td/psiparkingspaces/occupancystatus/occupancystatus.csv';

// ── CSV parser ────────────────────────────────────────────────────────────
// Skips leading non-header lines (e.g. date row + blank row in meter CSVs)
function parseCSV(text) {
  const lines = text.replace(/\r/g, '').trim().split('\n');
  // Find the first line that looks like a real header (contains multiple commas and no spaces-only content)
  const headerIdx = lines.findIndex(l => l.split(',').length > 3 && l.trim() && !l.match(/^,+$/));
  if (headerIdx < 0) return [];
  const headers = lines[headerIdx].split(',').map(h => h.trim().replace(/^\uFEFF/, ''));
  return lines.slice(headerIdx + 1).filter(l => l.trim()).map(line => {
    const vals = line.split(',');
    const obj  = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim(); });
    return obj;
  });
}

// ── Haversine distance (km) ───────────────────────────────────────────────
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Fetch helpers ─────────────────────────────────────────────────────────
async function fetchAllInfo() {
  const res = await fetch(INFO_URL, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`INFO ${res.status}`);
  return res.json();
}

async function fetchAllVacancy() {
  const res = await fetch(VACANCY_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`VACANCY ${res.status}`);
  return res.json();
}

// Fetch + join meter location + occupancy, return array of merged rows
async function fetchMeters() {
  const [infoText, vacText] = await Promise.all([
    fetch(METER_INFO_URL,    { cache: 'default' }).then(r => r.text()),
    fetch(METER_VACANCY_URL, { cache: 'no-store' }).then(r => r.text()),
  ]);
  const infoRows  = parseCSV(infoText);
  const vacRows   = parseCSV(vacText);
  // Build occupancy lookup: ParkingSpaceId → { status, meterStatus }
  const vacMap = {};
  vacRows.forEach(r => { vacMap[r.ParkingSpaceId] = r; });
  // Merge
  return infoRows.map(row => {
    const occ = vacMap[row.ParkingSpaceId] || {};
    return {
      id:      row.ParkingSpaceId,
      lat:     parseFloat(row.Latitude),
      lng:     parseFloat(row.Longitude),
      street:  row.Street_tc || row.Street,
      district:row.District_tc || row.District,
      status:  occ.OccupancyStatus    || 'U',   // V=Vacant O=Occupied U=Unknown
      meterOk: occ.ParkingMeterStatus !== 'NU',  // false = not in use
    };
  }).filter(r => r.lat && r.lng);
}

// ── Navigation picker (bottom sheet) ─────────────────────────────────────
function showNavPicker(lat, lng) {
  let sheet = document.getElementById('nav-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'nav-sheet';
    sheet.innerHTML = `
      <div id="nav-sheet-bg" onclick="closeNavPicker()"
        style="position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9998"></div>
      <div style="position:fixed;left:0;right:0;bottom:0;z-index:9999;background:white;border-radius:20px 20px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom))">
        <div style="width:36px;height:4px;background:#e5e7eb;border-radius:2px;margin:0 auto 16px"></div>
        <p id="nav-sheet-title" style="font-size:13px;font-weight:700;color:#111;text-align:center;margin:0 0 14px"></p>
        <div id="nav-sheet-btns" style="display:flex;flex-direction:column;gap:10px"></div>
        <button onclick="closeNavPicker()" style="margin-top:12px;width:100%;padding:13px;background:#f3f4f6;border:none;border-radius:14px;font-size:14px;font-weight:600;color:#6b7280">${getLang()==='en'?'Cancel':'取消'}</button>
      </div>`;
    document.body.appendChild(sheet);
  }
  const apps = [
    { label: 'Apple Maps', icon: '🗺️', url: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d` },
    { label: 'Google Maps', icon: '🌐', url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` },
    { label: 'Waze', icon: '🚗', url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes` },
    { label: getLang()==='en'?'Amap (高德)':'高德地圖', icon: '📍', url: `https://uri.amap.com/navigation?to=${lng},${lat}&mode=car&src=hk-parking` },
  ];
  document.getElementById('nav-sheet-title').textContent = getLang()==='en'?'Open in…':'選擇導航應用';
  document.getElementById('nav-sheet-btns').innerHTML = apps.map(a =>
    `<a href="${a.url}" target="_blank" onclick="closeNavPicker()"
      style="display:flex;align-items:center;gap:12px;padding:13px 16px;background:#f9fafb;border-radius:14px;text-decoration:none;color:#111;font-size:14px;font-weight:600">
      <span style="font-size:20px">${a.icon}</span>${a.label}
    </a>`
  ).join('');
  sheet.style.display = 'block';
}

function closeNavPicker() {
  const sheet = document.getElementById('nav-sheet');
  if (sheet) sheet.style.display = 'none';
}

function renderNavButton(lat, lng) {
  return `<button onclick="showNavPicker(${lat},${lng})"
    class="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full active:bg-blue-600 transition-colors">
    <span>◎</span><span>${getLang()==='en'?'Navigate':'導航'}</span>
  </button>`;
}

// ── Tab bar HTML (injected into each page) ────────────────────────────────
function renderTabBar(active) {
  const tabs = [
    { id: 'home', href: 'index.html',  icon: '⊙', label: t('home') },
    { id: 'list', href: 'list.html',   icon: '☰', label: t('list') },
    { id: 'map',  href: 'map.html',    icon: '◎', label: t('map')  },
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
