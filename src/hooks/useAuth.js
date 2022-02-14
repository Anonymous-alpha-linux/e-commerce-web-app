import { useEffect, useState } from 'react';

export default function useAuth(props) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        setIsAuth(props.isAuthenticated);
    }, []);

    if (isAuth === null) return 'Loading...';
    return isAuth;
}
