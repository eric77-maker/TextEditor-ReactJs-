import styles from './Link.module.css';
import linkImg from '/src/assets/InsertToolKitImgs/link.png';
import { useState ,useRef ,useEffect ,useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';



export default function Link(){
    const contextObj = useContext(ContextObj);

    const showLinkInputHandler = () => {
        contextObj.setShowLinkInput(s => !s);
    };


    return(
        <div className={styles.container}>
            <button className={styles.btn} onClick={() =>showLinkInputHandler()}>
                <img src={linkImg} alt="" width={20} height={20}/>
            </button>
            
            <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                link
            </p>
        </div>
    );
};