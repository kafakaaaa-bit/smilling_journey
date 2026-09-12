import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageSquare, Phone, Send, X, ArrowUpRight, ShieldCheck, MapPin, Mail } from "lucide-react";
import { business } from "../../config/business";
import { navItems } from "../../config/navigation";
import { Logo } from "../ui/Logo";
import { TripPlannerDialog } from "../planner/TripPlannerDialog";

/**
 * Main Layout Shell Component
 * Integrates responsive navigation header, mobile slide-over menu,
 * persistent mobile quick CTA bar, and Sanity.io inspired footer.
 */
export function Layout() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll to hash target or top of page on route navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ block: "start", behavior: "smooth" });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  // Track window scroll state for compact header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#102A43]">
      {/* WCAG Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Header Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 border-b border-[#E7E2DA] ${
          scrolled ? "bg-[#FFFDF8]/95 backdrop-blur-md shadow-sm py-3" : "bg-[#FFFDF8] py-4"
        }`}
      >
        <div className="container-page flex items-center justify-between gap-4">
          {/* Logo Lockup */}
          <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] rounded-md">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-[#F97316] bg-[#FFF3E6]"
                      : "text-[#334E68] hover:text-[#102A43] hover:bg-[#F3F0E9]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${business.primaryPhone}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#102A43] hover:text-[#F97316] px-3 py-2 transition-colors"
            >
              <Phone size={15} className="text-[#F97316]" />
              <span>{business.primaryPhone}</span>
            </a>
            
            <button
              onClick={() => setPlannerOpen(true)}
              className="btn btn-primary"
            >
              <span>Plan My Trip</span>
              <Send size={15} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setPlannerOpen(true)}
              className="btn btn-primary !min-h-[40px] !px-3 !py-1.5 text-xs"
              aria-label="Plan My Trip"
            >
              <Send size={14} />
              <span>Plan</span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="btn btn-secondary !min-h-[40px] !w-[40px] !p-0"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[#102A43]/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Menu Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-[#102A43] text-white shadow-2xl flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <Logo variant="light" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
                  <span className="badge-mono badge-mono-dark mb-2">Navigation Menu</span>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 text-lg font-bold text-slate-100 hover:text-[#FBBF24] hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between border-b border-white/5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={18} className="text-slate-400" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                  <div className="badge-mono badge-mono-dark mb-2">Quick Contact</div>
                  <a
                    href={`tel:${business.primaryPhone}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-sm font-semibold"
                  >
                    <Phone size={18} className="text-[#F97316]" />
                    <span>{business.primaryPhone}</span>
                  </a>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setPlannerOpen(true);
                    }}
                    className="btn btn-primary w-full justify-center text-base"
                  >
                    <Send size={18} />
                    <span>Plan My Trip on WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Page Body Container */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet context={{ openPlanner: () => setPlannerOpen(true) }} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sanity-Inspired High-Contrast Footer */}
      <footer className="bg-[#102A43] text-white border-t border-[#334E68]/40 pt-16 pb-24 md:pb-16 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none" />

        <div className="container-page relative z-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <Logo variant="light" />
              <p className="text-sm text-slate-300 leading-relaxed font-sans mt-4">
                Smiling Journey creates customized domestic and international travel packages tailored to your schedule, preferences, and budget.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-white/15 text-xs font-mono text-slate-200">
                <ShieldCheck size={14} className="text-[#FBBF24]" />
                <span>Verified Travel Planner</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h3 className="font-[#Plus_Jakarta_Sans] text-sm font-bold uppercase tracking-wider text-[#FBBF24] mb-4">
                Explore Packages
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="hover:text-white transition-colors hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Legal & Support Policies */}
            <div>
              <h3 className="font-[#Plus_Jakarta_Sans] text-sm font-bold uppercase tracking-wider text-[#FBBF24] mb-4">
                Legal & Support
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link to="/privacy-policy" className="hover:text-white transition-colors hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="hover:text-white transition-colors hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/cancellation-and-refund-policy" className="hover:text-white transition-colors hover:underline">
                    Cancellation & Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Verified Contact */}
            <div>
              <h3 className="font-[#Plus_Jakarta_Sans] text-sm font-bold uppercase tracking-wider text-[#FBBF24] mb-4">
                Contact Office
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Phone size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    <a href={`tel:${business.primaryPhone}`} className="hover:text-white block font-medium">
                      {business.primaryPhone}
                    </a>
                    <a href={`tel:${business.secondaryPhone}`} className="hover:text-white block text-xs text-slate-400">
                      {business.secondaryPhone}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[#F97316] shrink-0" />
                  <a href={`mailto:${business.email}`} className="hover:text-white font-medium">
                    {business.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-tight">
                    {business.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright & Disclaimer Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Smiling Journey. All rights reserved.</p>
            <p className="font-mono text-[0.7rem]">Designed with Sanity.io Tech Precision</p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick Action Button on Mobile */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden flex items-center gap-2">
        <button
          onClick={() => setPlannerOpen(true)}
          className="btn btn-primary shadow-xl !px-4 !py-3 rounded-full flex items-center gap-2 text-sm"
          aria-label="Open Trip Planner"
        >
          <MessageSquare size={18} />
          <span className="font-bold">Plan Trip</span>
        </button>
      </div>

      {/* Global Interactive Trip Planner Dialog Modal */}
      <TripPlannerDialog open={plannerOpen} onClose={() => setPlannerOpen(false)} />
    </div>
  );
}
