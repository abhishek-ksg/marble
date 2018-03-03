import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";

@Component({
    selector: 'am-star',
    templateUrl: './star-component.html',
    styleUrls: ['./star-component.css']
})
export class StarComponent implements OnChanges{

    @Input() currentRating: number;
    @Output() ratingClickedEvent: EventEmitter<string> = new EventEmitter<string>();
    starWidth: number = 0;
    maxStarWidth: number = 86;
    maxStarNumber: number = 5;

    ngOnChanges(){
        this.starWidth = (this.currentRating/this.maxStarNumber)*this.maxStarWidth;
    }

    ratingClicked() {
        this.ratingClickedEvent.emit(`The clicked rating is ${this.currentRating}`);
    }
}