import { Injectable } from '@angular/core';

@Injectable()
export class ToggleService {

  public toggle(arr: string, index: number, prop: string, context) {
    context[arr][index][prop] = !context[arr][index][prop];
  }

}
