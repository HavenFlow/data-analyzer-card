# Changelog

All notable changes to the **HavenFlow Data Analyzer Card** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.9] - 2026-11-07

### Added
* Direct language selector toggle (`PL` / `EN`) directly on the main card toolbar.

### Fixed
* **YAML GUI Configuration Sync**: Resolved an issue where saving changes from the dashboard toolbar failed to write to the Lovelace dashboard configuration. Rebuilt the `config-changed` event pipeline to properly persist entity selections, custom chart heights, palettes, and ordering to the Home Assistant dashboard backend.
* **Dropdown Stacking Context**: Implemented descending cascading `z-index` levels per chart row, preventing the live entity search dropdown from getting obscured or cut off by charts underneath.
* **Hover Readout Layout Constraints**: Separated SVG chart rendering from bottom readout rows with fixed minimum heights, ensuring crosshair reading labels never get clipped.

---

## [1.0.8] - 2026-11-06

### Added
* **Multi-Term Search Filtering**: Improved live entity search to handle space-delimited queries (e.g., `gas energy`), matching all substrings across both entity IDs and friendly names.

### Fixed
* **Static Crosshair Readout**: Restored and stabilized the persistent timestamp and metric readout bar at the base of every card during cursor hover.
* **Typography Hierarchy**: Scaled down bar-end minimum and maximum value labels to `7.5px` (an approximate 20% reduction relative to average trend node labels) for enhanced legibility during dense monthly views.

---

## [1.0.7] - 2026-11-06

### Changed
* Refactored hover reading visibility to ensure values remain legible during cursor inspection.
* Upgraded search box styling and layer precedence across all viewports.

---

## [1.0.6] - 2026-11-06

### Fixed
* Eliminated infinite update loops when synchronizing live state with dashboard configurations.
* Separated clean configuration baselines from transient runtime state.
* Smoothly faded out overall card metric summaries on cursor inspection to focus entirely on the hovered timestamp values.

---

## [1.0.5] - 2026-11-06

### Added
* **Locale-Aware Number Formatting**: Integrated universal `toLocaleString()` formatting matching the active card locale (`pl-PL` / `en-US`), displaying localized decimal marks (commas vs. dots) and standardized single-decimal precision.

### Fixed
* **Dropdown Boundary Clipping**: Removed restrictive `overflow: hidden` properties on chart card wrappers that previously truncated entity search dropdown results.
* Scaled down bar value label typography to prevent overlap during 30-day and 60-day spans.

---

## [1.0.4] - 2026-11-06

### Added
* **Unified Master Chart Toolbar**: Centered entity search, chart types, color schemes, and configuration controls across both primary and comparative chart columns, guaranteeing 100% height parity between columns.
* **Contrast-Enhanced Trend Labels**: Added high-contrast dark drop-shadow outlines (`text-shadow`) to floating bar mean value labels positioned over white trend points.
* **Strict Horizontal YoY for Mobile**: Enforced flex row formatting with CSS `scroll-snap` on mobile screens when comparison mode is active.
* **Chart Reordering**: Added `⬆️ Move Up` and `⬇️ Move Down` controls in the chart settings drawer to reorder cards dynamically.

---

## [1.0.3] - 2026-11-06

### Added
* Bilingual internationalization support (`pl` and `en`) across all toolbar buttons, configuration drawers, and hover readouts.
* Custom lightweight autocomplete dropdown layer tailored for the Home Assistant Android Companion App and WebViews.

---

## [1.0.2] - 2026-11-06

### Added
* **Calendar Grid Alignment (`📅 Full Period`)**: Added whole-period snapping logic that locks date windows to the 1st of the calendar month or Monday of the calendar week, cleanly padding remaining days.
* **Per-Chart Height Customization**: Added numerical height inputs in chart settings drawers to set custom pixel heights per chart pair.
* Multi-tier Floating Bar labeling showing Max above the bar, Min below the bar, and Mean on the inner cross-section.

### Fixed
* Ensured line overlay charts accurately follow the chosen `stat_mode` (such as `max` or `min`) rather than defaulting to `mean` on standard bar charts.
* Corrected Android WebView rendering discrepancies where stacked SVG containers collapsed under flex grids.

---

## [1.0.1] - 2026-11-06

### Added
* In-card entity autocomplete search powered by live Home Assistant entity catalogs.
* Automatic friendly name and unit-of-measurement metadata discovery upon entity selection.
* Client-side `localStorage` state preservation across browser reloads.

---

## [1.0.0] - 2026-11-06

### Added
* Initial release of **HavenFlow Data Analyzer Card**.
* Direct WebSocket querying of Home Assistant Long-Term Statistics (`recorder/statistics_during_period`).
* **Floating Bars** chart type plotting daily min-to-max range bars overlaid with mean trend lines.
* Synchronized time axis navigation and multi-chart synchronized crosshairs.
* Year-over-Year (YoY) dual-column comparative analysis with automated unit and percentage variance calculations.
* Dynamic bar and point coloring based on multiple metrics across four gradient presets (`thermal`, `energy`, `viridis`, `ocean`).