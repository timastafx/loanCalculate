import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from '../../../components/src/input-group/input-group.component';

interface IResultTransactions {
  months: number;
  deposit: string;
}

interface ResultLoan {
  months: number;
  totalPaid: string;
}

interface InputForm {
  amount: string;
  monthlyFee: string;
  interestRate: string;
  depositPercent: string;
}

@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrustComponent implements OnInit {
  public loanResult: ResultLoan;
  public depositResult: IResultTransactions;
  public settingToggle = false;

  inputFormControls: FormGroup;
  inputType = InputType;

  constructor(private fb: FormBuilder) {
  }

  static loanCalculation({ amount, monthlyFee, interestRate }: InputForm): ResultLoan {
    // колличество месяцев, которое производится выплата
    let monthsCount = 0;
    // осталось выплатить
    let loanBalance = Number(amount);
    // всего выплачено
    let totalPaid = 0;

    while (true) {
      // Проверка на наличие задолженности и на возможность погашения кредита
      if (loanBalance <= 0) {
        break;
      } else if (loanBalance > Number(amount)) {
        monthsCount = -1;
        break;
      }

      loanBalance *= Number(interestRate) / 12 / 100 + 1;

      // Расчеет всей заплаченной суммы
      if (loanBalance >= Number(monthlyFee)) {
        totalPaid += +monthlyFee;
      } else {
        totalPaid += +loanBalance;
      }

      loanBalance -= Number(monthlyFee);
      monthsCount += 1;
    }

    return {
      months: monthsCount,
      totalPaid: totalPaid.toFixed(2)
    };
  }

  static depositCalculation(
    { amount, monthlyFee, depositPercent }: InputForm,
    period: number
  ): IResultTransactions {
    let monthsCount = 0;
    let deposit = 0;

    for (let i = 0; i < period; i++) {
      if (deposit <= Number(amount)) {
        monthsCount += 1;
      }

      deposit *= Number(depositPercent) / 12 / 100 + 1;
      deposit += Number(monthlyFee);
    }

    return {
      months: monthsCount,
      deposit: deposit.toFixed(2)
    };
  }

  ngOnInit(): void {
    this.inputFormControls = this.fb.group({
      amount: [1000, Validators.required],
      interestRate: [24, Validators.required],
      monthlyFee: [30, Validators.required],
      depositPercent: 7.5
    });
  }

  public calculate() {
    this.loanResult = TrustComponent.loanCalculation(this.inputFormControls.value);
    this.depositResult = TrustComponent.depositCalculation(this.inputFormControls.value, this.loanResult.months);
  }

  public _spoilerValueChanged(value: boolean): void {
    this.settingToggle = value;
  }
}
