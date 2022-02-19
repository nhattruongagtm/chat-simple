import React from 'react'
import { useDispatch } from 'react-redux'
import { updateTab } from '../../features/global/deviceSlice';

type Props = {}

const NavigationBottom = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="navigation__bottom">
        <div className="navigation__bottom__item" onClick={()=> dispatch(updateTab(0))}>
        <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="navigation__bottom__item">
        <i className="fa-solid fa-stop"></i>
        </div>
        <div className="navigation__bottom__item">
        <i className="fa-solid fa-chevron-right"></i>
        </div>
    </div>
  )
}

export default NavigationBottom