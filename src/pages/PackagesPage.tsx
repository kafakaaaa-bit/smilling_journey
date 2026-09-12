import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowRight, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { packages } from "../data";
import { SEO } from "../components/ui/SEO";
import { SmartImage } from "../components/ui/SmartImage";
import { buildWhatsAppUrl } from "../utils/whatsapp";

type OutletCtx = { openPlanner: () => void };

const CATEGORIES = ["All", "Kashmir", "Domestic", "Winter", "Custom"] as const;

/**
 * Packages Catalogue Page Component
 * Upgraded with Sanity.io tech cards, category filtering, search input,
 * duration badges, and direct WhatsApp quote request triggers.
 */
export function PackagesPage() {
  const { openPlanner } = useOutletContext<OutletCtx>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = packages.filter((pkg) => {
    const matchesCat =
      selectedCategory === "All" ||
      pkg.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Travel Packages & Custom Holiday Itineraries | Smiling Journey"
        description="Explore popular domestic and international holiday packages by Smiling Journey. Kashmir tours, honeymoon packages, family escapes, and customized travel itineraries."
        path="/packages"
      />

      <section className="py-12 sm:py-16 bg-[#FFFDF8] border-b border-[#E7E2DA]">
        <div className="container-page">
          {/* Header Banner */}
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="badge-mono badge-mono-orange">
              <ShieldCheck size={13} className="text-[#F97316]" />
              Verified Holiday Packages
            </span>
            <h1 className="heading-display text-[#102A43]">
              Find your next journey
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore curated traveller favourites below or request a completely customized itinerary tailored to your dates, group, and budget.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="sanity-card p-4 sm:p-5 bg-white mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-[#102A43] text-white shadow-sm"
                        : "bg-[#F3F0E9] text-slate-600 hover:bg-[#E7E2DA] hover:text-[#102A43]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search package or city..."
                  className="field !min-h-[38px] !py-1.5 pl-9 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Packages Cards Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPackages.map((pkg) => (
                <article key={pkg.slug} className="sanity-card bg-white flex flex-col justify-between overflow-hidden">
                  <div>
                    {/* Image & Badge Overlay */}
                    <div className="relative">
                      <SmartImage
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        wrapperClassName="aspect-[16/10] w-full"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="badge-mono bg-[#102A43] text-white border-transparent">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="badge-mono badge-mono-orange text-[0.65rem]">{pkg.category}</span>
                        <span className="font-mono text-xs font-bold text-slate-400">{pkg.destination}</span>
                      </div>

                      <h2 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                        {pkg.name}
                      </h2>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {pkg.summary}
                      </p>

                      {/* Verified Inclusions */}
                      <div className="pt-3 border-t border-[#E7E2DA] space-y-2">
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                          Verified Highlights:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                          {pkg.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="text-[#F97316] font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        className="btn btn-secondary text-xs w-full justify-center"
                      >
                        <span>Details</span>
                        <ArrowRight size={14} />
                      </Link>

                      <button
                        onClick={() => {
                          const msg = `Hello Smiling Journey! I am interested in booking or customizing the "${pkg.name}" package (${pkg.duration}). Please share details.`;
                          window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
                        }}
                        className="btn btn-primary text-xs w-full justify-center"
                      >
                        <MessageSquare size={14} />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    <button
                      onClick={openPlanner}
                      className="w-full text-center text-xs font-mono font-bold text-slate-500 hover:text-[#F97316] pt-1"
                    >
                      + Customize This Itinerary
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sanity-card p-12 text-center bg-white space-y-4 max-w-md mx-auto">
              <p className="font-mono text-sm font-bold text-slate-500">No packages matched your filter.</p>
              <button onClick={openPlanner} className="btn btn-primary text-xs mx-auto">
                Request Custom Itinerary
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
