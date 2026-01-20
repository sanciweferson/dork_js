const backToTop = document.querySelector(".back-to-top")
const circle = document.querySelector(".progress-ring__circle")

const radius = circle.r.baseVal.value
const circumference = 2 * Math.PI * radius

circle.style.strokeDasharray = `${circumference} ${circumference}`
circle.style.strokeDashoffset = circumference

/* função que atualiza o anel */
function setProgress(percent) {
  const offset = circumference - percent * circumference
  circle.style.strokeDashoffset = offset
}

/* scroll */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight

  const progress = scrollTop / docHeight

  /* atualiza anel */
  setProgress(progress)

  /* mostra / esconde botão */
  if (scrollTop > 300) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }
})

/* clique volta ao topo */
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
