import { useState } from 'react';

export default function useModal(state) {
    const [isShowing, setIsShowing] = useState(!!state || false);

    function toggle(value) {
        if (value) setIsShowing(value);
        else setIsShowing(o => !o);
    }
    return [
        isShowing,
        toggle
    ]
}





