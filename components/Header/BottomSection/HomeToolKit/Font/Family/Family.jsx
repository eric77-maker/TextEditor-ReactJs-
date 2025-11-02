import styles from './Family.module.css';
import fontFamilyImg from '/src/assets/BottomSectionimgs/fontFamily.png';
import { useState, useRef } from 'react';
import { useEffect, useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';
import fontFamilies from '../../../FontFamily/FontFamily';



export default function Family(props){
    const contextObj = useContext(ContextObj);
    const timeoutFuncExecRef = useRef(null);
    const tokenRef = useRef(null);
    const idleTokenRef = useRef(null);
    const [fontFamiliesSearchResult, setFontFamiliesSearchResult] = useState([]);

    useEffect(() =>{
        timeoutFuncExecRef.current = () =>{

            if(document.getElementById('fontInput') !== null){
                document.getElementById('fontInput').value = '';
                document.getElementById('fontInput').style.visibility = 'hidden';
            };

            props.setHideFontInput(true);
            clearTimeout(idleTokenRef.current);
            idleTokenRef.current = null;
            setFontFamiliesSearchResult([]);
        }
    }, []);

    useEffect(() =>{
        if(idleTokenRef.current === null && !props.hideFontInput){
            idleTokenRef.current = setTimeout(timeoutFuncExecRef.current, 5000)
        };
    }, [props.hideFontInput, fontFamiliesSearchResult]);

    const handleShowFontInput = () =>{
        props.setHideFontInput(false);
        document.getElementById('fontInput').style.visibility = 'visible';
        document.getElementById('fontInput').focus();
    }

    const storeSearchFontFamilyResult = e =>{
        const result = fontFamilies.filter(family =>{
            const f = family.toLowerCase();
            if(f.includes(e.target.value.toLowerCase()) && e.target.value !== ''){
                return family;
            };
        });

        if(result.length <= 1){
            if(window.frames['createTextInput']){
                createTextInput.document.execCommand('FontName', false, result[0]);
                contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
            };
    
            if(window.frames['editTextInput']){
                editTextInput.document.execCommand('FontName', false, result[0]);
                contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
            };

            document.getElementById('fontInput').value = '';
            document.getElementById('fontInput').style.visibility = 'hidden';
            clearTimeout(tokenRef.current);
            tokenRef.current = null;
            setFontFamiliesSearchResult([]);
        }else{
            tokenRef.current = setTimeout(timeoutFuncExecRef.current, 5000)
            setFontFamiliesSearchResult(result);
        }
    }

    const debounceFontFamilySearch = e =>{
        if(tokenRef.current !== null){
            clearTimeout(tokenRef.current);
        };

        tokenRef.current = setTimeout(() => storeSearchFontFamilyResult(e), 1000);
    };

    const handleFontFamilyInputChange = e =>{
        idleTokenRef.current !== null && clearTimeout(idleTokenRef.current);
        debounceFontFamilySearch(e);
    };

    return(
        <>
            <button onClick={() =>handleShowFontInput()} id={styles.fontFamilyBtn} className={styles.btn}>
                <img src={fontFamilyImg} alt="change font family of text image" loading='lazy' width={25} height={25}/>
                <input list='fontFamilies' onChange={e =>handleFontFamilyInputChange(e)} id='fontInput' style={{visibility: 'hidden'}} type="text" placeholder='search font here!'/>
                <datalist onClick={e =>console.log(e.target.value)} id='fontFamilies'>
                    {fontFamiliesSearchResult.map((family, index) => <option key={index} value={family}>{family}</option>)}
                </datalist>
            </button>
        </>
    );
};