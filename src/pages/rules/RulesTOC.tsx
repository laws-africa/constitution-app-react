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
import { ActionButton } from '../../components/actionButton';

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

            <ActionButton
              routerLink="/rules/full"
              icon={svgs.RULES}
              text="The Full Rules"
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
