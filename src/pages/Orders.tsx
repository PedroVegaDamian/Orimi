import { Title } from '@/components/ui';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';

const OrdersPage = () => {
    return (
        <section>
        <Title className='md:text-left md:pl-[100px]'>My Orders</Title>
        <hr className='border-grey_color w-[90%] mx-auto'/>
        <div className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-col items-start md:items-start">
            <div className="flex flex-col items-start md:items-start mb-4 md:mb-0 md:w-full">
                <p>Order: numero-pedido</p>
                <p>Date: fecha</p>
                <p>Price: <span className='text-primary_800_color font-bold'>$80.99</span></p>
            </div>
            <div className='flex items-center justify-center w-full'>
                <a href="/order" className='flex items-center'>
                    See your orders 
                    <img src={IconEyeBlack} alt="Plus Icon" className="ml-[10px]" />
                </a>
            </div>
        </div>
        <hr className='border-grey_color w-[90%] mx-auto'/>
    </section>
    );
};

export default OrdersPage;
