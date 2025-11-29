import styles from './CreateFile.module.css';
import { useEffect, useState, useRef, useContext, memo } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import FormatsToolKitOnInput from '../../FormatsToolKitOnInput/FormatsToolKitOnInput';
import TextInput from '../TextInput/TextInput';
import LinkInput from '../LinkInput/LinkInput';
import CreateNewFileAnim from './CreateNewFileAnim/CreateNewFileAnim';
import ConfirmSaveFileCover from './ConfirmSaveFileCover/ConfirmSaveFileCover';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';

const CreateFile = memo(
    function (props){
        const contextObj = useContext(ContextObj);
        const [resizeChecker, setResizeChecker] = useState(true);
        const [pages, setPages] = useState({currentPage: 1, totalPages: 1});
        const textInputRef = useRef(null);
        const fromFullSizeRef = useRef(null);
        const [offsetHeight, setOffSetHeight] = useState(null);
        const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
        const textInputIdRef = useRef('createTextInput');
        const moveUpIdleTokenRef = useRef(null);
        const moveUpTimeOutFuncRef = useRef(null);
        const clientHeightRef = useRef(null);
        const scrollTopRef = useRef(null);
        const triggeredFSWhenCreatingFileRef = useRef(false);
        const [showFormatsOnInput, setShowFormatsOnInput] = useState(false);
        const [formatsOnInputPosition, setFormatsOnInputPosition] = useState({fromWidth: '', fromHeight: '', clientX: '', clientY: ''});
    

 /*        useEffect(() => {//
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
                            editedFile = {...file, editLastCurrentPage: contextObj.lastCurrentPageRef.current};
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

            contextObj.readFileRef.current = null;
            contextObj.fileToEditRef.current = null;
        }, []); */

    
        //resets the fileToEditRef, readFile state to default and resets totalPages of the pages state.
        useEffect(() =>{
            console.log('re-rendered Create...');
            contextObj.fileToEditRef.current = null;
            contextObj.readFileRef.current = null;
            contextObj.setFileName({from: '', fileName: ''});

            contextObj.totalPagesRef.current !== null && setPages(p => ({...p, totalPages: contextObj.totalPagesRef.current}));
        }, []);
    
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
        }, [pages.currentPage]); 
    
    
        //checks to update the totalPages of the pages state anytime the currentPages or offHeight changes.
        useEffect(() =>{
            if(offsetHeight !== null){

                //updates the totalPages of the pages state to currentPage of the pages state if current state of the currentPage is greater than previous state of the totalPages.
                if(pages.currentPage > pages.totalPages){
                    setPages(p =>({...p, totalPages: p.currentPage}));
                }
        
                if(clientHeightRef.current > offsetHeight){
                    setPages(p =>({...p, totalPages: 1}));
                }else{
                    const tPages = Math.round(document.getElementById('createTextInput').scrollHeight / document.getElementById('createTextInput').clientHeight);
                    setPages(p =>({...p,currentPage: tPages < p.currentPage? tPages : p.currentPage, totalPages: tPages}));
                    contextObj.totalPagesRef.current = tPages;
                };
            }else{};
        }, [pages.currentPage, offsetHeight]);
    

        //stores the clientHeight of the div element with id container on mount of the component.
        useEffect(() => {
            clientHeightRef.current = document.getElementById('container').clientHeight * 0.88;
        }, []); 
    
        useEffect(() =>{
            contextObj.createEditContentRef.current.content.length < 1 && document.getElementById('createTextInput').focus();
            if(contextObj.createEditContentRef.current.content.length > 1){
                //document.getElementById('createTextInput').body.innerHTML.setSelectionRange(contextObj.createEditContentRef.current.content.length, 0);
            };
    
        }, []); 
    
        useEffect(() =>{
            setShowFormatsOnInput(false);

            //attaches or replaces a style tag inside the textInput innerHTML if lastChosenColorForMarker changes state and not empty string; 
            if(contextObj.createEditContentRef.current.from === 'create'){
                const fromReviewFile =  contextObj.createEditContentRef.current;

                if(fromReviewFile.content.length > 0){
                    document.getElementById('createTextInput').innerHTML = fromReviewFile.content;
                };

                //removes previous style tag, if the textInput innerHTMl includes one before it attaches new style tag.
                if(props.lastChosenColorForLIMarker !== '' && document.getElementById('createTextInput').innerHTML.includes('</style>')){
                    const removePrevStyle =  document.getElementById('createTextInput').innerHTML.split('</style>')[1];
                    const insertLiColor = `<style>\n\tli::marker{\n\t\tcolor: ${props.lastChosenColorForLIMarker};\n\t}\n</style>`;
                    const newHTML = insertLiColor + '\n' + removePrevStyle;
                    document.getElementById('createTextInput').innerHTML = newHTML;
                };

                //attaches style tag if the textInput innerHTML does not include a style tag.
                if(props.lastChosenColorForLIMarker !== '' && !(document.getElementById('createTextInput').innerHTML.includes('</style>'))){
                    const oldInnerHTML =  document.getElementById('createTextInput').innerHTML;
                    const insertLiColor = `<style>\n\tli::marker{\n\t\tcolor: ${props.lastChosenColorForLIMarker};\n\t}\n</style>`;
                    const newHTML = insertLiColor + '\n' + oldInnerHTML;
                    document.getElementById('createTextInput').innerHTML = newHTML;
                };                

                
                contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'create', content: document.getElementById('createTextInput').innerHTML, totalPages: pages.totalPages};
                props.lastChosenColorForLIMarker !== '' && contextObj.setLastChosenColorForLIMarker('');
            }; 

        }, [contextObj.modeState, props.lastChosenColorForLIMarker]);
    
        useEffect(() =>{
            const checkScroll = () =>{
                return e => {

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
                                    const tPages = Math.round(document.getElementById('createTextInput').scrollHeight / document.getElementById('createTextInput').clientHeight);
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
    
            document.getElementById('createTextInput').addEventListener('scroll', checkScroll());
            return () => {
                document.getElementById('createTextInput') && document.getElementById('createTextInput').removeEventListener('scroll', checkScroll);
            };
    
        }, []);

        useEffect(() => {
            document.getElementById('createTextInput').classList.add('textInput');
           }, []);

        useEffect(() => {
            setShowFormatsOnInput(false);
            if(contextObj.toggleContentSize){
                document.getElementById('createTextInput').classList.remove('textInputDefault');
                document.getElementById('createTextInput').classList.add('textInputFull');
            }else{
                document.getElementById('createTextInput').classList.remove('textInputFull');   
                document.getElementById('createTextInput').classList.add('textInputDefault');
            }
           }, [contextObj.toggleContentSize, resizeChecker]);
    
     
        useEffect(() =>{


            const checkKeyPressed = () =>{
                return e =>{

                    //calculates the total pages based on clientHeight, scrollHeight, and scrollTop  at last page on clicking the arrow down key. 
                    if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current){
                        const tPages = Math.round(document.getElementById('createTextInput').scrollHeight / document.getElementById('container').clientHeight * 0.9);
                        setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                    };
    
                    if(e.ctrlKey && e.key.toLowerCase() === 'x'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
                        document.getElementById('createTextInput').innerHTML.length < 1 && setPages(p => ({...p, currentPage: 1}));
                    }
    
                    if(e.ctrlKey && e.key.toLowerCase() === 'v'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);

                        //triggers the toggleContentSize to true if there is an overflow horizontally when a paste of text event occurs.
                        if(document.getElementById('createTextInput').scrollWidth > document.getElementById('createTextInput').clientWidth && !contextObj.toggleContentSize){
                            contextObj.setToggleContentSize(true);
                        };
                    }
            
                    if(e.key === 'Enter'){
                        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
                        document.execCommand('JustifyLeft', false, null);
                        document.execCommand('FontSize', false, 3);
                    };
                };
            };
    
            document.getElementById('createTextInput').addEventListener('keyup', checkKeyPressed());
    
            return () =>{
                document.getElementById('createTextInput') && document.getElementById('createTextInput').addEventListener('keyup', checkKeyPressed);
            }
        }, []);


        useEffect(() =>{
            const checkKeyPressedToToggleInputResize = () =>{
                return e =>{
                    setResizeChecker(r => !r);
                };
            };
    
            document.getElementById('createTextInput').addEventListener('keypress', checkKeyPressedToToggleInputResize());
    
            return () =>{
                document.getElementById('createTextInput') && document.getElementById('createTextInput').addEventListener('keypress', checkKeyPressedToToggleInputResize);
            }
        }, []);

        useEffect(() => {
            let token = null;

            //triggers the toggleContent state to true when toggleContent state has not being triggerred before on mount of the component after 25ms.
            if(document.getElementById('createTextInput').clientWidth < document.getElementById('createTextInput').scrollWidth && fromFullSizeRef.current === null){
                token = setTimeout(() => {
                    fromFullSizeRef.current = true;
                    triggeredFSWhenCreatingFileRef.current = true;
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                    token = null;
                }, 25);
            };

            //triggers the toggleContent state to true when toggleContent state has being triggerred before on mount of the component after 200ms.
            if(document.getElementById('createTextInput').clientWidth < document.getElementById('createTextInput').scrollWidth && fromFullSizeRef.current){
                token = setTimeout(() => {
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                    token = null;
                }, 200);
            };
        }, [resizeChecker, contextObj.toggleContentSize]);

    
        //stores the innerHTML of the textInput into state and in the innerHTML of the body of the frames to be printed.
        const storeInnerHTML = () =>{
            window.frames['textToPrint'].document.body.innerHTML = document.getElementById('createTextInput').innerHTML;
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, from: 'create', content: document.getElementById('createTextInput').innerHTML, totalPages: pages.totalPages};
        };  
    
        const goToFirstPageHandler = () =>{
            document.getElementById('createTextInput').scrollTo({top: 0, behavior: 'smooth'});
    
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
                    document.getElementById('createTextInput').scrollTo({top: pageToGoToNumber, behavior: 'smooth'});
                    
                    pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
                }else{
                    document.getElementById('createTextInput').scrollTo({top: 0, behavior: 'smooth'});
    
                    pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
                }
            }
       };
    
       //shows the formatsOnInput toolkit positioned based on clientX and ClientY of the onDoubleClick event that occured.
       const handleShowFormatsToolkit = e => {
        let fromWidth;
        let fromHeight;
        let positionX;
        let positionY;

        if(e.clientY > document.getElementById('createTextInput').clientHeight){
            fromHeight = 'bottom';
            positionY = e.clientY - (document.getElementById('createTextInput').clientHeight * 0.95);
        }else{
            fromHeight = 'top';
            positionY = e.clientY - (document.getElementById('createTextInput').clientHeight * 0.3)
        };

        if(contextObj.toggleContentSize && (e.clientX > document.getElementById('createTextInput').clientWidth * 0.99)){
            fromWidth = 'right';
            positionX = e.clientX * 0.8;
        }else{
            fromWidth = 'left';
            positionX = e.clientX * 0.5
        };

        if(!contextObj.toggleContentSize && e.clientX   > document.getElementById('createTextInput').clientWidth * 0.99){
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
                {contextObj.toggleConfirmSaveFile === 'show' && <ConfirmSaveFileCover triggeredFSWhenCreatingFileRef={triggeredFSWhenCreatingFileRef} setPages={setPages} />}
                <div className={styles.resizeDiv}>
                    <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                    onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                        <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle create input size image" loading='lazy' width={15} height={15}/>
                    </button>
                </div>
                <CreateNewFileAnim />


                <iframe id='textToPrint' name='textToPrint'></iframe>
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



export default CreateFile;