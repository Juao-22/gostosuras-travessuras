// Script responsável por gerenciar o tema claro/escuro do portal Viva Sua Profissão
(function () {
    // Chave usada no localStorage e referência ao elemento raiz (<html>)
    const STORAGE_KEY = "vsp-theme";
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Retorna o tema salvo pelo usuário ou, caso não exista, a preferência do sistema
    function getEffectiveTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return mediaQuery.matches ? "dark" : "light";
    }

    // Aplica o atributo data-theme no <html> e atualiza texto/acessibilidade do botão
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

    // Inicializa o tema ao carregar o DOM e registra os eventos de clique e sistema
    document.addEventListener("DOMContentLoaded", function () {
        applyTheme(getEffectiveTheme());

        const btn = document.getElementById("theme-toggle");
        if (btn) {
            // Alterna entre claro e escuro ao clicar e salva a escolha no navegador
            btn.addEventListener("click", function () {
                const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
                localStorage.setItem(STORAGE_KEY, nextTheme);
                applyTheme(nextTheme);
            });
        }

        // Atualiza automaticamente se o sistema operacional mudar de tema (sem escolha manual)
        mediaQuery.addEventListener("change", function (event) {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(event.matches ? "dark" : "light");
            }
        });
    });
})();
