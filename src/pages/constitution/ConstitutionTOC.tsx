import React from 'react';
import {
  IonHeader,
  IonTitle,
  IonContent,
  IonList,
  IonPage,
  IonIcon,
  IonButton,
  IonToolbar,
  IonButtons
} from '@ionic/react';
import './Constitution.css';
import { svgs } from '../../assets/svgs';
import ActionRouteLink from "../../components/Action/ActionRouteLink";
import { getExpression } from "../../data/constitution";
import TOCList from "../../components/TOCList"
import { useTranslation } from "react-i18next";
import {search} from "ionicons/icons";

const ConstitutionTOC = () => {
  const { t } = useTranslation(['global', 'constitution']);
  const constitution = getExpression(localStorage.getItem('locale') || 'en');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="small" icon={svgs.CONSTITUTION}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
            <IonTitle>{t('constitution_title', 'Constitution')}</IonTitle>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/search/constitution"}>
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="virtual-list-container">
        <div className="ion-padding">
          <h2>{t('constitution_toc_heading', {
            ns: 'constitution',
            defaultValue: 'Constitution of the Republic of South Africa'
          })}</h2>

          <ActionRouteLink
            routerLink="/constitution/full"
            leftIcon={svgs.CONSTITUTION}
            actionText={t('read_full_constitution_label','Read the Full Constitution')} />
        </div>
        <IonList>
          <TOCList
            items={constitution.toc.flattened}
            prependRoute="/constitution/provision"
          />
        </IonList>
      </IonContent>
    </IonPage>
  )
};

export default ConstitutionTOC;
