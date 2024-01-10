import {Button} from "primereact/button";
import React, {useRef, useState} from "react";
import LoginDialog from "./authentication/LoginDialog.tsx";
import RegisterDialog from "./authentication/RegisterDialog.tsx";
import {Toast} from "primereact/toast";

const Welcome = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const toastRef = useRef(null);

  return (
    <>
      <Toast ref={toastRef}/>
      <div className="flex flex-column flex-wrap align-items-center justify-content-center">
        <img src="src/assets/logo.png" alt="" className="w-7"/>
        <div className="flex justify-content-center flex-wrap gap-5">
          <Button onClick={() => {setShowLoginDialog(true)}} label="Login" icon="pi pi-user" className="w-10rem mx-auto"/>
          <Button onClick={() => {setShowRegisterDialog(true)}} label="Register" icon="pi pi-user" className="w-10rem mx-auto"/>
        </div>
      </div>
      {showLoginDialog && <LoginDialog handleSetShowDialog={() => setShowLoginDialog(false)} />}
      {showRegisterDialog && <RegisterDialog toastRef={toastRef} handleSetShowDialog={() => setShowRegisterDialog(false)} />}
    </>
  )
}

export default Welcome;