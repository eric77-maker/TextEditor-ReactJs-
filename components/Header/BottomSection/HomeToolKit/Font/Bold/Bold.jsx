import styles from './Bold.module.css';
import boldImg from '/src/assets/BottomSectionimgs/bold.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Bold(){
    const contextObj = useContext(ContextObj);
    
    const handleBold = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('bold', false, null);

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
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