import React from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonButton,
  IonCol,
  IonIcon,
} from "@ionic/react";
import data from "../../assets/data/data.json";
import "./Topics.css";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";
import {useTranslation} from "react-i18next";

const Topics: React.FC = () => {
  const { t } = useTranslation('topic');
  return (
    <IonPage>
      <IonContent>
        <div className="ion-padding">
          <section className="tab-title">
            <IonCol size="1" class="icon ion-no-padding">
              <IonIcon size="small" icon={svgs.GUIDES}></IonIcon>
            </IonCol>
            <h2>{t('page_title', 'Guides')} </h2>
            <IonButton
              className="ion-no-padding"
              fill="clear"
              routerLink={"/search/guides"}
            >
              {t('search_button_label', 'Search')}
            </IonButton>
          </section>

          <hr className="header-divider" />

          <p>{t('section_description_text', 'Guides to the sections of the Constitution.')}</p>
          <hr className="list-divider" />
        </div>
        <IonList className="ion-padding">
          {data.topics.map((topic) => (
            <TopicItem topic={topic} key={topic.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;
