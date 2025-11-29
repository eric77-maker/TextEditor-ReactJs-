import styles from './Italic.module.css';
import italicImg from '/src/assets/BottomSectionimgs/italic.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Italic(){
    const contextObj = useContext(ContextObj);
    
    const handleItalic = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('italic', false, null);

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
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