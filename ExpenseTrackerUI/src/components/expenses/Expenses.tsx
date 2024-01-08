import React, {useEffect, useRef, useState} from "react";
import * as _ from "lodash";
import {DataView} from 'primereact/dataview';
import {Button} from "primereact/button";
import {Tag} from "primereact/tag";
import ExpenseDialog from "./ExpenseDialog.tsx";
import {
  ExpenseDto,
  IncomeDto
} from "../../../generated-sources/openapi";
import moment from "moment";
import {Toast} from "primereact/toast";
import {categoryIcons, getCategoryColor} from "../../util.ts";
import DeleteExpenseDialog from "./DeleteExpenseDialog.tsx";
import {Skeleton} from "primereact/skeleton";
import {Calendar} from "primereact/calendar";
import ExpensesChartView from "./ExpensesChartView.tsx";
import {useTranslation} from "react-i18next";
import useApi from "../../hooks/useApi.ts";
import {useAuth} from "../../context/AuthContext.tsx";

interface Props {
  isIncome: boolean;
}

const Expenses = ({isIncome}: Props) => {

  const { userId } = useAuth();

  const emptyExpense: ExpenseDto = {
    id: null,
    ownerId: userId,
    amount: 0,
    currency: 'USD',
    date: moment(new Date()).format('YYYY-MM-DD'),
    description: '',
    place: '',
    comment: '',
    category: ''
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState<boolean>(false);
  const [showEditExpenseDialog, setShowEditExpenseDialog] = useState<boolean>(false);
  const [showDeleteExpenseDialog, setShowDeleteExpenseDialog] = useState<boolean>(false);
  const [showChartDialog, setShowChartDialog] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseDto>();
  const [expense, setExpense] = useState<ExpenseDto>(emptyExpense);
  const toastRef = useRef(null);

  const { t} = useTranslation();
  const [api, requestConfig] = useApi();

  useEffect(() => {
    setLoading(true);
    if (!api) {
      return;
    }
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const getEntriesCall = isIncome ? api.incomeMonthDateGet(formattedDate, requestConfig) : api.expenseMonthDateGet(formattedDate, requestConfig);

    getEntriesCall.then(a => {
      setExpenses(a.data);
      setLoading(false)
    });
  }, [date, api]);

  const formatDate = (date) => {
    return moment(date).format('D MMM YYYY');
  }

  const handleShowDeleteExpenseDialog = (expenseToDelete: ExpenseDto) => {
    setExpenseToDelete(expenseToDelete)
    setShowDeleteExpenseDialog(true);
  }

  const handleShowEditExpenseDialog = (expenseDto: ExpenseDto) => {
    setExpense(expenseDto)
    setShowEditExpenseDialog(true);
  }

  const itemTemplate = (_expense: ExpenseDto | IncomeDto) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" style={{
            width: '150px',
            height: '150px',
            objectFit: 'contain',
            backgroundColor: 'white'
          }} src={categoryIcons(isIncome, _expense.category)} alt={_expense.description} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{_expense.description}</div>
              <div className="flex align-items-center gap-3">
                <Tag style={{background: `var(${getCategoryColor(isIncome, _expense.category)})`}}>
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag" />
                    <span className="font-semibold">{_expense.category}</span>
                  </span>
                </Tag>
              </div>
              <div>
                  <b>{_expense.place}</b>{_expense.comment !== '' && `: ${_expense.comment}`}
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 line-height-4">
              <span className="text-2xl font-semibold">${_expense.amount}</span>
              <span className="text-2xl font-semibold">{formatDate(_expense.date)}</span>
              <div className="flex flex-row">
                <Button icon="pi pi-pencil" outlined className="mr-2" onClick={() => handleShowEditExpenseDialog(_expense)} />
                <Button icon="pi pi-trash" outlined severity="danger" onClick={() => handleShowDeleteExpenseDialog(_expense)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
      <div className="card" key={expense.id}>
        <Toast ref={toastRef}/>
        <Calendar className="mr-2" value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="M yy" showIcon/>
        <Button className="mr-2" label={isIncome ? t('incomes.add.label') : t('expenses.add.label')} icon="pi pi-plus" severity="success" onClick={() => setShowAddExpenseDialog(true)}/>
        <Button icon="pi pi-chart-pie" onClick={() => setShowChartDialog(true)}/>
        {loading
          ? _.range(5, 10).map(() => <Skeleton className="mt-4" width="100%" height="4rem" />)
          : <DataView value={expenses} itemTemplate={itemTemplate} />
        }
        {showAddExpenseDialog &&
            <ExpenseDialog toastRef={toastRef} isIncome={isIncome} isEditMode={false} expense={expense} handleSetExpense={setExpense}
                           handleSetExpenses={setExpenses}
                           handleSetShowExpenseDialog={() => setShowAddExpenseDialog(false)}
                           handleSetDefaultExpense={() => setExpense(emptyExpense)}/>}
        {showEditExpenseDialog &&
            <ExpenseDialog toastRef={toastRef} isIncome={isIncome} isEditMode expense={expense} handleSetExpense={setExpense}
                           handleSetExpenses={setExpenses}
                           handleSetShowExpenseDialog={() => setShowEditExpenseDialog(false)}
                           handleSetDefaultExpense={() => setExpense(emptyExpense)}/>}
        {showDeleteExpenseDialog &&
            <DeleteExpenseDialog toastRef={toastRef} isIncome={isIncome} expenses={expenses} expense={expenseToDelete}
                                 handleSetExpenses={setExpenses}
                                 handleSetShowDeleteExpenseDialog={() => setShowDeleteExpenseDialog(false)}/>}
        {showChartDialog &&
            <ExpensesChartView isIncome={isIncome} expenses={expenses} handleSetShowChartDialog={() => setShowChartDialog(false)}/>}
      </div>
  );

}

export default Expenses;