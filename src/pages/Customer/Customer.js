import {useEffect, useState, useCallback} from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonCheckbox,
  IonNote
} from "@ionic/react";
import api from "../../api";
import nappleLogo from "../../assets/napple-logo.png";
import "./Customer.css";

const Customer = () => {
  const [status, setStatus] = useState("");
  const [mandatoryFields, setmandatoryFields] = useState();
  const [isValid, setIsValid] = useState(true);

  const getMandatorydDetails = async () => {
    try {
      const {data} = await api.post("CMSServices/registration/api/getRegManditorySettings", {
        communityId: 215
      });
      console.log(data);
      setmandatoryFields(data);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  const handleChange = e => {
    const {name, value} = e.currentTarget;
    // setUserInfo(v => ({...v, [name]: value}));
  };

  const findUser = e => {
    //
  };
  useEffect(() => {
    getMandatorydDetails();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding text-center">
        <div className="header">
          <h1>
            Client Registration <span>at CMS Townhomes</span>
          </h1>
          <IonImg src={nappleLogo} alt="CMS Townhomes"></IonImg>
        </div>
        {status === "" && (
          <>
            <h1>
              Is this your <span>First Visit</span> ?
            </h1>
            <IonButton
              onClick={() => {
                setStatus("firstTimeVisit");
              }}>
              Yes
            </IonButton>
            <IonButton
              onClick={() => {
                setStatus("notFirstTimeVisit");
              }}>
              No
            </IonButton>
          </>
        )}
        {status === "notFirstTimeVisit" && (
          <>
            <h1>
              Welcome! Let us find you. What is<span> Your Name?</span>
            </h1>

            <IonItem className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"}`}>
              <IonInput
                placeholder="First Name"
                onIonInput={handleChange}
                name="FirstName"></IonInput>
              <IonNote slot="error">Enter a valid First Name</IonNote>
            </IonItem>
            <IonItem className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"}`}>
              <IonInput
                placeholder="Last Name"
                name="LastName"
                onIonInput={handleChange}></IonInput>
              <IonNote slot="error">Enter a valid Last Name</IonNote>
            </IonItem>
            <IonButton onClick={findUser}>Find</IonButton>
          </>
        )}

        {status === "firstTimeVisit" && (
          <>
            <h1>
              Are you working with a<span> Broker?</span>
            </h1>
            <IonButton
              onClick={() => {
                setStatus("yesPresent");
              }}>
              {mandatoryFields?.BtnClientQ1}
            </IonButton>
            <IonButton
              onClick={() => {
                setStatus("firstTimeVisit");
              }}>
              {mandatoryFields?.BtnClientQ2}
            </IonButton>
            <IonButton
              onClick={() => {
                setStatus("firstTimeVisit");
              }}>
              {mandatoryFields?.BtnClientQ3}
            </IonButton>
          </>
        )}

        {status === "yesPresent" && (
          <>
            <h1>
              Thanks for visiting
              <span> CMS Townhomes</span> !
            </h1>
            <h2>Tell us about yourself...</h2>
            <div>
              <h1>
                What is <span>Your Name</span> and <span> Email</span>?
              </h1>
              <IonList>
                <IonItem>
                  <IonInput placeholder="First Name" required></IonInput>
                </IonItem>

                <IonItem>
                  <IonInput placeholder="Last Name" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput placeholder="Email" required></IonInput>
                </IonItem>
              </IonList>
            </div>
            <div>
              <h1>
                Where do you <span>Live</span> ?
              </h1>
              <IonList>
                <IonItem>
                  <IonInput placeholder="Street"></IonInput>
                </IonItem>

                <IonItem>
                  <IonInput placeholder="Zip"></IonInput>
                </IonItem>
              </IonList>
            </div>

            <div>
              <h1>
                How can we Contact <span>You?</span>
              </h1>
              <IonList>
                <IonItem>
                  <IonInput placeholder="Cell Phone" required></IonInput>
                </IonItem>

                <IonItem>
                  <IonInput placeholder="Work Phone"></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput placeholder="Home Phone"></IonInput>
                </IonItem>
              </IonList>
            </div>
            <IonButton
              onClick={() => {
                setStatus("AfterRegister");
              }}>
              Next
            </IonButton>
          </>
        )}

        {status === "AfterRegister" && (
          <>
            <div>
              <h1>
                How did you hear about
                <span> us</span>?
              </h1>
              {mandatoryFields.sources.map(source => {
                return (
                  <IonItem>
                    <IonCheckbox slot="start" value={source.sourceId}></IonCheckbox>
                    <IonLabel>{source.sourceName}</IonLabel>
                  </IonItem>
                );
              })}

              <IonButton
                onClick={() => {
                  setStatus("typeofhome");
                }}>
                Next
              </IonButton>
            </div>
          </>
        )}

        {status === "typeofhome" && (
          <>
            <div>
              <h1>
                What type of home are
                <span> you looking for </span>?
              </h1>
              {mandatoryFields.desiredBedRooms.map(source => {
                return (
                  <IonItem>
                    <IonCheckbox slot="start" value={source.sourceId}></IonCheckbox>
                    <IonLabel>{source.sourceName}</IonLabel>
                  </IonItem>
                );
              })}
            </div>

            <IonButton
              onClick={() => {
                setStatus("whatisurbudget");
              }}>
              Next
            </IonButton>
          </>
        )}

        {status === "whatisurbudget" && (
          <>
            <div>
              <h1>
                What is
                <span> your budget? </span>
              </h1>
              {mandatoryFields.desiredBedRooms.map(source => {
                return (
                  <IonItem>
                    <IonCheckbox slot="start" value={source.sourceId}></IonCheckbox>
                    <IonLabel>{source.sourceName}</IonLabel>
                  </IonItem>
                );
              })}
            </div>

            <IonButton
              onClick={() => {
                setStatus("occupation");
              }}>
              Next
            </IonButton>
          </>
        )}

        {status === "occupation" && (
          <>
            <div>
              <h1>
                What is your
                <span> Occupation? </span>
              </h1>
            </div>
            <IonItem>
              <IonInput placeholder="Occupation" required></IonInput>
            </IonItem>

            <IonButton
              onClick={() => {
                setStatus("planneduse");
              }}>
              Next
            </IonButton>
          </>
        )}
        {status === "planneduse" && (
          <>
            <div>
              <h1>
                What is your
                <span> Planned Use? </span>
              </h1>
            </div>
            <IonItem>
              <IonInput placeholder="Planned Use" required></IonInput>
            </IonItem>

            <IonButton
              onClick={() => {
                setStatus("agerange");
              }}>
              Next
            </IonButton>
          </>
        )}
        {status === "agerange" && (
          <>
            <div>
              <h1>
                What is your
                <span> Age Range? </span>
              </h1>
            </div>
            <IonItem>
              <IonInput placeholder="Age Range" required></IonInput>
            </IonItem>

            <IonButton
              onClick={() => {
                setStatus("amenities");
              }}>
              Next
            </IonButton>
          </>
        )}
        {status === "amenities" && (
          <>
            <div>
              <h1>
                What <span> Amenities</span> are you interested in?
              </h1>
            </div>
            <IonItem>
              <IonCheckbox slot="start"></IonCheckbox>
              <IonLabel>Balcony</IonLabel>
            </IonItem>

            <IonButton
              onClick={() => {
                setStatus("interests");
              }}>
              Next
            </IonButton>
          </>
        )}
        {status === "interests" && (
          <>
            <div>
              <h1>
                What are your <span>Personal Interests?</span>
              </h1>
            </div>
            <IonItem>
              <IonInput placeholder="Interests" required></IonInput>
            </IonItem>

            <IonButton
              onClick={() => {
                setStatus("Finish");
              }}>
              Finish
            </IonButton>
          </>
        )}
        {status === "Finish" && (
          <>
            <div>
              <h1>Thank you for visiting us</h1>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Customer;
