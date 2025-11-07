import type DEFAULT_SETTINGS from "../statics/default-settings";
import SETTINGS_LS_KEY from "../statics/settings-ls-key";
import getSettings from "./get-settings";

/**
 * Save new settings to local storage.
 * If new settings are provided, they will override the current settings.
 *
 * @throws {Error} if localStorage is undefined
 */
export default function saveSettings(
    newSettings: Partial<typeof DEFAULT_SETTINGS>,
): void {
    if (typeof localStorage === "undefined")
        throw new Error("localStorage is undefined");

    const currentSettings = getSettings();

    localStorage.setItem(
        SETTINGS_LS_KEY,
        JSON.stringify({
            ...currentSettings,
            ...newSettings,
            nLap: newSettings.nLap ?? currentSettings.nLap,
            race_duration:
                newSettings.race_duration ?? currentSettings.race_duration,
            prep_time: newSettings.prep_time ?? currentSettings.prep_time,
        }),
    );
}
