import React from 'react';
import Search from 'components/Search';
import TrendList from 'components/TrendList';

import 'style/scss/trend.scss'

function Trend() {

    //props
    const list1 = {
        field: '대한민국',
        text: '공식 입장',
        tweet: '5,152',
    }
    const list2 = {
        field: '대한민국',
        text: '심장 너무',
        tweet: '3,152',
    }
    const list3 = {
        field: '뮤직실시간',
        text: '그냥 너무',
        tweet: '1,276',
    }
    const list4 = {
        field: '대한민국',
        text: '아산병원',
        tweet: '8,456',
    }
    const list5 = {
        field: '뮤직실시간',
        text: '에이프릴',
        tweet: '27,241',
    }
    const list6 = {
        field: '대한민국',
        text: '정정기사',
        tweet: '7,845',
    }
    const list7 = {
        field: '대한민국',
        text: '응원해',
        tweet: '2,768',
    }
    const list8 = {
        field: '대한민국',
        text: '아이돌',
        tweet: '2,262',
    }
    const list9 = {
        field: '대한민국',
        text: '힘내',
        tweet: '1,113',
    }
    const list10 = {
        field: '대한민국',
        text: '화이팅',
        tweet: '4,778',
    }

    return (
        <div className='trend box'>
            <div className='searchContainer'>
                <Search />
            </div>
            <div className='trendBox'>
                <h1>나를 위한 트렌드</h1>
                <div className='trendListContainer'>
                    <TrendList {...list1}/>
                    <TrendList {...list2}/>
                    <TrendList {...list3}/>
                    <TrendList {...list4}/>
                    <TrendList {...list5}/>
                    <TrendList {...list6}/>
                    <TrendList {...list7}/>
                    <TrendList {...list8}/>
                    <TrendList {...list9}/>
                    <TrendList {...list10}/>
                </div>
            </div>
        </div>
    )
}

export default Trend