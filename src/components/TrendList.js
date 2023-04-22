import React from 'react'

function TrendList(props) {
    return (
        <div className='trendListBox'>
            <ul className='trendList'>
                <li>{props.field}에서 트렌드 중</li>
                <li>{props.text}</li>
                <li>{props.tweet} 트윗</li>
            </ul>
            <div className='plusBtn'>
                ···
            </div>
        </div>
    )
}

export default TrendList