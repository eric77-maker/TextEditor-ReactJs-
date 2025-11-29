import styles from './StrikeThroughAndBackColor.module.css';
import backColor from '/src/assets/BottomSectionimgs/backColor.webp';
import lineThrough from '/src/assets/BottomSectionimgs/lineThrough.svg';



export default function StrikeThroughAndBackColor(){


    const handleTextBackColor = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('BackColor', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    const handleLineThroughText = () => {
        if(document.getElementById('createTextInput') || document.getElementById('editTextInput')){
            document.execCommand('StrikeThrough', false, null);
        };

        if(document.getElementById('createTextInput') !== null){
            contextObj.createEditContentRef.current = {from: 'create', content: document.getElementById('createTextInput').innerHTML};
        }else{
            contextObj.createEditContentRef.current = {from: 'edit', content: document.getElementById('editTextInput').innerHTML};
        }
    };

    return(
        <div className={styles.container}>
            <button onClick={() =>handleTextBackColor()} className={styles.btn}>
                <img src={backColor} alt="" width={18} height={18}/>
            </button>
            <button onClick={() =>handleLineThroughText()} className={styles.btn}>
                <img src={lineThrough} alt="" width={17} height={17}/>
            </button>
        </div>
    )
};