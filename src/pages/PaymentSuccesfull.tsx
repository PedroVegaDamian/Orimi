import { useNavigate } from 'react-router-dom';
import IconCheck from '@/assets/icons/icon_check.svg';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import addOrder from '@/services/addOrder';
import { useUserStore } from '@/store/userStore';
import { Title, Button } from '@/components/ui';

const PaymentSuccessfulPage = () => {
  const { cart, resetCart } = useCartStore();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    fetch(
      `https://orimi-checkout-prod.orimi.workers.dev/session-status?session_id=${sessionId}`
    )
      .then(res => res.json())
      .then(data => addOrder(data.session, cart))
      .then(() => resetCart())
  }, [])

  return (
    <div className="flex justify-center items-center w-full mt-10">
      <div className="p-4 w-full max-w-md h-full">
        <div className="p-4 text-center bg-white_color rounded-lg shadow">
          <div className="w-12 h-12 rounded-full bg-green_color p-2 flex items-center justify-center mx-auto mb-3.5">
            <img src={IconCheck} className="h-56" alt="Payment Successful" />
          </div>
          <Title>Payment Done!</Title>
          <p className="text-lg">
            Thank you for completing your secure online payment.
          </p>
          <div className="gap-3 mt-8">
            <Button onClick={() => navigate('/profile/orders')}>See your order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
