import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070811",
        midnight: "#0d1020",
        panel: "#111529",
        line: "rgba(255,255,255,0.1)",
        rosefire: "#ff4da6",
        violetglow: "#8a5cff",
        amberglow: "#ff8a3d",
        gold: "#ffd166"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(255, 77, 166, 0.14)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #ff4da6 0%, #8a5cff 56%, #ff8a3d 100%)",
        "soft-grid":
          "radial-gradient(circle at 20% -10%, rgba(255,77,166,.22), transparent 30%), radial-gradient(circle at 92% 4%, rgba(255,138,61,.16), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
