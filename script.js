// ========= MENU MOBILE =========
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

// ========= BOTÃO TOPO =========
const topBtn = document.getElementById("top-btn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========= MODO ESCURO =========
const themeBtn = document.getElementById("toggle-theme");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeBtn.textContent = dark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Modo Claro";
  }
}

// ========= ANIMAÇÃO SCROLL =========
const items = document.querySelectorAll(".impacto-item");
const mostrarAoRolar = () => {
  const altura = window.innerHeight * 0.8;
  items.forEach((item) => {
    const topo = item.getBoundingClientRect().top;
    if (topo < altura) item.classList.add("visivel");
  });
};
window.addEventListener("scroll", mostrarAoRolar);
mostrarAoRolar();

// ========= CONTADORES =========
const contadores = document.querySelectorAll(".contador");
const animarContador = (el) => {
  const valorFinal = +el.getAttribute("data-valor");
  let valorAtual = 0;
  const duracao = 2000; // ms
  const incremento = Math.ceil(valorFinal / (duracao / 16));

  const atualizar = () => {
    valorAtual += incremento;
    if (valorAtual < valorFinal) {
      el.textContent = valorAtual.toLocaleString("pt-BR");
      requestAnimationFrame(atualizar);
    } else {
      el.textContent = valorFinal.toLocaleString("pt-BR");
    }
  };
  atualizar();
};

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      animarContador(e.target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });

contadores.forEach((c) => observer.observe(c));
