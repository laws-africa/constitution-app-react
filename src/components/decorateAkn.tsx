import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";
import { createRoot } from 'react-dom/client';
import Portal from "./Portal";

/**
 * Insert decorations into an AKN document container.
 */

export default function decorateAkn (node: HTMLDivElement, topics: any[]) {
    // insert section guide decorations
    for (const topic of topics) {
      // assume only one topic for each reference
      for (const element_id of topic.references) {
        const ref = node.querySelector(`[id="${element_id}"]`);

        if (ref) {
          const heading = ref.firstElementChild;
          const div = document.createElement('div');
          div.className = 'decoration ion-margin-bottom';
          // @ts-ignore
          heading.parentNode.insertBefore(div, heading.nextSibling);

          const widget = (
            <Portal element={div}>
              <IonList>
                <IonItem
                  key={"topic-" + topic.id}
                  routerLink={"/guides/" + topic.id}
                  className="ion-no-padding"
                  detail
                >
                  <IonIcon
                    slot="start"
                    size="small"
                    icon={"../../assets/images/" + topic.id + ".svg"}
                  ></IonIcon>
                  <IonLabel>Read Section Guide</IonLabel>
                </IonItem>
              </IonList>
            </Portal>
          );

          createRoot(div).render(widget);
        }
      }

    }
  }
