import React from 'react';
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  withIonLifeCycle
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { tableOfContents } from '../../data/constitution';

interface Props extends RouteComponentProps<{ id: string; }> { }

class constitutionTOC extends React.Component<Props> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private provisions: any;
  
  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    // we're only going to render provisions with ids
    this.provisions = tableOfContents.filter(t => !!t.id);
  }

  renderItems(item: any) {
    let elements: JSX.Element[] = [];
    if (item.children) {
      for (const child of item.children) {
        if (child.id) {
          elements.push(<IonItem key={child.id} className="ion-padding-start" routerLink={"constitution/provision/" + child.id}>{child.title}</IonItem>);
        }
      }
    }

    return elements;
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonListHeader>
            <IonLabel>Constitution of the Republic of South Africa</IonLabel>
          </IonListHeader>
          <IonList>
            <IonItem routerLink={"/constitution/full"}>Read the full Constitution</IonItem>
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Table of Contents</IonLabel>
            </IonListHeader>
            {this.provisions.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <IonItem routerLink={"constitution/provision/" + item.id}>{item.title}</IonItem>
                  <IonList>
                    {this.renderItems(item)}
                  </IonList>
                </div>)
            })}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(constitutionTOC);
