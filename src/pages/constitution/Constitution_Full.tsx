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
import decorateAkn from '../../components/decorateAkn';
import HeaderSearch from '../../components/headerSearch/headerSearch';
import { svgs } from '../../assets/svgs';
import { withTranslation } from "react-i18next";
import {iTFunc} from "../../common-types";
import {getGuides, Guide} from "../../data/guides";

function previous() {
  window.history.back();
}

interface Props extends iTFunc, RouteComponentProps<{ id: string; }> { }

type MyState = {
  search: Boolean;
  constitution: Expression | null,
  topics: Guide[],
};

class Constitution_Full extends React.Component<Props, MyState> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;
  // private readonly constitution: Expression;
  constructor(props: any) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      topics: getGuides(localStorage.getItem('locale') || 'en'),
      search: false,
      constitution: getExpression(localStorage.getItem('locale') || 'en')
    };
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
    this.setState({ constitution: getExpression(localStorage.getItem('locale') || 'en') });
  }

  injectAkn() {
    if (this.rootRef.current) {
      console.log('rendering constitution');
      this.rootRef.current.innerHTML = "";
      // @ts-ignore
      this.rootRef.current.appendChild(this.state.constitution.body.cloneNode(true));

      if (this.state.constitution) {
      const elements = this.state.constitution.body.getElementsByTagName('a');
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

      decorateAkn(this.rootRef.current, this.state.topics);
    }
  }

  componentDidMount() {
    this.injectAkn();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<MyState>, snapshot?: any) {
    this.injectAkn();
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
                {this.state.constitution ?
                  <TOCList
                    items={this.state.constitution.toc.flattened}
                    overrideClickEvt={(data: any) => this.scroll(data)}
                  />
                  : null}
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
