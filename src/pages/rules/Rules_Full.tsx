import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
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
import './Rules.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack, close, search } from 'ionicons/icons';
import { rulesBody } from '../../data/rules';
import { TOCList } from "../../components/rulesTOC";
import HeaderSearch from '../../components/headerSearch';

function previous() {
  window.history.back();
}

interface Props extends RouteComponentProps<{ id: string; }> { }

type MyState = {
  search: Boolean;
};

class Rules_Full extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly rules: Element | null;
  
  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      search: false
    };

    // parse the rules HTML once
    this.rules = rulesBody;

    // add event handlers to scroll to provision when internal link is clicked
    if (this.rules) {
      const elements = this.rules.getElementsByTagName('a')
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

  scroll(item: any) {
    let el = document.getElementById(item.id);

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
      console.log('rendering rules');
      // @ts-ignore
      this.rootRef.current.appendChild(this.rules.cloneNode(true));
    }
  }

  // shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
  //   // the view state never actually changes
  //   return false;
  // }

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
            <IonTitle>Rules</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => this.setState({search: !this.state.search})}>
                <IonIcon icon={this.state.search ? close : search}></IonIcon>
              </IonButton>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
          {
            this.state.search && <HeaderSearch />
          }
        </IonHeader>
        <IonMenu side="end" menuId="first" contentId="rules">
          <IonContent>
            <IonList>
              <IonMenuToggle auto-hide="true">
                <TOCList onClick={this.scroll} />
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="rules"></IonRouterOutlet>
        <IonContent>
          <div className="ion-padding">
            <div className="akoma-ntoso" ref={this.rootRef}></div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Rules_Full);
