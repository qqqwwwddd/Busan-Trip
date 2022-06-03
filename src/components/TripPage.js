import place from "../api/mock.json";
import "../App.css";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navber";
import Footer from "./Footer";
const TripPage = () => {
    const gugunParam = useParams();
    // console.log(gugunParam.GUGUN_NM);
    const items = place.getAttractionKr.item;

    return (
        <div>
            <Navbar></Navbar>
            <div className="IMG_Con">
                {items.map((item) =>
                    gugunParam.GUGUN_NM === item.GUGUN_NM ? (
                        <div key={item.UC_SEQ}>
                            <div className="IMG_list">
                                <Link to={`/detailNu/${item.UC_SEQ}`}>
                                    <img src={item.MAIN_IMG_THUMB} />
                                    <p className="IMG_title">{item.TITLE}</p>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                )}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default TripPage;
