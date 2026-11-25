(function () {
    const STORAGE_KEY = "vsp-theme";
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function getEffectiveTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return mediaQuery.matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;

        const isDark = theme === "dark";
        btn.setAttribute("aria-pressed", String(isDark));
        btn.setAttribute(
            "aria-label",
            isDark ? "Mudar para modo claro" : "Mudar para modo escuro"
        );

        const label = btn.querySelector(".theme-label");
        if (label) {
            label.textContent = isDark ? "Claro" : "Escuro";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        applyTheme(getEffectiveTheme());

        const btn = document.getElementById("theme-toggle");
        if (btn) {
            btn.addEventListener("click", function () {
                const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
                localStorage.setItem(STORAGE_KEY, nextTheme);
                applyTheme(nextTheme);
            });
        }

        mediaQuery.addEventListener("change", function (event) {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(event.matches ? "dark" : "light");
            }
        });
    });
})();
