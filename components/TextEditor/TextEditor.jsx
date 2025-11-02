import styles from './TextEditor.module.css';
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { useState, useRef, useEffect, createContext, memo } from 'react'; 
import SearchCover from '../searchCover/SearchCover';
export const ContextObj = createContext({});

export default function TextEditor(){
    const contextValueRef = useRef(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const loadingPageTokenRef = useRef(null);
    //const operatingSystemTypeRef = useRef('');
    const [modeState, setModeState] = useState('light');
    const [toggleContentSize, setToggleContentSize] = useState(false);
    const numberOfUnNamedFileRef = useRef(0);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [recentFiles, setRecentFiles] = useState([]);
    const filesStoreRef = useRef([]);
    const createEditContentRef = useRef({from: '', content: '', liColor: ''});
    const previousComponentRef = useRef({actionContent: 'create', toolKit: ''});
    const [componentMountToggler, setComponentMountToggler] = useState({actionContent: 'create', toolKit: '', reRenderReadComp: false, autofocus: 0});
    const readFileRef = useRef(null);
    const fileToEditRef = useRef({fileName: null});
    const totalPagesRef = useRef(null);
    const lastCurrentPageRef = useRef(null);
    const fromRef = useRef('');
    const [toggleConfirmSaveFile, setToggleConfirmSaveFile] = useState('hide');
    const [disableResizeBtn, setDisableResizeBtn] = useState(false);
    const lastChosenColorForLIMarker = useRef('');
    const [fileName, setFileName] = useState({from: '', fileName: ''});

    useEffect(() =>{
        if(new Date().getHours() >= 18){
            setModeState('dark');
        }else{
            setModeState('light');
        };
    }, [])

    useEffect(() => {
        loadingPageTokenRef.current = setTimeout(() =>{
            setLoadingPage(false);
            clearTimeout(loadingPageTokenRef.current);
            loadingPageTokenRef.current = null;
        }, 2000);
    }, []);

/*     useEffect(() =>{
        if(navigator.userAgent.includes('Windows')){
            operatingSystemTypeRef.current = 'windows';
        }else if(navigator.userAgent.includes('Linux')){
            operatingSystemTypeRef.current = 'linux';
        }else if(navigator.userAgent.includes('Mac')){
            operatingSystemTypeRef.current = 'mac'
        };
    }, []); */

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
        }; 
    }, []);

    contextValueRef.current = { setFileName, fileName, fromRef, readFileRef, fileToEditRef, lastChosenColorForLIMarker, lastCurrentPageRef, modeState, setModeState, setToggleConfirmSaveFile, toggleConfirmSaveFile, recentFiles, 
        setRecentFiles, filesStoreRef, setToggleSearch, createEditContentRef, componentMountToggler, setComponentMountToggler, 
        numberOfUnNamedFileRef, previousComponentRef, totalPagesRef, toggleContentSize, setToggleContentSize, disableResizeBtn }


    return(
        loadingPage? <div id={styles.loadingPage}>
                        <p>Loading Page Wait...</p>
                    </div> : (
            <div className={styles.container}>
                <ContextObj.Provider value={contextValueRef.current}>
                    {toggleSearch && <SearchCover />}
                    <Header modeState={modeState}/>
                    <MainContent modeState={modeState} />
                </ContextObj.Provider>
        </div>
        )
        
    );
};
