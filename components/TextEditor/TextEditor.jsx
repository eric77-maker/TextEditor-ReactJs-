import styles from './TextEditor.module.css';
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { useState, useRef, useEffect, useLayoutEffect, createContext } from 'react'; 
import SearchCover from '../searchCover/SearchCover';
export const ContextObj = createContext({});

export default function TextEditor(){
    const mainContainerRef = useRef(null);
    const contextValueRef = useRef(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const loadingPageTokenRef = useRef(null);
    const modeStateUpdaterTokenRef = useRef(null);
    const modeStateUpdaterTokenResettorTokeRef = useRef(null);
    const modeStateUpdaterFuncRef = useRef(null);
    const [modeState, setModeState] = useState('');
    const [toggleContentSize, setToggleContentSize] = useState(false);
    const numberOfUnNamedFileRef = useRef(0);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [recentFiles, setRecentFiles] = useState([]);
    const filesStoreRef = useRef([]);
    const draftedFilesRef = useRef([]);
    const createEditContentRef = useRef({from: 'create', content: ''});
    const previousComponentRef = useRef({actionContent: 'create', toolKit: ''});
    const [componentMountToggler, setComponentMountToggler] = useState({actionContent: 'create', toolKit: '', reRenderReadComp: false, autofocus: 0});
    const readFileRef = useRef(null);
    const fileToEditRef = useRef(null);
    const totalPagesRef = useRef(null);
    const lastCurrentPageRef = useRef(1);
    const fromRef = useRef('');
    const [toggleConfirmSaveFile, setToggleConfirmSaveFile] = useState('hide');
    const [disableResizeBtn, setDisableResizeBtn] = useState(false);
    const [lastChosenColorForLIMarker, setLastChosenColorForLIMarker] = useState('');
    const [fileName, setFileName] = useState({from: '', fileName: ''});
    const [showLinkInput, setShowLinkInput] = useState(false);
    const storeFileTempRef = useRef(null);
    const madeChangesRef = useRef(false);
    const [promptWithoutSavingChangesOnEdit, setPromptWithoutSavingChangesOnEdit] = useState(false);
    const triedToSaveWithoutChangesOnEditRef = useRef(false);
    const wasGoingToAfterEditRef = useRef('');
    const typedOrChangedliColorToMakeChangesOnEditRef = useRef(false);


    useLayoutEffect(() =>{
        const hours = new Date().getHours();
        const meridian = hours >= 12 ? 'PM' : 'AM';

        if(hours >= 6 && hours < 12 && meridian === 'AM'){
            console.log('light')
            modeState !== 'light' && setModeState('light');
        };

        if(hours >= 12 && hours < 18 && meridian === 'PM'){
            modeState !== 'light' && setModeState('light');
            console.log('light')
        };

        if(hours >= 18 && hours < 12 && meridian === 'PM'){
            modeState !== 'dark' && setModeState('dark');
            console.log('dark')
        };

        if(hours >= 12 && hours < 6 && meridian === 'AM'){
            modeState !== 'dark' && setModeState('dark');
            console.log('dark')
        };


        modeStateUpdaterFuncRef.current = () => {
            const hours = new Date().getHours();
            const meridian = hours >= 12 ? 'PM' : 'AM';

            if(hours >= 6 && hours < 12 && meridian === 'AM'){
                modeState !== 'light' && setModeState('light');
            };

            if(hours >= 12 && hours < 18 && meridian === 'PM'){
                modeState !== 'light' && setModeState('light');
            };

            if(hours >= 18 && hours < 12 && meridian === 'PM'){
                modeState !== 'dark' && setModeState('dark');
            };

            if(hours >= 12 && hours < 6 && meridian === 'AM'){
                modeState !== 'dark' && setModeState('dark');
            };

        };
        modeStateUpdaterTokenRef.current = setInterval(() => modeStateUpdaterFuncRef.current(), 3600000);

        return () => {
            modeStateUpdaterTokenRef.current !== null && clearInterval(modeStateUpdaterTokenRef.current);
        }
    }, []);

    useEffect(() => {
        modeStateUpdaterTokenResettorTokeRef.current = setInterval(() => {
            if(modeStateUpdaterTokenRef.current === null){
                modeStateUpdaterTokenRef.current = setInterval(() => modeStateUpdaterFuncRef.current(), 3600000);
            };
        }, 18000000);

        return () => {
            modeStateUpdaterTokenResettorTokeRef.current !== null && clearInterval(modeStateUpdaterTokenResettorTokeRef.current);
        };
    }, [])


    useEffect(() => {
        loadingPageTokenRef.current = setTimeout(() =>{
            setLoadingPage(false);
            clearTimeout(loadingPageTokenRef.current);
            loadingPageTokenRef.current = null;
        }, 2000);
    }, []);

    useEffect(() =>{
        if(modeState === 'light'){
            document.body.style.backgroundColor = '#000';
        }else{
            document.body.style.backgroundColor = '#fff'
        }
    }, [modeState]);
    
    useEffect(() =>{
       if(window.innerWidth <= 1030){
            setDisableResizeBtn(true);
            console.log('yes');
        };
    }, []);

    contextValueRef.current = { madeChangesRef, setShowLinkInput, modeStateUpdaterTokenRef, setFileName, fileName, fromRef, readFileRef, fileToEditRef, lastChosenColorForLIMarker, setLastChosenColorForLIMarker, lastCurrentPageRef,  modeState, setModeState, setToggleConfirmSaveFile, toggleConfirmSaveFile, recentFiles, 
        setRecentFiles, filesStoreRef, toggleSearch, setToggleSearch, createEditContentRef, componentMountToggler, setComponentMountToggler, storeFileTempRef, 
        numberOfUnNamedFileRef, previousComponentRef, totalPagesRef, toggleContentSize, setToggleContentSize, disableResizeBtn, typedOrChangedliColorToMakeChangesOnEditRef,
        promptWithoutSavingChangesOnEdit, setPromptWithoutSavingChangesOnEdit, triedToSaveWithoutChangesOnEditRef, wasGoingToAfterEditRef, draftedFilesRef
    }


    return(
        loadingPage? <div id={styles.loadingPage}>
                        <p>Loading Page Wait...</p>
                    </div> : (
            <div ref={mainContainerRef} className={styles.container}>
                <ContextObj.Provider value={contextValueRef.current}>
                    {toggleSearch && <SearchCover />}
                    <Header modeState={modeState}/>
                    <MainContent toggleSearch={toggleSearch} showLinkInput={showLinkInput} modeState={modeState} lastChosenColorForLIMarker={lastChosenColorForLIMarker}/>
                </ContextObj.Provider>
        </div>
        )
        
    );
};
