import { editor } from "monaco-editor";
import { createSignal, onMount } from "solid-js";
import createWabt from "wabt";
import runCode from "../run-code";
import styles from "./Editor.module.css";
import Result from "./Result";
import WasmResult from "./WasmResult";

const Editor = () => {
    let mount!: HTMLDivElement;
    let monEditor: editor.IStandaloneCodeEditor;

    const [results, setResults] = createSignal<string[]>([]);
    const [wat, setWat] = createSignal<string>("");

    const run = async () => {
        setResults([]);

        await runCode(monEditor.getValue(), (s) => setResults([...results(), s]))
            .then(async module => {
                const wabt = await createWabt();
                const mod = wabt.readWasm(module, {readDebugNames: true});

                setWat(mod.toText({foldExprs: true}))
            })
            .catch(err => {
                setResults(["Error: " + String(err)]);
            });
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
            <div>
                <div class={styles.editorContainer}>
                    <div ref={mount} class={styles.editor} />
                    <div class={styles.runButton} onClick={run}>R</div>
                </div>
                <Result results={results()} />
            </div>
            <WasmResult wat={wat} />
        </div>
    );
};

export default Editor;
