export interface FinancialExpectationProperties {
  // Ежемесячный взнос
  monthlyPay: number;
  // Срок инвестирования (лет)
  deadline: number;
  // Процент инвестирование (% годовых)
  percent: number;
  // Ежегодный прирост во взносах
  annualGrowthRate?: number;
  // Начальная сумма
  initialAmount?: number;
}

export class Calculate {
  static getMonthlyPercent(percent: number): number {
    return ((percent / 100 + 1) ** (1 / 12) - 1) * 100;
  }

  static getFinancialExpectation(props: FinancialExpectationProperties): number[] {
    const monthsInYear = 12;
    const monthly = Calculate.getMonthlyPercent(props.percent);

    return Array.from(Array(props.deadline)).reduce(
      acc => ({
        monthlyPay: acc.monthlyPay + (props.annualGrowthRate || 0),
        amount: Array.from(Array(monthsInYear)).reduce(trunk => {
          const previousAmount = trunk.length ? trunk[trunk.length - 1] : props.initialAmount || 0;

          const result = previousAmount * (1 + monthly / 100) + acc.monthlyPay;
          return [...trunk, result];
        }, acc.amount)
      }),
      { amount: [], monthlyPay: props.monthlyPay }
    ).amount;
  }
}
