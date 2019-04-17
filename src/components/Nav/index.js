import React, { useContext } from "react";
import { Theme } from "../Session";
import ReactLogo from "../../icons/ReactLogo.svg";
import styles from "./Navigation.module.css";

import { DayIcon, GithubIcon, NightIcon } from "../../icons";

const Navigation = () => {
  const { state, dispatch } = useContext(Theme);
  const { day } = state;

  return (
    <nav className={styles.navigation}>
      <div className={[styles.navFlex, "container"].join(" ")}>
        <div className={styles.navFlex}>
          <div className={styles.mainWrapper}>
            <img
              src={ReactLogo}
              className={styles.navigationMain}
              alt="The React.js framework logo. Looks like science."
            />
          </div>
          <span>React Algolia</span>
        </div>

        <div className={[styles.navFlex, styles.pushLeft].join(" ")}>
          <button
            className={styles.navigationTOD}
            onClick={() => dispatch({ type: "TOGGLE_MODE" })}
          >
            {day ? DayIcon() : NightIcon()}
          </button>
          <a
            className={styles.navigationIcon}
            href="https://github.com/SNVtahoe"
          >
            {GithubIcon()}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
