import styles from "./info.module.css";

export default function Info() {
    return (
        <div className="container bg img4">
            <p className="page-title">Information</p>

            <p>hotkeys:</p>

            <table border={1} className={styles.table}>
                <tbody>
                    <tr>
                        <td width="4%">No.</td>
                        <td width="20%">Key</td>
                        <td>Function</td>
                    </tr>
                    <tr>
                        <td>1.</td>
                        <td>Space</td>
                        <td>Start/pause Stopwatch</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>r</td>
                        <td>Stopwatch Reset (pause first)</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>a</td>
                        <td>Lap time for A team</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>b</td>
                        <td>Lap time for B team</td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>o</td>
                        <td>Mute/unmute sound FX</td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>p</td>
                        <td>Mute/unmute background music</td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>F11</td>
                        <td>Fullscreen/Exit Fullscreen</td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>CTRL +</td>
                        <td>Zoom In</td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>CTRL -</td>
                        <td>Zoom Out</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
