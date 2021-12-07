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

import {Virtuoso} from "react-virtuoso";
import {useWindowSize} from "../../custom-hooks/useWindowResize";

const Topics: React.FC = () => {
  const [windowWidth] = useWindowSize();
  const { t } = useTranslation('topic');
  return (
    <IonPage>
      <IonContent className="virtual-list-container">
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
          {windowWidth <= 425 ? (
              <Virtuoso
                  style={{ height: '100%' }}
                  totalCount={data.topics.length}
                  itemContent={(index) => {
                    return (
                        <TopicItem topic={data.topics[index]} key={data.topics[index].id} />
                    );
                  }}
              />
          ) : data.topics.map(item => <TopicItem topic={item} key={item.id} /> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;
