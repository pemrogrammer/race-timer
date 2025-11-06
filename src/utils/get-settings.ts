import DEFAULT_SETTINGS from "../statics/default-settings";
import SETTINGS_LS_KEY from "../statics/settings-ls-key";

/**
 * Get current settings from local storage.
 * If local storage is undefined, return default settings.
 * If settings are not found in local storage, save default settings and return them.
 * Otherwise, parse the settings from local storage and return them.
 *
 * @returns {typeof DEFAULT_SETTINGS} current settings
 */
export default function getSettings(): typeof DEFAULT_SETTINGS {
    if (typeof localStorage === "undefined") {
        return DEFAULT_SETTINGS;
    }

    document.title = DEFAULT_SETTINGS.compName;

    const storage = localStorage.getItem(SETTINGS_LS_KEY);

    if (!storage) {
        localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
    }

    const settings = JSON.parse(storage);

    document.title = settings.compName;

    return settings;
}
