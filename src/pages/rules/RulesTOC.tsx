import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  withIonLifeCycle,
  IonButton,
  IonCol,
  IonIcon
} from '@ionic/react';
import './Rules.css';
import { TOCList } from '../../components/rulesTOC';
import { svgs } from '../../assets/svgs';
import ActionRouteLink from "../../components/Action/ActionRouteLink";

class RulesTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-padding">
            <section className="tab-title">
              <IonCol size="1" class="icon ion-no-padding">
                <IonIcon size="small" icon={svgs.RULES}></IonIcon>
              </IonCol>
              <h2>Rules of the National Assembly</h2>
              <IonButton
                className="ion-no-padding"
                fill="clear"
                routerLink={"/search/rules"}
              >
                Search
              </IonButton>
            </section>

            <hr className="header-divider" />

            <ActionRouteLink
              routerLink="/rules/full"
              leftIcon={svgs.RULES}
              actionText="The Full Rules"
            />
          </div>
          <IonList>
            <IonListHeader>
              <IonLabel class="contents-label ion-no-margin">
                Table of Contents
              </IonLabel>
            </IonListHeader>
            <div className="ion-padding-start">
              <hr className="header-divider" />
            </div>
            <TOCList />
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(RulesTOC);
