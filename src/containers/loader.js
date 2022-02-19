import React from 'react'
import { Loader as LoaderComponent } from '../components'
export default function Loader() {
    return (
        <LoaderComponent>
            <LoaderComponent.Dot />
            <LoaderComponent.Dot />
            <LoaderComponent.Dot />
            <LoaderComponent.Dot />
            <LoaderComponent.Dot />
            <LoaderComponent.Dot />
        </LoaderComponent>
    )
}
