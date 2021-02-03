import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pension-plan',
  templateUrl: 'pension-plan.component.html',
  styleUrls: ['pension-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PensionPlanComponent {}
