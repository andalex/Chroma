import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdCardModule, MdSliderModule, MdButtonModule, MdInputModule, MdSelectModule, MdAutocompleteModule, MdIconModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ClipboardModule } from 'ngx-clipboard';

import {EvenOddPipe} from './evenodd.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';
import {
  NgModule,
  ApplicationRef,
  Pipe
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { PaletteCardComponent } from './palettecard';
import { SidePanelComponent } from './sidepanel';
import { DropDownComponent } from './dropdown';
import { NoContentComponent } from './404';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeStyle,
  SafeScript,
  SafeHtml,
  SafeUrl
} from '@angular/platform-browser';

import '../styles/styles.scss';


type StoreType = {
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};
@Pipe({name: 'safe'})
export class Safe {

	constructor(protected _sanitizer: DomSanitizer) {

	}

	public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(value);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this._sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				return this._sanitizer.bypassSecurityTrustResourceUrl(value);
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
	}

}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    PaletteCardComponent,
    SidePanelComponent,
    NoContentComponent,
    DropDownComponent,
    Safe,
    EvenOddPipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    ClipboardModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    MdCardModule, MdSliderModule, MdButtonModule, MdInputModule, MdSelectModule, MdAutocompleteModule, MdIconModule,
    FlexLayoutModule.forRoot()
  ],
  exports: [BrowserAnimationsModule, MdCardModule, MdSliderModule, MdButtonModule, MdInputModule, MdSelectModule, MdAutocompleteModule, MdIconModule],
  providers: [ ENV_PROVIDERS ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
 
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
  
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
