import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

// Проверка

export interface Tab {
  id: string;
  label: string;
  path: string[];
}

@Component({
  selector: 'core-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {
  @Input() tabs: Tab[];

  activeId: string;

  ngOnInit(): void {
    this.activeId = this.tabs.length ? this.tabs[0].id : '';
  }

  onItemClick(tab: Tab): void {
    this.activeId = tab.id;
  }

  trackById(_: number, item: Tab): string {
    return item.id;
  }
}
