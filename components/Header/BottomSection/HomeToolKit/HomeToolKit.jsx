import styles from './HomeToolKit.module.css';
import CopyCutPaste from './CopyCutPaste/CopyCutPaste';
import Font from './Font/Font';
import Align from './Align/Align';
import SuperSubScript from './SuperSubScritp/SuperSubScript';
import Insert from './insert/Insert';
import { useContext, useEffect } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';

export default function ToolsToolKit(){
    const contextObj = useContext(ContextObj);

    return(
        <div id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>
            <Insert />

            <div style={{display: 'flex', height: '100%', columnGap: '2vw', alignItems: 'center'}}>
                <p style={{fontSize: '1.2rem'}} className={contextObj.modeState === 'light'? styles.fTextLight : styles.fTextDark}>
                    FORMATS
                </p>
                <CopyCutPaste />

                <Font />

                <Align />

                <SuperSubScript />
            </div>
        </div>
    );
};
