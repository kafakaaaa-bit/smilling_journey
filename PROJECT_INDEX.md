# Project Index

## Project Overview
Smiling Journey is a frontend-only React/Vite travel-agency website. It presents verified business contact details, package summaries, a simulated trip-planner flow, a simulated contact form, and SEO-ready routes for later backend integration.

## Technology Stack
React, Vite, TypeScript, React Router, Tailwind CSS, Framer Motion, React Hook Form, Zod, Lucide React.

## Routes
| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Editorial homepage |
| `/packages` | `src/pages/PackagesPage.tsx` | Package catalogue |
| `/packages/:slug` | `src/pages/PackageDetailPage.tsx` | Package details |
| `/contact` | `src/pages/ContactPage.tsx` | Contact options and form |
| `/privacy-policy` | `src/pages/LegalPage.tsx` | Placeholder legal page |
| `/terms-and-conditions` | `src/pages/LegalPage.tsx` | Placeholder legal page |
| `/cancellation-and-refund-policy` | `src/pages/LegalPage.tsx` | Placeholder legal page |

## Components
| Component | File | Used By | Responsibility |
|---|---|---|---|
| `Layout` | `src/components/layout/Layout.tsx` | All routes | Header, mobile menu, footer, planner trigger |
| `TripPlannerDialog` | `src/components/planner/TripPlannerDialog.tsx` | Layout | Multi-step frontend planner |
| `SEO` | `src/components/ui/SEO.tsx` | Pages | Per-route metadata and JSON-LD |
| `Logo` | `src/components/ui/Logo.tsx` | Layout | Temporary text lockup |

## Data Files
| File | Contents |
|---|---|
| `src/config/business.ts` | Business name, phones, email, address, socials |
| `src/config/navigation.ts` | Header/footer nav |
| `src/data/destinations.ts` | Destination list and image sources |
| `src/data/packages.ts` | Typed package summaries |
| `src/data/services.ts` | Service rows |
| `src/data/testimonials.ts` | Verified single testimonial |

## Animation Index
Hero image clip reveal and slow scale: `src/pages/HomePage.tsx`.
Destination crossfade: `src/pages/HomePage.tsx`.
Filmstrip motion: `src/styles/globals.css`.
Route transitions and mobile menu: `src/components/layout/Layout.tsx`.
Planner dialog entrance: `src/components/planner/TripPlannerDialog.tsx`.

## Form Index
Trip planner schema: `src/schemas/plannerSchema.ts`.
Contact schema: `src/schemas/contactSchema.ts`.
Trip lead simulation: `src/services/leadService.ts`.
Contact simulation: `src/services/contactService.ts`.

## Configuration Index
Vite: `vite.config.ts`.
TypeScript: `tsconfig*.json`.
ESLint: `eslint.config.js`.
Robots and sitemap: `public/robots.txt`, `public/sitemap.xml`.

## Asset Index
No local logo or photography files were provided. Current images use stable Unsplash image URLs already aligned with the brief. Replace with licensed/local assets before production if preferred.

## Future Integrations
| Integration | Current Behaviour | Integration Point |
|---|---|---|
| WhatsApp | Message generated in memory, no real send | `src/utils/whatsapp.ts`, `src/services/leadService.ts` |
| Lead submission | Simulated success | `submitTripLead` in `src/services/leadService.ts` |
| Contact email | Simulated success | `submitContactMessage` in `src/services/contactService.ts` |
| Backend | Not implemented | Replace service simulations with API calls |

## Client Content TODOs
Provided transparent Smiling Journey logo.
Final legal policy text.
Confirmed package prices, inclusions, exclusions, hotel categories, and day-wise itineraries.
Business hours, Google Business Profile, Google Maps link, and any business registration/tax details to display.
Final approval for image licensing/source strategy.

## Commands
`npm run dev`
`npm run lint`
`npm run typecheck`
`npm run build`

## Planned Environment Variables
`BUSINESS_EMAIL`
`BUSINESS_WHATSAPP_NUMBER`
`EMAIL_FROM`
`EMAIL_PROVIDER_API_KEY`
`PUBLIC_SITE_URL`
