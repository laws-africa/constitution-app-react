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
import './Rules.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack, arrowForward, close, search } from 'ionicons/icons';
import { rulesRoot, toc } from '../../data/rules';
import HeaderSearch from '../../components/headerSearch/headerSearch';
import {handleInDocumentLinks} from "../../utils";

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string; }> { }

type MyState = {
  search: Boolean;
};

class Rules extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly rules: Document;
  currentIndex: number;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      search: false,
    };
    this.currentIndex = 0;

    // parse the rules HTML once
    this.rules = rulesRoot;
  }

  ionViewWillEnter() {
    if (this.props.match.params.id && this.rootRef.current) {
      let provision = this.rules.getElementById(this.props.match.params.id);
      if (provision) {
        // remove current elements
        while (this.rootRef.current.hasChildNodes())
          this.rootRef.current.childNodes[0].remove();
        this.rootRef.current.appendChild(provision.cloneNode(true));
        handleInDocumentLinks(this.rootRef.current, this.rules, this.props.history, '/rules/provision/');
        this.currentIndex = toc.flattened.map(item => item.id).indexOf(this.props.match.params.id);
      }
    }
    this.setState({ search: false });
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
            <IonTitle>Rules of the National Assembly</IonTitle>
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
                "/rules/provision/" + toc.flattened[this.currentIndex > 0 ? this.currentIndex - 1 : 0].id
              }
              className="con-buttons ion-no-margin"
              button
              disabled={toc.flattened[0].id === this.props.match.params.id}
            >
              <div>
                <IonIcon slot="start" icon={arrowBack}></IonIcon>
                Previous
              </div>
            </IonCard>
            <IonCard
              routerLink={
                "/rules/provision/" + toc.flattened[this.currentIndex + 1].id
              }
              className="con-buttons ion-no-margin"
              disabled={toc.flattened.slice(-1)[0].id === this.props.match.params.id}
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

export default withIonLifeCycle(Rules);
