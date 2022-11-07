// @ts-nocheck

import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import gqlclient from "../GraphQL/graphQLClient";
import { gql } from "@apollo/client";
import axios from "axios";

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

    const startDate = {
      nanos: 2,
      seconds: "10203129",
    };

    const endDate = {
      nanos: 3,
      seconds: "10921321",
    };

    var data = {
      userId: props.userId,
      hostId: props.hostId,
      startDate: startDate,
      endDate: endDate,
      listingId: props.listingId,
    };

    gqlclient
      .mutate({
        mutation: gql`
          mutation Mutation($data: MakeBookingRequest) {
            MakeBooking(data: $data) {
              id
              userId
              listingId
              hostId
              status
              startDate {
                nanos
                seconds
              }
              endDate {
                nanos
                seconds
              }
            }
          }
        `,
        variables: { data },
      })
      .then((response) => {
        console.log(response.data.CreateBooking.id);
        // TODO: Swap out on change PAYMENT SERVICE
        axios
          .post(
            "http://cs302-payments-1c6335cbb512fe7e.elb.ap-southeast-1.amazonaws.com:420/api/payments/confirm/" +
              props.paymentIntentId,
            {
              paymentIntentId: props.paymentIntentId,
              userId: props.userId,
              bookingId: response.data.CreateBooking.id,
            }
          )
          .then((response) => {
            console.log(response);
          });
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
          w="full"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Let's go lah"}
          </span>
        </Button>
        <div style={{ marginBottom: 24 }}></div>
      </form>
    </Box>
  );
}
