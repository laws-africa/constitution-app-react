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
import "./Cases.css";
import parse from "html-react-parser";
import { RouteComponentProps } from "react-router-dom";
import { arrowBack, close, search } from "ionicons/icons";
import { TopicItem } from "../../components/topic";
import HeaderSearch from "../../components/headerSearch/headerSearch";
import { svgs } from "../../assets/svgs";
import ActionAnchorLink from "../../components/Action/ActionAnchorLink";
import {useTranslation} from "react-i18next";
import {getCases} from "../../data/cases";
import {getGuides} from "../../data/guides";
import {useLanguage} from "../../custom-hooks/useLanguage";

interface Props extends RouteComponentProps<{ id: string }> {}

const Case: React.FC<Props> = ({ match }) => {
  const lang = useLanguage();
  const guides = getGuides(lang);
  const cases = getCases(lang);
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
    const thisCase = cases.find((c: { id: string; }) => c.id === match.params.id);
    // @ts-ignore
    setCase(thisCase);

    let topics: any[] = [];
    if (thisCase) {
      for (const id of thisCase.topics) {
        // @ts-ignore
        const topic = guides.find((topic) => topic.id === id);
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

  const { t } = useTranslation(['case', 'global'])

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
              <h4>{t('about_case_question_text','What was the case about?')}</h4>
              <div className="case-content">
                {parse(thisCase.facts_and_issues)}
              </div>
            </>
          )}

          {thisCase.right_and_principle.length > 0 && (
            <>
              <h4>{t('court_response_question', 'What did the Court say about the right or principle?')}</h4>
              <div className="case-content">
                {parse(thisCase.right_and_principle)}
              </div>
            </>
          )}

          {thisCase.interpretation.length > 0 && (
            <>
              <h4>
                {
                  t('how_court_find', {
                    ns: 'case',
                    defaultValue: 'How did the Court find?'
                  })
                }
              </h4>
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
          actionText={t('read_about_saflii_label', 'Read this case on SAFLII')}
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
              <span>
                {t('related_guides_label', {
                  ns: 'global',
                  defaultValue: 'Related Guides'
                })}
              </span>
            </IonToolbar>
            <IonList className="ion-padding">
              {topics.map((topic: any) => (
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
