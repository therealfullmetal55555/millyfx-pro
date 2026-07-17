# MILLY FX PRO // After Effects Editmaxxing Toolkit

<div align="center">

[![After Effects](https://img.shields.io/badge/Adobe_After_Effects-2020%E2%80%932026+-9999FF.svg?style=flat-square&logo=adobeaftereffects&logoColor=white)](https://www.adobe.com/products/aftereffects.html)
[![ExtendScript](https://img.shields.io/badge/Language-ExtendScript_%2F_JSX-F7DF1E.svg?style=flat-square&logo=javascript&logoColor=black)](https://github.com/therealfullmetal55555/millyfx-pro)
[![CEP 11+](https://img.shields.io/badge/Architecture-CEP_Extension_%2B_ScriptUI-FF0000.svg?style=flat-square)](./CSXS/manifest.xml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2ea44f.svg?style=flat-square)](./LICENSE)
[![Presets](https://img.shields.io/badge/Presets-26%2B_FX_Modules-black.svg?style=flat-square)](#preset-matrix--fx-catalog)

**High-fashion, music video, and street-culture visual effects toolkit for Adobe After Effects. Combines thermal heatmaps, bass-reactive camera shakes, analog CRT emulation, halation, and one-click aesthetic style recipes into a responsive dark-mode panel.**

[Features](#key-features) • [Installation](#installation) • [FX Catalog](#preset-matrix--fx-catalog) • [Architecture](#architecture) • [One-Click Presets](#master-style-recipes)

</div>

---

## Overview

**MILLY FX PRO** was engineered for high-cadence video editors, motion designers, and music video creators who need immediate access to stylized visual treatments without manually stacking and dialing 5+ native effects on every clip.

It is delivered as a **dual-architecture package**:
1. **CEP Extension Panel:** Modern HTML5/CSS3 dark glassmorphic interface with real-time composition connection status (`Window → Extensions → MILLY FX PRO`).
2. **Standalone ScriptUI Panel (`MillyFXPro.jsx`):** Zero-install lightweight native panel drop-in for fast deployment without debug-mode flags (`Window → MillyFXPro.jsx`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [MILLY FX PRO] ────────────────────────────────────────── [ONLINE ●]       │
├─────────────────────────────────────────────────────────────────────────────┤
│  PRESET: [ FLIR HEAT MAP (JASH9N)                            ▼ ] [ APPLY ]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ MOTION ]       SHAKE 01 (BASS)    SHAKE 02 (IMPACT)   INERTIA DRIFT      │
│  [ COLOR ]        ACID THERMAL       OSKAR CC GRADE      ISOLATE RED        │
│  [ DISTORT ]      LIQUID MELT        CHROMATIC ABERR     GLASS WARP         │
│  [ TEXTURE ]      35MM FILM GRIME    CRT SCANLINES       PAPER CUTS         │
│  [ TIME ]         12 FPS STOP-MOTION 08 FPS UNDERGROUND  1-FRAME STROBE     │
│  [ OPTICS ]       HALATION RED EDGE  VAMP MATTE GLOW     FLIR CAMERA HUD    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Features

- ⚡ **One-Click Procedural Stacking:** Automatically generates and configures compound effect chains (Turbulent Displace, Colorama, Optics Compensation, Find Edges, Curves) with mathematically tuned expressions.
- 🌡️ **FLIR Thermal & Heatmap Suite:** Procedural FLIR camera emulation and custom LUT grading mapped to dynamic luminance curves.
- 🎛️ **Bass & Impact Camera Shakes:** Wiggle-expression driven micro-shakes and impact zooms designed for hip-hop and electronic music 808 transients.
- 🎞️ **Analog & Industrial Lo-Fi Textures:** 35mm film grain, Trinitron CRT scanline simulation, halation edge bleeding, and paper stop-motion borders.
- 🧹 **Non-Destructive Management:** Includes `[MILLY]` namespace tagging for all applied properties with one-click cleanup (`CLEAR MILLY FX`) preserving existing layer hierarchy.

---

## Architecture

<div align="center">
  <img src="assets/architecture.svg?v=2026" alt="MILLY FX PRO Architecture" width="100%">
</div>

---

## Preset Matrix & FX Catalog

### 1. Motion & Camera Dynamics
| Module | Effect Chain | Typical Use Case |
| :--- | :--- | :--- |
| `SHAKE 01 (BASS MICRO)` | `ADBE Slider Control` + Transform Wiggle | 808 sub-bass subtle camera vibration |
| `SHAKE 02 (IMPACT)` | High-frequency decaying camera shock | Kick drum hit / snare snap transition |
| `SHAKE 03 (WHIP SNAP)` | Horizontal directional blur + position snap | Quick scene whip transitions |
| `INERTIA 01 (DRIFT)` | Continuous smooth cinematic drift | Float and ambient motion on static shots |
| `PIXEL SORT 01` | Directional blur + Mosaic horizontal slice | Glitch and digital compression artifact |

### 2. Color & Thermal Grading
| Module | Effect Chain | Typical Use Case |
| :--- | :--- | :--- |
| `THERMAL 01 (MAXXING)` | Inverted Hue/Sat + Color Balance tint | High-contrast thermal body heat look |
| `ACID INVERT 01` | Channel Invert + Vibrance saturation | Trippy psychedelic music video accents |
| `ISOLATE RED 01` | Selective Hue-Sat desaturation + Red boost | Sin City / vampire monochrome with blood pop |
| `OSKAR CC 01` | Cold shadow / warm highlight split tone | Modern street fashion color grade |
| `FLIR HEAT MAP` | Multi-node Colorama + Heatmap LUT | Military thermal infrared camera aesthetic |

### 3. Distortion & Optics
| Module | Effect Chain | Typical Use Case |
| :--- | :--- | :--- |
| `LIQUID MELT 01` | Animated Turbulent Displace (`time * 180`) | Psychedelic melting video effect |
| `HEATWAVE RIPPLE` | High-frequency subtle vertical distortion | Desert heat haze / hot exhaust air |
| `GLASS WARP 01` | Optics Compensation reverse fisheye | Ultra-wide anamorphic lens distortion |
| `HALATION 01 (RED)` | Extract + Channel Blur + Red Screen blend | Vintage film high-contrast edge glow |
| `VAMP GLOW 01` | Find Edges + CC Composite matte | Ethereal chalk / neon perimeter tracing |

### 4. Textures & Analog Emulation
| Module | Effect Chain | Typical Use Case |
| :--- | :--- | :--- |
| `CRT SCANLINES 01` | Venetian Blinds + Unsharp Mask | 90s Sony Trinitron TV broadcast monitor |
| `FILM GRIME 01` | Procedural Noise + Dust & Scratches | 35mm / 16mm organic celluloid patina |
| `HALFTONE 01` | CC Ball Action / Halftone grid | Printed comic book / manga screentone |
| `PAPER CUTS 01` | Roughen Edges + Drop Shadow border | Scrapbook / collage stop-motion aesthetic |

---

## Master Style Recipes (One-Click)

| Master Recipe | Stacked FX Modules | Visual Signature |
| :--- | :--- | :--- |
| **`OPIUM MINIMALIST`** | Isolate Red + Film Grime + Halation Red + 12 FPS | High-contrast dark aesthetic with selective red tones and cinematic stutter. |
| **`CHOPPED & GLITCHED`** | Pixel Sort + RGB Split + Bass Shake + 6 FPS | Heavy underground music video glitch texture. |
| **`90S TRINITRON CRT`** | CRT Scanlines + Glass Fisheye + Halftone + CC Grade | Vintage arcade / surveillance monitor feed. |
| **`FLIR HEAT MAP`** | FLIR Colorama + Thermal LUT + HUD Screen Overlay | Military infrared sensor display with telemetry. |
| **`PAPER STOP-MOTION`** | Torn Paper Borders + Posterize Time 8 FPS + Strobe | DIY zine collage stop-motion look. |

---

## Installation

### Method A: CEP Extension (Full Web UI)

1. **Enable Debug Mode (Required for unsigned extensions):**
   * **macOS (Terminal):**
     ```bash
     defaults write com.adobe.CSXS.11 PlayerDebugMode 1
     defaults write com.adobe.CSXS.12 PlayerDebugMode 1
     ```
   * **Windows (Registry):**
     Add a `String` value named `PlayerDebugMode` with value `1` under:
     `HKEY_CURRENT_USER\Software\Adobe\CSXS.11` and `CSXS.12`

2. **Copy extension folder:**
   * **macOS:** Copy `millyfx-pro/` to:
     `~/Library/Application Support/Adobe/CEP/extensions/MillyFXPro`
   * **Windows:** Copy `millyfx-pro/` to:
     `%APPDATA%\Adobe\CEP\extensions\MillyFXPro`

3. **Launch in After Effects:**
   Go to menu: **`Window → Extensions → MILLY FX PRO`**.

---

### Method B: Standalone ScriptUI Panel (Zero-Config)

If you do not want to configure CEP debug modes:

1. Copy **`MillyFXPro.jsx`** and the **`assets/`** folder to:
   * **macOS:** `/Applications/Adobe After Effects [Version]/Scripts/ScriptUI Panels/`
   * **Windows:** `C:\Program Files\Adobe\Adobe After Effects [Version]\Support Files\Scripts\ScriptUI Panels\`
2. Restart After Effects and open: **`Window → MillyFXPro.jsx`**.

---

## Repository Structure

```text
millyfx-pro/
├── CSXS/
│   └── manifest.xml        # Adobe CEP extension manifest (CSXS 11–12)
├── assets/
│   ├── overlay.mp4         # FLIR camera HUD screen asset
│   ├── jash9n heatmap.ffx  # Thermal colorama gradient preset
│   └── Jash9n Heatmap Lut.ffx # Heatmap look-up table preset
├── css/
│   └── style.css           # Dark-mode responsive panel stylesheet
├── js/
│   ├── CSInterface.js      # Adobe CEP JavaScript runtime interface
│   └── app.js              # UI event binding and ExtendScript dispatcher
├── jsx/
│   └── host.jsx            # Core ExtendScript effect engine for CEP
├── MillyFXPro.jsx          # Standalone ScriptUI panel (single-file alternative)
├── index.html              # CEP extension user interface layout
├── .gitignore              # Standard git ignore rules
├── LICENSE                 # MIT License
└── README.md               # Documentation & manual
```

---

## Compatibility

- **Adobe After Effects:** CC 2020 through 2026+ (v17.0 – v26.x+)
- **Operating Systems:** macOS (Apple Silicon M1–M4 & Intel), Windows 10/11 (x64)
- **Host Engine:** ExtendScript (JavaScript 1.5 with Adobe API extensions)

---

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for full details.
