import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthorizationContext } from '../../redux';

export default function Sidebar() {
    const { logout } = useAuthorizationContext();
    return <aside>
        This is admin Aside
        <Link to={'/'} onClick={logout}>Logout</Link>
    </aside>;
}
