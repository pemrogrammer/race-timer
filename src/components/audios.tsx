import applauseAudio from "../assets/sounds/applause.mp3";
import mainThemeAudio from "../assets/sounds/main-theme.mp3";
import prepareAudio from "../assets/sounds/prepare.mp3";
import checkpointAudio from "../assets/sounds/smb_1-up.wav";
import raceEndAudio from "../assets/sounds/smb_stage_clear.wav";
import startAudio from "../assets/sounds/start.mp3";
import timesUpAudio from "../assets/sounds/times_up.mp3";

export default function Audios() {
    return (
        <>
            <audio src={mainThemeAudio} id="mainThemeAudio" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={applauseAudio} id="applauseAudio" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={prepareAudio} id="prepare" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={raceEndAudio} id="raceEndAudio" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={checkpointAudio} id="checkpointSound" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={startAudio} id="start" preload="auto">
                <track kind="captions" />
            </audio>

            <audio src={timesUpAudio} id="timesUpAudio" preload="auto">
                <track kind="captions" />
            </audio>
        </>
    );
}
