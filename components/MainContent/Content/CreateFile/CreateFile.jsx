import styles from './CreateFile.module.css';
import { useEffect, useState, useRef, useContext, memo } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import CreateNewFileAnim from './CreateNewFileAnim/CreateNewFileAnim';
import ConfirmSaveFileCover from './ConfirmSaveFileCover/ConfirmSaveFileCover';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';

const CreateFile = memo(
    function (props){
        const contextObj = useContext(ContextObj);
        const [pages, setPages] = useState({currentPage: 1, totalPages: 1});
        const [offsetHeight, setOffSetHeight] = useState(null);
        const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
        const moveUpIdleTokenRef = useRef(null);
        const moveUpTimeOutFuncRef = useRef(null);
        const clientHeightRef = useRef(null);
        const scrollTopRef = useRef(null);
        const [triggerRerender, setTriggerRerender] = useState(false);
    

        useEffect(() => {
            if(contextObj.fromRef.current !== ''){
                let updatedFileStore;
                let updatedRecentFiles;
                let editedFile;
    
                if(contextObj.fromRef.current === 'read'){
                    updatedFileStore = contextObj.filesStoreRef.current.map(file =>{
                        if(file.fileName === contextObj.readFileRef.current.fileName){
                            editedFile = {...file, readLastCurrentPage: contextObj.lastCurrentPageRef.current};
                            return editedFile;
                        };
                        
                            return file;
                        });
                        
                    updatedRecentFiles = contextObj.recentFiles.map(file =>{
                        if(file.fileName === contextObj.readFileRef.current.fileName){
                            return editedFile;
                        };
                        
                            return file;
                    });
                };
    
                if(contextObj.fromRef.current === 'edit'){
                    updatedFileStore = contextObj.filesStoreRef.current.map((file, index) =>{
                        if(file.fileName === contextObj.fileToEditRef.current.fileName){
                            editedFile = {...file, editLastCurrentPage: contextObj.lastCurrentPageRef.current, totalPages: pages.totalPages};
                            return editedFile;
                        };
            
                        return file;
                    });
            
                    updatedRecentFiles = contextObj.recentFiles.map((file, index) =>{
                        if(file.fileName === contextObj.fileToEditRef.current.fileName){
                            return editedFile;
                        };
            
                        return file;
                    });
                };
    
    
                contextObj.fromRef.current = '';
                contextObj.lastCurrentPageRef.current = null;
                contextObj.filesStoreRef.current = updatedFileStore;
                contextObj.setRecentFiles(updatedRecentFiles); 
            };
        }, []);
    
        useEffect(() =>{
            contextObj.fileToEditRef.current = {fileName: null};
            contextObj.readFileRef.current = null;
            contextObj.totalPagesRef.current !== null && setPages(p => ({...p, totalPages: contextObj.totalPagesRef.current}));
        }, []);
    
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
        }, [pages.currentPage]);
    
        useEffect(() =>{
            if(offsetHeight !== null){
                if(pages.currentPage > pages.totalPages){
                    setPages(p =>({...p, totalPages: p.currentPage}));
                }
        
                if(clientHeightRef.current > offsetHeight){
                    setPages(p =>({...p, totalPages: 1}));
                }else{
                    const tPages = Math.round(createTextInput.document.body.scrollHeight / createTextInput.document.body.clientHeight);
                    setPages(p =>({...p,currentPage: tPages < p.currentPage? tPages : p.currentPage, totalPages: tPages}));
                    contextObj.totalPagesRef.current = tPages;
                };
            }else{};
        }, [pages.currentPage, offsetHeight]);
    
        useEffect(() => {
            clientHeightRef.current = createTextInput.document.body.clientHeight;
        }, []);
    
        useEffect(() =>{
            createTextInput.document.designMode = 'On';
    
            contextObj.createEditContentRef.current.content.length < 1 && document.getElementById('createTextInput').focus();
            if(contextObj.createEditContentRef.current.content.length > 1){
                document.getElementById('createTextInput').focus();
                //document.getElementById('createTextInput').body.innerHTML.setSelectionRange(contextObj.createEditContentRef.current.content.length, 0);
            };
    
        }, []);
    
        useEffect(() =>{
                const iframe = document.getElementById('createTextInput'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
        
                const style = iframeDoc.createElement('style');
                style.textContent = `
        
                /* WebKit-based browsers (Chrome, Safari) */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                li::marker{
                    color: ${contextObj.lastChosenColorForLIMarker.current === ''? '' : contextObj.lastChosenColorForLIMarker.current};
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

                if(iframeDoc.head.children[0] === undefined){
                    iframeDoc.head.append(style);
                }else{
                    iframeDoc.head.replaceChild(style, iframeDoc.head.children[0]);
                }
                if(contextObj.createEditContentRef.current.from == 'create'){
                    const fromReviewFile =  contextObj.createEditContentRef.current;
                    iframeDoc.body.innerHTML = fromReviewFile.content;
                    //contextObj.createEditContentRef.current = {from: '', content: ''};
                };


            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, Document: window.frames['createTextInput'].document};
        }, [contextObj.modeState, triggerRerender]);

        useEffect(() => {
            setTriggerRerender(t => !t);
        }, [contextObj.modeState])
    
    
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
                                    const tPages = Math.round(createTextInput.document.body.scrollHeight / createTextInput.document.body.clientHeight);
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
    
            createTextInput.document.addEventListener('scroll', checkScroll());
            return () => {
                window.frames['createTextInput'] && createTextInput.document.removeEventListener('scroll', checkScroll);
            };
    
        }, []);
    
    
        useEffect(() =>{
            const checkKeyPressed = () =>{
                return e =>{
                    if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current/*  + 17 */){
                        const tPages = Math.round(createTextInput.document.body.scrollHeight / createTextInput.document.body.clientHeight);
                        setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                    };
    
                    if(e.ctrlKey && e.key.toLowerCase() === 'x'){
                        setOffSetHeight(createTextInput.document.body.offsetHeight);
                    }
    
                    if(e.ctrlKey && e.key.toLowerCase() === 'v'){
                        setOffSetHeight(createTextInput.document.body.offsetHeight);
                        if(createTextInput.document.body.scrollWidth > createTextInput.document.body.clientWidth && !contextObj.toggleContentSize){
                            contextObj.setToggleContentSize(true);
                        };
                    }
            
                    if(e.key === 'Enter'){
                        setOffSetHeight(createTextInput.document.body.offsetHeight);
                        createTextInput.document.execCommand('JustifyLeft', false, null);
                        createTextInput.document.execCommand('FontSize', false, 3);
                    };
                };
            };
    
            window.frames['createTextInput'].document.body.addEventListener('keyup', checkKeyPressed());
    
            return () =>{
                window.frames['createTextInput'] && window.frames['createTextInput'].document.body.addEventListener('keyup', checkKeyPressed);
            }
        }, []);

        const programmicatelyPressEnter = () => {
            //const keyEvent = new KeyboardEvent('keypress', { key: 'Enter' });
            //createTextInput.document.body.dispatchEvent(keyEvent);
            console.log('reached!')
        };


    
        useEffect(() =>{
            const checkKeyPressedToResizeInput = () =>{
                return (e) => {
                    if(createTextInput.document.body.scrollWidth > createTextInput.document.body.clientWidth && !contextObj.toggleContentSize){
                        contextObj.setToggleContentSize(true);
                    };
    
                    if((createTextInput.document.body.scrollWidth + 16) > createTextInput.document.body.clientWidth && contextObj.toggleContentSize){
                        //e.preventDefault();
                        programmicatelyPressEnter();
                    };
                }
            };
    
            window.frames['createTextInput'].document.body.addEventListener('keypress', checkKeyPressedToResizeInput());
    
            return () => {
                window.frames['createTextInput'] && window.frames['createTextInput'].document.body.removeEventListener('keypress', checkKeyPressedToResizeInput);
            };
        }, [contextObj.toggleContentSize]);
    
        const storeInnerHTML = () =>{
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'create', content: window.frames['createTextInput'].document.body.innerHTML, totalPages: pages.totalPages};
        }; 
    
        const goToFirstPageHandler = () =>{
            const iframe = document.getElementById('createTextInput'); // Get the iframe element
            const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
            iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});
    
            if(moveUpIdleTokenRef.current !== null){
                clearTimeout(moveUpIdleTokenRef.current);
                moveUpIdleTokenRef.current = null;
            }
        };
    
        const goToPageHandler = () => {
            const pageNumber = document.getElementById('page').value;
    
            if(pageNumber.trim() !== '' && pageNumber <= pages.totalPages){
                if(pageNumber > 1){
                    const pageToGoToNumber = clientHeightRef.current * (pageNumber -1 );
                    const iframe = document.getElementById('createTextInput'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                    
                    pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
                }else{
                    const iframe = document.getElementById('createTextInput'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});
    
                    pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
                }
            }
        };
    
        return(
            <div id={styles.container} className={styles.container}>
                {contextObj.toggleConfirmSaveFile === 'show' && <ConfirmSaveFileCover setPages={setPages} />}
                <div className={styles.resizeDiv}>
                    <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                    onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                        <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle create input size image" loading='lazy' width={15} height={15}/>
                    </button>
                </div>
                <CreateNewFileAnim />
                <iframe  onMouseOut={() => storeInnerHTML()} id='createTextInput' name="createTextInput"  className={styles.textInput}>
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
    }
);



export default CreateFile;