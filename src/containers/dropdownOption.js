import React from 'react'
import { Dropdown } from '../components'
import DropDown from '../components/dropdown'

export default function DropdownOption({ children, ...props }) {
    const [value, setValue] = React.useState();
    const ref = React.useRef();
    return (
        <Dropdown forwardRef={ref} {...props}>
            <DropDown.DropBtn component={props.component}></DropDown.DropBtn>
            <DropDown.Content>
                {children.map((item, index) => {
            
                    return <DropDown.Option key={index + 1} value={item.value}>
                        {item}
                    </DropDown.Option>
                })}
            </DropDown.Content>
        </Dropdown>
    )
}
