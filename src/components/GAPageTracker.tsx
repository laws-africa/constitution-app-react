import React from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga";

type GAPageTackerType = {
  trackingCode: string;
};

const GaPageTracker = ({ trackingCode }: GAPageTackerType) => {
  const [gaInitialized, setGaInitialized] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    if (!gaInitialized) {
      ReactGA.initialize(trackingCode);
      setGaInitialized(true);
    }
  }, [gaInitialized, trackingCode]);

  React.useEffect(() => {
    if (gaInitialized) {
      console.log(location.pathname);
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location, gaInitialized]);
  return <React.Fragment />;
};

export default GaPageTracker;
