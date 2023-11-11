import {useState} from "react";
import {TabMenu} from "primereact/tabmenu";
import {MenuItem} from "primereact/menuitem";
import styled from "styled-components";
import {Nullable} from "primereact/ts-helpers";
import {Calendar} from "primereact/calendar";
import Expense from "./Expense.tsx";

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Home = () => {

  const items: MenuItem[] = [
    {label: 'Incomes', icon: 'pi pi-fw pi-home'},
    {label: 'Expenses', icon: 'pi pi-fw pi-calendar'},
    {label: 'Savings', icon: 'pi pi-fw pi-pencil'},
  ];

  const [date, setDate] = useState<Nullable<Date>>(null);


  return (
    <RowWrapper>
      <ColumnWrapper>
        <TabMenu model={items}/>
        <div className="card flex justify-content-center">
          <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" showIcon/>
        </div>
      </ColumnWrapper>
      <Expense date={date} />
    </RowWrapper>
  )

}

export default Home;