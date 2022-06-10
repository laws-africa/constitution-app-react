import React from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonButton,
  IonCol,
  IonIcon,
} from "@ionic/react";
import "./Topics.css";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";
import {useTranslation} from "react-i18next";

import { Virtuoso } from "react-virtuoso";
import {useWindowSize} from "../../custom-hooks/useWindowResize";
import { getGuides, Guide} from "../../data/guides";
import {useLanguage} from "../../custom-hooks/useLanguage";

const Topics: React.FC = () => {
  const [windowWidth] = useWindowSize();
  const lang = useLanguage();

  const {t} = useTranslation('topic');
  const guides = getGuides(lang)
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

            <hr className="header-divider"/>

            <p>{t('section_description_text', 'Guides to the sections of the Constitution.')}</p>
            <hr className="list-divider"/>
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
