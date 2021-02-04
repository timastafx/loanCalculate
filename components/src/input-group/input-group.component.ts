import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

export enum InputPosition {
  VERTICAL,
  HORIZONTAL
}

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number'
}

const inputClassName = 'core-input-group';

const inputClassMap = {
  [InputPosition.VERTICAL]: `${inputClassName}--vertical`,
  [InputPosition.HORIZONTAL]: `${inputClassName}--horizontal`
};

@Component({
  selector: 'core-input-group',
  templateUrl: 'input-group.component.html',
  styleUrls: ['input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent {
  @Input() label: string;
  @Input() position: InputPosition = InputPosition.HORIZONTAL;
  @Input() inputControl: FormControl;
  @Input() type: InputType = InputType.TEXT;

  @Output() private inputBlur = new EventEmitter<void>();

  get inputClass(): { [key: string]: boolean } {
    return {
      [inputClassMap[this.position]]: true
    };
  }

  onInputBlur(): void {
    this.inputBlur.emit();
  }
}
