import { build_from_code } from "./assets/reverse-bin/portal_wasm_build";
import { Result } from "./tools";

const runCode = async (code: string, onPrint: (s: string) => void): Promise<BufferSource> => {
    let module: BufferSource = build_from_code(code);
    let memory: WebAssembly.Memory | undefined = undefined;

    const imports = {
        repl: {
            print: (strLoc: number) => {
                if (!memory) {
                    console.error("Tried reading string with undefined memory");
                    return;
                }

                const lengthBuffer = memory.buffer.slice(strLoc, strLoc + 4);
                const len = new Int16Array(lengthBuffer)[0];
                const strBuffer = new Uint8Array(
                    memory.buffer.slice(strLoc + 4, strLoc + 4 + len)
                );
                const decoder = new TextDecoder();
                const str = decoder.decode(strBuffer);

                onPrint(str);
            },
            printI: onPrint,
        },
    };

    const instance = (await WebAssembly.instantiate(module, imports)).instance;

    memory = instance.exports.mem as WebAssembly.Memory;

    const { main } = instance.exports;
    if (main) {
        (main as any)();
    }

    return module;
};

export default runCode;
