import styles from './DropDownMenu.module.css';
import { useRef } from 'react';
import img from '/src/assets/TopSectionImgs/dropDown.png';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';





export default function DropDownMenu(props){
    const contextObj = useContext(ContextObj);
    const dropDownMenuStateRef = useRef('hidden');
    const dropDownMenuRef = useRef(null);

    const openFileFromFilesStore = () =>{
        console.log('open file');
    };
    const addFileToFilesStore = () =>{
        console.log('add file');
    };
    const redoLastAction = () =>{
        console.log('redo last action');
    };
    const undoLastAction = () =>{
        console.log('undo last action')
    };

    const toggleDropDownMenu = () =>{
        if(dropDownMenuStateRef.current === 'hidden'){
            dropDownMenuRef.current.style.display = 'flex';
            dropDownMenuStateRef.current = 'visible';
        }else{
            dropDownMenuRef.current.style.display = 'none';
            dropDownMenuStateRef.current = 'hidden';
        }
    };

    return(
        <div className={styles.container}>
            
            <button onClick={() => toggleDropDownMenu()} className={styles.dropDownBtn}>
                <img src={img} style={{width: '20px', height: '10px'}} alt="" width={20} height={20}/>    
            </button>
            <div ref={dropDownMenuRef} className={styles.dropDownMenu}>
                <button onClick={() => openFileFromFilesStore()} id={styles.openFileBtn}>
                    <img className={styles.topSectionImg} src={props.imgs.openFileImg} alt="" />
                    <span className={styles.topSectionToolkit} id={styles.openToolKit}>
                        click to open a file
                    </span>
                </button>

                <button onClick={() => addFileToFilesStore()} id={styles.saveFileBtn}>
                    <img className={styles.topSectionImg} src={props.imgs.saveFileImg} alt="" />
                    <span className={styles.topSectionToolkit} id={styles.saveToolKit}>
                        click to save a file
                    </span>
                </button>

                <button onClick={() => undoLastAction()} id={styles.undoActionBtn}>
                    <img className={styles.topSectionImg} src={props.imgs.undoActionImg} alt="" />
                    <span className={styles.topSectionToolkit} id={styles.undoToolKit}>
                        click to undo last action
                    </span>
                </button>

                <button onClick={() => redoLastAction()} id={styles.redoActionBtn}>
                    <img className={styles.topSectionImg} src={props.imgs.redoActionImg} alt="" />
                    <span className={styles.topSectionToolkit} id={styles.redoToolKit}>
                        click to redo last action
                    </span>
                </button>
                <button id={styles.printBtn}>
                    <img className={styles.topSectionImg} src={props.imgs.printTextImg} alt="" />
                    <span className={styles.topSectionToolkit} id={styles.printToolKit}>
                        click to print text
                    </span>
                </button>
            </div>
        </div>
    );
};