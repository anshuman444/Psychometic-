# VidyaLoop Logo & Branding Usage Guidelines

## 1. Primary Colors
The entire application (Dashboards, Assessment Flow, PDF Reports) MUST strictly adhere to the following color palette:
*   **Primary:** `#2DA8FF`
*   **Secondary:** `#57B7FF`
*   **Accent:** `#0D8BFF`
*   **Background:** `#F8FAFC`
*   **Surface (Cards/Modals):** `#FFFFFF`

## 2. Logo Placement
*   **Authentication Screens:** Centered, large (`primaryLight` variant).
*   **Assessment Top Bar:** Top left, small (`iconOnly` variant for mobile, `primaryLight` for desktop).
*   **PDF Report Header:** Top right of the cover page and all subsequent pages.
*   **Loading States:** The `iconOnly` variant should pulse in the center of the screen during heavy calculations (e.g., when `themeCalculation.ts` is running).

## 3. Strict Rules
*   Do NOT invent new colors. If a chart requires multiple colors (e.g., the Radar Chart), derive opacities from the Primary color (`#2DA8FF` at 20%, 40%, etc.).
*   Do NOT use generic placeholder text or fonts. Use only 'Inter' and 'Outfit' as specified in `brandAssets.ts`.
