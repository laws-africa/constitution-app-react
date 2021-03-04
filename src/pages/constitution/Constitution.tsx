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
  IonItem,
  IonLabel,
  IonThumbnail,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { constitutionRoot } from '../../data/constitution';
import { findTopicsByProvisionId } from '../../data/search';
import { TopicItem } from '../../components/topic';

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string; }> { }
interface State {
  results: any[]
}

class Constitution extends React.Component<Props, State> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Document;

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      results: []
    };

    // parse the constitution HTML once
    this.constitution = constitutionRoot;
  }

  getTopics() {
    const topicResults = findTopicsByProvisionId(this.props.match.params.id);
    this.setState({results: [...topicResults]});
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
          {
            this.state.results.length > 0 && (
              <IonList>
                {
                  this.state.results.map((result: any) => (
                    <IonItem detail={true} key={result.id} routerLink={"/guides/" + result.id}>
                      <IonThumbnail slot="start">
                        <img src={"../../assets/images/" + result.id + ".svg"} onError={(e) => {
                          e.currentTarget.src = "../../assets/shapes.svg"
                        }} alt={result.title}/>
                      </IonThumbnail>
                      <IonLabel>
                        <h3 className="ion-text-wrap">Read Section Guide</h3>
                      </IonLabel>
                    </IonItem>
                  ))
                }
              </IonList>
            )
          }
          <div className="ion-padding">
            <div className="akoma-ntoso" ref={this.rootRef}></div>
          </div>
          <IonToolbar color="light">
            <IonTitle>Related Guides</IonTitle>
          </IonToolbar>
          {
            this.state.results.length > 0 && (
              <IonCard>
                <IonCardContent>
                  {
                    this.state.results.map((result: any) => (
                      <TopicItem key={result.id} topic={result} />
                    ))
                  }
                </IonCardContent>
              </IonCard>
            )
          }
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Constitution);
