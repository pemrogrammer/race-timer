// import './App.css'

export default function App() {
	const handleReset = () => {
		localStorage.setItem("krc_timer_setting", JSON.stringify(DEFAULT_SETTING));
		window.location.reload();
	};

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
			<audio src="assets/sound/times_up.mp3" id="timesUpAudio" preload="auto" />

			<div className="bg-image1" id="bg-image1"></div>
			<div className="bg-image2" id="bg-image2"></div>
			{/* <!-- <div className="bg-image3" id="bg-image3"></div> --> */}
			<div className="bg-image4" id="bg-image4"></div>

			{/* <!-- <div className="left-btn-container">
		<button className="btn" onclick="zoomIn(event)">
			<i className="fa fa-plus" aria-hidden="true"></i>
		</button>

		<button className="btn" onclick="toggleFullScreen(document.body)">
			<i className="fa fa-window-maximize" aria-hidden="true"></i>
		</button>

		<button className="btn" onclick="document.body.style.zoom += 0.1">
			<i className="fa fa-minus" aria-hidden="true"></i>
		</button>

		
	</div> --> */}

			<div className="right-btn-container">
				<button
					type="button"
					className="btn"
					// onclick="routeToPage('stopWatch')"
				>
					<i className="fa fa-clock-o" aria-hidden="true"></i>
				</button>
				{/* <!-- <button className="btn" onclick="routeToPage('listTeam')">
			<i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp; List Teams
		</button> --> */}

				<button
					type="button"
					className="btn"
					// onclick="routeToPage('settings')"
				>
					<i className="fa fa-cog" aria-hidden="true"></i>
				</button>

				<button
					type="button"
					className="btn"
					// onclick="routeToPage('informationPage')"
				>
					<i className="fa fa-info-circle" aria-hidden="true"></i>
				</button>
			</div>

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
						<p id="team_a_name" className="red-colored team-name"></p>
						{/* <!-- <div id="finA">
				</div>
				<p id="winTeamA"></p> --> */}
					</div>

					<div id="midText" className=""></div>

					<div className="box-team">
						<p id="team_b_name" className="blue-colored team-name"></p>
						{/* <!-- <p id="finB"></p>
				<p id="winTeamB"></p> --> */}
					</div>
				</div>

				<div className="laps-container">
					<div id="aTimeLap" className="time-lap"></div>
					<div id="midLapNo" className="laps-no"></div>
					<div id="bTimeLap" className="time-lap"></div>
				</div>
			</div>

			{/* <!-- <div id="ListTeamPage" className="container">
		<div className="list-team-page">
			<h2>List Teams</h2>
			<div className="form-input">
				<input type="text" id="input-red-team" placeholder="Red Team"> <b
					style="font-size: 24px;color: orange;">VS</b>
				<input type="text" id="input-blue-team" placeholder="Blue Team">
				<button className="btn-add-team" onclick="storeTeams(null, 'ADD_TEAM')">
					<i className="fa fa-plus-circle" aria-hidden="true"></i>
				</button>
			</div>
			<div className="team-content">
				<ul id="teams">
					<li>TEAM A VS TEAM F</li>
				</ul>
			</div>
		</div>
	</div> --> */}

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

					<label htmlFor="prep_time">Preparation Duration (sec)</label>
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

			{/* <!-- DISPLAY PAGE--> */}
			<div id="informationPage" className="container">
				<p className="page-title">Information</p>

				<div
					style={{
						// margin: 7rem 0em; font-size: 1rem;color:whitesmoke;font-family: 'digital-7';
						margin: "7rem 0em",
						fontSize: "1rem",
						color: "whitesmoke",
						fontFamily: "'digital-7'",
					}}
				>
					<p
						style={{
							// "transform: scaleY(1.2); font-size: 1.2rem; font-family: 'cyberspace';"
							transform: "scaleY(1.2)",
							fontSize: "1.2rem",
							fontFamily: "'cyberspace'",
						}}
					>
						Race Stopwatch App V 1.3
					</p>
					<p>Klub Pemrograman Jurusan Teknologi Informasi POLNES</p>
					<p>2021</p>
				</div>

				<p>hotkeys:</p>

				<div
					style={{
						// "margin: auto; width: 50%; font-family: 'digital-7'; color:whitesmoke; margin-bottom: 4rem; padding-top: 1rem;"
						margin: "auto",
						width: "50%",
						fontFamily: "'digital-7'",
						color: "whitesmoke",
						marginBottom: "4rem",
						paddingTop: "1rem",
					}}
				>
					<table border={1}>
						<tbody>
							<tr>
								<td width="4%" style={TD_STYLE}>
									No.
								</td>
								<td width="20%">Key</td>
								<td>Function</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									1.
								</td>
								<td width="20%">Space</td>
								<td>Start/pause Stopwatch</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									2.
								</td>
								<td width="20%">r</td>
								<td>Stopwatch Reset (pause first)</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									3.
								</td>
								<td width="20%">a</td>
								<td>Lap time for A team</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									4.
								</td>
								<td width="20%">b</td>
								<td>Lap time for B team</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									5.
								</td>
								<td width="20%">o</td>
								<td>Mute/unmute sound FX</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									6.
								</td>
								<td width="20%">p</td>
								<td>Mute/unmute background music</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									7.
								</td>
								<td width="20%">F11</td>
								<td>Fullscreen/Exit Fullscreen</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									8.
								</td>
								<td width="20%">CTRL +</td>
								<td>Zoom In</td>
							</tr>
							<tr>
								<td width="4%" style={TD_STYLE}>
									9.
								</td>
								<td width="20%">CRTL -</td>
								<td>Zoom Out</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

const TD_STYLE = {
	padding: "10px",
	textAlign: "center",
} as const;

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
