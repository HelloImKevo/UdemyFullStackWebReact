# 🎨 Visual Design Guide

## Color Palette Visualization

### Primary Colors
```
┌────────────────────┐
│   Primary Blue     │  #2563eb - Main brand color
│   ██████████████   │  Buttons, links, accents
└────────────────────┘

┌────────────────────┐
│   Primary Hover    │  #1d4ed8 - Hover states
│   ██████████████   │  Interactive elements
└────────────────────┘

┌────────────────────┐
│   Primary Light    │  #dbeafe - Backgrounds
│   ░░░░░░░░░░░░░░   │  Subtle accents
└────────────────────┘
```

### Semantic Colors
```
┌────────────────────┐
│   Success Green    │  #16a34a - Positive actions
│   ██████████████   │  Confirmations
└────────────────────┘

┌────────────────────┐
│   Danger Red       │  #dc2626 - Destructive actions
│   ██████████████   │  Delete buttons, errors
└────────────────────┘

┌────────────────────┐
│   Warning Orange   │  #f59e0b - Warnings
│   ██████████████   │  Caution states
└────────────────────┘
```

### Neutral Colors
```
┌────────────────────┐
│   Text Primary     │  #0f172a - Main content
│   ██████████████   │  Headings, body text
└────────────────────┘

┌────────────────────┐
│   Text Secondary   │  #475569 - Supporting text
│   ████████████░░   │  Meta info, captions
└────────────────────┘

┌────────────────────┐
│   Text Muted       │  #94a3b8 - Subtle text
│   ██████░░░░░░░░   │  Timestamps, labels
└────────────────────┘

┌────────────────────┐
│   Background       │  #f8fafc - Page background
│   ░░░░░░░░░░░░░░   │  Main canvas
└────────────────────┘

┌────────────────────┐
│   Card Background  │  #ffffff - Content cards
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  Posts, forms
└────────────────────┘
```

## Typography Scale

```
H1 - Display Heading
══════════════════════════
Size: 40px (2.5rem)
Font: Playfair Display
Weight: 700
Use: Page titles, hero headings


H2 - Section Heading
══════════════════════════
Size: 32px (2rem)
Font: Inter
Weight: 700
Use: Section titles


H3 - Subsection Heading
══════════════════════════
Size: 24px (1.5rem)
Font: Inter
Weight: 700
Use: Card titles, subsections


Body Text
══════════════════════════
Size: 16px (1rem)
Font: Inter
Weight: 400
Line Height: 1.6
Use: Main content


Small Text
══════════════════════════
Size: 14px (0.875rem)
Font: Inter
Weight: 400
Use: Meta info, captions
```

## Spacing System

```
Extra Small (8px)
├─┤
■

Small (12px)
├───┤
■

Medium (16px)
├─────┤
■

Large (24px)
├─────────┤
■

Extra Large (32px)
├─────────────┤
■

2X Large (48px)
├───────────────────┤
■

3X Large (64px)
├─────────────────────────┤
■
```

## Layout Grid System

### Mobile (320px - 767px)
```
┌─────────────────────────────┐
│                             │
│    Single Column Layout     │
│                             │
│  ┌───────────────────────┐  │
│  │      Post Card        │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │      Post Card        │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │      Post Card        │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

### Tablet (768px - 1023px)
```
┌──────────────────────────────────────┐
│                                      │
│      Two Column Layout               │
│                                      │
│  ┌──────────────┐  ┌──────────────┐  │
│  │  Post Card   │  │  Post Card   │  │
│  └──────────────┘  └──────────────┘  │
│                                      │
│  ┌──────────────┐  ┌──────────────┐  │
│  │  Post Card   │  │  Post Card   │  │
│  └──────────────┘  └──────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

### Desktop (1024px+)
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           Three Column Layout                      │
│                                                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │Post Card  │  │Post Card  │  │Post Card  │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│                                                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │Post Card  │  │Post Card  │  │Post Card  │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│                                                    │
└────────────────────────────────────────────────────┘
```

## Component Anatomy

### Post Card
```
┌─────────────────────────────────────┐
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│ ┃ Title of the Blog Post        ┃   │ ← H3, Bold
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
│                                     │
│ 👤 Author Name    📅 Date           │ ← Meta Info
│ ─────────────────────────────────── │
│                                     │
│ This is the excerpt of the post     │ ← Body Text
│ content that will be displayed...   │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ [Read More]      ✏️  🗑️             │ ← Actions
│                                     │
└─────────────────────────────────────┘
```

### Form Layout
```
┌─────────────────────────────────────┐
│                                     │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│ ┃     Create New Post           ┃   │ ← H1, Centered
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
│                                     │
│ Share your thoughts and ideas       │ ← Subtitle
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ 📝 Post Title *                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 👤 Author Name *                    │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📄 Content *                        │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [  Publish Post  ]  [  Cancel  ]    │
│                                     │
└─────────────────────────────────────┘
```

## Button States

### Primary Button
```
Normal State
┌──────────────────┐
│  Publish Post    │  Background: #2563eb
└──────────────────┘  Color: White

Hover State
┌──────────────────┐
│  Publish Post ↑  │  Background: #1d4ed8
└──────────────────┘  Shadow: Elevated

Active/Pressed
┌──────────────────┐
│  Publish Post ↓  │  Background: #1e40af
└──────────────────┘  Transform: Scale down
```

### Secondary Button
```
Normal State
┌──────────────────┐
│     Cancel       │  Background: #64748b
└──────────────────┘  Color: White

Hover State
┌──────────────────┐
│     Cancel ↑     │  Background: #475569
└──────────────────┘  Shadow: Elevated
```

### Danger Button
```
Normal State
┌──────────────────┐
│  Delete Post     │  Background: #dc2626
└──────────────────┘  Color: White

Hover State
┌──────────────────┐
│  Delete Post ↑   │  Background: #b91c1c
└──────────────────┘  Shadow: Elevated
```

## Icon Usage

```
Navigation:
🏠 Home
➕ New Post
✏️ Edit
🗑️ Delete

Meta Information:
👤 Author
📅 Date
🕐 Time
📝 Content

States:
✅ Success
❌ Error
⚠️ Warning
ℹ️ Info
```

## Shadow System

```
Small Shadow (Subtle)
─────────────────────
Elevation: 2px
Blur: 4px
Color: rgba(0,0,0,0.05)
Use: Cards at rest


Medium Shadow (Moderate)
─────────────────────
Elevation: 4px
Blur: 6px
Color: rgba(0,0,0,0.1)
Use: Elevated cards


Large Shadow (Prominent)
─────────────────────
Elevation: 10px
Blur: 15px
Color: rgba(0,0,0,0.1)
Use: Modals, popovers


XL Shadow (Floating)
─────────────────────
Elevation: 20px
Blur: 25px
Color: rgba(0,0,0,0.1)
Use: Hover states, active cards
```

## Border Radius

```
Small: 6px    ╭──╮
              │  │
              ╰──╯

Medium: 8px   ╭───╮
              │   │
              ╰───╯

Large: 12px   ╭────╮
              │    │
              ╰────╯

XL: 16px      ╭─────╮
              │     │
              ╰─────╯
```

## Animation Timing

```
Fast: 150ms
├────┤
Use: Hover effects, button states

Base: 250ms
├──────────┤
Use: Most transitions, fades

Slow: 350ms
├──────────────┤
Use: Complex animations, page transitions
```

## Responsive Images

```
Mobile (375px):
┌────────────────┐
│                │
│     Image      │  Max-width: 100%
│                │  Height: Auto
└────────────────┘

Tablet (768px):
┌─────────────────────────┐
│                         │
│        Image            │  Max-width: 100%
│                         │  Height: Auto
└─────────────────────────┘

Desktop (1200px):
┌──────────────────────────────────┐
│                                  │
│           Image                  │  Max-width: 800px
│                                  │  Height: Auto
└──────────────────────────────────┘
```

## Z-Index Layers

```
Layer 10000: Modals & Overlays
Layer 1000:  Navigation Bar (Sticky)
Layer 100:   Dropdowns & Tooltips
Layer 10:    Elevated Cards (Hover)
Layer 1:     Normal Content
Layer 0:     Base Layer
```

## Accessibility Features

```
✓ Semantic HTML5 tags
✓ ARIA labels on icons
✓ Focus visible on all interactive elements
✓ Sufficient color contrast (WCAG AA)
✓ Keyboard navigation support
✓ Screen reader friendly
✓ Form labels properly associated
✓ Error messages announced
```

## Print Styles

```
Print Layout:
─────────────────────
• Hide navigation
• Hide buttons
• Remove shadows
• Black text on white
• Optimize margins
• Page break control
```

---

## Quick Reference

### CSS Variables
```css
:root {
  --primary-color: #2563eb;
  --font-primary: 'Inter', sans-serif;
  --font-display: 'Playfair Display', serif;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --transition-base: 250ms cubic-bezier(0.4,0,0.2,1);
}
```

### Breakpoint Mixins (Concept)
```css
/* Mobile First */
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

**Last Updated:** October 2025
**Version:** 1.0.0
