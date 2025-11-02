import styles from './Size.module.css';
import fontSizeImg from '/src/assets/BottomSectionimgs/fontSize.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Size(){
    const contextObj = useContext(ContextObj);
    
    const handleSetFontSize = size =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('FontSize', false, size);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('FontSize', false, size);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };


        document.getElementById('fontSize').value = '';
    };

    const handleFontSizeChange = e =>{
        handleSetFontSize(e.target.value);

    };
    return(
        <>
            <button style={{position: 'relative'}} className={styles.btn}>
                <img src={fontSizeImg} alt="change text size image" loading='lazy' width={20} height={20}/>
                <select id='fontSize' onChange={e => handleFontSizeChange(e)} className={styles.fontSizes}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </button>
        </>
    );
};