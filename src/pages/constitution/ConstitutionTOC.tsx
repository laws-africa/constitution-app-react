import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  withIonLifeCycle,
  IonIcon,
  IonButton,
  IonCol
} from '@ionic/react';
import './Constitution.css';
import { TOCList } from '../../components/constitutionTOC';
import { svgs } from '../../assets/svgs';
import ActionRouteLink from "../../components/Action/ActionRouteLink";
import { useTranslation } from "react-i18next";

const ConstitutionTOC = () => {
  const { t } = useTranslation(['global', 'constitution']);
  return (
      <IonPage>
        <IonContent>
          <div className="ion-padding">
            <section className="tab-title">
              <IonCol size="1" class="icon ion-no-padding">
                <IonIcon size="small" icon={svgs.CONSTITUTION}></IonIcon>
              </IonCol>
              <h2>{t('constitution_toc_heading', {
                ns: 'constitution',
                defaultValue: 'Constitution of the Republic of South Africa'
              })}</h2>
              <IonButton className="ion-no-padding" fill="clear" routerLink={"/search/constitution"}>Search</IonButton>
            </section>

            <hr className="header-divider" />

            <ActionRouteLink
                routerLink="/constitution/full"
                leftIcon={svgs.CONSTITUTION}
                actionText={t('read_full_constitution_label','Read the Full Constitution')} />
          </div>

          <IonList>
            <IonListHeader>
              <IonLabel class="contents-label ion-no-margin">{t('toc_title',{
                defaultValue: 'Table of Contents',
                ns: 'global'
              })}</IonLabel>
            </IonListHeader>
            <div className="ion-padding-start"><hr className="header-divider" /></div>
            <TOCList/>
          </IonList>
        </IonContent>
      </IonPage>
  )
}
export default withIonLifeCycle(ConstitutionTOC);
