import type DEFAULT_SETTINGS from "../statics/default-settings";
import getSettings from "./get-settings";

/**
 * idle is the state when stopwatch is transitioning from "preparation" to "race" (countdown song playing)
 */
let isIdle: boolean;
let isTimerRunning: boolean;
let isRaceBegin: boolean;
let isPrepBegin: boolean;
let isAFinished: boolean;
let isBFinished: boolean;

let remainTime: number | undefined;
let elapsedTime: number | undefined;
let teamTimes: {
    a: number[];
    b: number[];
};

let sfx: {
    checkpoint: HTMLAudioElement;
    raceEndAudio: HTMLAudioElement;
    timesUpAudio: HTMLAudioElement;
    prepare: HTMLAudioElement;
    start: HTMLAudioElement;
    mainThemeAudio: HTMLAudioElement;
    applauseAudio: HTMLAudioElement;
};
let setting: typeof DEFAULT_SETTINGS;
let theInterval: number;

/**
 * waktu hitung mundur di-set di sini dalam mili-detik
 *
 * @example prepDuration = 5*1000 // = 5 detik
 */
let prepDuration: number;

/**
 * waktu hitung maju di-set di sini dalam mili-detik
 *
 * @example raceDuration = 5*1000 // = 5 detik
 */
let raceDuration: number;

/**
 * Initialize stopwatch state and load audio elements
 *
 * This function must be called before calling any other stopwatch functions
 *
 * @throws {Error} if any of the audio elements are not found
 */
export function init() {
    const checkpoint = document.getElementById("checkpointSound");
    const raceEndAudio = document.getElementById("raceEndAudio");
    const timesUpAudio = document.getElementById("timesUpAudio");
    const prepare = document.getElementById("prepare");
    const start = document.getElementById("start");
    const mainThemeAudio = document.getElementById("mainThemeAudio");
    const applauseAudio = document.getElementById("applauseAudio");

    if (
        !checkpoint ||
        !raceEndAudio ||
        !timesUpAudio ||
        !prepare ||
        !start ||
        !mainThemeAudio ||
        !applauseAudio
    ) {
        throw new Error("audio element not found");
    }

    sfx = {
        checkpoint: checkpoint as HTMLAudioElement,
        raceEndAudio: raceEndAudio as HTMLAudioElement,
        timesUpAudio: timesUpAudio as HTMLAudioElement,
        prepare: prepare as HTMLAudioElement,
        start: start as HTMLAudioElement,
        mainThemeAudio: mainThemeAudio as HTMLAudioElement,
        applauseAudio: applauseAudio as HTMLAudioElement,
    };

    setting = getSettings();

    prepDuration = setting.prep_time * 1000;
    raceDuration = setting.race_duration * 1000;

    initVarState();

    toggleSfx(setting.isSfxEnabled);
    toggleBgm(setting.isBgmEnabled);

    sfx.applauseAudio.volume = 0.5;
    sfx.mainThemeAudio.loop = true;
}

/**
 * Toggle background music on/off
 *
 * @param {boolean} isEnable - whether to enable background music or not
 */
const toggleBgm = (isEnable: boolean) => {
    sfx.mainThemeAudio.muted = !isEnable;
};

/**
 * Toggle SFX (sound effects) on/off
 *
 * @param {boolean} isEnable - whether to enable SFX or not
 */
const toggleSfx = (isEnable: boolean) => {
    sfx.checkpoint.muted = !isEnable;
    sfx.raceEndAudio.muted = !isEnable;
    sfx.timesUpAudio.muted = !isEnable;
    sfx.start.muted = !isEnable;
    sfx.applauseAudio.muted = !isEnable;
    sfx.prepare.muted = !isEnable;
};

/**
 * Initializes all state variables to their default values.
 * This function is called at the beginning of the program to reset all state variables.
 */
const initVarState = () => {
    isIdle = false;
    isTimerRunning = false;
    isRaceBegin = false;
    isPrepBegin = false;

    isAFinished = false;
    isBFinished = false;

    remainTime = undefined;
    elapsedTime = undefined;

    teamTimes = {
        a: [],
        b: [],
    };
};

/**
 * Checks whether a key is pressed and takes the corresponding action.
 *
 * If the space-bar key is pressed, it will start the timer if it is not already running.
 * If the "a" key is pressed, it will save the current lap time to team A.
 * If the "b" key is pressed, it will save the current lap time to team B.
 * If the "o" key is pressed, it will toggle the sound effects on/off.
 * If the "p" key is pressed, it will toggle the background music on/off.
 * If the "r" key is pressed, it will reset the timer and clear all state variables.
 *
 * @param {KeyboardEvent} e - the event object passed when a key is pressed.
 * @see https://www.theasciicode.com.ar/ for the list of key codes
 */
export function checkPressedKey(e: KeyboardEvent) {
    switch (e.keyCode) {
        case 65: //65 = a => untuk TIM A
            if (!isAFinished && isRaceBegin) {
                checkpointTeam("a");
            }
            break;

        case 66: // b => untuk TIM B
            if (!isBFinished && isRaceBegin) {
                checkpointTeam("b");
            }
            break;

        case 32: // == Spasi
            if (!isTimerRunning) {
                isTimerRunning = true;

                if (isRaceBegin) {
                    sfx.mainThemeAudio.play();

                    const beginTime = Date.now() - (elapsedTime ?? 0);

                    theInterval = setInterval(
                        () => raceInterval(beginTime),
                        10,
                    );
                } else if (isPrepBegin) {
                    sfx.mainThemeAudio.play();

                    const preparationTimeShouldFinishOn =
                        Date.now() + (remainTime ?? 0);

                    theInterval = setInterval(
                        () => prepInterval(preparationTimeShouldFinishOn),
                        10,
                    );
                } else {
                    isPrepBegin = true;

                    sfx.mainThemeAudio.play();

                    const preparationTimeShouldFinishOn =
                        Date.now() + prepDuration;

                    theInterval = setInterval(
                        () => prepInterval(preparationTimeShouldFinishOn),
                        10,
                    );
                }
            } else {
                if (!isIdle) {
                    isTimerRunning = false;
                    clearInterval(theInterval);
                    sfx.mainThemeAudio.pause();
                }
            }
            break;

        case 79: // == o
            setting.isSfxEnabled = !setting.isSfxEnabled;
            toggleSfx(!setting.isSfxEnabled);
            localStorage.setItem("krc_timer_setting", JSON.stringify(setting));
            break;

        case 80: // == p
            setting.isBgmEnabled = !setting.isBgmEnabled;
            toggleBgm(!setting.isBgmEnabled);
            localStorage.setItem("krc_timer_setting", JSON.stringify(setting));
            break;

        case 82: //82 = R
            if (!isIdle && !isTimerRunning) {
                sfx.mainThemeAudio.pause();
                sfx.mainThemeAudio.currentTime = 0;

                clearInterval(theInterval);
                initVarState();
                toDisplayHtml(msToArrTime(prepDuration));
                printAllLaps();
                break;
            }
    }
}

/**
 * printAllLaps
 *
 * Print all laps to the display.
 *
 * Will print the lap number, team A time, and team B time.
 *
 * If a team doesn't have a time for a lap, it will print "--:--".
 *
 * If a team has a faster time than the other team, it will print "<" or ">"
 * before the lap number.
 */
export const printAllLaps = () => {
    const aTimeLap = document.getElementById("aTimeLap");
    const midLapNo = document.getElementById("midLapNo");
    const bTimeLap = document.getElementById("bTimeLap");

    if (!aTimeLap || !midLapNo || !bTimeLap) {
        throw new Error("display element not found");
    }

    aTimeLap.innerHTML = "";
    midLapNo.innerHTML = "";
    bTimeLap.innerHTML = "";

    for (let i = 0; i < setting.nLap; i++) {
        if (!teamTimes.a[i] && !teamTimes.b[i]) {
            midLapNo.innerHTML += `<p>${i + 1}</p>`;
        } else if (teamTimes.a[i] && !teamTimes.b[i]) {
            midLapNo.innerHTML += `<p>&lt;&lt; ${i + 1}</p>`;
        } else if (!teamTimes.a[i] && teamTimes.b[i]) {
            midLapNo.innerHTML += `<p>${i + 1} &gt;&gt;</p>`;
        } else {
            if (teamTimes.a[i] < teamTimes.b[i]) {
                midLapNo.innerHTML += `<p>&lt;&lt; ${i + 1}</p>`;
            } else {
                midLapNo.innerHTML += `<p>${i + 1} &gt;&gt;</p>`;
            }
        }

        if (teamTimes.a[i]) {
            const aTime = msToArrTime(teamTimes.a[i]);
            aTimeLap.innerHTML += `<p>${aTime[0]}:${aTime[1]} ${aTime[2]} </p>`;
        } else {
            aTimeLap.innerHTML += "<p>--:--</p>";
        }

        if (teamTimes.b[i]) {
            const bTime = msToArrTime(teamTimes.b[i]);
            bTimeLap.innerHTML += `<p>${bTime[0]}:${bTime[1]} ${bTime[2]} </p>`;
        } else {
            bTimeLap.innerHTML += "<p>--:--</p>";
        }
    }
};

/**
 * Prep interval function.
 *
 * This function will be called every 10 ms.
 * It will calculate the remaining time for the preparation phase
 * and display it on the screen.
 * If the remaining time is less than or equal to 0, it will clear the interval
 * and call the raceStart function.
 *
 * @param {number} limitTime - The time at which the preparation phase should end.
 */
const prepInterval = (limitTime: number) => {
    const now = Date.now();
    remainTime = limitTime - now;

    toDisplayHtml(msToArrTime(remainTime));

    if (remainTime <= 0) {
        toDisplayHtml(["00", "00", "00"]);
        clearInterval(theInterval);
        raceStart();
    }
};

/**
 * Interval function for the race phase.
 *
 * This function will be called every 10 ms.
 * It will calculate the elapsed time for the race phase
 * and display it on the screen.
 * If the elapsed time is greater than or equal to the race duration,
 * it will play the times up audio, pause the main theme audio,
 * display the race duration on the screen, clear the interval,
 * and set isTimerRunning to false.
 *
 * @param {number} beginTime - The time at which the race phase started.
 */
const raceInterval = (beginTime: number) => {
    const nowTime = Date.now();
    elapsedTime = nowTime - beginTime;

    toDisplayHtml(msToArrTime(elapsedTime));

    if (elapsedTime >= raceDuration) {
        sfx.timesUpAudio.play();
        sfx.mainThemeAudio.pause();
        toDisplayHtml(msToArrTime(raceDuration));
        clearInterval(theInterval);
        isTimerRunning = false;
    }
};

/**
 * Function to start the race phase.
 *
 * This function will set isIdle to true, clear the mode element,
 * pause the main theme audio, play the prepare audio,
 * wait for 6989 ms (the duration of the prepare audio),
 * play the start audio, set the main theme audio to the beginning,
 * set the main theme audio volume to 0.4, play the main theme audio,
 * set isIdle to false, set isRaceBegin to true, get the current time,
 * and start the race interval.
 */
const raceStart = () => {
    isIdle = true;

    const modeEl = document.getElementById("mode");

    if (!modeEl) throw new Error("mode element not found");

    modeEl.innerHTML = "";

    sfx.mainThemeAudio.pause();
    sfx.prepare.play();

    setTimeout(() => {
        sfx.start.play();
        sfx.mainThemeAudio.currentTime = 0;
        sfx.mainThemeAudio.volume = 0.4;
        sfx.mainThemeAudio.play();
        isIdle = false;

        isRaceBegin = true;
        const beginTime = Date.now();

        //looping sampai elapsedTime >= raceDuration
        theInterval = setInterval(() => raceInterval(beginTime), 10);
    }, 6989); //6989ms adalah durasi dari musik prepare
};

/**
 * Set to true when the race phase has finished, and set to true the B team has finished.
 * @param {teamName} teamName - The team name.
 */
const teamReachFinish = (teamName: "a" | "b") => {
    sfx.applauseAudio.play();

    switch (teamName) {
        case "a":
            isAFinished = true;
            break;
        case "b":
            isBFinished = true;
            break;
    }

    if (isAFinished && isBFinished) {
        sfx.mainThemeAudio.pause();
        sfx.applauseAudio.pause();
        sfx.raceEndAudio.play();
        clearInterval(theInterval);
        isTimerRunning = false;
    }
};

/**
 * Play the checkpoint audio and save the current lap time to the specified team.
 * If the team has finished all laps, call teamReachFinish.
 * @param {teamName} teamName - The team name.
 * @throws {Error} If elapsedTime is undefined.
 */
const checkpointTeam = (teamName: "a" | "b") => {
    sfx.checkpoint.pause();
    sfx.checkpoint.currentTime = 0;
    sfx.checkpoint.play();

    if (elapsedTime === undefined) throw new Error("elapsedTime is undefined");

    teamTimes[teamName].push(elapsedTime);
    printAllLaps();

    if (teamTimes[teamName].length === setting.nLap) {
        teamReachFinish(teamName);
    }
};

/**
 * Updates the HTML elements with the given formatted time.
 *
 * @param {string[]} formattedTime - An array of three strings containing the minutes, seconds, and milliseconds respectively.
 * @throws {Error} If the HTML elements with the IDs "timeDisplay" and "timeDisplayMs" are not found.
 */
export const toDisplayHtml = (formattedTime: string[]) => {
    const dispEl = document.getElementById("timeDisplay");
    const displayMs = document.getElementById("timeDisplayMs");

    if (!dispEl || !displayMs) throw new Error("display element not found");

    dispEl.innerHTML = `${formattedTime[0]}:${formattedTime[1]}`;
    displayMs.innerHTML = formattedTime[2];
};

/**
 * Converts a given time in milliseconds to an array of three strings containing the minutes, seconds, and milliseconds respectively.
 * The minutes and seconds are formatted to have two digits with leading zeros if necessary, while the milliseconds are formatted to have two digits without leading zeros.
 * @param {number} nMs - The time in milliseconds.
 * @returns {string[]} An array of three strings containing the minutes, seconds, and milliseconds respectively.
 */
export const msToArrTime = (nMs: number) => {
    /**
     * fungsi ini untuk menambahkan "0" pada angka yang di bawah 10
     */
    const addPrefix = (n: number): string => {
        return n < 10 ? `0${n}` : `${n}`;
    };

    const min = Math.floor(nMs / 60000);
    const sec = Math.floor((nMs - min * 60000) / 1000);
    const ms = Math.floor((nMs - sec * 1000 - min * 60000) / 10);

    return [addPrefix(min), addPrefix(sec), addPrefix(ms)];
};
