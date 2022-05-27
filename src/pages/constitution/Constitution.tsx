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
import { getExpression, Expression } from "../../data/constitution";
import HeaderSearch from "../../components/headerSearch/headerSearch";
import { findTopicsByProvisionId } from "../../data/search";
import decorateAkn from "../../components/decorateAkn";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";
import { handleInDocumentLinks } from "../../utils";
import { withTranslation } from "react-i18next";
import { iTFunc } from "../../common-types";

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string }>, iTFunc {}

type MyState = {
  search: Boolean;
  topics: any[];
  constitution: Expression
};

class Constitution extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      topics: [],
      search: false,
      constitution: getExpression(localStorage.getItem('locale') || 'en'),
    };
    this.currentIndex = 0;
  }

  getTopics() {
    const results = findTopicsByProvisionId(this.props.match.params.id);
    this.setState({ topics: [...results] });
  }

  ionViewWillEnter() {
    this.setState({ search: false });
    this.setState({ constitution: getExpression(localStorage.getItem('locale') || 'en') })
    this.getTopics();
  }

  componentDidMount() {
    this.injectAkn();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<MyState>, snapshot?: any) {
    this.injectAkn();
  }
  
  injectAkn() {
    if (this.props.match.params.id && this.rootRef.current) {
      let provision = this.state.constitution.document.getElementById(
        this.props.match.params.id
      );
      if (provision) {
        // remove current elements
        while (this.rootRef.current.hasChildNodes())
          this.rootRef.current.childNodes[0].remove();
        this.rootRef.current.appendChild(provision.cloneNode(true));
        decorateAkn(this.rootRef.current, this.state.topics);
        handleInDocumentLinks(this.rootRef.current, this.state.constitution.document, this.props.history, '/constitution/provision/');
        this.currentIndex = this.state.constitution.toc.flattened.map(item => item.id).indexOf(this.props.match.params.id);
      }
    }
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
            <IonTitle>
              {this.props.t('constitution_title', {
                defaultValue: 'Constitution',
                ns: 'constitution'
            })}
            </IonTitle>
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
                <span>{this.props.t('related_guides_label', {
                  ns: 'global',
                  defaultValue: 'Related Guides'
                })}</span>
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
                routerLink={`/constitution/provision/${this.state.constitution.toc.flattened[this.currentIndex > 0 ? this.currentIndex - 1 : 0].id}`}
              className="con-buttons ion-no-margin"
              button
              disabled={this.state.constitution.toc.flattened[0] === this.props.match.params.id}
            >
              <div>
                <IonIcon slot="start" icon={arrowBack}></IonIcon>
                {this.props.t('prev_button_label', { ns: 'global', defaultValue: 'Previous' })}
              </div>
            </IonCard>
            <IonCard
              routerLink={
                "/constitution/provision/" + this.state.constitution.toc.flattened[this.currentIndex + 1].id
              }
              className="con-buttons ion-no-margin"
              disabled={this.state.constitution.toc.flattened.slice(-1)[0] === this.props.match.params.id}
            >
              <div>
                {this.props.t('next_button_label', { ns: 'global', defaultValue:  'Next' })}
                <IonIcon slot="end" icon={arrowForward}></IonIcon>
              </div>
            </IonCard>
          </IonButtons>
        </IonContent>
      </IonPage>
    );
  }
}

export default withTranslation(['constitution','global'])(withIonLifeCycle(Constitution));
