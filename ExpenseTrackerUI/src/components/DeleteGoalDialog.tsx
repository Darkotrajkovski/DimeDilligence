import React, {useCallback} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {DefaultApi, GoalsDto} from "../../generated-sources/openapi";
import {showErrorMessage, showSuccessMessage} from "../util.ts";

interface Props {
  toastRef: any;
  goal: GoalsDto;
  goals: Array<GoalsDto>;
  handleSetGoals: Function;
  handleSetShowDeleteGoalDialog: Function;
}

const DeleteGoalDialog = ({toastRef, goal, goals, handleSetGoals, handleSetShowDeleteGoalDialog}: Props) => {

  const { id, description} = goal;

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  const deleteGoal = useCallback(() => {

    api.goalsIdDelete(id).then(() => {
        showSuccessMessage(toastRef, `Successfully deleted goal ${description}`);
        const filteredGoals = goals.filter(a => a.id !== id);
        handleSetGoals(filteredGoals);
        handleSetShowDeleteGoalDialog(false);
      })
      .catch(() => {
        showErrorMessage(toastRef, `Failed to delete goal ${description}`);
      });
  }, []);


  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={() => handleSetShowDeleteGoalDialog(false)}/>
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => deleteGoal(id)}/>
    </React.Fragment>
  );

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
            footer={deleteProductDialogFooter} onHide={() => handleSetShowDeleteGoalDialog(false)}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
        <span>
          Are you sure you want to delete <b>{goal.description}</b>?
        </span>
      </div>
    </Dialog>
  )
}

export default DeleteGoalDialog;