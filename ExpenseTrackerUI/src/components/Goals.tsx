import React, {useEffect, useMemo, useState} from "react";
import {Chart} from "primereact/chart";
import {Calendar} from "primereact/calendar";
import {Skeleton} from "primereact/skeleton";
import {DefaultApi} from "../../generated-sources/openapi";
import moment from "moment";

const Goals = () => {

  const [goals, setGoals] = useState<number[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  useEffect(() => {
    setLoading(true);
    const year = moment(date).year();
    console.log(date, year)
    api.projectionYearGet(year)
      .then(projection => {
        setIncomes(projection.data.incomes);
        setExpenses(projection.data.expenses);
      })
      .catch();

    setLoading(false);
  }, [date]);

  const chartData = useMemo(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
      {
        label: 'Incomes',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        yAxisID: 'y',
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        data: incomes
      },
      {
        label: 'Expenses',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--red-500'),
        yAxisID: 'y',
        tension: 0.4,
        backgroundColor: documentStyle.getPropertyValue('--red-500'),
        data: expenses
      }
    ]
    }
  }, [incomes, expenses]);

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

export default Goals;