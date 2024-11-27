import React, { useState, useEffect } from 'react';
import * as S from './AppStyled';
import TextareaAutosize from 'react-textarea-autosize';

const App: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].url) {
          const currentUrl = tabs[0].url;
          setUrl(currentUrl);
          if (chrome.storage && chrome.storage.local) {
            chrome.storage.local.get([currentUrl], (result) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
              } else {
                setNote(result[currentUrl] || '');
              }
            });
          }
        }
      });
    }
  }, []);

  const saveNote = (text: string) => {
    if (
      url !== null &&
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ [url]: text }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log(`Note saved for URL ${url}: ${text}`);
        }
      });
    }
  };

  return (
    <S.MemoLayout>
      <S.Title>Site Notes 🤔</S.Title>
      <S.StyledTextarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          saveNote(e.target.value);
        }}
        placeholder="Write your note here...💬"
      ></S.StyledTextarea>
    </S.MemoLayout>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [tabId, setTabId] = useState<number | null>(null);
//   const [note, setNote] = useState<string>('');

//   useEffect(() => {
//     if (typeof chrome !== 'undefined' && chrome.tabs) {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs.length > 0 && tabs[0].id !== undefined) {
//           const currentTabId = tabs[0].id;
//           setTabId(currentTabId);
//           if (chrome.storage && chrome.storage.local) {
//             chrome.storage.local.get([`${currentTabId}`], (result) => {
//               if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError);
//               } else {
//                 setNote(result[currentTabId] || '');
//               }
//             });
//           }
//         }
//       });
//     }
//   }, []);

//   const saveNote = (text: string) => {
//     if (
//       tabId !== null &&
//       typeof chrome !== 'undefined' &&
//       chrome.storage &&
//       chrome.storage.local
//     ) {
//       chrome.storage.local.set({ [`${tabId}`]: text }, () => {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//         } else {
//           console.log(`Note saved for Tab ${tabId}: ${text}`);
//         }
//       });
//     } else {
//       console.log(tabId, '저장 안됐어요.');
//       console.log(tabId !== null);
//       console.log(typeof chrome !== 'undefined');
//       console.log(chrome.storage);
//       console.log(chrome.storage.local);
//     }
//   };

//   return (
//     <div>
//       <h2>Tab-Specific Notepad</h2>
//       <textarea
//         value={note}
//         onChange={(e) => {
//           setNote(e.target.value);
//           saveNote(e.target.value);
//         }}
//         placeholder="Write your note here..."
//       ></textarea>
//     </div>
//   );
// };

// export default App;
