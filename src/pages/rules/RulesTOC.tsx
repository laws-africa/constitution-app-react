import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  IonButton,
  IonCol,
  IonIcon
} from '@ionic/react';
import './Rules.css';
import { svgs } from '../../assets/svgs';
import ActionRouteLink from "../../components/Action/ActionRouteLink";
import TOCList from '../../components/TOCList';
import { toc } from "../../data/rules";

const RulesTOC = () => {
  const { t } = useTranslation(['rules', 'global'])
  return (
      <IonPage>
        <IonContent className="virtual-list-container">
          <div className="ion-padding">
            <section className="tab-title">
              <IonCol size="1" class="icon ion-no-padding">
                <IonIcon size="small" icon={svgs.RULES}></IonIcon>
              </IonCol>
              <h2>{t('rules_na_title', {
                defaultValue: 'Rules of the National Assembly',
                ns: 'rules'
              })}</h2>
              <IonButton
                  className="ion-no-padding"
                  fill="clear"
                  routerLink={"/search/rules"}
              >
                {t('search_button_text', 'Search')}
              </IonButton>
            </section>

            <hr className="header-divider" />

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
