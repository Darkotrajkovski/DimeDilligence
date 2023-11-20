import React from "react";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {DefaultApi, ExpenseCategoryDto, ExpenseDto, IncomeCategoryDto} from "../../generated-sources/openapi";
import {categoryIcons, showErrorMessage, showSuccessMessage} from "../util.ts";

interface Props {
  toastRef: any;
  isIncome: boolean;
  isEditMode: boolean;
  expense: ExpenseDto;
  handleSetExpense: Function;
  handleSetExpenses: Function;
  handleSetDefaultExpense: Function;
  handleSetShowProductDialog: Function;
}

const ExpenseDialog = ({toastRef, isIncome, isEditMode, expense, handleSetDefaultExpense, handleSetExpense, handleSetExpenses, handleSetShowProductDialog}: Props) => {

  const expenseCategories = Object.keys(ExpenseCategoryDto);
  const incomeCategories = Object.keys(IncomeCategoryDto)

  const {
    description,
    category,
    amount,
    currency,
    date,
    place,
    comment
  } = expense;

  const onInputChange = (value: any, name: string) => {
    let _expense = {...expense};
    _expense[`${name}`] = value;
    handleSetExpense(_expense);

  };

  const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
    const val = e.value || 0;
    let _expense = {...expense};
    _expense[`${name}`] = val;
    handleSetExpense(_expense);
  };

  const saveProduct = () => {
    const api = new DefaultApi({
      basePath: 'http://localhost:8080/v1',
    });

    const successMessage = isEditMode ? `Successfully edited expense: ${expense.description}` : `Successfully added expense: ${expense.description}`;
    const errorMessage = isEditMode ? `Failed to edit expense: ${expense.description}` : `Failed to add expense: ${expense.description}`;

    const createEntryCall = isIncome ? api.incomePost(expense) : api.expensePost(expense);

    createEntryCall
      .then((response) => {
        handleSetExpenses(response.data)
        showSuccessMessage(toastRef, successMessage)
      })
      .catch(() => showErrorMessage(toastRef, errorMessage));

      handleSetShowProductDialog(false);
      handleSetDefaultExpense();

  };

  const closeDialog = () => {
    handleSetDefaultExpense();
    handleSetShowProductDialog(false);
  }

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={closeDialog}/>
      <Button label="Save" icon="pi pi-check" onClick={saveProduct}/>
    </>
  );

  const categoryOptionTemplate = (name: string) => {
    const icon = categoryIcons(isIncome, name);

    return (
      <div className="flex align-items-center">
        <img alt={name} src={icon} className={`mr-2`} style={{ width: '18px' }} />
        <div>{name}</div>
      </div>
    );
  };

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Product Details"
            modal className="p-fluid" footer={productDialogFooter}
            onHide={closeDialog}
            draggable={false}>

      <div className="field">
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <InputText
          id="description"
          value={description}
          onChange={(e) => {
            onInputChange(e.target.value, 'description')
          }}
          required/>
      </div>

      <div className="card flex flex-column md:flex-row gap-3">
        <div className="field">
          <label htmlFor="amount" className="font-bold">
            Amount
          </label>
          <InputNumber
            id="amount"
            value={amount}
            mode="currency"
            currency={currency || 'CHF'}
            locale="en-US"
            onValueChange={e => onInputNumberChange(e, 'amount')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="date" className="font-bold">
            Date
          </label>
          <Calendar
            value={new Date(date)}
            onChange={(e) => onInputChange(e.value, 'date')}
            showIcon
            required
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 field">
        <div className="field">
          <label htmlFor="category" className="font-bold">
            Category
          </label>
          <Dropdown
            value={category}
            onChange={(e) => onInputChange(e.value, 'category')}
            options={isIncome ? incomeCategories : expenseCategories}
            valueTemplate={categoryOptionTemplate} itemTemplate={categoryOptionTemplate}
            placeholder="Select a category"
            className="w-full md:w-14rem"/>
        </div>

        <div className="field">
          <label htmlFor="place" className="font-bold">
            Place
          </label>
          <InputText
            id="place"
            value={place}
            onChange={(e) => onInputChange(e.target.value, 'place')}
            required/>
        </div>
      </div>

      <div className="field">
        <label htmlFor="comment" className="font-bold">
          Comment
        </label>
        <InputText
          id="comment"
          value={comment}
          onChange={(e) => onInputChange(e.target.value, 'comment')}
          required/>
      </div>

    </Dialog>
  )
}

export default ExpenseDialog;