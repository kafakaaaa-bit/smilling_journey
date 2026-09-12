import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { HomePage } from "../pages/HomePage";
import { PackagesPage } from "../pages/PackagesPage";
import { PackageDetailPage } from "../pages/PackageDetailPage";
import { ContactPage } from "../pages/ContactPage";
import { LegalPage } from "../pages/LegalPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:slug" element={<PackageDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
        <Route path="/terms-and-conditions" element={<LegalPage kind="terms" />} />
        <Route path="/cancellation-and-refund-policy" element={<LegalPage kind="refund" />} />
      </Route>
    </Routes>
  );
}
