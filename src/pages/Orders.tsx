import { Title } from '@/components/ui';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';

const OrdesPage = () => {
    return (
        <section>
            <Title>My Orders</Title>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            <div className="w-[90%] mx-auto pt-[24px] pb-[24px]">
                <p>Order: numero-pedido</p>
                <p>Date: fecha</p>
                <p>Price: <span className='text-primary_800_color font-bold'>$80.99</span></p>
                <div className='flex'>
                <a href="/order" className='flex m-auto'>
                    See your orders 
                    <img src={IconEyeBlack} alt="Plus Icon" className="ml-[10px]" />
                </a>
                </div>
            </div>
            <hr className='border-grey_color w-[90%] mx-auto'/>
        </section>
    );
};

export default OrdesPage;
