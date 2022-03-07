import React, { useState } from 'react'
import { Dropdown } from '../components'
import DropDown from '../components/dropdown'

export default function DropdownButton({ children, ...props }) {
    const [value, setValue] = useState();
    const [openContent, setOpenContent] = useState(false);
    return (
        <Dropdown onClick={(e) => {
            setOpenContent(o => !o);
        }}
            onMouseLeave={() => {
                setOpenContent(false);
            }}>
            <DropDown.DropBtn component={props.component}></DropDown.DropBtn>
            {openContent && <DropDown.Content>
                {children.map((item, index) => {
                    console.log(item);
                    return <DropDown.Item key={index + 1} value={item.value} style={{ cursor: 'pointer' }}>
                        {item}
                    </DropDown.Item>
                })}
            </DropDown.Content>}
        </Dropdown>
    )
}
