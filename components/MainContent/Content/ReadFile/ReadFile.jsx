import styles from './ReadFile.module.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import editFileImg from '/src/assets/ReadFileImgs/editText2.png';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';


export  default function ReadFile(){
    const contextObj = useContext(ContextObj);
    const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
    const moveUpIdleTokenRef = useRef(null);
    const moveUpTimeOutFuncRef = useRef(null);
    const clientHeightRef = useRef(null);
    const scrollTopRef = useRef(null);
    const [pages, setPages] = useState({currentPage: 1, totalPages: contextObj.readFileRef.current.totalPages});

    useEffect(() => {
        contextObj.fromRef.current = 'read';
        contextObj.setFileName(f => ({...f, from: 'read'}));
    }, []);

    useEffect(() =>{
        const iframe = document.getElementById('readText'); // Get the iframe element
        const iframeDoc = iframe.contentWindow.document; // Access the iframe's document
        const defaultLiMarkerColor = contextObj.modeState === 'light' ? '#333' : '#fff';

        const style = iframeDoc.createElement('style');
        style.textContent = `
            li::marker {
                color: ${contextObj.readFileRef.current.liColor !== '' ? contextObj.readFileRef.current.liColor : defaultLiMarkerColor };
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
        iframeDoc.head.appendChild(style); 
    }, [contextObj.modeState, contextObj.fileName.fileName]); 



    useEffect(() => {
        clientHeightRef.current = readText.document.body.clientHeight;
    }, []);


    useEffect(() =>{
        window.frames['readText'].document.body.innerHTML = contextObj.readFileRef.current.content;


        if(readText.document.body.scrollWidth > readText.document.body.clientWidth && !contextObj.toggleContentSize){
            contextObj.setToggleContentSize(true);
        };
    }, [contextObj.fileName.fileName]);

    useEffect(() => {
        if(contextObj.readFileRef.current.hasOwnProperty('readLastCurrentPage') && contextObj.readFileRef.current.readLastCurrentPage > 1){
            if(contextObj.readFileRef.current.readLastCurrentPage > 2){
                const pageToGoToNumber = clientHeightRef.current * (contextObj.readFileRef.current.readLastCurrentPage -1 );
                const iframe = document.getElementById('readText'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                setPages(p => ({...p, currentPage: contextObj.readFileRef.current.readLastCurrentPage}));
            }else{
                setPages(p => ({...p, currentPage: 2}));
            };
        }else{
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
                                const tPages = Math.round(readText.document.body.scrollHeight / readText.document.body.clientHeight);
                                
                                setPages(p =>({...p, currentPage: tPages}))
                            }
                        }
                    scrollTopRef.current = e.target.body.scrollTop;
                };
            };
        }
        };

        readText.document.addEventListener('scroll', checkScroll());
        return () => {
            window.frames['readText'] && readText.document.removeEventListener('scroll', checkScroll);
        };

    }, []);



    const startToEditHandler = () =>{
        contextObj.setComponentMountToggler(c => ({...c, actionContent: 'edit'}));
    };

    const goToFirstPageHandler = () =>{
        const iframe = document.getElementById('readText'); // Get the iframe element
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
                    const iframe = document.getElementById('readText'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});
                }else{
                    setPages(p => ({...p, currentPage: 2}));
                };
            }else{
                if(pages.currentPage != 2){
                    const iframe = document.getElementById('readText'); // Get the iframe element
                    const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                    iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});
                }else{
                    setPages(p => ({...p, currentPage: 1}));
                };
            }
        }
    };
    
    return(
        <div className={styles.container}>
            <button onClick={() => startToEditHandler()} id={styles.editFileBtn} className={contextObj.modeState == 'light'? styles.editFileBtnLight : styles.editFileBtnDark}>
                <img src={editFileImg} alt="start to edit file image" loading='lazy' width={20} height={20}/>
            </button>
            <div className={styles.resizeDiv}>
                <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                    <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle read file input size" loading='lazy' width={15} height={15}/>
                </button>
            </div>

            <div id={styles.fileName} className={contextObj.modeState === 'light'? styles.fileNameLight : styles.fileNameDark}>
                <h3>// {contextObj.readFileRef.current.fileName.length > 44 ? `${contextObj.readFileRef.current.fileName.slice(0, 41)}...` : contextObj.readFileRef.current.fileName} //</h3>
            </div>
            <iframe id='readText' name="readText"  className={styles.textDiv}>
            </iframe>

            {showMoveUpBtn && 
                <button onClick={() => goToFirstPageHandler()} className={styles.moveUpBtn}>
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