import React, { useContext } from "react";
import ReactLogo from "../../icons/ReactLogo.svg";
import styles from "./Navigation.module.css";

import { DayIcon, GithubIcon, NightIcon } from "../../icons";

const Navigation = () => (
  <nav className={styles.navigation}>
    <div className={[styles.navFlex, "container"].join(" ")}>
      <div className={styles.navFlex}>
        <img
          src={ReactLogo}
          className={styles.navigationMain}
          alt="The React.js framework logo. Looks like science."
        />
        <span>React Angolia</span>
      </div>

      <div className={[styles.navFlex, styles.pushLeft].join(" ")}>
        <button className={styles.navigationTOD}>{DayIcon()}</button>
        <a className={styles.navigationIcon} href="https://github.com/SNVtahoe">
          {GithubIcon()}
        </a>
      </div>
    </div>
  </nav>
);

export default Navigation;
