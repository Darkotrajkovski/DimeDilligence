import {InputText} from "primereact/inputtext";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {useState} from "react";
import {Password} from "primereact/password";
import {DefaultApi} from "../../../generated-sources/openapi";
import {useAuth} from "../../context/AuthContext.tsx";

const Login = () => {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerSurname, setRegisterSurname] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const {
    setAuthUser,
    setUserId,
    setToken
  } = useAuth();

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  const login = () => {

    api.authenticationAuthenticatePost({email: loginUsername, password: loginPassword})
      .then((response) => {
        const {userId, name, surname, token} = response.data;
        setUserId(userId);
        setAuthUser(`${name} ${surname}`);
        setToken(token);
      })
      .catch((e) => console.log(e));

  };

  const register = () => {

    api.authenticationRegisterPost({name: registerName, surname: registerSurname, email: registerEmail, password: registerPassword})
      .then((response) => {
        const {userId, name, surname, token} = response.data;
        setUserId(userId);
        setAuthUser(`${name} ${surname}`);
        setToken(token);
      })
      .catch((e) => console.log(e));

  };

  const registerPasswordHeader = <div className="font-bold mb-3">Pick a password</div>;
  const registerPasswordFooter = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className="card">
      <div className="flex flex-column md:flex-row">
        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Email</label>
            <InputText value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} id="username" type="text" className="w-12rem" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Password</label>
            <Password value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} feedback={false} tabIndex={1} toggleMask/>
          </div>
          <Button onClick={login} label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
        </div>
        <div className="w-full md:w-2">
          <Divider layout="vertical" className="hidden md:flex" />
        </div>

        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Name</label>
            <InputText value={registerName} onChange={(e) => setRegisterName(e.target.value)} id="name" type="text" className="w-12rem" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Surname</label>
            <InputText value={registerSurname} onChange={(e) => setRegisterSurname(e.target.value)} id="surname" className="w-12rem" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Email</label>
            <InputText value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} id="email" type="text" className="w-12rem" />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Password</label>
            <Password
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              header={registerPasswordHeader}
              footer={registerPasswordFooter}
              toggleMask />
          </div>
          <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
            <Button onClick={register} label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;