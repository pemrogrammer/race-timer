import type { RefObject } from "react";
import packageJson from "../../package.json";
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
 * Desired preparation time in milliseconds
 */
let prepDurationMs: number;

/**
 * Desired race time in milliseconds
 */
let raceDurationMs: number;

let _elementRefs: {
    aName: RefObject<HTMLDivElement>;
    aRecord: RefObject<HTMLDivElement>;
    bName: RefObject<HTMLDivElement>;
    bRecord: RefObject<HTMLDivElement>;
    lapNo: RefObject<HTMLDivElement>;
    mainCounter: RefObject<HTMLDivElement>;
    midText: RefObject<HTMLDivElement>;
    sideCounter: RefObject<HTMLDivElement>;
    topText: RefObject<HTMLDivElement>;
};

type ElementRefsParam = {
    [key in keyof typeof _elementRefs]: RefObject<HTMLDivElement | null>;
};

/**
 * Initialize stopwatch state and elements
 */
export function init({ elementRefs }: { elementRefs: ElementRefsParam }) {
    initElements(elementRefs);
    initVarState();

    document.title = `Race Timer v${packageJson.version.split(".")[0]} — Klub Pemrograman TI POLNES`;

    const { prep_time, race_duration } = getSettings();
    prepDurationMs = prep_time * 1000;
    raceDurationMs = race_duration * 1000;

    toDisplayHtml(msToArrTime(prepDurationMs));
    printAllLaps();
}

const initElements = ({
    aName,
    aRecord,
    bName,
    bRecord,
    lapNo,
    mainCounter,
    midText,
    sideCounter,
    topText,
}: ElementRefsParam) => {
    if (
        !aName.current ||
        !aRecord.current ||
        !bName.current ||
        !bRecord.current ||
        !lapNo.current ||
        !mainCounter.current ||
        !midText.current ||
        !sideCounter.current ||
        !topText.current
    ) {
        throw new Error("elementRefs not found");
    }

    const settings = getSettings();

    midText.current.innerHTML = settings.midText;
    aName.current.innerHTML = settings.team_a_name;
    bName.current.innerHTML = settings.team_b_name;

    _elementRefs = {
        aName: aName as RefObject<HTMLDivElement>,
        aRecord: aRecord as RefObject<HTMLDivElement>,
        bName: bName as RefObject<HTMLDivElement>,
        bRecord: bRecord as RefObject<HTMLDivElement>,
        lapNo: lapNo as RefObject<HTMLDivElement>,
        mainCounter: mainCounter as RefObject<HTMLDivElement>,
        midText: midText as RefObject<HTMLDivElement>,
        sideCounter: sideCounter as RefObject<HTMLDivElement>,
        topText: topText as RefObject<HTMLDivElement>,
    };
};

/**
 * Initializes all state variables to their default values.
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
    _elementRefs.topText.current.innerHTML = "PREPARATION TIME";
};

/**
 * Checks whether a key is pressed and takes the corresponding action.
 *
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
 */
const startRace = () => {
    if (timerState !== "preparation") return;

    timerState = "idle";

    _elementRefs.topText.current.innerHTML = "";

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
 * Renders all recorded lap times for both teams into the designated DOM elements.
 */
const printAllLaps = () => {
    const { aRecord, bRecord, lapNo } = _elementRefs;

    aRecord.current.innerHTML = "";
    lapNo.current.innerHTML = "";
    bRecord.current.innerHTML = "";

    for (let i = 0; i < getSettings().nLap; i++) {
        if (!teamTimes.a[i] && !teamTimes.b[i]) {
            lapNo.current.innerHTML += `<p>${i + 1}</p>`;
        } else if (teamTimes.a[i] && !teamTimes.b[i]) {
            lapNo.current.innerHTML += `<p>&lt;&lt; ${i + 1}</p>`;
        } else if (!teamTimes.a[i] && teamTimes.b[i]) {
            lapNo.current.innerHTML += `<p>${i + 1} &gt;&gt;</p>`;
        } else {
            if (teamTimes.a[i] < teamTimes.b[i]) {
                lapNo.current.innerHTML += `<p>&lt;&lt; ${i + 1}</p>`;
            } else {
                lapNo.current.innerHTML += `<p>${i + 1} &gt;&gt;</p>`;
            }
        }

        if (teamTimes.a[i]) {
            const aTime = msToArrTime(teamTimes.a[i]);
            aRecord.current.innerHTML += `<p>${aTime[0]}:${aTime[1]} ${aTime[2]} </p>`;
        } else {
            aRecord.current.innerHTML += "<p>--:--</p>";
        }

        if (teamTimes.b[i]) {
            const bTime = msToArrTime(teamTimes.b[i]);
            bRecord.current.innerHTML += `<p>${bTime[0]}:${bTime[1]} ${bTime[2]} </p>`;
        } else {
            bRecord.current.innerHTML += "<p>--:--</p>";
        }
    }
};

/**
 * Interval function for the preparation phase.
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
 * Play the checkpoint audio and save the current lap time to the specified team's record.
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
 * Updates the stopwatch display by setting the main and side counters from a pre-formatted time array.
 */
const toDisplayHtml = (formattedTime: string[]) => {
    _elementRefs.mainCounter.current.innerHTML = `${formattedTime[0]}:${formattedTime[1]}`;

    _elementRefs.sideCounter.current.innerHTML = formattedTime[2];
};

/**
 * Converts a given time in milliseconds to an array of three strings containing the minutes, seconds, and milliseconds respectively.
 */
const msToArrTime = (nMs: number): string[] => {
    /**
     * This function adds a "0" prefix to numbers less than 10
     */
    const addPrefix = (n: number): string => {
        return n < 10 ? `0${n}` : `${n}`;
    };

    const min = Math.floor(nMs / 60000);
    const sec = Math.floor((nMs - min * 60000) / 1000);
    const ms = Math.floor((nMs - sec * 1000 - min * 60000) / 10);

    return [addPrefix(min), addPrefix(sec), addPrefix(ms)];
};
