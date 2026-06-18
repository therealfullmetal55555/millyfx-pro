// ─────────────────────────────────────────────────────────────────────────────
// MILLY FX PRO — Web Controller Logic
// Built for Kirill Tsyganov (millyrock) | After Effects CEP
// ─────────────────────────────────────────────────────────────────────────────

(function() {
  const csInterface = new CSInterface();

  // ─── EFFECT DATABASE ───────────────────────────────────────────────────────
  const FX_DATABASE = {
    motion: [
      { id: "SHAKE_01", label: "SHAKE 01 (BASS MICRO)" },
      { id: "SHAKE_02", label: "SHAKE 02 (IMPACT SHAKE)" },
      { id: "SHAKE_03", label: "SHAKE 03 (WHIP SNAP)" },
      { id: "INERTIA_01", label: "INERTIA 01 (DRIFT)" },
      { id: "PIXEL_SORT_01", label: "PIXEL SORT 01" }
    ],
    color: [
      { id: "INVERT_HUE_01", label: "INVERT HUE 01 (ACID)" },
      { id: "THERMAL_01", label: "THERMAL 01 (MAXXING)" },
      { id: "SUBZERO_01", label: "SUB ZERO 01" },
      { id: "THRESHOLD_01", label: "THRESHOLD 01 (NOIR)" },
      { id: "ISOLATE_RED_01", label: "ISOLATE RED 01" },
      { id: "OSKAR_CC_01", label: "OSKAR CC 01 (GRADE)" },
      { id: "HEATMAP_FLIR_01", label: "HEAT MAP 01 (FLIR)" },
      { id: "HEATMAP_LUT_01", label: "HEAT MAP 02 (LUT)" }
    ],
    distort: [
      { id: "TURB_DISP_01", label: "TURB DISP 01 (MELT)" },
      { id: "TURB_DISP_02", label: "TURB DISP 02 (RIPPLE)" },
      { id: "GLASS_01", label: "GLASS DISPLACE 01" },
      { id: "MIRROR_01", label: "MIRROR 01 (KALEIDO)" },
      { id: "MOSAIC_01", label: "SIGNAL MOSAIC 01" }
    ],
    texture: [
      { id: "PAPER_CUTS_01", label: "PAPER CUTS 01 (BORDER)" },
      { id: "PAPER_CUTS_02", label: "PAPER CUTS 02 (TORN)" },
      { id: "FILM_GRIME_01", label: "FILM GRIME 01 (35MM)" },
      { id: "CRT_SCANLINES_01", label: "CRT SCANLINES 01" },
      { id: "HALFTONE_01", label: "HALFTONE 01 (DOTS)" }
    ],
    time: [
      { id: "FPS_12", label: "FPS 12 (STOP MOTION)" },
      { id: "FPS_08", label: "FPS 08 (UNDERGROUND)" },
      { id: "FPS_06", label: "FPS 06 (CHOPPY)" },
      { id: "SLOW_SHUTTER_01", label: "SLOW SHUTTER 01" },
      { id: "STROBE_01", label: "STROBE 01 (1-FRAME)" }
    ],
    optics: [
      { id: "HALATION_01", label: "HALATION 01 (RED EDGE)" },
      { id: "HALATION_02", label: "HALATION 02 (AMBER)" },
      { id: "RGB_SPLIT_01", label: "RGB SPLIT 01 (OPTICS)" },
      { id: "VAMP_GLOW_01", label: "VAMP GLOW 01 (MATTE)" },
      { id: "VIGNETTE_01", label: "VIGNETTE 01 (MATTE)" },
      { id: "FLIR_OVERLAY_01", label: "FLIR HUD OVERLAY" }
    ]
  };

  const CATEGORY_KEYS = ["motion", "color", "distort", "texture", "time", "optics"];

  // ─── BUILT-IN CURATED PRESETS ──────────────────────────────────────────────
  const CURATED_PRESETS = {
    opium_minimalist: [
      { category: "time", effectId: "FPS_12", enabled: true, locked: true },
      { category: "texture", effectId: "PAPER_CUTS_02", enabled: true, locked: false },
      { category: "optics", effectId: "HALATION_01", enabled: true, locked: false },
      { category: "color", effectId: "OSKAR_CC_01", enabled: true, locked: false },
      { category: "motion", effectId: "SHAKE_01", enabled: true, locked: false },
      { category: "texture", effectId: "FILM_GRIME_01", enabled: true, locked: false }
    ],
    chaos_maxxing: [
      { category: "motion", effectId: "SHAKE_02", enabled: true, locked: false },
      { category: "distort", effectId: "TURB_DISP_01", enabled: true, locked: false },
      { category: "color", effectId: "INVERT_HUE_01", enabled: true, locked: false },
      { category: "time", effectId: "STROBE_01", enabled: true, locked: false },
      { category: "optics", effectId: "RGB_SPLIT_01", enabled: true, locked: false },
      { category: "motion", effectId: "PIXEL_SORT_01", enabled: true, locked: false }
    ],
    sony_trinitron: [
      { category: "texture", effectId: "CRT_SCANLINES_01", enabled: true, locked: true },
      { category: "time", effectId: "SLOW_SHUTTER_01", enabled: true, locked: false },
      { category: "optics", effectId: "RGB_SPLIT_01", enabled: true, locked: false },
      { category: "texture", effectId: "FILM_GRIME_01", enabled: true, locked: false },
      { category: "time", effectId: "FPS_12", enabled: true, locked: false },
      { category: "optics", effectId: "VIGNETTE_01", enabled: true, locked: false }
    ],
    acid_thermal: [
      { category: "color", effectId: "THERMAL_01", enabled: true, locked: false },
      { category: "distort", effectId: "TURB_DISP_02", enabled: true, locked: false },
      { category: "texture", effectId: "PAPER_CUTS_01", enabled: true, locked: false },
      { category: "motion", effectId: "SHAKE_01", enabled: true, locked: false },
      { category: "time", effectId: "FPS_08", enabled: true, locked: false },
      { category: "optics", effectId: "HALATION_02", enabled: true, locked: false }
    ],
    paper_stopmotion: [
      { category: "time", effectId: "FPS_12", enabled: true, locked: true },
      { category: "texture", effectId: "PAPER_CUTS_02", enabled: true, locked: true },
      { category: "color", effectId: "THRESHOLD_01", enabled: true, locked: false },
      { category: "texture", effectId: "FILM_GRIME_01", enabled: true, locked: false },
      { category: "texture", effectId: "HALFTONE_01", enabled: true, locked: false },
      { category: "motion", effectId: "SHAKE_01", enabled: true, locked: false }
    ],
    clean_street: [
      { category: "motion", effectId: "SHAKE_03", enabled: true, locked: false },
      { category: "optics", effectId: "HALATION_01", enabled: true, locked: false },
      { category: "color", effectId: "OSKAR_CC_01", enabled: true, locked: false },
      { category: "motion", effectId: "INERTIA_01", enabled: true, locked: false },
      { category: "time", effectId: "FPS_12", enabled: true, locked: true },
      { category: "optics", effectId: "VIGNETTE_01", enabled: true, locked: false }
    ],
    flir_heatmap: [
      { category: "color", effectId: "HEATMAP_FLIR_01", enabled: true, locked: true },
      { category: "optics", effectId: "FLIR_OVERLAY_01", enabled: true, locked: true },
      { category: "time", effectId: "FPS_12", enabled: true, locked: false },
      { category: "texture", effectId: "PAPER_CUTS_02", enabled: true, locked: false },
      { category: "motion", effectId: "SHAKE_01", enabled: true, locked: false },
      { category: "texture", effectId: "FILM_GRIME_01", enabled: true, locked: false }
    ]
  };

  // Current active slots state
  let currentSlots = JSON.parse(JSON.stringify(CURATED_PRESETS.opium_minimalist));

  // ─── DOM ELEMENTS ──────────────────────────────────────────────────────────
  const slotsContainer = document.getElementById("slotsContainer");
  const btnAddSlot = document.getElementById("btnAddSlot");
  const btnShuffle = document.getElementById("btnShuffle");
  const btnApply = document.getElementById("btnApply");
  const btnClear = document.getElementById("btnClear");
  const presetSelect = document.getElementById("presetSelect");
  const btnSavePreset = document.getElementById("btnSavePreset");
  const targetLayerInfo = document.getElementById("targetLayerInfo");
  const fxCountInfo = document.getElementById("fxCountInfo");
  const statusText = document.getElementById("statusText");

  const saveModal = document.getElementById("saveModal");
  const presetNameInput = document.getElementById("presetNameInput");
  const btnCancelModal = document.getElementById("btnCancelModal");
  const btnConfirmSave = document.getElementById("btnConfirmSave");

  // ─── RENDER SLOTS ──────────────────────────────────────────────────────────
  function renderSlots() {
    slotsContainer.innerHTML = "";

    currentSlots.forEach((slot, index) => {
      const card = document.createElement("div");
      card.className = `slot-card ${slot.locked ? "locked" : ""} ${!slot.enabled ? "bypassed" : ""}`;
      card.dataset.index = index;

      // 1. Bypass Toggle Dot
      const toggleBtn = document.createElement("button");
      toggleBtn.className = `slot-toggle ${slot.enabled ? "active" : ""}`;
      toggleBtn.title = slot.enabled ? "Bypass Effect" : "Enable Effect";
      toggleBtn.addEventListener("click", () => {
        slot.enabled = !slot.enabled;
        renderSlots();
      });

      // 2. Body: Index + Dropdown
      const body = document.createElement("div");
      body.className = "slot-body";

      const idxLabel = document.createElement("span");
      idxLabel.className = "slot-index";
      idxLabel.textContent = (index + 1) + ".";

      const dropdown = document.createElement("select");
      dropdown.className = "slot-dropdown";

      // Group options by category
      CATEGORY_KEYS.forEach(cat => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = cat.toUpperCase();
        FX_DATABASE[cat].forEach(fx => {
          const opt = document.createElement("option");
          opt.value = `${cat}::${fx.id}`;
          opt.textContent = fx.label;
          if (slot.category === cat && slot.effectId === fx.id) {
            opt.selected = true;
          }
          optgroup.appendChild(opt);
        });
        dropdown.appendChild(optgroup);
      });

      dropdown.addEventListener("change", (e) => {
        const [cat, fxId] = e.target.value.split("::");
        slot.category = cat;
        slot.effectId = fxId;
        updateStatusLabels();
      });

      body.appendChild(idxLabel);
      body.appendChild(dropdown);

      // 3. Actions: Lock & Remove
      const actions = document.createElement("div");
      actions.className = "slot-actions";

      const lockBtn = document.createElement("button");
      lockBtn.className = `btn-slot-lock ${slot.locked ? "is-locked" : ""}`;
      lockBtn.title = slot.locked ? "Slot Locked (Immune to Shuffle)" : "Slot Unlocked";
      lockBtn.textContent = slot.locked ? "🔒" : "🔓";
      lockBtn.addEventListener("click", () => {
        slot.locked = !slot.locked;
        renderSlots();
      });

      const delBtn = document.createElement("button");
      delBtn.className = "btn-slot-del";
      delBtn.title = "Delete Slot";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => {
        currentSlots.splice(index, 1);
        renderSlots();
      });

      actions.appendChild(lockBtn);
      actions.appendChild(delBtn);

      card.appendChild(toggleBtn);
      card.appendChild(body);
      card.appendChild(actions);

      slotsContainer.appendChild(card);
    });

    // Add button visibility (max 8 slots)
    btnAddSlot.style.display = currentSlots.length < 8 ? "flex" : "none";
    updateStatusLabels();
  }

  // ─── ADD SLOT ──────────────────────────────────────────────────────────────
  btnAddSlot.addEventListener("click", () => {
    if (currentSlots.length >= 8) return;
    const fallbackCat = CATEGORY_KEYS[currentSlots.length % CATEGORY_KEYS.length];
    const fallbackFx = FX_DATABASE[fallbackCat][0];
    currentSlots.push({
      category: fallbackCat,
      effectId: fallbackFx.id,
      enabled: true,
      locked: false
    });
    renderSlots();
  });

  // ─── SHUFFLE ENGINE ────────────────────────────────────────────────────────
  function shuffleUnlockedSlots() {
    const cards = slotsContainer.querySelectorAll(".slot-card");

    currentSlots.forEach((slot, i) => {
      if (!slot.locked) {
        // Flash animation
        if (cards[i]) {
          cards[i].classList.remove("shuffling");
          void cards[i].offsetWidth; // trigger reflow
          cards[i].classList.add("shuffling");
        }

        // Pick a random category or keep balanced
        const cat = CATEGORY_KEYS[Math.floor(Math.random() * CATEGORY_KEYS.length)];
        const pool = FX_DATABASE[cat];
        const randomFx = pool[Math.floor(Math.random() * pool.length)];

        slot.category = cat;
        slot.effectId = randomFx.id;
      }
    });

    renderSlots();
    // Re-apply shuffle flash on fresh elements
    const newCards = slotsContainer.querySelectorAll(".slot-card");
    currentSlots.forEach((slot, i) => {
      if (!slot.locked && newCards[i]) {
        newCards[i].classList.add("shuffling");
      }
    });
  }

  btnShuffle.addEventListener("click", () => {
    shuffleUnlockedSlots();
  });

  // ─── CLEAR ALL SLOTS ───────────────────────────────────────────────────────
  btnClear.addEventListener("click", () => {
    currentSlots = [];
    renderSlots();
    csInterface.evalScript("MillyHost.clearMillyFX()", () => {
      updateStatusLabels();
    });
  });

  // ─── APPLY EFFECT STACK ────────────────────────────────────────────────────
  btnApply.addEventListener("click", () => {
    btnApply.style.transform = "scale(0.92)";
    setTimeout(() => { btnApply.style.transform = ""; }, 150);

    const payload = JSON.stringify(currentSlots);
    const script = `MillyHost.applyStack(${JSON.stringify(payload)})`;

    csInterface.evalScript(script, (result) => {
      try {
        const res = JSON.parse(result);
        if (res.ok) {
          flashStatus(`APPLIED ${res.appliedCount} FX TO ${res.layerName.toUpperCase()}`);
        } else {
          flashStatus(res.error || "ERROR APPLYING", true);
        }
      } catch(e) {
        flashStatus("APPLIED", false);
      }
    });
  });

  // ─── PRESET MANAGEMENT ─────────────────────────────────────────────────────
  presetSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (CURATED_PRESETS[val]) {
      currentSlots = JSON.parse(JSON.stringify(CURATED_PRESETS[val]));
      renderSlots();
      flashStatus(`LOADED: ${val.toUpperCase().replace(/_/g, " ")}`);
    } else {
      // Check user saved presets
      const userPresets = getUserPresets();
      if (userPresets[val]) {
        currentSlots = JSON.parse(JSON.stringify(userPresets[val]));
        renderSlots();
        flashStatus(`LOADED: ${val.toUpperCase()}`);
      }
    }
  });

  btnSavePreset.addEventListener("click", () => {
    presetNameInput.value = "LOOK_" + Math.floor(Math.random() * 900 + 100);
    saveModal.classList.add("open");
    presetNameInput.focus();
  });

  btnCancelModal.addEventListener("click", () => {
    saveModal.classList.remove("open");
  });

  btnConfirmSave.addEventListener("click", () => {
    const name = presetNameInput.value.trim().toUpperCase().replace(/\s+/g, "_");
    if (!name) return;
    const userPresets = getUserPresets();
    userPresets[name] = JSON.parse(JSON.stringify(currentSlots));
    localStorage.setItem("milly_fx_user_presets", JSON.stringify(userPresets));
    populatePresetDropdown();
    presetSelect.value = name;
    saveModal.classList.remove("open");
    flashStatus(`SAVED: ${name}`);
  });

  function getUserPresets() {
    try {
      return JSON.parse(localStorage.getItem("milly_fx_user_presets")) || {};
    } catch(e) {
      return {};
    }
  }

  function populatePresetDropdown() {
    // Keep curated options, append user options
    const userPresets = getUserPresets();
    const existingUserGroup = document.getElementById("userPresetsGroup");
    if (existingUserGroup) existingUserGroup.remove();

    const keys = Object.keys(userPresets);
    if (keys.length > 0) {
      const group = document.createElement("optgroup");
      group.id = "userPresetsGroup";
      group.label = "USER PRESETS";
      keys.forEach(k => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = "⭐ " + k;
        group.appendChild(opt);
      });
      presetSelect.appendChild(group);
    }
  }

  // ─── STATUS & AE SYNC ──────────────────────────────────────────────────────
  function updateStatusLabels() {
    const activeCount = currentSlots.filter(s => s.enabled).length;
    fxCountInfo.textContent = `${activeCount} FX ACTIVE`;
  }

  function flashStatus(msg, isError = false) {
    statusText.textContent = msg;
    statusText.style.color = isError ? "var(--danger)" : "var(--accent-lime)";
    setTimeout(() => {
      pollAEStatus();
    }, 2800);
  }

  function pollAEStatus() {
    csInterface.evalScript("MillyHost.getStatus()", (result) => {
      try {
        const res = JSON.parse(result);
        if (res.ok) {
          targetLayerInfo.textContent = res.layerName || "No Layer Selected";
          statusText.textContent = "ONLINE";
          statusText.style.color = "var(--accent-lime)";
        } else {
          targetLayerInfo.textContent = "No Comp";
          statusText.textContent = "NO COMP";
          statusText.style.color = "var(--text-muted)";
        }
      } catch(e) {
        targetLayerInfo.textContent = "Dev Mode";
      }
    });
  }

  // ─── INITIALIZATION ────────────────────────────────────────────────────────
  populatePresetDropdown();
  renderSlots();
  pollAEStatus();
  setInterval(pollAEStatus, 4000);

})();
