"use client";

import { useEffect, useState } from "react";
import Audios from "../components/audios.js";
import type DEFAULT_SETTINGS from "../statics/default-settings";
import { checkPressedKey, init } from "../utils/core.js";
import getSettings from "../utils/get-settings";
import styles from "./stopwatch.module.css";

export default function Stopwatch() {
    const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS>();

    useEffect(() => {
        init();

        setSettings(getSettings());

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
                <div className={styles.bigNumber} id="timeDisplay"></div>
                <div className={styles.smallNumber} id="timeDisplayMs"></div>
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
                <div className={styles.timeLap} id="aTimeLap"></div>
                <div className={styles.midLapNo} id="midLapNo"></div>
                <div className={styles.timeLap} id="bTimeLap"></div>
            </div>

            <Audios />
        </div>
    );
}
