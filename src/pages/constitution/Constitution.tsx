import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import './Constitution.css';
import * as ConstitutionData from '../../assets/data/constitution.json';
import parse from 'html-react-parser';

interface Props extends RouteComponentProps<{ id: string; }> { }

const Constitution: React.FC<Props> = ({ match }) => {
  const [constFinal, setConstitutionFinal] = useState('');

  useIonViewWillEnter(() => {
    let constString = ConstitutionData.body.substring(ConstitutionData.body.lastIndexOf("<section class=\"akn-section\" id=\"" + match.params.id + "\" data-eId=\"" + match.params.id + "\">"))

    const constSubstring = constString.substr(0, constString.indexOf('</section>'));

    const constFinalVar: string = constSubstring.substring(constSubstring.indexOf(">") + 1);
    setConstitutionFinal(constFinalVar)

  });

  const previous = () => {
    window.history.back()
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={previous}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Constitution</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="akoma-ntoso">{ parse(constFinal) }</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Constitution;