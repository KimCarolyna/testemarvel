class Personagem {
  constructor(nome, descricao, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontos = 0;
  }
}

const personagens = {
  ferro: new Personagem(
    "Homem de Ferro",
    "Você é inteligente, inovador e sempre encontra uma solução.",
    "imagens/homem_de_ferro.jpg"
  ),
  cap: new Personagem(
    "Capitão América",
    "Você é justo, corajoso e inspira todos ao redor.",
    "imagens/capitaoamerica.jpg"
  ),
  viuva: new Personagem(
    "Viúva Negra",
    "Você é estratégico, observador e muito determinado.",
    "imagens/viuva123.jpg"
  )
};

const perguntas = [
  {
    texto: "Como você toma decisões?",
    opcoes: [
      { texto: "Pela lógica", pontos: { ferro: 3, cap: 1, viuva: 2 } },
      { texto: "Pelo coração", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Pela estratégia", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Seu maior valor é:",
    opcoes: [
      { texto: "Inteligência", pontos: { ferro: 3, viuva: 1, cap: 1 } },
      { texto: "Justiça", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Controle", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Como seus amigos te veem?",
    opcoes: [
      { texto: "Criativo", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Confiável", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Misterioso", pontos: { viuva: 3, ferro: 1, cap: 1 } }
    ]
  },
  {
    texto: "Em um problema você:",
    opcoes: [
      { texto: "Inventa algo", pontos: { ferro: 3, viuva: 1, cap: 1 } },
      { texto: "Ajuda todos", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Age em silêncio", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Você prefere:",
    opcoes: [
      { texto: "Tecnologia", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Liderança", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Planejamento", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Seu estilo é:",
    opcoes: [
      { texto: "Moderno", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Clássico", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Discreto", pontos: { viuva: 3, ferro: 1, cap: 1 } }
    ]
  },
  {
    texto: "O que te define?",
    opcoes: [
      { texto: "Brilhante", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Nobre", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Frio", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Numa equipe você é:",
    opcoes: [
      { texto: "Inventor", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Líder", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Analista", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Seu ponto forte:",
    opcoes: [
      { texto: "Criatividade", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Coragem", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Precisão", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  },
  {
    texto: "Como enfrenta desafios?",
    opcoes: [
      { texto: "Criando soluções", pontos: { ferro: 3, cap: 1, viuva: 1 } },
      { texto: "Enfrentando de frente", pontos: { cap: 3, ferro: 1, viuva: 1 } },
      { texto: "Pensando antes", pontos: { viuva: 3, ferro: 2, cap: 1 } }
    ]
  }
];

let perguntaAtual = 0;

function iniciarQuiz() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("barra-container").style.display = "block";
  mostrarPergunta();
}

function atualizarBarra() {
  const progresso = (perguntaAtual / perguntas.length) * 100;
  document.getElementById("barra").style.width = progresso + "%";
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = pergunta.texto;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  pergunta.opcoes.forEach(opcao => {
    const botao = document.createElement("button");
    botao.innerText = opcao.texto;
    botao.onclick = () => selecionarOpcao(opcao.pontos);
    opcoesDiv.appendChild(botao);
  });

  atualizarBarra();
}

function selecionarOpcao(pontos) {
  for (let key in pontos) {
    personagens[key].pontos += pontos[key];
  }

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  let vencedor = null;

  for (let key in personagens) {
    if (!vencedor || personagens[key].pontos > vencedor.pontos) {
      vencedor = personagens[key];
    }
  }

  document.getElementById("personagemNome").innerText =
    "Seu herói é: " + vencedor.nome;

  document.getElementById("pontuacao").innerText =
    "Pontuação: " + vencedor.pontos + " pontos";

  document.getElementById("descricao").innerText = vencedor.descricao;
  document.getElementById("imagem").src = vencedor.imagem;
}

function reiniciar() {
  location.reload();
}