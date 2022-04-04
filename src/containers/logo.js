import React from 'react'
import { ContainerComponent,Text } from '../components'

export default function logo() {
  return (
    <ContainerComponent.Flex className="navigation__logo">
        <Text.Title style={{color:"white",marginRight:"2px",fontSize:"20px"}}>
            Idea
        </Text.Title>
          <Text.Title style={{ color:"#163d3c",background:"white",padding:"0px 5px",borderRadius:"5px",fontSize:"20px",border:"none"}}>
            hub
        </Text.Title>
    </ContainerComponent.Flex>
  )
}
