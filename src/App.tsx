import styles from "./App.module.css";
import Editor from "./components/Editor";
import init, { add_module, init_engine } from "./assets/reverse-bin/portal_wasm_build";

const App = () => {
    init().then(() => {
        add_module("repl", `
import func print(s String)
import func printI(i Int)
        `);
        init_engine();
    });

    return (
        <div>
            <header class={styles.header}>
                <Editor />
            </header>
        </div>
    );
};

export default App;
