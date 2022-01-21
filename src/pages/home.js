import React from 'react'
import { Outlet } from 'react-router-dom'
import { SliderContainer } from '../containers'

export default function Home() {
    return (
        <div>
            <h1>This is Home page</h1>
            <button>Login</button>
            <SliderContainer></SliderContainer>
            <Outlet></Outlet>
        </div>
    )
}
