import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthorizationContext } from '../../redux';

export default function Sidebar() {
    const { logout } = useAuthorizationContext();
    return <aside>
        {/* Sidebar */}
        <Link to={'/'} onClick={logout}>Logout</Link>
    </aside>;
}
