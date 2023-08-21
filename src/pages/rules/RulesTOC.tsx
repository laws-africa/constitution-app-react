import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  IonButton,
  IonCol,
  IonIcon, IonHeader, IonToolbar, IonButtons, IonTitle
} from '@ionic/react';
import './Rules.css';
import { svgs } from '../../assets/svgs';
import ActionRouteLink from "../../components/Action/ActionRouteLink";
import TOCList from '../../components/TOCList';
import { toc } from "../../data/rules";
import { useTranslation } from "react-i18next";
import {search} from "ionicons/icons";

const RulesTOC = () => {
  const { t } = useTranslation(['rules', 'global'])
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton>
                <IonIcon size="small" icon={svgs.RULES}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>
              <IonTitle>{t('rules_title', 'Rules of the NA')}</IonTitle>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={"/search/rules"}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="virtual-list-container">
          <div className="ion-padding">
            <h2>{t('rules_na_title', {
              defaultValue: 'Rules of the National Assembly',
              ns: 'rules'
            })}</h2>

            <ActionRouteLink
                routerLink="/rules/full"
                leftIcon={svgs.RULES}
                actionText={t('rules_full_link_label', {
                  defaultValue: 'The Full Rules',
                  ns: 'rules'
                })}
            />
          </div>
          <IonList>
            <IonListHeader>
              <IonLabel class="contents-label ion-no-margin">
                { t('toc_title', {
                  ns: 'global',
                  defaultValue: 'Table of Contents'
                }) }
              </IonLabel>
            </IonListHeader>
            <div className="ion-padding-start">
              <hr className="header-divider" />
            </div>
            <TOCList
                items={toc.flattened}
                prependRoute="/rules/provision"
            />
          </IonList>
        </IonContent>
      </IonPage>
  )
}

export default RulesTOC;
