import React from 'react';
import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import * as Data from '../../assets/data/constitution.json';
import './Constitution.css';

const Tab1: React.FC = () => {
  function scroll(id: any) {
    let el = document.getElementById(id);
    if (el) {
      el.scrollIntoView();
    }
  }

  function renderItems(item: any) {
    let elements: JSX.Element[] = [];
    if (item.children) {
      item.children.map((child: any) => {
        elements.push(<IonItem onClick={() => { scroll(child.id) }}>&nbsp;&nbsp;&nbsp;{child.title}</IonItem>);
      });
    }

    return elements;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Constitution</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonMenu side="end" menuId="first" contentId="constitution">
        <IonContent>
          <IonList>
            <IonMenuToggle auto-hide="true">
              {Data.toc.map((item) => {
                return (
                  <>
                    <IonItem onClick={() => { scroll(item.id) }}>{item.title}</IonItem>
                    <IonList>
                      {renderItems(item)}
                    </IonList>
                  </>)
              })}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="constitution"></IonRouterOutlet>

      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="akoma-ntoso" dangerouslySetInnerHTML={{ __html: Data.body }}></div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Tab1;