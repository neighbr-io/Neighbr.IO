import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "GET",
      headers: {
        // check for header requirement
        "Content-Type": "application/json",
      },
      // Include any other fetch options required by your setup
    })
    .then((res) => {
      console.log("Response: ", res);
      return res.json();
    })
    .then(data => {
      const { clientSecret } = data;
      setClientSecret(clientSecret);
    })
    .catch(error => {
      console.error("Error fetching payment intent:", error);
      // Error handling 
    });
  }, []);


  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;