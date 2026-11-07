# HavenFlow Data Analyzer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/HavenFlow/data-analyzer-card)](https://github.com/HavenFlow/data-analyzer-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An advanced, interactive Long-Term Statistics (LTS) dashboard card and panel analyzer for **Home Assistant**. Designed specifically for correlating energy and heating demand (e.g., daily gas or heat pump consumption vs. outdoor ambient temperature) with synchronized timelines, dynamic heatmap coloring, and side-by-side Year-over-Year (YoY) comparisons.

---

## Key Features

* **Floating Bars (Min/Max Range) + Trend Line**:
  * Each bar visualizes the daily span between minimum and maximum recorded sensor values.
  * An overlaid trend line with highlighted intersection nodes plots the average (`mean`) value with high-contrast labels.
* **Synchronized Multi-Chart Stack**:
  * Stack any number of entities (e.g., Outdoor Temperature, Daily Gas Consumption, Inverter Solar Production, Grid Import).
  * All charts share an identical time resolution (`hour`, `day`, `week`, `month`) and horizontal axis.
* **Unified Crosshair (Hover Sync)**:
  * Hovering or touching any day on any chart renders a synchronized vertical crosshair across all stacked charts and the comparative column, displaying exact historical readings for that timestamp.
* **Global Time Navigation & Calendar Grid Alignment**:
  * Pan all stacked charts simultaneously with step and jump controls (`⏪`, `◀`, `Today`, `▶`, `⏩`).
  * Quick range presets: `7d`, `14d`, `30d`, `60d`, `90d`, `365d`.
  * **Full Period (Grid Snap)**: Snaps the time window strictly to calendar months (from the 1st to the last day) or weeks (Monday to Sunday), cleanly padding future dates as empty space.
* **Dynamic Metric-Based Coloring**:
  * Color bars and points based on **Mean**, **Max**, **Min**, or **Consumption Value**.
  * Built-in gradient palettes: `Thermal` (Cold Blue to Hot Red), `Energy` (Green to Purple), `Viridis`, and `Ocean`, with customizable min/max range thresholds.
* **Side-by-Side Comparison (Year-over-Year / YoY)**:
  * Instantly split the dashboard into two synchronized columns comparing current figures against `-1 Year`, `-1 Month`, `-7 Days`, or a custom day offset.
  * Automatic variance calculation with difference badges ($\Delta$ in physical units and percentage `±%`).
* **Mobile-Optimized (Horizontal Snap)**:
  * When comparison mode is enabled on smartphones and tablets, columns are strictly preserved in a horizontal flex layout with touch `scroll-snap`, preventing vertical breakdown.
* **Built-in Live Autocomplete Search**:
  * A custom Android WebView-compatible search dropdown lets you switch entities directly from the card toolbar without opening YAML editors. Supports multi-word matching (e.g., `gas energy`).
* **Direct YAML Dashboard Synchronization**:
  * Click **Save Layout** to persist runtime changes (added charts, entity selections, heights, and palettes) straight back to your Home Assistant dashboard configuration.
* **Bilingual Support (i18n)**:
  * Instant toggling between English (`EN`) and Polish (`PL`) from the top toolbar or via the `language` configuration key.

---

## Installation

### Method 1: HACS (Custom Repository)

1. Open **HACS** in your Home Assistant instance.
2. Navigate to **Frontend** -> click the three dots in the top-right corner -> **Custom repositories**.
3. Add the repository URL, set the category to **Dashboard** (or **Lovelace**), and click **Add**.
4. Search for **HavenFlow Data Analyzer Card**, click **Download**, and reload your browser cache.

### Method 2: Manual Installation

1. Download `data-analyzer-card.js` from the latest release.
2. Copy the file into your Home Assistant configuration directory under:
   ```text
   /config/www/community/data-analyzer-card/data-analyzer-card.js
   ```
3. In Home Assistant, navigate to **Settings** -> **Dashboards** -> click the three dots in the top-right corner -> **Resources**.
4. Click **Add Resource** and fill in the fields:
   * **URL**: `/local/community/data-analyzer-card/data-analyzer-card.js?v=1.0.9`
   * **Resource Type**: `JavaScript Module`
5. Perform a hard refresh in your browser (`Ctrl + F5` or `Cmd + Shift + R`).

---

## Configuration Example

For the best experience, create a new Dashboard View set to **Panel (1 card)** mode and paste the following YAML configuration:

```yaml
type: custom:data-analyzer-card
title: Temperature & Consumption Correlation (YoY)
language: en
default_span_days: 30
default_period: day
align_to_grid: true
compare_enabled: true
compare_offset: 1y
charts:
  - entity: sensor.outdoor_temperature
    name: Outdoor Temperature
    unit: "°C"
    chart_type: floating_bars
    stat_mode: minmax_mean
    color_by: mean
    color_scheme: thermal
    color_min: -10
    color_max: 28
    show_avg_line: true
    show_labels: true
    height: 230
  - entity: sensor.daily_gas_consumption
    name: Daily Gas Consumption
    unit: "m³"
    chart_type: bar
    stat_mode: change
    color_by: value
    color_scheme: energy
    color_min: 0
    color_max: 15
    show_avg_line: true
    show_labels: true
    height: 200
  - entity: sensor.heat_pump_electrical_energy
    name: Heat Pump Energy
    unit: "kWh"
    chart_type: bar
    stat_mode: change
    color_by: value
    color_scheme: energy
    color_min: 0
    color_max: 30
    show_avg_line: false
    show_labels: true
    height: 190
```

---

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | `Data Analysis` | Title displayed on the top card toolbar. |
| `language` | string | `pl` | UI language (`en` for English, `pl` for Polish). |
| `default_span_days` | number | `30` | Default time window in days (`7`, `14`, `30`, `60`, `90`, `365`). |
| `default_period` | string | `day` | Long-term statistic bucket resolution (`hour`, `day`, `week`, `month`). |
| `align_to_grid` | boolean | `false` | When true, snaps date intervals to whole calendar months or weeks. |
| `compare_enabled` | boolean | `false` | Enables the secondary comparison column. |
| `compare_offset` | string | `1y` | Offset for the comparison column (`1y`, `1m`, `7d`, `custom`). |
| `compare_custom_days` | number | `365` | Custom offset in days when `compare_offset` is set to `custom`. |
| `charts` | list | `[]` | List of chart definitions. |

### Chart Object Options

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `entity` | string | **Required** | The entity ID with Recorder Long-Term Statistics enabled. |
| `name` | string | Entity Name | Display label above the chart. |
| `unit` | string | Entity Unit | Unit of measurement string. |
| `chart_type` | string | `floating_bars` | Chart style: `floating_bars`, `bar`, `line`, `area`, `step`. |
| `stat_mode` | string | `minmax_mean` | Statistic metric: `minmax_mean`, `mean`, `change`, `sum`, `min`, `max`. |
| `color_by` | string | `mean` | Metric used for coloring: `mean`, `max`, `min`, `value`, `fixed`. |
| `color_scheme` | string | `thermal` | Color palette: `thermal`, `energy`, `viridis`, `ocean`. |
| `color_min` | number | Auto | Lower numerical bound for color mapping. |
| `color_max` | number | Auto | Upper numerical bound for color mapping. |
| `show_avg_line` | boolean | `true` | Overlays a trend line over bars. |
| `show_labels` | boolean | `true` | Renders numerical values on bars and data points. |
| `height` | number | `210` | Height of the SVG chart area in pixels. |

---

## License

This project is licensed under the [MIT License](LICENSE).
