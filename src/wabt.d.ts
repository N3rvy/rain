declare module "wabt" {

    type Wabt = {
        readWasm(wasm: BufferSource, config: WabtReadConfig): WabtModule;
    }

    type WabtModule = {
        toText(config: WabtToTextConfig): string;
    };

    type WabtToTextConfig = {
        foldExprs?: boolean;
        inlineExport?: boolean;
    }
    type WabtReadConfig = {
        readDebugNames?: boolean;
    };

    export default function createWabt(): Promise<Wabt>;
}