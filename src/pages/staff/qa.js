import React from 'react'
import { Accordion, ContainerComponent, Text } from '../../components'

export default function QA() {
    return (
        <ContainerComponent>
            <Text.Title style = {{
                fontSize: '50px',
                textAlign: 'center'
            }}>Q&a</Text.Title>
            <Accordion></Accordion>
        </ContainerComponent>

    )

}
