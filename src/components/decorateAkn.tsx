import { IonList } from "@ionic/react";
import React from "react";
import ReactDOM from "react-dom";
import Portal from "./Portal";
import { TopicItem } from "./topic";

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
          div.className = 'decoration';
          // @ts-ignore
          heading.parentNode.insertBefore(div, heading.nextSibling);

          const widget = <Portal element={div}>
            <IonList>
              <TopicItem key={topic.id} topic={topic} />
            </IonList>
          </Portal>;

          ReactDOM.render(widget, div);
        }
      }

    }
  }