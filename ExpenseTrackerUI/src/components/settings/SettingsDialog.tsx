import {Button} from "primereact/button";
import React from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../context/AuthContext.tsx";
import {Dialog} from "primereact/dialog";

interface Props {
  handleSetShowSettingsDialog: Function;
}

const SettingsDialog = ({ handleSetShowSettingsDialog }: Props) => {

  const { t, i18n} = useTranslation();
  const { setToken } = useAuth();

  const countries = [
    {
      code: "mk",
      name: "Macedonian",
      country_code: "mk",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    {
      code: "de",
      name: "German",
      country_code: "de",
    },
  ];

  const productDialogFooter = (
    <Button label={t('common.cancel')} icon="pi pi-times" outlined onClick={() => handleSetShowSettingsDialog(false)}/>
  );

  return (
    <Dialog visible style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}} header={t(`settings.label`)}
            modal className="p-fluid" footer={productDialogFooter}
            onHide={() => handleSetShowSettingsDialog(false)}
            draggable={false}>

      <div>
        {countries.map((lng) => {
          return (

            <img
              alt={lng.name}
              src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
              className={`flag flag-${lng.country_code.toLowerCase()} mr-2`}
              style={{width: '30px', cursor: "pointer"}}
              onClick={() => i18n.changeLanguage(lng.code)}
            />
          );
        })}
      </div>

      <Button onClick={() => setToken(undefined)} className="mt-2">
        {t('settings.logout')}
      </Button>
    </Dialog>
  )

}

export default SettingsDialog;