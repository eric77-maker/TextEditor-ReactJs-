import styles from './ReviewFile.module.css';
import { useState, useRef, useEffect, useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import goBackImg from '/src/assets/ReviewFileImgs/goBack.png';
import fullScreenImg from '/src/assets/MainComponentImgs/fullScreen1.png';
import defaultScreenImg from '/src/assets/MainComponentImgs/defaultScreen1.png';
import moveUpImg from '/src/assets/MainComponentImgs/moveUp.jpg';




export default function ReviewFile(props){
    const contextObj = useContext(ContextObj);
    const clientHeightRef = useRef(null);
    const scrollTopRef = useRef(null);
    const [pages, setPages] = useState({currentPage: 1, totalPages: null});
    const [showMoveUpBtn, setShowMoveUpBtn] = useState(false);
    const moveUpIdleTokenRef = useRef(null);
    const moveUpTimeOutFuncRef = useRef(null);
    const [offsetHeight, setOffSetHeight] = useState(null);


    useEffect(() =>{
        if(contextObj.createEditContentRef.current.from === 'edit' || contextObj.createEditContentRef.current.from === 'create'){
            window.frames['reviewText'].document.body.innerHTML = contextObj.createEditContentRef.current.content;
            clientHeightRef.current = reviewText.document.body.clientHeight;
            setPages(p =>({...p, totalPages: contextObj.createEditContentRef.current.totalPages}))
        };
    }, []);

    useEffect(() =>{
        setOffSetHeight(reviewText.document.body.offsetHeight);
    }, []);

     useEffect(() =>{
        const iframe = document.getElementById('reviewText'); // Get the iframe element
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
                background: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%));
            }
        
            /* Firefox */
            body {
                scrollbar-width: thin;
                scrollbar-color: linear-gradient(to bottom, hsl(0, 0%, 30%), hsl(240, 21%, 75%), hsl(240, 21%, 81%), hsl(240, 21%, 87%)) transparent;
            }
        `;

        iframeDoc.head.appendChild(style);

        contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current, Document: window.frames['reviewText'].document};
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
            if(pages.totalPages  && pages.currentPage > pages.totalPages){
                setPages(p =>({...p, totalPages: p.currentPage}));
            };

            if(clientHeightRef.current > offsetHeight){
               setPages(p =>({...p, totalPages: 1}));
            }else{
                const tPages = Math.round(reviewText.document.body.scrollHeight / reviewText.document.body.clientHeight);
                setPages(p =>({...p,currentPage: tPages < p.currentPage? tPages : p.currentPage, totalPages: tPages}));
            };
        }

    }, [pages.currentPage, offsetHeight]);


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
                                const tPages = Math.round(reviewText.document.body.scrollHeight / reviewText.document.body.clientHeight);
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

        reviewText.document.addEventListener('scroll', checkScroll());
        return () => {
            window.frames['reviewText'] && reviewText.document.removeEventListener('scroll', checkScroll);
        };

    }, []);


    useEffect(() =>{
        const checkKeyPressed = () =>{
            return e =>{
                if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current){
                    const tPages = Math.round(reviewText.document.body.scrollHeight / reviewText.document.body.clientHeight);
                    setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                };
            };
        };

        window.frames['reviewText'].document.body.addEventListener('keyup', checkKeyPressed());

        return () =>{
            window.frames['reviewText'] && window.frames['reviewText'].document.body.addEventListener('keyup', checkKeyPressed);
        }
    }, []);

    const goToFirstPageHandler = () =>{
        const iframe = document.getElementById('reviewText'); // Get the iframe element
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
                const pageToGoToNumber = clientHeightRef.current * (pageNumber -1 );
                const iframe = document.getElementById('reviewText'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                iframeDoc.body.scrollTo({top: pageToGoToNumber, behaviour: 'smooth'});

                pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
            }else{
                const iframe = document.getElementById('reviewText'); // Get the iframe element
                const iframeDoc = iframe.contentWindow.document; // Access the iframe's 
                iframeDoc.body.scrollTo({top: 0, behaviour: 'smooth'});

                pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
            }
        }
    };


    const goBackHandler = () =>{
        contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
    };

    return(
        <div className={styles.container}>
            <div className={styles.resizeDiv}>
                <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                    <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle review file size image" loading='lazy' width={15} height={15}/>
                </button>
            </div>
            
            <button onClick={() => goBackHandler()} id={styles.goBackBtn} className={contextObj.modeState === 'light'? styles.goBackBtnLight : styles.goBackBtnDark}>
                <img src={goBackImg} alt="go back image" loading='lazy' width={20} height={20}/>
            </button>

            <iframe id='reviewText' name="reviewText"  className={styles.textDiv}>
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