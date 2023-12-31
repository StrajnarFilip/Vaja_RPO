import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRounding',
})
export class NumberRoundingPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
