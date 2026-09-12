import { Link, useParams, useOutletContext } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MessageSquare, Phone, Send, ShieldAlert } from "lucide-react";
import { packages } from "../data";
import { business } from "../config/business";
import { SEO } from "../components/ui/SEO";
import { SmartImage } from "../components/ui/SmartImage";
import { buildWhatsAppUrl } from "../utils/whatsapp";

type OutletCtx = { openPlanner: () => void };

/**
 * Package Detail Page Component
 * Detailed view for single tour package with highlights, inclusions,
 * sticky inquiry panel, and WhatsApp booking trigger.
 */
export function PackageDetailPage() {
  const { slug } = useParams();
  const { openPlanner } = useOutletContext<OutletCtx>();
  const pkg = packages.find((item) => item.slug === slug);

  if (!pkg) {
    return (
      <section className="container-page py-20 text-center space-y-6">
        <h1 className="heading-md text-[#102A43]">Package Not Found</h1>
        <p className="text-slate-600">The requested travel package could not be found.</p>
        <Link className="btn btn-primary inline-flex" to="/packages">
          <ArrowLeft size={16} />
          <span>Back to All Packages</span>
        </Link>
      </section>
    );
  }

  const handleWhatsAppInquiry = () => {
    const msg = `Hello Smiling Journey! I am reviewing the "${pkg.name}" package (${pkg.duration}) on your website. Please share the detailed day-wise itinerary, hotel options, and price quote.`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SEO
        title={`${pkg.name} (${pkg.duration}) | Smiling Journey`}
        description={pkg.summary}
        path={`/packages/${pkg.slug}`}
      />

      <section className="py-12 sm:py-16 bg-[#FFFDF8] border-b border-[#E7E2DA]">
        <div className="container-page">
          {/* Breadcrumb Back Button */}
          <div className="mb-6">
            <Link to="/packages" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-[#F97316]">
              <ArrowLeft size={14} />
              <span>Back to Packages</span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-mono badge-mono-orange">{pkg.category}</span>
              <span className="badge-mono bg-[#102A43] text-white border-transparent">{pkg.duration}</span>
              <span className="badge-mono">{pkg.destination}</span>
            </div>

            <h1 className="heading-display text-[#102A43]">
              {pkg.name}
            </h1>
          </div>

          {/* Large Hero Destination Image */}
          <div className="sanity-card-sharp overflow-hidden mb-12">
            <SmartImage
              src={pkg.image}
              alt={pkg.imageAlt}
              wrapperClassName="aspect-[16/9] lg:aspect-[21/9] w-full"
            />
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Overview, Highlights, Inclusions (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Overview Box */}
              <div className="space-y-4">
                <h2 className="font-[#Plus_Jakarta_Sans] text-2xl font-bold text-[#102A43] border-b border-[#E7E2DA] pb-3">
                  Journey Overview
                </h2>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  {pkg.summary}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43] border-b border-[#E7E2DA] pb-3">
                  Verified Highlights & Inclusions
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((item) => (
                    <div key={item} className="sanity-card p-4 bg-white flex items-start gap-3 border border-[#E7E2DA]">
                      <CheckCircle2 size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#102A43]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customizable Disclaimer Card */}
              <div className="sanity-card p-6 bg-[#FFF3E6] border border-[#F97316]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#F97316] font-mono text-xs font-bold uppercase">
                  <ShieldAlert size={16} />
                  <span>Customizable Itinerary Notice</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  All Smiling Journey itineraries are fully customizable. Hotel categories, flight preferences, cab inclusions, and sightseeing schedules will be tailored specifically to your dates and preferences during your WhatsApp consultation.
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Booking Card (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sanity-card-sharp p-6 bg-white space-y-6 sticky top-28">
                <div className="border-b border-[#E7E2DA] pb-4 space-y-1">
                  <span className="badge-mono badge-mono-orange text-[0.65rem]">Quick Quote Request</span>
                  <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                    Plan Around This Package
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Get a personalized cost quote and day-wise itinerary for {pkg.name} sent directly to your WhatsApp.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="btn btn-primary w-full justify-center text-sm font-bold shadow-lg"
                  >
                    <MessageSquare size={16} />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={openPlanner}
                    className="btn btn-secondary w-full justify-center text-xs"
                  >
                    <Send size={14} />
                    <span>Open Full Trip Planner</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[#E7E2DA] space-y-2 text-center">
                  <span className="text-xs font-mono text-slate-500">Need Immediate Help?</span>
                  <a
                    href={`tel:${business.primaryPhone}`}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-[#102A43] hover:text-[#F97316]"
                  >
                    <Phone size={14} className="text-[#F97316]" />
                    <span>{business.primaryPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
