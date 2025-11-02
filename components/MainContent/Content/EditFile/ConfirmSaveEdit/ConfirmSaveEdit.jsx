import styles from './ConfirmSaveEdit.module.css';
import { useEffect, useRef, useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';



export default function ConfirmSaveEdit(props){
    const contextObj = useContext(ContextObj);
    const inputRef = useRef(null);


    useEffect(() =>{
        inputRef.current.value = props.fileToEditRef.current.fileName;
        inputRef.current.focus();
    }, []);

    const confirmSaveEditHandler = () =>{
        
        const editedFileContent = window.frames['editTextInput'].document.body.innerHTML;
    
        let liColor;

        if(props.prevLiColor == contextObj.lastChosenColorForLIMarker.current){
            liColor = props.prevLiColor;
        };

        if(props.prevLiColor === '' && contextObj.lastChosenColorForLIMarker.current !== ''){
            liColor = contextObj.lastChosenColorForLIMarker.current;
        };

        if(props.prevLiColor !== '' && contextObj.lastChosenColorForLIMarker.current === ''){
            liColor = props.prevLiColor;
        }

        if(props.prevLiColor !== contextObj.lastChosenColorForLIMarker.current  && contextObj.lastChosenColorForLIMarker.current !== ''){
            liColor = contextObj.lastChosenColorForLIMarker.current;
        }

        let editedFile;
        

        const updatedFileStore = contextObj.filesStoreRef.current.map((file, index) =>{
            if(file.fileName === contextObj.fileToEditRef.current.fileName){
                editedFile = {...file, fileName: inputRef.current.value, content: editedFileContent, liColor, editLastCurrentPage: contextObj.lastCurrentPageRef.current, totalPages: props.pages.totalPages};
                return editedFile;
            };

            return file;
        });

        const updatedRecentFiles = contextObj.recentFiles.map((file, index) =>{
            if(file.fileName === contextObj.fileToEditRef.current.fileName){
                return editedFile;
            };

            return file;
        });


        contextObj.fileToEditRef.current = editedFile;
        contextObj.readFileRef.current = editedFile;
        contextObj.lastCurrentPageRef.current = null;
        contextObj.filesStoreRef.current = updatedFileStore;
        contextObj.setRecentFiles(updatedRecentFiles); 


        contextObj.totalPagesRef.current = 1;
        contextObj.lastChosenColorForLIMarker.current = '';
        contextObj.createEditContentRef.current = {from: '', content: ''};
        contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
    };

    const cancelSaveEditHandler = () =>{
        props.setToggleConfirmSaveComp(false);
    };

    return(
        <div className={styles.confirmSaveDiv}>
            <div className={styles.confirmSaveDivCompDiv}>
                <input ref={inputRef} type="text" className={styles.confirmFileNameInput} />
                <div>
                    <button id={styles.btn} onClick={() => confirmSaveEditHandler()} className={styles.confirmBtn}>
                        confirm
                    </button>

                    <button id={styles.btn} onClick={() => cancelSaveEditHandler()} className={styles.cancelBtn}>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
};