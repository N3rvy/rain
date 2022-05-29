import { editor } from "monaco-editor";
import { createSignal, For, onMount } from "solid-js";
import runCode from "../run-code";
import { isErr } from "../tools";
import styles from "./Editor.module.css";

const Editor = () => {
    let mount!: HTMLDivElement;
    let monEditor: editor.IStandaloneCodeEditor;

    let [results, setResults] = createSignal([] as string[]);

    const run = () => {
        setResults([]);
        const runResult = runCode(monEditor.getValue(), (s) =>
            setResults([...results(), s])
        );
        if (isErr(runResult)) {
            setResults(["Error: " + runResult.error]);
        }
    };

    onMount(() => {
        monEditor = editor.create(mount, {
            automaticLayout: true,
            theme: "vs-dark",
            minimap: { enabled: false },
            language: "go",
            fontSize: 20,
        });

        monEditor.setValue(`func print(s String)
func printI(i Int)

func main() {
    print("Hello, world!")
}`);
    });

    return (
        <div class={styles.container}>
            <div class={styles.editorContainer}>
                <div ref={mount} class={styles.editor} />
            </div>
            <div class={styles.resultContainer}>
                <div class={styles.resultIcon} onClick={run}>
                    R
                </div>
                <div class={styles.resultList}>
                    <For each={results()}>
                        {(result) => <div class={styles.result}>{result}</div>}
                    </For>
                </div>
            </div>
        </div>
    );
};

export default Editor;
