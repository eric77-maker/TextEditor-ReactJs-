import styles from './Footer.module.css';
import ZoomOutImg from '/src/assets/Footer/ZoomOutImg.svg';
import ZoomInImg from '/src/assets/Footer/ZoomInImg.svg'
import ViewFirstPageImg from '/src/assets/Footer/ViewFirstPageImg1.svg';
import ViewFirstPageImg1 from '/src/assets/Footer/ViewFirstPageImg2.svg';
import ViewLastPageImg2 from '/src/assets/Footer/ViewLastPageImg12.svg';
import ViewLastPageImg3 from '/src/assets/Footer/ViewLastPageImg3.svg';





export default function Footer(){
    return(
        <footer className={styles.container}>
            <section className={styles.leftSection}>
                <div className={styles.btnDiv}>
                    <button id={styles.firstPageBtn}>
                        <img src={ViewFirstPageImg1} alt="" width={15} height={15}/>
                        <span className={styles.leftSectionToolkit} id={styles.firstPageToolKit}>
                            view first page of file
                        </span>
                    </button>
                    <button id={styles.onePageBackwardBtn}>
                        <img src={ViewFirstPageImg} alt="" width={15} height={15}/>
                        <span className={styles.leftSectionToolkit} id={styles.onePageBackwardToolKit}>
                            go one page backward
                        </span>
                    </button>
                </div>
                <div>
                    <input type="number" />
                </div>
                <div className={styles.btnDiv}>
                    <button id={styles.onePageForwardBtn}>
                        <img src={ViewLastPageImg2} alt="" width={15} height={15}/>
                        <span className={styles.leftSectionToolkit} id={styles.onePageForwardToolKit}>
                            go one page forward
                        </span>
                    </button>
                    <button id={styles.lastPageBtn}>
                        <img src={ViewLastPageImg3} alt="" width={15} height={15}/>
                        <span className={styles.leftSectionToolkit} id={styles.lastPageToolKit}>
                            view first page of file
                        </span>
                    </button>
                </div>
            </section>
            <section className={styles.rightSection}>
                <div></div>
                <div>
                    <button id={styles.zoomOutBtn}>
                        <img style={{opacity: '0.8'}} src={ZoomOutImg} alt="" width={15} height={15}/>
                        <span className={styles.rightSectionToolkit} id={styles.zoomOutToolKit}>
                            zoom out
                        </span>
                    </button>
                    <div id={styles.zoomPercentageDiv}>
                        <span></span>
                        <span className={styles.rightSectionToolkit} id={styles.zoomPercentageToolKit}>
                            100%
                        </span>
                    </div>
                    <button id={styles.zoomInBtn}>
                        <img src={ZoomInImg} alt="" width={15} height={15}/>
                        <span className={styles.rightSectionToolkit} id={styles.zoomInToolKit}>
                            zoom in
                        </span>
                    </button>
                </div>
                <input type='number' min="10" max="200" placeholder='100%'/>
            </section>
        </footer>
    );
};