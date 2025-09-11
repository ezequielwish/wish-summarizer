"use client";

import styles from "./page.module.css";
import { FaGithub } from "react-icons/fa";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Wish Summarizer!</h1>
                <form
                    action="/api/summarize"
                    method="post"
                    className={styles.form}
                >
                    <textarea
                        name="wishes"
                        placeholder="Enter your wishes here..."
                        className={styles.textarea}
                        required
                    ></textarea>
                    <button type="submit" className={styles.button}>
                        Summarize Wishes
                    </button>
                </form>
            </main>
            <footer className={styles.footer}>
                <span className={styles.footerText}>
                    <a
                        href="https://github.com/ezequielwish/wish-summarizer"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        © 2025 Wish Summarizer
                    </a>
                    <FaGithub />
                </span>
            </footer>
        </div>
    );
}
