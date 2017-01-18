/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template:
  `<main>
<div class="pal-container" fxLayout="row" fxLayout.sm="column" fxLayout.xs="column" fxlayoutAlign="center center" max-width="960px">
    <div fxFlex="15%"></div>
    <div fxFlex="35%">
        <div fxFlex>

            <svg height="12rem" width="100%" viewBox="621 72 204 193" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch -->
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(623.000000, 74.072266)">
                    <polygon id="Path-5" fill="#3E4348" points="37 45.5 162.004 45.5 101 0"></polygon>
                    <polygon id="Polygon" stroke="#3E4348" stroke-width="3" points="99.9111328 1.42108547e-14 199.822266 71.8567346 161.659609 188.123374 38.1626569 188.123374 0 71.8567346"></polygon>
                    <text id="CHROMA" font-family="Oswald-Regular, Oswald" font-size="48" font-weight="normal" fill="#3E4348">
                        <tspan x="16.3398438" y="109">CHROMA</tspan>
                    </text>
                    <path d="M77,125.5 L123.389654,125.5" id="Path-4" stroke="#3E4348" stroke-width="3"></path>
                    <text id="An-interactive-palet" font-family="Oswald-Regular, Oswald" font-size="13" font-weight="normal" fill="#3E4348">
                        <tspan x="35.699707" y="152">palette tool </tspan>
                    </text>
                </g>
            </svg>
            <dropdown></dropdown>
        </div>
        <home></home>
    </div>
    <div fxFlex="35%">
        <home></home>

        <div fxFlex>
            <a href="https://github.com/andalex/angular2-webpack-starter">
                <svg width="100%" height="12rem" viewBox="621 72 204 193" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch -->
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(623.000000, 74.072266)">
                        <polygon id="Path-5" fill="#3E4348" transform="translate(99.502000, 22.750000) scale(1, -1) translate(-99.502000, -22.750000) "
                            points="37 45.5 162.004 45.5 101 0"></polygon>
                        <polygon id="Polygon" stroke="#3E4348" stroke-width="3" transform="translate(99.911133, 94.061687) scale(1, -1) translate(-99.911133, -94.061687) "
                            points="99.9111328 1.42108547e-14 199.822266 71.8567346 161.659609 188.123374 38.1626569 188.123374 0 71.8567346"></polygon>
                        <text id="VIEW-ON-GITHUB" font-family="Oswald-Regular, Oswald" font-size="14" font-weight="normal" fill="#3E4348">
                            <tspan x="85.7973633" y="80">VIEW</tspan>
                            <tspan x="91.5292969" y="101">ON</tspan>
                            <tspan x="78.1411133" y="122">GITHUB</tspan>
                        </text>
                    </g>
                </svg>
            </a>
        </div>


    </div>

    <div fxFlex="15%"></div>
</div>
<router-outlet></router-outlet>
</main>`
})
export class AppComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}