import React from 'react'
import {Link} from 'react-router-dom'

function Contact() {
    return (
        <div className='contact'>
            <div className='contactText'>
                가입하시려면 <Link to="/">쿠키 사용</Link>을 포함해 <Link to="/">이용약관</Link>과 <Link to="/">개인정보 처리방침</Link>에 동의해야 합니다.
            </div>
            <div className='contactList'>
                <Link to="/">이용약관</Link>
                <Link to="/">개인정보 처리방침</Link>
                <Link to="/">쿠키 정책</Link>
                <Link to="/">접근성</Link>
                <Link to="/">광고 정보</Link>
                <Link to="/">더보기</Link>
                © 2023 Twitter, Inc.
            </div>
        </div>
    )
}

export default Contact