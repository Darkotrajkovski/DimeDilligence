import React, {useEffect, useRef, useState} from "react";
import {DataView} from 'primereact/dataview';
import {Button} from "primereact/button";
import {Nullable} from "primereact/ts-helpers";
import {Tag} from "primereact/tag";
import ExpenseDialog from "./ExpenseDialog.tsx";
import {DefaultApi, ExpenseCategoryDto, ExpenseDto} from "../../generated-sources/openapi";
import moment from "moment";
import {Toast} from "primereact/toast";
import {categoryIcons} from "../util.ts";
import DeleteExpenseDialog from "./DeleteExpenseDialog.tsx";

interface Props {
  date: Nullable<Date>
}

const Expense = ({date}: Props) => {


  const emptyExpense: ExpenseDto = {
    id: null,
    ownerId: 1,
    amount: 0,
    currency: 'USD',
    date: "2023-11-14",
    description: '',
    place: '',
    comment: '',
    category: ''
  };

  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState<boolean>(false);
  const [showDeleteExpenseDialog, setShowDeleteExpenseDialog] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseDto>();
  const [expense, setExpense] = useState<ExpenseDto>(emptyExpense);
  const toastRef = useRef(null);

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });
  
  useEffect(() => {
    api.expenseGet().then(a => setExpenses(a.data));
  }, []);

  const formatDate = date => {
    return moment(date).format('D MMM YYYY');
  }

  const getCategory = (expenseCategory: ExpenseCategoryDto | undefined) => {
    switch (expenseCategory) {
      case "Drinks":
        return 'success';
      case "Groceries":
        return 'warning';
      default:
        return null;
    }
  };

  const handleShowDeleteExpenseDialog = (expenseToDelete: ExpenseDto) => {
    setExpenseToDelete(expenseToDelete)
    setShowDeleteExpenseDialog(true);
  }

  const itemTemplate = (_expense: ExpenseDto) => {
    return (
      <>
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${categoryIcons(_expense.category)}`} alt={_expense.description} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{_expense.description}</div>
              <div className="flex align-items-center gap-3">
                <Tag severity={getCategory(_expense.category)}>
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag" />
                    <span className="font-semibold">{_expense.category}</span>
                  </span>
                </Tag>
              </div>
              <div>
                <b>{_expense.place}</b>: {_expense.comment}
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${_expense.amount}</span>
              <span className="text-2xl font-semibold">{formatDate(_expense.date)}</span>
            </div>
          </div>
        </div>
        <>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
          <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleShowDeleteExpenseDialog(_expense)} />
        </>
      </div>
      </>
    );
  };

  return (
    <div className="card">
      <Toast ref={toastRef} />
      <Button label="New" icon="pi pi-plus" severity="success" onClick={() => setShowAddExpenseDialog(true)} />
      <DataView value={expenses} itemTemplate={itemTemplate} />
      { showAddExpenseDialog && <ExpenseDialog toastRef={toastRef} expense={expense} handleSetExpense={setExpense} handleSetExpenses={setExpenses} handleSetShowProductDialog={() => setShowAddExpenseDialog(false)} />}
      { showDeleteExpenseDialog && <DeleteExpenseDialog toastRef={toastRef} expenses={expenses} expense={expenseToDelete} handleSetExpenses={setExpenses}  handleSetShowDeleteExpenseDialog={() => setShowDeleteExpenseDialog(false)} />}
    </div>
  )

}

export default Expense;