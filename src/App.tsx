import styles from './App.module.css';
import Editor from './components/Editor';
import init, {build_from_code} from "./assets/reverse-bin/portal_wasm_build"

const App = () => {
    init()

    const onChange = (s: string) => {
        try {
            const module = build_from_code(s)
            let memory: any = undefined

            const imports = {
                main: {
                    "print": (strLoc: number) => {
                        const lengthBuffer = memory.buffer.slice(strLoc, strLoc + 4)
                        const len = new Int16Array(lengthBuffer)[0]
                        const strBuffer = new Uint8Array(memory.buffer.slice(strLoc + 4, strLoc + 4 + len))
                        const decoder = new TextDecoder()
                        const str = decoder.decode(strBuffer)

                        console.log(str)
                    },
                    "printI": (i: number) => console.log(i)
                }
            }

            WebAssembly.instantiate(module, imports)
                .then((module) => {
                    console.log("Success!")

                    memory = module.instance.exports.mem
                
                    const {main} = module.instance.exports
                    if (main) {
                        (main as any)()
                    }
                })

        } catch { }
    }

    return (
        <div>
            <header class={styles.header}>
                <Editor onChange={onChange} />
            </header>
        </div>
    );
};

export default App;
