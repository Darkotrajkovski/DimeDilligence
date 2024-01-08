import React, {useCallback} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {GoalsDto} from "../../../generated-sources/openapi";
import {showErrorMessage, showSuccessMessage} from "../../util.ts";
import {Trans, useTranslation} from "react-i18next";
import useApi from "../../hooks/useApi.ts";

interface Props {
  toastRef: any;
  goal: GoalsDto;
  goals: Array<GoalsDto>;
  handleSetGoals: Function;
  handleSetShowDeleteGoalDialog: Function;
}

const DeleteGoalDialog = ({toastRef, goal, goals, handleSetGoals, handleSetShowDeleteGoalDialog}: Props) => {

  const { t } = useTranslation();
  const { id, description} = goal;

  const [api, requestConfig] = useApi();

  const deleteGoal = useCallback(() => {

    api.goalsIdDelete(id, requestConfig).then(() => {
        showSuccessMessage(toastRef, t('goals.delete.success', { description }));
        const filteredGoals = goals.filter(a => a.id !== id);
        handleSetGoals(filteredGoals);
        handleSetShowDeleteGoalDialog(false);
      })
      .catch(() => {
        showErrorMessage(toastRef, t('goals.delete.success', { description }));
      });
  }, [api]);


  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label={t('common.no')} icon="pi pi-times" outlined onClick={() => handleSetShowDeleteGoalDialog(false)}/>
      <Button label={t('common.yes')} icon="pi pi-check" severity="danger" onClick={() => deleteGoal(id)}/>
    </React.Fragment>
  );

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header={t('common.confirm')} modal
            footer={deleteProductDialogFooter} onHide={() => handleSetShowDeleteGoalDialog(false)}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
        <span>
          <Trans i18nKey="common.deleteConfirmation" values={{description: goal.description}}/>
        </span>
      </div>
    </Dialog>
  )
}

export default DeleteGoalDialog;