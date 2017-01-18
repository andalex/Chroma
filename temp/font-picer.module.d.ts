import { ModuleWithProviders, OpaqueToken } from '@angular/core';
import { FontPickerConfig, FontPickerConfigInterface } from './interfaces';
export declare const FONT_PICKER_GUARD: OpaqueToken;
export declare const FONT_PICKER_CONFIG: OpaqueToken;
export declare class FontPickerModule {
    constructor(guard: any);
    static forRoot(config?: FontPickerConfigInterface): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
export declare function provideForRootGuard(config: FontPickerConfig): any;
