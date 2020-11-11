import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, home, document, documents, help, search } from 'ionicons/icons';
import Topics from './pages/topics/Topics';
import Topic from './pages/topics/Topic';
import Constitution from './pages/constitution/Constitution';
import Home from './pages/home/Home';
import Cases from './pages/cases/Cases';
import Case from './pages/cases/Case';
import Help from './pages/help/Help';
import Search from './pages/search/Search';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/topics" component={Topics} exact={true} />
          <Route path="/topics/:id" component={Topic} exact={true} />
          <Route path="/constitution" component={Constitution} exact={true} />
          <Route path="/constitution/:id" component={Constitution} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/cases" component={Cases} exact={true} />
          <Route path="/cases/:id" component={Case} exact={true} />
          <Route path="/help" component={Help} exact={true} />
          <Route path="/search" component={Search} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="topics" href="/topics">
            <IonIcon icon={people} />
            <IonLabel>Topics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="constitution" href="/constitution">
            <IonIcon icon={document} />
            <IonLabel>Constitution</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cases" href="/cases">
            <IonIcon icon={documents} />
            <IonLabel>Cases</IonLabel>
          </IonTabButton>
          <IonTabButton tab="help" href="/help">
            <IonIcon icon={help} />
            <IonLabel>Help</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;