import {
    Component,
    OnInit,
    AfterViewChecked,
    ElementRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'dropdown',
    styleUrls: ['./dropdown.component.css'],
    templateUrl: './dropdown.component.html'
})

export class DropDownComponent implements OnInit, AfterViewChecked {

    constructor(

    ) { }

    @ViewChild('SomeDomVar') private myScrollContainer: ElementRef;

    public ngOnInit() { }
    public ngAfterViewChecked() { }

    public dropDownExpanded: boolean = false;
    public dropDownHeight: string = '0rem';
    public dropDownPadding: string = '0rem';
    public toggle() {
        this.dropDownExpanded = !this.dropDownExpanded;
        if (this.dropDownExpanded) {
            this.dropDownHeight = '67rem';
            this.dropDownPadding = '1rem';
        } else {
            this.dropDownHeight = '0rem';
            this.dropDownPadding = '0rem';
        }
    }
}