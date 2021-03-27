import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'full_html'
})
export class FullHtmlPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(val: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(val);
    }
}