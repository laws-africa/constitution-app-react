import React, { useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewWillEnter,
  IonCard,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { arrowBack, search, close, arrowForward } from "ionicons/icons";
import data from "../../assets/data/data.json";
import "./Topics.css";
import parse from "html-react-parser";
import { constitutionRoot, toc } from "../../data/constitution";
import HeaderSearch from "../../components/headerSearch/headerSearch";
import { SearchCases } from "../../components/searchCases";
import { svgs } from "../../assets/svgs";

interface Props extends RouteComponentProps<{ id: string }> {}

const Topic: React.FC<Props> = ({ match }) => {
  const [topic, setTopic] = useState({
    title: "",
    topic_meaning: "",
    constitutional_prescriptions: "",
    interpretation: "",
    mechanism: "",
    legislation: "",
  });
  const [cases, setCases] = useState([]);
  const [references, setReferences] = useState([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [onSearch, setOnSearch] = useState(false);

  useIonViewWillEnter(() => {
    // @ts-ignore
    const topic: any = data.topics.find((t) => t.id === match.params.id);
    // @ts-ignore
    setTopic(topic);

    let cases = [];
    let references: any[] = [];

    if (topic) {
      for (const reference of topic.references) {
        const match = toc.itemsById.get(reference);
        if (match) references.push(match);
      }
      for (const caseId of topic.cases) {
        const linkedCase = data.cases.find((c) => c.id === caseId);
        if (linkedCase) cases.push(linkedCase);
      }
    }

    // @ts-ignore
    setCases(cases);
    // @ts-ignore
    setReferences(references);

    if (match.params.id && rootRef.current) {
      let id = match.params.id.split("_", 2).join("_");
      let provision = constitutionRoot.getElementById(id);
      if (provision) {
        // remove current elements
        while (rootRef.current.hasChildNodes())
          rootRef.current.childNodes[0].remove();
        rootRef.current.appendChild(provision.cloneNode(true));
      }
    }
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
          <IonTitle>{topic.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setOnSearch(!onSearch)}>
              <IonIcon icon={onSearch ? close : search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {onSearch && <HeaderSearch doc={contentRef.current} />}
      </IonHeader>
      <IonContent>
        <div className="ion-padding topic-heading">
          <h4 className="subheading">Guide to</h4>
          <h3>{topic.title}</h3>
          <h4 className="ion-margin-top">What does it say?</h4>
        </div>

        <div ref={contentRef}>
          <div className="ion-padding provision-insert">
            <div className="akoma-ntoso" ref={rootRef}></div>
          </div>

          <div className="ion-padding topic-info">
            <h4>What does it mean?</h4>
            <div className="topic-content">{parse(topic.topic_meaning)}</div>

            {topic.interpretation.length > 0 && (
              <>
                <h4>How was it interpreted by the courts?</h4>
                <div className="topic-content">
                  {parse(topic.interpretation)}
                </div>
              </>
            )}

            {topic.mechanism.length > 0 && (
              <>
                <h4>How does it work?</h4>
                <div className="topic-content">{parse(topic.mechanism)}</div>
              </>
            )}

            {topic.mechanism.length > 0 && (
              <>
                <h4>Which legislation gives effect to it?</h4>
                <div className="topic-content">{parse(topic.legislation)}</div>
              </>
            )}
          </div>
        </div>

        {references.length > 0 && (
          <IonButtons className="ion-padding-bottom ion-justify-content-center">
            {references.map((ref: any) => (
              <IonCard
                key={ref.id}
                className="con-buttons"
                routerLink={"/constitution/provision/" + ref.id}
                button
              >
                <div>
                  Section {ref.title}
                  <IonIcon slot="end" icon={arrowForward}></IonIcon>
                </div>
              </IonCard>
            ))}
          </IonButtons>
        )}

        {cases.length > 0 && (
          <div>
            <IonToolbar class="related-guides" color="primary">
              <IonIcon
                size="large"
                slot="start"
                icon={svgs.CASES_WHITE}
              ></IonIcon>
              <span>Related Cases</span>
            </IonToolbar>
            <IonList className="ion-padding">
              {cases.map((c: any, index) => (
                <SearchCases key={"case-" + c.id} caseItem={c} />
              ))}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Topic;
