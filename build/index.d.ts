export declare const track: <F extends (...unknown: any[]) => ReturnType<() => void>>(name: string, func: F) => (...args: Parameters<F>) => Promise<ReturnType<F>>;
export declare const enrich: (key: string, value: string | boolean | number) => void;
export declare const label: (key: string, value: string) => void;
export declare const log: (name: string, attributes?: Record<string, string | number | boolean>) => void;
