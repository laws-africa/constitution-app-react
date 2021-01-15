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
import { TopicItem } from '../../components/topic';
import { CaseItem } from "../../components/case";
import { TOCItem } from "../../components/constitutionTOC";
import { RuleTOCItem } from "../../components/rulesTOC";
import { RouteComponentProps } from "react-router-dom";
import { searchableProvisions, searchableRuleProvisions } from "../../data/search";

interface Props extends RouteComponentProps<{ segment: string; }> { }

const Search: React.FC<Props> = ({ match }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSegement, setCurrentSegment] = useState("constitution");

  useEffect(() => {
    if (match.params.segment) {
      setCurrentSegment(match.params.segment)
    }
  }, [match.params.segment])

  const search = (event: any) => {
    if (event.target.value.length > 0) {
      setIsSearching(true);
      setSearchTerm(event.target.value.toLowerCase());
    } else {
      setIsSearching(false);
      setCurrentSegment("constitution")
      setSearchTerm("")
    }
  };

  const renderSearchResults = () => {
    const needle = searchTerm.toLocaleLowerCase();

    const cases = data.cases.filter((x: any) => x.title.toLowerCase().includes(needle) || (x.snippet ? x.snippet.includes(needle) : null));
    const topics = data.topics.filter((x: any) => x.title.toLowerCase().includes(needle) || (x.summary ? x.summary.includes(needle) : null));
    const provisions = searchableProvisions.filter((x: any) => x.titleLower.includes(needle) || x.content.includes(needle));
    const ruleProvisions = searchableRuleProvisions.filter((x: any) => x.titleLower.includes(needle) || x.content.includes(needle));

    return <>
      <IonList>
        {renderProvisions(provisions)}
        {renderRuleProvisions(ruleProvisions)}
        {renderCases(cases)}
        {renderTopics(topics)}
      </IonList>
    </>
  };

  const renderProvisions = (provisions: any) => {
    if (currentSegement === "constitution") {
      return provisions.map((provision: any, index: any) => (
        <TOCItem item={provision}/>
      ))
    }
  };

  const renderRuleProvisions = (ruleProvisions: any) => {
    if (currentSegement === "rules") {
      return ruleProvisions.map((ruleProvisions: any, index: any) => (
        <RuleTOCItem item={ruleProvisions}/>
      ))
    }
  };

  const renderCases = (cases: any) => {
    if (currentSegement === "cases") {
      return cases.map((kase: any) => (
        <CaseItem kase={kase}/>
      ))
    }
  };

  const renderTopics = (topics: any) => {
    if (currentSegement === "guides") {
      return topics.map((topic: any, index: any) => (
        <TopicItem topic={topic}/>
      ))
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonSearchbar placeholder="Find guides, cases or sections..."  onIonChange={(e) => search(e)}></IonSearchbar>
          <IonSegment onIonChange={(e) => setCurrentSegment(e.detail.value || "constitution")} value={currentSegement}>
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
