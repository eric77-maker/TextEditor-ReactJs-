import styles from './Rule.module.css';
import horizontalRuleImg from '/src/assets/InsertToolKitImgs/horizontalRule.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';






export default function Rule(){
    const contextObj = useContext(ContextObj);

    const handleInsertHorizontalRule = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('insertHorizontalRule', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
        };
    };

    return(
        <div className={styles.container}>
            <button onClick={() =>handleInsertHorizontalRule()} className={styles.btn}>
                <img src={horizontalRuleImg} alt="" width={20} height={20}/>
            </button>
            <p style={{textWrap: 'nowrap'}} className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                Hn. Line
            </p>
        </div>
    );
};