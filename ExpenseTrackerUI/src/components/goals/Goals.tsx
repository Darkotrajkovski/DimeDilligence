import React, {useEffect, useRef, useState} from "react";
import * as _ from "lodash";
import {Skeleton} from "primereact/skeleton";
import {GoalsDto} from "../../../generated-sources/openapi";
import {DataView} from "primereact/dataview";
import {getGoalCategoryColor, goalIcons} from "../../util.ts";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Calendar} from "primereact/calendar";
import moment from "moment/moment";
import GoalDialog from "./GoalDialog.tsx";
import DeleteGoalDialog from "./DeleteGoalDialog.tsx";
import {useTranslation} from "react-i18next";
import useApi from "../../hooks/useApi.ts";
import {useAuth} from "../../context/AuthContext.tsx";

const Goals = () => {

  const { userId } = useAuth();

  const emptyGoal: GoalsDto = {
    id: null,
    ownerId: userId,
    amount: 0,
    currency: 'USD',
    date: moment(new Date()).format('YYYY-MM-DD'),
    description: '',
    category: ''
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [goals, setGoals] = useState<GoalsDto[]>();
  const [date, setDate] = useState<Date>(new Date());
  const toastRef = useRef(null);
  const [showAddGoalDialog, setShowAddGoalDialog] = useState<boolean>(false);
  const [showEditGoalDialog, setShowEditGoalDialog] = useState<boolean>(false);
  const [showDeleteGoalDialog, setShowDeleteGoalDialog] = useState<boolean>(false);
  const [goalToDelete, setGoalToDelete] = useState<GoalsDto>();
  const [goal, setGoal] = useState<GoalsDto>(emptyGoal);

  const { t } = useTranslation();
  const [api, requestConfig] = useApi();

  useEffect(() => {
    setLoading(true);
    if (!api) {
      return
    }
    api.goalsGet(requestConfig)
      .then(response => {
        setGoals(response.data);
      })
      .catch();

    setLoading(false);
  }, [api]);

  const formatDate = (date) => {
    return moment(date).format('D MMM YYYY');
  }

  const handleShowDeleteGoalDialog = (goalToDelete: GoalsDto) => {
    setGoalToDelete(goalToDelete)
    setShowDeleteGoalDialog(true);
  }

  const handleShowEditGoalDialog = (goalDto: GoalsDto) => {
    setGoal(goalDto)
    setShowEditGoalDialog(true);
  }

  const itemTemplate = (_goal: GoalsDto) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" style={{
            width: '150px',
            height: '150px',
            objectFit: 'contain',
            backgroundColor: 'white'
          }} src={goalIcons(_goal.category)} alt={_goal.description} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{_goal.description}</div>
              <div className="flex align-items-center gap-3">
                <Tag style={{background: `var(${getGoalCategoryColor(_goal.category)})`}}>
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag" />
                    <span className="font-semibold">{_goal.category}</span>
                  </span>
                </Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 line-height-4">
              <span className="text-2xl font-semibold">${_goal.amount}</span>
              <span className="text-2xl font-semibold">{formatDate(_goal.date)}</span>
              <div className="flex flex-row">
                <Button icon="pi pi-pencil" outlined className="mr-2" onClick={() => handleShowEditGoalDialog(_goal)} />
                <Button icon="pi pi-trash" outlined severity="danger" onClick={() => handleShowDeleteGoalDialog(_goal)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toastRef}/>
      <Calendar className="mr-2" value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="M yy" showIcon/>
      <Button className="mr-2" label={t('goals.add.label')} icon="pi pi-plus" severity="success" onClick={() => setShowAddGoalDialog(true)}/>
      {loading
        ? _.range(5, 10).map(() => <Skeleton className="mt-4" width="100%" height="4rem" />)
        : <DataView value={goals} itemTemplate={itemTemplate} />
      }
      {showAddGoalDialog &&
          <GoalDialog toastRef={toastRef} isEditMode={false} goal={goal} handleSetGoal={setGoal}
                      handleSetDefaultGoal={() => setGoal(emptyGoal)}
                      handleSetGoals={setGoals}
                      handleSetShowGoalDialog={() => setShowAddGoalDialog(false)}/>}

      {showEditGoalDialog &&
          <GoalDialog toastRef={toastRef} isEditMode goal={goal} handleSetGoal={setGoal}
                      handleSetDefaultGoal={() => setGoal(emptyGoal)}
                      handleSetGoals={setGoals}
                      handleSetShowGoalDialog={() => setShowEditGoalDialog(false)}/>}

      {showDeleteGoalDialog &&
          <DeleteGoalDialog toastRef={toastRef} goals={goals} goal={goalToDelete}
                               handleSetGoals={setGoals}
                               handleSetShowDeleteGoalDialog={() => setShowDeleteGoalDialog(false)}/>}
    </>
  )
}

export default Goals;