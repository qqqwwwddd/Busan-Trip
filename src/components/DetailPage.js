import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faThumbsUp,
    faThumbsDown,
    faChainSlash,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Image from "../components/Image";
import place from "../api/mock.json";
import Navbar from "./Navber";
import styles from "./DetailPage.module.css";
import Footer from "./Footer";

const DetailContainer = styled.div`
    border: 2px salmon;
    background: linear-gradient(to right, skyblue, white);
`;

const DetailContent = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 2.5fr;
    gap: 20px;
    align-items: center;
`;
const ImgContent = styled.div`
    text-align: center;
    margin: 5% 0%;
    /* border: 2px dashed red; */
    padding: 20px;
`;

const Img = styled.img`
    width: 450px;
    height: 300px;
    border-radius: 50px;
`;

const Btn = styled.button`
    background: white;
    border: none;
    width: 80px;
`;

const DetailInfo = styled.div`
    /* border: 2px dashed skyblue; */
    padding: 10px;
    box-sizing: border-box;
`;
const DetailSiteInfo = styled.div`
    text-indent: 20px;
`;
const AddBtn = styled.button`
    width: 50px;
    height: 50px;
    border: 2px solid #0aa1dd;
    background-color: #0aa1dd;
    color: white;
    font-size: 24px;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    margin: auto;
`;

function DetailPage() {
    const [increaseCount, setIncreaseCount] = useState(0);
    const [decreaseCount, setDecreaseCount] = useState(0);

    const increaseNum = () => {
        setIncreaseCount(increaseCount + 1);
    };

    const decreaseNum = () => {
        setDecreaseCount(decreaseCount + 1);
    };

    const [printTxt, setPrintTxt] = useState(false);
    const printWholeTxt = () => {
        setPrintTxt(!printTxt);
    };
    const imgRef = useRef(null);
    const [imgList, setImgList] = useState([]);
    const items = place.getAttractionKr.item;

    const params = useParams();
    console.log(params.UC_SEQ);
    return (
        // ?????? ?????? ??? ????????? ?????? ??????
        <div>
            <Navbar></Navbar>
            {items.map((item) =>
                Number(params.UC_SEQ) === item.UC_SEQ ? (
                    <div key={item.UC_SEQ}>
                        <DetailContainer>
                            <section id="nav">
                                <div className="navInner boxing">
                                    <div className="left">
                                        <ul id="cBody">
                                            <li className="home">
                                                <a href="/">HOME</a>
                                            </li>
                                            <li className="depth1">
                                                <a href="/">{item.GUGUN_NM}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <DetailContent>
                                <ImgContent>
                                    <Img
                                        src={item.MAIN_IMG_NORMAL}
                                        alt=""
                                        className="img_detail"
                                    />
                                    <p>{item.TITLE}</p>
                                    <div className={styles.btn_high}>
                                        <Btn onClick={increaseNum}>
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                                size="2x"
                                                color="#0AA1DD"
                                            />
                                            {increaseCount}
                                        </Btn>
                                        <Btn onClick={decreaseNum}>
                                            <FontAwesomeIcon
                                                icon={faThumbsDown}
                                                size="2x"
                                                color="#0AA1DD"
                                            />
                                            {decreaseCount}
                                        </Btn>
                                    </div>
                                </ImgContent>

                                <DetailInfo>
                                    <div className="detailTitle">
                                        <h2>{item.MAIN_TITLE}</h2>
                                        <p>{item.TITLE}</p>
                                    </div>
                                    <DetailSiteInfo>
                                        <p>?????? : {item.ADDR1}</p>
                                        <p>
                                            ????????? ??????: {item.MIDDLE_SIZE_RM1}
                                        </p>
                                        <p>?????????: {item.USAGE_AMOUNT}</p>
                                        <p>????????? ??? :{item.TRFC_INFO}</p>
                                        <p>
                                            ?????? ?????? ??????:{" "}
                                            {item.USAGE_DAY_WEEK_AND_TIME}
                                        </p>
                                        <div onClick={printWholeTxt}>
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                            />
                                            {item.ITEMCNTNTS.length > 300 &&
                                            printTxt === true ? (
                                                <span>
                                                    <span>
                                                        {item.ITEMCNTNTS.substring(
                                                            0,
                                                            300
                                                        )}
                                                        {item.ITEMCNTNTS.substring(
                                                            300
                                                        )}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span>
                                                    {item.ITEMCNTNTS.substring(
                                                        0,
                                                        300
                                                    ) + "..."}
                                                </span>
                                            )}
                                        </div>
                                    </DetailSiteInfo>
                                </DetailInfo>
                            </DetailContent>

                            {/* ???????????? ????????? ?????? ?????? ?????? ?????? ?????? part=>my-image ???????????? ?????? */}
                            <ImgContent>
                                <h2>?????? ??????</h2>
                                <AddBtn
                                    onClick={() => {
                                        imgRef.current.click();
                                    }}
                                >
                                    +
                                </AddBtn>
                                <input
                                    type="file"
                                    ref={imgRef}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        const file = e.currentTarget.files[0]; // Files??? ????????? ???????????? 0?????? ???????????? ????????? ????????? ??? ??????
                                        const fileReader = new FileReader(); //?????????????????? ?????? ???????????? ??????
                                        fileReader.readAsDataURL(file);
                                        fileReader.onloadend = (e) => {
                                            //????????? ?????? ?????? ?????? ????????????
                                            console.log(e);
                                            setImgList((prev) => {
                                                return [
                                                    ...prev,
                                                    e.target.result,
                                                ];
                                            });
                                        };
                                        e.currentTarget.value = ""; // input??? ?????? ?????? ???????????? ????????? ?????? ????????? input?????? ?????????????????????
                                    }}
                                />

                                {imgList.length !== 0 ? (
                                    <></>
                                ) : (
                                    <div className="main-txt">
                                        <br />
                                        ????????? ?????? ??????????????????!
                                    </div>
                                )}

                                {imgList.length > 0 ? (
                                    <div className="gallery">
                                        {imgList.map((img, idx) => {
                                            return (
                                                <Image
                                                    key={img + idx}
                                                    src={img}
                                                ></Image>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </ImgContent>
                            <Footer></Footer>
                        </DetailContainer>
                    </div>
                ) : (
                    <></>
                )
            )}
        </div>
    );
}

export default DetailPage;
