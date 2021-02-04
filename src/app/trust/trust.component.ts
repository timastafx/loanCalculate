import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType } from '../../../components/src/input-group/input-group.component';

interface IResultTransactions {
  months: number;
  deposit: string;
}

interface ResultLoan {
  months: number;
  totalPaid: string;
}

interface InputFormControl {
  amount: FormControl;
  monthlyFee: FormControl;
  interestRate: FormControl;
}

@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrustComponent implements OnInit {
  public amount = 1000;
  public payment = 30;
  public percent = 15;
  public loanResult: ResultLoan;
  public depositResult: IResultTransactions;
  public settingToggle = false;

  inputFormControls: InputFormControl;
  inputType = InputType;

  static loanCalculation(amount: number, payment: number, percent: number): ResultLoan {
    // колличество месяцев, которое производится выплата
    let monthsCount = 0;
    // осталось выплатить
    let loanBalance = amount;
    // всего выплачено
    let totalPaid = 0;

    while (true) {
      // Проверка на наличие задолженности и на возможность погашения кредита
      if (loanBalance <= 0) {
        break;
      } else if (loanBalance > amount) {
        monthsCount = -1;
        break;
      }

      loanBalance *= percent / 12 / 100 + 1;

      // Расчеет всей заплаченной суммы
      if (loanBalance >= payment) {
        totalPaid += +payment;
      } else {
        totalPaid += +loanBalance;
      }

      loanBalance -= payment;
      monthsCount += 1;
    }

    return {
      months: monthsCount,
      totalPaid: totalPaid.toFixed(2)
    };
  }

  static depositCalculation(
    amount: number,
    payment: number,
    period: number,
    percent: number = 7.5
  ): IResultTransactions {
    let monthsCount = 0;
    let deposit = 0;

    for (let i = 0; i < period; i++) {
      if (deposit <= amount) {
        monthsCount += 1;
      }
      deposit *= percent / 12 / 100 + 1;
      deposit += payment;
    }

    return {
      months: monthsCount,
      deposit: deposit.toFixed(2)
    };
  }

  ngOnInit(): void {
    this.inputFormControls = {
      amount: new FormControl('1000', [Validators.required]),
      interestRate: new FormControl('', [Validators.required]),
      monthlyFee: new FormControl('', [Validators.required])
    };
  }

  public buttonClick() {
    this.amount = +this.amount;
    this.payment = +this.payment;
    this.percent = +this.percent;
    this.loanResult = TrustComponent.loanCalculation(this.amount, this.payment, this.percent);
    this.depositResult = TrustComponent.depositCalculation(this.amount, this.payment, this.loanResult.months);

    console.log(this.percent);
  }

  public _spoilerValueChanged(value: boolean): void {
    this.settingToggle = value;
  }
}
