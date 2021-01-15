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
import './Search.css';
import { TopicItem } from '../../components/topic';
import { CaseItem } from "../../components/case";
import { TOCItem } from "../../components/constitutionTOC";
import { RuleTOCItem } from "../../components/rulesTOC";
import { RouteComponentProps } from "react-router-dom";
import { searchContent } from "../../data/search";

interface Props extends RouteComponentProps<{ segment: string; }> { }

const Search: React.FC<Props> = ({ match }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSegment, setCurrentSegment] = useState("constitution");

  useEffect(() => {
    if (match.params.segment) {
      setCurrentSegment(match.params.segment)
    }
  }, [match.params.segment]);

  const search = (event: any) => {
    if (event.target.value.length > 0) {
      setIsSearching(true);
      setSearchTerm(event.target.value.toLowerCase());
    } else {
      setIsSearching(false);
      setSearchTerm("")
    }
  };

  const renderSearchResults = () => {
    const results = searchContent(searchTerm, currentSegment);
    console.log(results);

    return <>
      <IonList>
        {currentSegment === "constitution" && renderProvisions(results)}
        {currentSegment === "rules" && renderRuleProvisions(results)}
        {currentSegment === "guides" && renderTopics(results)}
        {currentSegment === "cases" && renderCases(results)}
      </IonList>
    </>
  };

  const renderProvisions = (results: any) => {
    return results.map((result: any) => (
      <TOCItem item={result.item}/>
    ))
  };

  const renderRuleProvisions = (results: any) => {
    return results.map((result: any) => (
      <RuleTOCItem item={result.item}/>
    ))
  };

  const renderCases = (results: any) => {
    console.log(results);
    return results.map((result: any) => (
      <CaseItem kase={result.item}/>
    ))
  };

  const renderTopics = (results: any) => {
    return results.map((result: any) => (
      <TopicItem topic={result.item}/>
    ))
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder="Find guides, cases or sections..."  onIonChange={(e) => search(e)} />
          <IonSegment onIonChange={(e) => setCurrentSegment(e.detail.value || "constitution")} value={currentSegment}>
            <IonSegmentButton value="constitution">Constitution</IonSegmentButton>
            <IonSegmentButton value="guides">Guides</IonSegmentButton>
            <IonSegmentButton value="rules">Rules</IonSegmentButton>
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
