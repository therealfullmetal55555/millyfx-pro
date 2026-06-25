// ─────────────────────────────────────────────────────────────────────────────
// MILLY FX PRO — ExtendScript Host Engine
// Built for Kirill Tsyganov (millyrock) | After Effects 2026
// High-Fashion / Hip-Hop / Opium / Editmaxxing Aesthetic
// ─────────────────────────────────────────────────────────────────────────────

var MillyHost = (function() {

    function getComp() {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            return null;
        }
        return comp;
    }

    function getSelectedLayer() {
        var comp = getComp();
        if (!comp) return null;
        if (comp.selectedLayers.length > 0) {
            return comp.selectedLayers[0];
        }
        if (comp.numLayers > 0) {
            return comp.layer(1);
        }
        return null;
    }

    function safeAdd(effectsGroup, matchName, displayName) {
        try {
            var fx = effectsGroup.addProperty(matchName);
            if (fx && displayName) {
                fx.name = displayName;
            }
            return fx;
        } catch(e) {
            return null;
        }
    }

    function safeVal(prop, val) {
        try {
            prop.setValue(val);
        } catch(e) {}
    }

    function safeExp(prop, exp) {
        try {
            prop.expression = exp;
        } catch(e) {}
    }

    function findAssetFile(filename) {
        try {
            var currentScript = new File($.fileName);
            var candidates = [
                new File(currentScript.parent.parent.fsName + "/assets/" + filename),
                new File(currentScript.parent.fsName + "/assets/" + filename),
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

    // ─── STATUS CHECK ────────────────────────────────────────────────────────
    function getStatus() {
        var comp = getComp();
        if (!comp) {
            return JSON.stringify({ ok: false, error: "No active composition found. Open a comp to start." });
        }
        var layer = getSelectedLayer();
        return JSON.stringify({
            ok: true,
            compName: comp.name,
            compFps: comp.frameRate,
            compWidth: comp.width,
            compHeight: comp.height,
            layerName: layer ? layer.name : "No Layer Selected",
            hasSelectedLayer: (comp.selectedLayers.length > 0)
        });
    }

    // ─── CLEAR FX ────────────────────────────────────────────────────────────
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

    // ─── EFFECT GENERATORS ───────────────────────────────────────────────────

    // 01. MOTION / SHAKE
    function applyMotion(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "SHAKE_01") { // Micro Bass Wiggle
            var t = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] BASS SHAKE");
            if (t) {
                safeExp(t.property("ADBE Transform2-0002"), "wiggle(14, 18);");
                safeVal(t.property("ADBE Transform2-0010"), 105); // slight scale buffer
                safeVal(t.property("ADBE Transform2-0012"), 180); // shutter angle
            }
        } else if (id === "SHAKE_02") { // Aggressive Impact
            var t2 = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] IMPACT SHAKE");
            if (t2) {
                safeExp(t2.property("ADBE Transform2-0002"), "wiggle(24, 45);");
                safeExp(t2.property("ADBE Transform2-0008"), "var s = wiggle(20, 6)[0]; [s, s];");
                safeVal(t2.property("ADBE Transform2-0012"), 300);
            }
        } else if (id === "SHAKE_03") { // Whip Pan Snap
            var db = safeAdd(fxGroup, "ADBE Directional Blur", "[MILLY] WHIP BLUR");
            if (db) {
                safeExp(db.property("ADBE Directional Blur-0002"), "Math.abs(Math.sin(time * 8)) * 32;");
                safeVal(db.property("ADBE Directional Blur-0001"), 90);
            }
            var t3 = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] WHIP POSITION");
            if (t3) {
                safeExp(t3.property("ADBE Transform2-0002"), "var x = Math.sin(time * 8) * 80; [value[0] + x, value[1]];");
            }
        } else if (id === "INERTIA_01") { // Kinetic Drift
            var td = safeAdd(fxGroup, "ADBE Transform2", "[MILLY] KINETIC DRIFT");
            if (td) {
                safeExp(td.property("ADBE Transform2-0008"), "var s = 100 + (time * 1.8) % 15; [s, s];");
            }
        } else if (id === "PIXEL_SORT_01") { // Pixel Sort Glitch
            var db2 = safeAdd(fxGroup, "ADBE Directional Blur", "[MILLY] PIXEL STRETCH");
            if (db2) {
                safeVal(db2.property("ADBE Directional Blur-0001"), 90);
                safeExp(db2.property("ADBE Directional Blur-0002"), "((timeToFrames() % 8) < 3) ? 60 : 0;");
            }
        }
    }

    // 02. COLOR & INVERSION
    function applyColor(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "INVERT_HUE_01") { // Acid Invert Hue
            var inv = safeAdd(fxGroup, "ADBE Invert", "[MILLY] ACID INVERT");
            if (inv) {
                safeVal(inv.property("ADBE Invert-0001"), 6); // Hue channel
                safeVal(inv.property("ADBE Invert-0002"), 100);
            }
        } else if (id === "THERMAL_01") { // Thermal Maxxing
            var inv2 = safeAdd(fxGroup, "ADBE Invert", "[MILLY] THERMAL BASE");
            if (inv2) safeVal(inv2.property("ADBE Invert-0001"), 1); // RGB
            var tint = safeAdd(fxGroup, "ADBE Tint", "[MILLY] THERMAL MAP");
            if (tint) {
                safeVal(tint.property("ADBE Tint-0001"), [0.0, 0.9, 0.2, 1.0]); // Map Black to Acid Green
                safeVal(tint.property("ADBE Tint-0002"), [0.9, 0.0, 0.4, 1.0]); // Map White to Magenta
            }
            var crv = safeAdd(fxGroup, "ADBE CurvesCustom", "[MILLY] THERMAL CONTRAST");
        } else if (id === "SUBZERO_01") { // Sub-Zero Invert
            var tint2 = safeAdd(fxGroup, "ADBE Tint", "[MILLY] SUB ZERO TINT");
            if (tint2) {
                safeVal(tint2.property("ADBE Tint-0001"), [0.05, 0.1, 0.25, 1.0]); // Deep Ice Navy
                safeVal(tint2.property("ADBE Tint-0002"), [0.8, 0.95, 1.0, 1.0]); // Pure Ice White
                safeVal(tint2.property("ADBE Tint-0003"), 85);
            }
        } else if (id === "THRESHOLD_01") { // Noir Threshold Look
            var th = safeAdd(fxGroup, "ADBE Threshold2", "[MILLY] THRESHOLD NOIR");
            if (th) {
                safeVal(th.property("ADBE Threshold2-0001"), 120);
            }
        } else if (id === "ISOLATE_RED_01") { // Blood Red Isolation (#E60014)
            var hs = safeAdd(fxGroup, "ADBE HUE SATURATION", "[MILLY] BLOOD ISOLATION");
            if (hs) {
                safeVal(hs.property("ADBE HUE SATURATION-0003"), -95); // Desaturate master
            }
            var tintR = safeAdd(fxGroup, "ADBE Tint", "[MILLY] RED GRADE");
            if (tintR) {
                safeVal(tintR.property("ADBE Tint-0002"), [0.9, 0.02, 0.05, 1.0]);
                safeVal(tintR.property("ADBE Tint-0003"), 45);
            }
        } else if (id === "OSKAR_CC_01") { // Oskar Fashion Grade
            var cb = safeAdd(fxGroup, "ADBE Color Balance", "[MILLY] OSKAR GRADE");
            if (cb) {
                safeVal(cb.property("ADBE Color Balance-0001"), 12);  // Red Shadow
                safeVal(cb.property("ADBE Color Balance-0003"), -10); // Blue Shadow
                safeVal(cb.property("ADBE Color Balance-0007"), -8);  // Red Highlight
                safeVal(cb.property("ADBE Color Balance-0009"), 15);  // Blue Highlight
            }
            var hs2 = safeAdd(fxGroup, "ADBE HUE SATURATION", "[MILLY] OPIUM DENSE");
            if (hs2) safeVal(hs2.property("ADBE HUE SATURATION-0003"), -20);
        } else if (id === "HEATMAP_FLIR_01") { // Jash9n FLIR Heatmap Colorama
            var pFile = findAssetFile("jash9n heatmap.ffx");
            if (pFile && pFile.exists) {
                try { layer.applyPreset(pFile); } catch(e) {}
            } else {
                var col = safeAdd(fxGroup, "APC Colorama", "[MILLY] FLIR HEATMAP");
            }
        } else if (id === "HEATMAP_LUT_01") { // Jash9n Heatmap LUT
            var lutFile = findAssetFile("Jash9n Heatmap Lut.ffx");
            if (lutFile && lutFile.exists) {
                try { layer.applyPreset(lutFile); } catch(e) {}
            }
        }
    }

    // 03. DISTORTION & WARP
    function applyDistort(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "TURB_DISP_01") { // Liquid Melt
            var td = safeAdd(fxGroup, "ADBE Turbulent Displace", "[MILLY] LIQUID MELT");
            if (td) {
                safeVal(td.property("ADBE Turbulent Displace-0001"), 1); // Turb Bulge
                safeVal(td.property("ADBE Turbulent Displace-0002"), 45); // Amount
                safeVal(td.property("ADBE Turbulent Displace-0003"), 60); // Size
                safeExp(td.property("ADBE Turbulent Displace-0006"), "time * 180;"); // Evolution
            }
        } else if (id === "TURB_DISP_02") { // Heatwave Ripple
            var td2 = safeAdd(fxGroup, "ADBE Turbulent Displace", "[MILLY] HEATWAVE RIPPLE");
            if (td2) {
                safeVal(td2.property("ADBE Turbulent Displace-0001"), 8); // Horizontal Displace
                safeVal(td2.property("ADBE Turbulent Displace-0002"), 28);
                safeVal(td2.property("ADBE Turbulent Displace-0003"), 22);
                safeExp(td2.property("ADBE Turbulent Displace-0006"), "time * 320;");
            }
        } else if (id === "GLASS_01") { // Glass Displace
            var oc = safeAdd(fxGroup, "ADBE Optics Compensation", "[MILLY] GLASS WARP");
            if (oc) {
                safeVal(oc.property("ADBE Optics Compensation-0001"), 55); // FOV
                safeVal(oc.property("ADBE Optics Compensation-0003"), 1);  // Reverse Lens
            }
        } else if (id === "MIRROR_01") { // Kaleidoscope Mirror
            var mr = safeAdd(fxGroup, "ADBE Mirror", "[MILLY] MIRROR KALEIDO");
            if (mr) {
                safeVal(mr.property("ADBE Mirror-0002"), 90); // 90 deg reflection
            }
        } else if (id === "MOSAIC_01") { // Signal Glitch Mosaic
            var mos = safeAdd(fxGroup, "ADBE Mosaic", "[MILLY] SIGNAL MOSAIC");
            if (mos) {
                safeExp(mos.property("ADBE Mosaic-0001"), "((timeToFrames() % 12) < 2) ? 35 : 1200;");
                safeExp(mos.property("ADBE Mosaic-0002"), "((timeToFrames() % 12) < 2) ? 35 : 1200;");
            }
        }
    }

    // 04. PAPER & TEXTURE
    function applyTexture(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "PAPER_CUTS_01") { // Roughen Border
            var rg = safeAdd(fxGroup, "ADBE Roughen Edges", "[MILLY] PAPER CUTS 01");
            if (rg) {
                safeVal(rg.property("ADBE Roughen Edges-0001"), 4);  // Cut
                safeVal(rg.property("ADBE Roughen Edges-0002"), 14); // Border
                safeVal(rg.property("ADBE Roughen Edges-0004"), 25); // Scale
            }
        } else if (id === "PAPER_CUTS_02") { // Stop Motion Torn Paper
            var rg2 = safeAdd(fxGroup, "ADBE Roughen Edges", "[MILLY] PAPER CUTS 02");
            if (rg2) {
                safeVal(rg2.property("ADBE Roughen Edges-0001"), 5); // Rusty / Rough
                safeVal(rg2.property("ADBE Roughen Edges-0002"), 22);
                safeVal(rg2.property("ADBE Roughen Edges-0004"), 40);
                safeExp(rg2.property("ADBE Roughen Edges-0006"), "posterizeTime(12); time * 800;");
            }
        } else if (id === "FILM_GRIME_01") { // 35mm Heavy Dust & Grain
            var ns = safeAdd(fxGroup, "ADBE Noise", "[MILLY] 35MM GRAIN");
            if (ns) {
                safeVal(ns.property("ADBE Noise-0001"), 20); // 20%
                safeVal(ns.property("ADBE Noise-0002"), 0);  // Monochromatic
            }
        } else if (id === "CRT_SCANLINES_01") { // Sony Trinitron Scanlines
            var vb = safeAdd(fxGroup, "ADBE Venetian Blinds", "[MILLY] CRT SCANLINES");
            if (vb) {
                safeVal(vb.property("ADBE Venetian Blinds-0001"), 22); // Transition completion
                safeVal(vb.property("ADBE Venetian Blinds-0002"), 90); // Direction horizontal
                safeVal(vb.property("ADBE Venetian Blinds-0003"), 5);  // Width
                safeVal(vb.property("ADBE Venetian Blinds-0004"), 1);  // Feather
            }
        } else if (id === "HALFTONE_01") { // Halftone Dot Matrix
            var ccB = safeAdd(fxGroup, "CC Ball Action", "[MILLY] HALFTONE DOTS");
            if (ccB) {
                safeVal(ccB.property(2), 2);  // Grid Spacing
                safeVal(ccB.property(3), 60); // Ball Size
            } else {
                // Fallback to Mosaic texture
                var mos = safeAdd(fxGroup, "ADBE Mosaic", "[MILLY] DOT MATRIX");
                if (mos) {
                    safeVal(mos.property("ADBE Mosaic-0001"), 120);
                    safeVal(mos.property("ADBE Mosaic-0002"), 120);
                }
            }
        }
    }

    // 05. TIME & RHYTHM
    function applyTime(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "FPS_12") { // Stop Motion 12 FPS
            var pt = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 12 STOP-MOTION");
            if (pt) safeVal(pt.property("ADBE Posterize Time-0001"), 12);
        } else if (id === "FPS_08") { // Raw Underground 8 FPS
            var pt2 = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 08 RAW");
            if (pt2) safeVal(pt2.property("ADBE Posterize Time-0001"), 8);
        } else if (id === "FPS_06") { // Extreme Choppy 6 FPS
            var pt3 = safeAdd(fxGroup, "ADBE Posterize Time", "[MILLY] FPS 06 CHOPPY");
            if (pt3) safeVal(pt3.property("ADBE Posterize Time-0001"), 6);
        } else if (id === "SLOW_SHUTTER_01") { // Ghost Echo
            var echo = safeAdd(fxGroup, "ADBE Echo", "[MILLY] GHOST ECHO");
            if (echo) {
                safeVal(echo.property("ADBE Echo-0001"), -0.04);
                safeVal(echo.property("ADBE Echo-0002"), 3);
                safeVal(echo.property("ADBE Echo-0003"), 0.75);
                safeVal(echo.property("ADBE Echo-0004"), 2); // Composite Behind
            }
        } else if (id === "STROBE_01") { // 1-Frame Beat Flash
            var strb = safeAdd(fxGroup, "ADBE Strobe Light", "[MILLY] 1-FRAME STROBE");
            if (strb) {
                safeVal(strb.property("ADBE Strobe Light-0002"), 0.04); // Strobe duration
                safeVal(strb.property("ADBE Strobe Light-0003"), 0.25); // Period
                safeVal(strb.property("ADBE Strobe Light-0006"), 2);    // Makes layer transparent
            }
        }
    }

    // 06. OPTICS & ARTIFACTS
    function applyOptics(layer, id) {
        var fxGroup = layer.property("ADBE Effect Parade");
        if (id === "HALATION_01") { // Kodak Red Edge Halation
            var cb = safeAdd(fxGroup, "ADBE Channel Blur", "[MILLY] RED HALATION");
            if (cb) {
                safeVal(cb.property("ADBE Channel Blur-0002"), 35); // Red Blur
                safeVal(cb.property("ADBE Channel Blur-0003"), 0);  // Green Blur
                safeVal(cb.property("ADBE Channel Blur-0004"), 0);  // Blue Blur
                safeVal(cb.property("ADBE Channel Blur-0006"), 1);  // Repeat Edge Pixels
            }
        } else if (id === "HALATION_02") { // Amber Edge Bloom
            var cb2 = safeAdd(fxGroup, "ADBE Channel Blur", "[MILLY] AMBER HALATION");
            if (cb2) {
                safeVal(cb2.property("ADBE Channel Blur-0002"), 40);
                safeVal(cb2.property("ADBE Channel Blur-0003"), 15);
                safeVal(cb2.property("ADBE Channel Blur-0004"), 0);
                safeVal(cb2.property("ADBE Channel Blur-0006"), 1);
            }
        } else if (id === "RGB_SPLIT_01") { // Chromatic Aberration Split
            var oc = safeAdd(fxGroup, "ADBE Optics Compensation", "[MILLY] RGB SPLIT");
            if (oc) {
                safeVal(oc.property("ADBE Optics Compensation-0001"), 28);
                safeVal(oc.property("ADBE Optics Compensation-0003"), 0);
            }
        } else if (id === "VAMP_GLOW_01") { // Crisp Matte Edge Highlight (0% blurry bloom)
            var fb = safeAdd(fxGroup, "ADBE Find Edges", "[MILLY] EDGE DETECTION");
            if (fb) {
                safeVal(fb.property("ADBE Find Edges-0001"), 1); // Invert
            }
            var cc = safeAdd(fxGroup, "ADBE CC Composite", "[MILLY] CRISP BLEND");
            if (cc) {
                safeVal(cc.property(1), 5); // Screen blending
            }
        } else if (id === "VIGNETTE_01") { // Deep Matte Vignette
            var cg = safeAdd(fxGroup, "ADBE Circle", "[MILLY] VIGNETTE");
            if (cg) {
                safeVal(cg.property(2), 700); // Radius
                safeVal(cg.property(4), 350); // Feather
                safeVal(cg.property(7), 1);   // Invert circle
                safeVal(cg.property(8), 2);   // Blending mode Multiply
            }
        } else if (id === "FLIR_OVERLAY_01") { // FLIR Camera HUD Overlay
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

    // ─── MASTER DISPATCHER ───────────────────────────────────────────────────
    function applySingleEffect(layer, cat, id) {
        if (!layer || !id) return;
        if (cat === "motion")   applyMotion(layer, id);
        else if (cat === "color")    applyColor(layer, id);
        else if (cat === "distort")  applyDistort(layer, id);
        else if (cat === "texture")  applyTexture(layer, id);
        else if (cat === "time")     applyTime(layer, id);
        else if (cat === "optics")   applyOptics(layer, id);
    }

    // ─── APPLY EFFECT STACK ──────────────────────────────────────────────────
    function applyStack(slotsJson) {
        var comp = getComp();
        if (!comp) return JSON.stringify({ ok: false, error: "No active composition found." });
        var layer = getSelectedLayer();
        if (!layer) return JSON.stringify({ ok: false, error: "Please select a layer to apply effects." });

        var slots = [];
        try {
            slots = JSON.parse(slotsJson);
        } catch(e) {
            return JSON.stringify({ ok: false, error: "Failed to parse slots JSON: " + e.toString() });
        }

        app.beginUndoGroup("MILLY FX PRO: Apply Stack");
        try {
            // Remove previous Milly FX on this layer
            clearMillyFX(layer);

            var appliedCount = 0;
            for (var i = 0; i < slots.length; i++) {
                var s = slots[i];
                if (s && s.enabled && s.effectId) {
                    applySingleEffect(layer, s.category, s.effectId);
                    appliedCount++;
                }
            }
            app.endUndoGroup();
            return JSON.stringify({
                ok: true,
                layerName: layer.name,
                appliedCount: appliedCount
            });
        } catch(err) {
            app.endUndoGroup();
            return JSON.stringify({ ok: false, error: "Error applying effects: " + err.toString() });
        }
    }

    // ─── PUBLIC API ──────────────────────────────────────────────────────────
    return {
        getStatus: getStatus,
        applyStack: applyStack,
        clearMillyFX: function() {
            var layer = getSelectedLayer();
            if (!layer) return JSON.stringify({ ok: false, error: "No layer selected." });
            app.beginUndoGroup("MILLY FX PRO: Clear FX");
            clearMillyFX(layer);
            app.endUndoGroup();
            return JSON.stringify({ ok: true });
        }
    };

})();
