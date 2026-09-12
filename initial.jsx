import React, { useState, useEffect } from 'react';

// Reusable SVG Icons to keep the file self-contained
const MapPinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const PhoneIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
const PlaneIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.4 3.7c-.2.5.1 1.1.6 1.3L9 14l-4 4-3-1-2 2 5 5 2-2-1-3 4-4 2.1 6.1c.2.5.8.8 1.3.6l3.7-1.4c.5-.2.8-.6.7-1.1z"/></svg>
);
const CompassIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);
const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#FBBF24] flex items-center justify-center text-white font-bold text-xl relative overflow-hidden shadow-lg">
      SJ
      {/* Decorative sunburst effect */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-full scale-110"></div>
    </div>
    <div className="flex flex-col">
      <span className="font-extrabold text-[#581C57] text-xl leading-tight tracking-tight">Smiling</span>
      <span className="font-semibold text-[#102A43] text-sm leading-tight tracking-wide uppercase">Journey</span>
    </div>
  </div>
);

const GlobalStyles = () => (
  <style>{`
    :root {
      --color-primary: #F97316;
      --color-accent: #FBBF24;
      --color-brand-dark: #581C57;
      --color-ink: #102A43;
      --color-sky: #38BDF8;
      --color-background: #FFFDF8;
      --color-surface: #FFFFFF;
      --color-soft-orange: #FFF3E6;
      --color-soft-blue: #EAF7FF;
      --color-border: #E7E2DA;
    }
    
    body {
      background-color: var(--color-background);
      color: var(--color-ink);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Manrope', sans-serif;
      color: var(--color-ink);
    }
    
    .gradient-text {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-brand-dark) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
      color: white;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px 0 rgba(249, 115, 22, 0.39);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.23);
    }

    /* Subtle Cloud Animation for Hero */
    @keyframes floatClouds {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-clouds {
      animation: floatClouds 60s linear infinite;
    }

    /* Car Journey Animation */
    @keyframes driveCar {
      0% { transform: translateX(-20px) scaleX(1); opacity: 0; }
      10% { opacity: 1; }
      45% { transform: translateX(calc(50vw - 50px)) scaleX(1); }
      50% { transform: translateX(calc(50vw - 50px)) scaleX(-1); }
      90% { opacity: 1; }
      100% { transform: translateX(-20px) scaleX(-1); opacity: 0; }
    }
    .animate-car {
      animation: driveCar 15s ease-in-out infinite;
    }

    /* Image zoom on hover */
    .img-zoom-container { overflow: hidden; }
    .img-zoom-container img { transition: transform 0.5s ease; }
    .img-zoom-container:hover img { transform: scale(1.05); }

    /* Custom Form Input styling */
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border);
      background-color: var(--color-surface);
      transition: all 0.2s;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-soft-orange);
    }
  `}</style>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-[#F97316] transition-colors">Home</a>
          <a href="#packages" className="text-sm font-medium hover:text-[#F97316] transition-colors">Packages</a>
          <a href="#services" className="text-sm font-medium hover:text-[#F97316] transition-colors">Services</a>
          <a href="#about" className="text-sm font-medium hover:text-[#F97316] transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-[#F97316] transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://wa.me/918896572181" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-sm">+91 8896572181</span>
          </a>
          <button className="btn-primary px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2">
            Plan My Trip
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-[#102A43]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-4">
          <a href="#" className="block py-2 font-medium border-b border-gray-50">Home</a>
          <a href="#packages" className="block py-2 font-medium border-b border-gray-50">Packages</a>
          <a href="#services" className="block py-2 font-medium border-b border-gray-50">Services</a>
          <a href="https://wa.me/918896572181" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-3 rounded-lg font-medium mt-2">
            <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};

const TripPlanner = () => {
  const [activeTab, setActiveTab] = useState('known'); // 'known' or 'choose'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    mood: '',
    date: '',
    duration: '',
    adults: 2
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, destination, mood, date, duration, adults } = formData;
    
    // Construct WhatsApp Message
    let text = `Hello Smiling Journey! I would like help planning a trip.\n\n`;
    text += `*Name:* ${name}\n`;
    text += `*Phone:* ${phone}\n`;
    
    if (activeTab === 'known') {
      text += `*Type:* I Know My Destination\n`;
      text += `*Destination:* ${destination}\n`;
    } else {
      text += `*Type:* Help Me Choose\n`;
      text += `*Preferred Mood:* ${mood}\n`;
    }
    
    text += `*Travel Date:* ${date}\n`;
    text += `*Duration:* ${duration}\n`;
    text += `*Travellers:* ${adults} Adults\n`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918896572181?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-[#E7E2DA]">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F97316] to-[#FBBF24]"></div>
      
      <h3 className="text-2xl font-bold mb-2">Let's craft your itinerary</h3>
      <p className="text-gray-500 text-sm mb-6">Share a few details, and our experts will customize a plan just for you.</p>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
        <button 
          onClick={() => setActiveTab('known')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'known' ? 'bg-white shadow text-[#102A43]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          I Know My Destination
        </button>
        <button 
          onClick={() => setActiveTab('choose')}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'choose' ? 'bg-white shadow text-[#102A43]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Help Me Choose
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Your Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" name="name" required placeholder="John Doe" className="form-input pl-10" onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">WhatsApp Number</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className="form-input pl-10" onChange={handleChange} />
            </div>
          </div>
        </div>

        {activeTab === 'known' ? (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Where to?</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" name="destination" required placeholder="e.g., Kashmir, Kerala, Maldives" className="form-input pl-10" onChange={handleChange} />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Travel Mood</label>
            <div className="relative">
              <CompassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select name="mood" required className="form-input pl-10 appearance-none" onChange={handleChange}>
                <option value="">Select a vibe...</option>
                <option value="Mountains">Peaceful Mountains</option>
                <option value="Beach">Relaxing Beach</option>
                <option value="Adventure">Thrilling Adventure</option>
                <option value="Honeymoon">Romantic Honeymoon</option>
                <option value="Cultural">Cultural & Heritage</option>
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Travel Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="date" name="date" required className="form-input pl-10" onChange={handleChange} />
            </div>
          </div>
          <div className="md:col-span-1">
             <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Duration</label>
            <select name="duration" required className="form-input" onChange={handleChange}>
              <option value="">Select...</option>
              <option value="3-4 Days">3-4 Days</option>
              <option value="5-7 Days">5-7 Days</option>
              <option value="1 Week+">1 Week+</option>
            </select>
          </div>
          <div className="md:col-span-1">
             <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Adults</label>
             <input type="number" name="adults" min="1" defaultValue="2" required className="form-input" onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4">
          <WhatsAppIcon className="w-6 h-6" />
          Continue on WhatsApp
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">No payment required. We will review and contact you.</p>
      </form>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Scenic travel destination" 
          className="w-full h-full object-cover object-center"
        />
        {/* Complex overlay for better text readability and branding */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/90 via-[#102A43]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-[#581C57]/10 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-6 text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold tracking-widest uppercase mb-6 text-white">
              Domestic & International Experiences
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
              Where do you want your next <span className="text-[#FBBF24]">smile</span> to begin?
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              From peaceful mountain escapes to exciting international adventures, tell us what you have in mind and we'll shape the journey around you.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Personalized Itineraries
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-black/20 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Reliable Assistance
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:ml-auto">
            <TripPlanner />
          </div>

        </div>
      </div>

      {/* Decorative Route Animation overlaying bottom of hero */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-24 pointer-events-none opacity-50 hidden md:block">
         <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,80 Q300,20 600,60 T1200,80" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 10" className="opacity-30" />
            {/* Animated Car */}
            <g className="animate-car">
              <path d="M10,85 L20,85 L25,75 L45,75 L50,85 L60,85 L60,95 L10,95 Z" fill="#F97316"/>
              <circle cx="20" cy="95" r="4" fill="#102A43"/>
              <circle cx="50" cy="95" r="4" fill="#102A43"/>
              <path d="M28,78 L42,78 L45,85 L25,85 Z" fill="#EAF7FF"/>
            </g>
         </svg>
      </div>
    </section>
  );
};

const PopularDestinations = () => {
  const destinations = [
    { name: 'Kashmir', desc: 'Snow-covered landscapes & peaceful lakes.', bestFor: 'Couples · Families', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Kerala', desc: 'Tranquil backwaters & lush green hills.', bestFor: 'Nature · Relaxation', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop' },
    { name: 'Rajasthan', desc: 'Majestic forts, deserts & royal heritage.', bestFor: 'Culture · Photography', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
    { name: 'Himachal', desc: 'Adventure sports & scenic mountain passes.', bestFor: 'Adventure · Friends', img: 'https://images.unsplash.com/photo-1626621341517-bbf3e9990b2c?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <section className="py-20 bg-white" id="destinations">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find a journey that feels like you</h2>
          <p className="text-gray-600 text-lg">Explore traveller favourites or ask us to build something completely around your dates, interests, and budget.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white">
              <div className="h-48 overflow-hidden img-zoom-container relative">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{dest.name}</h3>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dest.desc}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#FFF3E6] text-[#F97316] text-xs font-semibold px-2 py-1 rounded-md">Best for:</span>
                  <span className="text-xs text-gray-500 font-medium">{dest.bestFor}</span>
                </div>
                <button className="text-[#581C57] font-semibold text-sm flex items-center gap-1 group-hover:text-[#F97316] transition-colors">
                  Explore {dest.name} <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPackages = () => {
  const packages = [
    { title: 'Fascinating Kashmir with Sonamarg', duration: '5 Nights · 6 Days', desc: 'Discover Kashmir’s valleys, mountain scenery, and the natural beauty of Sonamarg.', img: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop', route: 'Srinagar → Sonamarg → Gulmarg' },
    { title: 'Glorious Kashmir Tour Package', duration: '4 Nights · 5 Days', desc: 'A compact Kashmir experience combining scenic locations, comfortable stays, and guided planning.', img: 'https://images.unsplash.com/photo-1566837945700-3005b8744933?q=80&w=800&auto=format&fit=crop', route: 'Srinagar → Pahalgam → Srinagar' },
    { title: 'Winter Special Escape', duration: '6 Nights · 7 Days', desc: 'A winter escape designed for families and travellers who want memorable seasonal experiences.', img: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=800&auto=format&fit=crop', route: 'Shimla → Manali → Rohtang' },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]" id="packages">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular journeys, ready to personalize</h2>
            <p className="text-gray-600 text-lg">Begin with one of our traveller favourites and let our team adapt it around your schedule and preferences.</p>
          </div>
          <button className="text-[#102A43] font-semibold hover:text-[#F97316] transition-colors flex items-center gap-1 shrink-0">
            View All Packages <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
              <div className="h-56 overflow-hidden relative">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#102A43] flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-[#F97316]" /> {pkg.duration}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-[#F97316] mb-2 uppercase tracking-wide flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" /> Route: {pkg.route}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#102A43] leading-snug">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{pkg.desc}</p>
                <div className="flex gap-3 mt-auto">
                  <button className="flex-1 bg-white border border-[#E7E2DA] text-[#102A43] py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  <a href={`https://wa.me/918896572181?text=Hi, I am interested in the ${pkg.title} package.`} target="_blank" rel="noreferrer" className="flex-1 bg-emerald-50 text-emerald-600 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors">
                    <WhatsAppIcon className="w-4 h-4" /> Ask Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksAndServices = () => {
  const steps = [
    { num: '1', title: 'Tell Us Your Plan', desc: 'Share your destination—or let us help you choose one.' },
    { num: '2', title: 'Speak With an Expert', desc: 'Our team contacts you to understand your expectations and budget.' },
    { num: '3', title: 'Receive a Plan', desc: 'Review the proposed itinerary, accommodation, and travel arrangements.' },
    { num: '4', title: 'Start Your Journey', desc: 'Finalize your plan and travel with support from our team.' },
  ];

  return (
    <section className="py-20 relative bg-white" id="services">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Services Grid (Compact version) */}
        <div className="mb-24">
           <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything your journey needs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['Personalized Planning', 'Flight & Hotel', 'Local Transport', 'Sightseeing'].map((srv, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-[#FFFDF8] border border-[#E7E2DA] hover:border-[#FBBF24] transition-colors">
                <div className="w-12 h-12 mx-auto bg-[#FFF3E6] rounded-full flex items-center justify-center mb-4 text-[#F97316]">
                  {i === 0 ? <CompassIcon /> : i === 1 ? <PlaneIcon /> : i === 2 ? <MapPinIcon /> : <UserIcon />}
                </div>
                <h4 className="font-semibold text-[#102A43] text-sm md:text-base">{srv}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* How it works timeline */}
        <div className="bg-[#102A43] rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Background decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#581C57] rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From idea to itinerary</h2>
            <p className="text-gray-300">How we plan your perfect trip.</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Desktop Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-600/50 -z-10"></div>
            
            {steps.map((step, i) => (
              <div key={i} className="relative text-center md:text-left flex flex-row md:flex-col items-start gap-4 md:gap-0">
                <div className="w-16 h-16 shrink-0 md:mb-6 rounded-full bg-gradient-to-br from-[#F97316] to-[#FBBF24] text-white flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#102A43] relative mx-auto md:mx-0">
                  {step.num}
                  {/* Small animated ping effect on the first step to draw attention */}
                  {i === 0 && <span className="absolute inset-0 rounded-full border-2 border-[#FBBF24] animate-ping opacity-75"></span>}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-white">{step.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const FooterAndCTA = () => {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-24 bg-[#FFF3E6] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FBBF24]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-8 text-[#F97316]">
            <CompassIcon className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#102A43]">
            Your destination can wait.<br/>Your plan doesn’t have to.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Share a few details and let Smiling Journey help turn your travel idea into a personalized itinerary.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://wa.me/918896572181" target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <WhatsAppIcon className="w-6 h-6" /> Start Planning on WhatsApp
            </a>
            <a href="tel:+918896572181" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-[#102A43] border-2 border-[#E7E2DA] hover:border-[#102A43] transition-colors flex items-center justify-center gap-2 bg-white">
              <PhoneIcon className="w-5 h-5" /> Call +91 8896572181
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 border-t-4 border-[#F97316]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6 bg-white p-2 rounded-xl inline-flex">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#FBBF24] flex items-center justify-center text-white font-bold text-sm">SJ</div>
                 <span className="font-extrabold text-[#581C57] text-lg leading-tight">Smiling Journey</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Personalized domestic and international travel planning for families, couples, groups, and explorers.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#packages" className="hover:text-white transition-colors">Packages</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">Custom Holidays</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Flight & Hotel</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Family Trips</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Honeymoon Packages</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 shrink-0 text-[#F97316]" />
                  <div>
                    <a href="tel:+918896572181" className="block hover:text-white">+91 8896572181</a>
                    <a href="tel:+917007428814" className="block hover:text-white mt-1">+91 7007428814</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 shrink-0 text-[#F97316]" />
                  <span className="leading-relaxed">3044, F, 14th Avenue,<br/>Gaur City-2, Greater Noida West<br/>201009</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Smiling Journey. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Mobile WhatsApp Button */}
      <a href="https://wa.me/918896572181" target="_blank" rel="noreferrer" className="md:hidden fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl animate-bounce">
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] font-sans selection:bg-[#F97316] selection:text-white">
      <GlobalStyles />
      <Header />
      <main>
        <Hero />
        <PopularDestinations />
        <FeaturedPackages />
        <HowItWorksAndServices />
      </main>
      <FooterAndCTA />
    </div>
  );
}