import { editor } from "monaco-editor";
import { createSignal, For, onMount } from "solid-js";
import runCode from "../run-code";
import { isErr } from "../tools";
import styles from "./Editor.module.css";
import Result from "./Result";

const Editor = () => {
    let mount!: HTMLDivElement;
    let monEditor: editor.IStandaloneCodeEditor;

    const run = async (): Promise<string[]> => {
        let results = [] as string[];

        const runResult = await runCode(monEditor.getValue(), (s) => {
            results = [...results, s];
        });

        if (isErr(runResult)) {
            results = ["Error: " + runResult.error];
        }

        return results;
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
            <Result run={run} />
        </div>
    );
};

export default Editor;
