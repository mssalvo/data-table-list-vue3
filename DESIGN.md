---
name: Corporate High-Tech System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#00696e'
  on-secondary: '#ffffff'
  secondary-container: '#00f4fe'
  on-secondary-container: '#006c71'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#63f7ff'
  secondary-fixed-dim: '#00dce5'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered to evoke a sense of institutional stability blended with cutting-edge technical precision. The aesthetic is **Corporate Modern**, prioritizing clarity, structured hierarchy, and a premium "High-Tech" feel. 

The target audience consists of B2B stakeholders, enterprise partners, and tech-savvy professionals who value reliability and performance. To achieve this, the system utilizes expansive whitespace, rigorous grid alignment, and subtle motion. The emotional response should be one of "effortless authority"—the interface stays out of the way while providing a robust framework for complex information.

## Colors

The palette is anchored by **Deep Ocean Blue** (`#0F172A`), providing a heavy, trustworthy foundation for text and primary UI containers. This is contrasted against **Crisp White** backgrounds to maintain a clean, professional atmosphere.

The accent color is a **Vibrant Teal** (`#00F5FF`), used sparingly for high-action items, data visualizations, and interactive states to provide that "high-tech" luminescence. 

- **Primary:** Deep Blue for branding, headings, and primary buttons.
- **Secondary/Accent:** Teal for focus states, icons, and CTA highlights.
- **Surface:** A range of cool grays (`#F8FAFC` to `#E2E8F0`) for subtle sectioning without breaking the clean white aesthetic.

## Typography

This design system utilizes **Inter** as the primary typeface for its exceptional legibility and neutral, systematic appearance. For technical labels and small metadata, **IBM Plex Sans** is introduced to provide a structured, "engineered" feel that complements the corporate aesthetic.

- **Headlines:** Use tight letter-spacing and heavy weights (700-800) to create a commanding presence.
- **Body Text:** Maintained at a comfortable 16px or 18px with generous line height to ensure long-form readability.
- **Micro-copy:** Use IBM Plex Sans for tags, badges, and overlines to inject technical character into the layouts.

## Layout & Spacing

The system employs a **12-column fixed grid** for desktop, centering content within a 1280px max-width container. 

- **Vertical Rhythm:** Sections are separated by large 120px gaps to allow the design to "breathe" and signal clear transitions between topics.
- **Sticky Navigation:** The header remains fixed at the top with a subtle backdrop-blur (12px) and a bottom border of 1px in a light cool gray.
- **Hero Sections:** Center-aligned or split 50/50. Hero height should ideally be 80vh to ensure the fold is visible on standard displays.
- **Responsive Behavior:** At 768px (Tablet), gutters reduce to 16px and columns collapse to a 1-column vertical stack for cards.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

- **Base Layer:** Pure white (`#FFFFFF`).
- **Mid Layer (Feature Cards):** A very soft 1px border (`#E2E8F0`) combined with an ultra-diffused shadow (`0px 4px 20px rgba(15, 23, 42, 0.05)`).
- **Interactive Layer (Hover States):** When a user interacts with a card, the elevation should increase by shifting the shadow to a slightly more pronounced state and applying a 1px teal bottom accent.
- **Glassmorphism:** Reserved exclusively for the sticky navigation bar and modal overlays to create a sense of technological sophistication without sacrificing clarity.

## Shapes

To maintain a professional and "serious" tone, the design system uses a **Soft (Level 1)** roundedness profile.

- **Standard Elements (Buttons, Inputs):** 4px (`0.25rem`) corner radius. This provides a modern touch while retaining a geometric, disciplined structure.
- **Containers (Cards, Modals):** 8px (`0.5rem`) corner radius. 
- **Icons:** Should follow a linear, 2px stroke weight style with slightly rounded ends to match the UI components. Avoid fully rounded "pill" shapes unless used for status badges (e.g., "Active").

## Components

### Sticky Navigation
The bar must be 80px in height, using a white background at 85% opacity with a `backdrop-filter: blur(12px)`. Navigation links should use `label-sm` typography with a teal underline animation on hover.

### Hero Section
Utilize a "Dark Mode" primary block (`#0F172A`) for the hero section to create an immediate impact. Text should be white, with the secondary accent (Teal) used for the primary CTA button.

### Feature Cards
Cards feature a white background, a 1px border (`#E2E8F0`), and a 48px teal-tinted icon at the top left. The title uses `headline-md`. On hover, the card should lift 4px vertically with a slightly deeper shadow.

### Contact Forms
Inputs use a light gray fill (`#F1F5F9`) and no initial border. On focus, they transition to a white background with a 2px teal border. Labels are positioned above the input using `label-sm` in `tertiary_color_hex`.

### Buttons
- **Primary:** Deep Blue background, white text, 4px radius. 
- **Secondary:** Transparent background, 2px Deep Blue border.
- **Ghost:** No background, teal text, used for secondary actions within cards.