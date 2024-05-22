import { useEffect } from 'react';

const useBodyScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isLocked]);
};

export default useBodyScrollLock;
