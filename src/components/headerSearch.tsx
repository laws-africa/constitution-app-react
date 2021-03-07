import React, { useEffect, useState } from "react";
import Mark from "mark.js";
import { IonButton, IonButtons, IonIcon, IonInput, IonItemDivider } from "@ionic/react";
import { arrowDown, arrowUp } from 'ionicons/icons';

const HeaderSearch = () => {
  const [needle, setNeedle] = useState<string>('');
  const [marks, setMarks] = useState<NodeListOf<HTMLElement>>(document.querySelectorAll('mark'));
  const doc = document.querySelector('.akoma-ntoso') as HTMLElement;
  let currentIndex = 0;
  let mark: any;

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px auto',
    paddingLeft: '0.5rem'
  }

  useEffect(() => {
    search()
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
    
  const jumpToPrevious = () => {
    if (marks.length > 0) {
      currentIndex += -1;
      if (currentIndex < 0) {
        currentIndex = marks.length - 1;
      }
      if (currentIndex > marks.length - 1) {
        currentIndex = 0;
      }
      jumpTo();
    }
  }
    
  const jumpToNext = () => {
    if (marks.length > 0) {
      currentIndex += 1;
     if (currentIndex < 0) {
        currentIndex = marks.length - 1;
      }
      if (currentIndex > marks.length - 1) {
        currentIndex = 0;
      }
      jumpTo();
    }
  }
    
  const search = () => {
    currentIndex = 0;

    if (needle && needle !== '') {
      if (!mark) {
        if (doc) {
          mark = new Mark(doc);
        }
      }
      // unmark existing marks
      mark.unmark({
        done: () => markResults()
      });
    } else {
      if (mark) {
        mark.unmark();
        mark = null;
      }
    }
  }
    
  const markResults = () => {
    mark.mark(needle, {
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
      <IonItemDivider style={{ minHeight: '1px'}} class="ion-no-padding" />
      <div style={style}>
        <IonInput onIonChange={onChange} value={needle} placeholder='Enter Search' clearInput />
        {
          // (marks && marks.length > 0) && <span>{ markIndex + 1 }/{ marks.length }</span>
        }
        <IonButtons slot="end">
          <IonButton color="medium" onClick={jumpToPrevious}>
            <IonIcon icon={arrowUp} />
          </IonButton>
          <IonButton onClick={jumpToNext}>
            <IonIcon color="medium" icon={arrowDown} />
          </IonButton>
        </IonButtons>
      </div>
      <IonItemDivider style={{ minHeight: '1px'}} class="ion-no-padding" />
    </div>
  )
};

export default HeaderSearch;