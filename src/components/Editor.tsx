import { editor } from "monaco-editor";
import { createSignal, For, onMount } from "solid-js";
import runCode from "../run-code";
import { isErr } from "../tools";
import styles from "./Editor.module.css";
import Result from "./Result";

const Editor = () => {
    let mount!: HTMLDivElement;
    let monEditor: editor.IStandaloneCodeEditor;

    const [results, setResults] = createSignal<string[]>([]);

    const run = async () => {
        setResults([]);

        const runResult = await runCode(monEditor.getValue(), (s) => {
            setResults([...results(), s])
        });

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

        monEditor.setValue(`import "repl"

func main() {
    print("Hello, world!")
}`);
    });

    return (
        <div class={styles.container}>
            <div class={styles.editorContainer}>
                <div ref={mount} class={styles.editor} />
            </div>
            <div class={styles.runButton} onClick={run}>R</div>
            <Result results={results()} />
        </div>
    );
};

export default Editor;
