export default function Info() {
    return (
        <>
            <div className="bg-image4" id="bg-image4"></div>

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
