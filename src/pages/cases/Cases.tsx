import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonText,
  IonList, IonIcon,
} from '@ionic/react';
import './Cases.css';
import { CaseItem } from "../../components/case";
import {useTranslation} from "react-i18next";
import { getCases } from "../../data/cases";
import {useLanguage} from "../../custom-hooks/useLanguage";
import {svgs} from "../../assets/svgs";
import {search} from "ionicons/icons";

const Cases: React.FC = () => {
  const { t } = useTranslation('case');
  const lang = useLanguage();
  const cases = getCases(lang);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="small" icon={svgs.CASES} />
            </IonButton>
          </IonButtons>
          <IonTitle>{t('page_title', 'Cases')}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/search/cases"}>
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
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
