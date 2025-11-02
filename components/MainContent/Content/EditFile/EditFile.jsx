import styles from './EditFile.module.css';
import { useState, useRef, useEffect, useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import ConfirmSaveEdit from './ConfirmSaveEdit/ConfirmSaveEdit';
import saveChangesImg from '/src/assets/EditFileImgs/saveChanges.png';
import goBackImg from '/src/assets/EditFileImgs/goBack.png';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';



export default function EditFile(){
    const contextObj = useContext(ContextObj);
    const clientHeightRef = useRef(null);
    const scrollTopRef = useRef(null);
    const [toggleConFirmSaveComp, setToggleConfirmSaveComp] = useState(false);
    const [pages, setPages] = useState({currentPage: 1, totalPages: null});
    const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
    const moveUpIdleTokenRef = useRef(null);
    const moveUpTimeOutFuncRef = useRef(null);
    const [offsetHeight, setOffSetHeight] = useState(null);
    const [loadingFileToEdit, setLoadingFileToEdit] = useState(null);
    //const madeChangesRef = useRef(false);

    
    useEffect(() => {
        if(contextObj.fromRef.current === 'read'){
            setLoadingFileToEdit(true);
            const updatedFileStore = contextObj.filesStoreRef.current.map(file =>{
                if(file.fileName === contextObj.readFileRef.current.fileName){
                    return {...file, readLastCurrentPage: contextObj.lastCurrentPageRef.current};
                };
                
                    return file;
                });
                
            const updatedRecentFiles = contextObj.recentFiles.map(file =>{
                if(file.fileName === contextObj.readFileRef.current.fileName){
                    return {...file, readLastCurrentPage: contextObj.lastCurrentPageRef.current};
                };
                
                    return file;
            });

            contextObj.fromRef.current = 'edit';
            contextObj.lastCurrentPageRef.current = null;
            contextObj.filesStoreRef.current = updatedFileStore;
            contextObj.setRecentFiles(updatedRecentFiles); 
        };
        setLoadingFileToEdit(false);
    }, []);

    useEffect(() =>{
        if(!loadingFileToEdit){
            editTextInput.document.designMode = 'On';
            document.getElementById('editTextInput').focus(); 

            const iframe = document.getElementById('editTextInput'); // Get the iframe element
            const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
            const defaultLiMarkerColor = contextObj.modeState === 'light' ? '#333' : '#fff';
            const noliColor = contextObj.fileToEditRef.current.liColor == '' ? defaultLiMarkerColor : contextObj.fileToEditRef.current.liColor;
            const style = iframeDoc.createElement('style');

            style.textContent = `
                li::marker {
                    color: ${contextObj.lastChosenColorForLIMarker.current !== '' ? contextObj.lastChosenColorForLIMarker.current : noliColor};
                }
                /* WebKit-based browsers (Chrome, Safari) */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%));
                    border-radius: 5px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, hsl(0, 0%, 25%), hsl(240, 21%, 70%), hsl(240, 21%, 76%), hsl(240, 21%, 82%));
                }
        
                /* Firefox */
                body {
                    scrollbar-width: thin;
                    scrollbar-color: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%)) transparent;
                }
            `;

            iframeDoc.head.append(style);

            if(contextObj.createEditContentRef.current.from === ''){
                window.frames['editTextInput'].document.body.innerHTML = contextObj.fileToEditRef.current.content;
                contextObj.createEditContentRef.current = {from: 'edit', content: contextObj.fileToEditRef.current.content};
            }else{
        
                const fromReviewFile =  contextObj.createEditContentRef.current;
                iframeDoc.body.innerHTML = fromReviewFile.content;
        
                contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, Document: window.frames['editTextInput'].document};
            };
    
        }
    }, [contextObj.componentMountToggler.reRenderReadComp, contextObj.modeState, contextObj.fileName.fileName]);

    useEffect(() =>{
        setPages(p =>({...p, totalPages: contextObj.fileToEditRef.current.totalPages}));
    }, [])
 

    useEffect(() =>{
        moveUpTimeOutFuncRef.current = () =>{
            setShowMoveUpBtn(false);
            clearTimeout(moveUpIdleTokenRef.current);
            moveUpIdleTokenRef.current = null;
        };
    }, []);

    useEffect(() =>{
        if(pages.totalPages >= 5 && pages.currentPage >= 4){
            showMoveUpBtn === false && setShowMoveUpBtn(true);
            moveUpIdleTokenRef.current = setTimeout(moveUpTimeOutFuncRef.current, 5000);
        }else{
            if(moveUpIdleTokenRef.current !== null){
                clearTimeout(moveUpIdleTokenRef.current);
                moveUpIdleTokenRef.current = null;
            }
            setShowMoveUpBtn(false);
        };

        if(pages.currentPage > 1){
            contextObj.lastCurrentPageRef.current = pages.currentPage;
        };
    }, [pages.currentPage]);

    useEffect(() => {
        clientHeightRef.current = editTextInput.document.body.clientHeight;
    }, []);

    useEffect(() =>{
        if(offsetHeight !== null){
            if(pages.totalPages  && pages.currentPage > pages.totalPages){
                setPages(p =>({...p, totalPages: p.currentPage}));
            };

            if(clientHeightRef.current > offsetHeight){
               setPages(p =>({...p, totalPages: 1}));
            }else{
                const tPages = Math.round(editTextInput.document.body.scrollHeight / editTextInput.document.body.clientHeight);
                setPages(p =>({...p,currentPage: tPages < p.currentPage? tPages : p.currentPage, totalPages: tPages}));
                contextObj.fileToEditRef.current.totalPages = tPages;
            };
        }

    }, [pages.currentPage, offsetHeight]);


    useEffect(() => {
        console.log('here')
        if(contextObj.fileToEditRef.current.hasOwnProperty('editLastCurrentPage') && contextObj.fileToEditRef.current.editLastCurrentPage > 1){
            if(contextObj.fileToEditRef.current.editLastCurrentPage > 2){
                const pageToGoToNumber = clientHeightRef.current * (contextObj.fileToEditRef.current.editLastCurrentPage -1 );
                const iframe = document.getElementById('editTextInput'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                setPages(p => ({...p, currentPage: contextObj.fileToEditRef.current.editLastCurrentPage}));
            }else{
                setPages(p => ({...p, currentPage: 2}));
            };
        }else{
            setPages(p => ({...p, currentPage: 1}))
        };

        contextObj.fileName.from = 'edit' && contextObj.setFileName(f => ({...f, from: ''}));
    }, [contextObj.fileName.fileName, contextObj.fileName.from]);

    useEffect(() =>{
        if(contextObj.createEditContentRef.current.from === 'edit'){
            window.frames['editTextInput'].document.body.innerHTML = contextObj.createEditContentRef.current.content;
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, liColor: contextObj.fileToEditRef.current.liColor}
        };

    }, []);


    useEffect(() =>{
        const checkScroll = () =>{
            return e => {
                if(pages.currentPage >= 4 && pages.totalPages >= 4 && !showMoveUpBtn){
                    setShowMoveUpBtn(true);
                }

                if(scrollTopRef.current === null){
                    scrollTopRef.current = e.target.body.scrollTop;
                }

                if(scrollTopRef.current > e.target.body.scrollTop){
                    if(e.target.body.scrollTop + clientHeightRef.current  > clientHeightRef.current){
                        if(e.target.body.scrollHeight - e.target.body.scrollTop < clientHeightRef.current){
                            setPages(p =>({...p, currentPage: p.totalPages}));
                        }else{
                            const page = Math.round((((e.target.body.scrollTop + clientHeightRef.current) / clientHeightRef.current)));
                            setPages(p =>({...p, currentPage: page}));
                        };
                    }else{
                        setPages(p =>({...p, currentPage: 1}));
                    };

                    scrollTopRef.current = e.target.body.scrollTop;
                }else{
                    if(e.target.body.scrollTop > clientHeightRef.current){
                        if(e.target.body.scrollTop  > clientHeightRef.current){
                            if((e.target.body.scrollHeight - e.target.body.scrollTop) != clientHeightRef.current){
                                const page = Math.round(((e.target.body.scrollTop + clientHeightRef.current) / clientHeightRef.current));
                                setPages(p =>({...p, currentPage: page}));
                            }else{
                                const tPages = Math.round(editTextInput.document.body.scrollHeight / editTextInput.document.body.clientHeight);
                                if(pages.currentPage + 1 != pages.totalPages){
                                    setPages(p =>({...p, totalPages: tPages}));
                                };
                                
                                setPages(p =>({...p, currentPage: tPages}))
                            }
                        }
                    scrollTopRef.current = e.target.body.scrollTop;
                };
            };
        }
        };

        editTextInput.document.addEventListener('scroll', checkScroll());
        return () => {
            window.frames['editTextInput'] && editTextInput.document.removeEventListener('scroll', checkScroll);
        };

    }, []);


    useEffect(() =>{
        const checkKeyPressed = () =>{
            return e =>{

                //madeChangesRef.current = true;

                if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current){
                    const tPages = Math.round(editTextInput.document.body.scrollHeight / editTextInput.document.body.clientHeight);
                    setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                };

                if(e.ctrlKey && e.key.toLowerCase() === 'x'){
                    setOffSetHeight(editTextInput.document.body.offsetHeight);
                }

                if(e.ctrlKey && e.key.toLowerCase() === 'v'){
                    setOffSetHeight(editTextInput.document.body.offsetHeight);
                }
        
                if(e.key === 'Enter'){
                    setOffSetHeight(editTextInput.document.body.offsetHeight);
                    editTextInput.document.execCommand('JustifyLeft', false, null);
                    editTextInput.document.execCommand('FontSize', false, 3);
                };
            };
        };

        window.frames['editTextInput'].document.body.addEventListener('keyup', checkKeyPressed());

        return () =>{
            window.frames['editTextInput'] && window.frames['editTextInput'].document.body.addEventListener('keyup', checkKeyPressed);
        }
    }, []);

    const storeInnerHTML = () =>{
        contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, content: window.frames['editTextInput'].document.body.innerHTML, totalPages: pages.totalPages};
    };

    const discardFileEdit = () =>{
        let editedFile;

        const updatedFileStore = contextObj.filesStoreRef.current.map((file, index) =>{
            if(file.fileName === contextObj.fileToEditRef.current.fileName){
                editedFile = {...file, editLastCurrentPage: contextObj.lastCurrentPageRef.current, totalPages: pages.totalPages};
                return editedFile
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
        contextObj.createEditContentRef.current = {from: '', content: ''}; 
        contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
    };

    const saveEditedFileHandler = () =>{
        setToggleConfirmSaveComp(true);
    };
    
    const goToFirstPageHandler = () =>{
        const iframe = document.getElementById('editTextInput'); // Get the iframe element
        const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
        iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});
        iframeDoc.body.firstElementChild.scrollIntoView({behaviour: 'smooth'});

        if(moveUpIdleTokenRef.current !== null){
            clearTimeout(moveUpIdleTokenRef.current);
            moveUpIdleTokenRef.current = null;
        }
    };

    const goToPageHandler = () => {
        const pageNumber = document.getElementById('page').value;

        if(pageNumber.trim() !== '' && pageNumber <= pages.totalPages){
            if(pageNumber > 1){
                if(pageNumber > 2){
                    const pageToGoToNumber = clientHeightRef.current * (pageNumber -1 );
                    const iframe = document.getElementById('editTextInput'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                }else{
                    setPages(p => ({...p, currentPage: 2}))
                };
            }else{
                if(pages.currentPage != 2){
                    const iframe = document.getElementById('editTextInput'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});
    
                }else{
                    setPages(p => ({...p, currentPage: 1}));
                };
            }
        }
    };

    return(
        <div id='container' className={styles.container}>
            <div className={styles.resizeDiv}>
                <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                    <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle edit input size image" loading='lazy' width={15} height={15}/>
                </button>
            </div>

            <div className={styles.changesDiv}>
                <button onClick={() => saveEditedFileHandler()} className={contextObj.modeState === 'light'? styles.saveChangesLight : styles.saveChangesDark}>
                    <img src={saveChangesImg} alt="save changes made to file image" loading='lazy' width={20} height={20}/>
                </button>
                <button onClick={() => discardFileEdit()} className={contextObj.modeState === 'light'? styles.discardChangesLight :styles.discardChangesDark}>
                    <img src={goBackImg} alt="discard changes made to file image" loading='lazy' width={20} height={20}/>
                </button>
            </div>

            {toggleConFirmSaveComp && <ConfirmSaveEdit pages={pages} setTotalPages={contextObj.setTotalPages} prevLiColor={contextObj.fileToEditRef.current.liColor} fileToEditRef={contextObj.fileToEditRef} readFileRef={contextObj.readFileRef} setToggleConfirmSaveComp={setToggleConfirmSaveComp}/>}

            <iframe onMouseOut={() => storeInnerHTML()} id='editTextInput' name="editTextInput"  className={styles.textInput}>
            </iframe>

            {showMoveUpBtn && 
                <button onClick={() =>goToFirstPageHandler()} className={styles.moveUpBtn}>
                    <img src={moveUpImg} alt="move to first page image" loading='lazy' width={25} height={25}/>
                </button>
            }

            <div id={styles.pagesDiv} className={contextObj.modeState === 'light'? styles.pagesDivLight : styles.pagesDivDark}>
                Page {pages.currentPage} / {pages.totalPages}
            </div>

            <div id={styles.goToPage} className={contextObj.modeState === 'light'? styles.goToPageLight : styles.goToPageDark}>
                <input type="number" id='page' placeholder='1' min='1' />
                <button onClick={() => goToPageHandler()}>go to page</button>
            </div>
        </div>
    );
};