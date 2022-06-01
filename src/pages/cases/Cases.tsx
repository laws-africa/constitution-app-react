import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
} from '@ionic/react';
import './Cases.css';
import { CaseItem } from "../../components/case";
import {useTranslation} from "react-i18next";
import {cases} from "../../data/cases";

const Cases: React.FC = () => {
  const { t } = useTranslation('case');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('page_title', 'Cases')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <div className="ion-padding">
            {t('description_text', 'Summaries of cases from the Constitutional Court.')}
          </div>
        </IonText>
        <IonList>
          {cases.map((kase) => (
            <CaseItem kase={kase}/>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Cases;
