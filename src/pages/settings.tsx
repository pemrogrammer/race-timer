export default function Settings() {
    const handleReset = () => {
        localStorage.setItem(
            "krc_timer_setting",
            JSON.stringify(DEFAULT_SETTING),
        );
        window.location.reload();
    };

    return (
        <>
            <div className="bg-image4" id="bg-image4"></div>

            {/* <!-- SETTINGS PAGE --> */}
            <div id="settingPage" className="container">
                <p className="page-title">Setting</p>

                <div>
                    <label htmlFor="compNameInput">Competition Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="compNameInput"
                        placeholder="Competition Name"
                    />

                    <label htmlFor="race_duration">Race Duration (sec)</label>
                    <input
                        className="form-input"
                        type="number"
                        id="race_duration"
                        placeholder="seconds"
                    />

                    <label htmlFor="prep_time">
                        Preparation Duration (sec)
                    </label>
                    <input
                        className="form-input"
                        type="number"
                        id="prep_time"
                        placeholder="seconds"
                    />

                    <label htmlFor="a_team_input">A Team</label>
                    <input
                        className="form-input"
                        type="text"
                        id="a_team_input"
                        placeholder="Team Name"
                    />

                    <label htmlFor="b_team_input">B Team</label>
                    <input
                        className="form-input"
                        type="text"
                        id="b_team_input"
                        placeholder="Team Name"
                    />

                    <label htmlFor="midTextInput">Middle Text</label>
                    <input
                        className="form-input"
                        type="text"
                        id="midTextInput"
                        placeholder="Middle Text"
                    />

                    <label htmlFor="nLapInput">Number of Lap</label>
                    <input
                        className="form-input"
                        type="number"
                        min="1"
                        id="nLapInput"
                        placeholder="Number of Lap"
                    />
                    <br />
                    <br />
                    <button
                        type="button"
                        className="btn"
                        style={{
                            marginRight: "2rem",
                            marginTop: "1rem",
                            fontSize: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            padding: "6px 12px",
                        }}
                        onClick={handleReset}
                    >
                        Reset to default
                    </button>
                    <button
                        type="button"
                        className="btn"
                        style={{
                            // "margin-top: 1rem; font-size: 2rem; background-color:rgba(0, 0, 0, 0.5); padding:6px 12px;"
                            marginTop: "1rem",
                            fontSize: "2rem",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            padding: "6px 12px",
                        }}
                        // onclick="setSettings()"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

const DEFAULT_SETTING = {
    prep_time: 5, //second
    race_duration: 15, //second
    compName: "Race Stopwatch App V1.9 ",
    team_a_name: "Tim A",
    team_b_name: "Tim B",
    midText: "VS / Laps / Checkpoint",
    nLap: 3,
    isBgmEnabled: true,
    isSfxEnabled: true,
};
