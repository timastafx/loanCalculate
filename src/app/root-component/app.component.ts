import { Component, OnInit } from '@angular/core';
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

const localStorageThemeName = 'Theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  activeTheme = Theme.Light;
  themeValues = Object.values(Theme);

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
      [themesClassMap[this.activeTheme]]: true
    };
  }

  ngOnInit(): void {
    this.activeTheme = localStorage.getItem(localStorageThemeName) as Theme;
  }

  onThemeChange(theme: Theme): void {
    this.activeTheme = theme;
    localStorage.setItem(localStorageThemeName, theme);
  }
}
