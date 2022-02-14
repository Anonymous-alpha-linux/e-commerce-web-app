import React, { useEffect, useState } from 'react';
import { ContainerComponent } from '../../components';
<<<<<<< HEAD
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
=======
import { PostContainer, PostForm, Comment, Timespan, PostModal } from '../../containers';


export default function Workspace() {
    return <ContainerComponent>
        <PostForm></PostForm>
        <PostContainer></PostContainer>
        <Comment></Comment>
        {/* <Timespan></Timespan> */}
        <PostContainer></PostContainer>
        <PostModal></PostModal>
>>>>>>> 214104fe73bd7a877829f26cc93e5b1444beaee1
    </ContainerComponent>;
}   