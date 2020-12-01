import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSegment,
  IonTitle,
  IonSegmentButton
} from '@ionic/react';
import data from "../../assets/data/data.json";
import constitution from "../../assets/data/constitution.json";
import './Search.css';
import parse from 'html-react-parser';

const Search: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchableProvisions, setSearchableProvisions] = useState<any>([]);
  const [currentSegement, setCurrentSegment] = useState("all");

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
  const search = (event: any) => {
    if (event.target.value.length > 0) {
      setIsSearching(true);
      setSearchTerm(event.target.value.toLowerCase());
    } else {
      setIsSearching(false);
      setCurrentSegment("all")
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
      <IonList>
        {renderProvisions(provisions)}
        {renderCases(cases)}
        {renderTopics(topics)}
      </IonList>
    </>
  }

  const renderProvisions = (provisions: any) => {
    if (currentSegement === "all" || currentSegement === "constitution") {
      return provisions.map((provision: any, index: any) => (
        <IonItem key={index} routerLink={"/constitution/provision/" + provision.id}>
          <IonLabel>
            <h3>{provision.title}</h3>
          </IonLabel>
        </IonItem>
      ))
    }
  }

  const renderCases = (cases: any) => {
    if (currentSegement === "all" || currentSegement === "cases") {

      return cases.map((article: any, index: any) => (
        <IonItem key={index} routerLink={"/cases/" + article.id}>
          <IonThumbnail slot="start">
            <img src={"../../assets/images/case.svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={article.title} />
          </IonThumbnail>
          <IonLabel>
            <h3>{article.title}</h3>
            <p>{parse(article.snippet)}</p>
          </IonLabel>
        </IonItem>
      ))
    }
  }
  const renderTopics = (topics: any) => {
    if (currentSegement === "all" || currentSegement === "guides") {

      return topics.map((topic: any, index: any) => (
        <IonItem key={index} routerLink={"guides/" + topic.id}>
          <IonThumbnail slot="start">
            <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => { e.currentTarget.src = "../../assets/shapes.svg" }} alt={topic.title} />
          </IonThumbnail>
          <IonLabel>
            <h3>{topic.title}</h3>
            <p>{parse(topic.snippet)}</p>
          </IonLabel>
        </IonItem>
      ))
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder="Find topics, cases or sections..." onIonChange={(e) => search(e)}></IonSearchbar>
        {isSearching && (
          <IonSegment onIonChange={(e) => setCurrentSegment(e.detail.value || "all")} value={currentSegement}>
            <IonSegmentButton value="all">
              All
            </IonSegmentButton>
            <IonSegmentButton value="constitution">
              Constitution
            </IonSegmentButton>
            <IonSegmentButton value="cases">
              Cases
            </IonSegmentButton>
            <IonSegmentButton value="guides">
              Guides
            </IonSegmentButton>
          </IonSegment>
        )}
      </IonHeader>
      <IonContent>
        {isSearching && (
          renderSearchResults()
        )}
        {!isSearching && (
          <>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;