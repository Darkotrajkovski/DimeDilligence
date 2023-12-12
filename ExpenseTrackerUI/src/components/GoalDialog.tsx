import React from "react";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {DefaultApi, GoalsCategoryDto, GoalsDto} from "../../generated-sources/openapi";
import {goalIcons, showErrorMessage, showSuccessMessage} from "../util.ts";

interface Props {
  toastRef: any;
  isEditMode: boolean;
  goal: GoalsDto;
  handleSetGoal: Function;
  handleSetGoals: Function;
  handleSetDefaultGoal: Function;
  handleSetShowGoalDialog: Function;
}

const GoalDialog = ({toastRef, isEditMode, goal, handleSetDefaultGoal, handleSetGoal, handleSetGoals, handleSetShowGoalDialog}: Props) => {

  const goalCategories = Object.keys(GoalsCategoryDto);

  const {
    description,
    category,
    amount,
    currency,
    date
  } = goal;

  const onInputChange = (value: any, name: string) => {
    let _goal = {...goal};
    _goal[`${name}`] = value;
    handleSetGoal(_goal);

  };

  const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
    const val = e.value || 0;
    let _goal = {...goal};
    _goal[`${name}`] = val;
    handleSetGoal(_goal);
  };

  const saveGoal = () => {
    const api = new DefaultApi({
      basePath: 'http://localhost:8080/v1',
    });

    const successMessage = isEditMode ? `Successfully edited goal: ${goal.description}` : `Successfully added goal: ${goal.description}`;
    const errorMessage = isEditMode ? `Failed to edit goal: ${goal.description}` : `Failed to add goal: ${goal.description}`;

    api.goalsPost(goal)
      .then((response) => {
        console.log(response)
        handleSetGoals(response.data)
        showSuccessMessage(toastRef, successMessage)
      })
      .catch(() => showErrorMessage(toastRef, errorMessage));

      handleSetShowGoalDialog(false);
      handleSetDefaultGoal();
  };

  const closeDialog = () => {
    handleSetDefaultGoal();
    handleSetShowGoalDialog(false);
  }

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={closeDialog}/>
      <Button label="Save" icon="pi pi-check" onClick={saveGoal}/>
    </>
  );

  const categoryOptionTemplate = (name: string, isItem) => {
    const icon = goalIcons(name);

    return (
      <div className="flex align-items-center">
        <img alt={name} src={icon} className={`mr-2`} style={{ width: '18px' }} />
        <div>{isItem ? name : GoalsCategoryDto[name]}</div>
      </div>
    );
  };

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header="GoalDetails"
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
            options={goalCategories}
            valueTemplate={value => categoryOptionTemplate(value, true)}
            itemTemplate={value => categoryOptionTemplate(value, false)}
            placeholder="Select a category"
            className="w-full md:w-14rem"/>
        </div>
      </div>
    </Dialog>
  )
}

export default GoalDialog;