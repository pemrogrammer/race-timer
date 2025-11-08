import packageJson from "../../package.json";

/**
 * Default Settings
 */
const DEFAULT_SETTINGS = {
    compName: `Race Stopwatch App v${packageJson.version}`,
    isBgmEnabled: true,
    isSfxEnabled: true,
    midText: "VS / Laps / Checkpoint",
    nLap: 3,
    prep_time: 5, //second
    race_duration: 15, //second
    team_a_name: "Tim A",
    team_b_name: "Tim B",
};

export default DEFAULT_SETTINGS;
