
import { Routes, Route, useLocation } from "react-router-dom";


import Header from "./Layouts/Header";
import LandingPage from "./Pages/LandingPage";

import NotFound from "./Pages/NotFound";
import Footer from "./Layouts/Footer";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import ThanksPage from "./Pages/ThanksPage";
import PaymobCallback from "./Layouts/PaymobCallback";
import RejectPage from "./Pages/RejectPage";
export function Root() {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/orderDetails", "/"];

  const shouldShowHeaderFooter = noHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {shouldShowHeaderFooter && <Header/>}
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/orderDetails" element={<OrderDetailsPage />} />
        <Route path="/paymob/callback" element={<PaymobCallback />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/rejects" element={<RejectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}
