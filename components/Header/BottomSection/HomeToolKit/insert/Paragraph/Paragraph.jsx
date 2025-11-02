import styles from './Paragraph.module.css';
import paragraphImg from '/src/assets/InsertToolKitImgs/paragraph.jpg';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';






export default function Paragraph(){
    const contextObj = useContext(ContextObj);

    const handleInsertParagraph = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('insertParagraph', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('insertParagraph', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    return(
        <div className={styles.container}>
            <button className={styles.btn} onClick={() =>handleInsertParagraph()}>
                <img src={paragraphImg} alt="" width={20} height={20}/>
            </button>
            <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                Paragh.
            </p>
        </div>
    );
};