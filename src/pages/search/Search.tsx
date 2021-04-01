import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonCol,
  IonIcon,
  IonHeader,
} from "@ionic/react";
import "./Search.css";
import { TopicItem } from "../../components/topic";
import { RuleTOCItem } from "../../components/rulesTOC";
import { RouteComponentProps } from "react-router-dom";
import { searchContent } from "../../data/search";
import { svgs } from "../../assets/svgs";
import { SearchConstitution } from "../../components/searchConstitution";
import { SearchCases } from "../../components/searchCases";

interface Props extends RouteComponentProps<{ segment: string }> {}

const Search: React.FC<Props> = ({ match }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSegment, setCurrentSegment] = useState("guides");

  useEffect(() => {
    if (match.params.segment) {
      setCurrentSegment(match.params.segment);
    }
  }, [match.params.segment]);

  const search = (event: any) => {
    if (event.target.value.length > 0) {
      setIsSearching(true);
      setSearchTerm(event.target.value);
    } else {
      setIsSearching(false);
      setSearchTerm("");
    }
  };

  const renderSearchResults = () => {
    const results = searchContent(searchTerm, currentSegment);

    return (
      <>
        <IonList className="ion-no-padding">
          {currentSegment === "constitution" && renderProvisions(results)}
          {currentSegment === "rules" && renderRuleProvisions(results)}
          {currentSegment === "guides" && renderTopics(results)}
          {currentSegment === "cases" && renderCases(results)}
        </IonList>
        <div className="ion-text-center ion-margin-top ion-padding-top">
          {results.length <= 0 && <p>Nothing matches your search.</p>}
        </div>
      </>
    );
  };

  const renderProvisions = (results: any) => {
    return results.map((result: any) => {
      return <SearchConstitution provision={result.item} />;
    });
  };

  const renderRuleProvisions = (results: any) => {
    return results.map((result: any) => <RuleTOCItem item={result.item} />);
  };

  const renderCases = (results: any) => {
    return results.map((result: any) => <SearchCases caseItem={result.item} />);
  };

  const renderTopics = (results: any) => {
    return results.map((result: any) => <TopicItem topic={result.item} />);
  };

  return (
    <IonPage className="ion-padding">
      <IonHeader>
        <section className="search-title">
          <IonCol size="1" class="icon ion-no-padding">
            <IonIcon size="small" icon={svgs.SEARCH}></IonIcon>
          </IonCol>
          <h2>Search</h2>
        </section>

        <hr className="header-divider" />
        <IonSearchbar
          className="ion-no-margin ion-no-padding search-bar"
          placeholder="Find guides, cases or sections..."
          onIonChange={(e) => search(e)}
        />
        <IonSegment
          onIonChange={(e) => setCurrentSegment(e.detail.value || "guides")}
          value={currentSegment}
          mode="md"
          scrollable
        >
          <IonSegmentButton value="constitution">Constitution</IonSegmentButton>
          <IonSegmentButton value="guides">Guides</IonSegmentButton>
          <IonSegmentButton value="rules">Rules</IonSegmentButton>
          <IonSegmentButton value="cases">Cases</IonSegmentButton>
        </IonSegment>
        <hr />
      </IonHeader>
      
      <IonContent>
        {isSearching && renderSearchResults()}
        {!isSearching && <></>}
      </IonContent>
    </IonPage>
  );
};

export default Search;
