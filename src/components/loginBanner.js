import React, { useState } from 'react';
import "style/scss/loginbanner.scss"
import Modal from 'react-modal';
import AuthForm from 'components/AuthForm'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LoginBanner() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    return (
        <div className='loginBanner'>
            <div className='box'></div>
            <div className='flexGroup'>
                <div className='text'>
                    <h3>최신 소식을 놓치지 마세요</h3>
                    <p>트위터를 사용하면 가장 먼저 알게 됩니다.</p>
                </div>
                <div className='btnGroup'>
                    <button onClick={()=> {setModalIsOpen(true); setSelected(false)}} name="login" className="authBtn">
                        로그인
                    </button>
                    <button onClick={()=> {setModalIsOpen(true); setSelected(true)}} name="create" className="authBtn">
                        가입하기
                    </button>
                    <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)}>
                        <AuthForm popupType={selected}/>
                        <button className="xBtn" onClick={()=> setModalIsOpen(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default LoginBanner