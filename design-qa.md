# Services reference implementation QA

## Comparison target

- Source visual truth: `/var/folders/0b/0jn3zdq93k51zwzdmrl6sqsw0000gn/T/codex-clipboard-9f55cde8-3fae-4523-8f54-8252b43eefa5.png`
- Implementation evidence: in-app browser capture of `http://localhost:3000/#services` (rendered in this task; the browser capture API did not return a filesystem path)
- Desktop viewport: source 2048 × 986 resized capture; implementation 1920 × 1000 CSS px at device scale factor 1.
- State: first service selected (`AI Chatbot`). A second browser check selected `Web Development` and confirmed the panel content, tags, CTA label, and image alt text update.
- Normalization: the implementation includes the existing Cinqode sticky header and trust strip; comparison focuses on the Services showcase beneath them.

## Full-view comparison

The implementation reproduces the reference's split composition: a white, numbered service selector on the left and a pale detail panel on the right. The selected service uses dark text while inactive services are muted, and the panel includes rounded capability pills, summary text, arrow CTA, and a product-preview monitor image.

## Focused-region comparison

The left selector and right detail panel were readable at desktop scale, so no additional crop was required. The monitor preview, selected state, and panel spacing were visible in the same desktop capture.

## Required fidelity surfaces

- **Fonts and typography:** Large, compact-weight service names and small two-digit markers preserve the reference hierarchy. Existing site typography remains in use for consistency.
- **Spacing and layout rhythm:** The two equal-width panels, generous selector padding, and top-aligned detail copy match the reference's editorial layout. The project preview was moved up after the first review so it remains visible with the detail content.
- **Colors and visual tokens:** White selector surface, soft blue-gray detail surface, dark navy text, subdued inactive labels, and Cinqode-blue CTA accent match the requested light-brand adaptation.
- **Image quality and asset fidelity:** A generated, front-facing Cinqode-blue dashboard monitor asset is used as the project preview; it is sharp, properly contained, and not replaced by CSS or SVG art.
- **Copy and content:** The reference's generic services are replaced with Cinqode's actual ten offerings, each with relevant tags and detail copy.

## Comparison history

1. **P2 — Project preview below the initial desktop fold.** The original panel used bottom-aligned preview spacing, which deferred the monitor image too far down. Fixed by reducing top spacing and placing the preview directly after the CTA. The final desktop capture shows the monitor alongside the details.
2. **P2 — Inactive service labels failed contrast.** Replaced the light gray with `#64748b`, then reran the accessibility scan successfully.

## Follow-up polish

- **P3 — List length:** The reference contains seven entries; Cinqode has ten. The final item can fall below the first desktop viewport, which is an intentional adaptation to retain every supplied service. On mobile, the selector becomes horizontally scrollable so the active details remain close to the controls.

## Final result

passed
