import * as _ from 'lodash';
import Login from "./authentication/Login.tsx";
import Home from "./Home.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import Welcome from "./Welcome.tsx";

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      {_.isEmpty(token) ? <Welcome/> : <Home/>}
    </>

  )
}

export default Dashboard;