import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with ❤️ by midoch | <a href="https://github.com/midoch">GitHub</a>{" "}
        |{" "}
      </p>
    </footer>
  );
}
