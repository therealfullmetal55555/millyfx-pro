// Minimal, bulletproof CSInterface for MillyFX Pro CEP Panel
function CSInterface() {}

CSInterface.prototype.evalScript = function(script, callback) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.evalScript(script, function(result) {
            if (callback) callback(result === "undefined" ? "" : result);
        });
    } else {
        console.log("[Dev Mode Eval]:", script);
        if (callback) {
            // Simulated response in browser preview
            callback(JSON.stringify({ ok: true, dev: true, layerName: "DEV_PREVIEW_LAYER" }));
        }
    }
};

CSInterface.prototype.getHostEnvironment = function() {
    return window.__adobe_cep__ ? JSON.parse(window.__adobe_cep__.getHostEnvironment()) : {};
};

CSInterface.prototype.close = function() {
    if (window.__adobe_cep__) window.__adobe_cep__.closeExtension();
};
