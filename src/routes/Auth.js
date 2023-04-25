import React, { useState } from 'react';
import AuthBtn from "components/AuthBtn";
import AuthForm from 'components/AuthForm'
import Contact from 'components/Contact';
import Trend from 'components/Trend';
import Modal from 'react-modal';

import 'style/scss/auth.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='page authPage'>
            <div className='trendContainer container'>
                <Trend />
            </div>
            <div className="authContainer container">
                <div className='authBox box'>
                    <div className="title">
                        <h1>트위터에 처음이세요?</h1>
                        <p>지금 가입해서 나에게 맞춤 설정된 타임라인을 만들어 보세요!</p>
                    </div>
                    <div className='btnGroup'>
                        <AuthBtn />
                        <button onClick={()=> setModalIsOpen(true)} name="create" className="authBtn">
                            계정 만들기
                        </button>
                        <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)}>
                            <AuthForm popupType={true}/>
                            <button className="xBtn" onClick={()=> setModalIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </Modal>
                    </div>
                <Contact />
                </div>
            </div>
        </div>
    );
};

export default Auth;