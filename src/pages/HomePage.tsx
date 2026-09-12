import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Camera,
  Car,
  Compass,
  Headphones,
  MapPin,
  MessageSquare,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { destinations, packages, services, testimonials } from "../data";
import { business } from "../config/business";
import { SEO } from "../components/ui/SEO";
import { SmartImage } from "../components/ui/SmartImage";
import { TravelRouteAnimation } from "../components/ui/TravelRouteAnimation";
import { HeroQuickPlanner } from "../components/planner/HeroQuickPlanner";
import { useReducedMotion } from "../hooks";
import { buildWhatsAppUrl } from "../utils/whatsapp";

type OutletCtx = { openPlanner: () => void };

/**
 * HomePage Component
 * Overhauled with Sanity.io tech design aesthetics, high contrast light/dark balance,
 * mobile-first fluid layout, interactive travel route SVG, and direct WhatsApp lead flows.
 */
export function HomePage() {
  const { openPlanner } = useOutletContext<OutletCtx>();

  return (
    <>
      <SEO
        title="Smiling Journey | Customized Domestic & International Tour Packages"
        description="Plan personalized domestic and international holidays with Smiling Journey. Explore packages and get help with hotels, flights, transport, sightseeing, and custom itineraries."
      />
      <HeroSection openPlanner={openPlanner} />
      <DestinationStorySection openPlanner={openPlanner} />
      <FeaturedPackagesSection openPlanner={openPlanner} />
      <ServicesSection />
      <HowItWorksSection />
      <AboutTrustSection />
      <TestimonialSection />
      <FinalCTASection openPlanner={openPlanner} />
    </>
  );
}

/**
 * 1. HERO SECTION
 * High-impact hero layout combining Sanity.io technical typography, brand color palette,
 * interactive quick trip planner card, and animated travel route SVG.
 */
/**
 * 1. HERO SECTION
 * High-impact hero layout combining Sanity.io technical typography, brand color palette,
 * interactive quick trip planner card, and animated travel route SVG.
 */
function HeroSection({ openPlanner }: OutletCtx) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-grid-pattern pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#E7E2DA]">
      <div className="container-page">
        {/* Top Hero Monospaced Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="badge-mono badge-mono-orange">
            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
            Domestic & International Travel Experiences
          </span>
          <span className="badge-mono hidden sm:inline-flex">
            <ShieldCheck size={13} className="text-[#38BDF8]" />
            Verified Travel Agency
          </span>
        </div>

        {/* Hero Grid Container */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-display text-[#102A43]"
            >
              <HeroTypewriterHeading speed={35} />
            </motion.h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From peaceful mountain escapes in Kashmir to exciting international adventures, tell us what you have in mind and our travel team will shape the journey around you.
            </p>

            {/* CTAs & Phone Link */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button onClick={openPlanner} className="btn btn-primary shadow-lg text-base px-6">
                <MessageSquare size={18} />
                <span>Plan My Trip</span>
              </button>

              <Link to="/packages" className="btn btn-secondary text-base">
                <span>Explore Packages</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={`tel:${business.primaryPhone}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#102A43] hover:text-[#F97316] px-3 py-2 transition-colors"
              >
                <Phone size={16} className="text-[#F97316]" />
                <span>{business.primaryPhone}</span>
              </a>
            </div>

            {/* Trust Line Pills */}
            <div className="pt-4 border-t border-[#E7E2DA] flex flex-wrap gap-4 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="text-[#F97316]">✓</span> Personalized itineraries
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#F97316]">✓</span> Reliable assistance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#F97316]">✓</span> Support from enquiry to return
              </span>
            </div>
          </div>

          {/* Right Column: Embedded Hero Quick Planner Card */}
          <div className="lg:col-span-5">
            <HeroQuickPlanner onFullPlannerOpen={openPlanner} />
          </div>
        </div>

        {/* Animated Travel Route SVG Component */}
        <div className="mt-12 pt-6">
          <TravelRouteAnimation reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}

/**
 * Specialized Hero Typewriter Heading with Animated Orange Brush Stroke on "next smile"
 * Sequentially types out "Where do you want your next smile to begin?"
 * Once "next smile" is typed out, a vibrant orange brush stroke draws underneath "next smile".
 */
function HeroTypewriterHeading({ speed = 35 }: { speed?: number }) {
  const fullText = "Where do you want your next smile to begin?";
  const targetWord = "next smile";
  const targetStartIndex = fullText.indexOf(targetWord); // 23
  const targetEndIndex = targetStartIndex + targetWord.length; // 33

  const [typedLength, setTypedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCut, setShowCut] = useState(false);

  useEffect(() => {
    setTypedLength(0);
    setIsTyping(true);
    setShowCut(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        index++;
        setTypedLength(index);
        if (index >= targetEndIndex) {
          setShowCut(true);
        }
      } else {
        setIsTyping(false);
        setShowCut(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [speed, targetEndIndex]);

  const prefix = fullText.slice(0, Math.min(typedLength, targetStartIndex));
  const target = typedLength > targetStartIndex ? fullText.slice(targetStartIndex, Math.min(typedLength, targetEndIndex)) : "";
  const suffix = typedLength > targetEndIndex ? fullText.slice(targetEndIndex, Math.min(typedLength, fullText.length)) : "";

  return (
    <span className="relative inline-block text-[#102A43]">
      <span>{prefix}</span>

      {typedLength > targetStartIndex && (
        <span className="relative inline-block px-1 mx-0.5 text-[#F97316] font-extrabold select-none">
          <span className="relative z-10">{target}</span>

          {/* Thick Orange Brush Stroke Accent directly under "next smile" */}
          <svg
            className="absolute -bottom-1.5 left-0 w-full h-4 text-[#F97316] overflow-visible pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 2 12 Q 50 22 98 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: showCut ? 1 : 0, opacity: showCut ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            />
          </svg>
        </span>
      )}

      <span>{suffix}</span>

      {isTyping && (
        <span className="inline-block w-2.5 h-7 sm:h-9 bg-[#F97316] ml-1.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

/**
 * Typewriter Text Animation Component
 * Sequentially types out text character-by-character with a blinking cursor effect.
 * Automatically triggers when scrolled into view.
 */
function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  className = "",
  startOnView = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  startOnView?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      startTyping();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startTyping();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered, startOnView, text, speed, delay]);

  const startTyping = () => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, speed);
    }, delay);
  };

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {isTyping && <span className="inline-block w-2 h-5 bg-[#F97316] ml-1 animate-pulse align-middle" />}
    </span>
  );
}

/**
 * 2. POPULAR DESTINATIONS STORYTELLER SECTION
 * Features Mobile Stacking & Sticky Scrollspy Navigation, Typewriter Title/Subtitle Animations,
 * and Viewport Entry Slide/Fade Animations for smooth responsive UX across all screen sizes.
 */
function DestinationStorySection({ openPlanner }: OutletCtx) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // ScrollSpy: IntersectionObserver tracks active destination card in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(index)) {
              setActiveIndex(index);
              // Auto-scroll the mobile active tab chip into horizontal view
              tabRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0.3,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler when a navigation tab is clicked
  const handleTabClick = (idx: number) => {
    setActiveIndex(idx);
    const targetEl = cardRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#FFFDF8] border-b border-[#E7E2DA] relative" aria-labelledby="destinations-heading">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
          <div>
            <span className="badge-mono badge-mono-orange mb-3">Popular Destinations</span>
            <h2 id="destinations-heading" className="heading-lg text-[#102A43]">
              Find a journey that feels like you
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            Explore traveller favourites below. As you scroll, the navigation updates dynamically with typewriter animations.
          </p>
        </div>

        {/* Mobile Sticky Stacking Navigation Bar (Sticks at top on mobile screens) */}
        <div className="sticky top-[69px] z-30 bg-[#FFFDF8]/95 backdrop-blur border-y border-[#E7E2DA] py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-8 lg:hidden shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {destinations.map((dest, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={dest.name}
                  ref={(node) => { tabRefs.current[idx] = node; }}
                  onClick={() => handleTabClick(idx)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#102A43] text-white shadow-sm ring-2 ring-[#F97316]"
                      : "bg-white text-slate-700 border border-[#E7E2DA] hover:border-[#102A43]"
                  }`}
                >
                  <span className={`text-[0.65rem] ${isSelected ? "text-[#FBBF24]" : "text-slate-400"}`}>
                    0{idx + 1}
                  </span>
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Split Grid & Mobile Vertical Cards Flow */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Desktop Left Column: Sticky Vertical Nav List (5 Cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-2">
            {destinations.map((dest, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={dest.name}
                  ref={(node) => { tabRefs.current[idx] = node; }}
                  onClick={() => handleTabClick(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#102A43] text-white border-[#102A43] shadow-md translate-x-1"
                      : "bg-white text-[#102A43] border-[#E7E2DA] hover:border-[#102A43]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? "bg-[#F97316] text-white" : "bg-[#F3F0E9] text-slate-600"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-[#Plus_Jakarta_Sans] font-bold text-base sm:text-lg">
                      {dest.name}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                      isSelected ? "text-[#FBBF24]" : "text-slate-400 group-hover:text-[#F97316]"
                    }`}
                  >
                    {isSelected ? "Active" : "View"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Scrollspy Destination Cards Flow with Typewriter Animation (7 Cols) */}
          <div className="lg:col-span-7 space-y-12">
            {destinations.map((dest, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <motion.div
                  key={dest.name}
                  ref={(node) => { cardRefs.current[idx] = node; }}
                  data-index={idx}
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`sanity-card-sharp bg-white overflow-hidden scroll-mt-28 transition-all ${
                    isSelected ? "ring-2 ring-[#F97316] shadow-xl" : "opacity-90"
                  }`}
                >
                  {/* Image with smooth hover scale */}
                  <SmartImage
                    src={dest.image}
                    alt={dest.alt}
                    wrapperClassName="aspect-[16/10] w-full"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Card Content with Typewriter Header */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="badge-mono badge-mono-orange">Best For: {dest.bestFor}</span>
                      <span className="font-mono text-xs font-bold text-[#F97316]">
                        DESTINATION 0{idx + 1}
                      </span>
                    </div>

                    {/* Animated Typewriter Title */}
                    <h3 className="font-[#Plus_Jakarta_Sans] text-2xl sm:text-3xl font-bold text-[#102A43] min-h-[40px]">
                      {isSelected ? (
                        <TypewriterText text={dest.name} speed={35} />
                      ) : (
                        <span>{dest.name}</span>
                      )}
                    </h3>

                    {/* Description Copy */}
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {isSelected ? (
                        <TypewriterText text={dest.description} speed={15} />
                      ) : (
                        <span>{dest.description}</span>
                      )}
                    </p>

                    <div className="pt-4 border-t border-[#E7E2DA] flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => {
                          const msg = `Hello Smiling Journey! I am interested in exploring customized tour packages for ${dest.name}. Please share details.`;
                          window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
                        }}
                        className="btn btn-primary text-sm"
                      >
                        <MessageSquare size={16} />
                        <span>Inquire About {dest.name}</span>
                      </button>

                      <button onClick={openPlanner} className="btn btn-secondary text-sm">
                        <span>Plan Custom Trip</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. FEATURED PACKAGES SECTION
 * Sanity.io geometric card layout featuring verified highlights, duration badges, and direct WhatsApp CTAs.
 */
/**
 * 3. FEATURED PACKAGES SECTION
 * Sanity.io geometric card layout featuring verified highlights, duration badges, and direct WhatsApp CTAs.
 */
function FeaturedPackagesSection({ openPlanner }: OutletCtx) {
  return (
    <section id="packages" className="py-16 lg:py-24 bg-[#F9F8F6] border-b border-[#E7E2DA]">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge-mono badge-mono-orange mb-3">Popular Journeys</span>
            <h2 className="heading-lg text-[#102A43]">
              <TypewriterText text="Popular packages, ready to personalize" speed={30} />
            </h2>
          </div>

          <Link to="/packages" className="btn btn-secondary justify-self-start">
            <span>View All Packages</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, idx) => (
            <motion.article
              key={pkg.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="sanity-card group bg-white border border-[#E7E2DA] hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Wrapper */}
                <div className="relative overflow-hidden aspect-[16/10] w-full">
                  <SmartImage
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    wrapperClassName="h-full w-full"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    <span className="badge-mono bg-[#102A43] text-white border-transparent shadow-sm">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <span className="badge-mono badge-mono-orange text-[0.65rem]">{pkg.category}</span>

                  <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43] group-hover:text-[#F97316] transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {pkg.summary}
                  </p>

                  {/* Highlights List */}
                  <div className="pt-3 border-t border-[#E7E2DA] space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      Verified Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                      {pkg.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="text-[#F97316] font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="btn btn-secondary text-xs w-full justify-center"
                  >
                    Details
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
                  className="w-full text-center text-xs font-mono font-bold text-slate-500 hover:text-[#F97316] pt-1 transition-colors"
                >
                  + Customize Itinerary
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 4. SERVICES SECTION
 * Structured 2x3 grid showcasing complete travel support services.
 * Enhanced with scroll entry, top border orange accents, and hover elevation.
 */
function ServicesSection() {
  const serviceIcons = [Compass, Plane, Car, Camera, Users, Headphones];

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#FFFDF8] border-b border-[#E7E2DA]">
      <div className="container-page">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-mono badge-mono-orange">Comprehensive Travel Support</span>
          <h2 className="heading-lg text-[#102A43]">
            <TypewriterText text="Everything your journey needs, in one place" speed={30} />
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">
            We handle flights, comfortable stays, local cab transfers, and customized sightseeing so you can focus entirely on enjoying your trip.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, description], idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className="sanity-card group p-6 sm:p-8 bg-white border border-[#E7E2DA] border-t-4 border-t-[#F97316] hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-[#FFF3E6] border border-[#F97316]/30 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon size={24} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#F97316] bg-[#FFF3E6] px-2.5 py-1 rounded-md">
                      0{idx + 1} SERVICE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43] group-hover:text-[#F97316] transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E7E2DA] flex items-center justify-between text-xs font-mono font-bold text-[#F97316]">
                  <button
                    onClick={() => {
                      const msg = `Hello Smiling Journey! I would like to inquire about your "${title}" service. Please share details.`;
                      window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
                    }}
                    className="group-hover:translate-x-1 transition-transform flex items-center gap-1.5 hover:underline"
                  >
                    <span>Inquire About {title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 5. HOW IT WORKS SECTION
 * 4-stop interactive journey timeline from idea to itinerary.
 * Enhanced with staggered scroll entry animations and hover glows.
 */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Tell Us Your Plan",
      desc: "Share your destination preference, travel dates, starting city, and approximate budget.",
      icon: MapPin,
    },
    {
      num: "02",
      title: "Speak With a Travel Expert",
      desc: "Our team contacts you directly via WhatsApp or phone to understand your group's specific expectations.",
      icon: Phone,
    },
    {
      num: "03",
      title: "Receive a Personalized Plan",
      desc: "Review a proposed itinerary including recommended hotels, transport arrangements, and sightseeing.",
      icon: Calendar,
    },
    {
      num: "04",
      title: "Confirm and Start Your Journey",
      desc: "Finalize your booking with complete confidence and travel with continuous support from our team.",
      icon: Compass,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#102A43] text-white border-b border-[#334E68]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="max-w-2xl mb-14 space-y-3">
          <span className="badge-mono badge-mono-dark">Simple Process</span>
          <h2 className="heading-lg text-white">
            <TypewriterText text="From idea to itinerary in 4 steps" speed={30} />
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Planning a memorable trip doesn&apos;t have to be complicated. Here is how we build your holiday experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
                className="bg-white/10 border border-white/20 hover:border-[#FBBF24]/60 p-6 rounded-xl space-y-4 shadow-lg backdrop-blur-sm transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#FBBF24] group-hover:scale-110 transition-transform">
                    {step.num}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold !text-white group-hover:text-[#FBBF24] transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-200 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 6. ABOUT & TRUST SECTION
 * Highlighting human travel planning and verified trust points.
 */
function AboutTrustSection() {
  const trustPoints = [
    {
      title: "Personalized Planning",
      desc: "Recommendations are based on your actual dates, group preferences, and realistic budget.",
    },
    {
      title: "Convenient Coordination",
      desc: "Discuss your requirements directly with our team through phone calls or WhatsApp messages.",
    },
    {
      title: "Flexible Packages",
      desc: "Begin with an existing package or request a completely customized itinerary.",
    },
    {
      title: "End-to-End Assistance",
      desc: "Receive help with accommodation, local transportation, sightseeing, and coordination.",
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#FFFDF8] border-b border-[#E7E2DA]">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Image with scroll entrance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="sanity-card-sharp overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <SmartImage
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                alt="Traveller overlooking a mountain valley"
                wrapperClassName="aspect-[4/3] lg:aspect-[5/6] w-full"
              />
            </div>
          </motion.div>

          {/* Right Column: Copy & Trust Grid */}
          <div className="lg:col-span-7 space-y-6">
            <span className="badge-mono badge-mono-orange">About Smiling Journey</span>

            <h2 className="heading-lg text-[#102A43]">
              <TypewriterText text="Thoughtful travel planning, made personal" speed={30} />
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Smiling Journey is a travel agency serving customers looking for reliable domestic and international travel solutions. From family holidays and romantic escapes to group tours and customized itineraries, our team helps travellers plan experiences around their needs and budgets.
              </p>
              <p>
                We bring flights, stays, transportation, sightseeing, and travel assistance together so customers can spend less time coordinating and more time looking forward to their journey.
              </p>
            </div>

            {/* Mission Statement Box */}
            <div className="p-4 rounded-lg bg-[#FFF3E6] border border-[#F97316]/30 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#F97316] uppercase tracking-wider block mb-1">
                OUR MISSION STATEMENT
              </span>
              <p className="font-[#Plus_Jakarta_Sans] font-bold text-[#102A43] text-sm sm:text-base">
                &quot;To deliver genuine value, dependable service, and memorable travel experiences for every customer.&quot;
              </p>
            </div>

            {/* 4 Trust Points Grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {trustPoints.map((tp, idx) => (
                <motion.div
                  key={tp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 rounded-lg border border-[#E7E2DA] bg-white space-y-1.5 shadow-sm hover:border-[#F97316]/50 hover:shadow-md transition-all"
                >
                  <h3 className="font-[#Plus_Jakarta_Sans] text-base font-bold text-[#102A43]">
                    {tp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tp.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 7. TESTIMONIAL SECTION
 * Interactive Google Reviews Showcase featuring 5-star ratings, traveller quotes, and direct Google Review link.
 */
function TestimonialSection() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const currentReview = testimonials[activeReviewIndex];

  return (
    <section className="py-16 lg:py-24 bg-[#F9F8F6] border-b border-[#E7E2DA]">
      <div className="container-page">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="badge-mono badge-mono-orange mx-auto">
            <Star size={13} className="text-[#FBBF24] fill-current" />
            Verified Google Reviews
          </span>
          <h2 className="heading-lg text-[#102A43]">
            <TypewriterText text="Stories from happy travellers" speed={30} />
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Read real feedback from families, couples, and group travellers who planned their trips with Smiling Journey.
          </p>
        </div>

        {/* Featured Main Review Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="sanity-card bg-white p-8 sm:p-10 border border-[#E7E2DA] shadow-xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Stars */}
            <div className="flex justify-center text-[#FBBF24] gap-1">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-[#Plus_Jakarta_Sans] text-lg sm:text-2xl font-bold text-[#102A43] leading-relaxed italic">
              &quot;{currentReview.quote}&quot;
            </blockquote>

            {/* Reviewer Details */}
            <div className="pt-4 border-t border-[#E7E2DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#102A43] text-white flex items-center justify-center font-bold text-sm">
                  {currentReview.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="font-bold text-sm text-[#102A43] block">
                    {currentReview.name}
                  </span>
                  <span className="text-slate-500 font-normal">{currentReview.trip}</span>
                </div>
              </div>

              <a
                href="https://share.google/cizhmXKXZKJzJuJxU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF3E6] text-[#F97316] font-bold hover:bg-[#F97316] hover:text-white transition-colors"
              >
                <span>{currentReview.source}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Review Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {testimonials.map((t, idx) => {
            const isActive = activeReviewIndex === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveReviewIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-[#102A43] text-white ring-2 ring-[#F97316] shadow-sm"
                    : "bg-white text-slate-700 border border-[#E7E2DA] hover:border-[#102A43]"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isActive ? "bg-[#FBBF24]" : "bg-[#F97316]"}`} />
                <span>{t.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 8. FINAL HOME CTA SECTION
 * High-impact banner with dual WhatsApp and call actions.
 */
function FinalCTASection({ openPlanner }: OutletCtx) {
  return (
    <section className="py-16 lg:py-24 bg-[#581C57] text-white relative overflow-hidden">
      <div className="container-page relative z-10 text-center space-y-8 max-w-3xl">
        <span className="badge-mono badge-mono-dark mx-auto">Start Your Holiday Today</span>

        <h2 className="heading-lg text-white">
          Your destination can wait. Your plan doesn&apos;t have to.
        </h2>

        <p className="text-slate-200 leading-relaxed text-base sm:text-lg">
          Share a few details and let Smiling Journey help turn your travel idea into a personalized itinerary.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button onClick={openPlanner} className="btn btn-primary text-base px-6 py-3 shadow-xl">
            <MessageSquare size={18} />
            <span>Plan My Trip</span>
          </button>

          <button
            onClick={() => {
              const msg = "Hello Smiling Journey! I would like to start planning my travel itinerary on WhatsApp.";
              window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
            }}
            className="btn btn-secondary text-base px-6 py-3"
          >
            <MessageSquare size={18} className="text-[#F97316]" />
            <span>WhatsApp Quick Chat</span>
          </button>

          <a
            href={`tel:${business.primaryPhone}`}
            className="btn btn-outline-dark text-base px-6 py-3"
          >
            <Phone size={18} className="text-[#FBBF24]" />
            <span>Call {business.primaryPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
