import styles from './ConfirmSaveFileCover.module.css';
import { useState,useRef, useEffect, useContext } from 'react';
import { ContextObj } from '../../../../TextEditor/TextEditor';
import loadingImg from '/src/assets/MainComponentImgs/ConfirmSaveFile/loading.webp';



export default function ConfirmSaveFileCover(props){
    const contextObj = useContext(ContextObj);
    const inputRef = useRef(null);
    const [fileNameExists, setFileNameExists] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const tokenRef = useRef(null);

    useEffect(() =>{
        inputRef.current.focus();
    }, []);

    const addFileToFilesStoreHandler = () =>{
        if(window.frames['createTextInput'] && window.frames['createTextInput'].document.body.innerHTML.length > 0){
            const fileName = inputRef.current.value;
            const newFileContent = window.frames['createTextInput'].document.body.innerHTML;
            const totalPages = Math.round(createTextInput.document.body.scrollHeight / createTextInput.document.body.clientHeight);
            const liColor = contextObj.lastChosenColorForLIMarker.current;

            if(fileName){
                const newFile = {id: contextObj.filesStoreRef.current.length, fileName, content: newFileContent, liColor , totalPages: totalPages};
                contextObj.filesStoreRef.current = [...contextObj.filesStoreRef.current, newFile];
                const makeFileMostRecent = contextObj.recentFiles;
                contextObj.recentFiles.length > 0 && makeFileMostRecent.unshift(newFile);
                

                if(makeFileMostRecent.length > 25){
                    const sliceRecentFiles = makeFileMostRecent.slice(0, 26);
                    contextObj.setRecentFiles(sliceRecentFiles);
                }else{
                    contextObj.recentFiles.length < 1 && contextObj.setRecentFiles(r => [...r, newFile]);
                    contextObj.recentFiles.length > 0 && contextObj.setRecentFiles(makeFileMostRecent);
                };
            
            }else{
                const fileName = `file${contextObj.numberOfUnNamedFileRef.current + 1}`;
                const newFile = {id: contextObj.filesStoreRef.current.length, fileName, content: newFileContent, liColor , totalPages: totalPages};
                contextObj.filesStoreRef.current = [...contextObj.filesStoreRef.current, newFile];
                const makeFileMostRecent = contextObj.recentFiles;
                contextObj.recentFiles.length > 1 && makeFileMostRecent.unshift(newFile);

                if(makeFileMostRecent.length > 25){
                    const sliceRecentFiles = makeFileMostRecent.slice(0, 26);
                    contextObj.setRecentFiles(sliceRecentFiles);
                }else{
                    contextObj.recentFiles.length < 1 && contextObj.setRecentFiles(r => [...r, newFile]);
                    contextObj.recentFiles.length > 1 && contextObj.setRecentFiles(makeFileMostRecent);
                };

                contextObj.numberOfUnNamedFileRef.current = contextObj.numberOfUnNamedFileRef.current + 1;
            };
            
            props.setPages({current: 1, totalPages: 1});
            contextObj.totalPagesRef.current = null;
            contextObj.lastChosenColorForLIMarker.current = '';
            contextObj.setComponentMountToggler(c => ({...c, toolKit: ''}));
            contextObj.createEditContentRef.current = {from: '', content: ''};
            contextObj.setToggleConfirmSaveFile('hide');
            window.frames['createTextInput'].document.body.innerHTML = '';
        }else{
            window.alert('no content to save to file store!')
        }
    };

    const cancelSaveFileHandler = () =>{
        contextObj.setToggleConfirmSaveFile('hide');
    };

    const checkFileNameExistHandler = e =>{
        if(!isLoading){
            setIsLoading(true);
        };

        if(!fileNameExists){
            setFileNameExists(true);
        };

        if(tokenRef.current !== null){
            clearTimeout(tokenRef.current);
        };

        tokenRef.current = setTimeout(() => {
            const fileNameExists = contextObj.filesStoreRef.current.filter(file => file.fileName === e.target.value);

            if(fileNameExists.length > 0){
                setFileNameExists(true);
            }else{
                setFileNameExists(false);
            };
            setIsLoading(false);
        }, 1000)
    };


    return(
        <div className={styles.confirmSaveDiv}>
        <div className={styles.confirmSaveDivCompDiv}>
            <div className={styles.confirmFileNameInputDiv}>
                <input onChange={e => checkFileNameExistHandler(e)} ref={inputRef} placeholder='type file name here!' type="text" className={styles.confirmFileNameInput} />
                {isLoading &&<span><img src={loadingImg} width={18} height={18}/></span>}
            </div>
            <div>
                <button style={fileNameExists ? {backgroundColor: 'hsla(34, 35%, 19%, 0.9)', color: 'hsl(0, 68%, 91%)'} : {backgroundColor: 'hsla(240, 26%, 60%)', color: '#fff'}} disabled={fileNameExists === true} id={styles.btn} onClick={() => addFileToFilesStoreHandler()}>
                    {fileNameExists && "can't save"  || 'save'}
                </button>

                <button id={styles.btn} onClick={() => cancelSaveFileHandler()}  className={styles.cancelBtn}>
                    cancel
                </button>
            </div>

            {isLoading && <p style={{color: contextObj.modeState =='light'? '#334' : '#fff', marginTop: '3px'}}>validating...</p>}

            {fileNameExists === false && !isLoading &&
                <p style={{color: contextObj.modeState =='light'? 'blue' : '#fff', marginTop: '0.8vh', fontSize: '12px'}}>
                    file name can be used!
                </p>
            }

            {fileNameExists && !isLoading &&
                <p style={{color: 'hsl(0, 100%, 78%)', marginTop: '0.8vh', fontSize: '12px'}}>
                    file name already in use!
                </p>
            }
        </div>
    </div>

    );
};       