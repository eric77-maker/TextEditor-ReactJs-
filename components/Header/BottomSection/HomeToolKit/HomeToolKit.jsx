import styles from './HomeToolKit.module.css';
import CopyCutPaste from './CopyCutPaste/CopyCutPaste';
import Font from './Font/Font';
import Align from './Align/Align';
import SuperSubScript from './SuperSubScritp/SuperSubScript';
import Insert from './insert/Insert';
import DraftAndEncryptFile from './DraftAndEncryptFile/DraftAndEncryptFile';
import { useContext, useEffect, useState } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import {motion} from 'framer-motion'

export default function ToolsToolKit(){
    const contextObj = useContext(ContextObj);
    const animateHomeToolKitOnMountStyle = {
        height: ['9vh', '11vh', '10vh']
    };

    useEffect(() => {
        console.log('re-rendered HomeToolkit...')
    }, []);

    return(
        <motion.div animate={animateHomeToolKitOnMountStyle} transition={{duration: 0.3}} id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>
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

            <DraftAndEncryptFile />
        </motion.div>
    );
};
