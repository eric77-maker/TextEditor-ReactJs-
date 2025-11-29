import styles from './underline.module.css';
import underlineImg from '/src/assets/BottomSectionimgs/underline.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Underline(){
    const contextObj = useContext(ContextObj);
    
    const handleUnderline = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('underline', false, null);

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
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