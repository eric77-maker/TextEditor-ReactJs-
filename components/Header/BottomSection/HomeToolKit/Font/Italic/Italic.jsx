import styles from './Italic.module.css';
import italicImg from '/src/assets/BottomSectionimgs/italic.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Italic(){
    const contextObj = useContext(ContextObj);
    
    const handleItalic = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('italic', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        }
        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('italic', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    return(
        <>
            <button onClick={() =>handleItalic()} className={styles.btn}>
                <img src={italicImg} alt="make text italic image" loading='lazy' width={24} height={24}/>
            </button>
        </>
    );
};