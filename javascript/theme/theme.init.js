import {
  applyEffectiveTheme,
  toggleTheme,
  setupSystemThemeObserver,
} from "./theme.core.js"

// Função auxiliar para configurar os botões de tema
const setupThemeButton = (buttonId) => {
  const button = document.getElementById(buttonId)
  if (!button) return

  const updateAriaLabel = (isDark) => {
    button.setAttribute(
      "aria-label",
      isDark ? "Alternar para tema claro" : "Alternar para tema escuro",
    )
  }

  button.addEventListener("click", () => {
    toggleTheme()
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark"
    updateAriaLabel(isDark)
  })

  const isDark = document.documentElement.getAttribute("data-theme") === "dark"
  updateAriaLabel(isDark)
}

const initDesktopThemeToggle = () => setupThemeButton("toggle__theme")

// Inicializa todo o sistema de tema
export const initTheme = () => {
  applyEffectiveTheme() // Aplica o tema primeiro

  setTimeout(() => {
    initDesktopThemeToggle() // Apenas desktop agora
    setupSystemThemeObserver() // Continua respeitando o sistema
  }, 50)
}
