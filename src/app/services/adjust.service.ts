import { Injectable } from '@angular/core';

@Injectable()
export class AdjustService {

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
  public incrementFont(increment, index, context) {
    let fontScaleValue = context.colorPalettes[index].fontInitialValue;
    if (increment && fontScaleValue < 20) {
      context.colorPalettes[index].fontInitialValue++;
    } else if (fontScaleValue != 1) {
      context.colorPalettes[index].fontInitialValue--;
    }
    context.colorPalettes[index].fontStyles = this.adjustFontRatios((fontScaleValue / 10).toFixed(1));
  }

}
