import styles from './EditFile.module.css';
import { useState, useRef, useEffect, useContext, memo } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import ConfirmSaveEdit from './ConfirmSaveEdit/ConfirmSaveEdit';
import TextInput from '../TextInput/TextInput';
import LinkInput from '../LinkInput/LinkInput';
import FormatsToolKitOnInput from '../../FormatsToolKitOnInput/FormatsToolKitOnInput';
import MadeChanges from './MadeChanges/MadeChanges';
import saveChangesImg from '/src/assets/EditFileImgs/saveChanges.png';
import goBackImg from '/src/assets/EditFileImgs/goBack.png';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';
import loadingFileAndTools from '/src/assets/EditFileImgs/loadingFileAndTools1.webp';

const EditFile = memo(
    function (props){
        const contextObj = useContext(ContextObj);
        const clientHeightRef = useRef(null);
        const scrollTopRef = useRef(null);
        const textInputRef = useRef(null);
        const textInputIdRef = useRef('editTextInput');
        const [resizeChecker, setResizeChecker] = useState(true);
        const fromFullSizeRef = useRef(null);
        const [toggleConFirmSaveComp, setToggleConfirmSaveComp] = useState(false);
        const [pages, setPages] = useState({currentPage: 1, totalPages: null});
        const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
        const moveUpIdleTokenRef = useRef(null);
        const moveUpTimeOutFuncRef = useRef(null);
        const [offsetHeight, setOffSetHeight] = useState(null);
        const [showFormatsOnInput, setShowFormatsOnInput] = useState(false);
        const [formatsOnInputPosition, setFormatsOnInputPosition] = useState({clientX: '', clientY: ''});
        const [showPromptToSaveChanges, setShowPromptToSaveChanges] = useState(false);
        const totalContentLoadedRef = useRef(null);
        const percentageOfContentLoadedRef = useRef(0);
        const contentLoaderIntervalTimerRef = useRef(null);
        const [returnToLastEditedCurrentPage, setReturnToLastEditedCurrentPage] = useState(false);
        const [showLoadingFilePrompt, setShowLoadingFilePrompt] = useState(false);
        const storePreviousLastEditPageRef = useRef(null);
        const checkScrollToSetLastEditedPageRef = useRef(false);
        const storeFileTokenRef = useRef(null);
        
    
        useEffect(() => {
            if(contextObj.promptWithoutSavingChangesOnEdit){
                !showPromptToSaveChanges && setShowPromptToSaveChanges(true);
            }else{
                showPromptToSaveChanges && setShowPromptToSaveChanges(false);
            };
        }, [contextObj.promptWithoutSavingChangesOnEdit]);

        useEffect(() => {
            if(returnToLastEditedCurrentPage){
                if(contextObj.fileToEditRef.current.editLastCurrentPage !== ""  && contextObj.fileToEditRef.current.editLastCurrentPage > 1){
                    if(contextObj.fileToEditRef.current.editLastCurrentPage == 2){
                        document.getElementById('editTextInput').scrollTo({top: clientHeightRef.current, behavior: 'smooth'});
                    }else{
                        const lastEditedPage = document.getElementById('container').clientHeight * (contextObj.fileToEditRef.current.editLastCurrentPage - 1);
                        document.getElementById('editTextInput').scrollTo({top: lastEditedPage, behavior: 'smooth'});
                    };
                }else{
                    document.getElementById('editTextInput').scrollTo({top: 0, behavior: 'smooth'});
                };

                setReturnToLastEditedCurrentPage(false);
                checkScrollToSetLastEditedPageRef.current = true;
            };
        }, [returnToLastEditedCurrentPage])
        
        useEffect(() => {
            if(contextObj.fromRef.current === 'read' && contextObj.lastCurrentPageRef.current !== null){
                console.log('here first');
                let readFile;
                setShowLoadingFilePrompt(true);
                const updatedFileStore = contextObj.filesStoreRef.current.map(file => {
                    if(file.fileName === contextObj.readFileRef.current.fileName){
                        readFile = {...file, readLastCurrentPage: contextObj.lastCurrentPageRef.current};
                        return readFile;
                    };
                    
                        return file;
                    });
                    
                const updatedRecentFiles = contextObj.recentFiles.map(file =>{
                    if(file.fileName === contextObj.readFileRef.current.fileName){
                        return readFile;
                    };
                    
                        return file;
                });
    
                
                contextObj.readFileRef.current = readFile;
                contextObj.createEditContentRef.current = {from: '', content: ''};
                contextObj.lastCurrentPageRef.current = 1;
                contextObj.filesStoreRef.current = updatedFileStore;
                contextObj.setRecentFiles(updatedRecentFiles);
            };

            contextObj.fromRef.current = 'edit';
        }, []);
    
        useEffect(() =>{
            console.log('re-rendered Edit...')
            if(!showLoadingFilePrompt){
                document.getElementById('editTextInput').focus(); 
                    /* Firefox */
                   /*  body {
                        scrollbar-width: thin;
                        scrollbar-color: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%)) transparent;
                    } */
    
    
                //sets the innerHTML of the textInput to the actual stored content on initial mount of the component except from review.
                if(contextObj.createEditContentRef.current.from === '' && !showPromptToSaveChanges){
                    contextObj.lastCurrentPageRef.current == null && setShowLoadingFilePrompt(true);

                    if(contextObj.lastCurrentPageRef.current === null){
                        console.log('here second');
                    }

                    contentLoaderIntervalTimerRef.current = setInterval(() => { 
                        percentageOfContentLoadedRef.current = percentageOfContentLoadedRef.current + 4;
                        totalContentLoadedRef.current = contextObj.fileToEditRef.current.content.slice(0, (percentageOfContentLoadedRef.current / 100) * contextObj.fileToEditRef.current.content.length);
                        document.getElementById('editTextInput').innerHTML = totalContentLoadedRef.current;
                        const totalPages = Math.ceil(document.getElementById('editTextInput').scrollHeight / document.getElementById('container').clientHeight);
                        const lastPageToScrollTo = document.getElementById('container').clientHeight * (totalPages - 1);
                        document.getElementById('editTextInput').scrollTo({top: lastPageToScrollTo, behaviour: 'smooth'});
                        setPages(p => ({...p, currentPage: totalPages, totalPages: totalPages}));

                        if(percentageOfContentLoadedRef.current == 100){
                            percentageOfContentLoadedRef.current  = 0;
                            totalContentLoadedRef.current = null;
                            clearInterval(contentLoaderIntervalTimerRef.current);
                            contentLoaderIntervalTimerRef.current = null;
                            setShowLoadingFilePrompt(false);
                            setReturnToLastEditedCurrentPage(true);
                        };
                    }, 500);  
                };
    
                //attaches or replaces a style tag inside the textInput innerHTML if lastChosenColorForMarker changes state and not empty string; 
                if(contextObj.createEditContentRef.current.from == 'edit'){
                    const fromReviewFile =  contextObj.createEditContentRef.current;
                    document.getElementById('editTextInput').innerHTML = fromReviewFile.content;
                    
                }; 
    
                //removes previous style tag, if the textInput innerHTMl includes one before it attaches new style tag.
                if(document.getElementById('editTextInput').innerHTML.includes('</style>')){
                    if(props.lastChosenColorForLIMarker !== ''){
                        const removePrevStyle =  document.getElementById('editTextInput').innerHTML.split('</style>')[1];
                        const insertLiColor = `<style>\n\tli::marker{\n\t\tcolor: ${props.lastChosenColorForLIMarker};\n\t}\n</style>`;
                        const newHTML = insertLiColor + '\n' + removePrevStyle;
                        document.getElementById('editTextInput').innerHTML = newHTML;

                        if(storeFileTokenRef.current !== null){
                            clearTimeout(storeFileTokenRef.current);
                            storeFileTokenRef.current = null;
                        }
    
                        storeFileTokenRef.current = setTimeout(() => {
                            contextObj.storeFileTempRef.current = {editedFile: {editedContent: document.getElementById('editTextInput').innerHTML}};
                            clearTimeout(storeFileTokenRef.current);
                            storeFileTokenRef.current = null;
                        }, 1000);

                        contextObj.totalPagesRef.current = pages.totalPages;
    
                        if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                            contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current = true;
                        };

                        if(!contextObj.madeChangesRef.current){
                            contextObj.madeChangesRef.current = true;
                        };
                    };
                }else{
                    //attaches style tag if the textInput innerHTML does not include a style tag.
                    if(props.lastChosenColorForLIMarker !== ''){
                        const insertLiColor = `<style>\n\tli::marker{\n\t\tcolor: ${props.lastChosenColorForLIMarker};\n\t}\n</style>\n`;
                        const newHTML = insertLiColor + '\n' + document.getElementById('editTextInput').innerHTML;
                        document.getElementById('editTextInput').innerHTML = newHTML;

                        if(storeFileTokenRef.current !== null){
                            clearTimeout(storeFileTokenRef.current);
                            storeFileTokenRef.current = null;
                        };

                        storeFileTokenRef.current = setTimeout(() => {
                            contextObj.storeFileTempRef.current = {editedFile: {editedContent: document.getElementById('editTextInput').innerHTML}};
                            clearTimeout(storeFileTokenRef.current);
                            storeFileTokenRef.current = null;
                        }, 1000);

                        contextObj.totalPagesRef.current = pages.totalPages;
                        
                        if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                            contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current = true;
                        };

                        if(!contextObj.madeChangesRef.current){
                            contextObj.madeChangesRef.current = true;
                        };
                    };
                };
                
                if(!showPromptToSaveChanges){
                    contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'edit', content: document.getElementById('editTextInput').innerHTML, totalPages: pages.totalPages};
                };
                
                props.lastChosenColorForLIMarker !== '' && contextObj.setLastChosenColorForLIMarker('');
        
            }  
        }, [showPromptToSaveChanges, contextObj.fileName.fileName, props.lastChosenColorForLIMarker]);
    
        useEffect(() => {
            if(contextObj.createEditContentRef.current.from === ''){
                window.frames['textToPrint'].document.body.innerHTML = contextObj.fileToEditRef.current.content;
            }else{
                window.frames['textToPrint'].document.body.innerHTML = contextObj.createEditContentRef.current.content;
            };
        }, [contextObj.fileName.fileName]);
    
    
        useEffect(() =>{
            storePreviousLastEditPageRef.current = contextObj.fileToEditRef.current.editLastCurrentPage;
            setPages(p =>({...p, totalPages: contextObj.fileToEditRef.current.totalPages}));
        }, [contextObj.fileName.fileName])
     
    
        useEffect(() =>{
            moveUpTimeOutFuncRef.current = () =>{
                setShowMoveUpBtn(false);
                clearTimeout(moveUpIdleTokenRef.current);
                moveUpIdleTokenRef.current = null;
            };
        }, []);
    
        //checks  if total pages >= 5 and current page >= 4 anytime current page changes to show the move up button. 
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


            if(pages.currentPage > 1 && pages.currentPage != storePreviousLastEditPageRef.current){
                if(checkScrollToSetLastEditedPageRef.current){
                    contextObj.lastCurrentPageRef.current = pages.currentPage;

                    if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                        contextObj.madeChangesRef.current = true;
                    };
                };
            }else{
                if(checkScrollToSetLastEditedPageRef.current && !showPromptToSaveChanges){
                    if(storePreviousLastEditPageRef.current !== '' && storePreviousLastEditPageRef.current != pages.currentPage){
                        contextObj.lastCurrentPageRef.current = pages.currentPage;

                        if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                            contextObj.madeChangesRef.current = true;
                        };
                    }else{
                        contextObj.lastCurrentPageRef.current = null;

                        if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                            contextObj.madeChangesRef.current = false;
                        };
                    };
                };
            }; 
        }, [pages.currentPage]);
    
        //stores the clientHeight and offsetHeight of the div element with id container on mount of the component.
        useEffect(() => {
            clientHeightRef.current = document.getElementById('container').clientHeight * 0.88;
            setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
        }, []);
    
        //checks to update the totalPages of the pages state anytime the currentPages or offHeight changes.
        useEffect(() =>{
            if(offsetHeight !== null){
                //updates the totalPages of the pages state to currentPage of the pages state if current state of the currentPage is greater than previous state of the totalPages.
                if(pages.totalPages  && pages.currentPage > pages.totalPages){ 
                    setPages(p =>({...p, totalPages: p.currentPage})); 
                };
    
                if(clientHeightRef.current > offsetHeight){
                   setPages(p =>({...p, totalPages: 1}));
                }else{
                    const tPages = Math.round(document.getElementById('editTextInput').scrollHeight / document.getElementById('editTextInput').clientHeight);
                    setPages(p =>({...p,currentPage: tPages < p.currentPage? tPages : p.currentPage, totalPages: tPages}));
                    contextObj.fileToEditRef.current.totalPages = tPages;
                };
            }
    
        }, [pages.currentPage, offsetHeight]);
    
    
/*         useEffect(() => {
    
            //checks to return to the previous page edited, if not, returns to the first page.
            if(contextObj.fileToEditRef.current.editLastCurrentPage !== '' && contextObj.fileToEditRef.current.editLastCurrentPage > 1){
                if(contextObj.fileToEditRef.current.editLastCurrentPage > 2){
                    const pageToGoToNumber = clientHeightRef.current * (contextObj.fileToEditRef.current.editLastCurrentPage -1 );
                    document.getElementById('editTextInput').scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                    setPages(p => ({...p, currentPage: contextObj.fileToEditRef.current.editLastCurrentPage}));
                }else{
                    setPages(p => ({...p, currentPage: 2}));
                };
            }else{
                setPages(p => ({...p, currentPage: 1}))
            };
        }, [contextObj.fileName.fileName, contextObj.fileName.from]); */
    
        useEffect(() =>{
            if(contextObj.createEditContentRef.current.from === 'edit'){
                document.getElementById('editTextInput').innerHTML = contextObj.createEditContentRef.current.content;
                contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current }
            };
    
        }, []);
    
    
        useEffect(() =>{
            const checkScroll = () =>{
                return e => {
                    showFormatsOnInput && setFormatsOnInputPosition(false);
    
                    if(pages.currentPage >= 4 && pages.totalPages >= 4 && !showMoveUpBtn){
                        setShowMoveUpBtn(true);
                    }
    
                    if(scrollTopRef.current === null){
                        scrollTopRef.current = e.target.scrollTop;
                    }
    
                    if(scrollTopRef.current > e.target.scrollTop){ //scrolling top
                        if(e.target.scrollTop + clientHeightRef.current  > clientHeightRef.current){
                            if(e.target.scrollHeight - e.target.scrollTop < clientHeightRef.current){
                                setPages(p =>({...p, currentPage: p.totalPages}));
                            }else{
                                const page = Math.round((((e.target.scrollTop + clientHeightRef.current) / clientHeightRef.current)));
                                setPages(p =>({...p, currentPage: page}));
                            };
                        }else{
                            setPages(p =>({...p, currentPage: 1}));
                        };
    
                        scrollTopRef.current = e.target.scrollTop;
                    }else{ //scrolling down
                        if(e.target.scrollTop > clientHeightRef.current){
                            if(e.target.scrollTop  > clientHeightRef.current){
                                if((e.target.scrollHeight - e.target.scrollTop) != clientHeightRef.current){
                                    const page = Math.round(((e.target.scrollTop + clientHeightRef.current) / clientHeightRef.current));
                                    setPages(p =>({...p, currentPage: page}));
                                }else{
                                    const tPages = Math.round(document.getElementById('editTextInput').scrollHeight / document.getElementById('editTextInput').clientHeight);
                                    if(pages.currentPage + 1 != pages.totalPages){
                                        setPages(p =>({...p, totalPages: tPages}));
                                    };
                                    
                                    setPages(p =>({...p, currentPage: tPages}))
                                }
                            }
                        scrollTopRef.current = e.target.scrollTop;
                    };
                };
            }
            };
    
            document.getElementById('editTextInput').addEventListener('scroll', checkScroll());
            return () => {
                document.getElementById('editTextInput') && document.getElementById('editTextInput').removeEventListener('scroll', checkScroll);
            };
    
        }, []);
    
        useEffect(() => {
            document.getElementById('editTextInput').classList.add('textInput');
           }, []);
    
        useEffect(() => {
            showFormatsOnInput && setShowFormatsOnInput(false);
    
            if(contextObj.toggleContentSize){
                document.getElementById('editTextInput').classList.remove('textInputDefault');
                document.getElementById('editTextInput').classList.add('textInputFull');
            }else{
                document.getElementById('editTextInput').classList.remove('textInputFull');   
                document.getElementById('editTextInput').classList.add('textInputDefault');
            }
           }, [contextObj.toggleContentSize, resizeChecker]);
    
    
        useEffect(() =>{
            const checkKeyPressed = () =>{
                return e =>{
                    setResizeChecker(r => !r);
                    if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight'){
                        if(!contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current){
                            contextObj.typedOrChangedliColorToMakeChangesOnEditRef.current = true;
                        };

                        if(!contextObj.madeChangesRef.current){
                            contextObj.madeChangesRef.current = true;
                        };
                    };

    
                    //calculates the total pages based on clientHeight, scrollHeight, and scrollTop  at last page on clicking the arrow down key. 
                    if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current){
                        const tPages = Math.round(document.getElementById('editTextInput').scrollHeight / document.getElementById('container').clientHeight * 0.9);
                        setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                    };
    
                    //re-calculates the current page when one cuts a text from a page.
                    if(e.ctrlKey && e.key.toLowerCase() === 'x'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
                        document.getElementById('editTextInput').innerHTML.length < 1 && setPages(p => ({...p, currentPage: 1}));
                    }
    
                    //updates the offsetHeight and triggers toggleContentSize to true if there is any overflow horizontally if a paste of text event occurs;
                    if(e.ctrlKey && e.key.toLowerCase() === 'v'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
    
                        //triggers the toggleContentSize to true if there is an overflow horizontally when a paste of text event occurs.
                        if(document.getElementById('editTextInput').scrollWidth > document.getElementById('editTextInput').clientWidth && !contextObj.toggleContentSize){
                            contextObj.setToggleContentSize(true);
                        };
                    }
                    
                    //resets align text and font size to default and updates the offsetHeight when the Enter key is pressed;
                    if(e.key === 'Enter'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
                        document.execCommand('JustifyLeft', false, null);
                        document.execCommand('FontSize', false, 3);
                    };

                    if(storeFileTokenRef.current !== null){
                        clearTimeout(storeFileTokenRef.current);
                        storeFileTokenRef.current = null;
                    }

                    storeFileTokenRef.current = setTimeout(() => {
                        contextObj.storeFileTempRef.current = {editedFile: {editedContent: document.getElementById('editTextInput').innerHTML}};
                        clearTimeout(storeFileTokenRef.current);
                        storeFileTokenRef.current = null;
                    }, 1000);
                };
            };
    
            document.getElementById('editTextInput').addEventListener('keyup', checkKeyPressed());
    
            return () =>{
                document.getElementById('editTextInput') && document.getElementById('editTextInput').addEventListener('keyup', checkKeyPressed);
            }
        }, []);
    
        useEffect(() => {
            let token = null;
            //triggers the toggleContent state to true when toggleContent state has not being triggerred before on mount of the component after 25ms.
            if(document.getElementById('editTextInput').clientWidth < document.getElementById('editTextInput').scrollWidth && fromFullSizeRef.current === null){
                token = setTimeout(() => {
                    fromFullSizeRef.current = true;
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                    token = null;
                }, 25);
            };
    
            //triggers the toggleContent state to true when toggleContent state has being triggerred before on mount of the component after 200ms.
            if(document.getElementById('editTextInput').clientWidth < document.getElementById('editTextInput').scrollWidth && fromFullSizeRef.current){
                token = setTimeout(() => {
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                    token = null;
                }, 200);
            };
        }, [resizeChecker, contextObj.toggleContentSize]);
    
    
        //stores the innerHTML of the textInput into state and in the innerHTML of the body of the frames to be printed.
        const storeInnerHTML = () =>{
            if(storeFileTokenRef.current !== null){
                clearTimeout(storeFileTokenRef.current);
                storeFileTokenRef.current = null;
            }

            storeFileTokenRef.current = setTimeout(() => {
                if(document.getElementById('editTextInput')){
                    contextObj.storeFileTempRef.current = {editedFile: {editedContent: document.getElementById('editTextInput').innerHTML}};
                };
                clearTimeout(storeFileTokenRef.current);
                storeFileTokenRef.current = null;
            }, 1000);

            contextObj.totalPagesRef.current = pages.totalPages;
            window.frames['textToPrint'].document.body.innerHTML = document.getElementById('editTextInput').innerHTML;
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, content: document.getElementById('editTextInput').innerHTML, totalPages: pages.totalPages};
        };
    
        const discardFileEdit = () =>{
            if(!contextObj.madeChangesRef.current){
                contextObj.createEditContentRef.current = {from: '', content: ''}; 
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
            }else{
                //contextObj.storeFileTempRef.current = {file: {fileName: contextObj.fileToEditRef.current.fileName}, editedContent: document.getElementById('editTextInput').innerHTML};
                contextObj.totalPagesRef.current = pages.totalPages;
                contextObj.wasGoingToAfterEditRef.current = 'read';
                setShowPromptToSaveChanges(true);
            };
        };
    
        const saveEditedFileHandler = () =>{
            if(contextObj.madeChangesRef.current){
                setToggleConfirmSaveComp(true);
            }else{
                contextObj.triedToSaveWithoutChangesOnEditRef.current = true;
                contextObj.createEditContentRef.current = {from: '', content: ''}; 
                contextObj.setComponentMountToggler(c => ({...c, actionContent: 'read'}));
            }
        };
        
        //programmatically scrolls to the first page.
        const goToFirstPageHandler = () =>{
            document.getElementById('editTextInput').scrollTo({top: 0, behavior: 'smooth'});
    
            if(moveUpIdleTokenRef.current !== null){
                clearTimeout(moveUpIdleTokenRef.current);
                moveUpIdleTokenRef.current = null;
            }
        };
    
        //
        const goToPageHandler = () => {
            const pageNumber = document.getElementById('page').value;
    
            if(pageNumber.trim() !== '' && pageNumber <= pages.totalPages){
                if(pageNumber > 1){
                    const pageToGoToNumber = clientHeightRef.current * (pageNumber -1 );
                    document.getElementById('editTextInput').scrollTo({top: pageToGoToNumber, behavior: 'smooth'});
                    
                    pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
                }else{
                    document.getElementById('editTextInput').scrollTo({top: 0, behavior: 'smooth'});
    
                    pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
                }
            }
       }
    
       //shows the formatsOnInput toolkit positioned based on clientX and ClientY of the onDoubleClick event that occured.
        const handleShowFormatsToolkit = e => {
            let fromWidth;
            let fromHeight;
            let positionX;
            let positionY;
    
            if(e.clientY > document.getElementById('editTextInput').clientHeight){
                fromHeight = 'bottom';
                positionY = e.clientY - (document.getElementById('editTextInput').clientHeight * 0.95);
            }else{
                fromHeight = 'top';
                positionY = e.clientY - (document.getElementById('editTextInput').clientHeight * 0.3)
            };
    
            if(contextObj.toggleContentSize && (e.clientX > document.getElementById('editTextInput').clientWidth * 0.99)){
                fromWidth = 'right';
                positionX = e.clientX * 0.8;
            }else{
                fromWidth = 'left';
                positionX = e.clientX * 0.5
            };
    
            if(!contextObj.toggleContentSize && e.clientX   > document.getElementById('editTextInput').clientWidth * 0.99){
                fromWidth = 'right';
                positionX =  e.clientX * 0.15;
            }else{
                fromWidth = 'left';
                positionX = e.clientX * 0.45;
            };
    
            setShowFormatsOnInput(true);
            setFormatsOnInputPosition(f => ({...f, clientX: positionX, clientY: positionY, fromWidth, fromHeight }));
        };
    
        return(
            <div id='container' className={styles.container}>
                <div className={styles.resizeDiv}>
                    <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                    onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                        <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle edit input size image" loading='lazy' width={15} height={15}/>
                    </button>
                </div>

                {showLoadingFilePrompt && 
                                    <div className={styles.loadingFileAndTools}>
                                    <img src={loadingFileAndTools} alt="" width={40} height={40}/>
                                    <div>
                                        <span>L</span>
                                        <span>o</span>
                                        <span>a</span>
                                        <span>d</span>
                                        <span>i</span>
                                        <span>n</span>
                                        <span>g</span>
                                        &nbsp;
                                        <span>F</span>
                                        <span>i</span>
                                        <span>l</span>
                                        <span>e</span>
                                        &nbsp;
                                        <span>A</span>
                                        <span>n</span>
                                        <span>d</span>
                                        &nbsp;
                                        <span>T</span>
                                        <span>o</span>
                                        <span>o</span>
                                        <span>l</span>
                                        <span>s</span>
                                        &nbsp;
                                        <span>W</span>
                                        <span>a</span>
                                        <span>i</span>
                                        <span>t</span>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                    </div>
                                </div>
                }
                
                <div className={styles.changesDiv}>
                    <button onClick={() => saveEditedFileHandler()}>
                        <img src={saveChangesImg} alt="save changes made to file image" loading='lazy' width={15} height={15}/>
                    </button>
                    <button onClick={() => discardFileEdit()}>
                        <img src={goBackImg} alt="discard changes made to file image" loading='lazy' width={15} height={15}/>
                    </button>
                </div>
                {showPromptToSaveChanges && <MadeChanges />}
                {toggleConFirmSaveComp && <ConfirmSaveEdit pages={pages} setTotalPages={contextObj.setTotalPages} prevLiColor={contextObj.fileToEditRef.current.liColor} fileToEditRef={contextObj.fileToEditRef} readFileRef={contextObj.readFileRef} setToggleConfirmSaveComp={setToggleConfirmSaveComp}/>}
    
                <div id={styles.fileName} className={contextObj.modeState === 'light'? styles.fileNameLight : styles.fileNameDark}>
                    <h3>// {contextObj.fileToEditRef.current.fileName.length > 44 ? `${contextObj.fileToEditRef.current.fileName.slice(0, 41)}...` : contextObj.fileToEditRef.current.fileName} //</h3>
                </div>
    
                <iframe name='textToPrint' id='textToPrint'></iframe>
                {showFormatsOnInput && <FormatsToolKitOnInput setShowFormatsOnInput={setShowFormatsOnInput} fromWidth = {formatsOnInputPosition.fromWidth} fromHeight={formatsOnInputPosition.fromHeight} clientX={formatsOnInputPosition.clientX} clientY={formatsOnInputPosition.clientY}/>}
    
                <TextInput textInputRef={textInputRef} textInputId={textInputIdRef.current} storeInnerHTML={storeInnerHTML} handleShowFormatsToolkit={handleShowFormatsToolkit}/>
    
                {props.showLinkInput && <LinkInput />}
    
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






export default  EditFile;