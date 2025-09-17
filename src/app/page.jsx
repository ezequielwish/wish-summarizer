"use client";

import styles from "./page.module.css";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
    const [summarizedWishes, setSummarizedWishes] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSummarizedWishes("");
        const formData = new FormData(e.target);
        const wishes = formData.get("wishes");

        try {
            const response = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishes }),
            });
            const data = await response.json();
            setSummarizedWishes(data.summary);
        } catch (error) {
            console.error("Error summarizing wishes:", error);
        }
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.title}>Bem vindo ao Wish Summarizer!</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <textarea
                        name="wishes"
                        placeholder="O que deseja resumir hoje?"
                        className={styles.textarea}
                        required
                    ></textarea>
                    <button type="submit" className={styles.button}>
                        Resumir
                    </button>
                </form>
                <section className={styles.results} style={{ display: summarizedWishes !== "" ? "block" : "none" }}>
                    <h2 className={styles.resultsTitle}>Texto resumido:</h2> 
                    <div
                        id="resultsContainer"
                        className={styles.resultsContainer}
                    >
                        <p>{summarizedWishes}</p>
                    </div>
                </section>
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
