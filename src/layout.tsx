import { NavLink, Outlet } from "react-router";
import styles from "./layout.module.css";

export default function Layout() {
    return (
        <>
            <div className={styles.navContainer}>
                <NavLink to="/" aria-label="stopwatch">
                    <i className="fa fa-clock-o" />
                </NavLink>

                <NavLink to="/settings" aria-label="settings">
                    <i className="fa fa-cog"></i>
                </NavLink>

                <NavLink to="/info" aria-label="info">
                    <i className="fa fa-info-circle" />
                </NavLink>
            </div>

            <Outlet />
        </>
    );
}
