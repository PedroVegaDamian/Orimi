import { db } from '@/firebase';
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { Order } from '@/models/';


export const fetchOrdersFromFirebase = async (userEmail: string): Promise<Order[]> => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('email', '==', userEmail),
        orderBy('createdAt', 'desc'), 
        limit(3)
      );
  
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
      }
  
      const orders = snapshot.docs.map(doc => {
        const data = doc.data() as Order;
        return {
          ...data,
          id: doc.id
        };
      });
  
      return orders;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      throw new Error('Failed to fetch orders'); 
    }
  };
export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      console.log(`Order with ID ${orderId} not found.`);
      return null;
    }

    const orderData = orderDoc.data() as Order;
    return { ...orderData, id: orderDoc.id };
  } catch (error) {
    console.error("Error fetching order by ID: ", error);
    throw error;
  }
};
