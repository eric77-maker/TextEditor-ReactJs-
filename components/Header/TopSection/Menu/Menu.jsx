import styles from './Menu.module.css';
import { useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';



export default function Menu(props){
    const contextObj = useContext(ContextObj);

    const openFileFromFilesStore = () =>{
        //return;
    };

    const addFileToFilesStore = () =>{
        if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
            contextObj.setToggleConfirmSaveFile('show');
        }else{
            window.alert('no content to save to file store!')
        }
    };

    const redoLastAction = () =>{
        if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
            createTextInput.document.execCommand('redo', false, null);
        };

        if(window.frames['editTextInput'] && window.frames['editTextInput'].document.body.innerHTML.length > 0){
            editTextInput.document.execCommand('redo', false, null);
        }
    };

    const undoLastAction = () =>{
        if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
            createTextInput.document.execCommand('undo', false, null);
        };

        if(window.frames['editTextInput'] && window.frames['editTextInput'].document.body.innerHTML.length > 0){
            editTextInput.document.execCommand('undo', false, null);
        };
    };

    const printDocumentHandler = () =>{
        if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
            createTextInput.document.execCommand('print', false, null);
        }else if(window.frames['editTextInput'] && window.frames['editTextInput'].document.body.innerHTML.length > 0){
            editTextInput.document.execCommand('print', false, null);
        }else{
            alert('no content to print');
        };
    };

    return(
        <div className={styles.container}>
            <button onClick={() => openFileFromFilesStore()} id={styles.openFileBtn}>
                <img className={styles.topSectionImg} src={props.imgs.openFileImg} alt="" width={18} height={18}/>
                <span className={styles.topSectionToolkit} id={styles.openToolKit}>
                    click to open a file
                </span>
            </button>

            <button onClick={() => addFileToFilesStore()} id={styles.saveFileBtn}>
                <img className={styles.topSectionImg} src={props.imgs.saveFileImg} alt="" width={18} height={18}/>
                <span className={styles.topSectionToolkit} id={styles.saveToolKit}>
                    click to save a file
                </span>
            </button>

            <button onClick={() => undoLastAction()} id={styles.undoActionBtn}>
                <img className={styles.topSectionImg} src={props.imgs.undoActionImg} alt="" width={18} height={18}/>
                <span className={styles.topSectionToolkit} id={styles.undoToolKit}>
                    click to undo last action
                </span>
            </button>

            <button onClick={() => redoLastAction()} id={styles.redoActionBtn}>
                <img className={styles.topSectionImg} src={props.imgs.redoActionImg} alt="" width={18} height={18}/>
                <span className={styles.topSectionToolkit} id={styles.redoToolKit}>
                    click to redo last action
                </span>
            </button>
            <button onClick={() => printDocumentHandler()} id={styles.printBtn}>
                <img className={styles.topSectionImg} src={props.imgs.printTextImg} alt="" width={20} height={20}/>
                <span className={styles.topSectionToolkit} id={styles.printToolKit}>
                    click to print text
                </span>
            </button>
        </div>
    );
};