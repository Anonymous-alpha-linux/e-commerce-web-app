import React, { useEffect, useRef } from 'react'
import { Dropdown } from '../components'
import DropDown from '../components/dropdown'
import { useModal } from '../hooks';

export default function DropdownButton({ children, component, position = 'middle', ...props }) {
    const [openContent, toggleContent] = useModal();
    const contentRef = useRef(null);
    useEffect(() => {
        // const contentElement = document.querySelector(".dropdown__content");
        if (contentRef.current) {
            contentRef.current.addEventListener('click', (e) => {
                console.log(e.target.childNodes);
            });
        }
        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener('click', () => {
                });
            }
        };
    }, [contentRef.current]);
    return (
        <Dropdown onMouseLeave={toggleContent}>
            <DropDown.DropBtn
                onClick={toggleContent}
            >{component}</DropDown.DropBtn>
            {openContent && <DropDown.Content
                forwardref={contentRef}
                style={position === 'middle' && {
                    ...props.style,
                    left: '50%',
                    transform: 'translateX(-50%)',
                } || position === 'left' && {
                    ...props.style,
                    left: '0'
                } || {
                    ...props.style,
                    right: 0
                }}
            >
                {React.Children.toArray(children).map((item, index) => {
                    return <DropDown.Item key={index + 1} value={item.value} style={{ cursor: 'pointer' }}>
                        {item}
                    </DropDown.Item>
                })}
            </DropDown.Content>}
        </Dropdown>
    )
}
