import * as _ from 'lodash';
import Login from "./authentication/Login.tsx";
import Home from "./Home.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      {_.isEmpty(token) ? <Login/> : <Home/>}
    </>

  )
}

export default Dashboard;