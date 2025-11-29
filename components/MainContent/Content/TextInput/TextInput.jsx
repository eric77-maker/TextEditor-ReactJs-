import styles from './TextInput.module.css';
import { useRef , useEffect} from 'react';





export default function TextInput(props){
    const eRef = useRef(null);
    const checkIfToShowToolKitCounterRef = useRef(0);
    const increaseCheckIfToShowToolKitCounterRef = e =>{
        eRef.current = e;
        checkIfToShowToolKitCounterRef.current ++;
    };

    const checkToShowOrNot = () => {
        if(checkIfToShowToolKitCounterRef.current >= 5){
            props.handleShowFormatsToolkit(eRef.current);
        };

        checkIfToShowToolKitCounterRef.current = 0;
    };

    useEffect(() => {
    }, []);

    return(
        <div ref={props.textInputRef} onTouchEnd={() => checkToShowOrNot()} onTouchMove={e => increaseCheckIfToShowToolKitCounterRef(e)} contentEditable={true} onDoubleClick={e => props.handleShowFormatsToolkit(e)} onMouseOut={() => props.storeInnerHTML()} id={props.textInputId} name={props.textInputId}  className={styles.textInput}>
        </div>
    );
};