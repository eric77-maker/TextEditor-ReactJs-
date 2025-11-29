import styles from './List.module.css';
import orderedListImg from '/src/assets/InsertToolKitImgs/orderedList.png';
import unorderedListImg from '/src/assets/InsertToolKitImgs/unorderedList.png';
import pointToListImg from '/src/assets/InsertToolKitImgs/upArrow.png';
import insertLIColorImg from '/src/assets/InsertToolKitImgs/insertLink.png';
import {useState, useEffect, useRef, useContext } from 'react';
import { ContextObj } from '../../../../../TextEditor/TextEditor';





export default function List(){
    const contextObj = useContext(ContextObj);
    const idleTokenRef = useRef(null);
    const [color, setColor] = useState('');
    const onMountTimeOutTokenRef = useRef(null);
    const startAnimationTokenRef = useRef(null);
    const [startedAnim, setStartedAnim] = useState(false);
    const [toggleAnimation, setToggleAnimation] = useState(false);
    const triggeredBeforeOnInitialRef = useRef(false); 

    useEffect(() => {
        onMountTimeOutTokenRef.current = setTimeout(() => {
            setStartedAnim(true)
        }, 60000);


        return () => {
            onMountTimeOutTokenRef.current !== null && clearTimeout(onMountTimeOutTokenRef.current);
        };
    }, []);

    useEffect(() => {
        startAnimationTokenRef.current === null && startedAnim && setToggleAnimation(t => !t);

        if(startedAnim){
            startAnimationTokenRef.current = setInterval(() => {
                setToggleAnimation(t => !t);
            }, 180000 );
        };

        return () => {
            startAnimationTokenRef.current !== null && clearInterval(startAnimationTokenRef.current);
        };
    }, [startedAnim]);

    useEffect(() => {
        if(idleTokenRef.current === null && triggeredBeforeOnInitialRef.current){
            idleTokenRef.current = setTimeout(() => {
                document.getElementById('color').style.display = 'none';
                document.getElementById('insertColorBtn').style.display = 'none';
                idleTokenRef.current = null;
                triggeredBeforeOnInitialRef.current = false;
                setColor('');
            }, 5000);
        };

        return () => {
            idleTokenRef.current !== null && clearTimeout(idleTokenRef.current);
        };
    }, [color]);

    const handleInsertOrderedList = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('indent', false, null);
            document.execCommand('InsertOrderedList', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
        };
    };

    const handlerInsertUnorderedList = () =>{
        if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
            document.execCommand('indent', false, null);
            document.execCommand('InsertUnorderedList', false, null);
            if(document.getElementById('createTextInput') !== null){
                contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
            }else{
                contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
            }
        };
    };


    const applyColorToMarker = () => { 
        if(color !== ''){
            if(document.getElementById('createTextInput') !== null || document.getElementById('editTextInput') !== null){
                contextObj.setLastChosenColorForLIMarker(color);
            }
        };
    };

    const handleColorInputChange = color => {
        if(idleTokenRef.current !== null){
            clearTimeout(idleTokenRef.current);
            idleTokenRef.current = null;
        };

        setColor(color);
    };

    const showColorInput = () => {
        if(!triggeredBeforeOnInitialRef.current && idleTokenRef.current === null){
            idleTokenRef.current = setTimeout(() => {
                document.getElementById('color').style.display = 'none';
                document.getElementById('insertColorBtn').style.display = 'none';
                clearTimeout(idleTokenRef.current);
                idleTokenRef.current = null;
                triggeredBeforeOnInitialRef.current = false;
                setColor('');
            }, 5000);

            triggeredBeforeOnInitialRef.current = true;
        }
        document.getElementById('color').style.display = 'block';
        document.getElementById('insertColorBtn').style.display = 'grid';

        startAnimationTokenRef.current !== null && clearInterval(startAnimationTokenRef.current);
    };
    

    return(
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={() =>handleInsertOrderedList()}>
                    <img src={orderedListImg} alt="" width={18} height={18}/>
                </button>
                <button className={styles.btn} onClick={() =>handlerInsertUnorderedList()}>
                    <img src={unorderedListImg} alt="" width={18} height={18}/>
                </button>
            </div>
            <p onClick={() => showColorInput()} style={{cursor: 'pointer', position: 'relative'}} className={contextObj.modeState === 'light'? styles.textLight : styles.textDark}>
                <span id={toggleAnimation ? styles.startListAnim : ''}>
                    List
                </span>
                <input id='color' value={color} onChange={e => handleColorInputChange(e.target.value)} className={styles.color} type="text"  placeholder='rgb, hsl, HEX'/>
                <button onClick={() => applyColorToMarker()} id='insertColorBtn' className={styles.insertColorBtn}><img src={insertLIColorImg} alt="" width={11} height={11}/></button>
            </p>

            <img src={pointToListImg} alt="" id={styles.pointToList} className={toggleAnimation ? styles.pointToListAnim : styles.pointToList}/>
        </div>
    );
}