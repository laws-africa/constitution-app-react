import React from 'react';
import { Route } from 'react-router-dom';
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
import Topics from './pages/topics/Topics';
import Topic from './pages/topics/Topic';
import Constitution from './pages/constitution/Constitution';
import ConstitutionTOC from './pages/constitution/ConstitutionTOC';
import Constitution_Full from './pages/constitution/Constitution_Full';
import Rules from './pages/rules/Rules';
import RulesTOC from './pages/rules/RulesTOC';
import Rules_Full from './pages/rules/Rules_Full';
import Home from './pages/home/Home';
import Cases from './pages/cases/Cases';
import Case from './pages/cases/Case';
import Help from './pages/help/Help';
import Search from './pages/search/Search';
import { svgs } from './assets/svgs';


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
import './theme/theme.css';
import './theme/global.css';
import LandingPage from './pages/LandingPage/LandingPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/guides" component={Topics} exact={true} />
          <Route path="/guides/:id" component={Topic} exact={true} />
          <Route
            path="/constitution"
            component={ConstitutionTOC}
            exact={true}
          />
          <Route
            path="/constitution/full"
            component={Constitution_Full}
            exact={true}
          />
          <Route
            path="/constitution/full/:id+"
            component={Constitution_Full}
            exact={true}
          />
          <Route
            path="/constitution/provision/:id+"
            component={Constitution}
            exact={true}
          />
          <Route path="/rules" component={RulesTOC} exact={true} />
          <Route path="/rules/full" component={Rules_Full} exact={true} />
          <Route path="/rules/full/:id+" component={Rules_Full} exact={true} />
          <Route path="/rules/provision/:id+" component={Rules} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/cases" component={Cases} exact={true} />
          <Route path="/cases/:id" component={Case} exact={true} />
          <Route path="/help" component={Help} exact={true} />
          <Route path="/search" component={Search} exact={true} />
          <Route path="/search/:segment" component={Search} exact={true} />
          <Route path="/" component={LandingPage} exact={true} />
        </IonRouterOutlet>
        <IonTabBar class="tab-bar" slot="bottom" color="light">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={svgs.HOME} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="guides" href="/guides">
            <IonIcon icon={svgs.GUIDES} />
            <IonLabel>Guides</IonLabel>
          </IonTabButton>
          <IonTabButton tab="constitution" href="/constitution">
            <IonIcon icon={svgs.CONSTITUTION} />
            <IonLabel>Constitution</IonLabel>
          </IonTabButton>
          <IonTabButton tab="rules" href="/rules">
            <IonIcon icon={svgs.RULES} />
            <IonLabel>NA Rules</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={svgs.SEARCH} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
