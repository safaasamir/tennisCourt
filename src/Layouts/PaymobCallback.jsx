import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymobCallback() {
  const Navigate = useNavigate();
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const status = queryParameters.get("success");
    const orderId = queryParameters.get("id");

    if (status === "true") {
      Navigate("/thanks");
    }
  });
  return <div></div>;
}
