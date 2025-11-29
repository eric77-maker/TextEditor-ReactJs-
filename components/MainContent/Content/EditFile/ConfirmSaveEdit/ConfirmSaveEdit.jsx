import styles from './ConfirmSaveEdit.module.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';
import savingFileImg from '/src/assets/EditFileImgs/savingFile.webp';
import doneSavingImg from '/src/assets/EditFileImgs/doneSaving.png';


export default function ConfirmSaveEdit(props){
    const contextObj = useContext(ContextObj);
    const [fileNameAlreadyInUse, setFileNameAlreadyInUse] = useState(null);
    const [displayAlreadyInUseMsg, setDisplayAlreadyInUseMsg] = useState(false);
    const showDoneSavingRef = useRef(false);
    const [showSavingState, setShowSavingState] = useState(false);
    const timeOutTokenForSavingStateRef = useRef(null);
    const timeoutTokenRef = useRef(null);
    const inputRef = useRef(null);
    const disableBtnRef = useRef(false);
    const confirmSaveEditRef = useRef(null);
    const confirmSaveEditHandlerRef = useRef(null);


    useEffect(() =>{
        inputRef.current.value = props.fileToEditRef.current.fileName;
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if(fileNameAlreadyInUse === 'no'){
            displayAlreadyInUseMsg && setDisplayAlreadyInUseMsg(false);
            const editedFileContent = document.getElementById('editTextInput').innerHTML;
            let editedFile;
            
            const updatedFileStore = contextObj.filesStoreRef.current.map((file, index) =>{
                if(file.fileName === contextObj.fileToEditRef.current.fileName){
                    editedFile = {...file, fileName: inputRef.current.value, content: editedFileContent, editLastCurrentPage: contextObj.lastCurrentPageRef.current, totalPages: props.pages.totalPages};
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
    
    
            contextObj.madeChangesRef.current = false;
            contextObj.totalPagesRef.current = 1;
            contextObj.showPromptToSaveChanges && contextObj.setShowPromptToSaveChanges(false);
            contextObj.lastChosenColorForLIMarker === '' && contextObj.setLastChosenColorForLIMarker('');
            contextObj.createEditContentRef.current = {from: '', content: ''};

            disableBtnRef.current = true;
            setShowSavingState(true);

            timeOutTokenForSavingStateRef.current = setTimeout(() =>{
                showDoneSavingRef.current = true;
                setShowSavingState(false);
                clearTimeout(timeOutTokenForSavingStateRef.current);
                timeOutTokenForSavingStateRef.current = null;
            }, 3000 + editedFileContent.length - 800);

            timeoutTokenRef.current = setTimeout(() => {
                clearTimeout(timeoutTokenRef.current);
                timeoutTokenRef.current = null;
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
            }, (3000 + editedFileContent.length));
        };


        if(fileNameAlreadyInUse === 'yes'){
            setDisplayAlreadyInUseMsg(true);
        };

        setFileNameAlreadyInUse(null);
    }, [fileNameAlreadyInUse]);

    useEffect(() => {
        const checkKeyPressEqualEnter = e => {
                if(e.key === 'Enter'){
                    confirmSaveEditHandlerRef.current();
                };
        };

        confirmSaveEditRef.current && confirmSaveEditRef.current.addEventListener('keypress',e => checkKeyPressEqualEnter(e));

        return () => {
            confirmSaveEditRef.current && confirmSaveEditRef.current.removeEventListener('keypress', checkKeyPressEqualEnter);
        };
    }, []);

    useEffect(() => {
        if(confirmSaveEditHandlerRef.current === null){
            confirmSaveEditHandlerRef.current = () =>{
                let inUse = 0;
                contextObj.filesStoreRef.current.map(file => {
                    if(file.id != contextObj.fileToEditRef.current.id && file.fileName === inputRef.current.value){
                        inUse = 1;
                        return;
                    };
                });
        
                if(inUse == 1){
                    setFileNameAlreadyInUse('yes');
                }else{
                    displayAlreadyInUseMsg && setDisplayAlreadyInUseMsg(false);
                    setFileNameAlreadyInUse('no');
                };
            };
        }
    }, [])

    const cancelSaveEditHandler = () =>{
        props.setToggleConfirmSaveComp(false);
    };

    return(
        <div className={styles.confirmSaveDiv} ref={confirmSaveEditRef}>
            <div className={styles.confirmSaveDivCompDiv}>
                <input ref={inputRef} type="text" className={styles.confirmFileNameInput} />
                <div>
                    <button disabled={disableBtnRef.current} id={styles.btn} onClick={() => confirmSaveEditHandlerRef.current()} className={styles.confirmBtn}>
                        confirm
                    </button>

                    <button disabled={disableBtnRef.current} id={styles.btn} onClick={() => cancelSaveEditHandler()} className={styles.cancelBtn}>
                        cancel
                    </button>
                </div>
                {showSavingState && (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src={savingFileImg} alt="" width={50} height={50}/>
                        <p style={{color: 'blue', fontSize: '12px'}}>Saving Changes...</p>
                    </div>
                )}

                {showDoneSavingRef.current && (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src={doneSavingImg} alt="" width={50} height={50}/>
                        <p style={{color: 'green', fontSize: '12px'}}>Done Saving</p>
                    </div>
                )}
                {displayAlreadyInUseMsg && <p style={{fontSize: '12px'}}>file name already in use!</p>}
            </div>
        </div>
    );
};