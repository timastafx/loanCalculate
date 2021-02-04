import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invest-plan',
  templateUrl: 'invest-plan.component.html',
  styleUrls: ['invest-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestPlanComponent {
  testInput = new FormControl(null, Validators.required);

  onInputBlur() {
    console.log(this.testInput.value);
  }
}
