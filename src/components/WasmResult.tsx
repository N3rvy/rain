import { editor } from "monaco-editor";
import { Accessor, createEffect, onMount } from "solid-js";
import styles from "./Result.module.css"
import wasmStyles from "./wasmResult.module.css";

type WasmResultProps = {
    wat: Accessor<string>;
}

const WasmResult = ({ wat }: WasmResultProps) => {
    let mount!: HTMLDivElement;
    let monEditor: editor.IStandaloneCodeEditor;

    onMount(() => {
        monEditor = editor.create(mount, {
            automaticLayout: true,
            theme: "vs-dark",
            minimap: { enabled: false },
            language: "typescript",
            fontSize: 10,
            lineNumbers: "off",
            readOnly: true,
        });
    });

    createEffect(() => {
        monEditor.setValue(wat());
    });

    return <div classList={{[wasmStyles.wasmResult]: true, [styles.resultContainer]: true}}>
        <div ref={mount} class={wasmStyles.editor}></div>
    </div>
}

export default WasmResult;