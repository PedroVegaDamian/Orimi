import { db } from '@/firebase';
import { Product } from '@/models';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

type Session = {
  id: string;
  created: number;
  customer_email: string;
}

const addOrder = async (session: Session, cart: Product[]) => {
  try {
    const orderRef = doc(db, 'orders', session.id);
    await setDoc(orderRef, {
      order_number: session.id,
      date: new Date(session.created * 1000).toISOString(), // Guardar la fecha como string ISO
      email: session.customer_email,
      cart: cart.map(item => ({
        image1: item.image1,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      createdAt: serverTimestamp() 
    });
    console.log('Order added successfully');
  } catch (error) {
    console.error('Error adding order: ', error);
    throw error;
  }
}

export default addOrder;
