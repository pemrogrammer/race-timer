"use client";

import { useEffect, useState } from "react";
import type DEFAULT_SETTINGS from "../statics/default-settings";
import getSettings from "../utils/get-settings";
import styles from "./stopwatch.module.css";

export default function Stopwatch() {
    const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS>();

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    return (
        <>
            <audio
                src="assets/sound/main-theme.mp3"
                id="mainThemeAudio"
                preload="auto"
            />
            <audio
                src="assets/sound/applause.mp3"
                id="applauseAudio"
                preload="auto"
            />
            <audio src="assets/sound/prepare.mp3" id="prepare" preload="auto" />
            <audio
                src="assets/sound/smb_stage_clear.wav"
                id="raceEndAudio"
                preload="auto"
            />
            <audio
                src="assets/sound/smb_1-up.wav"
                id="checkpointSound"
                preload="auto"
            />
            <audio src="assets/sound/start.mp3" id="start" preload="auto" />
            <audio
                src="assets/sound/times_up.mp3"
                id="timesUpAudio"
                preload="auto"
            />

            <div className="bg img2"></div>

            <div className={[styles.container, "container"].join(" ")}>
                <p id="mode">PREPARATION TIME</p>

                <div className={styles.timer}>
                    <div id="disp" className={styles.bigNumber}></div>
                    <div id="dispMs" className={styles.smallNumber}></div>
                </div>

                <div
                    style={{
                        clear: "both",
                    }}
                ></div>

                <div className={styles.boxContainer}>
                    <div className={styles.boxTeam}>
                        <p
                            className={[styles.teamName, styles.redColor].join(
                                " ",
                            )}
                        >
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
                    <div id="aTimeLap"></div>
                    <div id="midLapNo" className="laps-no"></div>
                    <div id="bTimeLap"></div>
                </div>
            </div>
        </>
    );
}
