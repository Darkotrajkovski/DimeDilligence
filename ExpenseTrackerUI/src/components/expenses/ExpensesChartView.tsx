import React, {useEffect, useState} from "react";
import * as _ from 'lodash';
import {ExpenseDto} from "../../../generated-sources/openapi";
import {Chart} from "primereact/chart";
import {getCategoryColor} from "../../util.ts";
import {Dialog} from "primereact/dialog";
import {useTranslation} from "react-i18next";

interface Props {
  isIncome: boolean;
  expenses: ExpenseDto[];
  handleSetShowChartDialog: Function;
}

const ExpensesChartView = ({ isIncome, expenses, handleSetShowChartDialog }: Props) => {

  const { t} = useTranslation();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const groupedByCategory = _.groupBy(expenses, 'category');
    const result = _.mapValues(groupedByCategory, (group) => _.sumBy(group, 'amount'));
    const categories = Object.keys(result);
    const amounts = Object.values(result);

    const backgroundColors = categories.map((category) => documentStyle.getPropertyValue(getCategoryColor(isIncome, category)));

    const data = {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: backgroundColors,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, [expenses]);

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} draggable={false} modal header={t('chart.monthlyView')} onHide={() => handleSetShowChartDialog(false)}>
      <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </Dialog>
  )

}

export default ExpensesChartView;