import React from 'react'
import { Outlet } from 'react-router-dom'
import { SliderContainer } from '../containers'
import { useAuthorizationContext } from '../redux';

export default function Home() {
    return (
        <div>
            <h1>This is Home page</h1>
            <SliderContainer></SliderContainer>
            <Outlet></Outlet>
        </div>
    )
}
