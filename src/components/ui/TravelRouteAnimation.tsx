import { motion } from "framer-motion";

interface TravelRouteAnimationProps {
  className?: string;
  reducedMotion?: boolean;
}

/**
 * Animated Travel Route SVG Component (per design.md Section 10)
 * Renders a curved road path, subtle landscape silhouettes, location pins,
 * and a traveling car moving calmly along the route.
 */
export function TravelRouteAnimation({ className = "", reducedMotion = false }: TravelRouteAnimationProps) {
  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Brand Gradient stroke for path */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Glow filter for pin pulses */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Mountain Silhouettes */}
        <path
          d="M 50,180 L 150,110 L 230,165 L 340,90 L 460,175 L 580,120 L 700,180 L 820,105 L 940,180 L 1000,180 L 1000,240 L 0,240 Z"
          fill="#102A43"
          fillOpacity="0.04"
        />

        {/* Curved Travel Route Path */}
        <path
          id="travel-route-path"
          d="M 30,170 C 180,110 280,210 440,140 C 600,70 720,200 960,120"
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Dotted Centerline Accent */}
        <path
          d="M 30,170 C 180,110 280,210 440,140 C 600,70 720,200 960,120"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.8"
        />

        {/* Location Pin 1: Origin (Delhi / Starting City) */}
        <g transform="translate(180, 132)">
          <circle cx="0" cy="0" r="12" fill="#F97316" fillOpacity="0.15" filter="url(#glow)" />
          <circle cx="0" cy="0" r="6" fill="#F97316" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          <text x="0" y="-14" textAnchor="middle" fill="#102A43" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
            ORIGIN
          </text>
        </g>

        {/* Location Pin 2: Waypoint (Kashmir / Mountains) */}
        <g transform="translate(440, 140)">
          <circle cx="0" cy="0" r="14" fill="#FBBF24" fillOpacity="0.2" filter="url(#glow)" />
          <circle cx="0" cy="0" r="7" fill="#F59E0B" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          <text x="0" y="24" textAnchor="middle" fill="#581C57" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
            VALLEY
          </text>
        </g>

        {/* Location Pin 3: Destination (Beach / International Escape) */}
        <g transform="translate(760, 148)">
          <motion.circle
            cx="0"
            cy="0"
            r="16"
            fill="#38BDF8"
            fillOpacity="0.25"
            filter="url(#glow)"
            animate={reducedMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="0" cy="0" r="8" fill="#38BDF8" />
          <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
          <text x="0" y="-16" textAnchor="middle" fill="#102A43" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono">
            DESTINATION
          </text>
        </g>

        {/* Animated Traveling Car along the path (SVG Motion Path) */}
        {!reducedMotion ? (
          <g>
            <path
              d="M -16,-9 H 16 C 19,-9 21,-6 20,-3 L 18,5 H -18 L -16,-3 C -17,-6 -19,-9 -16,-9 Z"
              fill="#102A43"
            />
            {/* Smooth animated car motion along travel-route-path using CSS / Framer Motion */}
            <motion.g
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                offsetPath: `path("M 30,170 C 180,110 280,210 440,140 C 600,70 720,200 960,120")`,
                offsetRotate: "auto",
              }}
            >
              {/* Car Body Container */}
              <g transform="translate(0, -6) scale(0.95)">
                {/* Shadow underneath car */}
                <ellipse cx="0" cy="8" rx="14" ry="3" fill="#102A43" fillOpacity="0.25" />
                
                {/* Car Roof & Body */}
                <rect x="-13" y="-5" width="26" height="11" rx="3" fill="#F97316" />
                <path d="M -8,-5 L -4,-10 H 5 L 9,-5 Z" fill="#FFFFFF" fillOpacity="0.9" />
                
                {/* Windows */}
                <path d="M -6,-5 L -3,-9 H 0 V -5 Z" fill="#38BDF8" />
                <path d="M 2,-5 H 7 L 5,-9 H 2 Z" fill="#38BDF8" />
                
                {/* Wheels */}
                <circle cx="-8" cy="6" r="3" fill="#102A43" />
                <circle cx="-8" cy="6" r="1" fill="#FFFFFF" />
                <circle cx="8" cy="6" r="3" fill="#102A43" />
                <circle cx="8" cy="6" r="1" fill="#FFFFFF" />
                
                {/* Headlights */}
                <circle cx="13" cy="0" r="1.5" fill="#FBBF24" />
              </g>
            </motion.g>
          </g>
        ) : (
          /* Static Car fallback for reduced motion users */
          <g transform="translate(440, 134) scale(0.95)">
            <rect x="-13" y="-5" width="26" height="11" rx="3" fill="#F97316" />
            <path d="M -8,-5 L -4,-10 H 5 L 9,-5 Z" fill="#FFFFFF" />
            <circle cx="-8" cy="6" r="3" fill="#102A43" />
            <circle cx="8" cy="6" r="3" fill="#102A43" />
          </g>
        )}
      </svg>
    </div>
  );
}
