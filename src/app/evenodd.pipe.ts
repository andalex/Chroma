import { Pipe, PipeTransform } from '@angular/core';


/*
The transform method is essential to a pipe. The PipeTransform interface defines that method and guides both tooling and the compiler. It is technically optional; Angular looks for and executes the transform method regardless.
*/ 
@Pipe({name: 'evenOdd'})
export class EvenOddPipe implements PipeTransform {
  transform(value: Array<any>, evenodd: boolean): any {
     if (!value) return value;
     let even = [];
     let odd = [];
        value.forEach((curr,idx, arr) => {
         if((idx % 2 == 0)) {
            even.push(arr[idx]);
         } else {
            odd.push(arr[idx]);
         }
       });
     if(evenodd) return even;
     return odd;
}
}