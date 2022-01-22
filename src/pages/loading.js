import React from 'react';
import { ContainerComponent } from "../components";

const Loading = React.memo(() => {
    return <ContainerComponent>
        <ContainerComponent.BackDrop></ContainerComponent.BackDrop>
        <h1>Loading...</h1>
    </ContainerComponent>;
});

export default Loading;