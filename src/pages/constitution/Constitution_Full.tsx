import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  withIonLifeCycle
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { constitutionBody, tableOfContents } from '../../data/constitution';

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string; }> { }

class Constitution_Full extends React.Component<Props> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Element | null;
  
  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();

    // parse the constitution HTML once
    this.constitution = constitutionBody;

    // add event handlers to scroll to provision when internal link is clicked
    if (this.constitution) {
      const elements = this.constitution.getElementsByTagName('a')
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];

        if (element.href.includes("#")) {
          element.addEventListener('click', (e: any) => {
            e.preventDefault();
            this.scroll(e.target.getAttribute('href').slice(1));
          });
        }
      }
    }
  }

  renderItems(item: any) {
    let elements: JSX.Element[] = [];
    if (item.children) {
      item.children.map((child: any, index: any) => {
        return elements.push(<IonItem key={index} className="ion-padding-start" onClick={() => { this.scroll(child.id) }}>{child.title}</IonItem>);
      });
    }

    return elements;
  }

  scroll(id: any) {
    let el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start"
      });
    }
  }

  ionViewWillEnter() {
    if (this.props.match.params.id) {
      this.scroll(this.props.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.rootRef.current && this.rootRef.current.childElementCount === 0) {
      console.log('rendering constitution');
      // @ts-ignore
      this.rootRef.current.appendChild(this.constitution);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    // the view state never actually changes
    return false;
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={previous}>
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
            </IonButtons>
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
                {tableOfContents.map((item: any, index: any) => {
                  return (
                      <div key={index}>
                        <IonItem onClick={() => { this.scroll(item.id) }}>{item.title}</IonItem>
                        <IonList>
                          {this.renderItems(item)}
                        </IonList>
                      </div>)
                })}
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="constitution"></IonRouterOutlet>
        <IonContent>
          <div className="ion-padding">
            <div className="akoma-ntoso" ref={this.rootRef}></div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Constitution_Full);
