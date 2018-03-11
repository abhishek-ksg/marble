import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'converttospaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(value: string, character: string) {
        if (!value) {
            return value;
        } else {
            return value.replace(character, ' ');
        }
    }
}
