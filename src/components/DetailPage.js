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
        // 여행 사진 및 관광지 정보 구현
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
                                        <p>주소 : {item.ADDR1}</p>
                                        <p>
                                            휠체어 가능: {item.MIDDLE_SIZE_RM1}
                                        </p>
                                        <p>입장료: {item.USAGE_AMOUNT}</p>
                                        <p>오시는 길 :{item.TRFC_INFO}</p>
                                        <p>
                                            이용 가능 시간:{" "}
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

                            {/* 사용자가 올리는 여행 장소 후기 사진 구현 part=>my-image 수업자료 참고 */}
                            <ImgContent>
                                <h2>여행 사진</h2>
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
                                        const file = e.currentTarget.files[0]; // Files로 넘어온 객체에서 0번째 인덱스에 필요한 정보가 다 있음
                                        const fileReader = new FileReader(); //자바스크립트 내에 존재하는 객체
                                        fileReader.readAsDataURL(file);
                                        fileReader.onloadend = (e) => {
                                            //에러가 나든 말든 값을 읽어들임
                                            console.log(e);
                                            setImgList((prev) => {
                                                return [
                                                    ...prev,
                                                    e.target.result,
                                                ];
                                            });
                                        };
                                        e.currentTarget.value = ""; // input은 전의 값을 기억하는 특징이 있음 따라서 input값을 초기화시켜주기
                                    }}
                                />

                                {imgList.length !== 0 ? (
                                    <></>
                                ) : (
                                    <div className="main-txt">
                                        <br />
                                        사진을 함께 공유해주세요!
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
