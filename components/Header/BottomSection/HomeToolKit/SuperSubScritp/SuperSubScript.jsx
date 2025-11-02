import styles from './SuperSubScript.module.css';
import superScriptImg from '/src/assets/BottomSectionimgs/superScript.png';
import subScriptImg from '/src/assets/BottomSectionimgs/subScript.jpg';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';




export default function SuperSubScript(){
    const contextObj = useContext(ContextObj);

    const handleSuperScript = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('superscript', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('superscript', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    const handleSubScript = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('subscript', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('subscript', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    return(
        <div className={styles.scritpText}>
            <button onClick={() =>handleSuperScript()} className={styles.btn}>
                <img src={superScriptImg} alt="" width={20} height={20}/>
            </button>
            <button onClick={() =>handleSubScript()} className={styles.btn}>
                <img src={subScriptImg} alt="" width={20} height={20}/>
            </button>
        </div>
    );
};