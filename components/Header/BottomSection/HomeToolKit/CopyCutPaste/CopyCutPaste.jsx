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
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('Copy', false, null);
                
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
        };
    };

    const handleCut = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            let contentToCut;
            if(document.getElementById('createTextInput') !== null){
                contentToCut = document.getElementById('createTextInput').innerHTML;
            }else{
                contentToCut = document.getElementById('editTextInput').innerHTML
            };

            document.execCommand('Cut', false, null);
                
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
        };
    };

    const handlePaste = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            let contentToCut;
            if(document.getElementById('createTextInput') !== null){
                contentToCut = document.getElementById('createTextInput').innerHTML;
            }else{
                contentToCut = document.getElementById('editTextInput').innerHTML
            };

            document.execCommand('Paste', false, null);
                
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
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