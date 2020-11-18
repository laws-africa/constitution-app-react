import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
} from '@ionic/react';
import constitution from "../../assets/data/constitution.json";
import './Constitution.css';

const Constitutions: React.FC = () => {
  const [searchTerm] = useState("")
  const [searchableProvisions, setSearchableProvisions] = useState<any>([]);
  const [currentSegement] = useState("all");

  useEffect(() => {
    const searchData = setupConstitutionSearch();
    setSearchableProvisions(searchData);
  }, [])

  const setupConstitutionSearch = () => {
    let searchData: { titleLower: string; title: string | null; content: string; id: string; }[] = [];
    // everything that can contain searchable text
    const selector = '.akn-p, .akn-listIntroduction, .akn-intro, .akn-wrapUp';
    const body = new DOMParser().parseFromString(constitution.body, 'text/html');

    body.querySelectorAll('.akn-section').forEach((section) => {
      // gather text content
      const text: (string | null)[] = [];
      section.querySelectorAll(selector).forEach(elem => {
        text.push(elem.textContent);
      });
      let titleSelector = section.querySelector('h3');
      let title = titleSelector ? titleSelector.textContent : "";

      searchData.push({
        titleLower: title ? title.toLocaleLowerCase() : "",
        title: title,
        content: text.join(' ').toLocaleLowerCase(),
        id: section.id
      });

    });

    return searchData;
  }

  const renderSearchResults = () => {
    const needle = searchTerm.toLocaleLowerCase();

    const provisions = searchableProvisions.filter((x: any) => x.titleLower.includes(needle) || x.content.includes(needle));

    return <>
      <IonList>
        {renderProvisions(provisions)}
      </IonList>
    </>
  }

  const renderProvisions = (provisions: any) => {
    if (currentSegement === "all" || currentSegement === "constitution") {
      return provisions.map((provision: any, index: any) => (
        <IonItem key={index} routerLink={"/constitutions/" + provision.id}>
          <IonLabel>
            <h3>{provision.title}</h3>
          </IonLabel>
        </IonItem>
      ))
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Constitution</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          renderSearchResults()
        }
        {
          <>
          </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Constitutions;