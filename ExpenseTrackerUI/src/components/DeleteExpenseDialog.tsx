import React, {useCallback} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {DefaultApi, ExpenseDto} from "../../generated-sources/openapi";
import {showErrorMessage, showSuccessMessage} from "../util.ts";

interface Props {
  toastRef: any;
  isIncome: boolean;
  expense: ExpenseDto;
  expenses: Array<ExpenseDto>;
  handleSetExpenses: Function;
  handleSetShowDeleteExpenseDialog: Function;
}

const DeleteExpenseDialog = ({toastRef, isIncome, expense, expenses, handleSetExpenses, handleSetShowDeleteExpenseDialog}: Props) => {

  const { id, description} = expense;

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  const deleteExpense = useCallback(() => {

    const deleteEntryCall = isIncome ? api.incomeIdDelete(id) : api.expenseIdDelete(id);

    deleteEntryCall.then(() => {
        showSuccessMessage(toastRef, `Successfully deleted expense ${description}`);
        const filteredExpenses = expenses.filter(a => a.id !== id);
        handleSetExpenses(filteredExpenses);
        handleSetShowDeleteExpenseDialog(false);
      })
      .catch(() => {
        showErrorMessage(toastRef, `Failed to delete expense ${description}`);
      });
  }, []);


  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={() => handleSetShowDeleteExpenseDialog(false)}/>
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => deleteExpense(id)}/>
    </React.Fragment>
  );

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
            footer={deleteProductDialogFooter} onHide={() => handleSetShowDeleteExpenseDialog(false)}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
        <span>
          Are you sure you want to delete <b>{expense.description}</b>?
        </span>
      </div>
    </Dialog>
  )
}

export default DeleteExpenseDialog;