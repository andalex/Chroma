import { Component, OnInit } from '@angular/core';

//fonts
import { FontService } from '../font.service';
import * as WebFont from 'webfontloader';

//color palettes
import { PaletteService } from '../palette.service';
import { CssService } from '../css.service';

@Component({
  selector: 'palette',
  providers: [FontService, PaletteService, CssService],
  styleUrls: ['./palette-card.component.scss'],
  templateUrl: './palette-card.component.html'
})

export class PaletteCardComponent implements OnInit {

  constructor(
    private fontService: FontService,
    private paletteService: PaletteService,
    private cssService: CssService
  ) { }

  public allFonts: Array<any> = [];
  public colorPalettes: any;

  public ngOnInit() {

    //request googlefonts api via our font service
    this.fontService.getAll('popularity').subscribe(res => { this.allFonts = res['items'].slice(0, 49) });
   
    this.paletteService.getAll().subscribe(res => { this.colorPalettes = res });

  }

  public downloadCss(palette: any, scss: any) {
    this.cssService.getCssByPaletteId(palette._id, scss).subscribe();
  }

  public toggle(arr: string, index: number, prop: string) {
    this[arr][index][prop] = !this[arr][index][prop];
    console.log('trying to toggole:', this[arr][index]);
     console.log(arr, index, prop);
  }

  public selectColor(index, palIndex) {
    console.log(index, palIndex);
    

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
 console.log(index, palIndex);
    //color font with selected color
    this.colorPalettes[index].fontColor = this.colorPalettes[index].palette[palIndex];

    //move identifier padding css
    this.colorPalettes[index].fontPaletteIdentifierPosition = this.colorPalettes[index].fontPalettePositions[palIndex];
  }
 
  //selects only one font from the scrolling list
  public currentFontStyles: any;

  public selectFont(index) {
     console.log(index);
    //deselect any other fonts
    this.allFonts.map(font => font.fontSelected = false)

    //adds selection class to scrollbar
    this.toggle('allFonts', index, 'fontSelected');

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

  //scale font from h1 - p based on common sizes - a simple solution
  public adjustFontRatios(stringRatio: string) {
    let ratio = parseFloat(stringRatio);
    return {
      p: `${ratio * 1}`.substring(0, 4) + 'em',
      hOne: `${ratio * 2.5}`.substring(0, 4) + 'em',
      hTwo: `${ratio * 2}`.substring(0, 4) + 'em',
      hThree: `${ratio * 1.5}`.substring(0, 4) + 'em',
      fontScale: stringRatio
    };
  }

  //set initial font ratio styles
  public incrementFont(increment, index) {
     console.log(increment, index);
    let fontScaleValue = this.colorPalettes[index].fontInitialValue;
    if (increment && fontScaleValue < 20) {
      this.colorPalettes[index].fontInitialValue++;
    } else if (fontScaleValue != 1) {
      this.colorPalettes[index].fontInitialValue--;
    }
    this.colorPalettes[index].fontStyles = this.adjustFontRatios((fontScaleValue / 10).toFixed(1));
  }
}