import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputType } from '../../../components/src/input-group/input-group.component';
import { OutputText, TextType } from '../../../components/src/output-text/output-text.component';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Calculate } from '../calculate';

@Component({
  selector: 'app-invest-plan',
  templateUrl: 'invest-plan.component.html',
  styleUrls: ['invest-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestPlanComponent implements OnInit {
  form: FormGroup;
  inputType = InputType;
  plan: number[];
  text: OutputText[][];

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0.5,0.4)'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      purpose: [1000, Validators.required],
      deadline: [10, Validators.required],
      percent: [15, Validators.required]
    });
  }

  calculate({ purpose, deadline, percent }) {
    let monthlyPay = 1;
    while (true) {
      const results = Calculate.getFinancialExpectation({
        monthlyPay: Number(monthlyPay),
        deadline: Number(deadline),
        percent: Number(percent)
      });

      if (results[results.length - 1] > purpose) {
        this.plan = results;
        break;
      }

      monthlyPay++;
    }

    this.text = this.generateText(this.plan, monthlyPay);
    this.lineChartData = [
      {
        data: [...this.plan],
        label: 'Money'
      }
    ];
    this.lineChartLabels = Array.from(new Array(this.lineChartData[0].data.length)).map((_, index) =>
      String(index + 1)
    );
  }

  private generateText(plan: number[], monthly: number): OutputText[][] {
    return [
      [
        { type: TextType.simple, value: 'Необходимо инвестировать по' },
        { type: TextType.highlighted, value: String(monthly) },
        { type: TextType.simple, value: 'рубля (-ей) в месяц' }
      ],
      ...(plan.map((item: number, index: number) => {
        return [
          { type: TextType.simple, value: 'В' },
          { type: TextType.highlighted, value: String(index + 1) },
          { type: TextType.simple, value: 'месяце сумма на счету должна составить' },
          { type: TextType.highlighted, value: String(item) }
        ];
      }) || [])
    ];
  }
}
