import place from "../api/mock.json";
import "../App.css";
const TripPage = () => {
    const items = place.getAttractionKr.item;
    console.log(items);
    return (
        <div>
            <header>
                <div className="nav-area">
                    <a href="/#" className="logo">
                        로고 ㅋ
                    </a>
                </div>
            </header>
            <div className="IMG_Con">
                {items.map((item) => (
                    <p key={item.UC_SEQ}>
                        <div className="IMG_list">
                            <img src={item.MAIN_IMG_THUMB} />
                            <p className="IMG_title">{item.TITLE}</p>
                        </div>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default TripPage;
