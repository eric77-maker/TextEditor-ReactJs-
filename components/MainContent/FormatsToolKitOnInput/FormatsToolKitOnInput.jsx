import styles from './FormatsToolKitOnInput.module.css';
import boldImg from '/src/assets/BottomSectionimgs/bold.png';
import colorFontImg from '/src/assets/BottomSectionimgs/colorFontImg.svg';
import italicImg from '/src/assets/BottomSectionimgs/italic.png';
import fontSizeImg from '/src/assets/BottomSectionimgs/fontSize.png';
import underlineImg from '/src/assets/BottomSectionimgs/underline.png';
import fontFamilyImg from '/src/assets/BottomSectionimgs/fontFamily.png';
import superScriptImg from '/src/assets/BottomSectionimgs/superScript.png';
import subScriptImg from '/src/assets/BottomSectionimgs/subScript.jpg';
import alignLeftImg from '/src/assets/BottomSectionimgs/alignLeft.png';
import alignMiddleImg from '/src/assets/BottomSectionimgs/alignCenter.png';
import alignRightImg from '/src/assets/BottomSectionimgs/alignRight.png';
import indentImg from '/src/assets/BottomSectionimgs/indent.png';
import outdentImg from '/src/assets/BottomSectionimgs/outdent.png';
import horizontalRuleImg from '/src/assets/InsertToolKitImgs/horizontalRule.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { ContextObj } from '../../TextEditor/TextEditor';



export default function FormatsToolKitOnInput(props){
    const contextObj = useContext(ContextObj);
    const [mouseLeft, setMouseLeft] = useState(false);
    const [showFontSizesToolKit, setShowFontSizesToolKit] = useState(false);
    const fontSizesDivRef = useRef(null);
    const tokenRef = useRef(null);
    const fontSizesTokenRef = useRef(null);

    const handleApplyColorToFont = () => {};

    const handleChangeFamilyOfFont = () => {};

    const handleBoldFont = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('bold', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleUnderlineFont = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('underline', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleAlignTextLeft = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('JustifyLeft', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleAlignTextCenter = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('JustifyCenter', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleAlignTextRight = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('JustifyRight', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleIndentText = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('indent', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleOutdentText = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('outdent', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleInsertHorizontalRule = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('insertHorizontalRule', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleMakeFontItalic = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('italic', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleMakeFontSuperscript = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('superscript', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleMakeFontSubscript = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('subscript', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    useEffect(() => {
        if(!mouseLeft){
            tokenRef.current = setTimeout(() => {
                props.setShowFormatsOnInput(false);
                clearTimeout(tokenRef.current);
                tokenRef.current = null;
            }, /* 3000 */ 1000000000);
        };

        return () => {
            tokenRef.current !== null && clearTimeout(tokenRef.current);
        };
    }, [props.clientX, props.clientY, props.fromWidth, props.fromWidth]);

    useEffect(() => {
        //console.log(props.fromHeight);
        if(mouseLeft){
            if(tokenRef.current !== null){
                clearTimeout(tokenRef.current);
                tokenRef.current = null;
            };
    
            setMouseLeft(false);
        };
    }, [props.clientX, props.clientY, props.fromWidth, props.fromWidth]);

    const handleMouseEnter = () => {
        if(tokenRef.current !== null){
            clearTimeout(tokenRef.current);
            tokenRef.current = null;
        };
        setMouseLeft(false);
    };


    const handleMouseLeave = () =>{
        tokenRef.current = setTimeout(() => {
            props.setShowFormatsOnInput(false);
            clearTimeout(tokenRef.current);
            tokenRef.current = null;
        }, 5000);
        setMouseLeft(true)
    };


    const showFontSizesToolKitHandler = () => {
        setShowFontSizesToolKit(true);

        fontSizesTokenRef.current = setTimeout(() => {
            clearTimeout(fontSizesTokenRef.current);
            fontSizesTokenRef.current = null;
            setShowFontSizesToolKit(false);
        }, 3000);
    };

    const changeFontSizeHandler = size => {

        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('FontSize', false, size);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        };
    };

    const hideFontSizesDivOnMouseLeave = () => {
        const token = setTimeout(() => {
            clearTimeout(token);
            setShowFontSizesToolKit(false)
        }, 500);
    };

    const clearTokenOnMouseEnter = () => {
        if(fontSizesTokenRef.current !== null){
            clearTimeout(fontSizesTokenRef.current);
            fontSizesTokenRef.current = null;
        };
    };

    const handleColorChange = e => {
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('ForeColor', false, e.target.value);

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
        };
    } 

    
    const tryExec = () => {
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('StyleWithCSS', true, 'style={color: green;}');

            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            };
        };
    }

    return(
        <div onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}  style={{
            top: props.fromHeight === 'top' ? `${props.clientY}px` : '',
            bottom: props.fromHeight === 'bottom' ? `${props.clientY}px` : '',
            left: props.fromWidth === 'left' ? `${props.clientX}px` : '',
            right: props.fromWidth === 'right' ? `${props.clientX}px` : ''}
            }
            id={mouseLeft ? styles.startFadingAnim : styles.formatsToolKit} className={contextObj.modeState == 'light' ? styles.formatsToolKitLight : styles.formatsToolKitDark}>
            <div className={styles.btnDiv}>
                <button onClick={() => tryExec()}><img src={fontFamilyImg} width={15} height={15} loading='lazy' alt="font family image" /></button>
                <button onClick={() => showFontSizesToolKitHandler()} className={styles.fontSizeBtn}>
                    <img src={fontSizeImg} width={15} height={15} loading='lazy' alt="font size image" />
                    {showFontSizesToolKit &&
                        <div onMouseEnter={() => clearTokenOnMouseEnter()} onMouseLeave={() => hideFontSizesDivOnMouseLeave()} id='fontSizesDiv' ref={fontSizesDivRef} style={{
                                flexDirection: props.fromHeight === 'top'? 'column' : 'column-reverse',
                                top: props.fromHeight === 'top' ? '100%' : '', bottom: props.fromHeight === 'bottom' ? '100%' : '' 
                                }} className={styles.sizesDiv}>
                                    <span onClick={() => changeFontSizeHandler(1)} style={{borderTop: props.fromHeight === 'top' ? 'none' : '',
                                                    borderBottom: props.fromHeight === 'bottom' ? 'none' : ''}}>1</span>
                                            <span onClick={() => changeFontSizeHandler(2)}>2</span>
                                            <span onClick={() => changeFontSizeHandler(3)}>3</span>
                                            <span onClick={() => changeFontSizeHandler(4)}>4</span>
                                            <span onClick={() => changeFontSizeHandler(5)}>5</span>
                                            <span onClick={() => changeFontSizeHandler(6)}>6</span>
                                            <span onClick={() => changeFontSizeHandler(7)} style={{borderBottom: props.fromHeight === 'top' ? 'none' : '',
                                                            borderTop: props.fromHeight === 'bottom' ? 'none' : ''}}>7</span>
                        </div>
                    } 
                </button>
                <button style={{position: 'relative'}}>
                    <img src={colorFontImg} width={15} height={15} loading='lazy' alt="color font image" />
                    <input onChange={e => handleColorChange(e)} style={{zIndex: '10', opacity: '0', width: '100%', height: '100%', position: 'absolute'}} type="color" name="" id="" />
                </button>
                <button onClick={() => handleAlignTextLeft()}><img src={alignLeftImg} width={15} height={15} loading='lazy' alt="align text left image" /></button>
                <button onClick={() => handleAlignTextCenter()}><img src={alignMiddleImg} width={15} height={15} loading='lazy' alt="align text center image" /></button>
                <button onClick={() => handleAlignTextRight()}><img src={alignRightImg} width={15} height={15} loading='lazy' alt="align text right image" /></button>
                <button onClick={() => handleIndentText()}><img src={indentImg} width={15} height={15} loading='lazy' alt="indent text image" /></button>
            </div>
            <div className={styles.btnDiv}>
                <button onClick={() => handleBoldFont()}><img src={boldImg} width={11} height={11} loading='lazy' alt="bold text image" /></button>
                <button onClick={() => handleMakeFontItalic()}><img src={italicImg} width={15} height={15} loading='lazy' alt="make text italic image" /></button>
                <button onClick={() => handleUnderlineFont()}><img src={underlineImg} width={15} height={15} loading='lazy' alt="underline text image" /></button>
                <button onClick={() => handleMakeFontSuperscript()}><img src={superScriptImg} width={15} height={15} loading='lazy' alt="make text superscript image" /></button>
                <button onClick={() => handleMakeFontSubscript()}><img src={subScriptImg} width={15} height={15} loading='lazy' alt="make text subscript image" /></button>
                <button onClick={() => handleInsertHorizontalRule()}><img src={horizontalRuleImg} width={15} height={15} loading='lazy' alt="insert horizontal rule image" /></button>
                <button onClick={() => handleOutdentText()}><img src={outdentImg} width={15} height={15} loading='lazy' alt="outdent text image" /></button>
            </div>
        </div>
    );
};