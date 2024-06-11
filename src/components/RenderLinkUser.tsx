import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import IconUser from '@/assets/icons/icon_user_black.svg';
import IconUserColor from '@/assets/icons/icon_user.svg';
import IconArrow from '@/assets/icons/icon_arrow_right_black.svg';

interface RenderLinkUserProps {
    className?: string;
    onClick?: () => void;
}

export const RenderLinkUser = ({ className = '', onClick }: RenderLinkUserProps) => {
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);
    const location = useLocation();
    const [icon, setIcon] = useState(IconUser);

    useEffect(() => {
        if (location.pathname === '/login') {
            setIcon(IconUserColor);
        } else {
            setIcon(IconUser);
        }
    }, [location.pathname]);

    if (isLoading) return null;

    if (user) {
        return (
            <Link to="/profile" className={`block bg-primary_color py-3 px-4 rounded-xl max-w-[10rem] ${className} overflow-hidden text-ellipsis whitespace-nowrap`}>
                <span className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    Hi {user.firstName} {user.lastName}!
                </span>
            </Link>
        );
    }

    return (
        <>
            <Link className={`ml-32 hidden lg:block ${className}`} to="/login" onClick={onClick}>
                <img src={icon} alt="User Icon" />
            </Link>
            <Link className={`lg:ml-32 lg:hidden block ${className}`} to="/login" onClick={onClick}>
                Profile <img className="lg:hidden" src={IconArrow} alt="Arrow Right Icon" />
            </Link>
        </>
    );
};

export default RenderLinkUser;
