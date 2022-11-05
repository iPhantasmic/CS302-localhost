// @ts-nocheck

import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button } from "@chakra-ui/react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/user/${props.userId}` + ``,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Box h="fit-content">
      <form id="payment-form">
        <PaymentElement id="payment-element" />
        <Button
          onClick={handleSubmit}
          disabled={isProcessing}
          id="submit"
          colorScheme="linkedin"
          mt={5}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Let's go lah"}
          </span>
        </Button>
      </form>
    </Box>
  );
}
