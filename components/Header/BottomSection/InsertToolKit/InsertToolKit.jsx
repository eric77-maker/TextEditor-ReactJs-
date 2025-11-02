import styles from './InsertToolKit.module.css';
import orderedListImg from '/src/assets/InsertToolKitImgs/orderedList.png';
import unorderedListImg from '/src/assets/InsertToolKitImgs/unorderedList.png';
import tableImg from '/src/assets/InsertToolKitImgs/table.png';
import insertImgImg from '/src/assets/InsertToolKitImgs/insertImage.png';
import linkImg from '/src/assets/InsertToolKitImgs/link.png';
import horizontalRuleImg from '/src/assets/InsertToolKitImgs/horizontalRule.png';
import paragraphImg from '/src/assets/InsertToolKitImgs/paragraph.jpg';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';



export default function InsertToolKit(){
    const contextObj = useContext(ContextObj);

    const handleInsertOrderedList = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('InsertOrderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('InsertOrderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handlerInsertUnorderedList = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('InsertUnorderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('InsertUnorderedList', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleInsertTable = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('FontName', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('FontName', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleInsertImage = image =>{
        console.log(image)
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('InsertImage', false, image);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('InsertImage', false, image);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    }; 

    const imgFilePathChangeHandler = e =>{
        //handleInsertImage(e);
    }

    const handleInsertHorizontalRule = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('insertHorizontalRule', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('insertHorizontalRule', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleInsertLink = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('Link', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('Link', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    const handleInsertParagraph = () =>{
        if(window.frames['createTextInput']){
            createTextInput.document.execCommand('insertParagraph', false, null);
            contextObj.createEditContentRef.current = {from: 'create', content: window.frames['createTextInput'].document.body.innerHTML};
        };

        if(window.frames['editTextInput']){
            editTextInput.document.execCommand('insertParagraph', false, null);
            contextObj.createEditContentRef.current = {from: 'edit', content: window.frames['editTextInput'].document.body.innerHTML};
        };
    };

    return(
        <div id={styles.container} className={contextObj.modeState === 'light'? styles.containerLight : styles.containerDark}>
            <div className={styles.listDiv}>
                <div className={styles.listBtnDiv}>
                    <button className={styles.btn} onClick={() =>handleInsertOrderedList()}>
                        <img src={orderedListImg} alt="" width={20} height={20}/>
                    </button>
                    <button className={styles.btn} onClick={() =>handlerInsertUnorderedList()}>
                        <img src={unorderedListImg} alt="" width={20} height={20}/>
                    </button>
                </div>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>List</p>
            </div>

            <div className={styles.tableDiv}>
                <button className={styles.btn} onClick={() =>handleInsertTable()}>
                    <img src={tableImg} alt="" width={20} height={20}/>
                </button>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                    Table
                </p>
            </div>

            <div className={styles.imgDiv}>
                <button className={styles.btn} onClick={() =>handleInsertParagraph()}>
                    <img src={paragraphImg} alt="" width={20} height={20}/>
                </button>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                    Paragh.
                </p>
            </div>

            <div className={styles.imgDiv}>
                <button className={styles.btn} style={{position: 'relative'}}>
                    <img src={insertImgImg} alt="" width={20} height={20}/>
                    <input  onChange={e =>imgFilePathChangeHandler(e)}  style={{visibility: 'visible', position: 'absolute'}} type="text" placeholder='image path here!'/>
                </button>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                    Image
                </p>
            </div>

            <div className={styles.imgDiv}>
                <button className={styles.btn} onClick={() =>handleInsertLink()}>
                    <img src={linkImg} alt="" width={20} height={20}/>
                </button>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                    link
                </p>
            </div>


            <div className={styles.imgDiv}>
                <button onClick={() =>handleInsertHorizontalRule()} className={styles.btn}>
                    <img src={horizontalRuleImg} alt="" width={20} height={20}/>
                </button>
                <p className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                    Hn. Rule
                </p>
            </div>

        </div>
    );
};