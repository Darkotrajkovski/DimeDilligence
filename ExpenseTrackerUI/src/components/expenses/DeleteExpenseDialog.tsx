import React, {useCallback} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {ExpenseDto} from "../../../generated-sources/openapi";
import {showErrorMessage, showSuccessMessage} from "../../util.ts";
import {useTranslation, Trans} from "react-i18next";
import useApi from "../../hooks/useApi.ts";

interface Props {
  toastRef: any;
  isIncome: boolean;
  expense: ExpenseDto;
  expenses: Array<ExpenseDto>;
  handleSetExpenses: Function;
  handleSetShowDeleteExpenseDialog: Function;
}

const DeleteExpenseDialog = ({toastRef, isIncome, expense, expenses, handleSetExpenses, handleSetShowDeleteExpenseDialog}: Props) => {

  const { t} = useTranslation();
  const { id, description} = expense;

  const [api, requestConfig] = useApi();

  const deleteExpense = useCallback(() => {
    const deleteEntryCall = isIncome ? api.incomeIdDelete(id, requestConfig) : api.expenseIdDelete(id, requestConfig);
    const prefix = isIncome ? 'incomes' : 'expenses';
    deleteEntryCall.then(() => {

      showSuccessMessage(toastRef, t(`${prefix}.delete.success`, { description }));
      const filteredExpenses = expenses.filter(a => a.id !== id);
      handleSetExpenses(filteredExpenses);
      handleSetShowDeleteExpenseDialog(false);
    })
      .catch(() => {
        showErrorMessage(toastRef, t(`${prefix}.delete.fail`, { description }));
      });
  }, [api])

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label={t('common.no')} icon="pi pi-times" outlined onClick={() => handleSetShowDeleteExpenseDialog(false)}/>
      <Button label={t('common.yes')} icon="pi pi-check" severity="danger" onClick={() => deleteExpense(id)}/>
    </React.Fragment>
  );

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header={t('common.confirm')} modal
            footer={deleteProductDialogFooter} onHide={() => handleSetShowDeleteExpenseDialog(false)}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
        <span>
          <Trans i18nKey="common.deleteConfirmation" values={{description: expense.description}}/>
        </span>
      </div>
    </Dialog>
  )
}

export default DeleteExpenseDialog;