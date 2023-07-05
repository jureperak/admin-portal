const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                sblue: {
                    "900": "#002649",
                    "200": "#f5f8fa",
                    "300": "#0a3761",
                },
                sgray: {
                    "50": "#fcfcfc",
                    "100": "#fafafa",
                    "200": "#f4f5f5",
                    "300": "#eef0f2",
                    "400": "#e7e7e7",
                    "500": "#e3e3e3",
                    "600": "#eff2f5",
                    "700": "#4d5f6f",
                    "800": "#cdd8e2",
                    "900": "#72889d",
                },
                syellow: {
                    "500": "#dafda3",
                    "400": "#f0feda",
                    "300": "#5b8206",
                },
                sred: {
                    "500": "#d03e00",
                    "600": "#b73600",
                },
            },
            boxShadow: {
                "3xl": "0 0.25rem 1.125rem -0.25rem rgba(0, 0, 0, 0.2)",
            },
            // https://tailwindcss.com/docs/font-family#customizing-the-default-font
            fontFamily: {
                sans: ["Akzidenz Grotesk Pro", ...defaultTheme.fontFamily.sans],
            },
        },
        plugins: [],
    },
};
