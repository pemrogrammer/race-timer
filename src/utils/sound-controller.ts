import type { RefObject } from "react";
import getSettings from "./get-settings";
import saveSettings from "./save-settings";

let soundElementRefs: {
    /**
     * background music when the timer is running
     */
    bgm: RefObject<HTMLAudioElement>;

    soundEffects: {
        /**
         * sound effect that plays when a team reaches the finish line
         */
        applause: RefObject<HTMLAudioElement>;

        /**
         * sound effect that plays when a team passes a checkpoint
         */
        checkpoint: RefObject<HTMLAudioElement>;

        /**
         * sound effect that plays when both teams reach the finish line
         */
        finished: RefObject<HTMLAudioElement>;

        /**
         * sound effect that plays when the race times up
         */
        timesUp: RefObject<HTMLAudioElement>;

        /**
         * sound effect that plays when the race is about to start (idle state)
         */
        readySet: RefObject<HTMLAudioElement>;

        /**
         * sound effect that plays when the race starts (after the ready-set audio)
         */
        go: RefObject<HTMLAudioElement>;
    };
};

export const init = ({
    bgm,

    soundEffects: { applause, checkpoint, finished, timesUp, readySet, go },
}: {
    bgm: RefObject<HTMLAudioElement | null>;

    soundEffects: {
        [key in keyof typeof soundElementRefs.soundEffects]: RefObject<HTMLAudioElement | null>;
    };
}): void => {
    if (
        !applause.current ||
        !bgm.current ||
        !checkpoint.current ||
        !finished.current ||
        !go.current ||
        !readySet.current ||
        !timesUp.current
    ) {
        throw new Error("audio element not found");
    }

    bgm.current.loop = true;
    applause.current.volume = 0.5;

    const { isBgmEnabled, isSfxEnabled } = getSettings();
    bgm.current.muted = !isBgmEnabled;
    applause.current.muted = !isSfxEnabled;
    checkpoint.current.muted = !isSfxEnabled;
    finished.current.muted = !isSfxEnabled;
    timesUp.current.muted = !isSfxEnabled;
    go.current.muted = !isSfxEnabled;
    applause.current.muted = !isSfxEnabled;
    readySet.current.muted = !isSfxEnabled;

    soundElementRefs = {
        bgm: bgm as RefObject<HTMLAudioElement>,

        soundEffects: {
            applause: applause as RefObject<HTMLAudioElement>,
            checkpoint: checkpoint as RefObject<HTMLAudioElement>,
            finished: finished as RefObject<HTMLAudioElement>,
            go: go as RefObject<HTMLAudioElement>,
            readySet: readySet as RefObject<HTMLAudioElement>,
            timesUp: timesUp as RefObject<HTMLAudioElement>,
        },
    };
};

/**
 * Toggle background music on/off
 */
export const toggleBgm = (): void => {
    const { isBgmEnabled } = getSettings();

    saveSettings({ isBgmEnabled: isBgmEnabled });

    soundElementRefs.bgm.current.muted = !isBgmEnabled;
};

/**
 * Toggle SFX (sound effects) on/off
 */
export const toggleSfx = (): void => {
    const { isSfxEnabled } = getSettings();
    saveSettings({ isSfxEnabled: isSfxEnabled });

    const { checkpoint, finished, timesUp, readySet, go, applause } =
        soundElementRefs.soundEffects;

    applause.current.muted = !isSfxEnabled;
    checkpoint.current.muted = !isSfxEnabled;
    finished.current.muted = !isSfxEnabled;
    go.current.muted = !isSfxEnabled;
    readySet.current.muted = !isSfxEnabled;
    timesUp.current.muted = !isSfxEnabled;
};

/**
 * Play the background music from the beginning
 */
export const playBgm = (): void => {
    const { bgm } = soundElementRefs;

    bgm.current.pause();
    bgm.current.currentTime = 0;
    bgm.current.play();
};

/**
 * Pause the background music
 */
export const pauseBgm = (): void => {
    soundElementRefs.bgm.current.pause();
};

/**
 * Resume the background music
 */
export const resumeBgm = (): void => {
    soundElementRefs.bgm.current.play();
};

/**
 * Play a sound effect
 * @param {string} sfxName - The name of the sound effect
 */
export const playSfx = (
    sfxName: keyof typeof soundElementRefs.soundEffects,
): void => {
    const { soundEffects } = soundElementRefs;
    const sfx = soundEffects[sfxName];

    sfx.current.pause();
    sfx.current.currentTime = 0;
    sfx.current.play();
};
