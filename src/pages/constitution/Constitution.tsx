import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  withIonLifeCycle,
  IonCard
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack, search, close, arrowForward } from 'ionicons/icons';
import { constitutionRoot, flatTOC } from '../../data/constitution';
import HeaderSearch from '../../components/headerSearch/headerSearch';

function previous() {
  window.history.back();
};

interface Props extends RouteComponentProps<{ id: string; }> { }

type MyState = {
  search: Boolean;
};

class Constitution extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Document;
  currentIndex: number;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      search: false
    };
    this.currentIndex = 0

    // parse the constitution HTML once
    this.constitution = constitutionRoot;
  }

  ionViewWillEnter() {
    if (this.props.match.params.id && this.rootRef.current) {
      let provision = this.constitution.getElementById(this.props.match.params.id);
      if (provision) {
        // remove current elements
        while (this.rootRef.current.hasChildNodes()) this.rootRef.current.childNodes[0].remove();
        this.rootRef.current.appendChild(provision.cloneNode(true));
        this.currentIndex = flatTOC.indexOf(this.props.match.params.id)
      }
    }
    this.setState({search: false});
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
              <IonButton
                onClick={() => this.setState({ search: !this.state.search })}
              >
                <IonIcon icon={this.state.search ? close : search}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          {this.state.search && <HeaderSearch doc={this.rootRef.current} />}
        </IonHeader>
        <IonContent>
          <div className="ion-padding">
            <div className="akoma-ntoso" ref={this.rootRef}></div>
          </div>
          <div className="ion-padding">
            <hr />
          </div>
          <IonButtons className="ion-padding ion-justify-content-between">
            <IonCard
              routerLink={
                "/constitution/provision/" + flatTOC[this.currentIndex - 1]
              }
              className="con-buttons previous ion-no-margin"
              button
              disabled={flatTOC[0] === this.props.match.params.id}
            >
              <div>
                <IonIcon slot="start" icon={arrowBack}></IonIcon>
                Previous
              </div>
            </IonCard>
            <IonCard
              routerLink={
                "/constitution/provision/" + flatTOC[this.currentIndex + 1]
              }
              className="con-buttons ion-no-margin"
              disabled={flatTOC.slice(-1)[0] === this.props.match.params.id}
            >
              <div>
                Next
                <IonIcon slot="end" icon={arrowForward}></IonIcon>
              </div>
            </IonCard>
          </IonButtons>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Constitution);
