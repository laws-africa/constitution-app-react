import React from 'react';
import { IonCol, IonContent, IonIcon, IonPage } from '@ionic/react';
import './Help.css';
import { svgs } from '../../assets/svgs';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <section className="search-title">
          <IonCol size="1" class="icon ion-no-padding">
            <IonIcon size="small" icon={svgs.HELP}></IonIcon>
          </IonCol>
          <h2>About</h2>
        </section>

        <hr className="header-divider" />
        <p>
          The Constitution App is developed by the Democratic Governance and
          Rights Unit of the Faculty of Law, University of Cape Town in
          collaboration with AfricanLII and Laws.Africa, with funding support
          from the Konrad Adenauer Stiftung. The aim of the project is to equip
          South African parliamentarians with accurate and authoritative
          information on South African constitutional law.
        </p>
        <p>
          In this application, you will find an updated version of the South
          African constitution, together with commentary of its key provisions
          and their interpretation by South Africa’s highest courts. The app
          allows you to browse through and read summaries as well as the full
          text of constitutional court judgments. The content of this
          application is available off-line and will be updated twice a year.
        </p>
        <h3>Contact</h3>
        <p>
          Feel free to forward constructive feedback and suggestions to
          info@africanlii.org.
        </p>
        <h3>Copyright</h3>
        <p>
          The contents of this app is licensed under Attribution-NonCommercial
          4.0 International (CC BY-NC 4.0) Creative Commons license. View the
          license here: https://creativecommons.org/licenses/by-nc/4.0/
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
