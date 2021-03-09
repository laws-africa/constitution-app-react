import React, { useEffect, useState } from "react";
import Mark from "mark.js";
import './headerSearch.css';
import { IonButton, IonButtons, IonIcon, IonInput, IonItemDivider } from "@ionic/react";
import { arrowDown, arrowUp } from 'ionicons/icons';

interface Props {
  doc: any
}

const HeaderSearch: React.FC<Props> = ({doc}) => {
  const [needle, setNeedle] = useState<string>('');
  const [marks, setMarks] = useState<NodeListOf<HTMLElement>>(document.querySelectorAll('mark'));
  const [currentIndex, setCurrentIndex] =  useState<number>(0);
  const [mark, setMark] = useState<Mark | null>(new Mark(doc));

  useEffect(() => {
    search()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needle]); 

  const jumpTo = () => {
    if (marks.length > 0) {
      const currentMark = marks[currentIndex];
      marks.forEach(mark => mark.classList.remove('current'));
      if (currentMark) {
        currentMark.classList.add('current');
        currentMark.scrollIntoView({
          behavior: "smooth",
          inline: "start"
        });
      }
    }
  }

  function updateCurrentIndex(indx: number) {
    if (indx < 0) indx = marks.length - 1;
    if (indx > marks.length - 1) indx = 0;
    setCurrentIndex(indx);
  }

  const jumpToNext = () => {
    updateCurrentIndex(currentIndex + 1);
  }
  const jumpToPrevious = () => {
    updateCurrentIndex(currentIndex - 1);
  }
    
  useEffect(() => {
    jumpTo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  const search = () => {
    setCurrentIndex(0)

    if (needle && needle !== '') {
      if (!mark) {
        if (doc) {
          setMark(new Mark(doc));
        }
      }
      // unmark existing marks
      mark?.unmark({
        done: () => markResults()
      });
    } else {
      if (mark) {
        mark.unmark();
        setMark(null);
      }
    }
  }
    
  const markResults = () => {
    mark?.mark(needle, {
      separateWordSearch: true,
      done: () => {
        // stash the marks for later navigation
        const marksArray = document.querySelectorAll('mark');
        setMarks(marksArray);
        jumpTo();
      }
    });
  }

  const onChange = (e: any) => {
    setNeedle(e.target.value);
  }
  
  return (
    <div>
      <IonItemDivider class="ion-no-padding" />
      <div className="search-tab">
        <IonInput onIonChange={onChange} value={needle} placeholder='Enter Search' clearInput />
        {
          (needle && marks && marks.length > 0) && <span>{ currentIndex + 1 }/{ marks.length }</span>
        }
        <IonButtons slot="end">
          <IonButton onClick={jumpToPrevious}>
            <IonIcon color="medium" icon={arrowUp} />
          </IonButton>
          <IonButton onClick={jumpToNext}>
            <IonIcon color="medium" icon={arrowDown} />
          </IonButton>
        </IonButtons>
      </div>
      <IonItemDivider class="ion-no-padding" />
    </div>
  )
};

export default HeaderSearch;