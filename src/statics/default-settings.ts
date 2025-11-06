import packageJson from "../../package.json";

/**
 * Default Settings
 */
const DEFAULT_SETTINGS = {
    prep_time: 5, //second
    race_duration: 15, //second
    compName: `Race Stopwatch App v${packageJson.version}`,
    team_a_name: "Tim A",
    team_b_name: "Tim B",
    midText: "VS / Laps / Checkpoint",
    nLap: 3,
    isBgmEnabled: true,
    isSfxEnabled: true,
};

export default DEFAULT_SETTINGS;
