const slides = document.querySelector(".slides");
const imagens = document.querySelectorAll(".slides img");

let posicao = 0;
let velocidade = 2;
let pausado = false;

slides.addEventListener("mouseenter", () => {
    pausado = true;
});

slides.addEventListener("mouseleave", () => {
    pausado = false;
});

function animar() {
    if (!pausado) {
       posicao -= velocidade * 1.5;

        const larguraTotal = slides.scrollWidth / 2;

        if (Math.abs(posicao) >= larguraTotal) {
            posicao = 0;
        }

        slides.style.transform = `translateX(${posicao}px)`;
    }

    requestAnimationFrame(animar);

}

animar();