import styles from './TextInput.module.css';
import { useContext, useEffect, useRef } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';





export default function TextInput(props){
    const contextObj = useContext(ContextObj);


    useEffect(() =>{
        const iframe = document.getElementById('editTextInput'); // Get the iframe element
        const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
        const defaultLiMarkerColor = contextObj.modeState === 'light' ? '#333' : '#fff';
        const noliColor = contextObj.fileToEditRef.current.liColor == '' ? defaultLiMarkerColor : contextObj.fileToEditRef.current.liColor;
        const style = iframeDoc.createElement('style');

        style.textContent = `
            li::marker {
                color: ${contextObj.lastChosenColorForLIMarker.current !== '' ? contextObj.lastChosenColorForLIMarker.current : noliColor};
            }
            /* WebKit-based browsers (Chrome, Safari) */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background-color: linear-gradient(to bottom, hsl(0, 0%, 83%), hsl(0, 0%, 70%), hsl(0, 0%, 85%), hsl(0, 0%, 90%), hsl(0, 0%, 95%));
            }
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%));
                border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(to bottom, hsl(0, 0%, 25%), hsl(240, 21%, 70%), hsl(240, 21%, 76%), hsl(240, 21%, 82%));
            }
        
            /* Firefox */
            body {
                scrollbar-width: thin;
                scrollbar-color: #888 #f1f1f1;
            }
        `;

        iframeDoc.head.append(style);
        const fromReviewFile =  contextObj.createEditContentRef.current;
        iframeDoc.body.innerHTML = fromReviewFile.content;

        contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, Document: window.frames['editTextInput'].document};
    }, [contextObj.modeState]);
    
    useEffect(() =>{
        const iframe = document.getElementById('createTextInput'); // Get the iframe element
        const iframeDoc = iframe.contentWindow.document; // Access the iframe's document

        const style = iframeDoc.createElement('style');
        style.textContent = `

        /* WebKit-based browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
            width: 8px;
        }

        li::marker{
            color: ${contextObj.lastChosenColorForLIMarker.current === ''? '' : contextObj.lastChosenColorForLIMarker.current};
        }

        ::-webkit-scrollbar-track {
            background: ${contextObj.modeState == 'light'? '#f1f1f1' : 'blue'};
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, hsl(0, 0%, 40%), hsl(0, 0%, 60%), hsl(0, 0%, 80%), hsl(0, 0%, 85%), hsl(0, 0%, 90%));
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        /* Firefox */
        body {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
        }
        `;

        if(iframeDoc.head.children[0] === undefined){
            console.log('und')
            iframeDoc.head.append(style);
        }else{
            console.log('def')
            iframeDoc.head.replaceChild(style, iframeDoc.head.children[0]);
        }
        if(contextObj.createEditContentRef.current.from == 'create'){
            const fromReviewFile =  contextObj.createEditContentRef.current;
            iframeDoc.body.innerHTML = fromReviewFile.content;
            //contextObj.createEditContentRef.current = {from: '', content: ''};
        };


    contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, Document: window.frames['createTextInput'].document};
}, [contextObj.modeState]);

    const storeInnerHTML = () =>{
        contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML, totalPages: props.totalPages};
    };
    return(
        <iframe  onMouseOut={() => storeInnerHTML()} id='createTextInput' name="createTextInput"  className={styles.textInput}>
        </iframe>
    );
};