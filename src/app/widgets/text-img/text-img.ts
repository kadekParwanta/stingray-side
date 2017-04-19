import {Directive, ElementRef, Input} from '@angular/core';
import {ColorGenerator} from './color-generator';
 
@Directive({
    selector: 'text-img',
    providers:[ColorGenerator]
})
export class TextImage {
 
    constructor(private element: ElementRef, private colorGenerator: ColorGenerator){  }
    
    @Input()
    set text(txt: string) {
        this.element.nativeElement.style.backgroundColor = this.colorGenerator.getColor(txt);
        let matches = txt.match(/\b(\w)/g);
        this.element.nativeElement.setAttribute("value", matches.join(''));
    } 
 
}
