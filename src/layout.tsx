import {
    faClock,
    faCog,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { NavLink, Outlet } from "react-router";
import packageJson from "../package.json";
import styles from "./layout.module.css";

export default function Layout() {
    return (
        <>
            <div className={styles.navContainer}>
                <NavLink aria-label="stopwatch" to="/">
                    <FontAwesomeIcon icon={faClock} />
                </NavLink>

                <NavLink aria-label="settings" to="/settings">
                    <FontAwesomeIcon icon={faCog} />
                </NavLink>

                <NavLink aria-label="info" to="/info">
                    <FontAwesomeIcon icon={faInfoCircle} />
                </NavLink>
            </div>

            <Outlet />

            <footer className={styles.footer}>
                <p>Race Timer v{packageJson.version.split(".")[0]}</p>

                <div
                    style={{
                        color: "whitesmoke",
                        fontFamily: "digital-7",
                    }}
                >
                    <p>
                        {dayjs(packageJson.lastModified).format("YYYY")}
                        {" — "}
                        <a
                            href={packageJson.author.url}
                            rel="noreferrer"
                            target="_blank"
                        >
                            Klub Pemrograman TI POLNES
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}
