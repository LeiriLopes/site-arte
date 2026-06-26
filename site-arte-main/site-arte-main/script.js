const slides = document.querySelector(".slides");
const imagens = document.querySelectorAll(".slides img");

const dadosObras = [
    { titulo: "Obra 1", descricao: "descrição." },
    { titulo: "Obra 2", descricao: "descrição." },
    { titulo: "Obra 3", descricao: "descrição." },
    { titulo: "Obra 4", descricao: "descrição." },
    { titulo: "Obra 5", descricao: "descrição." },
    { titulo: "Obra 6", descricao: "descrição." },
    { titulo: "Obra 7", descricao: "descrição." },
    { titulo: "Obra 8", descricao: "descrição." },
];

// modal html
const modal = document.createElement("div");
modal.id = "modal-obra";
modal.innerHTML = `
    <div class="modal-fundo"></div>
    <div class="modal-conteudo">
        <button class="modal-fechar">&times;</button>
        <img class="modal-img" src="" alt="">
        <div class="modal-texto">
            <h3 class="modal-titulo"></h3>
            <p class="modal-descricao"></p>
        </div>
    </div>
`;
document.body.appendChild(modal);

// modal css
const estilo = document.createElement("style");
estilo.textContent = `
    #modal-obra {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }

    #modal-obra.aberto {
        display: flex;
    }

    .modal-fundo {
        position: absolute;
        inset: 0;
        background: rgba(30, 20, 10, 0.75);
        backdrop-filter: blur(4px);
        cursor: pointer;
    }

    .modal-conteudo {
        position: relative;
        background: #f8f3ed;
        border-radius: 20px;
        padding: 30px;
        max-width: 520px;
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 1;
        animation: modalEntrar 0.3s ease;
    }

    @keyframes modalEntrar {
        from { opacity: 0; transform: scale(0.93); }
        to   { opacity: 1; transform: scale(1); }
    }

    .modal-img {
        width: 100%;
        border-radius: 14px;
        object-fit: cover;
        max-height: 340px;
    }

    .modal-texto {
        text-align: center;
    }

    .modal-titulo {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.8rem;
        color: #4e4137;
        margin-bottom: 8px;
    }

    .modal-descricao {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        color: #7a6553;
        line-height: 1.7;
    }

    .modal-fechar {
        position: absolute;
        top: 14px;
        right: 18px;
        background: none;
        border: none;
        font-size: 1.6rem;
        color: #9a7657;
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s;
    }

    .modal-fechar:hover {
        color: #4e4137;
    }

    .slides img {
        cursor: pointer;
    }
`;
document.head.appendChild(estilo);

// clicar
imagens.forEach((img, index) => {
    const i = index % dadosObras.length;

    img.addEventListener("click", () => {
        modal.querySelector(".modal-img").src = img.src;
        modal.querySelector(".modal-img").alt = img.alt;
        modal.querySelector(".modal-titulo").textContent = dadosObras[i].titulo;
        modal.querySelector(".modal-descricao").textContent = dadosObras[i].descricao;
        modal.classList.add("aberto");
        document.body.style.overflow = "hidden";
    });
});

// fechar
modal.querySelector(".modal-fechar").addEventListener("click", fecharModal);
modal.querySelector(".modal-fundo").addEventListener("click", fecharModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
});

function fecharModal() {
    modal.classList.remove("aberto");
    document.body.style.overflow = "";
}

// carrossel
let posicao = 0;
const velocidade = 2;
let pausado = false;

slides.addEventListener("mouseenter", () => { pausado = true; });
slides.addEventListener("mouseleave", () => { pausado = false; });

function animar() {
    if (!pausado) {
        posicao -= velocidade;

        const larguraTotal = slides.scrollWidth / 2;
        if (Math.abs(posicao) >= larguraTotal) posicao = 0;

        slides.style.transform = `translateX(${posicao}px)`;
    }
    requestAnimationFrame(animar);
}

animar();