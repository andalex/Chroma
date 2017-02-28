import { Component, OnInit } from '@angular/core';

// fonts
import * as WebFont from 'webfontloader';

import * as Services from '../services';

@Component({
  selector: 'palette',
  providers: [Services.FontService, Services.PaletteService, Services.CssService, Services.ToggleService, Services.AdjustService],
  styleUrls: ['./palette-card.component.scss'],
  templateUrl: './palette-card.component.html'
})

export class PaletteCardComponent implements OnInit {

  constructor(
    private fontService: Services.FontService,
    private paletteService: Services.PaletteService,
    private cssService: Services.CssService,
    private toggleService: Services.ToggleService,
    private adjustService: Services.AdjustService
  ) { }

  public allFonts: Array<any> = [];
  public colorPalettes: any;

  public ngOnInit() {

    // request googlefonts api via our font service
    this.fontService.getAll('popularity').subscribe(res => { this.allFonts = res['items'].slice(0, 49) });

     // request our palettes from the chroma gomix api
    this.paletteService.getAll().subscribe(res => { this.colorPalettes = res });
  }

  // cssService using filesaver
  public downloadCss(palette: any, scss: any) {
    this.cssService.getCssByPaletteId(palette._id, scss).subscribe();
  }

  public selectColor(index, palIndex) {

    //fill right panel with selected color
    this.colorPalettes[index].currentColor = this.colorPalettes[index].palette[palIndex];

    //move identifier top css
    this.colorPalettes[index].identifierPosition = this.colorPalettes[index].positions[palIndex];

    //toggle identifier arrow
    if (this.colorPalettes[index].lastOctogonClicked == palIndex && this.colorPalettes[index].identifierShow) {
      this.colorPalettes[index].currentColor = '#fff';
      this.colorPalettes[index].identifierShow = false;
    } else {
      this.colorPalettes[index].lastOctogonClicked = palIndex;
      this.colorPalettes[index].identifierShow = true;
    }
  }

  public selectFontColor(index, palIndex) {
    //color font with selected color
    this.colorPalettes[index].fontColor = this.colorPalettes[index].palette[palIndex];

    //move identifier padding css
    this.colorPalettes[index].fontPaletteIdentifierPosition = this.colorPalettes[index].fontPalettePositions[palIndex];
  }
 
  public currentFontStyles: any;

  public selectFont(index) {

    // deselect any other fonts
    this.allFonts.map(font => font.fontSelected = false)

    //adds selection class to scrollbar
    this.toggleService.toggle('allFonts', index, 'fontSelected', this);

    //loads are fonts with @font-face
    this.loadFonts(this.allFonts[index]);

    //used as a class for the font css
    this.currentFontStyles = this.allFonts[index].family.replace(/ +/g, '');
  }

  //load font-family from google-fonts api
  private loadFonts(font: any) {
    try {
      WebFont.load({ google: { families: [font.family] } });
    } catch (e) {
      console.warn(`Error loading font: ${font}\n\n[ERROR]: ${e}`);
    }
  }
}