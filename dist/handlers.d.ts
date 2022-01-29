import Wbf from './index';
declare const overHandler: (e: {
    target: HTMLElement;
}, wbf: Wbf) => void;
declare const outHandler: (e: {
    target: HTMLElement;
}, wbf: any) => void;
export { overHandler, outHandler };
