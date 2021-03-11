import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'core-spoiler',
  templateUrl: 'spoiler.component.html',
  styleUrls: ['spoiler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpoilerComponent {
  @Input() caption: string;
  @Output() sliderToggle = new EventEmitter<boolean>();

  isOpen: boolean;

  onToggle(): void {
    this.isOpen = !this.isOpen;
    this.sliderToggle.emit(this.isOpen);
  }
}
