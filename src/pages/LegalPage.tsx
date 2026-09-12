import { useLocation, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { SEO } from "../components/ui/SEO";

interface LegalPageProps {
  kind?: "privacy" | "terms" | "refund";
}

/**
 * Legal Policies Page Component
 * Tabbed reader view for Privacy Policy, Terms & Conditions, and Cancellation/Refund Policy.
 */
export function LegalPage({ kind }: LegalPageProps) {
  const location = useLocation();
  const path = location.pathname;

  const selectedKind = kind || (path.includes("terms") ? "terms" : path.includes("cancellation") || path.includes("refund") ? "refund" : "privacy");

  let title = "Privacy Policy";
  let content = (
    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
      <p>
        At <strong>Smiling Journey</strong>, accessible from https://smilingjourney.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by Smiling Journey and how we use it.
      </p>
      <h3 className="font-bold text-base text-[#102A43] pt-2">Information We Collect</h3>
      <p>
        When you submit a trip planner request or contact enquiry form on our website, we may collect personal details including your full name, phone/WhatsApp number, email address, starting city, departure dates, and travel preferences.
      </p>
      <h3 className="font-bold text-base text-[#102A43] pt-2">How We Use Your Information</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>To prepare customized travel package itineraries and price quotes.</li>
        <li>To communicate directly with you regarding your travel enquiry via phone or WhatsApp.</li>
        <li>To improve customer service and travel assistance quality.</li>
      </ul>
      <h3 className="font-bold text-base text-[#102A43] pt-2">Contact Information</h3>
      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at info@smilingjourney.com or +91 8896572181.
      </p>
    </div>
  );

  if (selectedKind === "terms") {
    title = "Terms and Conditions";
    content = (
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Smiling Journey</strong>! These terms and conditions outline the rules and regulations for the use of Smiling Journey&apos;s services and website.
        </p>
        <h3 className="font-bold text-base text-[#102A43] pt-2">Travel Planning Services</h3>
        <p>
          Smiling Journey provides travel consultancy, tour package customization, hotel booking assistance, flight guidance, and local transport coordination. All package itineraries are subject to availability and confirmation upon booking.
        </p>
        <h3 className="font-bold text-base text-[#102A43] pt-2">User Responsibilities</h3>
        <p>
          Travelers are responsible for providing accurate contact details, valid government identification documents, and ensuring compliance with local domestic or international travel regulations.
        </p>
      </div>
    );
  } else if (path.includes("cancellation") || path.includes("refund")) {
    title = "Cancellation and Refund Policy";
    content = (
      <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>
          This Cancellation and Refund Policy outlines the terms for cancelling or modifying tour package bookings made through <strong>Smiling Journey</strong>.
        </p>
        <h3 className="font-bold text-base text-[#102A43] pt-2">Cancellation Guidelines</h3>
        <p>
          Cancellation rules and refund percentages depend on hotel policies, flight ticket conditions, local transport operators, and peak season travel timelines. Specific cancellation terms will be detailed in your finalized itinerary agreement prior to payment confirmation.
        </p>
        <h3 className="font-bold text-base text-[#102A43] pt-2">Refund Processing</h3>
        <p>
          Eligible refunds will be processed via original payment methods or bank transfer within 7 to 14 business days after confirmation from third-party service vendors (hotels, airlines, transport providers).
        </p>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${title} | Smiling Journey`} description={`Read the official ${title} for Smiling Journey.`} path={path} />

      <section className="py-12 sm:py-16 bg-[#FFFDF8] border-b border-[#E7E2DA]">
        <div className="container-page max-w-4xl">
          {/* Breadcrumb Back Button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-[#F97316]">
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="sanity-card bg-white p-6 sm:p-10 border border-[#E7E2DA] space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#F97316]" />
              <span className="badge-mono badge-mono-orange text-[0.65rem]">Official Policy</span>
            </div>

            <h1 className="heading-lg text-[#102A43] border-b border-[#E7E2DA] pb-4">
              {title}
            </h1>

            {/* Policy Selector Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-[#E7E2DA] pb-4">
              <Link
                to="/privacy-policy"
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                  title === "Privacy Policy"
                    ? "bg-[#102A43] text-white"
                    : "bg-[#F3F0E9] text-slate-600 hover:bg-[#E7E2DA]"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                  title === "Terms and Conditions"
                    ? "bg-[#102A43] text-white"
                    : "bg-[#F3F0E9] text-slate-600 hover:bg-[#E7E2DA]"
                }`}
              >
                Terms & Conditions
              </Link>
              <Link
                to="/cancellation-and-refund-policy"
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                  title === "Cancellation and Refund Policy"
                    ? "bg-[#102A43] text-white"
                    : "bg-[#F3F0E9] text-slate-600 hover:bg-[#E7E2DA]"
                }`}
              >
                Cancellation & Refund
              </Link>
            </div>

            <div className="pt-2">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
}
