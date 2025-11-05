export default function Stopwatch() {
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

            {/* <!-- DISPLAY PAGE--> */}
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
                        <p
                            id="team_a_name"
                            className="red-colored team-name"
                        ></p>
                    </div>

                    <div id="midText" className=""></div>

                    <div className="box-team">
                        <p
                            id="team_b_name"
                            className="blue-colored team-name"
                        ></p>
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
