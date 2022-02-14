import React, { useEffect, useState } from 'react';
import { ContainerComponent } from '../../components';
import { PostContainer, PostModal } from '../../containers';

export default function Workspace() {
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        console.log(openModal);
    }, []);
    return <ContainerComponent style={{
        background: '#fff',
        color: '000',
    }}>
        <button onClick={() => setOpenModal(!openModal)}>Post form</button>
        <PostContainer></PostContainer>
        {openModal && <PostModal></PostModal>}
    </ContainerComponent>;
}