import React from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail
} from '@ionic/react';

interface TopicProps {
  topics: any [],
}

const Guides: React.FC<TopicProps> = ({topics}) => {
  return (
    <>
      {
        topics.length > 0 && (
          <IonList class="ion-margin-bottom">
            {
              topics.map((topic: any) => (
                <IonItem detail={true} key={topic.id} routerLink={"/guides/" + topic.id}>
                  <IonThumbnail slot="start">
                    <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg"
                    }} alt={topic.title}/>
                  </IonThumbnail>
                  <IonLabel>
                    <h3 className="ion-text-wrap">Read Section Guide</h3>
                  </IonLabel>
                </IonItem>
              ))
            }
          </IonList>
        )
      }
    </>
  )
}

export default Guides;