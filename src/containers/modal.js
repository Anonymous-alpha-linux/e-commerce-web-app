import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerComponent } from '../components'

export default function Modal({ isShowing, toggle, children }) {
    return isShowing ? ReactDOM.createPortal(<ContainerComponent>
        <ContainerComponent.BackDrop onClick={() => toggle()} />
        <ContainerComponent style={{ zIndex: '11', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '420px' }}>
            {children}
        </ContainerComponent>
    </ContainerComponent>, document.body) : null
}
