import React from 'react'
import { ContainerComponent, Text } from '../components'

export default function PostUpContainer({ title }) {
  return (
    <ContainerComponent style={{ background: "white", width: "100px", height: "35px", borderRadius: "25px", position: "relative" }}>
      <ContainerComponent.Item style={{ width: "60%", height: "100%", background: "#8DFE", borderRadius: "25px" }}>
      </ContainerComponent.Item>
      <Text.Center style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} >{title}</Text.Center>
    </ContainerComponent>
  )
}

