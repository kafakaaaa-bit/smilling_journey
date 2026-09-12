# Smiling Journey Website Redesign Brief

## 1. Project Overview

Redesign the existing Smiling Journey website into a modern, responsive, trustworthy, and conversion-focused website for a travel agency.

Existing website:
https://smilingjourney.com/

Smiling Journey provides domestic and international travel services, including customized holiday packages, flight and hotel bookings, local transportation, sightseeing, and travel planning.

The redesigned website should not feel like a generic corporate template. It should immediately create the feeling of beginning a journey—through destination photography, road-inspired layouts, thoughtful motion, travel-themed illustrations, and an interactive trip-planning experience.

The website’s primary business goal is to generate qualified leads and move potential customers into a WhatsApp conversation with the Smiling Journey team.

---

# 2. Business Information

## Business Name

Smiling Journey

## Business Type

Travel agency and holiday planning company.

## Existing Contact Details

Use these details initially, but keep them configurable:

* Primary phone: +91 8896572181
* Secondary phone: +91 7007428814
* Email: [info@smilingjourney.com](mailto:info@smilingjourney.com)
* Address: 3044, F, 14th Avenue, Gaur City-2, Greater Noida West – 201009
* Instagram: https://www.instagram.com/smiling.journey/
* Facebook: https://www.facebook.com/smilingjourney.we

Do not display empty or incomplete social-media links.

## Services

Smiling Journey provides:

* Domestic holiday packages
* International holiday packages
* Customized tour planning
* Flight-ticket booking
* Hotel booking
* Bus and train booking assistance
* Airport and city transfers
* Point-to-point cab booking
* Sightseeing and local activities
* Family holidays
* Honeymoon trips
* Group tours
* Adventure holidays
* Corporate travel assistance
* Travel consultation and itinerary planning

---

# 3. Primary Website Goals

The website must:

1. Explain what Smiling Journey offers.
2. establish trust in the company.
3. Showcase destinations and travel packages.
4. Help visitors request customized travel plans.
5. Convert visitors into WhatsApp leads.
6. Allow visitors to send general enquiries through a contact form.
7. Work smoothly across mobile, tablet, laptop, and large desktop screens.
8. Be technically prepared for SEO.
9. Load quickly despite using destination photography and animations.
10. Make contacting the business possible from every page.

The most important action on the website is:

> Plan My Trip on WhatsApp

The secondary action is:

> Explore Packages

---

# 4. Target Audience

Design the website for:

* Families planning domestic holidays
* Couples planning honeymoons
* Groups of friends
* Solo travellers
* Corporate travellers
* Customers who know their destination
* Customers who need help selecting a destination
* Customers comparing different package options
* Indian customers who prefer discussing details through WhatsApp

The interface should be easy enough for users with limited technical experience.

---

# 5. Brand and Visual Direction

## Existing Logo

The current logo contains:

* A car
* A road or route
* A circular sun-like background
* Orange and yellow colours
* Purple “Smiling Journey” typography

Preserve the core identity of the car, road, smile, and journey. The redesign may refine the colour palette and presentation, but should remain recognizable as Smiling Journey.

Do not redraw or replace the logo unless explicitly requested. Use the supplied transparent logo file throughout the website.

## Brand Concept

The design concept should be:

> Every memorable journey starts with a small plan and a conversation.

The visual design should combine:

* Road-trip energy
* Friendly personal travel planning
* Indian and international destinations
* Safety and reliability
* Warm, memorable experiences
* A sense of movement and discovery

## Recommended Colour Palette

### Primary Orange

```css
--color-primary: #F97316;
```

Use for primary buttons, selected states, route markers, and major calls to action.

### Sunrise Yellow

```css
--color-accent: #FBBF24;
```

Use for highlights, decorative suns, ratings, and small travel accents.

### Deep Plum

```css
--color-brand-dark: #581C57;
```

Use as a refined replacement or extension of the existing purple. It can be used in headings, footer backgrounds, and premium sections.

### Midnight Navy

```css
--color-ink: #102A43;
```

Use for text, navigation, overlays, and trust-focused sections.

### Sky Blue

```css
--color-sky: #38BDF8;
```

Use sparingly for secondary accents, water destinations, and interactive states.

### Background Colours

```css
--color-background: #FFFDF8;
--color-surface: #FFFFFF;
--color-soft-orange: #FFF3E6;
--color-soft-blue: #EAF7FF;
--color-border: #E7E2DA;
```

The overall website should remain bright and readable. Avoid covering every section with gradients.

## Gradient

Use the logo-inspired orange-to-yellow gradient selectively:

```css
background: linear-gradient(135deg, #F97316 0%, #FBBF24 100%);
```

Suitable uses:

* Primary CTA buttons
* Route-progress accents
* Small decorative elements
* Mobile floating WhatsApp button

Do not apply the gradient to large amounts of text.

## Typography

Recommended font combination:

* Headings: `Manrope`
* Body and interface: `Inter`

Alternative:

* Headings: `Plus Jakarta Sans`
* Body: `DM Sans`

Typography should feel friendly, contemporary, and highly readable.

Minimum sizes:

* Main body text: 16px
* Form labels: 14px
* Navigation: 15–16px
* Avoid interface text below 12px

---

# 6. Design Personality

The website should feel:

* Friendly
* Energetic
* Reliable
* Aspirational
* Modern
* Human
* Travel-focused
* Premium but affordable

Avoid:

* Generic Bootstrap layouts
* Excessively rounded SaaS-style cards
* Cluttered travel collages
* Too many floating elements
* Fake awards
* Fake counters
* Invented customer reviews
* Fake package prices
* Stock photographs containing visible watermarks
* Overly dark sections
* Excessive glassmorphism
* Continuous animations that distract from reading
* An auto-playing hero carousel

---

# 7. Website Pages

Build three main pages:

1. Home
2. Packages and Services
3. Contact

The website should also include essential legal information. This can initially be presented through lightweight routes or footer-linked pages:

* Privacy Policy
* Terms and Conditions
* Cancellation and Refund Policy

Use reusable navigation, footer, buttons, cards, forms, and package components.

---

# 8. Navigation

## Desktop Navigation

The header should contain:

* Logo
* Home
* Packages
* Services
* About
* Contact
* Plan My Trip button

“Services” and “About” can scroll to sections on the Home page.

The header should:

* Start transparent or lightly overlaid when placed over the hero
* Become solid and slightly compact after scrolling
* Remain sticky
* Show a clear active-page state
* Include a visible WhatsApp or Plan My Trip CTA

## Mobile Navigation

Use:

* Logo on the left
* Menu button on the right
* Slide-down or side-sheet navigation
* Large touch targets
* Plan My Trip button inside the menu
* Persistent but non-obstructive WhatsApp action

Prevent background scrolling when the mobile menu is open.

---

# 9. Home Page

## 9.1 Hero Section

The hero must be the strongest and most interactive part of the website.

Do not use a traditional rotating banner.

Use one large destination photograph or a carefully optimized responsive background. Apply an overlay so all text and fields remain readable.

### Hero Copy

Eyebrow:

> Domestic & International Travel Experiences

Main heading:

> Where do you want your next smile to begin?

Supporting text:

> From peaceful mountain escapes to exciting international adventures, tell us what you have in mind and we’ll help shape the journey around you.

Primary CTA:

> Plan My Trip

Secondary CTA:

> Explore Packages

Trust line:

> Personalized itineraries · Reliable assistance · Travel support from enquiry to return

## 9.2 Interactive Trip Planner

Place the planner prominently inside the hero on desktop. On mobile, position it immediately below the main heading without requiring excessive scrolling.

Start with two choices:

### Option One

> I Know My Destination

Supporting label:

> Share your destination and travel dates.

### Option Two

> Help Me Choose

Supporting label:

> Tell us your mood, budget, and dates.

Do not label this option as “Random Trip” in the customer-facing interface. “Help Me Choose” or “Surprise Me” is clearer and more trustworthy.

### Known-Destination Fields

* Full name
* WhatsApp number
* Starting city
* Destination
* Departure date
* Return date
* Adults
* Children
* Approximate budget
* Optional notes

### Help-Me-Choose Fields

* Full name
* WhatsApp number
* Starting city
* Departure date
* Return date
* Adults
* Children
* Approximate budget
* Preferred travel mood
* Optional notes

Travel-mood choices:

* Mountains
* Beach
* Adventure
* Family
* Honeymoon
* Spiritual
* Wildlife
* International
* Weekend getaway
* No preference

### Form Experience

Use a compact two- or three-step form rather than displaying every field at once.

Suggested steps:

1. Choose the kind of trip.
2. Add trip details.
3. Add contact details and continue.

Display a small journey-style progress indicator connecting the steps.

Final button:

> Continue on WhatsApp

Secondary reassurance:

> No payment required. Our travel team will review your request and contact you.

Consent text:

> By continuing, you agree that Smiling Journey may contact you regarding this travel enquiry.

### Submission Behaviour

When the visitor submits the form:

1. Validate the information.
2. Send a backup enquiry to the business through a secure server endpoint.
3. Generate a structured WhatsApp message.
4. Open WhatsApp with the message pre-filled.
5. Let the customer press Send in WhatsApp.
6. Display a helpful confirmation state if the new tab fails to open.

Example generated message:

```text
Hello Smiling Journey! I would like help planning a trip.

Name: [NAME]
Trip type: [KNOWN DESTINATION / HELP ME CHOOSE]
Starting city: [CITY]
Destination: [DESTINATION OR PREFERENCE]
Travel dates: [FROM] to [TO]
Travellers: [ADULTS] adults, [CHILDREN] children
Budget: [BUDGET]
Notes: [NOTES]
```

Use a configurable WhatsApp business number. Do not hard-code it in multiple components.

---

# 10. Journey Animation Concept

Build a memorable travel animation that supports the experience without reducing usability.

## Desktop Hero Animation

Create a tasteful SVG route travelling across the lower portion of the hero:

* A curved road or dotted route
* A small car inspired by the logo
* Two or three location pins
* Subtle landscape silhouettes
* The car gently travels along the route
* A destination pin reacts when the animation reaches it

The car should not continuously race across the screen. Use a calm 8–12 second journey loop or connect its movement to page scrolling.

## Section-Transition Animation

A route line can continue visually between selected sections:

* Hero
* Destinations
* Planning process
* Final CTA

Do not force the line through every section.

## Additional Travel Motions

Use small animations such as:

* Clouds moving slowly
* A plane tracing a short curved route
* Location pins appearing on scroll
* Luggage tags tilting slightly on hover
* Package images gently zooming on hover
* Route strokes drawing when sections enter the viewport
* A car moving toward the selected package on hover
* Compass or map elements rotating by only a few degrees

## Motion Requirements

* Prefer SVG and CSS animations.
* Use Framer Motion only where it improves sequencing or scroll behaviour.
* Respect `prefers-reduced-motion`.
* Disable decorative travel loops for reduced-motion users.
* Avoid animations that cause layout shifts.
* Do not animate large paragraphs.
* Maintain smooth performance on lower-end mobile devices.
* Avoid unnecessary canvas or WebGL effects.
* Pause nonessential animation when it is outside the viewport.

---

# 11. Popular Destinations Section

Heading:

> Find a journey that feels like you

Supporting text:

> Explore traveller favourites or ask us to build something completely around your dates, interests, and budget.

Suggested destination categories:

* Kashmir
* Himachal Pradesh
* Rajasthan
* Ladakh
* South India
* Golden Triangle
* International Holidays

Each destination card should include:

* Optimized image
* Destination name
* Short travel-style description
* Best suited for
* Explore button

Do not invent starting prices. Show a price only if verified data is supplied.

Example card content:

### Kashmir

> Snow-covered landscapes, peaceful lakes, and unforgettable mountain views.

Best for:

> Couples · Families · Nature

CTA:

> Explore Kashmir

---

# 12. Featured Packages Section

Heading:

> Popular journeys, ready to personalize

Supporting text:

> Begin with one of our traveller favourites and let our team adapt it around your schedule and preferences.

Use the existing packages as initial content:

## Winter Packages

Duration:

> 6 Nights · 7 Days

Description:

> A winter escape designed for families and travellers who want memorable seasonal experiences.

## Fascinating Kashmir with Sonamarg

Duration:

> 5 Nights · 6 Days

Description:

> Discover Kashmir’s valleys, mountain scenery, and the natural beauty of Sonamarg.

## Glorious Kashmir Tour Package

Duration:

> 4 Nights · 5 Days

Description:

> A compact Kashmir experience combining scenic locations, comfortable stays, and guided planning.

## Srinagar, Gulmarg and Pahalgam

Duration:

> 3 Nights · 4 Days

Description:

> Explore three of Kashmir’s best-known destinations in one carefully planned journey.

Each card should contain:

* Destination image
* Package name
* Duration
* Two or three verified highlights
* “View Details” button
* “Ask on WhatsApp” button

If the complete itinerary is unavailable, do not invent it. Create clearly marked placeholders in the data file for the business to complete.

---

# 13. Services Section

Heading:

> Everything your journey needs, in one place

Service cards:

## Personalized Holiday Planning

> Travel plans shaped around your destination, dates, interests, and budget.

## Flight and Hotel Assistance

> Get help comparing suitable flight options and comfortable stays for your journey.

## Local Transport

> Assistance with airport transfers, cabs, buses, and point-to-point travel.

## Sightseeing and Experiences

> Add activities, attractions, guided tours, and local experiences to your itinerary.

## Family and Group Tours

> Coordinated travel planning for families, friends, corporate groups, and special occasions.

## Travel Support

> Get guidance before your departure and assistance throughout your travel-planning process.

Use simple travel-related icons, preferably from an established icon library. Do not mix several unrelated icon styles.

---

# 14. About Section

Heading:

> Thoughtful travel planning, made personal

Content:

> Smiling Journey is a travel agency serving customers looking for reliable domestic and international travel solutions. From family holidays and romantic escapes to group tours and customized itineraries, our team helps travellers plan experiences around their needs and budgets.

> We bring flights, stays, transportation, sightseeing, and travel assistance together so customers can spend less time coordinating and more time looking forward to their journey.

Mission statement:

> To deliver genuine value, dependable service, and memorable travel experiences for every customer.

Do not reproduce the existing About content word-for-word. Rewrite it clearly, correct the grammar, and divide it into readable paragraphs.

---

# 15. Why Choose Smiling Journey

Heading:

> Travel planning with a human touch

Use four trust points:

## Personalized Planning

> Recommendations are based on your actual dates, interests, group, and budget.

## Convenient Coordination

> Discuss your requirements directly with the team through phone or WhatsApp.

## Flexible Packages

> Begin with an existing package or request a completely customized itinerary.

## End-to-End Assistance

> Receive help with accommodation, transportation, sightseeing, and travel coordination.

Do not use “Best Price Guarantee,” “24/7 support,” “financial protection,” awards, certifications, or numerical claims unless the client verifies them.

---

# 16. How It Works Section

Heading:

> From idea to itinerary

Use a journey route with four stops:

### 1. Tell Us Your Plan

> Share your destination—or let us help you choose one.

### 2. Speak With a Travel Expert

> Our team contacts you to understand your expectations and budget.

### 3. Receive a Personalized Plan

> Review the proposed itinerary, accommodation, and travel arrangements.

### 4. Confirm and Start Your Journey

> Finalize your plan and travel with support from the Smiling Journey team.

On desktop, present the steps along a curved SVG route. On mobile, use a vertical route timeline.

---

# 17. Testimonials Section

Heading:

> Journeys our travellers remember

Use only genuine client testimonials supplied by the business or already published by the customer on an accessible review platform.

Existing review content may be cleaned for grammar without changing its meaning:

> “We booked a six-day Gujarat trip through Smiling Journey. The trip was planned excellently for our family, including hotels, food, and transport. We covered the Statue of Unity, Dwarkadhish, Somnath, Gir Forest, and Ahmedabad, and enjoyed the experience greatly.”

Attribution:

> Shraddha Chaudhary · Google Review

Do not invent additional reviews, names, ratings, or review counts.

If only one verified review is available, create one strong testimonial layout instead of duplicating it into a fake carousel.

---

# 18. Final Home Page CTA

Use a visually distinctive road-trip section.

Heading:

> Your destination can wait. Your plan doesn’t have to.

Supporting text:

> Share a few details and let Smiling Journey help turn your travel idea into a personalized itinerary.

Primary CTA:

> Start Planning on WhatsApp

Secondary CTA:

> Call +91 8896572181

Include a restrained SVG animation of the branded car reaching a destination marker.

---

# 19. Packages and Services Page

Route:

```text
/packages
```

Page purpose:

* Present available packages
* Explain travel services
* Help visitors find relevant options
* Encourage customized enquiries

## Page Header

Heading:

> Find your next journey

Supporting text:

> Explore popular travel packages or tell us what you want and receive a plan made around you.

## Package Filters

Add useful client-side filters only if there are enough packages:

* Domestic
* International
* Family
* Couple
* Group
* Adventure
* Duration
* Destination

Do not create filters that lead mostly to empty results.

## Package Card Requirements

Each package should support:

* Slug
* Name
* Destination
* Hero image
* Duration
* Travel category
* Short summary
* Highlights
* Inclusions
* Exclusions
* Itinerary
* Starting price, optional
* Terms note
* WhatsApp enquiry link

Keep package information in a centralized data file so packages can be changed without editing page layouts.

## Package Details

Package details may open in:

* A dedicated dynamic detail route, preferably `/packages/[slug]`, or
* An accessible detail sheet/dialog if only a few short packages exist

Dedicated pages are preferred for SEO and sharing.

Every package enquiry should automatically include the selected package name in its WhatsApp message.

## Empty and No-Result States

If filtering produces no results, display:

> We couldn’t find a matching ready-made package, but we can create one for you.

CTA:

> Request a Custom Trip

---

# 20. Contact Page

Route:

```text
/contact
```

## Page Header

Heading:

> Let’s plan something worth remembering

Supporting text:

> Ask a question, request a package, or tell us the kind of journey you have in mind.

## Contact Options

Show:

* WhatsApp
* Primary phone
* Secondary phone
* Email
* Office address
* Business hours, only if verified
* Social-media links

## Contact Form

Fields:

* Full name
* Email address
* Phone or WhatsApp number
* Enquiry type
* Destination, optional
* Travel dates, optional
* Message
* Consent checkbox

Enquiry types:

* Custom trip
* Existing package
* Flight or hotel
* Group travel
* General enquiry

Submit button:

> Send Enquiry

Success message:

> Thank you! Your enquiry has been received. The Smiling Journey team will contact you shortly.

Error message:

> We couldn’t send your enquiry right now. Please try again or contact us on WhatsApp.

Include:

* Server-side validation
* Rate limiting
* Spam protection
* Honeypot field or Cloudflare Turnstile
* Accessible error messages
* Loading and success states

Never expose email passwords, API keys, or SMTP credentials in frontend code.

---

# 21. Footer

The footer should contain:

## Brand Area

Logo and short description:

> Personalized domestic and international travel planning for families, couples, groups, and explorers.

## Explore

* Home
* Packages
* Services
* About
* Contact

## Travel Services

* Custom holidays
* Flight and hotel assistance
* Family trips
* Honeymoon packages
* Group tours

## Contact

* Phone numbers
* Email
* Address
* WhatsApp button

## Legal

* Privacy Policy
* Terms and Conditions
* Cancellation and Refund Policy

Copyright:

> © [CURRENT YEAR] Smiling Journey. All rights reserved.

Use the current year dynamically.

A small route line can enter the footer and end at a location pin near the logo.

---

# 22. Floating Contact Controls

On mobile:

* Show one clear floating WhatsApp button.
* Do not cover form buttons or important content.
* Hide or reposition it while the trip-planner form is active.
* Include an accessible label.

On desktop:

* Use a compact WhatsApp control near the lower-right corner.
* Avoid showing multiple competing WhatsApp buttons simultaneously.

---

# 23. Responsive Behaviour

Design mobile-first.

## Mobile

* Single-column hero
* Hero planner immediately visible
* Large form controls
* Minimum 44px touch targets
* Vertical journey timelines
* Horizontally scrollable destination cards only if necessary
* No horizontal page overflow
* Simplified decorative animation
* Images cropped intentionally
* Navigation accessible through a menu sheet
* Sticky CTA where useful, without covering content

## Tablet

* Two-column card grids
* Hero may remain vertically stacked
* Trip planner can use two columns internally
* Balanced image aspect ratios

## Desktop

* Split hero layout
* Text on the left and trip planner on the right
* Three- or four-column card grids
* Richer SVG route animations
* Wider package layouts
* Controlled maximum content width

## Large Screens

* Keep content within a maximum width of approximately 1280–1440px.
* Do not stretch paragraphs or forms across the full viewport.
* Let decorative scenery extend beyond the content container where appropriate.

Test at minimum:

* 360px
* 390px
* 768px
* 1024px
* 1280px
* 1440px

Also verify 200% browser zoom and landscape mobile orientation.

---

# 24. Technical Stack

Preferred implementation:

* Next.js
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Framer Motion for purposeful animation
* Lucide icons
* Server-side API route for contact submissions
* Resend or Brevo for transactional email
* WhatsApp `wa.me` click-to-chat integration

Next.js is preferred because the website needs strong SEO, optimized images, shareable package pages, and a small amount of server-side functionality.

Do not add a database or admin dashboard unless requested.

Store editable business information in a centralized configuration file:

```text
Business name
Phone numbers
WhatsApp number
Email
Address
Social links
Package data
Destination data
```

---

# 25. Email Delivery

Preferred option:

* Resend
* Brevo
* Amazon SES

A Gmail App Password with Nodemailer may be used temporarily, but it must:

* Run only on the server
* Use environment variables
* Never be committed to source control
* Never appear in client-side JavaScript
* Use a dedicated business Gmail account
* Include basic sending-error handling

Recommended environment variables:

```env
BUSINESS_EMAIL=
BUSINESS_WHATSAPP_NUMBER=
EMAIL_FROM=
EMAIL_PROVIDER_API_KEY=
```

If Gmail SMTP is used:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_APP_PASSWORD=
```

Provide an `.env.example` containing names only, never real secrets.

---

# 26. WhatsApp Integration Requirements

Use the official click-to-chat URL structure:

```text
https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE]
```

Requirements:

* Store the number in one configuration value.
* Remove spaces and symbols before constructing the URL.
* Properly URL-encode the complete message.
* Open WhatsApp only following an intentional user action.
* Support WhatsApp Web and mobile WhatsApp.
* Do not claim that the message was sent automatically.
* Tell the visitor they must press Send inside WhatsApp.
* Send or record the backup enquiry before redirecting when possible.
* Do not include highly sensitive personal information.

---

# 27. SEO Requirements

The existing website contains poor or missing metadata and must be corrected.

Implement:

* Unique title for every page
* Unique meta description
* Canonical URLs
* Open Graph metadata
* X/Twitter metadata
* Semantic heading hierarchy
* Descriptive image alt text
* `robots.txt`
* XML sitemap
* Structured internal links
* Travel Agency or Local Business structured data
* Breadcrumb structured data on package pages
* Package/tour structured data only when semantically valid
* Fast, crawlable HTML
* Human-readable URLs

Remove any accidental:

```html
<meta name="robots" content="noindex, nofollow">
```

Production pages should be indexable unless a particular page has a valid reason not to be.

Suggested homepage title:

> Smiling Journey | Customized Domestic & International Tour Packages

Suggested homepage description:

> Plan personalized domestic and international holidays with Smiling Journey. Explore travel packages and get assistance with hotels, flights, transport, sightseeing, and custom itineraries.

Do not use an oversized list of outdated meta keywords.

---

# 28. Accessibility Requirements

* Use semantic HTML.
* Provide a skip-to-content link.
* Ensure keyboard accessibility.
* Maintain visible focus indicators.
* Ensure sufficient colour contrast.
* Properly associate labels and form fields.
* Announce validation errors to assistive technology.
* Provide meaningful alt text.
* Avoid putting essential information only inside images.
* Respect reduced-motion preferences.
* Make dialogs and mobile menus trap and restore focus correctly.
* Ensure date selection works without a mouse.
* Avoid auto-playing audio or video.

---

# 29. Performance Requirements

Target:

* Lighthouse Performance: 90 or higher
* Accessibility: 95 or higher
* Best Practices: 95 or higher
* SEO: 95 or higher

Implementation requirements:

* Optimize and compress all images.
* Use AVIF or WebP where supported.
* Avoid loading large desktop images on mobile.
* Define image dimensions to prevent layout shift.
* Lazy-load below-the-fold images.
* Prioritize only the actual hero image.
* Minimize client-side JavaScript.
* Avoid excessive animation libraries.
* Use SVG for route and vehicle graphics.
* Avoid loading several font families and weights.
* Ensure the site remains usable if animation fails.
* Avoid autoplaying background video unless specifically approved.

---

# 30. Content Rules

* Correct grammar and spelling throughout the existing content.
* Do not copy placeholder text from the old website.
* Do not invent prices.
* Do not invent package inclusions.
* Do not invent company history.
* Do not invent certifications.
* Do not invent partner hotels.
* Do not invent awards.
* Do not invent reviews or ratings.
* Clearly mark missing business information as TODO.
* Keep customer-facing copy friendly and direct.
* Use Indian English consistently.
* Use “personalized” or “personalised” consistently rather than mixing both.
* Keep paragraphs short and readable.
* Avoid generic statements such as “We are the best travel agency.”

---

# 31. Data Placeholders Requiring Client Confirmation

Create a clearly named data or content file containing TODO markers for:

* Final WhatsApp business number
* Primary contact number
* Business operating hours
* Confirmed package prices
* Package inclusions
* Package exclusions
* Complete itineraries
* Hotel categories
* Cancellation terms
* Refund terms
* Verified customer testimonials
* Google Business Profile link
* Google Maps location
* Social-media links
* International destinations
* Flight-booking process
* Whether support is available during active trips
* Business registration or tax information, if it should be displayed

Do not silently fill these with invented information.

---

# 32. Suggested Component Structure

Use reusable components such as:

```text
Header
MobileNavigation
Hero
TripPlanner
TripTypeSelector
TripDetailsStep
ContactDetailsStep
WhatsAppCTA
DestinationCard
PackageCard
PackageFilters
ServiceCard
JourneyTimeline
TestimonialCard
TrustSection
ContactForm
FinalCTA
Footer
RouteAnimation
FloatingWhatsAppButton
```

Avoid placing the entire website inside one large page component.

Keep:

* Page-level layout in route files
* Reusable UI in component files
* Package and destination content in data files
* Business contact details in one configuration file
* WhatsApp-message construction in a utility file
* Form validation in a dedicated schema
* Server-only email logic outside client components

---

# 33. Interaction States

Every interactive element must account for:

* Default
* Hover
* Keyboard focus
* Active
* Disabled
* Loading
* Success
* Error

The trip planner must also handle:

* Invalid phone number
* Return date earlier than departure date
* Missing required information
* Zero travellers
* WhatsApp popup blocked
* Email backup failing
* WhatsApp unavailable
* User returning to edit an earlier step

If the email backup fails but WhatsApp can still open, allow the WhatsApp journey and show an appropriate non-alarming message.

---

# 34. Visual Details

Use travel-related visual language carefully:

* Curved routes
* Road markings
* Location pins
* Luggage-tag shapes
* Map-grid textures
* Ticket-like package metadata
* Compass directions
* Sun and cloud accents
* Car motif derived from the logo

The design should not look childish. Keep travel motifs minimal, geometric, and polished.

Use destination photography to carry most of the emotional impact.

Package cards can include a small route label such as:

```text
Delhi → Srinagar → Gulmarg → Pahalgam
```

Only show routes that are confirmed by package data.

---

# 35. Final Implementation Instructions for Codex

1. Inspect the existing project before editing.
2. Preserve useful existing assets and verified business content.
3. Do not retain the current outdated page structure merely for convenience.
4. Create a coherent design system before styling isolated sections.
5. Build reusable components and separate route files.
6. Implement the responsive trip planner as the main hero experience.
7. Connect the final planner action to WhatsApp using a generated message.
8. Add a secure server-side contact-email flow.
9. Add validation, consent, rate limiting, and spam protection.
10. Implement purposeful travel animations with reduced-motion support.
11. Correct SEO metadata, sitemap, robots configuration, and semantic structure.
12. Optimize every image.
13. Test all pages across mobile and desktop sizes.
14. Verify that phone, email, and WhatsApp actions work.
15. Do not introduce a database or admin dashboard.
16. Do not fabricate missing business information.
17. Replace generic copy with the content defined in this brief.
18. Keep secrets in environment variables.
19. Ensure the final production website is indexable.
20. Finish with a production build and report:

    * Implemented pages
    * Implemented interactions
    * Remaining client-content TODOs
    * Validation results
    * Any external configuration required

---

# 36. Definition of Done

The redesign is complete when:

* Home, Packages, and Contact pages are implemented.
* Navigation and footer work on all screen sizes.
* The trip planner supports known-destination and help-me-choose flows.
* Submitted trip details produce a correctly formatted WhatsApp message.
* Contact enquiries reach the configured business email.
* No credentials are exposed in the frontend.
* All forms have validation, success, loading, and error states.
* All supplied content is professionally presented.
* No fake business information has been added.
* The car and route animations work smoothly.
* Reduced-motion users receive a stable non-animated experience.
* There is no unintended horizontal scrolling.
* Images are responsive and optimized.
* Page metadata, sitemap, robots, and structured data are configured.
* Mobile, tablet, desktop, keyboard, and basic accessibility checks pass.
* The production build completes successfully.
