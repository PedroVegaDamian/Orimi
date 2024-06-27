import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Title } from '@/components/ui';
import { Order } from '@/models/index';

const OrderDetailPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            if (!orderId) throw new Error('Order ID is required');

            const orderRef = doc(db, 'orders', orderId);
            const orderDoc = await getDoc(orderRef);

            if (!orderDoc.exists()) {
            throw new Error(`Order with ID ${orderId} not found`);
            }

            setOrder({ id: orderDoc.id, ...orderDoc.data() } as Order);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order:', error);
            setError('Failed to fetch order details');
            setLoading(false);
        }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>No order found</div>;
    }

    return (
        <div>
        <section className=" pb-24">
            <div className="max-w-7xl px-5 lg-6 mx-auto">
            <Title className="md:text-left md:pl-[100px]">Order Details</Title>
            {/* Table Headers */}
            <div className="grid py-6 text-center lg:text-left ">
                <div className="border-b border-primary_800_color mb-6">
                    <div className='flex'>
                        <h3 className="text-primary_800_color mr-2">
                            Order:
                        </h3>
                        <span className="text-gray-500">{order.order_number.slice(-6)}</span>
                    </div>
                    <div className='flex'>
                        <h3 className="text-primary_800_color mr-2">
                            Date:
                        </h3>
                        <span className="text-gray-500">{order.date}</span>
                    </div>
                    
                    
                    {/* <h3 className="text-primary_800_color">
                        Address: <small className="text-gray-500">
                        {order.shippingAddress ? (
                            <>
                            {order.shippingAddress.company && `${order.shippingAddress.company}, `}
                            {order.shippingAddress.street},
                            {order.shippingAddress.city},
                            {order.shippingAddress.state},
                            {order.shippingAddress.zip},
                            {order.shippingAddress.country}
                            {order.shippingAddress.notes && ` (${order.shippingAddress.notes})`}
                            </>
                        ) : (
                            'No address available'
                        )}
                        </small>
                    </h3> */}
                </div>
                <div className="grid grid-cols-3">
                <p></p>
                <p className="font-nunito lg:text-xl text-gray-500 text-center">Quantity</p>
                <p className="font-nunito lg:text-xl text-gray-500 text-center">Total</p>
                </div>
            </div>
            {/* Table Content */}
            {order.cart.map((product, index) => (
                <div key={index} className="grid grid-cols-3 0 py-6 border-t border-primary_800_color mb-6">
                {/* Image */}
                <div className="flex justify-center lg:justify-start">
                    <img
                    src={product.image1}
                    alt="product img"
                    className="w-[60px] xl:w-[80px]"
                    />
                </div>
                {/* Quantity */}
                <div className="flex justify-center items-center h-[80px] flex-col">
                    <div className="flex items-center">
                    <p className="px-[10px] lg:px-6 lg:text-2xl">{product.quantity}</p>
                    </div>
                </div>
                {/* Total */}
                <div className="flex justify-center items-center h-[80px]">
                    <h6 className="lg:text-2xl text-grey_800_color">
                    {`$ ${product.subtotal ?? product.price}`}
                    </h6>
                </div>
                </div>
            ))}
            {/* Total Amount */}
            <div className="rounded-lg pr-6 lg:rounded-xl lg:p-6 w-full mb-8 border-1 border-primary_color">
                <div className="flex items-center justify-end w-full py-2">
                <p className="font-nunito pr-5 font-bold lg:text-2xl lg:font-medium">Total</p>
                <h6 className="font-nunito font-bold lg:font-medium lg:text-2xl leading-9">
                    {`$ ${order.cart.reduce((total, item) => total + (item.subtotal ?? item.price), 0).toFixed(2)}`}
                </h6>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
};

export default OrderDetailPage;
