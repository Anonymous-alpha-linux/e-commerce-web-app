import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { usePostContext } from '../../redux';

export default function SinglePost() {
    const { id } = useParams();
    const { posts } = usePostContext();
    console.log(posts);
    if (!id) {
        <Navigate to={'/'} replace></Navigate>
    }

    return (
        <div>singlePosS</div>
    )
}
