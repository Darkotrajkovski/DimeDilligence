import React, {useState} from "react";
import {MenuItem} from "primereact/menuitem";
import Expenses from "./expenses/Expenses.tsx";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import Projection from "./Projection.tsx";
import Goals from "./goals/Goals.tsx";
import SettingsDialog from "./settings/SettingsDialog.tsx";
import {useTranslation} from "react-i18next";

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';
const FUTURE_GOALS = 'FUTURE_GOALS';
const PROJECTION = 'PROJECTION';

const Home = () => {

  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(INCOME);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const items: MenuItem[] = [
    {id: INCOME, label: t('home.label.income'), icon: 'src/assets/income.svg'},
    {id: EXPENSE, label: t('home.label.expense'), icon: 'src/assets/expense.svg'},
    {id: FUTURE_GOALS, label: t('home.label.futureGoals'), icon: 'src/assets/futureGoals.png'},
    {id: PROJECTION, label: t('home.label.projection'), icon: 'src/assets/projection.png'},
  ];

  const findSelectedItem = () => items.find(item => item.id === selectedTab);

  return (

      <div className="flex flex-row m-4 gap-5 h-full">
        <Card className="w-3 h-full">
          <div className="flex flex-row">
            <img src={findSelectedItem().icon} width={100} className="mr-2"/>
            <h1>Dime Diligence</h1>
          </div>
          {items.map(value =>
            <Button
              label={value.label}
              onClick={() => setSelectedTab(value.id)}
              outlined
              size="large"
              className="md:m-1 w-full"
              />
            )
          }
          <Button onClick={() => setShowSettingsDialog(true)} icon="pi pi-cog" className="md:m-1" />
        </Card>
        <Card className="w-9 h-full">
          {selectedTab === INCOME && <Expenses isIncome />}
          {selectedTab === EXPENSE && <Expenses />}
          {selectedTab === PROJECTION && <Projection />}
          {selectedTab === FUTURE_GOALS && <Goals />}
        </Card>

        {showSettingsDialog && <SettingsDialog handleSetShowSettingsDialog={setShowSettingsDialog} />}
    </div>
  )

}

export default Home;