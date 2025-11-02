import styles from './Rule.module.css';
import horizontalRuleImg from '/src/assets/InsertToolKitImgs/horizontalRule.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';






export default function Rule(){
    const contextObj = useContext(ContextObj);

    const handleInsertHorizontalRule = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('insertHorizontalRule', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('insertHorizontalRule', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <div className={styles.container}>
            <button onClick={() =>handleInsertHorizontalRule()} className={styles.btn}>
                <img src={horizontalRuleImg} alt="" width={20} height={20}/>
            </button>
            <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                Hn. Rule
            </p>
        </div>
    );
};