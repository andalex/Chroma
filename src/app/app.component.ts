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
    './app.component.scss'
  ],
  template:
  `<main>

 <div class="pal-container" fxLayout="row" fxLayout.sm="column" fxLayout.xs="column" fxlayoutAlign="center center" max-width="960px">
  <div fxFlex="15%"></div>
  <div fxFlex="35%">
       <svg height="12rem" width="100%" viewBox="621 72 204 193" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(623.000000, 74.072266)">
                <polygon id="Path-5" fill="#3E4348" points="37 45.5 162.004 45.5 101 0"></polygon>
                <polygon id="Polygon" stroke="#3E4348" stroke-width="3" points="99.9111328 1.42108547e-14 199.822266 71.8567346 161.659609 188.123374 38.1626569 188.123374 0 71.8567346"></polygon>
                <text id="CHROMA" font-family="Oswald-Regular, Oswald" font-size="48" font-weight="normal" fill="#3E4348">
                    <tspan x="16.3398438" y="109">CHROMA</tspan>
                </text>
                <path d="M77,125.5 L123.389654,125.5" id="Path-4" stroke="#3E4348" stroke-width="3"></path>
                <text id="An-interactive-palet" font-family="Oswald-Regular, Oswald" font-size="13" font-weight="normal" fill="#3E4348">
                    <tspan x="35.699707" y="152">An Interactive Palette Tool </tspan>
                </text>
            </g>
        </svg>
        <dropdown></dropdown>
         <palette></palette>
  </div>
    <div fxFlex="35%">
     <palette></palette>
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