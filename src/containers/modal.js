import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerComponent } from '../components'

export default function Modal({ isShowing, toggle, children, style }) {
    return isShowing ? ReactDOM.createPortal(<ContainerComponent>
        <ContainerComponent.BackDrop onClick={() => toggle()} />
        <ContainerComponent style={{ zIndex: '1000', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '820px', background: 'transparent', ...style }}>
            <ContainerComponent.Inner style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                {children}
            </ContainerComponent.Inner>
        </ContainerComponent>
    </ContainerComponent>, document.body) : null
}
