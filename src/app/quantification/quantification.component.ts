import { Component, OnInit } from '@angular/core';

/*
 * @Interface
 * @param name: string - Название бумаги
 * @param cost: string - Стоимость бумаги
 * @param id: number - уникальный идентификатор
 */
interface IItem {
  name: string;
  cost: number;
  id: number;
}

/*
 * @Interface
 * @remark Интерфейс объекта, показывающего сколько бумаг доступно для покупки
 * @param name: string - Название бумаги
 * @param quantity: string - Количество доступных для покупкт бумаг
 * @param cost: string - Стоимость бумаги
 */
interface IQuantumItem {
  name: string;
  quantity: number;
  cost: number;
}

/*
 * @Interface
 * @remark Интерфейс параметров функции _portfolioCalculate, сделано для того, чтобы разбить
 * этот метод на несколько небольших
 * @param byOne: number - сколько средств можно гарантированно потратить на одну бумагу
 * @param result: IQuantumItem[]
 * @param totalAmount: number - общее количество затраченных средств
 */
interface ICalculateParams {
  byOne: number;
  result: IQuantumItem[];
  totalAmount: number;
}

@Component({
  selector: 'app-quantification',
  templateUrl: './quantification.component.html',
  styleUrls: ['./quantification.component.less']
})
export class QuantificationComponent implements OnInit {
  public items: IItem[] = [{
    name: 'MTS',
    cost: 2895,
    id: 0
  }, {
    name: 'MOEX',
    cost: 984,
    id: 1
  }];

  public quantumItems: IQuantumItem[];
  public amount = 30000;
  public totalCost;

  /* @private method
   * Функция для отчистки данных, возвращает два пустых item
   */
  static getClearItems(): IItem[] {
    return [{
      name: '',
      cost: null,
      id: 0
    }, {
      name: '',
      cost: null,
      id: 1
    }];
  }

  /* @private method
   * Функция рассчитывает сколько бумаг нужно купить для равномерного распределения средств
   * @param items список с названиями у стоимостью бумаг
   * @param amount доступная сумма для формирования портфеля
   */
  static portfolioCalculate(items: IItem[], amount: number): {
    quantumItems: IQuantumItem[],
    totalCost: number
  } {
    let params: ICalculateParams = {
      byOne: Math.floor(amount / items.length),
      result: [],
      totalAmount: 0
    };

    params = QuantificationComponent.equalDistribution(params, items);
    params = QuantificationComponent.greedyAlgorithm(params, amount);

    return {
      quantumItems: params.result,
      totalCost: params.totalAmount
    };
  }

  /* @static method
   * Расчет гарантированного количества бумаг, доступных для покупки
   * @param params параметры ICalculateParams
   * @param items список с названиями у стоимостью бумаг
   */
  static equalDistribution(params: ICalculateParams, items: IItem[]): ICalculateParams {
    for (const item of items) {
      const quantumItem: IQuantumItem = {
        name: item.name,
        quantity: Math.floor(params.byOne / item.cost),
        cost: item.cost
      };

      params.result.push(quantumItem);
      params.totalAmount += quantumItem.quantity * item.cost;
    }

    return params;
  }

  /* @static method
   * Реализация жадного алгоритма для расчета количества доступных для покупки бумаг
   * на оставшиеся средства
   * @param params параметры ICalculateParams
   * @param amount доступная сумма для формирования портфеля
   */
  static greedyAlgorithm(params: ICalculateParams, amount: number): ICalculateParams {
    for (const quantumItem of params.result) {
      while (true) {
        if (!quantumItem.cost || params.totalAmount + quantumItem.cost >= amount) {
          break;
        } else {
          quantumItem.quantity += 1;
          params.totalAmount += quantumItem.cost;
        }
      }
    }

    return params;
  }

  ngOnInit(): void {
  }

  /* @event
   * Обработка клика по кнопке "Добавить бумагу"
   */
  public onAddClick(): void {
    this.items.push({
      name: '',
      cost: null,
      id: Date.now()
    });
  }

  /* @event
   * Обработка клика по крестику
   */
  public onDeleteClick(element): void {
    this.items = this.items.filter(item => item.id !== element.id);
  }

  /* @event
   * Обработка клика по кнопке "Отчистить"
   */
  public onClearClick(): void {
    this.items = QuantificationComponent.getClearItems();
    this.quantumItems = null;
  }

  /* @event
   * Обработка клика по кнопке "Рассчитать"
   */
  public buttonClick(): void {
    const portfolio = QuantificationComponent.portfolioCalculate(this.items, this.amount);
    this.quantumItems = portfolio.quantumItems;
    this.totalCost = portfolio.totalCost;
  }
}
