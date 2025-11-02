import styles from './Align.module.css';
import alignLeftImg from '/src/assets/BottomSectionimgs/alignLeft.png';
import alignMiddleImg from '/src/assets/BottomSectionimgs/alignCenter.png';
import alignRightImg from '/src/assets/BottomSectionimgs/alignRight.png';
import indentImg from '/src/assets/BottomSectionimgs/indent.png';
import outdentImg from '/src/assets/BottomSectionimgs/outdent.png';
import { useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';





export default function Align(){
    const contextObj = useContext(ContextObj);

    const handleIndent = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('indent', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('indent', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };
    const handleOutdent = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('outdent', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('outdent', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleAlignLeft = () =>{

        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('JustifyLeft', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('JustifyLeft', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
        
    };

    const handleAlignCenter = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('JustifyCenter', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('JustifyCenter', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
        
    };

    const handleAlignRight = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('JustifyRight', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('JustifyRight', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <div className={styles.alignDiv}>
            <div>
                <button onClick={() =>handleIndent()} className={styles.btn}>
                    <img src={indentImg} alt="indent text image" loading='lazy' width={20} height={20}/>
                </button>
                <button onClick={() =>handleOutdent()} className={styles.btn}>
                    <img src={outdentImg} alt="outdent text" loading='lazy' width={20} height={20}/>
                </button>
            </div>

            <div>
                <div>
                    <button onClick={() =>handleAlignCenter()} className={styles.btn}>
                        <img src={alignMiddleImg} alt="align text center image" loading='lazy' width={20} height={20}/>
                    </button>
                </div>
                <div>
                    <button onClick={() =>handleAlignLeft()} className={styles.btn}>
                        <img src={alignLeftImg} alt="align text left image" loading='lazy' width={20} height={20}/>
                    </button>
                    <button onClick={() =>handleAlignRight()} className={styles.btn}>
                        <img src={alignRightImg} alt="align text right image" loading='lazy' width={20} height={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};