import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Title } from '@/components/ui';

import { Order } from '@/models/index';

const OrderDetailPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const response = await fetch(`https://orimi-checkout.orimi.workers.dev/orders/${orderId}`);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrder(data);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
        };

        fetchOrder();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <section>
        <Title className='md:text-left md:pl-[100px]'>Order Details</Title>
        <hr className='border-grey_color w-[90%] mx-auto'/>
        {order.items.map((Product) => (
            <div key={Product.id} className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-col items-start md:items-start">
            <div className="flex items-center flex-row gap-6 w-full mx-auto">
                <img src={Product.image1} alt={Product.name} className="xl:w-[140px]" />
                <div className="pro-data w-full max-w-sm">
                <h5 className="font-nunito text-22 font-bold text-primary_tono5_color text-2xl">{Product.name}</h5>
                <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">${Product.price}</h6>
                <p className="px-6 text-2xl">Quantity: {Product.quantity}</p>
                </div>
            </div>
            </div>
        ))}
        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto bg-bg_color">
            <div className="flex items-center justify-end w-full py-6 border-b border-grey_900_color ">
            <p className="font-nunito pr-5 text-3xl font-medium text-gray-900">Total</p>
            <h6 className="font-nunito font-medium text-3xl leading-9 text-indigo-500">{`$ ${(order.amount_total / 100).toFixed(2)}`}</h6>
            </div>
        </div>
        </section>
    );
};

export default OrderDetailPage;
