import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Agent page</title>
      </Head>

      <main className={styles.main}>
        <h3>Agent page</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="agent prompt"
            placeholder="Enter a prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Agent task" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
