import React from 'react'
import "../style/scss/loginbanner.scss"

function LoginBanner() {
    return (
        <div className='loginBanner'>
            <div className='box'></div>
            <div className='flexGroup'>
                <div className='text'>
                    <h3>최신 소식을 놓치지 마세요</h3>
                    <p>트위터를 사용하면 가장 먼저 알게 됩니다.</p>
                </div>
                <div className='btnGroup'>
                    <button>로그인</button>
                    <button>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default LoginBanner