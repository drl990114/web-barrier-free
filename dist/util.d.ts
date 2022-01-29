export declare const showBarDomId = "$$wsashowbar";
export declare const consoleDomId = "$$wsaConsole";
export declare const emphasizeClassName = "emphasizeStyle";
export declare const consoleClassName = "consoleEl";
export declare const optionsArr: string[];
export declare const getGather: (language?: string | undefined) => IGather;
export declare const getElText: (el: HTMLElement, language?: string | undefined) => string;
export declare const descriptionTag: (tagName: string, language?: string | undefined) => string | null;
export declare const getNotContainChildText: (el: HTMLElement) => string;
export declare const testReadMode: (mode: string) => boolean;
export interface IGather {
    a: string;
    img: string;
    nav: string;
    close: string;
    continuousRead: string;
    fingerRead: string;
    volume: string;
    rate: string;
}
