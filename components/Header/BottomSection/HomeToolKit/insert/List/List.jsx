import styles from './List.module.css';
import orderedListImg from '/src/assets/InsertToolKitImgs/orderedList.png';
import unorderedListImg from '/src/assets/InsertToolKitImgs/unorderedList.png';
import insertLIColorImg from '/src/assets/InsertToolKitImgs/insertLink.png';
import {useState, useEffect, useRef, useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';





export default function List(){
    const contextObj = useContext(ContextObj);
    const idleTokenRef = useRef(null);
    const [color, setColor] = useState('');
    const triggeredBeforeOnInitialRef = useRef(false); 

    useEffect(() => {
        if(idleTokenRef.current === null && triggeredBeforeOnInitialRef.current){
            idleTokenRef.current = setTimeout(() => {
                document.getElementById('color').style.display = 'none';
                document.getElementById('insertColorBtn').style.display = 'none';
                idleTokenRef.current = null;
                triggeredBeforeOnInitialRef.current = false;
                setColor('');
            }, 5000);
        };
    }, [color]);

    const handleInsertOrderedList = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('InsertOrderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('InsertOrderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handlerInsertUnorderedList = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('InsertUnorderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('InsertUnorderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };


    const applyColorToMarker = () => {
        
        if(color !== '' && (window.frames['createTextInput'])){
                const iframe = document.getElementById('createTextInput'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
                const style = iframeDoc.createElement('style');
            
                style.textContent = `
                li::marker{
                    color: ${color};
                }
        
                /* WebKit-based browsers (Chrome, Safari) */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
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
                    scrollbar-color: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%)) transparent;
                }
                `;

                iframeDoc.head.replaceChild(style, iframeDoc.head.children[0]);
                contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'create', hasLiColorChanged: true, Document: window.frames['createTextInput'].document}
                contextObj.lastChosenColorForLIMarker.current = color;
        };

        if(color !== '' && (window.frames['editTextInput'])){
            const iframe = document.getElementById('editTextInput'); // Get the iframe element
            const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
            const style = iframeDoc.createElement('style');
        
            style.textContent = `
            li::marker{
                color: ${color};
            }
    
            /* WebKit-based browsers (Chrome, Safari) */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #888;
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

            iframeDoc.head.replaceChild(style, iframeDoc.head.children[0]);
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'edit', hasLiColorChanged: true, Document: window.frames['editTextInput'].document}
            contextObj.lastChosenColorForLIMarker.current = color;
        }
    };

    const handleColorInputChange = color => {
        if(idleTokenRef.current !== null){
            clearTimeout(idleTokenRef.current);
            idleTokenRef.current = null;
        };

        setColor(color);
    };

    const showColorInput = () => {
        if(!triggeredBeforeOnInitialRef.current && idleTokenRef.current === null){
            idleTokenRef.current = setTimeout(() => {
                document.getElementById('color').style.display = 'none';
                document.getElementById('insertColorBtn').style.display = 'none';
                clearTimeout(idleTokenRef.current);
                idleTokenRef.current = null;
                triggeredBeforeOnInitialRef.current = false;
                setColor('');
            }, 5000);

            triggeredBeforeOnInitialRef.current = true;
        }
        document.getElementById('color').style.display = 'block';
        document.getElementById('insertColorBtn').style.display = 'grid';
    };
    

    return(
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={() =>handleInsertOrderedList()}>
                    <img src={orderedListImg} alt="" width={18} height={18}/>
                </button>
                <button className={styles.btn} onClick={() =>handlerInsertUnorderedList()}>
                    <img src={unorderedListImg} alt="" width={18} height={18}/>
                </button>
            </div>
            <p onClick={() => showColorInput()} style={{cursor: 'pointer', position: 'relative'}} className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                List
                <input id='color' value={color} onChange={e => handleColorInputChange(e.target.value)} className={styles.color} type="text"  placeholder='rgb, hsl, HEX'/>
                <button onClick={() => applyColorToMarker()} id='insertColorBtn' className={styles.insertColorBtn}><img src={insertLIColorImg} alt="" width={11} height={11}/></button>
            </p>
        </div>
    );
}