import { useState } from 'react';

export default function useModal(state) {
    const [isShowing, setIsShowing] = useState(!!state || false);

    function toggle() {
        setIsShowing(!isShowing);
    }
    return [
        isShowing,
        toggle
    ]
}





