import {Button} from "primereact/button";
import React, {useState} from "react";
import {DefaultApi} from "../../../generated-sources/openapi";
import {useAuth} from "../../context/AuthContext.tsx";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {Avatar} from "primereact/avatar";
import {Password} from "primereact/password";

interface Props {
  handleSetShowDialog: Function;
}

const LoginDialog = ({ handleSetShowDialog }: Props) => {

  const {
    setAuthUser,
    setUserId,
    setToken
  } = useAuth();

  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: (data) => {
      console.log(data)
      let errors = {};

      if (!data.username) {
        errors.username = 'Username is required.';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      }

      return errors;
    },
    onSubmit: () => {
      formik.resetForm();
      login();
      // handleSetShowDialog(false);
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const login = () => {

    api.authenticationAuthenticatePost({email: formik.values.username, password: formik.values.password})
      .then((response) => {
        console.log(response)
        const {userId, name, surname, token} = response.data;
        setUserId(userId);
        setAuthUser(`${name} ${surname}`);
        setToken(token);
      })
      .catch(() => setShowInvalidCredentials(true));

  };

  return (
    <Dialog header="Enter you credentials" visible draggable={false} style={{ width: '30vw' }} onHide={() => handleSetShowDialog(false)}>
      <div className="card flex justify-content-center">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
          <Avatar icon="pi pi-user" size="xlarge" className="m-auto mb-3" shape="circle" />

          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            name="username"
            value={formik.values.username}
            className={classNames({'p-invalid': isFormFieldInvalid('username')})}
            onChange={(e) => {
              formik.setFieldValue('username', e.target.value);
            }}
          />
          {getFormErrorMessage('username')}

          <label htmlFor="password">Password</label>
          <Password
            id="password"
            name="password"
            value={formik.values.password}
            feedback={false}
            className={classNames({'p-invalid': isFormFieldInvalid('password')})}
            onChange={(e) => {
              formik.setFieldValue('password', e.target.value);
            }}
          />
          {getFormErrorMessage('password')}

          {showInvalidCredentials && <small className="p-error">The credentials are invalid</small>}
          <Button type="submit" label="Login" icon="pi pi-user" />
        </form>
      </div>
    </Dialog>
  )
}

export default LoginDialog;