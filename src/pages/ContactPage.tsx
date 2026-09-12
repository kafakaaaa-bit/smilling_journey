import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, MapPin, MessageSquare, Phone, Send, ShieldCheck } from "lucide-react";
import { business } from "../config/business";
import { contactSchema, type ContactValues } from "../schemas/contactSchema";
import { submitContactMessage } from "../services/contactService";
import { SEO } from "../components/ui/SEO";
import { buildWhatsAppUrl } from "../utils/whatsapp";

/**
 * Contact Page Component
 * High-contrast layout providing direct phone, email, and office contact cards
 * alongside a multi-field inquiry form with Zod validation.
 */
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: true,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Construct pre-filled WhatsApp lead message with all form fields
    const lines = [
      `Hello Smiling Journey! New contact inquiry submitted:`,
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Email: ${data.email}`,
      `• Enquiry Type: ${data.enquiryType}`,
    ];

    if (data.destination) lines.push(`• Target Destination: ${data.destination}`);
    if (data.dates) lines.push(`• Travel Dates: ${data.dates}`);
    if (data.message) lines.push(`• Message: ${data.message}`);

    const whatsappUrl = buildWhatsAppUrl(lines.join("\n"));
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    await submitContactMessage(data);
    setSubmitted(true);
  });

  return (
    <>
      <SEO
        title="Contact Us & Travel Consultation | Smiling Journey"
        description="Get in touch with Smiling Journey for customized holiday packages, flights, hotels, and travel assistance. Call +91 8896572181 or email info@smilingjourney.com."
        path="/contact"
      />

      <section className="py-12 sm:py-16 bg-[#FFFDF8] border-b border-[#E7E2DA]">
        <div className="container-page">
          {/* Header Banner */}
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="badge-mono badge-mono-orange">
              <MessageSquare size={13} className="text-[#F97316]" />
              Get In Touch
            </span>
            <h1 className="heading-display text-[#102A43]">
              Let’s plan something worth remembering
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Ask a question, request a package price quote, or tell us what kind of trip experience you have in mind.
            </p>
          </div>

          {/* 2-Column Contact Grid */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Direct Contact Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Phone Card */}
              <div className="sanity-card p-6 bg-white space-y-3">
                <div className="h-10 w-10 rounded-lg bg-[#FFF3E6] border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                  <Phone size={20} />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  PHONE CONTACT
                </span>
                <div className="space-y-1">
                  <a href={`tel:${business.primaryPhone}`} className="block font-[#Plus_Jakarta_Sans] font-bold text-lg text-[#102A43] hover:text-[#F97316]">
                    {business.primaryPhone}
                  </a>
                  <a href={`tel:${business.secondaryPhone}`} className="block font-mono text-xs text-slate-500 hover:text-[#102A43]">
                    {business.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="sanity-card p-6 bg-white space-y-3">
                <div className="h-10 w-10 rounded-lg bg-[#EAF7FF] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                  <Mail size={20} />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  EMAIL INQUIRIES
                </span>
                <a href={`mailto:${business.email}`} className="block font-[#Plus_Jakarta_Sans] font-bold text-lg text-[#102A43] hover:text-[#F97316]">
                  {business.email}
                </a>
              </div>

              {/* Office Address Card */}
              <div className="sanity-card p-6 bg-white space-y-3">
                <div className="h-10 w-10 rounded-lg bg-[#FFF3E6] border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                  <MapPin size={20} />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  OFFICE ADDRESS
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {business.address}
                </p>
              </div>

              {/* Instant WhatsApp Quick Link */}
              <div className="sanity-card-sharp p-6 bg-[#102A43] text-white space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#FBBF24]" />
                  <span className="font-mono text-xs font-bold text-[#FBBF24]">INSTANT WHATSAPP LEAD</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prefer discussing your travel plan directly on WhatsApp? Chat with our team now.
                </p>
                <button
                  onClick={() => {
                    const msg = "Hello Smiling Journey! I would like to inquire about tour packages and custom itineraries.";
                    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
                  }}
                  className="btn btn-primary w-full text-xs justify-center"
                >
                  <MessageSquare size={16} />
                  <span>Start WhatsApp Chat</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="sanity-card bg-white p-6 sm:p-8 border border-[#E7E2DA]">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="mx-auto h-14 w-14 rounded-full bg-[#102A43] text-[#FBBF24] flex items-center justify-center shadow-lg">
                      <Check size={28} />
                    </div>
                    <h2 className="font-[#Plus_Jakarta_Sans] text-2xl font-bold text-[#102A43]">
                      Enquiry Received!
                    </h2>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Smiling Journey. Our travel team will review your inquiry details and get back to you shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-secondary text-xs">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="border-b border-[#E7E2DA] pb-3">
                      <h2 className="font-[#Plus_Jakarta_Sans] text-xl font-bold text-[#102A43]">
                        Send Us A Message
                      </h2>
                      <p className="text-xs text-slate-500">
                        Fill out the form below to receive a personalized response.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input type="text" placeholder="Your Name" className="field" {...register("name")} />
                        {errors.name?.message && <p className="error-text">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input type="email" placeholder="name@example.com" className="field" {...register("email")} />
                        {errors.email?.message && <p className="error-text">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input type="tel" placeholder="+91 9876543210" className="field" {...register("phone")} />
                        {errors.phone?.message && <p className="error-text">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Enquiry Type *
                        </label>
                        <select className="field bg-white" {...register("enquiryType")}>
                          <option value="">Select type</option>
                          <option value="Custom trip">Custom trip planning</option>
                          <option value="Existing package">Existing package inquiry</option>
                          <option value="Flight or hotel">Flight or hotel booking</option>
                          <option value="Group travel">Group travel</option>
                          <option value="General enquiry">General inquiry</option>
                        </select>
                        {errors.enquiryType?.message && <p className="error-text">{errors.enquiryType.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Target Destination
                        </label>
                        <input type="text" placeholder="e.g. Kashmir, Rajasthan" className="field" {...register("destination")} />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Tentative Travel Dates
                        </label>
                        <input type="text" placeholder="e.g. Next month, Nov 15-22" className="field" {...register("dates")} />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Message / Travel Preferences *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us more about your trip requirements, number of travellers, hotel preferences, budget, etc."
                          className="field !min-h-[90px]"
                          {...register("message")}
                        />
                        {errors.message?.message && <p className="error-text">{errors.message.message}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#E7E2DA] bg-[#FFFDF8] cursor-pointer">
                          <input type="checkbox" className="mt-1 h-4 w-4 text-[#F97316] rounded" {...register("consent")} />
                          <span className="text-xs text-slate-600 leading-relaxed">
                            Smiling Journey may contact me regarding this enquiry.
                          </span>
                        </label>
                        {errors.consent?.message && <p className="error-text">{errors.consent.message}</p>}
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full justify-center text-sm font-bold shadow-lg">
                      <Send size={16} />
                      <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
