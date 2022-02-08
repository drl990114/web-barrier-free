import './index.css';
declare class Wbf {
    opening: boolean;
    readMode: readMode;
    language: language;
    rate: number;
    pitch: number;
    volume: number;
    showBarEl: HTMLDivElement | null;
    needConsole: boolean;
    externalFn: Function | null;
    private readonly overHandler;
    private readonly outHandler;
    constructor(options?: Options);
    open(): void;
    close(): void;
    changeOptions(keyName: string, value: any): void;
    changeMode(readMode: readMode): void;
    addHandler(): void;
    createUtterance(str: any): SpeechSynthesisUtterance;
    playAudio(str: string): SpeechSynthesisUtterance | undefined;
    emphasize(el: HTMLElement | Element): void;
    removeEmphasize(el: HTMLElement | Element): void;
    createShowBarDom(): HTMLDivElement;
    createConsole(): void;
    removeConsole(): void;
    removeShowBarDom(): void;
}
declare type readMode = 'finger' | 'continuous';
export declare type language = 'en' | 'zh-CN';
interface Options {
    readMode?: readMode;
    language?: language;
    rate?: number;
    pitch?: number;
    externalFn?: Function;
    volume?: number;
    needConsole?: boolean;
}
export default Wbf;
