import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls-spoiler',
  templateUrl: './spoiler.component.html',
  styleUrls: ['./spoiler.component.less']
})
export class SpoilerComponent implements OnInit {
  @Input() caption: string;
  @Input() toggle: boolean;
  @Output() valueChanged = new EventEmitter();

  public onClick(): void {
    this.toggle = !this.toggle;
    this.valueChanged.emit(this.toggle);
  }

  ngOnInit(): void {
  }
}
