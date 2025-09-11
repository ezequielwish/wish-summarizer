import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Wish Summarizer!</h1>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Wish Summarizer</p>
      </footer>
    </div>
  );
}
