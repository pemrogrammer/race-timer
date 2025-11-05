import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <div className="right-btn-container">
                <a href="/" className="btn" aria-label="stopwatch">
                    <i className="fa fa-clock-o" />
                </a>

                <a href="/settings" className="btn" aria-label="settings">
                    <i className="fa fa-cog"></i>
                </a>

                <a href="/info" className="btn" aria-label="info">
                    <i className="fa fa-info-circle" />
                </a>
            </div>

            <Outlet />
        </>
    );
}
