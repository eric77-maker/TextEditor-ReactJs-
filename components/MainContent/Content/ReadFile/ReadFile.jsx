import styles from './ReadFile.module.css';
import { useState, useEffect, useRef, useContext, memo } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import TextDiv from '../TextDiv/TextDiv';
import editFileImg from '/src/assets/ReadFileImgs/editText2.png';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import readTextImg from '/src/assets/ReadFileImgs/readText5.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';


const ReadFile = memo(
    function(props){
        const contextObj = useContext(ContextObj);
        const textDivIdRef = useRef('readText');
        const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
        const moveUpIdleTokenRef = useRef(null);
        const moveUpTimeOutFuncRef = useRef(null);
        const clientHeightRef = useRef(null);
        const disableResizeBtnRef = useRef(false);
        const scrollTopRef = useRef(null);
        const [showNoChangesMade, setShowNoChangesMade] = useState(false);
        const [pages, setPages] = useState({currentPage: 1, totalPages: contextObj.readFileRef.current.totalPages});
        const storePreviousLastReadPageRef = useRef(null);
    
        useEffect(() => {
            if(contextObj.triedToSaveWithoutChangesOnEditRef.current){
                console.log('no changes made on tried to save after edit')
                contextObj.triedToSaveWithoutChangesOnEditRef.current = false;
            };
        }, []);
    
        useEffect(() => {
            console.log('re-rendered Read...')
            contextObj.fromRef.current === 'edit' && contextObj.setFileName(f => ({...f, from: 'read'}));
            contextObj.fromRef.current = 'read';
        }, []);
    
    
        useEffect(() => {
            clientHeightRef.current = document.getElementById('container').clientHeight * 0.88;
            document.getElementById('readText').classList.add('textDiv');
        }, [contextObj.fileName.fileName]);
    
    
        //updates to the file to read if the fileName of the fileName state changes.
        useEffect(() =>{
            document.getElementById('readText').innerHTML = contextObj.readFileRef.current.content;
            const tPagesOnMount = Math.round(document.getElementById('readText').scrollHeight / document.getElementById('readText').clientHeight);
            if(contextObj.readFileRef.current.triggeredFSWhenCreatingFile){
                const token = setTimeout(() => {
                    disableResizeBtnRef.current = true;
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                }, 1000);
            };
    
     /*        if(!contextObj.toggleContentSize && tPagesOnMount > contextObj.readFileRef.current.totalPages){
                const token = setTimeout(() => {
                    disableResizeBtnRef.current = true;
                    contextObj.setToggleContentSize(true);
                    clearTimeout(token);
                }, 1000);
            } */
        }, [contextObj.fileName.fileName]);
    
        useEffect(() => {
            window.frames['textToPrint'].document.body.innerHTML = contextObj.readFileRef.current.content;
            storePreviousLastReadPageRef.current = contextObj.readFileRef.current.readLastCurrentPage;
        }, [contextObj.fileName.fileName]);
    
        useEffect(() => {
            if(contextObj.toggleContentSize){
                document.getElementById('readText').classList.add('textDivFull');
            };
           }, [contextObj.toggleContentSize]);
    
        useEffect(() => {
    
            //checks to return to the previous page read, if not, returns to the first page.
            if(contextObj.readFileRef.current.readLastCurrentPage !== '' && contextObj.readFileRef.current.readLastCurrentPage > 1){
                if(contextObj.readFileRef.current.readLastCurrentPage > 2){
                    const pageToGoToNumber = clientHeightRef.current * (contextObj.readFileRef.current.readLastCurrentPage -1 );
                    document.getElementById('readText').scrollTo({top: pageToGoToNumber, behavior: 'smooth'});
                    setPages(p => ({...p, currentPage: contextObj.readFileRef.current.readLastCurrentPage}));
                }else{
                    document.getElementById('readText').scrollTo({top: clientHeightRef.current, behavior: 'smooth'});
                    setPages(p => ({...p, currentPage: 2}));
                };
            }else{
                document.getElementById('readText').scrollTo({top: 0, behavior: 'smooth'});
                setPages(p => ({...p, currentPage: 1}));
            };
        }, [contextObj.fileName.fileName]);
    
    
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
    
            if(pages.currentPage > 1 && pages.currentPage != storePreviousLastReadPageRef.current){
                contextObj.lastCurrentPageRef.current = pages.currentPage;
            }else{
                if(storePreviousLastReadPageRef.current !== '' && storePreviousLastReadPageRef.current != pages.currentPage){
                    contextObj.lastCurrentPageRef.current = pages.currentPage;
                }else{
                    contextObj.lastCurrentPageRef.current = null;
                };
            };
    
        }, [pages.currentPage]);
    
        useEffect(() =>{
            const checkScroll = () =>{
                return e => {
                    if(pages.currentPage >= 4 && pages.totalPages >= 4 && !showMoveUpBtn){
                        setShowMoveUpBtn(true);
                    }
    
                    if(scrollTopRef.current === null){
                        scrollTopRef.current = e.target.scrollTop;
                    };
    
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
                                    const tPages = Math.round(document.getElementById('readText').scrollHeight / document.getElementById('readText').clientHeight);
                                    
                                    setPages(p =>({...p, currentPage: tPages}))
                                }
                            }
                        scrollTopRef.current = e.target.scrollTop;
                    };
                };
            }
            };
    
            document.getElementById('readText').addEventListener('scroll', checkScroll());
            return () => {
                document.getElementById('readText') && document.getElementById('readText').removeEventListener('scroll', checkScroll);
            };
    
        }, []);
    
    
    
        const startToEditHandler = () =>{
            contextObj.setComponentMountToggler(c => ({...c, actionContent: 'edit'}));
        };
    
        const goToFirstPageHandler = () =>{
            document.getElementById('readText').scrollTo({top: 0, behavior: 'smooth'});
    
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
                    document.getElementById('readText').scrollTo({top: pageToGoToNumber, behavior: 'smooth'});
                    
                    pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
                }else{
                    document.getElementById('readText').scrollTo({top: 0, behavior: 'smooth'});
    
                    pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
                }
            }
       };
        
        return(
            <div id='container' className={styles.container}>
                <button onClick={() => startToEditHandler()} id={styles.editFileBtn}>
                    <img src={editFileImg} alt="start to edit file image" loading='lazy' width={15} height={15}/>
                </button>
                <div className={styles.resizeDiv}>
                    <button disabled={contextObj.disableResizeBtn || disableResizeBtnRef.current} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                    onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                        <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle read file input size" loading='lazy' width={15} height={15}/>
                    </button>
                </div>
    
                <div id={styles.fileName} className={contextObj.modeState === 'light'? styles.fileNameLight : styles.fileNameDark}>
                    <img src={readTextImg} alt="" width={15} height={15}/>
                    <h3>// {contextObj.readFileRef.current.fileName.length > 44 ? `${contextObj.readFileRef.current.fileName.slice(0, 41)}...` : contextObj.readFileRef.current.fileName} //</h3>
                </div>
    
                <iframe name='textToPrint' id='textToPrint'></iframe>
    
                <TextDiv textDivId={textDivIdRef.current}/>
    
                {showMoveUpBtn && 
                    <button onClick={() => goToFirstPageHandler()} className={styles.moveUpBtn}>
                        <img src={moveUpImg} alt="move to first page image" loading='lazy' width={25} height={25}/>
                    </button>
                }
    
                <div id={styles.pagesDiv} className={contextObj.modeState === 'light'? styles.pagesDivLight : styles.pagesDivDark}>
                    Page {pages.currentPage} / {pages.totalPages}
                </div>
    
                <div id={styles.goToPage} className={contextObj.modeState === 'light'? styles.goToPageLight : styles.goToPageDark}>
                    <input type="number" id='page' placeholder='1' min='1' max={contextObj.readFileRef.current.totalPages}/>
                    <button onClick={() => goToPageHandler()}>go to page</button>
                </div>
            </div>
        );
    }
);

export  default ReadFile; 