"use client";

import { useEffect, useRef } from "react";
import Audios from "../components/audios.js";
import { checkPressedKey, init } from "../utils/core.js";
import styles from "./timer.module.css";

export default function Timer() {
    const mainCounterRef = useRef<HTMLDivElement>(null);
    const sideCounterRef = useRef<HTMLDivElement>(null);
    const midTextRef = useRef<HTMLDivElement>(null);
    const aRecordRef = useRef<HTMLDivElement>(null);
    const bRecordRef = useRef<HTMLDivElement>(null);
    const lapNoRef = useRef<HTMLDivElement>(null);
    const aNameRef = useRef<HTMLDivElement>(null);
    const bNameRef = useRef<HTMLDivElement>(null);
    const topTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        init({
            elementRefs: {
                aName: aNameRef,
                aRecord: aRecordRef,
                bName: bNameRef,
                bRecord: bRecordRef,
                lapNo: lapNoRef,
                mainCounter: mainCounterRef,
                midText: midTextRef,
                sideCounter: sideCounterRef,
                topText: topTextRef,
            },
        });

        document.addEventListener("keydown", checkPressedKey);

        return () => {
            document.removeEventListener("keydown", checkPressedKey);
        };
    }, []);

    return (
        <div
            className={[styles.pageContainer, "container", "bg", "img2"].join(
                " ",
            )}
        >
            <p ref={topTextRef} />

            <div className={styles.timer}>
                <div className={styles.bigNumber} ref={mainCounterRef}></div>
                <div className={styles.smallNumber} ref={sideCounterRef}></div>
            </div>

            <div
                style={{
                    clear: "both",
                }}
            ></div>

            <div className={styles.boxContainer}>
                <div className={styles.boxTeam}>
                    <p
                        className={[styles.teamName, styles.redColor].join(" ")}
                        ref={aNameRef}
                    />
                </div>

                <div ref={midTextRef} />

                <div className={styles.boxTeam}>
                    <p
                        className={[styles.teamName, styles.blueColor].join(
                            " ",
                        )}
                        ref={bNameRef}
                    />
                </div>
            </div>

            <div className={styles.lapsContainer}>
                <div className={styles.timeLap} ref={aRecordRef} />
                <div className={styles.midLapNo} ref={lapNoRef} />
                <div className={styles.timeLap} ref={bRecordRef} />
            </div>

            <Audios />
        </div>
    );
}
