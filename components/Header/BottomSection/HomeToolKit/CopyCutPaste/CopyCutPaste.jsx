import styles from './CopyCutPaste.module.css';
import copyImg from '/src/assets/BottomSectionimgs/copy.png';
import cutImg from '/src/assets/BottomSectionimgs/cut.png';
import pasteImg from '/src/assets/BottomSectionimgs/paste.png';
import { useContext, useRef } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';




export default function CopyCutPaste(){
    const contextObj = useContext(ContextObj);
    const contentCutOrCopiedRef = useRef('');


    const handleCopy = () =>{
        if(window.frames['createTextInput']){
            contentCutOrCopiedRef.current = window.frames['createTextInput'].document.body.innerHTML;
            createTextInput.document.execCommand('Copy', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            contentCutOrCopiedRef.current = window.frames['editTextInput'].document.body.innerHTML;
            editTextInput.document.execCommand('Copy', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleCut = () =>{
        if(window.frames['createTextInput']){
            contentCutOrCopiedRef.current = window.frames['createTextInput'].document.body.innerHTML;
            createTextInput.document.execCommand('Cut', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            contentCutOrCopiedRef.current = window.frames['editTextInput'].document.body.innerHTML;
            editTextInput.document.execCommand('Cut', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handlePaste = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('Paste', false, contentCutOrCopiedRef.current);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('Paste', false, contentCutOrCopiedRef.current);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <div className={styles.actionsDiv}>
            <div>
                <button onClick={() =>handlePaste()} className={styles.btn}>
                    <img src={pasteImg} alt="paste text image" loading='lazy' width={20} height={20}/>
                </button>
            </div>
            <div>
                <button onClick={() =>handleCopy()} className={styles.btn}>
                    <img src={copyImg} alt="copy text image" loading='lazy' width={20} height={20}/>
                </button>
                <button onClick={() =>handleCut()} className={styles.btn}>
                    <img src={cutImg} alt="cut text image" loading='lazy' width={20} height={20}/>
                </button>
            </div>
        </div>
    );
};