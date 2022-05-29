import styles from "./App.module.css";
import Editor from "./components/Editor";
import init from "./assets/reverse-bin/portal_wasm_build";
import runCode from "./run-code";

const App = () => {
    init();

    return (
        <div>
            <header class={styles.header}>
                <Editor />
            </header>
        </div>
    );
};

export default App;
