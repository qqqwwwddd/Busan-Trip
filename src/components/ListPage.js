import React from "react";
import place from "../api/mock.json";
function ListPage() {
    const items = place.getAttractionKr.item;

    return (
        <div>
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
}
export default ListPage;
