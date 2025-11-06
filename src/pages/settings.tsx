"use client";

import { useEffect, useState } from "react";
import DEFAULT_SETTINGS from "../statics/default-settings";
import SETTINGS_LS_KEY from "../statics/settings-ls-key";
import getSettings from "../utils/get-settings";
import saveSettings from "../utils/save-settings";
import styles from "./settings.module.css";

export default function Settings() {
    const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS>();

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    return (
        <>
            <div className="bg img4"></div>

            <div className="container">
                <p className="page-title">Setting</p>

                <div className={styles.form}>
                    <label htmlFor="compNameInput">Competition Name</label>
                    <input
                        type="text"
                        id="compNameInput"
                        placeholder="Competition Name"
                        defaultValue={settings?.compName}
                    />

                    <label htmlFor="race_duration">Race Duration (sec)</label>
                    <input
                        type="number"
                        id="race_duration"
                        placeholder="seconds"
                        defaultValue={settings?.race_duration}
                    />

                    <label htmlFor="prep_time">
                        Preparation Duration (sec)
                    </label>
                    <input
                        type="number"
                        id="prep_time"
                        placeholder="seconds"
                        defaultValue={settings?.prep_time}
                    />

                    <label htmlFor="a_team_input">A Team</label>
                    <input
                        type="text"
                        id="a_team_input"
                        placeholder="Team Name"
                        defaultValue={settings?.team_a_name}
                    />

                    <label htmlFor="b_team_input">B Team</label>
                    <input
                        type="text"
                        id="b_team_input"
                        placeholder="Team Name"
                        defaultValue={settings?.team_b_name}
                    />

                    <label htmlFor="midTextInput">Middle Text</label>
                    <input
                        type="text"
                        id="midTextInput"
                        placeholder="Middle Text"
                        defaultValue={settings?.midText}
                    />

                    <label htmlFor="nLapInput">Number of Lap</label>
                    <input
                        type="number"
                        min="1"
                        id="nLapInput"
                        placeholder="Number of Lap"
                        defaultValue={settings?.nLap}
                    />

                    <div className={styles.buttonContainer}>
                        <button type="button" onClick={handleReset}>
                            Reset to default
                        </button>

                        <button type="button" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const handleReset = () => {
    localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    location.reload();
};

const handleSave = () => {
    const compNameInput = document.getElementById(
        "compNameInput",
    ) as HTMLInputElement;
    const race_duration = document.getElementById(
        "race_duration",
    ) as HTMLInputElement;
    const prep_time = document.getElementById("prep_time") as HTMLInputElement;
    const a_team_input = document.getElementById(
        "a_team_input",
    ) as HTMLInputElement;
    const b_team_input = document.getElementById(
        "b_team_input",
    ) as HTMLInputElement;
    const nLapInput = document.getElementById("nLapInput") as HTMLInputElement;
    const midTextInput = document.getElementById(
        "midTextInput",
    ) as HTMLInputElement;

    const newSettings = {
        compName: compNameInput.value,
        race_duration: race_duration.value as unknown as number,
        prep_time: prep_time.value as unknown as number,
        team_a_name: a_team_input.value,
        team_b_name: b_team_input.value,
        nLap: nLapInput.value as unknown as number,
        midText: midTextInput.value,
    };

    saveSettings(newSettings);
};
