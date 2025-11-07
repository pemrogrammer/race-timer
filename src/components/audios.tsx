import { useEffect, useRef } from "react";
import applause from "../assets/sounds/applause.mp3";
import bgm from "../assets/sounds/main-theme.mp3";
import readySet from "../assets/sounds/prepare.mp3";
import checkpoint from "../assets/sounds/smb_1-up.wav";
import finished from "../assets/sounds/smb_stage_clear.wav";
import go from "../assets/sounds/start.mp3";
import timesUp from "../assets/sounds/times_up.mp3";
import { init } from "../utils/sound-controller";

export default function Audios() {
    const applauseElement = useRef<HTMLAudioElement>(null);
    const bgmElement = useRef<HTMLAudioElement>(null);
    const checkpointElement = useRef<HTMLAudioElement>(null);
    const finishedElement = useRef<HTMLAudioElement>(null);
    const goElement = useRef<HTMLAudioElement>(null);
    const readySetElement = useRef<HTMLAudioElement>(null);
    const timesUpElement = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        init({
            bgm: bgmElement,
            soundEffects: {
                applause: applauseElement,
                checkpoint: checkpointElement,
                finished: finishedElement,
                go: goElement,
                readySet: readySetElement,
                timesUp: timesUpElement,
            },
        });
    }, []);

    return (
        <>
            <audio preload="auto" ref={applauseElement} src={applause}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={bgmElement} src={bgm}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={checkpointElement} src={checkpoint}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={finishedElement} src={finished}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={goElement} src={go}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={readySetElement} src={readySet}>
                <track kind="captions" />
            </audio>

            <audio preload="auto" ref={timesUpElement} src={timesUp}>
                <track kind="captions" />
            </audio>
        </>
    );
}
