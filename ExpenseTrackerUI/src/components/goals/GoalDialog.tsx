import React, {useCallback} from "react";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {GoalsCategoryDto, GoalsDto} from "../../../generated-sources/openapi";
import {goalIcons, showErrorMessage, showSuccessMessage} from "../../util.ts";
import {useTranslation} from "react-i18next";
import useApi from "../../hooks/useApi.ts";

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

  const { t} = useTranslation();
  const [api, requestConfig] = useApi();
  const goalCategories = Object.keys(GoalsCategoryDto);
  const editModeTextKey = isEditMode ? 'edit' : 'add';

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

  const saveGoal = useCallback(() => {

    api.goalsPost(goal, requestConfig)
      .then((response) => {
        handleSetGoals(response.data)
        showSuccessMessage(toastRef, t(`goals.${editModeTextKey}.success`, { description }))
      })
      .catch(() => showErrorMessage(toastRef, t(`goals.${editModeTextKey}.fail`, { description })));

      handleSetShowGoalDialog(false);
      handleSetDefaultGoal();
  }, [api, goal]);

  const closeDialog = () => {
    handleSetDefaultGoal();
    handleSetShowGoalDialog(false);
  }

  const productDialogFooter = (
    <>
      <Button label={t('common.cancel')} icon="pi pi-times" outlined onClick={closeDialog}/>
      <Button label={t('common.save')} icon="pi pi-check" onClick={saveGoal}/>
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
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header={t(`goals.${editModeTextKey}.header.label`)}
            modal className="p-fluid" footer={productDialogFooter}
            onHide={closeDialog}
            draggable={false}>

      <div className="field">
        <label htmlFor="description" className="font-bold">
          {t('common.description')}
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
            {t('common.amount')}
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
            {t('common.date')}
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
            {t('common.category')}
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