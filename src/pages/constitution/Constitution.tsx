import React from "react";
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
  IonList,
  IonCard,
} from "@ionic/react";
import "./Constitution.css";
import { RouteComponentProps } from "react-router-dom";
import { arrowBack, search, close, arrowForward } from "ionicons/icons";
import { constitutionRoot, toc } from "../../data/constitution";
import HeaderSearch from "../../components/headerSearch/headerSearch";
import { findTopicsByProvisionId } from "../../data/search";
import decorateAkn from "../../components/decorateAkn";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";
import { handleInDocumentLinks } from "../../utils";

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string }> {}

type MyState = {
  search: Boolean;
  topics: any[];
};

class Constitution extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Document;
  currentIndex: number;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      topics: [],
      search: false,
    };
    this.currentIndex = 0;

    // parse the constitution HTML once
    this.constitution = constitutionRoot;
  }

  getTopics() {
    const results = findTopicsByProvisionId(this.props.match.params.id);
    this.setState({ topics: [...results] });
  }

  ionViewWillEnter() {
    if (this.props.match.params.id && this.rootRef.current) {
      let provision = this.constitution.getElementById(
        this.props.match.params.id
      );
      if (provision) {
        // remove current elements
        while (this.rootRef.current.hasChildNodes())
          this.rootRef.current.childNodes[0].remove();
        this.rootRef.current.appendChild(provision.cloneNode(true));
        decorateAkn(this.rootRef.current, this.state.topics);
        handleInDocumentLinks(this.rootRef.current, this.constitution, this.props.history, '/constitution/provision/');
        this.currentIndex = toc.flattened.indexOf(this.props.match.params.id);
      }
    }
    this.setState({ search: false });
    this.getTopics();
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
          {this.state.topics.length > 0 && (
            <div>
              <IonToolbar class="related-guides" color="primary">
                <IonIcon size="large" slot="start" icon={svgs.GUIDES_WHITE}></IonIcon>
                <span>Related Guides</span>
              </IonToolbar>
              <IonList className="ion-padding">
                {this.state.topics.map((topic: any, index: any) => (
                  <TopicItem key={topic.id} topic={topic} />
                ))}
              </IonList>
            </div>
          )}
          <div className="ion-padding">
            <hr />
          </div>
          <IonButtons className="ion-padding ion-justify-content-between">
            <IonCard
              routerLink={
                "/constitution/provision/" + toc.flattened[this.currentIndex - 1]
              }
              className="con-buttons ion-no-margin"
              button
              disabled={toc.flattened[0] === this.props.match.params.id}
            >
              <div>
                <IonIcon slot="start" icon={arrowBack}></IonIcon>
                Previous
              </div>
            </IonCard>
            <IonCard
              routerLink={
                "/constitution/provision/" + toc.flattened[this.currentIndex + 1]
              }
              className="con-buttons ion-no-margin"
              disabled={toc.flattened.slice(-1)[0] === this.props.match.params.id}
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
