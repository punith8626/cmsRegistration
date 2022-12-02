import {IonContent, IonPage, IonImg, IonSelect, IonSelectOption, IonButton} from "@ionic/react";
import {useEffect, useState, useCallback} from "react";
import api from "../../api";
import condoLogo from "../../assets/condo-logo.png";
import homeImg from "../../assets/home.png";
import {Storage} from "@ionic/storage";
import nappleLogo from "../../assets/napple-logo.png";

import "./Home.css";

const Home = () => {
  const [communities, setCommunities] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const getCommunities = async () => {
    try {
      const {data} = await api.post("CMSServices/registration/api/getCommunities", {
        userId: 1143,
        userName: "kktest",
        userPwd: "kanjian1",
        compId: 100,
        isUserActive: true,
        isCompanyActive: true
      });
      setCommunities(data);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  // const getSalesPersons = useCallback(async () => {
  //   try {
  //     const {data} = await api.post("CMSServices/registration/api/getSalesPersonByCommunityId", {
  //       CommunityId: selectedCommunity.communityId
  //     });
  //     setSalesPersons(data);
  //   } catch (e) {
  //     //
  //   }
  // });

  useEffect(() => {
    getCommunities();
  }, []);

  // useEffect(() => {
  //   getSalesPersons();
  // }, [getSalesPersons, selectedCommunity]);

  const handleClick = community => {
    setSelectedCommunity(community);
  };

  const handleSalesPersonChange = () => {};

  return (
    <IonPage>
      <IonContent className="ion-padding text-center">
        {selectedCommunity?.communityName ? (
          <>
            <div className="homeImage">
              <IonImg src={homeImg} alt={homeImg}></IonImg>
            </div>

            <h1>
              Welcome to <span>{selectedCommunity.communityName}</span>
            </h1>
            {selectedCommunity?.communityName === "CMS Condo" ? (
              <div className="selectPerson">
                <div>Select a sales person </div>
                <div>
                  <IonSelect placeholder="Please select" ionChange={handleSalesPersonChange}>
                    {salesPersons.map(salesPerson => (
                      <IonSelectOption value={salesPerson.userId}>
                        {salesPerson.salesPersonNew}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>
            ) : (
              <>
                <IonButton routerLink={`/customer`}>Client Registration</IonButton>
                <IonButton routerLink={`/broker`}>Broker Registration</IonButton>
              </>
            )}
          </>
        ) : (
          <>
            <h1>Select Your Desired Community</h1>
            {communities.map(community => (
              <div className="condoLogo" onClick={() => handleClick(community)}>
                {/* <IonImg src={community.imageUrl} alt={community.communityName}></IonImg> */}
                <IonImg src={condoLogo} alt={community.communityName}></IonImg>

                <h1>{community.communityName}</h1>
              </div>
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
