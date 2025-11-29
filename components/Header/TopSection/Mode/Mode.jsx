import styles from './Mode.module.css';
import lightModeImg from '/src/assets/TopSectionImgs/lightMode.png';
import darkModeImg from '/src/assets/TopSectionImgs/darkModeImg.png';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';




export default function Mode(){
    const contextObj = useContext(ContextObj);

    //toogles the mode state of the app.
    const handleModeStateToggle = () => {
        
        if(contextObj.modeStateUpdaterTokenRef.current !== null){ //clears the modeStateUpdater interval timer if set.
            clearInterval(contextObj.modeStateUpdaterTokenRef.current);
            contextObj.modeStateUpdaterTokenRef.current = null;
        };

        contextObj.setModeState(m => m === 'light'? 'dark' : 'light');
    };
    return(
        <div className={styles.modeDiv}>
            <button onClick={() => handleModeStateToggle()}>
                <img src={contextObj.modeState === 'light'? lightModeImg : darkModeImg} alt="mode"/>
            </button>
        </div> 
    );
};