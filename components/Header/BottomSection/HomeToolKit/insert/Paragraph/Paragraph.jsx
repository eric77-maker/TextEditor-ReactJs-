import styles from './Paragraph.module.css';
import paragraphImg from '/src/assets/InsertToolKitImgs/paragraph.jpg';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';






export default function Paragraph(){
    const contextObj = useContext(ContextObj);

    const handleInsertParagraph = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('insertParagraph', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
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