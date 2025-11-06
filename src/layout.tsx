import {
    faClock,
    faCog,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router";
import styles from "./layout.module.css";

export default function Layout() {
    return (
        <>
            <div className={styles.navContainer}>
                <NavLink to="/" aria-label="stopwatch">
                    <FontAwesomeIcon icon={faClock} />
                </NavLink>

                <NavLink to="/settings" aria-label="settings">
                    <FontAwesomeIcon icon={faCog} />
                </NavLink>

                <NavLink to="/info" aria-label="info">
                    <FontAwesomeIcon icon={faInfoCircle} />
                </NavLink>
            </div>

            <Outlet />
        </>
    );
}
