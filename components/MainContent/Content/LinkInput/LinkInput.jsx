import styles from './LinkInput.module.css';
import insertLinkImg from '/src/assets/InsertToolKitImgs/insertLink.png';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';



export default function LinkInput(){
    const contextObj = useContext(ContextObj);


    const handleInsertLink = () => {
        if(document.getElementById('link').value.trim() !== ''){
            if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
                window.document.execCommand('CreateLink', false, document.getElementById('link').value.trim());
            };

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }

            contextObj.setShowLinkInput(false);
        }
    };
    return(
        <div className={styles.LinkInputDiv}>
            <div className={styles.LinkInputDivComp}>
                <input type="text" id='link' className={styles.linkInput} placeholder='type link here!'/>
                <button className={styles.insertBtn} onClick={() => handleInsertLink()}>
                    <img src={insertLinkImg} alt="insert link image" loading='lazy' width={10} height={10}/>
                </button>
            </div>
        </div>
    );
};