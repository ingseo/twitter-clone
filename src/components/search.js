import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
    return (
        <div>
            <div className='searchIcon'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input type='search' placeholder='트위터 검색'/>
        </div>
    )
}

export default Search