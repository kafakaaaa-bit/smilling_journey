import { useState } from "react";
import { ArrowRight, Compass, MapPin, Calendar, Users, DollarSign, MessageSquare } from "lucide-react";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import type { PlannerValues } from "../../schemas/plannerSchema";

const MOODS = [
  "Mountains",
  "Beach",
  "Adventure",
  "Family",
  "Honeymoon",
  "Spiritual",
  "Wildlife",
  "International",
];

interface HeroQuickPlannerProps {
  onFullPlannerOpen?: () => void;
}

/**
 * Hero Section Quick Trip Planner Card (per design.md Section 9.2)
 * High-contrast Sanity.io styled card allowing visitors to instantly select trip options
 * and submit directly to WhatsApp.
 */
export function HeroQuickPlanner({ onFullPlannerOpen }: HeroQuickPlannerProps) {
  const [mode, setMode] = useState<"known" | "choose">("known");
  const [startingCity, setStartingCity] = useState("Delhi");
  const [destination, setDestination] = useState("Kashmir");
  const [mood, setMood] = useState("Mountains");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [budget, setBudget] = useState("Standard (₹20k - ₹40k)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: PlannerValues =
      mode === "known"
        ? {
            mode: "known",
            startingCity: startingCity || "New Delhi",
            destination: destination || "Kashmir",
            departureDate: departureDate || "Flexible",
            returnDate: "As per itinerary",
            adults: Number(adults) || 2,
            children: 0,
            budget: budget || "Standard",
            name: "Traveler",
            phone: "+91",
            consent: true,
            notes: "Submitted via Hero Quick Planner",
          }
        : {
            mode: "choose",
            startingCity: startingCity || "New Delhi",
            mood: mood || "Mountains",
            departureDate: departureDate || "Flexible",
            returnDate: "As per itinerary",
            adults: Number(adults) || 2,
            children: 0,
            budget: budget || "Standard",
            name: "Traveler",
            phone: "+91",
            consent: true,
            notes: "Submitted via Hero Quick Planner",
          };

    const targetDestination = mode === "known" ? data.destination : data.mood;
    const message = [
      "Hello Smiling Journey! I would like help planning a trip.",
      "",
      `Trip type: ${mode === "known" ? "I Know My Destination" : "Help Me Choose"}`,
      `Starting city: ${data.startingCity}`,
      `Destination or Preference: ${targetDestination}`,
      `Travel date: ${data.departureDate}`,
      `Travellers: ${data.adults} Adults`,
      `Budget range: ${data.budget}`,
      "",
      "Please share sample itineraries and custom package options!",
    ].join("\n");

    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="sanity-card-sharp bg-white p-5 sm:p-6 text-[#102A43] shadow-xl relative overflow-hidden">
      {/* Sanity Header Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-[#E7E2DA] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#F97316] animate-pulse" />
          <span className="badge-mono badge-mono-orange">Instant Trip Planner</span>
        </div>
        <span className="text-xs font-mono font-medium text-slate-500 hidden sm:inline">No Payment Required</span>
      </div>

      {/* Mode Selector Segment Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F3F0E9] rounded-md mb-5 border border-[#E7E2DA]">
        <button
          type="button"
          onClick={() => setMode("known")}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-bold rounded transition-all ${
            mode === "known"
              ? "bg-[#102A43] text-white shadow-sm"
              : "text-[#334E68] hover:text-[#102A43]"
          }`}
        >
          <MapPin size={14} className={mode === "known" ? "text-[#F97316]" : ""} />
          <span>I Know Destination</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("choose")}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-bold rounded transition-all ${
            mode === "choose"
              ? "bg-[#102A43] text-white shadow-sm"
              : "text-[#334E68] hover:text-[#102A43]"
          }`}
        >
          <Compass size={14} className={mode === "choose" ? "text-[#FBBF24]" : ""} />
          <span>Help Me Choose</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Starting City Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#F97316]" />
              <span>Starting From</span>
            </label>
            <input
              type="text"
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. Delhi, Mumbai, Lucknow"
              className="field !min-h-[42px] !py-2 text-sm"
              required
            />
          </div>

          {/* Dynamic Destination vs Mood */}
          <div>
            {mode === "known" ? (
              <>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
                  <Compass size={13} className="text-[#F97316]" />
                  <span>Target Destination</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kashmir, Rajasthan, Goa"
                  className="field !min-h-[42px] !py-2 text-sm"
                  required
                />
              </>
            ) : (
              <>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
                  <Compass size={13} className="text-[#FBBF24]" />
                  <span>Travel Mood</span>
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="field !min-h-[42px] !py-2 text-sm bg-white"
                >
                  {MOODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {/* Departure Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
              <Calendar size={13} className="text-[#38BDF8]" />
              <span>Travel Date</span>
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="field !min-h-[42px] !py-1.5 text-xs bg-white"
            />
          </div>

          {/* Travellers */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
              <Users size={13} className="text-[#F97316]" />
              <span>Adults</span>
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="field !min-h-[42px] !py-1.5 text-xs bg-white"
            >
              <option value="1">1 Person (Solo)</option>
              <option value="2">2 Adults (Couple)</option>
              <option value="3">3 - 4 Adults</option>
              <option value="5">5+ (Family/Group)</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#334E68] mb-1.5 flex items-center gap-1.5">
              <DollarSign size={13} className="text-[#FBBF24]" />
              <span>Budget</span>
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="field !min-h-[42px] !py-1.5 text-xs bg-white"
            >
              <option value="Budget (Below ₹20k)">Below ₹20,000</option>
              <option value="Standard (₹20k - ₹40k)">₹20k - ₹40k / person</option>
              <option value="Premium (₹40k - ₹80k)">₹40k - ₹80k / person</option>
              <option value="Luxury (₹80k+)">Luxury (₹80k+)</option>
            </select>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="btn btn-primary w-full sm:flex-1 justify-center text-sm font-bold shadow-md"
          >
            <MessageSquare size={16} />
            <span>Plan My Trip on WhatsApp</span>
          </button>

          {onFullPlannerOpen && (
            <button
              type="button"
              onClick={onFullPlannerOpen}
              className="btn btn-secondary w-full sm:w-auto text-xs justify-center py-2.5"
            >
              <span>Custom Notes</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
