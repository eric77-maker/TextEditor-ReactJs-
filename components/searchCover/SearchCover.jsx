import styles from './SearchCover.module.css';
import { useEffect, useRef, useState, useContext } from 'react';
import { ContextObj } from '../TextEditor/TextEditor';
import { List, AutoSizer } from 'react-virtualized';
import readImg from '/src/assets/searchCoverImgs/read.svg';
import editImg from '/src/assets/searchCoverImgs/editText1.png';
import deletePermenantImg from '/src/assets/searchCoverImgs/deletePerm.png';
import confirmFileToDeleteImg from '/src/assets/searchCoverImgs/correct.png';
import cancelDeleteImg from '/src/assets/searchCoverImgs/cancel.png';






export default function SearchCover(){
    const contextObj = useContext(ContextObj);
    const searchInputRef = useRef(null);
    const [searchedResult, setSearchedResult] = useState([]);
    

    useEffect(() =>{
        searchInputRef.current.focus();
    }, []); 


    useEffect(() =>{
        const debounceSearch = (fn, wait) =>{
            let token;

            return e =>{
                if(token){
                    clearTimeout(token);
                };

                token = setTimeout(() =>{
                    fn(e);
                }, wait);
            }
        };


        const storeSearchedResult = e =>{
            const result = contextObj.filesStoreRef.current.filter((file, index) =>{
                if(file.fileName.includes(e.target.value) && e.target.value !== ''){
                    return file
                };
            });

            setSearchedResult(result);
        };

        searchInputRef.current.addEventListener('keyup', debounceSearch(storeSearchedResult, 1000));

        return () =>{
            searchInputRef.current && searchInputRef.current.removeEventListener('keyup', debounceSearch);
        };
    }, []);

    const readFileHandler = file =>{
        if(contextObj.readFileRef.current === null){
            contextObj.readFileRef.current = file;
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
        }else{
            contextObj.readFileRef.current = file;
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read', reRenderReadComp: !c.reRenderReadComp}));
        };

        contextObj.setFileName(f => ({...f, fileName: file.fileName}));
        contextObj.setToggleSearch(false)
        contextObj.createEditContentRef.current = {from: '', content: ''};
    };

    const editFileHandler = file =>{
        if(contextObj.fileName.fileName !== file.fileName){
            contextObj.createEditContentRef.current = {from: '', content: ''};
            contextObj.fileToEditRef.current = file;
            contextObj.readFileRef.current = file;
            contextObj.setFileName(f => ({...f, fileName: file.fileName}));
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'edit', reRenderReadComp: !c.reRenderReadComp}));
        }else{
            contextObj.setFileName(f => ({...f, from: 'edit'}))
        };

        contextObj.setToggleSearch(false);
    };

    const cancelFileDeletionHandler = index =>{
        document.getElementById(`confirmDeletionBtn${index}`).style.visibility = 'hidden';
        document.querySelector(`.confirmDelete${index}`).style.display = 'none';
        document.querySelector(`.confirmDeletionInput${index}`).value = '';
    };

    const deleteFilePermanentHandler = index =>{
        document.querySelector(`.confirmDelete${index}`).style.display = 'flex';
    };

    const confirmFileDeletionHandler = (id, File) =>{
        const removeFileFromFileStore = contextObj.filesStoreRef.current.filter((file, index) =>{
            if(file.fileName !== File.fileName){
                return file;
            };
        });

        const removeFileFromSearchedResult = searchedResult.filter((file, index) =>{
            if(file.fileName !== File.fileName){
                return file;
            };
        });

        const removeFileFromRecentFiles = contextObj.recentFiles.filter((file, index) =>{
            if(file.fileName !== File.fileName){
                return file;
            };
        });

        if(window.frames['editTextInput'] && contextObj.fileToEditRef.fileName === File.fileName && contextObj.fileToEditRef.id == id){
            window.frames['editTextInput'].document.body.innerHTML = '';
        };

        if(contextObj.readFileRef.current.fileName == File.fileName && contextObj.readFileRef.current.id === id){
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'create'}));
        };


        contextObj.filesStoreRef.current = removeFileFromFileStore;
        setSearchedResult(removeFileFromSearchedResult);
        contextObj.setRecentFiles(removeFileFromRecentFiles);

        if(removeFileFromFileStore.length < 1){
            contextObj.setToggleSearch(false);
        };
    };

    const checkFileNameMatch = (e, fileName, index) =>{
        if(e.target.value === fileName){
            document.querySelector(`.confirmDeletionInput${index}`).style.color = 'rgb(88, 42, 42, 0.5)';
            document.getElementById(`confirmDeletionBtn${index}`).style.visibility = 'visible';
        }else{
            document.querySelector(`.confirmDeletionInput${index}`).style.color = '';
            document.getElementById(`confirmDeletionBtn${index}`).style.visibility = 'hidden';
        };
    };

    const showFullFileNameHandler = index =>{
        if(searchedResult.length > 1){
            document.getElementById(index + 1).style.display = 'flex';
        };
    };

    const hideFullFileNameHandler = index =>{
        if(searchedResult.length  > 1){
            document.getElementById(index + 1).style.display = 'none';
        }
    };

    return(
        <div className={styles.searchCover}>
            {searchedResult.length < 1 && <p className={styles.totalFiles}>Found no file</p>}
            {(searchedResult.length > 0 && searchedResult.length < 2) && <p className={styles.totalFiles}>Found {searchedResult.length} file</p>}
            {searchedResult.length > 1 && <p className={styles.totalFiles}>Found {searchedResult.length} files</p>}
            
            <button onClick={() => contextObj.setToggleSearch(false)} className={styles.closeSearch}>X</button>
            <input className={styles.searchInput} ref={searchInputRef} type="text" placeholder='search file here!'/>

            {searchedResult.length < 1 && <div className={styles.noResult}> <div>No Search Result Yet!</div></div>}
            {searchedResult.length > 0 && (
                <div className={styles.resultDiv} style={{width: '30vw', minWidth: '300px', height: '60vh'}}>
                    <AutoSizer>
                        {({width, height}) =>(
                            <List
                                width={width} height={height}
                                rowHeight={40} rowCount={searchedResult.length}
                                rowRenderer={({key, index, style, parent}) => {
                                    const file = searchedResult[index];
                                    return(
                                        <div id={style.fileDiv} key={key} style={style}>
                                            <div style={{display: 'none'}} className={'confirmDelete'+index} id={styles.confirmDelete}>
                                                <input className={'confirmDeletionInput'+index} onChange={e => checkFileNameMatch(e, file.fileName, index)} type="text" placeholder='type file name to confirm deletion!'/>
                                                <span>
                                                    <button id={'confirmDeletionBtn'+index} style={{visibility: 'hidden'}} onClick={() => confirmFileDeletionHandler(file.id, file)}>
                                                        <img src={confirmFileToDeleteImg} alt="" width={14} height={15}/>
                                                    </button>
                                                    <button onClick={() => cancelFileDeletionHandler(index)}>
                                                        <img src={cancelDeleteImg} alt="" width={14} height={14}/>
                                                    </button>
                                                </span>
                                            </div>
                                            {file.fileName.length >= 19 && <p id={index} onMouseLeave={() => hideFullFileNameHandler(index)} onMouseEnter={() => showFullFileNameHandler(index)} className={style.longFileName}>{file.fileName.slice(0, 20)}...</p>}
                                            {file.fileName.length < 19 &&  <p>{file.fileName}</p>}
                                            <div className={styles.fileBtnDiv} style={{border: 'none', display: 'flex', alignItems: 'center', columnGap: '5px'}}>
                                                <button onClick={() => readFileHandler(file)}>
                                                    <img style={{paddingTop: '2.75px'}}  src={readImg} alt="" width={14} height={14}/>
                                                </button>
                                                <button onClick={() => editFileHandler(file)}>
                                                    <img src={editImg} alt="" width={14} height={14}/>
                                                </button>
                                                <button onClick={() => deleteFilePermanentHandler(index)}>
                                                    <img src={deletePermenantImg} alt="" width={14} height={14}/>
                                                </button>
                                            </div>
                                            {file.fileName.length >= 19 && searchedResult.length > 1 && index < searchedResult.length - 1 && <p id={index + 1} className={styles.fullFileNameToolkit}>{file.fileName}</p>}
                                            {file.fileName.length >= 19 && searchedResult.length > 1 && index >= searchedResult.length - 1 && <p id={index + 1} className={styles.lastFullFileNameToolkit}>{file.fileName}</p>}
                                        </div>
                                    ); 
                                }}
                            />
                        )}
                    </AutoSizer>
                </div>
            )
            }
        </div>
    );
};