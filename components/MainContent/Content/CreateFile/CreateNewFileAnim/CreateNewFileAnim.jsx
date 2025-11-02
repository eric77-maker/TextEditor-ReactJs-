import styles from './CreateNewFileAnim.module.css';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';
import createFileImg from '/src/assets/MainComponentImgs/createFile1.png';






export default function(){
    const contextObj = useContext(ContextObj);

    return(
        <div id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>
            <div>
                <span>C</span><span>R</span><span>E</span><span>A</span><span>T</span><span>E</span> <span>N</span><span>E</span><span>W</span> <span>F</span><span>I</span><span>L</span><span>E</span>
            </div>
            <div>
                <img src={createFileImg} alt="" width={20} height={20}/>
            </div>
        </div>
    );
};