import styles from './DraftAndEncryptFile.module.css';
import draftFilesImg from '/src/assets/BottomSectionimgs/draftFiles.jpg';
import encryptFileImg from '/src/assets/BottomSectionimgs/EncryptFile.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';




export default function DraftAndEncryptFile(){
    const contextObj = useContext(ContextObj);

    const bgColor = contextObj.modeState === 'light' ? 'hsl(240, 57%, 80%)' : 'hsl(273, 5%, 45%, 0.85)';

    const encryptAFileHandler = () => {
        console.log('encrypt file');
    };

    const showDraftedFilesDropDown = () => {
        console.log('show drafted files');
    };

    const changeBgColor = id => {
        document.getElementById(id).style.backgroundColor = bgColor;
    };

    const resetBgColor = id => {
        document.getElementById(id).style.backgroundColor = '';
    };

    return(
        <div className={styles.container}>
            <div id='en' onMouseEnter={() => changeBgColor('en')} onMouseLeave={() => resetBgColor('en')} onClick={() => encryptAFileHandler()}>
                <p>
                    Encrypt File        
                </p>
            </div>
            
            <div id='dft' onMouseEnter={() => changeBgColor('dft')} onMouseLeave={() => resetBgColor('dft')} onClick={() => showDraftedFilesDropDown()}>
                <p>
                    Drafted Files
                </p>
            </div>
        </div>
    );
};