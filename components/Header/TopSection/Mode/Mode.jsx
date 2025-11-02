import styles from './Mode.module.css';
import lightModeImg from '/src/assets/TopSectionImgs/lightMode.png';
import darkModeImg from '/src/assets/TopSectionImgs/darkModeImg.png';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';




export default function Mode(){
    const contextObj = useContext(ContextObj);

    return(
        <div className={styles.modeDiv}>
            <button onClick={() => contextObj.setModeState(m => m === 'light'? 'dark' : 'light')}>
                <img src={contextObj.modeState === 'light'? lightModeImg : darkModeImg} alt=""/>
            </button>
        </div> 
    );
};