import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
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

const GITHUB_REPO_URL = "https://github.com/pemrogrammer/race-timer";
const GITHUB_ORG_URL = "https://github.com/pemrogrammer";
const INSTAGRAM_URL = "https://instagram.com/pemrogrammer";

export default function Layout() {
    const currentYear = dayjs(packageJson.lastModified).format("YYYY");
    const version = packageJson.version.split(".")[0];

    return (
        <>
            <div className={styles.navContainer}>
                <NavLink aria-label="timer" to="/">
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
                <div className={styles.footerRow}>
                    <span>Race Timer v{version}</span>
                    <a
                        aria-label="GitHub Repository"
                        className={styles.iconButton}
                        href={GITHUB_REPO_URL}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>

                <div className={styles.footerRow}>
                    <span>{currentYear} — Klub Pemrograman TI POLNES</span>
                    <a
                        aria-label="GitHub Organization"
                        className={styles.iconButton}
                        href={GITHUB_ORG_URL}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        aria-label="Instagram"
                        className={styles.iconButton}
                        href={INSTAGRAM_URL}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </footer>
        </>
    );
}
