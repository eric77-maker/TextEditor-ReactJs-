import styles from './Bold.module.css';
import boldImg from '/src/assets/BottomSectionimgs/bold.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Bold(){
    const contextObj = useContext(ContextObj);
    
    const handleBold = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('bold', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('bold', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <>
            <button onClick={() =>handleBold()} className={styles.btn}>
                <img src={boldImg} alt="bold text image" loading='lazy' width={13} height={13}/>
            </button>
        </>
    );
};