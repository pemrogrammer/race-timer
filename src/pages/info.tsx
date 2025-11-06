import dayjs from "dayjs";
import packageJson from "../../package.json";

export default function Info() {
    return (
        <>
            <div className="bg img4"></div>

            <div className="container">
                <p className="page-title">Information</p>

                <p>hotkeys:</p>

                <div
                    style={{
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
                                <td width="20%">CTRL -</td>
                                <td>Zoom Out</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>Race Stopwatch App v{packageJson.version}</p>

                <div
                    style={{
                        color: "whitesmoke",
                        fontFamily: "digital-7",
                    }}
                >
                    <p>Klub Pemrograman TI POLNES</p>
                    <p>{dayjs(packageJson.lastModified).format("YYYY")}</p>
                </div>
            </div>
        </>
    );
}

const TD_STYLE = {
    padding: "10px",
    textAlign: "center",
} as const;
