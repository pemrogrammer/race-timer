import getSettings from "./get-settings";
import {
    pauseBgm,
    playBgm,
    playSfx,
    resumeBgm,
    toggleBgm,
    toggleSfx,
} from "./sound-controller";

let isTimerRunning: boolean;

let timerState: "init" | "preparation" | "idle" | "race" | "finish";

let remainTime: number | undefined;
let elapsedTime: number | undefined;
let teamTimes: {
    a: number[];
    b: number[];
};

let theInterval: number;

/**
 * waktu hitung mundur di-set di sini dalam mili-detik
 *
 * @example prepDurationMs = 5*1000 // = 5 detik
 */
let prepDurationMs: number;

/**
 * waktu hitung maju di-set di sini dalam mili-detik
 *
 * @example raceDurationMs = 5*1000 // = 5 detik
 */
let raceDurationMs: number;

/**
 * Initialize stopwatch state and load audio elements
 *
 * This function must be called before calling any other stopwatch functions
 *
 * @throws {Error} if any of the audio elements are not found
 */
export function init() {
    initVarState();

    const { prep_time, race_duration } = getSettings();
    prepDurationMs = prep_time * 1000;
    raceDurationMs = race_duration * 1000;

    toDisplayHtml(msToArrTime(prepDurationMs));
    printAllLaps();
}

/**
 * Initializes all state variables to their default values.
 * This function is called at the beginning of the program to reset all state variables.
 */
const initVarState = () => {
    isTimerRunning = false;

    remainTime = undefined;
    elapsedTime = undefined;

    teamTimes = {
        a: [],
        b: [],
    };

    timerState = "init";
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
    if (timerState === "idle") return; // can not press key when idle

    switch (e.keyCode) {
        case 65: //65 = a => untuk TIM A
            checkpointTeam("a");
            break;

        case 66: // b => untuk TIM B
            checkpointTeam("b");
            break;

        case 32: // == Spasi
            handleSpacePressed();
            break;

        case 79: // == o
            toggleSfx();
            break;

        case 80: // == p
            toggleBgm();
            break;

        case 82: //82 = R = reset
            resetTimer();
            break;
    }
}

const handleSpacePressed = (): void => {
    if (timerState === "finish") return;

    if (isTimerRunning) {
        pauseTimer();

        return;
    }

    isTimerRunning = true;

    if (timerState === "race") {
        resumeRace();
        return;
    }

    if (timerState === "preparation") {
        resumePreparation();
        return;
    }

    if (timerState !== "init") {
        throw new Error("Invalid timer state");
    }

    startPreparation();
};

const startPreparation = () => {
    if (timerState !== "init") return;

    playBgm();
    timerState = "preparation";

    const preparationTimeShouldFinishOn = Date.now() + prepDurationMs;

    theInterval = setInterval(
        () => prepInterval(preparationTimeShouldFinishOn),
        10,
    );
};

const resumePreparation = () => {
    if (timerState !== "preparation") return;

    resumeBgm();
    const preparationTimeShouldFinishOn = Date.now() + (remainTime ?? 0);

    theInterval = setInterval(
        () => prepInterval(preparationTimeShouldFinishOn),
        10,
    );
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
const startRace = () => {
    if (timerState !== "preparation") return;

    timerState = "idle";

    const modeEl = document.getElementById("mode");

    if (!modeEl) throw new Error("mode element not found");

    modeEl.innerHTML = "";

    pauseBgm();
    playSfx("readySet");

    /**
     * ready-set is the duration of the prepare audio
     */
    const readySetSfxDuration = 6989; // milliseconds

    setTimeout(() => {
        playSfx("go");
        playBgm();

        timerState = "race";
        const beginTime = Date.now();

        theInterval = setInterval(() => raceInterval(beginTime), 10);
    }, readySetSfxDuration);
};

const resumeRace = () => {
    if (timerState !== "race") return;

    const beginTime = Date.now() - (elapsedTime ?? 0);

    theInterval = setInterval(() => raceInterval(beginTime), 10);
    resumeBgm();
};

const pauseTimer = () => {
    isTimerRunning = false;
    clearInterval(theInterval);
    pauseBgm();
};

const resetTimer = () => {
    if (isTimerRunning) return; // cannot reset when timer is running

    pauseBgm();

    clearInterval(theInterval);
    initVarState();
    toDisplayHtml(msToArrTime(prepDurationMs));
    printAllLaps();
};

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
const printAllLaps = () => {
    const aTimeLap = document.getElementById("aTimeLap");
    const midLapNo = document.getElementById("midLapNo");
    const bTimeLap = document.getElementById("bTimeLap");

    if (!aTimeLap || !midLapNo || !bTimeLap) {
        throw new Error("display element not found");
    }

    aTimeLap.innerHTML = "";
    midLapNo.innerHTML = "";
    bTimeLap.innerHTML = "";

    for (let i = 0; i < getSettings().nLap; i++) {
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
 * and call the startRace function.
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
        startRace();
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

    if (elapsedTime >= raceDurationMs) {
        playSfx("timesUp");
        pauseBgm();

        toDisplayHtml(msToArrTime(raceDurationMs));
        clearInterval(theInterval);
        isTimerRunning = false;
        timerState = "finish";
    }
};

/**
 * Function to check if both teams have reached the finish line.
 */
const teamReachFinish = () => {
    playSfx("applause");

    const { nLap } = getSettings();

    const isBothFinished =
        teamTimes.a.length === nLap && teamTimes.b.length === nLap;

    if (isBothFinished) {
        pauseBgm();
        playSfx("finished");
        clearInterval(theInterval);
        isTimerRunning = false;
        timerState = "finish";
    }
};

/**
 * Play the checkpoint audio and save the current lap time to the specified team.
 * If the team has finished all laps, call teamReachFinish.
 * @param {teamName} teamName - The team name.
 * @throws {Error} If elapsedTime is undefined.
 */
const checkpointTeam = (teamName: "a" | "b"): void => {
    if (
        teamTimes[teamName].length === getSettings().nLap ||
        timerState !== "race" ||
        !isTimerRunning
    ) {
        return;
    }

    playSfx("checkpoint");

    if (elapsedTime === undefined) throw new Error("elapsedTime is undefined");

    teamTimes[teamName].push(elapsedTime);
    printAllLaps();

    if (teamTimes[teamName].length === getSettings().nLap) {
        teamReachFinish();
    }
};

/**
 * Updates the HTML elements with the given formatted time.
 *
 * @param {string[]} formattedTime - An array of three strings containing the minutes, seconds, and milliseconds respectively.
 * @throws {Error} If the HTML elements with the IDs "timeDisplay" and "timeDisplayMs" are not found.
 */
const toDisplayHtml = (formattedTime: string[]) => {
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
const msToArrTime = (nMs: number): string[] => {
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
