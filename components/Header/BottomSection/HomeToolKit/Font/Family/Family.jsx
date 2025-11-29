import styles from './Family.module.css';
import fontFamilyImg from '/src/assets/BottomSectionimgs/fontFamily.png';
import { useState, useEffect, useContext, useRef } from 'react';
import fontFamilies from '../../../FontFamily/FontFamily';
import { ContextObj } from '../../../../../TextEditor/TextEditor';


export default function Family(){
    const contextObj = useContext(ContextObj);
    const idleTokenRef = useRef(null);
    const hideSectionFunRef = useRef(null);
    const [showSection, setShowSection] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if(showSection){
            idleTokenRef.current = setTimeout(() => {
                setShowSection(false);
            }, 5000);    
        };
        
        return () => {
            idleTokenRef.current !== null && clearTimeout(idleTokenRef.current);
        };
    }, [showSection]);

    useEffect(() => {
        hideSectionFunRef.current = () => {
            setShowSection(false);
            setFadeOut(false);
            if(idleTokenRef.current !== null){
                clearTimeout(idleTokenRef.current);
                idleTokenRef.current = null;
            };
        };
    }, []);


    const applyFamily = family => {
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){

            document.execCommand('FontName', true, family);
        };
    };

    const handleShowFontInput = () => {
        setShowSection(s => !s);
    };

    const handleMouseEntToFadeIn = () => {
        if(idleTokenRef.current !== null){
            clearTimeout(idleTokenRef.current);
            idleTokenRef.current = null;
        };
        fadeOut && setFadeOut(false);
    };

    const handleMouseLeaveToFadeOut = () => {
        idleTokenRef.current = setTimeout(() => hideSectionFunRef.current(), 5000);
        !fadeOut && setFadeOut(true);
    };


    return(
        <>
            <div id={styles.container}>
                <button onClick={() =>handleShowFontInput()} id={styles.fontFamilyBtn} className={styles.btn}>
                    <img src={fontFamilyImg} alt="change font family of text image" loading='lazy' width={25} height={25}/>
                </button>
                {showSection &&
                    <section id={fadeOut ? styles.fontFamiliesFadeOut : styles.fontFamiliesDiv} onMouseEnter={() => handleMouseEntToFadeIn()} onMouseLeave={() => handleMouseLeaveToFadeOut()}>
                        {fontFamilies.map((family, index) => (
                            <button id={contextObj.modeState ==='light' ? styles.fontBtnLight : styles.fontBtnDark } onClick={() => applyFamily(family)} key={index}>
                                {family}
                            </button>)
                        )}
                    </section>
                }
            </div>
        </>
    );
};