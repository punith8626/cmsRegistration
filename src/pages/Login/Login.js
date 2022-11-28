import React, {useState, useCallback, useContext} from "react";
import {
  IonContent,
  IonList,
  IonPage,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  NavContext,
  IonNote
} from "@ionic/react";
import {Storage} from "@ionic/storage";

import "./Login.css";
import api from "../../api";

const Login = () => {
  const {navigate} = useContext(NavContext);

  const [userInfo, setUserInfo] = useState({UserName: "", UserPassword: ""});
  const [isValid, setIsValid] = useState(true);

  const loginApi = async () => {
    try {
      if (userInfo.UserName !== "" && userInfo.UserPassword !== "") {
        const {data} = await api.post("CMSServices/registration/api/validateuser", userInfo);
        if (data.isUserActive) {
          const store = new Storage();
          await store.create();
          await store.set("userDetails", data);

          redirect();
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  const redirect = useCallback(() => navigate("/home", "Home"), [navigate]);

  const handleChange = e => {
    const {name, value} = e.currentTarget;
    setUserInfo(v => ({...v, [name]: value}));
  };

  return (
    <IonPage id="login-page">
      <IonContent className="ion-padding text-center">
        <h1>CMS Registration</h1>
        <IonList>
          <IonItem className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"}`}>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              placeholder="Enter Username"
              onIonInput={handleChange}
              name="UserName"></IonInput>
            <IonNote slot="error">Enter a valid username</IonNote>
          </IonItem>
          <IonItem className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"}`}>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              placeholder="Enter Password"
              name="UserPassword"
              onIonInput={handleChange}></IonInput>
            <IonNote slot="error">Enter a valid Password</IonNote>
          </IonItem>
          <IonButton onClick={loginApi}>Login</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
