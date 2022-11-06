// @ts-nocheck

import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import gqlclient from "../GraphQL/graphQLClient";
import { gql } from "@apollo/client";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

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
    toast({
      title: "Success.",
      description: "We've received your payment for holding.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    var data = {
      userId: props.userId,
      hostId: props.hostId,
      startDate: props.startDate,
      endDate: props.endDate,
      listingId: props.listingId,
    };

    const request = gqlclient
      .mutate({
        mutation: gql`
          mutation CreateBooking($data: MakeBookingRequest) {
            MakeBooking(data: $data) {
              returnMessage
            }
          }
        `,
        variables: { data },
      })
      .then((response) => {
        // TODO: get id and post (id, payment_intent and userId) to stripe server
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/user/${props.userId}` + ``,
      },
    });

    // if (error.type === "card_error" || error.type === "validation_error") {
    //     setMessage(error.message);
    // } else {
    //     setMessage("An unexpected error occured.");
    // }

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
          w="full"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Let's go lah"}
          </span>
        </Button>
      </form>
    </Box>
  );
}
