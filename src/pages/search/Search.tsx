import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonSegment,
  IonTitle,
  IonSegmentButton,
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Search.css';
import { constitutionRoot } from "../../data/constitution";
import { TopicItem } from '../../components/topic';
import { CaseItem } from "../../components/case";
import { TOCItem } from "../../components/constitutionTOC";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ segment: string; }> { }

const Search: React.FC<Props> = ({ match }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchableProvisions, setSearchableProvisions] = useState<any>([]);
  const [currentSegement, setCurrentSegment] = useState("all");

  useEffect(() => {
    if (match.params.segment) {
      setCurrentSegment(match.params.segment)
    }

    const searchData = setupConstitutionSearch();
    setSearchableProvisions(searchData);
  }, [match.params.segment])

  const setupConstitutionSearch = () => {
    let searchData: { titleLower: string; title: string | null; content: string; id: string; }[] = [];
    // everything that can contain searchable text
    const selector = '.akn-p, .akn-listIntroduction, .akn-intro, .akn-wrapUp';

    constitutionRoot.querySelectorAll('.akn-section').forEach((section) => {
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
        <TOCItem item={provision}/>
      ))
    }
  }

  const renderCases = (cases: any) => {
    if (currentSegement === "all" || currentSegement === "cases") {

      return cases.map((kase: any) => (
        <CaseItem kase={kase}/>
      ))
    }
  }
  const renderTopics = (topics: any) => {
    if (currentSegement === "all" || currentSegement === "guides") {

      return topics.map((topic: any, index: any) => (
        <TopicItem topic={topic}/>
      ))
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder="Find guides, cases or sections..."  onIonChange={(e) => search(e)}></IonSearchbar>
          <IonSegment onIonChange={(e) => setCurrentSegment(e.detail.value || "all")} value={currentSegement}>
            <IonSegmentButton value="all">All</IonSegmentButton>
            <IonSegmentButton value="constitution">Constitution</IonSegmentButton>
            <IonSegmentButton value="guides">Guides</IonSegmentButton>
            <IonSegmentButton value="cases">Cases</IonSegmentButton>
          </IonSegment>
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
