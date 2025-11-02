import styles from './underline.module.css';
import underlineImg from '/src/assets/BottomSectionimgs/underline.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Underline(){
    const contextObj = useContext(ContextObj);
    
    const handleUnderline = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('underline', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('underline', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    
    return(
        <>
            <button onClick={() =>handleUnderline()} className={styles.btn}>
                <img src={underlineImg} alt="underline text image" loading='lazy' width={20} height={20}/>
            </button>
        </>
    );
};