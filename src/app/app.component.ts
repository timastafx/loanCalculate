import { Component } from '@angular/core';
import { Tab } from '../../components/src/tabs/tabs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'loanCalculate';

  tabs: Tab[] = [
    {
      id: '0',
      label: 'Кредитный калькулятор',
      path: ['/loanCalculate']
    },
    {
      id: '1',
      label: 'Расчет портфеля',
      path: ['/quantification']
    }
  ];
}
