"use client";

import styles from "./page.module.css";

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
                <p>© 2025 Wish Summarizer</p>
            </footer>
        </div>
    );
}
