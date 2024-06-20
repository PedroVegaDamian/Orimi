import { db } from '@/firebase'
import { Product } from '@/models'
import { doc, setDoc } from 'firebase/firestore'
import DateFormater from '@/utils/dateFormater'

type Session = {
  id: string
  created: number
  customer_email: string
}

const addOrder = async (session: Session, cart: Product[]) => {
  try {
    const orderRef = doc(db, 'orders', session.id)
    const order = await setDoc(orderRef, {
      order_number: session.id,
      date: DateFormater(session.created),
      email: session.customer_email,
      cart: cart.map(item => ({
        image1: item.image1,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      }))
    })
    return order
  } catch (error) {
    console.error('Error adding order: ', error)
    throw error
  }
}

export default addOrder
