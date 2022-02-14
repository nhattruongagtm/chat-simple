import React from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../features/auth/modalSlice'

interface SearchFrameProps {
    
}

const SearchFrame = (props: SearchFrameProps) => {

    return (
        <div className='search__frame'>
            <i className="fas fa-search seach__start"></i>
            <input type="text" />
            <i className="fas fa-random search__end"></i>
        </div>
    )
}

export default SearchFrame

