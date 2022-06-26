import { createSignal, For } from "solid-js";
import styles from "./Result.module.css";

export type ResultProps = {
    results: string[];
}

const Result = (props: ResultProps) => {
    return (
        <div class={styles.resultContainer}>
            <div class={styles.resultList}>
                <For each={props.results}>
                    {(result) => <div class={styles.result}>{result}</div> }
                </For>
            </div>
        </div>
    );
}

export default Result;