"use client";

import { useEffect, useState } from "react";
import Audios from "../components/audios.js";
import type DEFAULT_SETTINGS from "../statics/default-settings";
import {
    checkPressedKey,
    init,
    msToArrTime,
    printAllLaps,
    toDisplayHtml,
} from "../utils/core.js";
import getSettings from "../utils/get-settings";
import styles from "./stopwatch.module.css";

export default function Stopwatch() {
    const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS>();

    useEffect(() => {
        init();
        const settings = getSettings();

        setSettings(settings);

        toDisplayHtml(msToArrTime(settings.prep_time * 1000));

        printAllLaps();

        document.addEventListener("keydown", checkPressedKey);

        return () => {
            document.removeEventListener("keydown", checkPressedKey);
        };
    }, []);

    return (
        <div
            className={[styles.pageContainer, "container", "bg", "img2"].join(
                " ",
            )}
        >
            <p id="mode">PREPARATION TIME</p>

            <div className={styles.timer}>
                <div id="timeDisplay" className={styles.bigNumber}></div>
                <div id="timeDisplayMs" className={styles.smallNumber}></div>
            </div>

            <div
                style={{
                    clear: "both",
                }}
            ></div>

            <div className={styles.boxContainer}>
                <div className={styles.boxTeam}>
                    <p className={[styles.teamName, styles.redColor].join(" ")}>
                        {settings?.team_a_name}
                    </p>
                </div>

                <div id="midText">{settings?.midText}</div>

                <div className={styles.boxTeam}>
                    <p
                        className={[styles.teamName, styles.blueColor].join(
                            " ",
                        )}
                    >
                        {settings?.team_b_name}
                    </p>
                </div>
            </div>

            <div className={styles.lapsContainer}>
                <div id="aTimeLap" className={styles.timeLap}></div>
                <div id="midLapNo" className={styles.midLapNo}></div>
                <div id="bTimeLap" className={styles.timeLap}></div>
            </div>

            <Audios />
        </div>
    );
}
