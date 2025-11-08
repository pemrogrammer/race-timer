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
        </>
    );
}
