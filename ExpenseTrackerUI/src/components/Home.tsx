import React, {useState} from "react";
import {MenuItem} from "primereact/menuitem";
import Expenses from "./Expenses.tsx";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import Projection from "./Projection.tsx";
import Goals from "./Goals.tsx";

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';
const SAVINGS = 'SAVINGS';
const FUTURE_GOALS = 'FUTURE_GOALS';
const PROJECTION = 'PROJECTION';

const Home = () => {

  const items: MenuItem[] = [
    {id: INCOME, label: 'Incomes', icon: 'src/assets/income.svg'},
    {id: EXPENSE, label: 'Expenses', icon: 'src/assets/expense.svg'},
    {id: SAVINGS, label: 'Savings', icon: 'src/assets/piggyBank.png'},
    {id: FUTURE_GOALS, label: 'Future goals', icon: 'src/assets/futureGoals.png'},
    {id: PROJECTION, label: 'Projection', icon: 'src/assets/projection.png'},
  ];

  const [selectedTab, setSelectedTab] = useState(EXPENSE);

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
              />)}
        </Card>
        <Card className="w-9 h-full">
          {selectedTab === INCOME && <Expenses isIncome />}
          {selectedTab === EXPENSE && <Expenses />}
          {selectedTab === PROJECTION && <Projection />}
          {selectedTab === FUTURE_GOALS && <Goals />}
        </Card>
    </div>
  )

}

export default Home;