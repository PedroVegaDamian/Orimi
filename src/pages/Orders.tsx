import { useEffect, useState } from 'react';
import { fetchOrdersFromFirebase } from '@/services/fetchOrders';
import { Title } from '@/components/ui';
import IconEyeBlack from '@/assets/icons/icon_eye_black.svg';
import { useUserStore } from '@/store/userStore';
import { Order } from '@/models';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
    const userEmail = useUserStore((state) => state.user?.email);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userEmail) {
                setError('User email is required');
                setLoading(false);
                return;
            }

            try {
                const ordersData = await fetchOrdersFromFirebase(userEmail);
                setOrders(ordersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userEmail]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const recentOrders = orders.slice(-3).reverse();

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
                recentOrders.map((order) => (
                    <div key={order.id} className="w-[90%] mx-auto pt-[24px] pb-[24px] flex flex-col items-start md:items-start">
                        <div className="flex flex-col items-start md:items-start mb-4 md:mb-0 md:w-full">
                            <p>Order: {order.order_number.slice(-6)}</p>
                            <p>Date: {order.date}</p>
                            <p>Price: <span className='text-primary_800_color font-bold'>${order.cart.reduce((total, item) => total + (item.subtotal || 0), 0).toFixed(2)}</span></p>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <Link to={`/profile/orders/${order.id}`} className='flex items-center'>
                                See your order
                                <img src={IconEyeBlack} alt="Plus Icon" className="ml-[10px]" />
                            </Link>
                        </div>
                        <hr className='border-grey_color w-[90%] mx-auto mt-4'/>
                    </div>
                    
                ))
            )}
        </section>
    );
};

export default OrdersPage;
