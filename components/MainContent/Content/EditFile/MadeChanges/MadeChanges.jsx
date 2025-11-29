import styles from './MadeChanges.module.css';
import { useRef, useState, useEffect, useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';
import saveChangesImg from '/src/assets/EditFileImgs/saveChanges.png';
import discardChangesImg from '/src/assets/searchCoverImgs/cancel.png';
import savingFileImg from '/src/assets/EditFileImgs/savingFile.webp';




export default function MadeChanges(){
    const contextObj = useContext(ContextObj);
    const confirmSaveEditRef = useRef(null);
    const [savingStateLoading, setSavingStateLoading] = useState(false);
    const [showSaveChangesImgBtn, setShowSaveChangesImgBtn] = useState(false);
    const [showDiscardChangesImgBtn, setShowDiscardChangesImgBtn] = useState(false);
    const timeoutTokenRef = useRef(null);

    useEffect(() => {
        console.log(contextObj.lastCurrentPageRef.current);
        contextObj.toggleSearch && contextObj.setToggleSearch(false);
        
        if(contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
            contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current = false;
        };
    }, []);

    const confirmSaveChangesHandler = () => {
        setSavingStateLoading(true);

            let editedFile;

            const updatedFileStore = contextObj.filesStoreRef.current.map((file, index) =>{
                if(file.fileName === contextObj.fileToEditRef.current.fileName){
                    editedFile = {...file, content: contextObj.storeFileTempRef.current.editedFile.editedContent !== file.content ? contextObj.storeFileTempRef.current.editedFile.editedContent : file.content,
                        totalPages: contextObj.totalPagesRef.current != file.totalPages ? contextObj.totalPagesRef.current : file.totalPages,
                        editLastCurrentPage: contextObj.lastCurrentPageRef.current? contextObj.lastCurrentPageRef.current : file.editLastCurrentPage};
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
 
            if(contextObj.storeFileTempRef.current.file){
                if((contextObj.wasGoingToAfterEditRef.current === 'read' || contextObj.wasGoingToAfterEditRef.current === 'edit') && editedFile.fileName === contextObj.storeFileTempRef.current.file.fileName){
                    contextObj.fileToEditRef.current = editedFile;
                    contextObj.readFileRef.current = editedFile;
                };
    
                if((contextObj.wasGoingToAfterEditRef.current === 'read' || contextObj.wasGoingToAfterEditRef.current === 'edit') && editedFile.fileName !== contextObj.storeFileTempRef.current.file.fileName){
                    contextObj.fileToEditRef.current = contextObj.storeFileTempRef.current.file;
                    contextObj.readFileRef.current = contextObj.storeFileTempRef.current.file;
                    contextObj.setFileName(f => ({...f, fileName: contextObj.readFileRef.current.fileName}));
                };
            }else{
                contextObj.fileToEditRef.current = editedFile;
                contextObj.readFileRef.current = editedFile;
            };



         
            contextObj.totalPagesRef.current = 1;
            contextObj.storeFileTempRef.current = null;
            contextObj.lastCurrentPageRef.current = null;
            contextObj.filesStoreRef.current = updatedFileStore;
            contextObj.createEditContentRef.current = {from: '', content: ''};
            contextObj.setRecentFiles(updatedRecentFiles);    

        timeoutTokenRef.current = setTimeout(() => {
            clearTimeout(timeoutTokenRef.current);
            contextObj.madeChangesRef.current = false;
            contextObj.setPromptWithoutSavingChangesOnEdit(false);
            contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.wasGoingToAfterEditRef.current}));
        }, 10000);
    };

    const confirmDiscardChangesHandler = () => {
        if(contextObj.componentMountToggler.actionContent === contextObj.wasGoingToAfterEditRef.current){
            contextObj.fileToEditRef.current = contextObj.storeFileTempRef.current.file;
            contextObj.readFileRef.current = contextObj.storeFileTempRef.current.file;
            contextObj.setFileName(f => ({...f, fileName: contextObj.readFileRef.current.fileName}));
        }else{
            if(contextObj.storeFileTempRef.current.file){
                if(contextObj.fileToEditRef.current.fileName === contextObj.storeFileTempRef.current.file.fileName){
                    contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.wasGoingToAfterEditRef.current}));
                }else{
                    contextObj.fileToEditRef.current = contextObj.storeFileTempRef.current.file;
                    contextObj.readFileRef.current = contextObj.storeFileTempRef.current.file;
                    contextObj.setFileName(f => ({...f, fileName: contextObj.readFileRef.current.fileName}));
                    contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.wasGoingToAfterEditRef.current}));
                };
            }else{
                contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.wasGoingToAfterEditRef.current}));
            };
        };

        contextObj.totalPagesRef.current = 1;
        contextObj.setPromptWithoutSavingChangesOnEdit(false);
        contextObj.madeChangesRef.current = false;
        contextObj.storeFileTempRef.current = null;
        contextObj.lastCurrentPageRef.current = null;
        contextObj.createEditContentRef.current = {from: '', content: ''};
    };

    return(
        <div className={styles.container} ref={confirmSaveEditRef}>
            {!savingStateLoading && <h1 id={styles.title}>Made Some Changes On Edit?</h1>}
            {savingStateLoading && 
                <div className={styles.savingChangesDiv}>
                    <h1 className={styles.animH1}>
                        <span>S</span> 
                        <span>a</span>
                        <span>v</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                        &nbsp;
                        <span>C</span>
                        <span>h</span>
                        <span>a</span>
                        <span>n</span>
                        <span>g</span>
                        <span>e</span>
                        <span>s</span>
                        &nbsp;
                        <span>W</span>
                        <span>a</span>
                        <span>i</span>
                        <span>t</span>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </h1>
                    <img src={savingFileImg} alt='loader' width={18} height={18}/>
                </div>
            }

            {!savingStateLoading && 
                        <div onMouseLeave={() => setShowSaveChangesImgBtn(false)} className={styles.saveChangesDiv}>
                            {showSaveChangesImgBtn && 
                                <button onClick={() => confirmSaveChangesHandler()}>
                                    <img src={saveChangesImg} alt="save" />
                                </button>
                            }

                            {!showSaveChangesImgBtn && <p onMouseEnter={() => setShowSaveChangesImgBtn(true)} id='save'>Save Changes</p>}
                        </div>
            }

            {!savingStateLoading &&
                        <div className={styles.orDiv}>
                            <p>Or</p>
                        </div>
            }

            {!savingStateLoading && 
                        <div onMouseLeave={() => setShowDiscardChangesImgBtn(false)} className={styles.discardDiv}>
                            {showDiscardChangesImgBtn && 
                                <button onClick={() => confirmDiscardChangesHandler()}>
                                    <img src={discardChangesImg} alt="discard" width={30} height={30}/>
                                </button>
                            }

                            {!showDiscardChangesImgBtn && <p onMouseEnter={() => setShowDiscardChangesImgBtn(true)} id='discard'>Discard</p>}
                        </div>
            }
        </div>
    );
};