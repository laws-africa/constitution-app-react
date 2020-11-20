import React from 'react';
import {
  IonContent,
  IonItem,
  IonList,
  IonPage,
  withIonLifeCycle
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import * as constitution from '../../assets/data/constitution.json';

interface Props extends RouteComponentProps<{ id: string; }> { }

class constitutionTOC extends React.Component<Props> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  
  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
  }

  renderItems(item: any) {
    let elements: JSX.Element[] = [];
    if (item.children) {
      item.children.map((child: any, index: any) => {
        return elements.push(<IonItem key={index} routerLink={"provision/" + child.id}>&nbsp;&nbsp;&nbsp;{child.title}</IonItem>);
      });
    }

    return elements;
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonItem routerLink={"/constitution/full"}>Read the full constitution</IonItem>
          {constitution.toc.map((item: any, index: any) => {
            return (
              <div key={index}>
                <IonItem routerLink={"provision/" + item.id}>{item.title}</IonItem>
                <IonList>
                  {this.renderItems(item)}
                </IonList>
              </div>)
          })}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(constitutionTOC);
