import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public rootCategories: boolean[] = [
    true,
    false
  ];

  @Input() id: number;

  constructor() { }

  ngOnInit() {
  }

  public onItemClick(id: number): void {
    this.id = id;
  }
}
