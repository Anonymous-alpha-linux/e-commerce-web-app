import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerComponent } from '../components'

export default function Modal({ isShowing, toggle, children }) {
    return isShowing ? ReactDOM.createPortal(<ContainerComponent>
        <ContainerComponent.BackDrop />
        <ContainerComponent style={{ height: "0px", zIndex: '11', position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            {children}
        </ContainerComponent>
    </ContainerComponent>, document.body) : null
}
