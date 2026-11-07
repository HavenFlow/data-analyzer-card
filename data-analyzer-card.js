/**
 * HavenFlow Data Analyzer Card v1.0.9
 * Custom Lovelace Card / Dashboard Panel for Home Assistant
 * Synchronized multi-chart LTS analyzer with Floating Bars (Min/Max + Avg Line),
 * dynamic metric-based coloring, Year-over-Year / offset comparison columns,
 * live entity autocomplete dropdown, and YAML GUI configuration sync.
 */

const CARD_VERSION = '1.0.9';

console.info(
  `%c HAVENFLOW-DATA-ANALYZER %c v${CARD_VERSION} `,
  'color: #fff; background: #0288d1; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #0288d1; background: #e1f5fe; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);

const TRANSLATIONS = {
  pl: {
    title: 'Analiza Danych',
    prevJump: 'Wstecz o okres (skok)',
    prevDay: 'Wstecz o 1 dzień',
    today: 'Dziś',
    nextDay: 'Naprzód o 1 dzień',
    nextJump: 'Naprzód o okres (skok)',
    gridAlign: '📅 Pełny Okres',
    periodHour: 'Godzinowa (1h)',
    periodDay: 'Dzienna (1d)',
    periodWeek: 'Tygodniowa (1w)',
    periodMonth: 'Miesięczna (1m)',
    btnCompare: '⚖️ Porównaj (YoY)',
    offset1y: '-1 Rok (YoY)',
    offset1m: '-1 Miesiąc (MoM)',
    offset7d: '-7 Dni (WoW)',
    offsetCustom: 'Własne dni...',
    btnAddChart: '➕ Wykres',
    btnSaveLayout: '💾 Zapisz układ',
    btnResetLayout: '🔄 Reset',
    periodLabelPrimary: '📅 Okres badany:',
    periodLabelCompare: '⏮️ Okres porównawczy:',
    offsetLabel: 'Przesunięcie:',
    daysLabel: 'dni',
    loading: ' (Ładowanie...)',
    searchEntity: '🔍 Szukaj encji...',
    searchEntityTitle: 'Wpisz i wybierz encję',
    chartTypeFloat: 'Floating Bars (Min/Max + Śr)',
    chartTypeBar: 'Słupkowy (Bar)',
    chartTypeLine: 'Liniowy (Line)',
    chartTypeArea: 'Obszarowy (Area)',
    chartTypeStep: 'Schodkowy (Step)',
    colorByMean: 'Kolor wg: Średniej',
    colorByMax: 'Kolor wg: Max',
    colorByMin: 'Kolor wg: Min',
    colorByValue: 'Kolor wg: Wartości',
    colorByFixed: 'Stały kolor',
    schemeThermal: 'Termiczna (Niebieski-Czerwony)',
    schemeEnergy: 'Zużycie (Zielony-Fiolet)',
    schemeViridis: 'Viridis',
    schemeOcean: 'Ocean',
    settingsBtn: 'Zaawansowane ustawienia',
    heightLabel: 'Wysokość wykresu (px):',
    nameLabel: 'Nazwa własna wykresu:',
    unitLabel: 'Jednostka (opcjonalnie):',
    unitPlaceholder: 'Auto z encji',
    statLabel: 'Statystyka (dla słupków/linii):',
    statMinMaxMean: 'Min/Max + Średnia',
    statMean: 'Średnia (mean)',
    statChange: 'Przyrost / Zużycie (change)',
    statSum: 'Suma (sum)',
    statMin: 'Minimum (min)',
    statMax: 'Maksimum (max)',
    cminLabel: 'Min dla skali kolorów:',
    cmaxLabel: 'Max dla skali kolorów:',
    cautoPlaceholder: 'Auto',
    avgLineLabel: 'Linia (wł/wył)',
    labelsLabel: 'Etykiety',
    removeChartBtn: '🗑️ Usuń wykres',
    moveUpBtn: '⬆️ Do góry',
    moveDownBtn: '⬇️ W dół',
    noData: 'Brak danych LTS dla encji',
    hoverSync: 'Najedź kursorem na wykres, aby zsynchronizować odczyt...',
    toastSaved: '💾 Zapisano! Odśwież stronę, aby załadować nową konfigurację.',
    toastReset: '🔄 Przywrócono układ domyślny z YAML.',
    min: 'Min',
    max: 'Max',
    avg: 'Śr',
    sum: 'Suma',
    langLabel: 'Język / Language:'
  },
  en: {
    title: 'Data Analysis',
    prevJump: 'Backward by period (jump)',
    prevDay: 'Backward 1 day',
    today: 'Today',
    nextDay: 'Forward 1 day',
    nextJump: 'Forward by period (jump)',
    gridAlign: '📅 Full Period',
    periodHour: 'Hourly (1h)',
    periodDay: 'Daily (1d)',
    periodWeek: 'Weekly (1w)',
    periodMonth: 'Monthly (1m)',
    btnCompare: '⚖️ Compare (YoY)',
    offset1y: '-1 Year (YoY)',
    offset1m: '-1 Month (MoM)',
    offset7d: '-7 Days (WoW)',
    offsetCustom: 'Custom days...',
    btnAddChart: '➕ Add Chart',
    btnSaveLayout: '💾 Save Layout',
    btnResetLayout: '🔄 Reset',
    periodLabelPrimary: '📅 Primary Period:',
    periodLabelCompare: '⏮️ Compare Period:',
    offsetLabel: 'Offset:',
    daysLabel: 'days',
    loading: ' (Loading...)',
    searchEntity: '🔍 Search entity...',
    searchEntityTitle: 'Type and select an entity',
    chartTypeFloat: 'Floating Bars (Min/Max + Avg)',
    chartTypeBar: 'Bar Chart',
    chartTypeLine: 'Line Chart',
    chartTypeArea: 'Area Chart',
    chartTypeStep: 'Step Chart',
    colorByMean: 'Color by: Mean',
    colorByMax: 'Color by: Max',
    colorByMin: 'Color by: Min',
    colorByValue: 'Color by: Value',
    colorByFixed: 'Fixed Color',
    schemeThermal: 'Thermal (Blue-Red)',
    schemeEnergy: 'Energy (Green-Purple)',
    schemeViridis: 'Viridis',
    schemeOcean: 'Ocean',
    settingsBtn: 'Advanced settings',
    heightLabel: 'Chart height (px):',
    nameLabel: 'Custom chart name:',
    unitLabel: 'Unit (optional):',
    unitPlaceholder: 'Auto from entity',
    statLabel: 'Statistic (for bars/lines):',
    statMinMaxMean: 'Min/Max + Mean',
    statMean: 'Mean',
    statChange: 'Change / Consumption',
    statSum: 'Sum',
    statMin: 'Minimum',
    statMax: 'Maximum',
    cminLabel: 'Min for color scale:',
    cmaxLabel: 'Max for color scale:',
    cautoPlaceholder: 'Auto',
    avgLineLabel: 'Line (on/off)',
    labelsLabel: 'Labels',
    removeChartBtn: '🗑️ Remove chart',
    moveUpBtn: '⬆️ Move Up',
    moveDownBtn: '⬇️ Move Down',
    noData: 'No LTS data for entity',
    hoverSync: 'Hover over the chart to synchronize reading...',
    toastSaved: '💾 Saved! Refresh the page to load the new configuration.',
    toastReset: '🔄 Restored default layout from YAML.',
    min: 'Min',
    max: 'Max',
    avg: 'Avg',
    sum: 'Sum',
    langLabel: 'Język / Language:'
  }
};

const COLOR_PRESETS = {
  thermal: [
    { v: -15, c: [49, 54, 149] },
    { v: 0,   c: [69, 117, 180] },
    { v: 10,  c: [171, 217, 233] },
    { v: 18,  c: [254, 224, 144] },
    { v: 25,  c: [244, 109, 67] },
    { v: 35,  c: [215, 48, 39] }
  ],
  energy: [
    { v: 0,  c: [46, 204, 113] },
    { v: 5,  c: [241, 196, 15] },
    { v: 12, c: [230, 126, 34] },
    { v: 25, c: [231, 76, 60] },
    { v: 50, c: [142, 68, 173] }
  ],
  viridis: [
    { v: 0,   c: [68, 1, 84] },
    { v: 25,  c: [59, 82, 139] },
    { v: 50,  c: [33, 145, 140] },
    { v: 75,  c: [94, 201, 98] },
    { v: 100, c: [253, 231, 37] }
  ],
  ocean: [
    { v: 0,   c: [13, 71, 161] },
    { v: 50,  c: [3, 169, 244] },
    { v: 100, c: [0, 230, 118] }
  ]
};

function interpolateColor(val, minVal, maxVal, schemeName, customMin, customMax) {
  const stops = COLOR_PRESETS[schemeName] || COLOR_PRESETS.thermal;
  const lo = (customMin !== undefined && customMin !== '' && !isNaN(customMin)) ? Number(customMin) : minVal;
  const hi = (customMax !== undefined && customMax !== '' && !isNaN(customMax)) ? Number(customMax) : maxVal;

  if (val === null || val === undefined || isNaN(val)) return 'rgba(150, 150, 150, 0.45)';
  const range = (hi - lo) || 1;
  const t = Math.max(0, Math.min(1, (val - lo) / range));

  const scaledIdx = t * (stops.length - 1);
  const idx = Math.floor(scaledIdx);
  const frac = scaledIdx - idx;

  if (idx >= stops.length - 1) {
    const c = stops[stops.length - 1].c;
    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.85)`;
  }
  const c1 = stops[idx].c;
  const c2 = stops[idx + 1].c;
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * frac);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * frac);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * frac);
  return `rgba(${r}, ${g}, ${b}, 0.85)`;
}

class HavenFlowDataAnalyzerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = {};
    
    this._storageKey = 'havenflow_data_analyzer_default';
    this._cleanYamlState = null;
    
    this._state = {
      endDate: new Date(),
      spanDays: 30,
      period: 'day',
      alignToGrid: false, 
      compareMode: false,
      compareOffsetType: '1y',
      compareCustomDays: 365,
      hoverIndex: null, 
      loading: false,
      error: null,
      charts: [],
      dataPrimary: {},
      dataCompare: {},
      settingsOpen: null,
      hasSavedState: false, // flag indicating if UI diverges from loaded YAML
      lang: 'pl',
      localeString: 'pl-PL'
    };
    this._fetchTimer = null;
    this._entitiesPopulated = false;
  }
  
  t(key) {
    return TRANSLATIONS[this._state.lang][key] || TRANSLATIONS['pl'][key] || key;
  }
  
  formatVal(val) {
      if (val === null || val === undefined) return '-';
      return val.toLocaleString(this._state.localeString, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
      });
  }
  
  formatDateShort(ts, period) {
    const d = new Date(ts);
    if (period === 'hour') {
      return d.toLocaleDateString(this._state.localeString, { day: '2-digit', month: '2-digit' }) + ' ' +
             d.toLocaleTimeString(this._state.localeString, { hour: '2-digit', minute: '2-digit' });
    }
    if (period === 'month') {
      return d.toLocaleDateString(this._state.localeString, { month: 'short', year: 'numeric' });
    }
    return d.toLocaleDateString(this._state.localeString, { day: '2-digit', month: '2-digit' });
  }

  formatDateFull(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(this._state.localeString, { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  static getConfigElement() {
    return document.createElement('data-analyzer-card-editor');
  }

  static getStubConfig() {
    return {
      title: 'Analiza Korelacji i Zużycia (YoY)',
      language: 'pl',
      default_span_days: 30,
      default_period: 'day',
      align_to_grid: false,
      compare_enabled: false,
      compare_offset: '1y',
      charts: [
        {
          entity: 'sensor.netatmo_taras_temperature',
          name: 'Temperatura Zewnętrzna',
          unit: '°C',
          chart_type: 'floating_bars',
          stat_mode: 'minmax_mean',
          color_by: 'mean',
          color_scheme: 'thermal',
          color_min: -10,
          color_max: 30,
          show_avg_line: true,
          show_labels: true,
          height: 220
        },
        {
          entity: 'sensor.gaz_dzienne_zuzycie',
          name: 'Zużycie Gazu / Energii',
          unit: 'm³',
          chart_type: 'bar',
          stat_mode: 'change',
          color_by: 'value',
          color_scheme: 'energy',
          color_min: 0,
          color_max: 15,
          show_avg_line: false,
          show_labels: true,
          height: 200
        }
      ]
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Brak poprawnej konfiguracji karty.');
    }
    this._config = JSON.parse(JSON.stringify(config));
    
    // Klucz pamietajacy TYLKO pozycję czasową miedzy F5, 
    // Cala reszta konfiguracji bedzie szla przez natywny event HA do YAML
    const slug = (config.title || 'default').toString().toLowerCase().replace(/[^a-z0-9_]+/g, '_');
    this._storageKey = `havenflow_analyzer_time_${slug}`;
    
    this._state.lang = config.language && ['pl', 'en'].includes(config.language) ? config.language : 'pl';
    this._state.localeString = this._state.lang === 'pl' ? 'pl-PL' : 'en-US';

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    this._state.endDate = end;

    this._applyYamlDefaults(config);
    this._loadTemporalStateFromStorage();

    this._renderSkeleton();
    this._scheduleFetch();
  }

  _applyYamlDefaults(config) {
    this._state.spanDays = Number(config.default_span_days) || 30;
    this._state.period = config.default_period || 'day';
    this._state.alignToGrid = Boolean(config.align_to_grid);
    this._state.compareMode = Boolean(config.compare_enabled);
    this._state.compareOffsetType = config.compare_offset || '1y';
    this._state.compareCustomDays = Number(config.compare_custom_days) || 365;
    
    this._saveToYamlParams = {
        title: config.title || this.t('title')
    };

    this._state.charts = (config.charts || []).map((c, idx) => ({
      id: `chart_${idx}_${Date.now()}`,
      entity: c.entity || '',
      name: c.name || c.entity || `Chart ${idx + 1}`,
      unit: c.unit || '',
      chart_type: c.chart_type || 'floating_bars',
      stat_mode: c.stat_mode || (c.chart_type === 'floating_bars' ? 'minmax_mean' : 'mean'),
      color_by: c.color_by || 'mean',
      color_scheme: c.color_scheme || 'thermal',
      fixed_color: c.fixed_color || '#0288d1',
      color_min: c.color_min !== undefined ? c.color_min : '',
      color_max: c.color_max !== undefined ? c.color_max : '',
      show_avg_line: c.show_avg_line !== undefined ? c.show_avg_line : true,
      show_labels: c.show_labels !== undefined ? c.show_labels : true,
      height: Number(c.height) || 210
    }));
    
    this._cleanYamlState = JSON.stringify(this._generateYamlConfig());
    this._state.hasSavedState = false;
  }
  
  _generateYamlConfig() {
      const config = {
          type: 'custom:data-analyzer-card',
          title: this._saveToYamlParams.title,
          language: this._state.lang,
          default_span_days: this._state.spanDays,
          default_period: this._state.period,
          align_to_grid: this._state.alignToGrid,
          compare_enabled: this._state.compareMode,
          compare_offset: this._state.compareOffsetType,
          compare_custom_days: this._state.compareCustomDays,
          charts: this._state.charts.map(c => ({
              entity: c.entity,
              name: c.name,
              unit: c.unit,
              chart_type: c.chart_type,
              stat_mode: c.stat_mode,
              color_by: c.color_by,
              color_scheme: c.color_scheme,
              fixed_color: c.fixed_color,
              color_min: c.color_min !== '' ? Number(c.color_min) : undefined,
              color_max: c.color_max !== '' ? Number(c.color_max) : undefined,
              show_avg_line: c.show_avg_line,
              show_labels: c.show_labels,
              height: c.height
          }))
      };
      
      config.charts.forEach(c => {
          Object.keys(c).forEach(key => c[key] === undefined && delete c[key]);
      });
      return config;
  }
  
  _checkDirtyState() {
      const current = JSON.stringify(this._generateYamlConfig());
      this._state.hasSavedState = (current !== this._cleanYamlState);
      this._updateResetButtonVisibility();
  }
  
  // WAZNE: Zapisywanie bezposrednio do YAML w Dashboardzie
  _saveLayoutToYaml() {
      const newConfig = this._generateYamlConfig();
      const event = new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      
      this._cleanYamlState = JSON.stringify(newConfig);
      this._state.hasSavedState = false;
      this._updateResetButtonVisibility();
      
      this._showToast(this.t('toastSaved'));
  }

  _loadTemporalStateFromStorage() {
    try {
      const raw = localStorage.getItem(this._storageKey);
      if (raw) {
          const saved = JSON.parse(raw);
          if (saved.endDate) {
              this._state.endDate = new Date(saved.endDate);
          }
      }
    } catch (e) {}
  }
  
  _saveTemporalStateToStorage() {
      try {
          localStorage.setItem(this._storageKey, JSON.stringify({ endDate: this._state.endDate.toISOString() }));
      } catch (e) {}
  }

  _uiModified() {
      this._checkDirtyState();
      this._renderChartsContent();
  }

  _resetLayoutFromYaml() {
      this._applyYamlDefaults(this._config);
      this._renderSkeleton();
      this._populateEntityDatalist();
      this._scheduleFetch();
      this._showToast(this.t('toastReset'));
  }

  _showToast(msg) {
    const toastEl = this.shadowRoot.getElementById('analyzerToast');
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateY(0)';
    if (this._toastTimeout) clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(10px)';
    }, 4000);
  }

  _updateResetButtonVisibility() {
    const btnReset = this.shadowRoot.getElementById('btnResetLayout');
    const btnSave = this.shadowRoot.getElementById('btnSaveLayout');
    if (btnReset) {
      btnReset.style.display = this._state.hasSavedState ? 'inline-block' : 'none';
    }
    if (btnSave) {
      btnSave.classList.toggle('highlight-save', this._state.hasSavedState);
    }
  }

  set hass(hass) {
    const firstLoad = !this._hass && hass;
    this._hass = hass;
    if (firstLoad) {
      this._populateEntityDatalist();
      this._scheduleFetch();
    }
  }

  _getEntityCatalog() {
    if (!this._hass || !this._hass.states) return [];
    const allowedDomains = ['sensor', 'weather', 'climate', 'input_number', 'number', 'counter', 'utility_meter'];
    return Object.keys(this._hass.states)
      .filter(id => {
        const domain = id.split('.')[0];
        return allowedDomains.includes(domain);
      })
      .sort()
      .map(id => {
        const st = this._hass.states[id];
        const fn = st?.attributes?.friendly_name || id;
        const unit = st?.attributes?.unit_of_measurement || '';
        return { id, name: fn, unit };
      });
  }

  _populateEntityDatalist() {
    if (!this._hass || !this.shadowRoot) return;
    this._entitiesPopulated = true;
  }

  _scheduleFetch() {
    if (!this._hass || !this._state.charts.length) return;
    if (this._fetchTimer) clearTimeout(this._fetchTimer);
    this._fetchTimer = setTimeout(() => {
      this._fetchStatistics();
    }, 80);
  }

  _getStartDate(endDate, spanDays) {
    const start = new Date(endDate.getTime());
    
    if (this._state.alignToGrid) {
      if (this._state.period === 'week') {
        start.setDate(start.getDate() - spanDays + 1);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);
      } else if (this._state.period === 'month') {
        start.setDate(start.getDate() - spanDays + 1);
        start.setDate(1); 
      } else if (this._state.period === 'day' || this._state.period === 'hour') {
        start.setDate(start.getDate() - spanDays + 1);
        if (spanDays === 30 || spanDays === 60 || spanDays === 90) {
            start.setDate(1);
        } else if (spanDays === 7 || spanDays === 14) {
            const day = start.getDay();
            const diff = start.getDate() - day + (day === 0 ? -6 : 1);
            start.setDate(diff);
        } else if (spanDays === 365) {
            start.setMonth(0, 1);
        }
      }
    } else {
        start.setDate(start.getDate() - spanDays + 1);
    }
    start.setHours(0, 0, 0, 0);
    return start;
  }
  
  _recalcEndDateForGrid(start, spanDays) {
      const end = new Date(start.getTime());
      if (this._state.alignToGrid) {
          if (spanDays === 30 || spanDays === 60 || spanDays === 90) {
              end.setMonth(end.getMonth() + (spanDays/30));
              end.setDate(0);
          } else if (spanDays === 7 || spanDays === 14) {
              end.setDate(end.getDate() + spanDays - 1);
          } else if (spanDays === 365) {
              end.setFullYear(end.getFullYear() + 1);
              end.setDate(0);
          } else {
              end.setDate(end.getDate() + spanDays - 1);
          }
      } else {
          end.setDate(end.getDate() + spanDays - 1);
      }
      end.setHours(23, 59, 59, 999);
      return end;
  }

  _getOffsetDates(startDate, endDate) {
    const s = new Date(startDate.getTime());
    const e = new Date(endDate.getTime());
    const type = this._state.compareOffsetType;
    if (type === '1y') {
      s.setFullYear(s.getFullYear() - 1);
      e.setFullYear(e.getFullYear() - 1);
    } else if (type === '1m') {
      s.setMonth(s.getMonth() - 1);
      e.setMonth(e.getMonth() - 1);
    } else if (type === '7d') {
      s.setDate(s.getDate() - 7);
      e.setDate(e.getDate() - 7);
    } else {
      const days = Number(this._state.compareCustomDays) || 365;
      s.setDate(s.getDate() - days);
      e.setDate(e.getDate() - days);
    }
    return { start: s, end: e };
  }

  async _fetchStatistics() {
    if (!this._hass) return;
    const entities = [...new Set(this._state.charts.map(c => c.entity).filter(Boolean))];
    if (!entities.length) return;

    this._state.loading = true;
    this._state.error = null;

    let startPrimary = this._getStartDate(this._state.endDate, this._state.spanDays);
    if(this._state.alignToGrid) {
       this._state.endDate = this._recalcEndDateForGrid(startPrimary, this._state.spanDays);
    }
    const endPrimary = this._state.endDate;
    const period = this._state.period;
    
    this._updateHeaderState();

    try {
      const primaryRes = await this._hass.callWS({
        type: 'recorder/statistics_during_period',
        start_time: startPrimary.toISOString(),
        end_time: endPrimary.toISOString(),
        statistic_ids: entities,
        period: period,
        types: ['mean', 'min', 'max', 'sum', 'state', 'change']
      });

      this._state.dataPrimary = this._normalizeBuckets(
        primaryRes || {},
        startPrimary,
        endPrimary,
        period,
        entities
      );

      if (this._state.compareMode) {
        const { start: startComp, end: endComp } = this._getOffsetDates(startPrimary, endPrimary);
        const compareRes = await this._hass.callWS({
          type: 'recorder/statistics_during_period',
          start_time: startComp.toISOString(),
          end_time: endComp.toISOString(),
          statistic_ids: entities,
          period: period,
          types: ['mean', 'min', 'max', 'sum', 'state', 'change']
        });
        this._state.dataCompare = this._normalizeBuckets(
          compareRes || {},
          startComp,
          endComp,
          period,
          entities
        );
      } else {
        this._state.dataCompare = {};
      }

      this._state.loading = false;
      this._renderChartsContent();
    } catch (err) {
      console.error('HavenFlow Data Analyzer WS Error:', err);
      this._state.loading = false;
      this._state.error = err.message || 'Error fetching LTS from Home Assistant Recorder.';
      this._renderChartsContent();
    }
  }

  _normalizeBuckets(rawStats, startDate, endDate, period, entities) {
    const timeline = [];
    const cur = new Date(startDate.getTime());
    if (period === 'hour') {
      cur.setMinutes(0, 0, 0);
      while (cur <= endDate) {
        timeline.push(cur.getTime());
        cur.setHours(cur.getHours() + 1);
      }
    } else if (period === 'week') {
      cur.setHours(0, 0, 0, 0);
      while (cur <= endDate) {
        timeline.push(cur.getTime());
        cur.setDate(cur.getDate() + 7);
      }
    } else if (period === 'month') {
      cur.setDate(1);
      cur.setHours(0, 0, 0, 0);
      while (cur <= endDate) {
        timeline.push(cur.getTime());
        cur.setMonth(cur.getMonth() + 1);
      }
    } else {
      cur.setHours(0, 0, 0, 0);
      while (cur <= endDate) {
        timeline.push(cur.getTime());
        cur.setDate(cur.getDate() + 1);
      }
    }

    const result = { timeline, series: {} };

    entities.forEach(ent => {
      const records = rawStats[ent] || [];
      const mapByBucket = new Map();

      records.forEach(r => {
        const ts = typeof r.start === 'number' ? r.start : new Date(r.start).getTime();
        const d = new Date(ts);
        let key;
        if (period === 'hour') {
          key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;
        } else if (period === 'month') {
          key = `${d.getFullYear()}-${d.getMonth()}`;
        } else {
          key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        }
        mapByBucket.set(key, r);
      });

      result.series[ent] = timeline.map(ts => {
        const d = new Date(ts);
        let key;
        if (period === 'hour') {
          key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;
        } else if (period === 'month') {
          key = `${d.getFullYear()}-${d.getMonth()}`;
        } else {
          key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        }
        const rec = mapByBucket.get(key);
        if (!rec) {
          return { ts, min: null, max: null, mean: null, sum: null, change: null, state: null };
        }
        return {
          ts,
          min: rec.min !== undefined && rec.min !== null ? Number(rec.min) : null,
          max: rec.max !== undefined && rec.max !== null ? Number(rec.max) : null,
          mean: rec.mean !== undefined && rec.mean !== null ? Number(rec.mean) : null,
          sum: rec.sum !== undefined && rec.sum !== null ? Number(rec.sum) : null,
          change: rec.change !== undefined && rec.change !== null ? Number(rec.change) : null,
          state: rec.state !== undefined && rec.state !== null ? Number(rec.state) : null
        };
      });
    });

    return result;
  }

  _shiftTime(direction) {
    let jump = Math.max(1, Math.round(this._state.spanDays * 0.5));
    if (this._state.alignToGrid) {
       jump = this._state.spanDays; 
    }
    const nextEnd = new Date(this._state.endDate.getTime());
    nextEnd.setDate(nextEnd.getDate() + direction * jump);
    this._state.endDate = nextEnd;
    this._saveTemporalStateToStorage();
    this._scheduleFetch();
  }

  _shiftTimeSingleDay(direction) {
    const nextEnd = new Date(this._state.endDate.getTime());
    nextEnd.setDate(nextEnd.getDate() + direction);
    this._state.endDate = nextEnd;
    this._saveTemporalStateToStorage();
    this._scheduleFetch();
  }

  _resetToToday() {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    this._state.endDate = end;
    this._saveTemporalStateToStorage();
    this._scheduleFetch();
  }

  _renderSkeleton() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
          color: var(--primary-text-color, #e1e1e1);
        }
        ha-card {
          background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.25));
          padding: 16px;
          overflow: visible; 
          position: relative;
        }
        .toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
          margin-bottom: 14px;
        }
        .title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .card-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0;
        }
        .date-badge {
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 16px;
          background: rgba(2, 136, 209, 0.18);
          color: #29b6f6;
          font-weight: 500;
        }
        .controls-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }
        .btn-group {
          display: inline-flex;
          background: rgba(128, 128, 128, 0.12);
          border-radius: 8px;
          padding: 2px;
          gap: 2px;
        }
        button, select, input {
          background: transparent;
          color: var(--primary-text-color, #e1e1e1);
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        button.active {
          background: var(--primary-color, #0288d1);
          color: #fff;
          font-weight: 600;
        }
        button.highlight-save {
          background: #4caf50;
          color: #fff;
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
        }
        select, input[type="number"], input[type="text"], input[list] {
          background: rgba(128, 128, 128, 0.15);
          border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
        }
        select option {
          background: #222;
          color: #fff;
        }
        
        .columns-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .columns-grid.compare-active.force-horizontal {
           display: flex;
           flex-direction: row;
           overflow-x: auto;
           scroll-snap-type: x mandatory;
           width: 100%;
        }
        .columns-grid.compare-active.force-horizontal .column-box {
           flex: 1 0 100%;
           scroll-snap-align: start;
        }
        @media (min-width: 901px) {
           .columns-grid.compare-active.force-horizontal .column-box {
               flex: 1 1 50%;
           }
        }

        .column-box {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 12px;
          background: rgba(128, 128, 128, 0.1);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          border-left: 4px solid var(--primary-color, #0288d1);
        }
        .column-header.compare-col {
          border-left-color: #ab47bc;
        }
        
        .master-chart-toolbar {
           grid-column: 1 / -1;
           display: flex;
           flex-wrap: wrap;
           align-items: center;
           gap: 10px;
           padding: 8px 12px;
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 8px;
           margin-bottom: -6px;
           margin-top: 6px;
           position: relative; 
        }
        
        .entity-picker-wrap {
           position: relative;
           flex: 1;
           min-width: 250px;
        }
        .entity-quick-input {
          width: 100%;
          background: rgba(2, 136, 209, 0.12) !important;
          border: 1px solid rgba(41, 182, 246, 0.35) !important;
          color: var(--primary-text-color, #fff);
          font-size: 0.85rem;
          padding: 6px 10px;
          border-radius: 6px;
          box-sizing: border-box;
        }
        .entity-quick-input:focus {
          outline: none;
          border-color: #29b6f6 !important;
          box-shadow: 0 0 0 2px rgba(41, 182, 246, 0.25);
        }
        
        .entity-dropdown-list {
           display: none;
           position: absolute;
           top: 100%;
           left: 0;
           right: 0;
           max-height: 250px;
           overflow-y: auto;
           background: #2a2a2a;
           border: 1px solid #555;
           border-radius: 0 0 6px 6px;
           z-index: 10000;
           box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .entity-dropdown-list.show {
           display: block;
        }
        .entity-dropdown-item {
           padding: 8px 12px;
           cursor: pointer;
           border-bottom: 1px solid #333;
           font-size: 0.8rem;
           color: #eee;
        }
        .entity-dropdown-item:hover {
           background: #0288d1;
           color: #fff;
        }

        .chart-card {
          background: rgba(128, 128, 128, 0.05);
          border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
          border-radius: 10px;
          padding: 10px 12px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .svg-container {
          width: 100%;
          position: relative;
          user-select: none;
          flex: 1;
        }
        svg.analyzer-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible; 
        }

        .chart-top-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .chart-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          flex: 1;
        }
        .chart-name {
          font-weight: 600;
          font-size: 0.92rem;
          white-space: nowrap;
        }
        .chart-stats-summary {
          display: flex;
          gap: 8px;
          font-size: 0.75rem;
          opacity: 1;
          flex-wrap: wrap;
          transition: opacity 0.2s ease;
        }
        .stat-pill {
          background: rgba(128, 128, 128, 0.15);
          padding: 2px 7px;
          border-radius: 4px;
          white-space: nowrap;
        }
        
        .settings-drawer {
          grid-column: 1 / -1; 
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 8px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 8px;
          font-size: 0.76rem;
        }
        .settings-drawer label {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .delta-badge {
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.74rem;
        }
        .delta-pos {
          background: rgba(231, 76, 60, 0.2);
          color: #ff6b6b;
        }
        .delta-neg {
          background: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }
        .status-msg {
          text-align: center;
          padding: 24px;
          font-size: 0.9rem;
          opacity: 0.75;
        }
        .toast-banner {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #0288d1;
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.25s ease;
          pointer-events: none;
          z-index: 9999;
        }
        
        .hover-readout-wrap {
           min-height: 24px;
           margin-top: 4px;
        }
        .hover-readout {
           font-size: 0.76rem; 
           color: var(--secondary-text-color, #aaa);
        }
      </style>
      <ha-card>
        <div class="toast-banner" id="analyzerToast"></div>

        <div class="toolbar">
          <div class="title-group">
            <h2 class="card-title">${this._config.title || this.t('title')}</h2>
            <span class="date-badge" id="dateRangeBadge">...</span>
          </div>
          <div class="controls-row">
            <div class="btn-group">
              <button id="btnPrevJump" title="${this.t('prevJump')}">⏪</button>
              <button id="btnPrevDay" title="${this.t('prevDay')}">◀</button>
              <button id="btnToday" title="${this.t('today')}">${this.t('today')}</button>
              <button id="btnNextDay" title="${this.t('nextDay')}">▶</button>
              <button id="btnNextJump" title="${this.t('nextJump')}">⏩</button>
            </div>
            
            <button id="btnAlignGrid" class="${this._state.alignToGrid ? 'active' : ''}" title="${this.t('gridAlign')}">${this.t('gridAlign')}</button>

            <div class="btn-group" id="spanButtons">
              ${[7, 14, 30, 60, 90, 365].map(d => `
                <button data-span="${d}" class="${this._state.spanDays === d ? 'active' : ''}">${d}d</button>
              `).join('')}
            </div>

            <select id="periodSelect">
              <option value="hour" ${this._state.period === 'hour' ? 'selected' : ''}>${this.t('periodHour')}</option>
              <option value="day" ${this._state.period === 'day' ? 'selected' : ''}>${this.t('periodDay')}</option>
              <option value="week" ${this._state.period === 'week' ? 'selected' : ''}>${this.t('periodWeek')}</option>
              <option value="month" ${this._state.period === 'month' ? 'selected' : ''}>${this.t('periodMonth')}</option>
            </select>

            <div class="btn-group">
              <button id="btnToggleCompare" class="${this._state.compareMode ? 'active' : ''}">${this.t('btnCompare')}</button>
            </div>

            <select id="compareOffsetSelect" style="display: ${this._state.compareMode ? 'inline-block' : 'none'};">
              <option value="1y" ${this._state.compareOffsetType === '1y' ? 'selected' : ''}>${this.t('offset1y')}</option>
              <option value="1m" ${this._state.compareOffsetType === '1m' ? 'selected' : ''}>${this.t('offset1m')}</option>
              <option value="7d" ${this._state.compareOffsetType === '7d' ? 'selected' : ''}>${this.t('offset7d')}</option>
              <option value="custom" ${this._state.compareOffsetType === 'custom' ? 'selected' : ''}>${this.t('offsetCustom')}</option>
            </select>

            <input type="number" id="customOffsetInput" value="${this._state.compareCustomDays}" min="1" max="3650"
              style="width:64px; display: ${this._state.compareMode && this._state.compareOffsetType === 'custom' ? 'inline-block' : 'none'};" />
              
            <select id="langSelect" style="width:70px;">
              <option value="pl" ${this._state.lang === 'pl' ? 'selected' : ''}>PL</option>
              <option value="en" ${this._state.lang === 'en' ? 'selected' : ''}>EN</option>
            </select>

            <button id="btnAddChart">${this.t('btnAddChart')}</button>
            <button id="btnSaveLayout" class="${this._state.hasSavedState ? 'highlight-save' : ''}">${this.t('btnSaveLayout')}</button>
            <button id="btnResetLayout" style="display: ${this._state.hasSavedState ? 'inline-block' : 'none'};">${this.t('btnResetLayout')}</button>
          </div>
        </div>

        <div id="chartsRoot"></div>
      </ha-card>
    `;

    this._bindToolbarEvents();
    this._updateHeaderState();
  }

  _bindToolbarEvents() {
    const root = this.shadowRoot;
    root.getElementById('btnPrevJump').addEventListener('click', () => this._shiftTime(-1));
    root.getElementById('btnPrevDay').addEventListener('click', () => this._shiftTimeSingleDay(-1));
    root.getElementById('btnToday').addEventListener('click', () => this._resetToToday());
    root.getElementById('btnNextDay').addEventListener('click', () => this._shiftTimeSingleDay(1));
    root.getElementById('btnNextJump').addEventListener('click', () => this._shiftTime(1));
    
    const btnAlign = root.getElementById('btnAlignGrid');
    btnAlign.addEventListener('click', () => {
      this._state.alignToGrid = !this._state.alignToGrid;
      btnAlign.classList.toggle('active', this._state.alignToGrid);
      const start = this._getStartDate(this._state.endDate, this._state.spanDays);
      this._state.endDate = this._recalcEndDateForGrid(start, this._state.spanDays);
      this._uiModified();
      this._saveTemporalStateToStorage();
      this._scheduleFetch();
    });

    root.querySelectorAll('#spanButtons button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this._state.spanDays = Number(e.currentTarget.dataset.span);
        root.querySelectorAll('#spanButtons button').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const start = this._getStartDate(this._state.endDate, this._state.spanDays);
        if(this._state.alignToGrid) {
            this._state.endDate = this._recalcEndDateForGrid(start, this._state.spanDays);
        }
        this._uiModified();
        this._saveTemporalStateToStorage();
        this._scheduleFetch();
      });
    });

    root.getElementById('periodSelect').addEventListener('change', (e) => {
      this._state.period = e.target.value;
      this._uiModified();
      this._saveTemporalStateToStorage();
      this._scheduleFetch();
    });
    
    root.getElementById('langSelect').addEventListener('change', (e) => {
      this._state.lang = e.target.value;
      this._state.localeString = this._state.lang === 'pl' ? 'pl-PL' : 'en-US';
      this._uiModified();
      this._renderChartsContent(); // re-render text
    });

    const btnCompare = root.getElementById('btnToggleCompare');
    const offsetSel = root.getElementById('compareOffsetSelect');
    const customInp = root.getElementById('customOffsetInput');

    btnCompare.addEventListener('click', () => {
      this._state.compareMode = !this._state.compareMode;
      btnCompare.classList.toggle('active', this._state.compareMode);
      offsetSel.style.display = this._state.compareMode ? 'inline-block' : 'none';
      customInp.style.display = (this._state.compareMode && this._state.compareOffsetType === 'custom') ? 'inline-block' : 'none';
      this._uiModified();
      this._scheduleFetch();
    });

    offsetSel.addEventListener('change', (e) => {
      this._state.compareOffsetType = e.target.value;
      customInp.style.display = (this._state.compareMode && this._state.compareOffsetType === 'custom') ? 'inline-block' : 'none';
      this._uiModified();
      this._scheduleFetch();
    });

    customInp.addEventListener('change', (e) => {
      this._state.compareCustomDays = Number(e.target.value) || 365;
      this._uiModified();
      this._scheduleFetch();
    });

    root.getElementById('btnAddChart').addEventListener('click', () => {
      const idx = this._state.charts.length;
      const newChart = {
        id: `chart_${idx}_${Date.now()}`,
        entity: this._state.charts[0]?.entity || '',
        name: `Chart ${idx + 1}`,
        unit: '',
        chart_type: 'bar',
        stat_mode: 'mean',
        color_by: 'mean',
        color_scheme: 'thermal',
        fixed_color: '#0288d1',
        color_min: '',
        color_max: '',
        show_avg_line: true,
        show_labels: true,
        height: 200
      };
      this._state.charts.push(newChart);
      this._state.settingsOpen = newChart.id;
      this._uiModified();
      this._scheduleFetch();
    });

    root.getElementById('btnSaveLayout').addEventListener('click', () => {
      this._saveLayoutToYaml();
    });

    root.getElementById('btnResetLayout').addEventListener('click', () => {
      this._resetLayoutFromYaml();
    });
  }

  _updateHeaderState() {
    const badge = this.shadowRoot.getElementById('dateRangeBadge');
    if (!badge) return;
    const end = this._state.endDate;
    let start = this._getStartDate(end, this._state.spanDays);
    badge.textContent = `${this.formatDateFull(start)} – ${this.formatDateFull(end)}${this._state.loading ? this.t('loading') : ''}`;
  }

  _computeScaleBounds(chartCfg) {
    const pSeries = this._state.dataPrimary?.series?.[chartCfg.entity] || [];
    const cSeries = this._state.compareMode ? (this._state.dataCompare?.series?.[chartCfg.entity] || []) : [];
    const combined = [...pSeries, ...cSeries];

    let minVal = Infinity;
    let maxVal = -Infinity;
    let colorMin = Infinity;
    let colorMax = -Infinity;

    combined.forEach(pt => {
      if (chartCfg.chart_type === 'floating_bars') {
        if (pt.min !== null && pt.min < minVal) minVal = pt.min;
        if (pt.max !== null && pt.max > maxVal) maxVal = pt.max;
        if (pt.mean !== null) {
          if (pt.mean < minVal) minVal = pt.mean;
          if (pt.mean > maxVal) maxVal = pt.mean;
        }
      } else {
        const v = this._extractPointValue(pt, chartCfg.stat_mode);
        if (v !== null) {
          if (v < minVal) minVal = v;
          if (v > maxVal) maxVal = v;
        }
      }

      const cv = this._extractColorMetric(pt, chartCfg);
      if (cv !== null) {
        if (cv < colorMin) colorMin = cv;
        if (cv > colorMax) colorMax = cv;
      }
    });

    if (minVal === Infinity) { minVal = 0; maxVal = 10; }
    if (chartCfg.chart_type === 'bar' && minVal > 0) {
      minVal = 0;
    }
    
    const isFloating = chartCfg.chart_type === 'floating_bars' && chartCfg.show_labels;
    const topPadMult = isFloating ? 0.20 : 0.12;
    const botPadMult = isFloating ? 0.20 : 0.12;
    
    const pad = (maxVal - minVal) || 1;
    return {
      yMin: chartCfg.chart_type === 'bar' && minVal === 0 ? 0 : minVal - pad * botPadMult,
      yMax: maxVal + pad * topPadMult,
      cMin: colorMin === Infinity ? 0 : colorMin,
      cMax: colorMax === -Infinity ? 10 : colorMax
    };
  }

  _extractPointValue(pt, statMode) {
    if (!pt) return null;
    if (statMode === 'change') return pt.change !== null ? pt.change : pt.sum;
    if (statMode === 'sum') return pt.sum !== null ? pt.sum : pt.change;
    if (statMode === 'min') return pt.min;
    if (statMode === 'max') return pt.max;
    return pt.mean !== null ? pt.mean : pt.state;
  }
  
  _extractLineValue(pt, chartCfg) {
    if (!pt) return null;
    if (chartCfg.chart_type === 'floating_bars') {
      return pt.mean;
    }
    return this._extractPointValue(pt, chartCfg.stat_mode);
  }

  _extractColorMetric(pt, chartCfg) {
    if (!pt) return null;
    if (chartCfg.color_by === 'max') return pt.max !== null ? pt.max : pt.mean;
    if (chartCfg.color_by === 'min') return pt.min !== null ? pt.min : pt.mean;
    if (chartCfg.color_by === 'mean') return pt.mean !== null ? pt.mean : this._extractPointValue(pt, chartCfg.stat_mode);
    return this._extractPointValue(pt, chartCfg.stat_mode);
  }

  _computeSeriesSummary(series, chartCfg) {
    let min = Infinity, max = -Infinity, sum = 0, count = 0;
    series.forEach(pt => {
      if (chartCfg.chart_type === 'floating_bars') {
        if (pt.min !== null && pt.min < min) min = pt.min;
        if (pt.max !== null && pt.max > max) max = pt.max;
        if (pt.mean !== null) { sum += pt.mean; count++; }
      } else {
        const v = this._extractPointValue(pt, chartCfg.stat_mode);
        if (v !== null) {
          if (v < min) min = v;
          if (v > max) max = v;
          sum += v;
          count++;
        }
      }
    });
    return {
      min: min === Infinity ? null : min,
      max: max === -Infinity ? null : max,
      avg: count > 0 ? sum / count : null,
      sum: count > 0 ? sum : null
    };
  }

  _renderChartsContent() {
    this._updateHeaderState();
    if (!this._entitiesPopulated) {
      this._populateEntityDatalist();
    }
    const container = this.shadowRoot.getElementById('chartsRoot');
    if (!container) return;

    if (this._state.error) {
      container.innerHTML = `<div class="status-msg">⚠️ ${this._state.error}</div>`;
      return;
    }

    const endPrimary = this._state.endDate;
    let startPrimary = this._getStartDate(endPrimary, this._state.spanDays);
    const { start: startComp, end: endComp } = this._getOffsetDates(startPrimary, endPrimary);

    const boundsMap = {};
    this._state.charts.forEach(c => {
      boundsMap[c.id] = this._computeScaleBounds(c);
    });

    let contentHtml = '';
    
    contentHtml += `<div class="columns-grid force-horizontal ${this._state.compareMode ? 'compare-active' : ''}">`;
    contentHtml += `<div class="column-box">`;
    contentHtml += `<div class="column-header">
            <span>${this.t('periodLabelPrimary')} ${this.formatDateFull(startPrimary)} – ${this.formatDateFull(endPrimary)}</span>
            <span>${this._state.spanDays} ${this.t('daysLabel')} (${this.t('period'+this._state.period.charAt(0).toUpperCase() + this._state.period.slice(1))})</span>
          </div>`;
    contentHtml += `</div>`;
    
    if(this._state.compareMode) {
        contentHtml += `<div class="column-box">`;
        contentHtml += `<div class="column-header compare-col">
              <span>${this.t('periodLabelCompare')} ${this.formatDateFull(startComp)} – ${this.formatDateFull(endComp)}</span>
              <span>${this.t('offsetLabel')} ${this._state.compareOffsetType.toUpperCase()}</span>
            </div>`;
        contentHtml += `</div>`;
    }
    contentHtml += `</div>`;
    
    this._state.charts.forEach((chartCfg, index) => {
        
        contentHtml += `
        <div style="position: relative; z-index: ${100 - index};">
          <div class="master-chart-toolbar">
            <div class="entity-picker-wrap">
                <input type="text" class="entity-quick-input custom-autocomplete"
                  data-idx="${index}" value="${chartCfg.entity}"
                  placeholder="${this.t('searchEntity')}"
                  title="${this.t('searchEntityTitle')}" autocomplete="off" />
                <div class="entity-dropdown-list" data-idx="${index}"></div>
            </div>
            
            <select class="cfg-type" data-idx="${index}">
              <option value="floating_bars" ${chartCfg.chart_type === 'floating_bars' ? 'selected' : ''}>${this.t('chartTypeFloat')}</option>
              <option value="bar" ${chartCfg.chart_type === 'bar' ? 'selected' : ''}>${this.t('chartTypeBar')}</option>
              <option value="line" ${chartCfg.chart_type === 'line' ? 'selected' : ''}>${this.t('chartTypeLine')}</option>
              <option value="area" ${chartCfg.chart_type === 'area' ? 'selected' : ''}>${this.t('chartTypeArea')}</option>
              <option value="step" ${chartCfg.chart_type === 'step' ? 'selected' : ''}>${this.t('chartTypeStep')}</option>
            </select>
  
            <select class="cfg-color-by" data-idx="${index}">
              <option value="mean" ${chartCfg.color_by === 'mean' ? 'selected' : ''}>${this.t('colorByMean')}</option>
              <option value="max" ${chartCfg.color_by === 'max' ? 'selected' : ''}>${this.t('colorByMax')}</option>
              <option value="min" ${chartCfg.color_by === 'min' ? 'selected' : ''}>${this.t('colorByMin')}</option>
              <option value="value" ${chartCfg.color_by === 'value' ? 'selected' : ''}>${this.t('colorByValue')}</option>
              <option value="fixed" ${chartCfg.color_by === 'fixed' ? 'selected' : ''}>${this.t('colorByFixed')}</option>
            </select>
  
            <select class="cfg-scheme" data-idx="${index}">
              <option value="thermal" ${chartCfg.color_scheme === 'thermal' ? 'selected' : ''}>${this.t('schemeThermal')}</option>
              <option value="energy" ${chartCfg.color_scheme === 'energy' ? 'selected' : ''}>${this.t('schemeEnergy')}</option>
              <option value="viridis" ${chartCfg.color_scheme === 'viridis' ? 'selected' : ''}>${this.t('schemeViridis')}</option>
              <option value="ocean" ${chartCfg.color_scheme === 'ocean' ? 'selected' : ''}>${this.t('schemeOcean')}</option>
            </select>
  
            <button class="btn-chart-cfg" data-idx="${index}" title="${this.t('settingsBtn')}">⚙️</button>
          </div>
        `;
        
        const isSettingsOpen = this._state.settingsOpen === chartCfg.id;
        
        if (isSettingsOpen) {
            contentHtml += `
            <div class="settings-drawer">
                <label>${this.t('heightLabel')}
                  <input type="number" class="cfg-height" data-idx="${index}" value="${chartCfg.height || 210}" min="100" max="600" />
                </label>
                <label>${this.t('nameLabel')}
                  <input type="text" class="cfg-name" data-idx="${index}" value="${chartCfg.name}" />
                </label>
                <label>${this.t('unitLabel')}
                  <input type="text" class="cfg-unit" data-idx="${index}" value="${chartCfg.unit}" placeholder="${this.t('unitPlaceholder')}" />
                </label>
                <label>${this.t('statLabel')}
                  <select class="cfg-stat" data-idx="${index}">
                    <option value="minmax_mean" ${chartCfg.stat_mode === 'minmax_mean' ? 'selected' : ''}>${this.t('statMinMaxMean')}</option>
                    <option value="mean" ${chartCfg.stat_mode === 'mean' ? 'selected' : ''}>${this.t('statMean')}</option>
                    <option value="change" ${chartCfg.stat_mode === 'change' ? 'selected' : ''}>${this.t('statChange')}</option>
                    <option value="sum" ${chartCfg.stat_mode === 'sum' ? 'selected' : ''}>${this.t('statSum')}</option>
                    <option value="min" ${chartCfg.stat_mode === 'min' ? 'selected' : ''}>${this.t('statMin')}</option>
                    <option value="max" ${chartCfg.stat_mode === 'max' ? 'selected' : ''}>${this.t('statMax')}</option>
                  </select>
                </label>
                <label>${this.t('cminLabel')}
                  <input type="number" step="any" class="cfg-cmin" data-idx="${index}" value="${chartCfg.color_min}" placeholder="${this.t('cautoPlaceholder')}" />
                </label>
                <label>${this.t('cmaxLabel')}
                  <input type="number" step="any" class="cfg-cmax" data-idx="${index}" value="${chartCfg.color_max}" placeholder="${this.t('cautoPlaceholder')}" />
                </label>
                <label style="flex-direction:row; align-items:center; gap:6px; padding-top:14px;">
                  <input type="checkbox" class="cfg-avgline" data-idx="${index}" ${chartCfg.show_avg_line ? 'checked' : ''} /> ${this.t('avgLineLabel')}
                </label>
                <label style="flex-direction:row; align-items:center; gap:6px; padding-top:14px;">
                  <input type="checkbox" class="cfg-labels" data-idx="${index}" ${chartCfg.show_labels ? 'checked' : ''} /> ${this.t('labelsLabel')}
                </label>
                <div style="display:flex; align-items:flex-end; gap:8px;">
                   ${index > 0 ? `<button class="btn-move-chart" data-idx="${index}" data-dir="-1" title="${this.t('moveUpBtn')}">⬆️</button>` : ''}
                   ${index < this._state.charts.length - 1 ? `<button class="btn-move-chart" data-idx="${index}" data-dir="1" title="${this.t('moveDownBtn')}">⬇️</button>` : ''}
                </div>
                ${this._state.charts.length > 1 ? `
                  <div style="display:flex; align-items:flex-end;">
                    <button class="btn-remove-chart" data-idx="${index}" style="color:#ff6b6b; border-color:rgba(255,107,107,0.3);">${this.t('removeChartBtn')}</button>
                  </div>
                ` : ''}
              </div>
            `;
        }
        
        contentHtml += `<div class="columns-grid force-horizontal ${this._state.compareMode ? 'compare-active' : ''}">`;
        
        // Primary Column
        contentHtml += `<div class="column-box">`;
        contentHtml += this._renderChartOnly(chartCfg, index, 'primary', boundsMap[chartCfg.id]);
        contentHtml += `</div>`;
        
        // Compare Column
        if(this._state.compareMode) {
            contentHtml += `<div class="column-box">`;
            contentHtml += this._renderChartOnly(chartCfg, index, 'compare', boundsMap[chartCfg.id]);
            contentHtml += `</div>`;
        }
        
        contentHtml += `</div></div>`; // end columns-grid and stack wrapper for this row
    });

    container.innerHTML = contentHtml;

    this._bindChartEvents();
  }

  _renderChartOnly(chartCfg, index, colType, bounds) {
    const dataObj = colType === 'primary' ? this._state.dataPrimary : this._state.dataCompare;
    const series = dataObj?.series?.[chartCfg.entity] || [];
    const primarySeries = this._state.dataPrimary?.series?.[chartCfg.entity] || [];

    const summary = this._computeSeriesSummary(series, chartCfg);
    const primarySummary = colType === 'compare' ? this._computeSeriesSummary(primarySeries, chartCfg) : null;

    const unit = chartCfg.unit || (this._hass?.states?.[chartCfg.entity]?.attributes?.unit_of_measurement) || '';

    let deltaHtml = '';
    if (colType === 'compare' && primarySummary && summary.avg !== null && primarySummary.avg !== null) {
      const isCumulative = chartCfg.stat_mode === 'change' || chartCfg.stat_mode === 'sum';
      const baseVal = isCumulative ? summary.sum : summary.avg;
      const currVal = isCumulative ? primarySummary.sum : primarySummary.avg;
      const diff = currVal - baseVal;
      const pct = baseVal !== 0 ? ((diff / Math.abs(baseVal)) * 100).toFixed(1) : '0.0';
      const sign = diff > 0 ? '+' : '';
      deltaHtml = `<span class="delta-badge ${diff > 0 ? 'delta-pos' : 'delta-neg'}">
        Δ ${sign}${this.formatVal(diff)} ${unit} (${sign}${pct}%)
      </span>`;
    }

    return `
      <div class="chart-card" data-chart-id="${chartCfg.id}" data-col="${colType}">
        <div class="chart-top-bar">
          <div class="chart-title-wrap">
            <span class="chart-name">${chartCfg.name}</span>
            <div class="chart-stats-summary" id="summary_${chartCfg.id}_${colType}">
              ${summary.min !== null ? `<span class="stat-pill">${this.t('min')}: <b>${this.formatVal(summary.min)} ${unit}</b></span>` : ''}
              ${summary.avg !== null ? `<span class="stat-pill">${this.t('avg')}: <b>${this.formatVal(summary.avg)} ${unit}</b></span>` : ''}
              ${summary.max !== null ? `<span class="stat-pill">${this.t('max')}: <b>${this.formatVal(summary.max)} ${unit}</b></span>` : ''}
              ${(chartCfg.stat_mode === 'change' || chartCfg.stat_mode === 'sum') && summary.sum !== null
                ? `<span class="stat-pill">${this.t('sum')}: <b>${this.formatVal(summary.sum)} ${unit}</b></span>` : ''}
              ${deltaHtml}
            </div>
          </div>
        </div>

        <div class="svg-container" style="height: ${chartCfg.height}px;">
          ${this._buildSVG(chartCfg, series, bounds, unit, colType)}
        </div>
        
        <div class="hover-readout-wrap">
           <div class="hover-readout" id="readout_${chartCfg.id}_${colType}">
             ${this.t('hoverSync')}
           </div>
        </div>
      </div>
    `;
  }

  _buildSVG(chartCfg, series, bounds, unit, colType) {
    const width = 820;
    const height = chartCfg.height || 210;
    const padL = 46;
    const padR = 16;
    const padT = 22;
    const padB = 28;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    if (!series || !series.length) {
      return `<div class="status-msg" style="height:${height}px; display:flex; align-items:center; justify-content:center;">${this.t('noData')} <b>${chartCfg.entity}</b></div>`;
    }

    const { yMin, yMax, cMin, cMax } = bounds;
    const yRange = (yMax - yMin) || 1;
    const yToPx = (val) => padT + plotH - ((val - yMin) / yRange) * plotH;

    const n = series.length;
    const slotW = plotW / n;
    const barW = Math.max(3, Math.min(38, slotW * 0.72));

    let gridLines = '';
    const ticks = 4;
    for (let i = 0; i <= ticks; i++) {
      const v = yMin + (yRange * i) / ticks;
      const y = yToPx(v);
      gridLines += `
        <line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - padR}" y2="${y.toFixed(1)}"
          stroke="rgba(150,150,150,0.16)" stroke-dasharray="3,3" />
        <text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end"
          fill="rgba(180,180,180,0.75)" font-size="10">${this.formatVal(v)}</text>
      `;
    }

    if (yMin < 0 && yMax > 0) {
      const yZero = yToPx(0);
      gridLines += `<line x1="${padL}" y1="${yZero.toFixed(1)}" x2="${width - padR}" y2="${yZero.toFixed(1)}" stroke="rgba(255,255,255,0.35)" stroke-width="1" />`;
    }

    let xLabels = '';
    const labelStep = Math.max(1, Math.ceil(n / 8));
    series.forEach((pt, idx) => {
      if (idx % labelStep === 0 || idx === n - 1) {
        const cx = padL + idx * slotW + slotW / 2;
        xLabels += `<text x="${cx.toFixed(1)}" y="${height - 6}" text-anchor="middle" fill="rgba(180,180,180,0.75)" font-size="10">${this.formatDateShort(pt.ts, this._state.period)}</text>`;
      }
    });

    let shapes = '';
    let linePoints = [];
    let labelElems = '';
    const showValLabels = chartCfg.show_labels && n <= 35;
    
    const barFontSize = 7.5; 
    const barFontWeight = 600;

    series.forEach((pt, idx) => {
      const cx = padL + idx * slotW + slotW / 2;
      const colorMetric = this._extractColorMetric(pt, chartCfg);
      const fillColor = chartCfg.color_by === 'fixed'
        ? chartCfg.fixed_color
        : interpolateColor(colorMetric, cMin, cMax, chartCfg.color_scheme, chartCfg.color_min, chartCfg.color_max);

      if (chartCfg.chart_type === 'floating_bars') {
        const lo = pt.min !== null ? pt.min : pt.mean;
        const hi = pt.max !== null ? pt.max : pt.mean;
        if (lo !== null && hi !== null) {
          const yTop = yToPx(hi);
          const yBot = yToPx(lo);
          const barH = Math.max(4, Math.abs(yBot - yTop));
          const rx = Math.min(5, barW / 2);
          shapes += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${Math.min(yTop, yBot).toFixed(1)}"
            width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="${rx}"
            fill="${fillColor}" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" />`;

          if (showValLabels) {
            labelElems += `<text x="${cx.toFixed(1)}" y="${(Math.min(yTop, yBot) - 4).toFixed(1)}"
              text-anchor="middle" fill="var(--primary-text-color, #eee)" font-size="${barFontSize}" font-weight="${barFontWeight}">${this.formatVal(hi)}</text>`;
              
            labelElems += `<text x="${cx.toFixed(1)}" y="${(Math.max(yTop, yBot) + 11).toFixed(1)}"
              text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="${barFontSize}" font-weight="${barFontWeight}">${this.formatVal(lo)}</text>`;
          }
        }
        if (pt.mean !== null) {
          linePoints.push({ x: cx, y: yToPx(pt.mean), val: pt.mean, color: fillColor });
        }
      } else if (chartCfg.chart_type === 'bar') {
        const val = this._extractPointValue(pt, chartCfg.stat_mode);
        if (val !== null) {
          const baseVal = yMin < 0 && yMax > 0 ? 0 : yMin;
          const yZero = yToPx(baseVal);
          const yVal = yToPx(val);
          const yTop = Math.min(yZero, yVal);
          const barH = Math.max(2, Math.abs(yZero - yVal));
          shapes += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${yTop.toFixed(1)}"
            width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="3"
            fill="${fillColor}" />`;

          if (showValLabels) {
            labelElems += `<text x="${cx.toFixed(1)}" y="${(yTop - 4).toFixed(1)}"
              text-anchor="middle" fill="var(--primary-text-color, #eee)" font-size="${barFontSize}">${this.formatVal(val)}</text>`;
          }
        }
        const lineVal = this._extractLineValue(pt, chartCfg);
        if (chartCfg.show_avg_line && lineVal !== null) {
          linePoints.push({ x: cx, y: yToPx(lineVal), val: lineVal, color: '#ffffff' });
        }
      } else {
        const val = this._extractPointValue(pt, chartCfg.stat_mode);
        if (val !== null) {
          linePoints.push({ x: cx, y: yToPx(val), val, color: fillColor });
          if (showValLabels) {
            labelElems += `<text x="${cx.toFixed(1)}" y="${(yToPx(val) - 6).toFixed(1)}"
              text-anchor="middle" fill="var(--primary-text-color, #eee)" font-size="${barFontSize}">${this.formatVal(val)}</text>`;
          }
        }
      }
    });

    let lineOverlay = '';
    if (linePoints.length > 0 && chartCfg.show_avg_line) {
      if (chartCfg.chart_type === 'area' && linePoints.length > 1) {
        const basePy = yToPx(yMin);
        const areaPath = `M ${linePoints[0].x.toFixed(1)} ${basePy.toFixed(1)} ` +
          linePoints.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
          ` L ${linePoints[linePoints.length - 1].x.toFixed(1)} ${basePy.toFixed(1)} Z`;
        lineOverlay += `<path d="${areaPath}" fill="rgba(41, 182, 246, 0.2)" />`;
      }

      let pathD = '';
      if (chartCfg.chart_type === 'step' && linePoints.length > 1) {
        pathD = linePoints.map((p, i) => {
          if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
          const prev = linePoints[i - 1];
          return `L ${p.x.toFixed(1)} ${prev.y.toFixed(1)} L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        }).join(' ');
      } else {
        pathD = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      }

      const strokeColor = chartCfg.chart_type === 'floating_bars' ? '#ffffff' : '#29b6f6';
      lineOverlay += `<path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />`;
      
      linePoints.forEach(p => {
        const dotFill = chartCfg.chart_type === 'floating_bars' ? '#1c1c1c' : p.color;
        lineOverlay += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.2" fill="${dotFill}" stroke="${strokeColor}" stroke-width="1.8" />`;
        
        if (chartCfg.chart_type === 'floating_bars' && showValLabels && p.val !== null) {
            lineOverlay += `<text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}"
              text-anchor="middle" fill="#ffffff" font-size="9" font-weight="700" 
              style="text-shadow: 1px 1px 2px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 1px -1px 2px rgba(0,0,0,0.9), -1px 1px 2px rgba(0,0,0,0.9);">${this.formatVal(p.val)}</text>`;
        }
      });
    }

    let hoverBoxes = '';
    series.forEach((pt, idx) => {
      const x = padL + idx * slotW;
      hoverBoxes += `<rect class="hover-slot" data-idx="${idx}" x="${x.toFixed(1)}" y="${padT}" width="${slotW.toFixed(1)}" height="${plotH}" fill="transparent" style="cursor:crosshair;" />`;
    });

    return `
      <svg class="analyzer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        ${gridLines}
        ${shapes}
        ${lineOverlay}
        ${labelElems}
        ${xLabels}
        <line class="crosshair-line" x1="0" y1="${padT}" x2="0" y2="${height - padB}"
          stroke="rgba(255,255,255,0.65)" stroke-width="1.2" stroke-dasharray="4,3" visibility="hidden" pointer-events="none" />
        ${hoverBoxes}
      </svg>
    `;
  }

  _applyEntitySelection(idx, newEntityId) {
    const trimmed = (newEntityId || '').trim();
    if (!trimmed) return;
    const chart = this._state.charts[idx];
    const oldEntity = chart.entity;
    chart.entity = trimmed;

    const stObj = this._hass?.states?.[trimmed];
    if (stObj) {
      const friendly = stObj.attributes?.friendly_name;
      const unit = stObj.attributes?.unit_of_measurement;
      if (friendly && (chart.name === oldEntity || chart.name.startsWith('Chart ') || chart.name.startsWith('Wykres ') || !chart.name)) {
        chart.name = friendly;
      } else if (friendly && oldEntity && this._hass?.states?.[oldEntity]?.attributes?.friendly_name === chart.name) {
        chart.name = friendly;
      }
      if (unit !== undefined) {
        chart.unit = unit;
      }
    }
    this._uiModified();
    this._scheduleFetch();
  }

  _bindChartEvents() {
    const root = this.shadowRoot;
    
    root.querySelectorAll('.custom-autocomplete').forEach(inp => {
      const idx = Number(inp.dataset.idx);
      const dropdown = root.querySelector(`.entity-dropdown-list[data-idx="${idx}"]`);
      
      inp.addEventListener('input', (e) => {
          const val = e.target.value.toLowerCase().trim();
          if(!val) { dropdown.classList.remove('show'); return; }
          
          const searchTerms = val.split(/\\s+/);
          const catalog = this._getEntityCatalog();
          
          const matches = catalog.filter(item => {
              const searchableText = `${item.id} ${item.name}`.toLowerCase();
              return searchTerms.every(term => searchableText.includes(term));
          }).slice(0, 50);
          
          if (matches.length > 0) {
              dropdown.innerHTML = matches.map(m => `<div class="entity-dropdown-item" data-id="${m.id}">${m.name} (${m.id})</div>`).join('');
              dropdown.classList.add('show');
              
              dropdown.querySelectorAll('.entity-dropdown-item').forEach(item => {
                  item.addEventListener('click', (ev) => {
                      const selectedId = ev.target.dataset.id;
                      inp.value = selectedId;
                      dropdown.classList.remove('show');
                      this._applyEntitySelection(idx, selectedId);
                  });
              });
          } else {
              dropdown.classList.remove('show');
          }
      });
      
      inp.addEventListener('focus', () => {
          if (inp.value) inp.dispatchEvent(new Event('input'));
      });
      
      inp.addEventListener('blur', () => {
          setTimeout(() => dropdown.classList.remove('show'), 200);
      });
    });

    root.querySelectorAll('.cfg-height').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].height = Number(e.target.value) || 210;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-type').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].chart_type = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-color-by').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].color_by = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-scheme').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].color_scheme = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.btn-chart-cfg').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.idx);
        const cid = this._state.charts[idx].id;
        this._state.settingsOpen = this._state.settingsOpen === cid ? null : cid;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-entity').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._applyEntitySelection(idx, e.target.value);
      });
    });

    root.querySelectorAll('.cfg-name').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].name = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-unit').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].unit = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-stat').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].stat_mode = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-cmin').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].color_min = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-cmax').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].color_max = e.target.value;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-avgline').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].show_avg_line = e.target.checked;
        this._uiModified();
      });
    });

    root.querySelectorAll('.cfg-labels').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._state.charts[idx].show_labels = e.target.checked;
        this._uiModified();
      });
    });

    root.querySelectorAll('.btn-remove-chart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.idx);
        this._state.charts.splice(idx, 1);
        this._state.settingsOpen = null;
        this._uiModified();
      });
    });
    
    root.querySelectorAll('.btn-move-chart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.idx);
        const dir = Number(e.currentTarget.dataset.dir);
        if (idx + dir < 0 || idx + dir >= this._state.charts.length) return;
        
        const temp = this._state.charts[idx];
        this._state.charts[idx] = this._state.charts[idx + dir];
        this._state.charts[idx + dir] = temp;
        
        this._uiModified();
      });
    });

    root.querySelectorAll('.hover-slot').forEach(slot => {
      slot.addEventListener('mouseenter', (e) => {
        const idx = Number(e.target.dataset.idx);
        this._syncCrosshair(idx);
      });
      slot.addEventListener('mouseleave', () => {
        this._syncCrosshair(null);
      });
    });
    
    this._syncCrosshair(null);
  }

  _syncCrosshair(hoverIdx) {
    const cards = this.shadowRoot.querySelectorAll('.chart-card');
    cards.forEach(card => {
      const chartId = card.dataset.chartId;
      const col = card.dataset.col;
      const chartCfg = this._state.charts.find(c => c.id === chartId);
      const line = card.querySelector('.crosshair-line');
      const readout = card.querySelector(`#readout_${chartId}_${col}`);
      const summaryDiv = card.querySelector(`#summary_${chartId}_${col}`);
      
      if (!chartCfg || !line || !readout) return;

      const dataObj = col === 'primary' ? this._state.dataPrimary : this._state.dataCompare;
      const series = dataObj?.series?.[chartCfg.entity] || [];

      if (hoverIdx === null || !series[hoverIdx]) {
        line.setAttribute('visibility', 'hidden');
        readout.innerHTML = this.t('hoverSync');
        if (summaryDiv) summaryDiv.style.opacity = '1';
        return;
      }

      const n = series.length;
      const padL = 46;
      const padR = 16;
      const plotW = 820 - padL - padR;
      const slotW = plotW / n;
      const cx = padL + hoverIdx * slotW + slotW / 2;

      line.setAttribute('x1', cx.toFixed(1));
      line.setAttribute('x2', cx.toFixed(1));
      line.setAttribute('visibility', 'visible');

      const pt = series[hoverIdx];
      const unit = chartCfg.unit || (this._hass?.states?.[chartCfg.entity]?.attributes?.unit_of_measurement) || '';
      const dateStr = this.formatDateFull(pt.ts);

      if (chartCfg.chart_type === 'floating_bars') {
        readout.innerHTML = `📌 <b>${dateStr}</b> — ${this.t('min')}: <b>${pt.min !== null ? this.formatVal(pt.min) : '-'} ${unit}</b> | ${this.t('avg')}: <b>${pt.mean !== null ? this.formatVal(pt.mean) : '-'} ${unit}</b> | ${this.t('max')}: <b>${pt.max !== null ? this.formatVal(pt.max) : '-'} ${unit}</b>`;
      } else {
        const val = this._extractPointValue(pt, chartCfg.stat_mode);
        readout.innerHTML = `📌 <b>${dateStr}</b> — Wartość (${chartCfg.stat_mode}): <b>${val !== null ? this.formatVal(val) : '-'} ${unit}</b> ${pt.mean !== null ? `| ${this.t('avg')}: ${this.formatVal(pt.mean)} ${unit}` : ''}`;
      }
      
      if (summaryDiv) summaryDiv.style.opacity = '0';
    });
  }

  getCardSize() {
    return (this._state.charts.length || 2) * 4;
  }
}

class HavenFlowDataAnalyzerCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this.render();
  }

  render() {
    if (!this._config) return;
    this.innerHTML = `
      <div style="padding: 12px; display:flex; flex-direction:column; gap:10px;">
        <p style="margin:0; font-size:0.9rem;">
          <b>HavenFlow Data Analyzer Card v1.0.8</b> wspiera teraz pełne zapisywanie modyfikacji dashboardu z powrotem do YAML,
          poprawia czytelność wartości (formatowanie regionalne i mniejsze etykiety), oraz rozwiązuje kwestie obcinania tooltipów wyszukiwarki.
        </p>
      </div>
    `;
  }
}

if (!customElements.get('data-analyzer-card')) {
  customElements.define('data-analyzer-card', HavenFlowDataAnalyzerCard);
}
if (!customElements.get('data-analyzer-card-editor')) {
  customElements.define('data-analyzer-card-editor', HavenFlowDataAnalyzerCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'data-analyzer-card',
  name: 'HavenFlow Data Analyzer Card',
  preview: true,
  description: 'Wieloencyjny analizator danych LTS z Floating Bars, YoY, zapamiętywaniem YAML i pełnym wsparciem Androida.'
});
