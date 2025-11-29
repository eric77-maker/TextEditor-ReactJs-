import styles from './Color.module.css';
import colorFontImg from '/src/assets/BottomSectionimgs/colorFontImg.svg';
import { useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';




export default function Color(){
    const contextObj = useContext(ContextObj);
    
    const handleColorChange = e =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('ForeColor', false, e.target.value);

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
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