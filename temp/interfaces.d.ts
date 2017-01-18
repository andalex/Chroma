export interface FontInterface {
    family: string;
    files?: any;
    size: number;
    style: string;
    styles: string[];
}
export interface GoogleFontInterface {
    category: string;
    family: string;
    files: Object[];
    kind: string;
    variants: string[];
}
export interface FontPickerConfigInterface {
    apiKey?: string;
}
export declare class FontPickerConfig implements FontPickerConfigInterface {
    apiKey: string;
    constructor(config?: FontPickerConfigInterface);
    assign(config?: FontPickerConfigInterface): void;
}
export declare class Font {
    family: string;
    files: any;
    size: number;
    style: string;
    styles: string[];
    constructor(props: FontInterface);
    getStyles(): any;
}
export declare class GoogleFonts {
    kind: string;
    items: Array<any>;
}
