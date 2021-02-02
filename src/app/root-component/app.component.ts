import { Component } from '@angular/core';
import { Tab } from '../../../components/src/tabs/tabs.component';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
  Color = 'Color'
}

const themeClassName = 'app-component';

const themesClassMap = {
  [Theme.Light]: `${themeClassName}--light`,
  [Theme.Dark]: `${themeClassName}--dark`,
  [Theme.Color]: `${themeClassName}--color`
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  theme = Theme.Color;

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

  get themeClass(): { [key: string]: boolean } {
    return {
      [themesClassMap[this.theme]]: true
    };
  }
}
