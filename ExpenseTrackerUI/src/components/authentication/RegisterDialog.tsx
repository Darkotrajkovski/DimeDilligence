import {useState} from "react";
import _ from 'lodash';
import {Button} from "primereact/button";
import {DefaultApi} from "../../../generated-sources/openapi";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {Avatar} from "primereact/avatar";
import {Divider} from "primereact/divider";
import {Password} from "primereact/password";
import {showSuccessMessage} from "../../util.ts";

interface Props {
  toastRef: any;
  handleSetShowDialog: Function;
}

const RegisterDialog = ({ toastRef, handleSetShowDialog }: Props) => {

  const [showAlreadyExistingUsername, setShowAlreadyExistingUsername] = useState(false);

  const api = new DefaultApi({
    basePath: 'http://localhost:8080/v1',
  });

  const isPasswordValid = (text) => {
    const hasLowercase = /[a-z]/.test(text);
    const hasUppercase = /[A-Z]/.test(text);
    const hasNumeric = /\d/.test(text);
    const isLengthValid = _.inRange(text.length, 8, 31);
    return hasLowercase && hasUppercase && hasNumeric && isLengthValid;
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      username: '',
      password: ''
    },
    validate: (data) => {

      let errors = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.surname) {
        errors.surname = 'Surname is required.';
      }

      if (!data.username) {
        errors.username = 'Username is required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.username)) {
        errors.username = 'Invalid email address';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      } else if(!isPasswordValid(data.password)) {
        errors.password = 'Password is invalid';
      }

      return errors;
    },
    onSubmit: () => {
      formik.resetForm();
      register();
    }
  });

  const register = () => {

    api.authenticationRegisterPost({name: formik.values.name, surname: formik.values.surname, email: formik.values.username, password: formik.values.password})
      .then(() => {
        handleSetShowDialog(false)
        showSuccessMessage(toastRef, 'Successfully created an account');
      })
      .catch(() => setShowAlreadyExistingUsername(true));

  };

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const passwordHeader = <div className="font-bold mb-3">Pick a password</div>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
        <li>Maximum 30 characters</li>
      </ul>
    </>
  );

  return (
    <Dialog header="Enter you credentials" visible draggable={false} onHide={() => handleSetShowDialog(false)}>
      <div className="card flex justify-content-center">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
          <Avatar icon="pi pi-user" size="xlarge" className="m-auto mb-3" shape="circle"/>
          <div className="flex flex-row gap-3">
            <div className="flex flex-column gap-2">
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                placeholder="Name"
                className={classNames({'p-invalid': isFormFieldInvalid('name')})}
                onChange={(e) => {
                  formik.setFieldValue('name', e.target.value);
                }}
              />
              {getFormErrorMessage('name')}
            </div>

            <div className="flex flex-column gap-2">
              <InputText
                id="surname"
                name="surname"
                value={formik.values.surname}
                placeholder="Surname"
                className={classNames({'p-invalid': isFormFieldInvalid('surname')})}
                onChange={(e) => {
                  formik.setFieldValue('surname', e.target.value);
                }}
              />
              {getFormErrorMessage('surname')}
            </div>
          </div>
            <InputText
              id="username"
              name="username"
              value={formik.values.username}
              placeholder="Username"
              className={classNames({'p-invalid': isFormFieldInvalid('username')})}
              onChange={(e) => {
                formik.setFieldValue('username', e.target.value);
              }}
            />
            {getFormErrorMessage('username')}

            <Password
              id="password"
              name="password"
              value={formik.values.password}
              placeholder="Password"
              header={passwordHeader}
              footer={passwordFooter}
              className={classNames({'p-invalid': isFormFieldInvalid('password')})}
              onChange={(e) => {
                formik.setFieldValue('password', e.target.value);
              }}
              style={{width: "100%"}}
            />
            {getFormErrorMessage('password')}

            {showAlreadyExistingUsername && <small className="p-error">The username already exists</small>}
            <Button type="submit" label="Register" icon="pi pi-user"/>
        </form>
      </div>
    </Dialog>
)
}

export default RegisterDialog;