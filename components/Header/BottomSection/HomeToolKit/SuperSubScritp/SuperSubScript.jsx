import styles from './SuperSubScript.module.css';
import superScriptImg from '/src/assets/BottomSectionimgs/superScript.png';
import subScriptImg from '/src/assets/BottomSectionimgs/subScript.jpg';
import StrikeThroughAndBackColor from '../StrikeThroughAndBackColor/StrikeThroughAndBackColor';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';




export default function SuperSubScript(){
    const contextObj = useContext(ContextObj);

    const handleSuperScript = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('superscript', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
        };
    };
    const handleSubScript = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('subscript', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
        };
    };
    return(
        <div className={styles.container}>
            <div className={styles.scriptTextDiv}>
                <button onClick={() =>handleSuperScript()} className={styles.btn}>
                    <img src={superScriptImg} alt="" width={20} height={20}/>
                </button>
                <button onClick={() =>handleSubScript()} className={styles.btn}>
                    <img src={subScriptImg} alt="" width={20} height={20}/>
                </button>
            </div>

            <StrikeThroughAndBackColor />
        </div>
    );
};