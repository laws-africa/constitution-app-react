import React from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonPage,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./Topics.css";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";
import {useTranslation} from "react-i18next";

import {Virtuoso} from "react-virtuoso";
import {useWindowSize} from "../../custom-hooks/useWindowResize";
import { getGuides, Guide} from "../../data/guides";
import {useLanguage} from "../../custom-hooks/useLanguage";
import { search } from 'ionicons/icons';


const Topics: React.FC = () => {
  const [windowWidth] = useWindowSize();
  const {t} = useTranslation('topic');
  const lang = useLanguage();
  const guides = getGuides(lang);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="small" icon={svgs.GUIDES}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{t('page_title', 'Guides')}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/search/guides"}>
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="virtual-list-container">
        <div className="ion-padding">
          <h2>{t('page_title', 'Guides')} </h2>
          <p>{t('section_description_text', 'Guides to the sections of the Constitution.')}</p>
        </div>
        <IonList className="ion-padding">
          {windowWidth <= 425 ? (
            <Virtuoso
              style={{height: '100%'}}
              totalCount={guides.length}
              itemContent={(index: string | number) => {
                return (
                  <TopicItem topic={guides[index]} key={guides[index].id}/>
                );
              }}
            />
          ) : guides.map((item: Guide) => <TopicItem topic={item} key={item.id} /> )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;
