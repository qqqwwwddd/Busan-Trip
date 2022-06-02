import "../App.css";
import "./Main2.module.css";
import React from "react";
import place from "../api/mock.json";

// UC_SEQ : 255~354
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
function Main2() {
    const items = place.getAttractionKr.item;
    return (
        <div>
            {items.map((item) => {
                if (item.UC_SEQ === getRandomInt(255, 353)) {
                    return (
                        <span className="image1">
                            <img
                                className="image"
                                src={item.MAIN_IMG_THUMB}
                                alt="gallery"
                            />
                            <span>{item.TITLE}</span>
                        </span>
                    );
                }
            })}
        </div>
    );
}

export default Main2;