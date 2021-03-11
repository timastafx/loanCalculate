import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum TextType {
  highlighted,
  simple
}

export interface OutputText {
  type: TextType;
  value: string;
}

@Component({
  selector: 'core-output-text',
  templateUrl: 'output-text.component.html',
  styleUrls: ['output-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputTextComponent {
  @Input() outputText: OutputText[][];

  TextType = TextType;
}
