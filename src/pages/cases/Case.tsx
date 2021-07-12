import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonButtons,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import data from "../../assets/data/data.json";
import "./Cases.css";
import parse from "html-react-parser";
import { RouteComponentProps } from "react-router-dom";
import { arrowBack, close, search } from "ionicons/icons";
import { TopicItem } from "../../components/topic";
import HeaderSearch from "../../components/headerSearch/headerSearch";
import { svgs } from "../../assets/svgs";
import ActionAnchorLink from "../../components/Action/ActionAnchorLink";

interface Props extends RouteComponentProps<{ id: string }> {}

const Case: React.FC<Props> = ({ match }) => {
  const [thisCase, setCase] = useState({
    title: "",
    snippet: "",
    facts_and_issues: "",
    right_and_principle: "",
    interpretation: "",
    href: "",
  });
  const [topics, setTopics] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useIonViewWillEnter(() => {
    const thisCase = data.cases.find((c) => c.id === match.params.id);
    // @ts-ignore
    setCase(thisCase);

    let topics: any[] = [];
    if (thisCase) {
      for (const id of thisCase.topics) {
        // @ts-ignore
        const topic = data.topics.find((topic) => topic.id === id);
        if (topic) topics.push(topic);
      }
    }

    // @ts-ignore
    setTopics(topics);
    setOnSearch(false);
  });

  const previous = () => {
    window.history.back();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={previous}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle class="ion-title">{thisCase.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setOnSearch(!onSearch)}>
              <IonIcon icon={onSearch ? close : search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {onSearch && <HeaderSearch doc={rootRef.current} />}
      </IonHeader>
      <IonContent>
        <h3 className="case-title">{thisCase.title}</h3>
        <div ref={rootRef} className="ion-padding">
          <div className="case-content">{parse(thisCase.snippet)}</div>

          {thisCase.facts_and_issues.length > 0 && (
            <>
              <h4>What was the case about?</h4>
              <div className="case-content">
                {parse(thisCase.facts_and_issues)}
              </div>
            </>
          )}

          {thisCase.right_and_principle.length > 0 && (
            <>
              <h4>What did the Court say about the right or principle?</h4>
              <div className="case-content">
                {parse(thisCase.right_and_principle)}
              </div>
            </>
          )}

          {thisCase.interpretation.length > 0 && (
            <>
              <h4>How did the Court find?</h4>
              <div className="case-content">
                {parse(thisCase.interpretation)}
              </div>
            </>
          )}
        </div>

        <ActionAnchorLink
          href={thisCase.href}
          target="_blank"
          rel="noopener noreferrer"
          className="no-text-decoration"
          actionText="Read this case on SAFLII"
        />

        <br />

        {topics.length > 0 && (
          <div>
            <IonToolbar class="related-guides" color="primary">
              <IonIcon
                size="large"
                slot="start"
                icon={svgs.GUIDES_WHITE}
              ></IonIcon>
              <span>Related Guides</span>
            </IonToolbar>
            <IonList className="ion-padding">
              {topics.map((topic: any, index: any) => (
                <TopicItem key={topic.id} topic={topic} />
              ))}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Case;
