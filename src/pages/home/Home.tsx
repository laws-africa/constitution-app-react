import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonSearchbar,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import data from "../../assets/data/data.json";
import constitution from "../../assets/data/constitution.json";
import './Home.css';
import parse from 'html-react-parser';

const Home: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchableProvisions, setSearchableProvisions] = useState<any>([]);

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
  const search = (event: any) => {
    if (event.target.value.length > 0) {
      const searchData = setupConstitutionSearch();
      setSearchableProvisions(searchData);
      setIsSearching(true);
      setSearchTerm(event.target.value.toLowerCase());
    } else {
      setIsSearching(false);
      setSearchTerm("")
    }

    return
  }

  const renderSearchResults = () => {
    const needle = searchTerm.toLocaleLowerCase();

    const cases = data.cases.filter((x: any) => x.title.toLowerCase().includes(needle) || (x.summary ? x.summary.includes(needle) : null));
    const topics = data.topics.filter((x: any) => x.title.toLowerCase().includes(needle) || (x.summary ? x.summary.includes(needle) : null));
    const provisions = searchableProvisions.filter((x: any) => x.titleLower.includes(needle) || x.content.includes(needle));

    return <>
      {JSON.stringify(provisions)}
      {/* {JSON.stringify(cases)} */}

      {/* {JSON.stringify(topics)} */}
    </>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar onIonChange={(e) => search(e)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isSearching && (
          renderSearchResults()
        )}
        {!isSearching && (
          <>
            <IonListHeader>
              Highlights
            </IonListHeader>
            <IonGrid>
              <IonRow>
                {data.topics.filter((o) => o.highlighted === true).map((highlight, index) => (
                  <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                    <IonCard routerLink={"topics/" + highlight.id}>
                      <IonCardHeader>
                        <IonCardTitle>{highlight.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>{parse(highlight.snippet)}</IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
            <IonListHeader>
              Popular Topics
            </IonListHeader>
            <IonGrid>
              <IonRow>
                {data.topics.filter((o) => o.featured === true).map((topic, index) => (
                  <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                    <IonCard routerLink={"topics/" + topic.id}>
                      <IonCardHeader>
                        <IonCardTitle>{topic.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="3">
                              <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => { e.currentTarget.src = "../../assets/shapes.svg" }} alt={topic.title} />
                            </IonCol>
                            <IonCol size="9">
                              {parse(topic.snippet)}
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
            <IonListHeader>
              Popular Cases
            </IonListHeader>
            <IonGrid>
              <IonRow>
                {data.cases.filter((o) => o.featured === true).map((article, index) => (
                  <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{article.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>{parse(article.snippet)}</IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;