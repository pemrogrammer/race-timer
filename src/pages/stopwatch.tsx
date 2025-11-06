"use client";

import { useEffect, useState } from "react";
import type DEFAULT_SETTINGS from "../statics/default-settings";
import getSettings from "../utils/get-settings";

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

            <div className="bg-image2" id="bg-image2"></div>

            <div id="StopWatchPage" className="container">
                <p id="mode" className="mode">
                    PREPARATION TIME
                </p>

                <div id="pagar" className="timer">
                    <div id="disp"></div>
                    <div className="ms" id="dispMs"></div>
                </div>

                <div
                    style={{
                        clear: "both",
                    }}
                ></div>

                <div className="box-container">
                    <div className="box-team">
                        <p className="red-colored team-name">
                            {settings?.team_a_name}
                        </p>
                    </div>

                    <div id="midText" className="">
                        {settings?.midText}
                    </div>

                    <div className="box-team">
                        <p className="blue-colored team-name">
                            {settings?.team_b_name}
                        </p>
                    </div>
                </div>

                <div className="laps-container">
                    <div id="aTimeLap" className="time-lap"></div>
                    <div id="midLapNo" className="laps-no"></div>
                    <div id="bTimeLap" className="time-lap"></div>
                </div>
            </div>
        </>
    );
}
