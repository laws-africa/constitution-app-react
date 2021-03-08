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
  IonList,
  IonLabel,
  IonListHeader,
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { constitutionRoot } from '../../data/constitution';
import { findTopicsByProvisionId } from '../../data/search';
import { TopicItem } from '../../components/topic';
import decorateAkn from '../../components/decorateAkn';

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string; }> { }
interface State {
  topics: any[]
}

class Constitution extends React.Component<Props, State> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Document;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      topics: []
    };

    // parse the constitution HTML once
    this.constitution = constitutionRoot;
  }

  getTopics() {
    const results = findTopicsByProvisionId(this.props.match.params.id);
    this.setState({topics: [...results]});
  }

  componentDidMount() {
    this.getTopics();
  }

  ionViewWillEnter() {
    if (this.props.match.params.id && this.rootRef.current) {
      let provision = this.constitution.getElementById(this.props.match.params.id);
      if (provision) {
        // remove current elements
        while (this.rootRef.current.hasChildNodes()) this.rootRef.current.childNodes[0].remove();
        this.rootRef.current.appendChild(provision.cloneNode(true));
        decorateAkn(this.rootRef.current, this.state.topics);
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
            <IonTitle>Constitution</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding">
            <div className="akoma-ntoso" ref={this.rootRef}>
            </div>
          </div>
          {this.state.topics.length > 0 && (
          <IonList className="ion-padding-bottom">
            <IonListHeader color="light">
              <IonLabel>Related Guides</IonLabel>
            </IonListHeader>
            {this.state.topics.map((topic: any, index: any) => (
              <TopicItem key={topic.id} topic={topic} />
            ))}
          </IonList>
        )}
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Constitution);
