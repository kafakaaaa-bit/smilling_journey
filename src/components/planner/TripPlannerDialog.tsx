import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Compass,
  ExternalLink,
  MapPin,
  MessageSquare,
  Mountain,
  Palmtree,
  Send,
  ShieldCheck,
  Trees,
  User,
  Users,
  X,
} from "lucide-react";
import { plannerSchema, type PlannerValues } from "../../schemas/plannerSchema";
import { submitTripLead } from "../../services/leadService";
import { buildTripMessage, buildWhatsAppUrl } from "../../utils/whatsapp";

const VIBES = [
  { label: "Mountains", icon: Mountain, desc: "Quiet peaks & valleys" },
  { label: "Beach", icon: Palmtree, desc: "Ocean relaxation & coast" },
  { label: "City", icon: Building2, desc: "Urban sights & culture" },
  { label: "Nature", icon: Trees, desc: "Green landscapes & wildlife" },
];

const BUDGET_OPTIONS = [
  "Budget (Below ₹20,000 / person)",
  "Standard (₹20,000 - ₹40,000 / person)",
  "Premium (₹40,000 - ₹80,000 / person)",
  "Luxury (₹80,000+ / person)",
];

const fieldsByStep: Record<number, (keyof PlannerValues)[]> = {
  0: ["mode"],
  1: ["startingCity", "departureDate", "returnDate", "adults", "children", "budget", "destination", "mood"],
  2: ["name", "email", "phone", "consent"],
};

// Framer Motion Cascade Animation Variants (Top-Down Staggered Entry)
const cascadeContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cascadeItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

interface TripPlannerDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Refined Multi-Step "Request Personalized Itinerary" Dialog Component
 * Strictly aligned to shared vertical grid boundaries with staggered cascade entry animations,
 * sticky step tabs, title fade on scroll, and radio pulse ripple effects.
 */
export function TripPlannerDialog({ open, onClose }: TripPlannerDialogProps) {
  const [step, setStep] = useState(0);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [titleOpacity, setTitleOpacity] = useState(1);
  
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    trigger,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlannerValues>({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      mode: "known",
      startingCity: "Delhi",
      destination: "Kashmir",
      mood: "Mountains",
      adults: 2,
      children: 0,
      budget: "Standard (₹20,000 - ₹40,000 / person)",
      consent: true,
    },
  });

  const mode = useWatch({ control, name: "mode" });
  const selectedMood = useWatch({ control, name: "mood" });

  // Handle body overflow lock & keydown handlers
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Phase 2: Mobile Scroll Title Fade/Slide Observer
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollTop = scrollContainerRef.current.scrollTop;
    // Fade out title as it scrolls up under the sticky tab bar
    const newOpacity = Math.max(0, 1 - scrollTop / 60);
    setTitleOpacity(newOpacity);
  };

  if (!open) return null;

  const handleNextStep = async () => {
    const isStepValid = await trigger(fieldsByStep[step]);
    if (isStepValid) {
      setStep((current) => Math.min(current + 1, 3));
      // Reset scroll position on step change
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handlePrevStep = () => {
    setStep((current) => Math.max(0, current - 1));
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    await submitTripLead(data);

    const textPayload = buildTripMessage(data);
    const whatsappUrl = buildWhatsAppUrl(textPayload);

    setSubmittedMessage(textPayload);
    setSubmittedWhatsAppUrl(whatsappUrl);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  const handleResetForm = () => {
    reset();
    setStep(0);
    setSubmittedWhatsAppUrl(null);
    setSubmittedMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#102A43]/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="planner-dialog-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white border border-[#E7E2DA] rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header Bar - Strict Grid Alignment (Padding px-6 sm:px-8) */}
        <div className="px-6 sm:px-8 py-5 bg-[#FFFDF8] border-b border-[#E7E2DA] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#FFF3E6] border border-[#F97316]/30 flex items-center justify-center text-[#F97316] shrink-0">
              <Send size={18} />
            </div>
            <div>
              <span className="badge-mono badge-mono-orange text-[0.65rem]">TRIP PLANNER</span>
              <h2 id="planner-dialog-title" className="font-[#Plus_Jakarta_Sans] text-lg font-bold text-[#102A43]">
                Request Personalized Itinerary
              </h2>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="btn btn-secondary !h-9 !w-9 !p-0 rounded-lg text-slate-500 hover:text-[#102A43] shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="px-6 sm:px-8 py-6 overflow-y-auto flex-1 relative"
        >
          {submittedWhatsAppUrl ? (
            /* Submission Success State */
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-[#102A43] text-[#FBBF24] flex items-center justify-center shadow-lg">
                <Check size={28} />
              </div>

              <div className="space-y-2">
                <h3 className="font-[#Plus_Jakarta_Sans] text-2xl font-bold text-[#102A43]">
                  Your Request is Formatted!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  We have generated your URL-encoded WhatsApp Click-to-Chat payload.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-6 py-3 shadow-lg"
                >
                  <MessageSquare size={18} />
                  <span>Send on WhatsApp</span>
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="text-left bg-[#F3F0E9] border border-[#E7E2DA] rounded-lg p-4 font-mono text-xs text-[#102A43] space-y-2">
                <div className="flex items-center justify-between text-slate-500 font-bold border-b border-[#E7E2DA] pb-2 mb-2">
                  <span>URL-Encoded WhatsApp Payload</span>
                  <ShieldCheck size={14} className="text-[#F97316]" />
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">{submittedMessage}</pre>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button type="button" onClick={handleResetForm} className="btn btn-secondary text-xs">
                  Create Another Request
                </button>
                <button type="button" onClick={onClose} className="btn btn-navy text-xs">
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Form with Phase 1 Staggered Entry Animation */
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Phase 2 Sticky Step Progress Bar (Sticks cleanly at top of scroll container) */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-1 pb-3 -mt-1">
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[
                    { label: "Style", idx: 0 },
                    { label: "Details", idx: 1 },
                    { label: "Contact", idx: 2 },
                    { label: "Review", idx: 3 },
                  ].map((s) => (
                    <div
                      key={s.idx}
                      className={`py-1.5 px-2 rounded text-center font-mono text-[0.65rem] font-bold border transition-colors ${
                        s.idx === step
                          ? "bg-[#102A43] text-white border-[#102A43]"
                          : s.idx < step
                          ? "bg-[#FFF3E6] text-[#F97316] border-[#F97316]/30"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      0{s.idx + 1} {s.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 01: STYLE */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  variants={cascadeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  {/* Step Title (Dynamic Fade out on Mobile Scroll) */}
                  <motion.div
                    variants={cascadeItemVariants}
                    style={{ opacity: titleOpacity }}
                    className="space-y-1 transition-opacity duration-200"
                  >
                    <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                      Step 01: Select Your Trip Style
                    </h3>
                    <p className="text-xs text-slate-500">
                      Choose how you want to plan your travel experience.
                    </p>
                  </motion.div>

                  {/* Selection Cards Grid - Strict Vertical Alignment */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-1">
                    {/* Card 1: I Know My Destination */}
                    <motion.button
                      type="button"
                      variants={cascadeItemVariants}
                      whileHover={{ scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setValue("mode", "known")}
                      className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                        mode === "known"
                          ? "border-[#F97316] bg-[#FFF3E6]/40 shadow-lg ring-1 ring-[#F97316]/20"
                          : "border-[#E7E2DA] bg-white hover:border-[#102A43]"
                      }`}
                    >
                      {/* Top Row: Icon on Left, Radio Button on Right */}
                      <div className="flex items-center justify-between w-full">
                        <div className="h-10 w-10 rounded-lg bg-[#FFF3E6] border border-[#F97316]/30 flex items-center justify-center text-[#F97316] shrink-0">
                          <MapPin size={22} />
                        </div>

                        {/* Radio Icon with Phase 3 Ripple Pulse Animation when Selected */}
                        <div className="relative flex items-center justify-center shrink-0">
                          {mode === "known" && (
                            <motion.span
                              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute h-6 w-6 rounded-full bg-[#F97316]/40 pointer-events-none"
                            />
                          )}
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              mode === "known" ? "border-[#F97316] bg-[#F97316]" : "border-slate-300 bg-white"
                            }`}
                          >
                            {mode === "known" && <span className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                      {/* Content Stack */}
                      <div className="mt-4 space-y-1.5">
                        <span className="block font-[#Plus_Jakarta_Sans] font-bold text-lg text-[#102A43]">
                          I Know My Destination
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Share your specific destination (e.g. Kashmir, Rajasthan, Goa, Dubai) and dates.
                        </p>
                      </div>
                    </motion.button>

                    {/* Card 2: Help Me Choose */}
                    <motion.button
                      type="button"
                      variants={cascadeItemVariants}
                      whileHover={{ scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setValue("mode", "choose")}
                      className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                        mode === "choose"
                          ? "border-[#FBBF24] bg-[#FFFDF8] shadow-lg ring-1 ring-[#FBBF24]/30"
                          : "border-[#E7E2DA] bg-white hover:border-[#102A43]"
                      }`}
                    >
                      {/* Top Row: Icon on Left, Radio Button on Right */}
                      <div className="flex items-center justify-between w-full">
                        <div className="h-10 w-10 rounded-lg bg-[#FFFDF8] border border-[#FBBF24]/40 flex items-center justify-center text-[#FBBF24] shrink-0">
                          <Compass size={22} />
                        </div>

                        {/* Radio Icon with Phase 3 Ripple Pulse Animation when Selected */}
                        <div className="relative flex items-center justify-center shrink-0">
                          {mode === "choose" && (
                            <motion.span
                              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute h-6 w-6 rounded-full bg-[#FBBF24]/50 pointer-events-none"
                            />
                          )}
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              mode === "choose" ? "border-[#FBBF24] bg-[#FBBF24]" : "border-slate-300 bg-white"
                            }`}
                          >
                            {mode === "choose" && <span className="h-2 w-2 rounded-full bg-[#102A43]" />}
                          </div>
                        </div>
                      </div>

                      {/* Content Stack */}
                      <div className="mt-4 space-y-1.5">
                        <span className="block font-[#Plus_Jakarta_Sans] font-bold text-lg text-[#102A43]">
                          Help Me Choose
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Select a vibe (Mountains, Beach, City, Nature), travel dates, and budget range.
                        </p>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 02: DETAILS (CONDITIONAL) */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={cascadeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={cascadeItemVariants} className="space-y-1">
                    <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                      Step 02: Trip Details ({mode === "known" ? "Specific Destination" : "Vibe Preference"})
                    </h3>
                    <p className="text-xs text-slate-500">
                      {mode === "known"
                        ? "Enter your specific destination, travel dates, and guest count."
                        : "Select your preferred travel vibe, dates, and budget range."}
                    </p>
                  </motion.div>

                  {mode === "known" ? (
                    /* Known Destination Branch */
                    <div className="grid gap-4 sm:grid-cols-2 pt-2">
                      <motion.div variants={cascadeItemVariants} className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                          <MapPin size={14} className="text-[#F97316]" />
                          <span>Specific Destination *</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kashmir, Ladakh, Maldives"
                          className="field"
                          {...register("destination")}
                        />
                        {errors.destination?.message && (
                          <p className="error-text">{errors.destination.message}</p>
                        )}
                      </motion.div>

                      <motion.div variants={cascadeItemVariants}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          <span>Starting City *</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Delhi, Mumbai"
                          className="field"
                          {...register("startingCity")}
                        />
                      </motion.div>

                      <motion.div variants={cascadeItemVariants}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                          <Users size={14} className="text-[#F97316]" />
                          <span>Guest Count (Adults) *</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          className="field bg-white"
                          {...register("adults", { valueAsNumber: true })}
                        />
                      </motion.div>

                      <motion.div variants={cascadeItemVariants}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                          <Calendar size={14} className="text-[#38BDF8]" />
                          <span>Start Date *</span>
                        </label>
                        <input type="date" className="field bg-white" {...register("departureDate")} />
                      </motion.div>

                      <motion.div variants={cascadeItemVariants}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                          <Calendar size={14} className="text-[#38BDF8]" />
                          <span>End Date *</span>
                        </label>
                        <input type="date" className="field bg-white" {...register("returnDate")} />
                      </motion.div>
                    </div>
                  ) : (
                    /* Help Me Choose Vibe Grid Branch */
                    <div className="space-y-4 pt-2">
                      <motion.div variants={cascadeItemVariants}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Select Travel Vibe *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {VIBES.map((vibe) => {
                            const Icon = vibe.icon;
                            const isSelected = selectedMood === vibe.label;
                            return (
                              <button
                                key={vibe.label}
                                type="button"
                                onClick={() => setValue("mood", vibe.label)}
                                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-[#102A43] text-white border-[#102A43] ring-2 ring-[#FBBF24]"
                                    : "bg-white text-slate-800 border-[#E7E2DA] hover:border-[#102A43]"
                                }`}
                              >
                                <Icon size={20} className={isSelected ? "text-[#FBBF24]" : "text-[#F97316]"} />
                                <div className="mt-2">
                                  <span className="font-bold text-sm block">{vibe.label}</span>
                                  <span className={`text-[0.65rem] block ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                                    {vibe.desc}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div variants={cascadeItemVariants}>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Start Date *
                          </label>
                          <input type="date" className="field bg-white" {...register("departureDate")} />
                        </motion.div>

                        <motion.div variants={cascadeItemVariants}>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            End Date *
                          </label>
                          <input type="date" className="field bg-white" {...register("returnDate")} />
                        </motion.div>

                        <motion.div variants={cascadeItemVariants} className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            Budget Range *
                          </label>
                          <select className="field bg-white" {...register("budget")}>
                            {BUDGET_OPTIONS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 03: CONTACT */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={cascadeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={cascadeItemVariants} className="space-y-1">
                    <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                      Step 03: Contact Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Provide your contact details so our team can send your custom proposal.
                    </p>
                  </motion.div>

                  <div className="grid gap-4 sm:grid-cols-2 pt-2">
                    <motion.div variants={cascadeItemVariants}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                        <User size={14} className="text-[#F97316]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Shraddha Chaudhary"
                        className="field"
                        {...register("name")}
                      />
                      {errors.name?.message && (
                        <p className="error-text">{errors.name.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={cascadeItemVariants}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                        <MessageSquare size={14} className="text-[#38BDF8]" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="field"
                        {...register("email")}
                      />
                      {errors.email?.message && (
                        <p className="error-text">{errors.email.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={cascadeItemVariants} className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                        <Send size={14} className="text-[#F97316]" />
                        <span>Phone / WhatsApp Number *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 8896572181"
                        className="field"
                        {...register("phone")}
                      />
                      {errors.phone?.message && (
                        <p className="error-text">{errors.phone.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={cascadeItemVariants} className="sm:col-span-2 pt-2">
                      <label className="flex items-start gap-3 p-3.5 rounded-lg border border-[#E7E2DA] bg-[#FFFDF8] cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-[#F97316] rounded"
                          {...register("consent")}
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I agree that Smiling Journey may contact me via WhatsApp or call regarding this itinerary enquiry.
                        </span>
                      </label>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* STEP 04: REVIEW */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={cascadeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={cascadeItemVariants} className="space-y-1">
                    <h3 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                      Step 04: Review Summary
                    </h3>
                    <p className="text-xs text-slate-500">
                      Confirm your trip request details before opening WhatsApp.
                    </p>
                  </motion.div>

                  <motion.div variants={cascadeItemVariants} className="bg-[#FFFDF8] border border-[#E7E2DA] rounded-lg p-5 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-[#E7E2DA] pb-2">
                      <span className="text-slate-500 font-mono text-xs">TRIP STYLE</span>
                      <span className="font-bold">{mode === "known" ? "I Know My Destination" : "Help Me Choose"}</span>
                    </div>

                    <div className="flex justify-between border-b border-[#E7E2DA] pb-2">
                      <span className="text-slate-500 font-mono text-xs">
                        {mode === "known" ? "DESTINATION" : "TRAVEL VIBE"}
                      </span>
                      <span className="font-bold text-[#F97316]">
                        {mode === "known"
                          ? useWatch({ control, name: "destination" })
                          : useWatch({ control, name: "mood" })}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#E7E2DA] pb-2">
                      <span className="text-slate-500 font-mono text-xs">TRAVEL DATES</span>
                      <span className="font-bold">
                        {useWatch({ control, name: "departureDate" })} to {useWatch({ control, name: "returnDate" })}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#E7E2DA] pb-2">
                      <span className="text-slate-500 font-mono text-xs">GUESTS & BUDGET</span>
                      <span className="font-bold">
                        {useWatch({ control, name: "adults" })} Guests · {useWatch({ control, name: "budget" })}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-[#E7E2DA] pb-2">
                      <span className="text-slate-500 font-mono text-xs">CONTACT NAME</span>
                      <span className="font-bold">{useWatch({ control, name: "name" })}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500 font-mono text-xs">WHATSAPP NUMBER</span>
                      <span className="font-bold">{useWatch({ control, name: "phone" })}</span>
                    </div>
                  </motion.div>

                  <motion.p variants={cascadeItemVariants} className="text-xs text-slate-500 leading-relaxed">
                    Clicking &quot;Submit on WhatsApp&quot; will format your details into a URL-encoded string and open WhatsApp Click-to-Chat link directly.
                  </motion.p>
                </motion.div>
              )}

              {/* Action Buttons - Aligned to padding grid */}
              <div className="pt-4 border-t border-[#E7E2DA] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={step === 0}
                  className="btn btn-secondary text-xs disabled:opacity-40"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                {step < 3 ? (
                  <button type="button" onClick={handleNextStep} className="btn btn-primary text-xs">
                    <span>Continue</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary text-sm font-bold shadow-lg"
                  >
                    <MessageSquare size={16} />
                    <span>{isSubmitting ? "Formatting..." : "Submit on WhatsApp"}</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
