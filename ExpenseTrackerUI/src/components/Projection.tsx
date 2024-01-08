import React, {useEffect, useMemo, useState} from "react";
import {Chart} from "primereact/chart";
import {Calendar} from "primereact/calendar";
import {Skeleton} from "primereact/skeleton";
import moment from "moment";
import {useTranslation} from "react-i18next";
import useApi from "../hooks/useApi.ts";

const Projection = () => {

  const [incomes, setIncomes] = useState<number[]>();
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());

  const { t, i18n} = useTranslation();

  const [api, requestConfig] = useApi();

  useEffect(() => {
    setLoading(true);
    if (!api) {
      return;
    }
    const year = moment(date).year();
    api.projectionYearGet(year, requestConfig)
      .then(projection => {
        setIncomes(projection.data.incomes);
        setExpenses(projection.data.expenses);
      })
      .catch();

    setLoading(false);
  }, [date, api]);

  const chartData = useMemo(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
      labels: [
        t('months.january'),
        t('months.february'),
        t('months.march'),
        t('months.april'),
        t('months.may'),
        t('months.june'),
        t('months.july'),
        t('months.august'),
        t('months.september'),
        t('months.october'),
        t('months.november'),
        t('months.december'),
      ],
        datasets: [
      {
        label: t('incomes.label'),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        yAxisID: 'y',
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        data: incomes
      },
      {
        label: t('expenses.label'),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--red-500'),
        yAxisID: 'y',
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue('--red-500'),
        data: expenses
      }
    ]
    }
  }, [incomes, expenses, i18n.language]);

  const chartOptions = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          fill: true
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      }
    }
  };

  return (
    <>
      <Calendar className="mr-2" value={date} onChange={(e) => setDate(e.value)} view="year" dateFormat="yy" showIcon/>
      {loading
        ? <Skeleton className="mt-2" height="20rem"/>
        : <Chart type="line" data={chartData} options={chartOptions} key={date}/>
      }
    </>
  )
}

export default Projection;