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
    "Gênio bilionário e tecnológico.",
    "https://i.imgur.com/1Xq9BiB.png"
  ),
  cap: new Personagem(
    "Capitão América",
    "Líder corajoso e justo.",
    "https://i.imgur.com/8QZ7Z8I.png"
  ),
  viuva: new Personagem(
    "Viúva Negra",
    "Espiã estratégica e ágil.",
    "https://i.imgur.com/YKQ9F6M.png"
  ),
  thor: new Personagem(
    "Thor",
    "O Deus do Trovão, forte e digno.",
    "https://i.imgur.com/3X9Z5sP.png"
  ),
  hulk: new Personagem(
    "Hulk",
    "Força bruta imparável e intelecto brilhante.",
    "https://i.imgur.com/2X9Z7sP.png"
  ),
  spider: new Personagem(
    "Homem-Aranha",
    "Agilidade e inteligência juvenil e sempre pronto para ajudar a vizinhaça.",
    "https://i.imgur.com/4X9Z8sP.png"
  )
};

const perguntas = [
  {
    texto: "Qual é sua principal abordagem em combate?",
    opcoes: [
      { texto: "Uso de gadgets e tecnologia de ponta", pontos: { ferro: 3, spider: 2, viuva: 1 } },
      { texto: "Estratégia e combate corpo a corpo", pontos: { cap: 3, viuva: 2, thor: 1 } },
      { texto: "Força bruta e impacto direto", pontos: { hulk: 3, thor: 2, cap: 1 } },
      { texto: "Agilidade e ataques surpresa", pontos: { spider: 3, viuva: 2, ferro: 1 } }
    ]
  },
  {
    texto: "Como você lida com um erro da equipe?",
    opcoes: [
      { texto: "Analiso o erro para criar uma solução técnica", pontos: { ferro: 3, hulk: 2 } },
      { texto: "Assumo a responsabilidade e encorajo a todos", pontos: { cap: 3, spider: 2 } },
      { texto: "Mantenho o foco na missão, sem distrações", pontos: { viuva: 3, thor: 1 } }
    ]
  },
  {
    texto: "O que você prefere fazer nas horas vagas?",
    opcoes: [
      { texto: "Trabalhar em projetos no laboratório", pontos: { ferro: 3, hulk: 3 } },
      { texto: "Treinar ou ajudar pessoas na rua", pontos: { cap: 2, spider: 3 } },
      { texto: "Explorar novos lugares ou viajar", pontos: { thor: 3, viuva: 1 } }
    ]
  },
  {
    texto: "Em uma invasão alienígena, onde você estaria?",
    opcoes: [
      { texto: "Na linha de frente destruindo tudo", pontos: { hulk: 3, thor: 3 } },
      { texto: "Coordenando o plano de defesa", pontos: { cap: 3, ferro: 1 } },
      { texto: "Resgatando civis em perigo", pontos: { spider: 3, cap: 2 } },
      { texto: "Sabotando a nave mãe por dentro", pontos: { viuva: 3, ferro: 2 } }
    ]
  }
];

function atualizarBarra() {
  const progresso = (perguntaAtual / perguntas.length) * 100;
  document.getElementById("barra").style.width = progresso + "%";
}

function mostrarPergunta() {
  const quiz = document.getElementById("quiz");
  quiz.classList.remove("fade");
  void quiz.offsetWidth;
  quiz.classList.add("fade");

  const p = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = p.texto;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  p.opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op.texto;

    btn.onclick = () => selecionarOpcao(op.pontos);

    opcoesDiv.appendChild(btn);
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
  const resultado = document.getElementById("resultado");

  resultado.style.display = "block";
  resultado.classList.add("fade");

  let vencedor = null;

  for (let key in personagens) {
    if (!vencedor || personagens[key].pontos > vencedor.pontos) {
      vencedor = personagens[key];
    }
  }

  document.getElementById("personagemNome").innerText = vencedor.nome;
  document.getElementById("descricao").innerText = vencedor.descricao;
  document.getElementById("imagem").src = vencedor.imagem;
}

let perguntaAtual = 0;
function iniciarQuiz() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = p.texto;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  p.opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op.texto;

    btn.onclick = () => selecionarOpcao(op.pontos);

    opcoesDiv.appendChild(btn);
  });
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

  document.getElementById("personagemNome").innerText = vencedor.nome;
  document.getElementById("descricao").innerText = vencedor.descricao;
  document.getElementById("imagem").src = vencedor.imagem;
}

function reiniciar() {
  location.reload();
}