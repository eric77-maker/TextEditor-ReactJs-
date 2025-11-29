import styles from './ReviewFile.module.css';
import { useState, useRef, useEffect, useContext } from 'react';
import { ContextObj } from '../../../TextEditor/TextEditor';
import {motion} from 'framer-motion'
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

    const containerAnimOnMount = {
        
    };


    useEffect(() =>{
        console.log('re-rendered Review...')
        if(contextObj.createEditContentRef.current.from === 'edit' || contextObj.createEditContentRef.current.from === 'create'){
            document.getElementById('reviewText').innerHTML = contextObj.createEditContentRef.current.content;
            clientHeightRef.current = document.getElementById('container').clientHeight * 0.88;
            setPages(p =>({...p, totalPages: contextObj.createEditContentRef.current.totalPages}))
        };
    }, []);

    useEffect(() => {
        window.frames['textToPrint'].document.body.innerHTML = contextObj.createEditContentRef.current.content;
    }, [])

    useEffect(() =>{
        setOffSetHeight(document.getElementById('container').offsetHeight * 0.88);
    }, []);

     useEffect(() =>{
        if(contextObj.createEditContentRef.current.from === 'create'){
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current};
        };

        if(contextObj.createEditContentRef.current.from === 'edit'){
            contextObj.createEditContentRef.current = {...contextObj.createEditContentRef.current};
        };
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

    
    useEffect(() =>{
        if(offsetHeight !== null){
            if(pages.totalPages  && pages.currentPage > pages.totalPages){
                setPages(p =>({...p, totalPages: p.currentPage}));
            };

            if(clientHeightRef.current > offsetHeight){
               setPages(p =>({...p, totalPages: 1}));
            }else{
                const tPages = Math.round(document.getElementById('reviewText').scrollHeight / document.getElementById('reviewText').clientHeight);
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
                                const tPages = Math.round(document.getElementById('reviewText').scrollHeight / document.getElementById('reviewText').clientHeight);
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

        document.getElementById('reviewText').addEventListener('scroll', checkScroll());
        return () => {
            document.getElementById('reviewText') && document.getElementById('reviewText').removeEventListener('scroll', checkScroll);
        };

    }, []);


    useEffect(() =>{
        const checkKeyPressed = () =>{
            return e =>{
                if(e.key === 'ArrowDown' && (e.target.scrollHeight - e.target.scrollTop) <= clientHeightRef.current){
                    const tPages = Math.round(document.getElementById('reviewText').scrollHeight / document.getElementById('reviewText').clientHeight);
                    setPages(p =>({...p, currentPage: tPages, totalPages: tPages}));              
                };
            };
        };

        document.getElementById('reviewText').addEventListener('keyup', checkKeyPressed());

        return () =>{
            document.getElementById('reviewText') && document.getElementById('reviewText').addEventListener('keyup', checkKeyPressed);
        }
    }, []);

    const goToFirstPageHandler = () =>{
        document.getElementById('reviewText').scrollTo({top: 0, behavior: 'smooth'});

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
                document.getElementById('reviewText').scrollTo({top: pageToGoToNumber, behavior: 'smooth'});

                pageNumber == 2 &&  setPages(p => ({...p, currentPage: 2}));
            }else{
                document.getElementById('reviewText').scrollTo({top: 0, behavior: 'smooth'});

                pages.currentPage == 2 && setPages(p => ({...p, currentPage: 1}));
            }
        }
    };


    const goBackHandler = () =>{
        contextObj.setComponentMountToggler(c => ({...c, actionContent: contextObj.previousComponentRef.current.actionContent, toolKit: contextObj.previousComponentRef.current.toolKit}));
    };

    return(
        <motion.div animate={containerAnimOnMount} transition={{duration: 0.5}} id='container' className={styles.container}>
            <div className={styles.resizeDiv}>
                <button disabled={contextObj.disableResizeBtn} style={contextObj.modeState === 'light'? {backgroundColor: 'hsl(0, 0%, 99%)'} : {backgroundColor: 'gray'}}
                                onClick={() => contextObj.setToggleContentSize(t =>!t)}>
                    <img src={!contextObj.toggleContentSize? fullScreenImg : defaultScreenImg} alt="toggle review file size image" loading='lazy' width={15} height={15}/>
                </button>
            </div>
            
            <button onClick={() => goBackHandler()} id={styles.goBackBtn}>
                <img src={goBackImg} alt="go back image" loading='lazy' width={15} height={15}/>
            </button>

            <iframe name='textToPrint' id='textToPrint'></iframe>

            <div id='reviewText' name="reviewText"  className={styles.textDiv}>
            </div>

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
        </motion.div>
    );
};