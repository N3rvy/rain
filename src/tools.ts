export type Error = { error: string };
export type Option<T> = T | undefined;
export type Result<T> = T | Error;

export const hasValue = <T>(option: Option<T>): option is T =>
    option !== undefined;
export const isOk = <T>(result: Result<T>): result is T =>
    (result as Error)?.error === undefined;
export const isErr = <T>(result: Result<T>): result is Error => !isOk(result);
