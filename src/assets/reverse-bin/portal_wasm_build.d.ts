/* tslint:disable */
/* eslint-disable */
/**
* @param {string} id
* @param {string} module
*/
export function add_module(id: string, module: string): void;
/**
*/
export function init_engine(): void;
/**
* @param {string} code
* @returns {Uint8Array}
*/
export function build_from_code(code: string): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add_module: (a: number, b: number, c: number, d: number) => void;
  readonly init_engine: (a: number) => void;
  readonly build_from_code: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
