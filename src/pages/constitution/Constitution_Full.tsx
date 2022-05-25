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
  withIonLifeCycle,
  IonRow
} from '@ionic/react';
import './Constitution.css';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack, close, search } from 'ionicons/icons';
import { getExpression, Expression } from '../../data/constitution';
import TOCList from "../../components/TOCList";
import data from "../../assets/data/data.json";
import decorateAkn from '../../components/decorateAkn';
import HeaderSearch from '../../components/headerSearch/headerSearch';
import { svgs } from '../../assets/svgs';
import { withTranslation } from "react-i18next";
import {iTFunc} from "../../common-types";

function previous() {
  window.history.back();
}

interface Props extends iTFunc, RouteComponentProps<{ id: string; }> { }

type MyState = {
  search: Boolean;
};

class Constitution_Full extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  private readonly constitution: Expression;
  private readonly topics: any [];

  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.topics = data.topics;
    this.state = {
      search: false
    };

    // parse the constitution HTML once
    // TODO: language
    this.constitution = getExpression('eng');

    // add event handlers to scroll to provision when internal link is clicked
    if (this.constitution) {
      const elements = this.constitution.body.getElementsByTagName('a');
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
    this.setState({search: false});
  }

  componentDidMount(): void {
    if (this.rootRef.current && this.rootRef.current.childElementCount === 0) {
      console.log('rendering constitution');
      // @ts-ignore
      this.rootRef.current.appendChild(this.constitution.cloneNode(true));
      decorateAkn(this.rootRef.current, this.topics);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<MyState>, nextContext: any): boolean {
    // the view state never actually changes
    return this.state.search !== nextState.search;
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
            <IonTitle>{this.props.t('constitution_title', 'Constitution')}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => this.setState({search: !this.state.search})}>
                <IonIcon icon={this.state.search ? close : search}></IonIcon>
              </IonButton>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
          {
            this.state.search && <HeaderSearch doc={this.rootRef.current} />
          }
        </IonHeader>
        <IonMenu side="end" menuId="first" contentId="constitution">
          <IonContent>
            <IonList className="full-height-mobile">
              <IonMenuToggle auto-hide="true">
                <TOCList
                    items={this.constitution.toc.flattened}
                    overrideClickEvt={(data: any) => this.scroll(data)}
                />
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="constitution"></IonRouterOutlet>
        <IonContent>
          <div className="ion-padding">
            <IonRow class="ion-justify-content-center top-icon"><IonIcon size="small" icon={svgs.CONSTITUTION}></IonIcon></IonRow>
            <div className="akoma-ntoso" ref={this.rootRef}></div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withTranslation('constitution')(withIonLifeCycle(Constitution_Full));
