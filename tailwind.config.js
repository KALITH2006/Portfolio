export default {
      content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
      theme: {
        extend: {
          colors: {
            "outline": "#849495",
            "on-primary": "#003739",
            "primary-fixed-dim": "#00dce5",
            "surface-bright": "#343946",
            "on-background": "#dde2f3",
            "error-container": "#93000a",
            "primary": "#e9feff",
            "tertiary-container": "#ffdb3f",
            "on-secondary-fixed": "#001e2c",
            "on-secondary": "#00354a",
            "on-tertiary-fixed-variant": "#544600",
            "background": "#0e131f",
            "tertiary-fixed-dim": "#e7c427",
            "on-surface-variant": "#b9caca",
            "on-error-container": "#ffdad6",
            "surface-tint": "#00dce5",
            "tertiary-fixed": "#ffe16c",
            "inverse-surface": "#dde2f3",
            "on-tertiary-fixed": "#221b00",
            "on-surface": "#dde2f3",
            "on-secondary-container": "#00374d",
            "surface-container-low": "#161c28",
            "secondary": "#7bd0ff",
            "on-tertiary-container": "#736000",
            "on-primary-fixed-variant": "#004f53",
            "tertiary": "#fff9f0",
            "secondary-fixed": "#c4e7ff",
            "surface-container-lowest": "#080e1a",
            "secondary-container": "#00a6e0",
            "inverse-primary": "#00696e",
            "surface": "#0e131f",
            "surface-container-highest": "#2f3542",
            "on-error": "#690005",
            "surface-variant": "#2f3542",
            "inverse-on-surface": "#2b303d",
            "on-primary-container": "#006c71",
            "surface-dim": "#0e131f",
            "error": "#ffb4ab",
            "secondary-fixed-dim": "#7bd0ff",
            "primary-container": "#00f5ff",
            "surface-container": "#1a202c",
            "on-primary-fixed": "#002021",
            "on-secondary-fixed-variant": "#004c69",
            "surface-container-high": "#242a36",
            "outline-variant": "#3a494a",
            "primary-fixed": "#63f7ff",
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
            "headline-lg-mobile": ["Space Grotesk"],
            "body-sm": ["Inter"],
            "terminal-header": ["Space Mono"],
            "display-xl": ["Space Grotesk"],
            "headline-lg": ["Space Grotesk"],
            "label-caps": ["Space Mono"],
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
