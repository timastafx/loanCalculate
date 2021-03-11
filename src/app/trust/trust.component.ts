import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from '../../../components/src/input-group/input-group.component';
import { OutputText, TextType } from '../../../components/src/output-text/output-text.component';

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
  loanResult: ResultLoan;
  depositResult: IResultTransactions;
  outputText: OutputText[][];

  inputFormControls: FormGroup;
  inputType = InputType;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputFormControls = this.fb.group({
      amount: [1000, Validators.required],
      interestRate: [24, Validators.required],
      monthlyFee: [30, Validators.required],
      depositPercent: 7.5
    });
  }

  calculate() {
    this.loanResult = this.loanCalculation(this.inputFormControls.value);
    this.depositResult = this.depositCalculation(this.inputFormControls.value, this.loanResult.months);
    this.outputText = this.getOutputText(this.loanResult, this.depositResult);
  }

  protected loanCalculation({ amount, monthlyFee, interestRate }: InputForm): ResultLoan {
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

  protected depositCalculation({ amount, monthlyFee, depositPercent }: InputForm, period: number): IResultTransactions {
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

  protected getOutputText(loanResult: ResultLoan, depositResult: IResultTransactions): OutputText[][] {
    return [
      [
        { type: TextType.simple, value: 'Кредит будет полностью погашен через' },
        { type: TextType.highlighted, value: String(loanResult.months) },
        { type: TextType.simple, value: 'месяц(-ев)' }
      ],
      [
        { type: TextType.simple, value: 'Сумма выплат в пользу банка составит' },
        { type: TextType.highlighted, value: String(loanResult.totalPaid) },
        { type: TextType.simple, value: 'рубля(-ей)' }
      ],
      [
        { type: TextType.simple, value: 'Накопление той же суммы займет' },
        { type: TextType.highlighted, value: String(depositResult.months) },
        { type: TextType.simple, value: 'месяц(-ев)' }
      ],
      [
        { type: TextType.simple, value: 'Через' },
        { type: TextType.highlighted, value: String(loanResult.months) },
        { type: TextType.simple, value: 'месяца(-ев) сумма накоплений составит' },
        { type: TextType.highlighted, value: String(depositResult.deposit) },
        { type: TextType.simple, value: 'рубля(-ей)' }
      ]
    ];
  }
}
