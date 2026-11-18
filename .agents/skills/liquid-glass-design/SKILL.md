---
name: liquid-glass-design
description: Apple Liquid Glass frontend design and implementation guidance for web UI polish, SVG displacement/refraction, chromatic aberration, glass controls, screenshot QA, clean-edge fixes, native Apple API guardrails, and browser fallbacks. Use when the user asks for Apple Liquid Glass, 苹果液态玻璃, glassmorphism, frosted glass, SVG filter, feDisplacementMap, backdrop-filter, translucent panels, glossy controls, native Liquid Glass APIs, or premium visual refinement.
---

# Liquid Glass Design

Use this skill to make web UI feel Apple Liquid Glass inspired without pretending the browser can fully reproduce native Apple rendering.

This skill was trained and distilled by **麦克 & 阮梅 (Codex)** from Apple's public design references and real CSS/SVG implementation work. It is not affiliated with Apple.

## Core Judgment

Prefer the smallest layer that changes the feel:

1. Shared CSS tokens for background, panel, border, highlight, shadow, and text.
2. Glass treatment on chrome first: nav, toolbar, side rail, floating controls, modal surfaces, primary hero/stat controls.
3. Content stays readable and mostly opaque.
4. SVG displacement/refraction only where the background has enough visual information to bend.
5. Dense cards, tables, chat, and body copy default to quiet translucent panels, not full refraction.

Do not turn every card into glass. Liquid Glass works because hierarchy stays clear.

## Source Anchors

Use these when judging whether the result is real Liquid Glass or just old glassmorphism:

- Apple HIG Materials: Liquid Glass is a dynamic material for controls/navigation without obscuring content: `https://developer.apple.com/design/human-interface-guidelines/materials`
- WWDC25 "Meet Liquid Glass": focus on dynamics, adaptivity, optical/physical properties, and use-where-it-helps: `https://developer.apple.com/videos/play/wwdc2025/219/`
- Kube CSS/SVG article: web recreation needs `backdrop-filter: url(#filter)` plus SVG displacement/refraction maps: `https://kube.io/blog/liquid-glass-css-svg/`
- CSS-Tricks realistic glass: SVG filters can stack shadow, blur, and distortion into one optical layer: `https://css-tricks.com/making-a-realistic-glass-effect-with-svg/`
- Reference repos to inspect before serious implementation: `rdev/liquid-glass-react`, `nikdelvin/liquid-glass`, `lucaperullo/simple-liquid-glass`, `Leonxlnx/liquid-glass`.
- Native comparison reference: `affaan-m/ECC/skills/liquid-glass-design` is iOS/SwiftUI/UIKit focused and is useful for reminding web agents not to fake native APIs with browser CSS: `https://github.com/affaan-m/ECC/blob/main/skills/liquid-glass-design/SKILL.md`

## Native Apple API Guardrail

Use this skill as web-first Liquid Glass guidance. If the target is a native Apple app, route to the platform before CSS/SVG:

- SwiftUI: prefer standard controls/toolbars first, then `glassEffect(_:in:)`, `GlassEffectContainer`, `Glass`, and glass button styles when the deployed SDK supports them.
- UIKit: prefer `UIGlassEffect`, `UIGlassContainerEffect`, and `UIVisualEffectView`-based composition when available.
- AppKit/WidgetKit: use system-provided materials and current Apple guidance for the target OS instead of porting web filters.
- WebView or browser UI: use the CSS/SVG recipes in this skill, with fallbacks.

Do not paste CSS/SVG refraction into a native SwiftUI/UIKit request unless the surface is actually web-rendered. Do not copy native API snippets from external repos without checking Apple documentation for the target SDK.

## Visual Recipe

Use these ingredients in order:

- a real background to refract: photo, video, UI content, noise field, or colorful scene
- semi-transparent fill: white/cool-white for light UI, smoke/cyan-tinted for dark HUDs
- `backdrop-filter: url("#liquid-refraction") blur(...) saturate(...) contrast(...)`
- SVG `feImage` displacement map + `feDisplacementMap` using R/G channels for x/y bending
- edge lensing: stronger displacement near rounded edges, calmer center
- chromatic aberration only on edges or small controls, never body text
- specular highlight: top/left inner light, moving shimmer, or radial glint
- crisp border: 1px translucent border plus subtle inner shadow
- soft outer shadow; heavy black shadow only for dark game/HUD scenes
- motion only where useful: hover lift, highlight shift, active compression, elastic cursor follow for buttons
- Apple-like clarity: if it reads as frosted acrylic, cut blur and white fill before adding more effects
- palette discipline: choose a glass temperature, then update displacement map, icon color, HUD lines, progress bars, and glows together

Avoid:

- low-contrast text on busy glass
- all-purple gradients
- huge blur on scrolling lists
- glass inside glass
- glass panels over glass panels
- strong distortion behind body copy
- applying `filter: url(...)` only to a shine pseudo-element and calling it Liquid Glass; the glass surface itself must distort the backdrop
- defaulting to green/cyan casts when the surface should feel cold, Apple-like, or premium
- turbulence/displacement filters on clipped border pseudo-elements; they often create dirty right/bottom edge artifacts
- mistaking noisy edges for optical thickness

## Implementation Ladder

Use the first rung that is enough:

1. CSS glass: `background + border + backdrop-filter: blur/saturate`.
2. SVG refraction: add `backdrop-filter: url("#filter") blur(...)` and a static displacement map.
3. Premium control: add chromatic aberration, edge-only displacement, shimmer, and hover/press states.
4. Library/reference port: inspect `liquid-glass-react` or similar only for high-value components.
5. WebGL/canvas shader: use only for hero demos or a dedicated visual surface.

Never add a dependency when one inline SVG filter and CSS class solves the current surface.

## SVG Refraction Pattern

Minimum useful filter:

```tsx
const displacementMap = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160">
  <linearGradient id="x" x1="0" x2="1">
    <stop offset="0" stop-color="#106d80"/>
    <stop offset=".5" stop-color="#808080"/>
    <stop offset="1" stop-color="#f5a080"/>
  </linearGradient>
  <linearGradient id="y" y1="0" y2="1">
    <stop offset="0" stop-color="#802080"/>
    <stop offset=".5" stop-color="#808080"/>
    <stop offset="1" stop-color="#80f080"/>
  </linearGradient>
  <rect width="240" height="160" fill="#808080"/>
  <rect width="240" height="160" fill="url(#x)" opacity=".55"/>
  <rect width="240" height="160" fill="url(#y)" opacity=".48"/>
</svg>
`)}`;
```

```html
<svg class="liquid-filter" aria-hidden="true">
  <filter id="liquid-refraction" color-interpolation-filters="sRGB">
    <feImage href="{displacementMap}" width="100%" height="100%" preserveAspectRatio="none" result="map" />
    <feDisplacementMap in="SourceGraphic" in2="map" scale="28" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```

```css
.liquid-glass {
  background: rgba(255,255,255,.34);
  border: 1px solid rgba(255,255,255,.45);
  box-shadow: inset 1px 1px 0 rgba(255,255,255,.7), 0 18px 48px rgba(0,0,0,.18);
  backdrop-filter: url("#liquid-refraction") blur(18px) saturate(150%) contrast(108%);
}
```

Keep text above the refraction layer with `isolation: isolate` and child `z-index`.

## Screenshot Tuning Rules

Use user screenshots as the highest-signal taste data.

- If the glass is "too frosted": halve blur first, then reduce white overlay opacity, then retune saturation/contrast.
- If the color feels wrong: change the SVG displacement map and every visible accent in the same pass; run a grep for old hue leftovers.
- If the right or bottom edge looks dirty: remove noisy edge filters, use clean CSS inset shadows, and add `clip-path: inset(0 round <radius>)`.
- If a card looks fake: verify the glass element itself has `backdrop-filter: url("#...")`, not only a shine pseudo-element.
- If text becomes cloudy: keep content in a higher z-index layer and reduce specular opacity.

## CSS Starting Point

Use this as a first-pass token shape, then tune from screenshots:

```css
:root[data-theme="liquid-light"] {
  --glass-bg: rgba(255, 255, 255, 0.68);
  --glass-bg-strong: rgba(255, 255, 255, 0.82);
  --glass-border: rgba(255, 255, 255, 0.72);
  --glass-shadow: 0 18px 48px rgba(35, 49, 78, 0.12);
  --glass-inner: inset 0 1px 0 rgba(255, 255, 255, 0.82);
  --glass-blur: blur(22px) saturate(150%);
  --glass-text: #172033;
  --glass-muted: #667085;
  --glass-accent: #4f8cff;
  --glass-warm: #ff8fb8;
}

.liquid-glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow), var(--glass-inner);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
}

@supports not (backdrop-filter: blur(1px)) {
  .liquid-glass {
    background: var(--glass-bg-strong);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .liquid-glass {
    background: #fff;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

## React Reference

Use `rdev/liquid-glass-react` as the first reference implementation when the task involves a React surface, a prototype, or a high-value Liquid Glass control.

What to borrow:

- Keep content sharp and put the warp/filter layer behind it.
- Use displacement/refraction on small controls, primary stat cards, or hero-level components.
- Tune `displacementScale`, `blurAmount`, `saturation`, `aberrationIntensity`, `elasticity`, and `cornerRadius` per component.
- Use `mouseContainer` only when the glass should respond to a larger hover field.
- Treat `shader` mode as experimental; prefer `standard`, `polar`, or `prominent` first.

Compare against other repos when the first reference is not enough:

- `nikdelvin/liquid-glass`: pure CSS/SVG filter recreation; useful for cards/panels and Safari fallback ideas.
- `lucaperullo/simple-liquid-glass`: small zero-dependency React/web component; useful when dependency weight matters.
- `Leonxlnx/liquid-glass`: richer interaction model with shimmer border, spring physics, displacement maps, and chromatic aberration.

Do not do this by default:

- Do not add React just to use this library in a non-React app.
- Do not use the component for dense cards, chat messages, long lists, table rows, or body copy.
- Do not rely on displacement as the only visual layer; Safari and Firefox may only partially show the effect.
- Do not ship it without a non-displacement fallback.

Use the library as visual and interaction reference first. Implement the main theme with CSS tokens and native app patterns. Add a React island or port the effect only if a specific, high-value control justifies the extra runtime cost.

## Review Checklist

Before finishing, verify:

- Text contrast is readable on every glass surface.
- The main content layer is not made translucent by default.
- Mobile does not become a blur-heavy scroll trap.
- The effect still looks good with transparency disabled.
- Browser supports the intended path: `CSS.supports("backdrop-filter", "url('#liquid-refraction') blur(1px)")`.
- Screenshot shows background bending inside the glass, not only a white overlay.
- Strong refraction appears only on chosen hero/primary surfaces.
- Blur is not doing all the work; if the surface reads as frosted, reduce blur and opacity.
- Right and bottom edges are inspected at 100% zoom for dirty clipped-filter artifacts.
- No turbulence/displacement filter is used directly on border cleanup pseudo-elements unless the screenshot proves clean edges.
- Color scan confirms no unwanted hue leftovers after palette changes.

Skipped: full Liquid Glass parity. Add it only for small, high-value components where SVG/WebGL refraction is worth the browser risk.
