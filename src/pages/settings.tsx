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
        <div className="container bg img4">
            <p className="page-title">Setting</p>

            <div className={styles.form}>
                <label htmlFor="compNameInput">Competition Name</label>
                <input
                    defaultValue={settings?.compName}
                    id="compNameInput"
                    placeholder="Competition Name"
                    type="text"
                />

                <label htmlFor="race_duration">Race Duration (sec)</label>
                <input
                    defaultValue={settings?.race_duration}
                    id="race_duration"
                    placeholder="seconds"
                    type="number"
                />

                <label htmlFor="prep_time">Preparation Duration (sec)</label>
                <input
                    defaultValue={settings?.prep_time}
                    id="prep_time"
                    placeholder="seconds"
                    type="number"
                />

                <label htmlFor="a_team_input">A Team</label>
                <input
                    defaultValue={settings?.team_a_name}
                    id="a_team_input"
                    placeholder="Team Name"
                    type="text"
                />

                <label htmlFor="b_team_input">B Team</label>
                <input
                    defaultValue={settings?.team_b_name}
                    id="b_team_input"
                    placeholder="Team Name"
                    type="text"
                />

                <label htmlFor="midTextInput">Middle Text</label>
                <input
                    defaultValue={settings?.midText}
                    id="midTextInput"
                    placeholder="Middle Text"
                    type="text"
                />

                <label htmlFor="nLapInput">Number of Lap</label>
                <input
                    defaultValue={settings?.nLap}
                    id="nLapInput"
                    min="1"
                    placeholder="Number of Lap"
                    type="number"
                />

                <div className={styles.buttonContainer}>
                    <button onClick={handleReset} type="button">
                        Reset to default
                    </button>

                    <button onClick={handleSave} type="button">
                        Save
                    </button>
                </div>
            </div>
        </div>
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
        midText: midTextInput.value,
        nLap: Number(nLapInput.value),
        prep_time: Number(prep_time.value),
        race_duration: Number(race_duration.value),
        team_a_name: a_team_input.value,
        team_b_name: b_team_input.value,
    };

    saveSettings(newSettings);
};
