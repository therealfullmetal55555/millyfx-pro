// ─────────────────────────────────────────────────────────────────────────────
// MILLY FX PRO — ScriptUI Edition
// Built for Kirill Tsyganov (millyrock) | After Effects 2026
// High-Fashion / Hip-Hop / Opium / Editmaxxing Aesthetic
// ─────────────────────────────────────────────────────────────────────────────

(function MillyFXProScriptUI(thisObj) {

    // ─── EFFECT DATABASE ─────────────────────────────────────────────────────
    var FX_CATALOG = [
        // MOTION
        { cat: "motion", id: "SHAKE_01", label: "SHAKE 01 (BASS MICRO)" },
        { cat: "motion", id: "SHAKE_02", label: "SHAKE 02 (IMPACT)" },
        { cat: "motion", id: "SHAKE_03", label: "SHAKE 03 (WHIP SNAP)" },
        { cat: "motion", id: "INERTIA_01", label: "INERTIA 01 (DRIFT)" },
        { cat: "motion", id: "PIXEL_SORT_01", label: "PIXEL SORT 01" },
        // COLOR
        { cat: "color", id: "INVERT_HUE_01", label: "INVERT HUE 01 (ACID)" },
        { cat: "color", id: "THERMAL_01", label: "THERMAL 01 (MAXXING)" },
        { cat: "color", id: "SUBZERO_01", label: "SUB ZERO 01" },
        { cat: "color", id: "THRESHOLD_01", label: "THRESHOLD 01 (NOIR)" },
        { cat: "color", id: "ISOLATE_RED_01", label: "ISOLATE RED 01" },
        { cat: "color", id: "OSKAR_CC_01", label: "OSKAR CC 01 (GRADE)" },
        { cat: "color", id: "HEATMAP_FLIR_01", label: "HEAT MAP 01 (FLIR)" },
        { cat: "color", id: "HEATMAP_LUT_01", label: "HEAT MAP 02 (LUT)" },
        // DISTORT
        { cat: "distort", id: "TURB_DISP_01", label: "TURB DISP 01 (MELT)" },
        { cat: "distort", id: "TURB_DISP_02", label: "TURB DISP 02 (RIPPLE)" },
        { cat: "distort", id: "GLASS_01", label: "GLASS DISPLACE 01" },
        { cat: "distort", id: "MIRROR_01", label: "MIRROR 01 (KALEIDO)" },
        { cat: "distort", id: "MOSAIC_01", label: "SIGNAL MOSAIC 01" },
        // TEXTURE
        { cat: "texture", id: "PAPER_CUTS_01", label: "PAPER CUTS 01 (BORDER)" },
        { cat: "texture", id: "PAPER_CUTS_02", label: "PAPER CUTS 02 (TORN)" },
        { cat: "texture", id: "FILM_GRIME_01", label: "FILM GRIME 01 (35MM)" },
        { cat: "texture", id: "CRT_SCANLINES_01", label: "CRT SCANLINES 01" },
        { cat: "texture", id: "HALFTONE_01", label: "HALFTONE 01 (DOTS)" },
        // TIME
        { cat: "time", id: "FPS_12", label: "FPS 12 (STOP MOTION)" },
        { cat: "time", id: "FPS_08", label: "FPS 08 (UNDERGROUND)" },
        { cat: "time", id: "FPS_06", label: "FPS 06 (CHOPPY)" },
        { cat: "time", id: "SLOW_SHUTTER_01", label: "SLOW SHUTTER 01" },
        { cat: "time", id: "STROBE_01", label: "STROBE 01 (1-FRAME)" },
        // OPTICS
        { cat: "optics", id: "HALATION_01", label: "HALATION 01 (RED EDGE)" },
        { cat: "optics", id: "HALATION_02", label: "HALATION 02 (AMBER)" },
        { cat: "optics", id: "RGB_SPLIT_01", label: "RGB SPLIT 01" },
        { cat: "optics", id: "VAMP_GLOW_01", label: "VAMP GLOW 01 (MATTE)" },
        { cat: "optics", id: "VIGNETTE_01", label: "VIGNETTE 01" },
        { cat: "optics", id: "FLIR_OVERLAY_01", label: "FLIR HUD OVERLAY" }
    ];

    var FX_LABELS = [];
    for (var i = 0; i < FX_CATALOG.length; i++) {
        FX_LABELS.push(FX_CATALOG[i].label);
    }

    function findFxIndex(id) {
        for (var i = 0; i < FX_CATALOG.length; i++) {
            if (FX_CATALOG[i].id === id) return i;
        }
        return 0;
    }

    // Curated Presets
    var PRESETS = {
        "OPIUM MINIMALIST": ["FPS_12", "PAPER_CUTS_02", "HALATION_01", "OSKAR_CC_01", "SHAKE_01", "FILM_GRIME_01"],
        "CHAOS MAXXING": ["SHAKE_02", "TURB_DISP_01", "INVERT_HUE_01", "STROBE_01", "RGB_SPLIT_01", "PIXEL_SORT_01"],
        "90S TRINITRON CRT": ["CRT_SCANLINES_01", "SLOW_SHUTTER_01", "RGB_SPLIT_01", "FILM_GRIME_01", "FPS_12", "VIGNETTE_01"],
        "ACID THERMAL": ["THERMAL_01", "TURB_DISP_02", "PAPER_CUTS_01", "SHAKE_01", "FPS_08", "HALATION_02"],
        "PAPER STOP-MOTION": ["FPS_12", "PAPER_CUTS_02", "THRESHOLD_01", "FILM_GRIME_01", "HALFTONE_01", "SHAKE_01"],
        "CLEAN STREET EDIT": ["SHAKE_03", "HALATION_01", "OSKAR_CC_01", "INERTIA_01", "FPS_12", "VIGNETTE_01"],
        "FLIR HEAT MAP (JASH9N)": ["HEATMAP_FLIR_01", "FLIR_OVERLAY_01", "FPS_12", "PAPER_CUTS_02", "SHAKE_01", "FILM_GRIME_01"]
    };

    var PRESET_NAMES = [
        "SELECT PRESET...",
        "OPIUM MINIMALIST",
        "CHAOS MAXXING",
        "90S TRINITRON CRT",
        "ACID THERMAL",
        "PAPER STOP-MOTION",
        "CLEAN STREET EDIT",
        "FLIR HEAT MAP (JASH9N)"
    ];

    // ─── EXTENDSCRIPT ENGINE ─────────────────────────────────────────────────
    function getComp() {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return null;
        return comp;
    }

    function getSelectedLayer() {
        var comp = getComp();
        if (!comp) return null;
        if (comp.selectedLayers.length > 0) return comp.selectedLayers[0];
        if (comp.numLayers > 0) return comp.layer(1);
        return null;
    }

    function safeAdd(group, name, displayName) {
        try {
            var fx = group.addProperty(name);
            if (fx && displayName) fx.name = displayName;
            return fx;
        } catch(e) { return null; }
    }

    function safeVal(p, v) { try { p.setValue(v); } catch(e) {} }
    function safeExp(p, exp) { try { p.expression = exp; } catch(e) {} }

    function findAssetFile(filename) {
        try {
            var currentScript = new File($.fileName);
            var candidates = [
                new File(currentScript.parent.fsName + "/assets/" + filename),
                new File(currentScript.parent.parent.fsName + "/assets/" + filename),
                new File(Folder.myDocuments.fsName + "/Adobe/After Effects 2026/User Presets/MILLY FX/" + filename),
                new File(Folder.myDocuments.fsName + "/Adobe/After Effects 2026/User Presets/MILLY FX/Assets/" + filename),
                new File(Folder.userData.fsName + "/Adobe/CEP/extensions/com.millyrock.millyfxpro/assets/" + filename)
            ];
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i] && candidates[i].exists) return candidates[i];
            }
        } catch(e) {}
        return null;
    }

    function clearMillyFX(layer) {
        if (!layer) return;
        var fxGroup = layer.property("ADBE Effect Parade");
        if (!fxGroup) return;
        for (var i = fxGroup.numProperties; i >= 1; i--) {
            var fx = fxGroup.property(i);
            if (fx && fx.name && fx.name.indexOf("[MILLY]") === 0) {
                fx.remove();
            }
        }
    }

    function applyFxItem(layer, fxObj) {
        var fxGroup = layer.property("ADBE Effect Parade");
        var id = fxObj.id;

        // Motion
        if (id === "SHAKE_01") {
            var t = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] BASS SHAKE");
            if (t) { safeExp(t.property("ADBE Transform2-0002"), "wiggle(14, 18);"); safeVal(t.property("ADBE Transform2-0010"), 105); }
        } else if (id === "SHAKE_02") {
            var t2 = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] IMPACT SHAKE");
            if (t2) { safeExp(t2.property("ADBE Transform2-0002"), "wiggle(24, 45);"); safeExp(t2.property("ADBE Transform2-0008"), "var s = wiggle(20, 6)[0]; [s, s];"); }
        } else if (id === "SHAKE_03") {
            var db = safeAdd(fxGroup, "ADBE Directional Blur", "[MILLY] WHIP BLUR");
            if (db) { safeVal(db.property("ADBE Directional Blur-0001"), 90); safeExp(db.property("ADBE Directional Blur-0002"), "Math.abs(Math.sin(time * 8)) * 32;"); }
        } else if (id === "INERTIA_01") {
            var td = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] KINETIC DRIFT");
            if (td) safeExp(td.property("ADBE Transform2-0008"), "var s = 100 + (time * 1.8) % 15; [s, s];");
        } else if (id === "PIXEL_SORT_01") {
            var db2 = safeAdd(fxGroup, "ADBE Directional Blur", "[MILLY] PIXEL SORT");
            if (db2) { safeVal(db2.property("ADBE Directional Blur-0001"), 90); safeExp(db2.property("ADBE Directional Blur-0002"), "((timeToFrames() % 8) < 3) ? 60 : 0;"); }
        // Color
        } else if (id === "INVERT_HUE_01") {
            var inv = safeAdd(fxGroup, "ADBE Invert", "[MILLY] ACID INVERT");
            if (inv) safeVal(inv.property("ADBE Invert-0001"), 6);
        } else if (id === "THERMAL_01") {
            var inv2 = safeAdd(fxGroup, "ADBE Invert", "[MILLY] THERMAL BASE");
            if (inv2) safeVal(inv2.property("ADBE Invert-0001"), 1);
            var tint = safeAdd(fxGroup, "ADBE Tint", "[MILLY] THERMAL MAP");
            if (tint) { safeVal(tint.property("ADBE Tint-0001"), [0.0, 0.9, 0.2, 1.0]); safeVal(tint.property("ADBE Tint-0002"), [0.9, 0.0, 0.4, 1.0]); }
        } else if (id === "SUBZERO_01") {
            var tint2 = safeAdd(fxGroup, "ADBE Tint", "[MILLY] SUB ZERO TINT");
            if (tint2) { safeVal(tint2.property("ADBE Tint-0001"), [0.05, 0.1, 0.25, 1.0]); safeVal(tint2.property("ADBE Tint-0002"), [0.8, 0.95, 1.0, 1.0]); safeVal(tint2.property("ADBE Tint-0003"), 85); }
        } else if (id === "THRESHOLD_01") {
            var th = safeAdd(fxGroup, "ADBE Threshold2", "[MILLY] THRESHOLD NOIR");
            if (th) safeVal(th.property("ADBE Threshold2-0001"), 120);
        } else if (id === "ISOLATE_RED_01") {
            var hs = safeAdd(fxGroup, "ADBE HUE SATURATION", "[MILLY] BLOOD ISOLATION");
            if (hs) safeVal(hs.property("ADBE HUE SATURATION-0003"), -95);
            var tintR = safeAdd(fxGroup, "ADBE Tint", "[MILLY] RED GRADE");
            if (tintR) { safeVal(tintR.property("ADBE Tint-0002"), [0.9, 0.02, 0.05, 1.0]); safeVal(tintR.property("ADBE Tint-0003"), 45); }
        } else if (id === "OSKAR_CC_01") {
            var cb = safeAdd(fxGroup, "ADBE Color Balance", "[MILLY] OSKAR GRADE");
            if (cb) { safeVal(cb.property("ADBE Color Balance-0001"), 12); safeVal(cb.property("ADBE Color Balance-0003"), -10); safeVal(cb.property("ADBE Color Balance-0007"), -8); safeVal(cb.property("ADBE Color Balance-0009"), 15); }
        } else if (id === "HEATMAP_FLIR_01") {
            var pFile = findAssetFile("jash9n heatmap.ffx");
            if (pFile && pFile.exists) {
                try { layer.applyPreset(pFile); } catch(e) {}
            } else {
                var col = safeAdd(fxGroup, "APC Colorama", "[MILLY] FLIR HEATMAP");
            }
        } else if (id === "HEATMAP_LUT_01") {
            var lutFile = findAssetFile("Jash9n Heatmap Lut.ffx");
            if (lutFile && lutFile.exists) {
                try { layer.applyPreset(lutFile); } catch(e) {}
            }
        // Distort
        } else if (id === "TURB_DISP_01") {
            var td1 = safeAdd(fxGroup, "ADBE Turbulent Displace", "[MILLY] LIQUID MELT");
            if (td1) { safeVal(td1.property("ADBE Turbulent Displace-0002"), 45); safeVal(td1.property("ADBE Turbulent Displace-0003"), 60); safeExp(td1.property("ADBE Turbulent Displace-0006"), "time * 180;"); }
        } else if (id === "TURB_DISP_02") {
            var td22 = safeAdd(fxGroup, "ADBE Turbulent Displace", "[MILLY] HEATWAVE RIPPLE");
            if (td22) { safeVal(td22.property("ADBE Turbulent Displace-0001"), 8); safeVal(td22.property("ADBE Turbulent Displace-0002"), 28); safeExp(td22.property("ADBE Turbulent Displace-0006"), "time * 320;"); }
        } else if (id === "GLASS_01") {
            var oc = safeAdd(fxGroup, "ADBE Optics Compensation", "[MILLY] GLASS WARP");
            if (oc) { safeVal(oc.property("ADBE Optics Compensation-0001"), 55); safeVal(oc.property("ADBE Optics Compensation-0003"), 1); }
        } else if (id === "MIRROR_01") {
            var mr = safeAdd(fxGroup, "ADBE Mirror", "[MILLY] MIRROR KALEIDO");
            if (mr) safeVal(mr.property("ADBE Mirror-0002"), 90);
        } else if (id === "MOSAIC_01") {
            var mos = safeAdd(fxGroup, "ADBE Mosaic", "[MILLY] SIGNAL MOSAIC");
            if (mos) { safeExp(mos.property("ADBE Mosaic-0001"), "((timeToFrames() % 12) < 2) ? 35 : 1200;"); safeExp(mos.property("ADBE Mosaic-0002"), "((timeToFrames() % 12) < 2) ? 35 : 1200;"); }
        // Texture
        } else if (id === "PAPER_CUTS_01") {
            var rg = safeAdd(fxGroup, "ADBE Roughen Edges", "[MILLY] PAPER CUTS 01");
            if (rg) { safeVal(rg.property("ADBE Roughen Edges-0001"), 4); safeVal(rg.property("ADBE Roughen Edges-0002"), 14); safeVal(rg.property("ADBE Roughen Edges-0004"), 25); }
        } else if (id === "PAPER_CUTS_02") {
            var rg2 = safeAdd(fxGroup, "ADBE Roughen Edges", "[MILLY] PAPER CUTS 02");
            if (rg2) { safeVal(rg2.property("ADBE Roughen Edges-0001"), 5); safeVal(rg2.property("ADBE Roughen Edges-0002"), 22); safeExp(rg2.property("ADBE Roughen Edges-0006"), "posterizeTime(12); time * 800;"); }
        } else if (id === "FILM_GRIME_01") {
            var ns = safeAdd(fxGroup, "ADBE Noise", "[MILLY] 35MM GRAIN");
            if (ns) { safeVal(ns.property("ADBE Noise-0001"), 20); safeVal(ns.property("ADBE Noise-0002"), 0); }
        } else if (id === "CRT_SCANLINES_01") {
            var vb = safeAdd(fxGroup, "ADBE Venetian Blinds", "[MILLY] CRT SCANLINES");
            if (vb) { safeVal(vb.property("ADBE Venetian Blinds-0001"), 22); safeVal(vb.property("ADBE Venetian Blinds-0002"), 90); safeVal(vb.property("ADBE Venetian Blinds-0003"), 5); }
        } else if (id === "HALFTONE_01") {
            var ccB = safeAdd(fxGroup, "CC Ball Action", "[MILLY] HALFTONE DOTS");
            if (ccB) { safeVal(ccB.property(2), 2); safeVal(ccB.property(3), 60); }
        // Time
        } else if (id === "FPS_12") {
            var pt = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 12 STOP-MOTION");
            if (pt) safeVal(pt.property("ADBE Posterize Time-0001"), 12);
        } else if (id === "FPS_08") {
            var pt2 = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 08 RAW");
            if (pt2) safeVal(pt2.property("ADBE Posterize Time-0001"), 8);
        } else if (id === "FPS_06") {
            var pt3 = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 06 CHOPPY");
            if (pt3) safeVal(pt3.property("ADBE Posterize Time-0001"), 6);
        } else if (id === "SLOW_SHUTTER_01") {
            var echo = safeAdd(fxGroup, "ADBE Echo", "[MILLY] GHOST ECHO");
            if (echo) { safeVal(echo.property("ADBE Echo-0001"), -0.04); safeVal(echo.property("ADBE Echo-0002"), 3); safeVal(echo.property("ADBE Echo-0003"), 0.75); }
        } else if (id === "STROBE_01") {
            var strb = safeAdd(fxGroup, "ADBE Strobe Light", "[MILLY] 1-FRAME STROBE");
            if (strb) { safeVal(strb.property("ADBE Strobe Light-0002"), 0.04); safeVal(strb.property("ADBE Strobe Light-0003"), 0.25); safeVal(strb.property("ADBE Strobe Light-0006"), 2); }
        // Optics
        } else if (id === "HALATION_01") {
            var cb_h = safeAdd(fxGroup, "ADBE Channel Blur", "[MILLY] RED HALATION");
            if (cb_h) { safeVal(cb_h.property("ADBE Channel Blur-0002"), 35); safeVal(cb_h.property("ADBE Channel Blur-0006"), 1); }
        } else if (id === "HALATION_02") {
            var cb_h2 = safeAdd(fxGroup, "ADBE Channel Blur", "[MILLY] AMBER HALATION");
            if (cb_h2) { safeVal(cb_h2.property("ADBE Channel Blur-0002"), 40); safeVal(cb_h2.property("ADBE Channel Blur-0003"), 15); }
        } else if (id === "RGB_SPLIT_01") {
            var oc_rgb = safeAdd(fxGroup, "ADBE Optics Compensation", "[MILLY] RGB SPLIT");
            if (oc_rgb) safeVal(oc_rgb.property("ADBE Optics Compensation-0001"), 28);
        } else if (id === "VAMP_GLOW_01") {
            var fb = safeAdd(fxGroup, "ADBE Find Edges", "[MILLY] EDGE DETECTION");
            if (fb) safeVal(fb.property("ADBE Find Edges-0001"), 1);
            var ccComp = safeAdd(fxGroup, "ADBE CC Composite", "[MILLY] CRISP BLEND");
            if (ccComp) safeVal(ccComp.property(1), 5);
        } else if (id === "VIGNETTE_01") {
            var cg = safeAdd(fxGroup, "ADBE Circle", "[MILLY] VIGNETTE");
            if (cg) { safeVal(cg.property(2), 700); safeVal(cg.property(4), 350); safeVal(cg.property(7), 1); safeVal(cg.property(8), 2); }
        } else if (id === "FLIR_OVERLAY_01") {
            var comp = layer.containingComp;
            if (comp) {
                var ovFile = findAssetFile("overlay.mp4");
                if (ovFile && ovFile.exists) {
                    try {
                        var io = new ImportOptions(ovFile);
                        var footage = app.project.importFile(io);
                        var ovLayer = comp.layers.add(footage);
                        ovLayer.name = "[MILLY] FLIR CAMERA HUD";
                        ovLayer.blendingMode = BlendingMode.SCREEN;
                        ovLayer.moveToBeginning();
                    } catch(e) {}
                }
            }
        }
    }

    // ─── BUILD UI ────────────────────────────────────────────────────────────
    var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "MILLY FX PRO", undefined, {resizeable: true});
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 6;
    win.margins = 10;

    // Dark graphite background
    try {
        var g = win.graphics;
        var bgBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.07, 0.07, 0.09, 1]);
        win.graphics.backgroundColor = bgBrush;
    } catch(e) {}

    // 1. Header
    var headerGrp = win.add("group");
    headerGrp.orientation = "row";
    headerGrp.alignChildren = ["fill", "center"];

    var title = headerGrp.add("statictext", undefined, "MILLY FX PRO  [EDITMAXXING]");
    try {
        var limePen = win.graphics.newPen(win.graphics.PenType.SOLID_COLOR, [0.22, 1.0, 0.08, 1], 1);
        title.graphics.foregroundColor = limePen;
    } catch(e) {}

    // 2. Preset dropdown
    var presetGrp = win.add("group");
    presetGrp.orientation = "row";
    presetGrp.alignChildren = ["fill", "center"];

    var presetDropdown = presetGrp.add("dropdownlist", undefined, PRESET_NAMES);
    presetDropdown.selection = 0;
    presetDropdown.size = [200, 24];

    // 3. 6 Slots
    var slotsPanel = win.add("panel", undefined, "EFFECT STACK (6 SLOTS)");
    slotsPanel.orientation = "column";
    slotsPanel.alignChildren = ["fill", "top"];
    slotsPanel.spacing = 5;
    slotsPanel.margins = 8;

    var slotRows = [];

    for (var s = 0; s < 6; s++) {
        var row = slotsPanel.add("group");
        row.orientation = "row";
        row.alignChildren = ["left", "center"];
        row.spacing = 5;

        // Toggle checkbox (Bypass)
        var chkActive = row.add("checkbox", undefined, "");
        chkActive.value = true;
        chkActive.helpTip = "Enable/Bypass Slot";

        // Index label
        var lblIdx = row.add("statictext", undefined, (s + 1) + ".");
        lblIdx.characters = 2;

        // Effect dropdown
        var fxDrop = row.add("dropdownlist", undefined, FX_LABELS);
        fxDrop.size = [170, 22];

        // Default initial setup (Opium Minimalist)
        var defaultOpium = PRESETS["OPIUM MINIMALIST"];
        fxDrop.selection = findFxIndex(defaultOpium[s]);

        // Lock checkbox
        var chkLock = row.add("checkbox", undefined, "LOCK");
        chkLock.value = (s === 0); // Lock 1st slot by default (FPS 12)
        chkLock.helpTip = "Slot Locked: Won't change during Shuffle";

        slotRows.push({
            active: chkActive,
            dropdown: fxDrop,
            lock: chkLock
        });
    }

    // Preset Selection Change
    presetDropdown.onChange = function() {
        var pName = presetDropdown.selection ? presetDropdown.selection.text : "";
        if (PRESETS[pName]) {
            var pList = PRESETS[pName];
            for (var i = 0; i < 6; i++) {
                slotRows[i].dropdown.selection = findFxIndex(pList[i]);
            }
        }
    };

    // 4. Bottom Action Bar
    var actionGrp = win.add("group");
    actionGrp.orientation = "row";
    actionGrp.alignChildren = ["fill", "center"];
    actionGrp.spacing = 6;

    var btnClear = actionGrp.add("button", undefined, "✕ CLEAR");
    btnClear.size = [65, 32];
    btnClear.helpTip = "Remove all Milly FX from selected layer";

    var btnShuffle = actionGrp.add("button", undefined, "🎲 SHUFFLE");
    btnShuffle.size = [110, 32];
    btnShuffle.helpTip = "Randomize unlocked slots for a fresh look";

    var btnApply = actionGrp.add("button", undefined, "✓ APPLY");
    btnApply.size = [65, 32];
    btnApply.helpTip = "Apply current effect stack to selected layer";

    // Status label
    var statusLbl = win.add("statictext", undefined, "READY • SELECT LAYER & HIT APPLY");
    statusLbl.alignment = ["center", "bottom"];

    // ─── ACTIONS LOGIC ───────────────────────────────────────────────────────

    // Clear
    btnClear.onClick = function() {
        var layer = getSelectedLayer();
        if (!layer) {
            alert("Выбери слой в After Effects.");
            return;
        }
        app.beginUndoGroup("MILLY FX PRO: Clear");
        clearMillyFX(layer);
        app.endUndoGroup();
        statusLbl.text = "CLEARED: " + layer.name;
    };

    // Shuffle
    btnShuffle.onClick = function() {
        for (var i = 0; i < 6; i++) {
            if (!slotRows[i].lock.value) {
                var randomIdx = Math.floor(Math.random() * FX_CATALOG.length);
                slotRows[i].dropdown.selection = randomIdx;
            }
        }
        statusLbl.text = "SHUFFLED LOOK GENERATED";
    };

    // Apply
    btnApply.onClick = function() {
        var comp = getComp();
        if (!comp) {
            alert("Открой композицию в After Effects.");
            return;
        }
        var layer = getSelectedLayer();
        if (!layer) {
            alert("Выбери слой для применения эффектов.");
            return;
        }

        app.beginUndoGroup("MILLY FX PRO: Apply Stack");
        clearMillyFX(layer);

        var applied = 0;
        for (var i = 0; i < 6; i++) {
            if (slotRows[i].active.value && slotRows[i].dropdown.selection) {
                var selectedIdx = slotRows[i].dropdown.selection.index;
                var fxObj = FX_CATALOG[selectedIdx];
                applyFxItem(layer, fxObj);
                applied++;
            }
        }
        app.endUndoGroup();

        statusLbl.text = "APPLIED " + applied + " FX TO: " + layer.name;
    };

    // Close any previous instance
    if ($.global.millyFXProWin && $.global.millyFXProWin instanceof Window) {
        try { $.global.millyFXProWin.close(); } catch(e) {}
    }
    $.global.millyFXProWin = win;

    // Show panel
    if (win instanceof Window) {
        win.center();
        win.show();
    } else {
        win.layout.layout(true);
    }

})(this);
