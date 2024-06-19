import { useEffect, useState } from 'react';
import { Title } from '@/components/ui';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';
import { Order } from '@/models/index'; 

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://orimi-checkout.orimi.workers.dev/profile/orders');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Verificar que los datos recibidos son un array
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }

                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <section>
            <Title className='md:text-left md:pl-[100px]'>My Orders</Title>
            <hr className='border-grey_color w-[90%] mx-auto'/>
            {orders.length === 0 ? (
                <div className="text-center m-4">
                    <p>You haven't placed any orders yet.</p>
                    <p>Select a product, add it to your cart, and complete the purchase.</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-col items-start md:items-start">
                        <div className="flex flex-col items-start md:items-start mb-4 md:mb-0 md:w-full">
                            <p>Order: {order.id}</p>
                            <p>Date: {new Date(order.created * 1000).toLocaleDateString()}</p>
                            <p>Price: <span className='text-primary_800_color font-bold'>{(order.amount_total / 100).toFixed(2)} {order.currency.toUpperCase()}</span></p>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <a href={`/order/${order.id}`} className='flex items-center'>
                                See your order
                                <img src={IconEyeBlack} alt="Plus Icon" className="ml-[10px]" />
                            </a>
                        </div>
                    </div>
                ))
            )}
            <hr className='border-grey_color w-[90%] mx-auto'/>
        </section>
    );
};

export default OrdersPage;
