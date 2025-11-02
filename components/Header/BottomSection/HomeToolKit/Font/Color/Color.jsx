import styles from './Color.module.css';
import colorFontImg from '/src/assets/BottomSectionimgs/colorFontImg.svg';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Color(){
    const contextObj = useContext(ContextObj);
    
    const handleColorChange = e =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('ForeColor', false, e.target.value);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('ForeColor', false, e.target.value);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <>
            <button style={{position: 'relative'}} className={styles.btn}>
                <img src={colorFontImg} alt="color text image" loading='lazy' width={15} height={15}/>
                <input onChange={e => handleColorChange(e)} style={{zIndex: '10', opacity: '0', width: '100%', height: '100%', position: 'absolute'}} type="color" name="" id="" />
            </button>
        </>
    );
};