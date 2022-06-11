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
import {getCases} from "../../data/cases";
import {useLanguage} from "../../custom-hooks/useLanguage";

const Cases: React.FC = () => {
  const { t } = useTranslation('case');
  const lang = useLanguage();
  const cases = getCases(lang)

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
          {cases.map((kase: any) => (
            <CaseItem kase={kase}/>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Cases;
