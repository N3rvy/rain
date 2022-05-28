import { editor } from "monaco-editor";
import { onMount } from "solid-js";


type EditorProps = {
    onChange: (value: string) => void;
}

const Editor = ({ onChange }: EditorProps) => {
    let mount!: HTMLDivElement;

    onMount(() => {
        const monEditor = editor.create(mount, {
            automaticLayout: true,
        })

        monEditor.onDidChangeModelContent(_ => onChange(monEditor.getValue()))
    })

    return <div ref={mount} style="width: 100%; height: 30rem"></div>
}

export default Editor;