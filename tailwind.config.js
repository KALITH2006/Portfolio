export default {
      content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
      theme: {
        extend: {
          colors: {
            "outline": "#8a8782",
            "on-primary": "#111111",
            "primary-fixed-dim": "#ff5a5a",
            "surface-bright": "#2a2a2a",
            "on-background": "#ece9e1",
            "error-container": "#93000a",
            "primary": "#fcf8ef",
            "tertiary-container": "#e4dfd9",
            "on-secondary-fixed": "#001e2c",
            "on-secondary": "#00354a",
            "on-tertiary-fixed-variant": "#544600",
            "background": "#111111",
            "tertiary-fixed-dim": "#b2aeab",
            "on-surface-variant": "#b2aeab",
            "on-error-container": "#ffdad6",
            "surface-tint": "#ff3131",
            "tertiary-fixed": "#e4dfd9",
            "inverse-surface": "#ece9e1",
            "on-tertiary-fixed": "#221b00",
            "on-surface": "#ece9e1",
            "on-secondary-container": "#00374d",
            "surface-container-low": "#161616",
            "secondary": "#b2aeab",
            "on-tertiary-container": "#736000",
            "on-primary-fixed-variant": "#004f53",
            "tertiary": "#fcf8ef",
            "secondary-fixed": "#e4dfd9",
            "surface-container-lowest": "#0a0a0a",
            "secondary-container": "#3a3836",
            "inverse-primary": "#00696e",
            "surface": "#111111",
            "surface-container-highest": "#262626",
            "on-error": "#690005",
            "surface-variant": "#262626",
            "inverse-on-surface": "#2b303d",
            "on-primary-container": "#fcf8ef",
            "surface-dim": "#111111",
            "error": "#ffb4ab",
            "secondary-fixed-dim": "#b2aeab",
            "primary-container": "#ff3131",
            "surface-container": "#1a1a1a",
            "on-primary-fixed": "#002021",
            "on-secondary-fixed-variant": "#004c69",
            "surface-container-high": "#202020",
            "outline-variant": "#2c2a28",
            "primary-fixed": "#ff7a7a",
            "on-tertiary": "#3a3000"
          },
          borderRadius: {
            DEFAULT: "0.125rem",
            lg: "0.25rem",
            xl: "0.5rem",
            full: "0.75rem"
          },
          spacing: {
            "margin-mobile": "16px",
            "gutter": "16px",
            "margin-desktop": "32px",
            "container-max": "1440px"
          },
          fontFamily: {
            "headline-lg-mobile": ["Pixelify Sans", "monospace"],
            "body-sm": ["Inter"],
            "terminal-header": ["IBM Plex Mono", "monospace"],
            "display-xl": ["Pixelify Sans", "monospace"],
            "headline-lg": ["Pixelify Sans", "monospace"],
            "label-caps": ["IBM Plex Mono", "monospace"],
            "body-md": ["Inter"]
          },
          fontSize: {
            "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "600" }],
            "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
            "terminal-header": ["14px", { lineHeight: "20px", letterSpacing: "0.1em", fontWeight: "500" }],
            "display-xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
            "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
            "label-caps": ["12px", { lineHeight: "16px", fontWeight: "700" }],
            "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
          }
        }
      }
    }
