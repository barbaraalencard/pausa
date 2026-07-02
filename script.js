const state = {
    screen: "home",
    situation: null,
    step: 0,
    answers: []
};

const app = document.querySelector("#app");

const frases = [
    "Nem toda urgência precisa de uma resposta agora.",
    "Você também faz parte das suas prioridades.",
    "Respira. Não existe problema em pensar antes.",
    "Você pode gostar de alguém sem estar sempre disponível.",
    "Tudo bem mudar de ideia.",
    "Confiança é construída aos poucos."
];

const situations = [
    {
        id: "invite",
        color: "blue",
        icon: "📅",
        title: "Recebi um convite",
        description: "Vamos pensar antes de responder.",
        questions: [
            {
                text: "Quando você imaginou aceitar esse convite, o que apareceu primeiro?",
                options: [
                    { label: "Vontade de ir 😊", value: "want" },
                    { label: "Dúvida ou cansaço 😐", value: "tired" },
                    { label: "Medo de chatear alguém 😕", value: "pressure" }
                ]
            },
            {
                text: "Se você não fosse, esse tempo serviria mais para quê?",
                options: [
                    { label: "Descansar", value: "rest" },
                    { label: "Resolver minhas coisas", value: "organize" },
                    { label: "Ficar comigo", value: "self" },
                    { label: "Ainda não sei", value: "unknown" }
                ]
            },
            {
                text: "Qual resposta parece mais honesta agora?",
                options: [
                    { label: "Aceitar com vontade", value: "accept" },
                    { label: "Pedir um tempo para pensar", value: "pause" },
                    { label: "Recusar com carinho", value: "decline" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("pressure")) {
                return {
                    text: "Parece que o ponto principal não é só o convite, mas o desconforto de talvez frustrar alguém. Essa é uma informação importante: quando a decisão nasce da culpa, ela costuma pesar depois.",
                    suggestion: "Você pode responder: “Obrigada pelo convite. Vou pensar com calma e te aviso.”"
                };
            }

            if (has("want") && has("accept")) {
                return {
                    text: "Tem sinal de vontade real aqui. Se aceitar combina com seu tempo e sua energia, talvez não precise transformar isso em um grande dilema. Algumas escolhas também podem ser leves.",
                    suggestion: "Você pode responder: “Quero ir sim. Obrigada por me chamar.”"
                };
            }

            if (has("tired") || has("rest") || has("decline")) {
                return {
                    text: "Seu descanso apareceu como uma prioridade. Isso não torna você menos carinhosa ou menos presente. Às vezes dizer não para um convite é dizer sim para o que sustenta você.",
                    suggestion: "Você pode responder: “Hoje não vou conseguir, mas obrigada por lembrar de mim.”"
                };
            }

            return {
                text: "Você ainda parece estar organizando o que sente. Não precisar responder imediatamente já é uma resposta interna: talvez você precise de um pouco mais de tempo antes de escolher.",
                suggestion: "Você pode responder: “Vou ver como fico e te aviso com calma.”"
            };
        }
    },
    {
        id: "favor",
        color: "yellow",
        icon: "🤝",
        title: "Me pediram um favor",
        description: "Será que você realmente quer fazer isso?",
        questions: [
            {
                text: "Quando te pediram esse favor, o que pesou mais?",
                options: [
                    { label: "Eu quero ajudar", value: "want" },
                    { label: "Fiquei com medo de dizer não", value: "fear" },
                    { label: "Senti que não tenho energia", value: "no-energy" }
                ]
            },
            {
                text: "Esse favor cabe na sua rotina de hoje?",
                options: [
                    { label: "Cabe bem", value: "fits" },
                    { label: "Cabe, mas apertado", value: "tight" },
                    { label: "Não cabe agora", value: "no-fit" }
                ]
            },
            {
                text: "Que limite seria mais justo para você?",
                options: [
                    { label: "Ajudar do meu jeito", value: "partial" },
                    { label: "Combinar outro momento", value: "later" },
                    { label: "Dizer que não posso", value: "no" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("want") && has("fits")) {
                return {
                    text: "Ajudar parece vir de um lugar verdadeiro, não só de obrigação. Mesmo assim, vale manter clareza sobre até onde você consegue ir sem se abandonar no processo.",
                    suggestion: "Você pode responder: “Posso ajudar sim, desse jeito aqui...”"
                };
            }

            if (has("fear") || has("tight")) {
                return {
                    text: "Talvez a dificuldade não seja ajudar, mas sustentar um limite. Um sim apertado demais pode virar cansaço, irritação ou ressentimento. Seu limite também merece entrar na conversa.",
                    suggestion: "Você pode responder: “Eu não consigo fazer tudo, mas posso ajudar com uma parte.”"
                };
            }

            if (has("no-energy") || has("no-fit") || has("no")) {
                return {
                    text: "Seu corpo já deu uma pista: agora talvez não caiba. Recusar um favor não apaga seu cuidado por alguém. Só mostra que você também está considerando a sua realidade.",
                    suggestion: "Você pode responder: “Hoje eu não consigo te ajudar com isso.”"
                };
            }

            return {
                text: "Existe espaço para negociar esse pedido. Você não precisa escolher entre fazer tudo ou sumir; pode oferecer uma ajuda menor, outro horário ou uma resposta honesta.",
                suggestion: "Você pode responder: “Consigo te ajudar de outro jeito?”"
            };
        }
    },
    {
        id: "message",
        color: "purple",
        icon: "💬",
        title: "Quero mandar uma mensagem",
        description: "Vamos entender esse impulso.",
        questions: [
            {
                text: "O que mais está por trás dessa vontade de mandar mensagem?",
                options: [
                    { label: "Saudade", value: "missing" },
                    { label: "Ansiedade", value: "anxiety" },
                    { label: "Resolver algo", value: "solve" },
                    { label: "Buscar confirmação", value: "validation" }
                ]
            },
            {
                text: "Se a pessoa não responder agora, como você acha que ficaria?",
                options: [
                    { label: "Tudo bem", value: "ok" },
                    { label: "Mais ansiosa", value: "more-anxiety" },
                    { label: "Frustrada ou triste", value: "sad" }
                ]
            },
            {
                text: "O que seria mais cuidadoso neste momento?",
                options: [
                    { label: "Mandar com calma", value: "send" },
                    { label: "Esperar alguns minutos", value: "wait" },
                    { label: "Escrever sem enviar ainda", value: "draft" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("anxiety") || has("more-anxiety") || has("validation")) {
                return {
                    text: "Essa vontade parece carregar ansiedade junto. Quando a mensagem vira tentativa de aliviar uma sensação urgente, talvez a primeira resposta que você precisa não venha da outra pessoa, mas de uma pausa sua.",
                    suggestion: "Antes de enviar, escreva a mensagem e espere dez minutos."
                };
            }

            if (has("solve") && has("send")) {
                return {
                    text: "Parece existir algo concreto para resolver. Nesse caso, uma mensagem simples, direta e gentil pode ajudar mais do que uma conversa cheia de sinais escondidos.",
                    suggestion: "Você pode começar com: “Queria conversar sobre uma coisa com calma.”"
                };
            }

            if (has("missing") && has("ok")) {
                return {
                    text: "A saudade apareceu sem tanta urgência. Isso pode ser um bom sinal: dá para mandar algo porque você quer se aproximar, não porque precisa controlar a resposta.",
                    suggestion: "Você pode mandar algo simples, sem cobrar retorno imediato."
                };
            }

            return {
                text: "Talvez ainda não esteja claro se essa mensagem aproxima ou só tenta aliviar uma tensão. Uma pausa curta pode separar desejo de impulso.",
                suggestion: "Escreva primeiro para você. Depois decida se ainda quer enviar."
            };
        }
    },
    {
        id: "reply",
        color: "green",
        icon: "↩️",
        title: "Quero responder uma mensagem",
        description: "Vamos pensar no tom antes de responder.",
        questions: [
            {
                text: "Essa mensagem veio de que tipo de relação?",
                options: [
                    { label: "Alguém que gosto ou estou me envolvendo", value: "romantic" },
                    { label: "Amizade ou família", value: "close" },
                    { label: "Trabalho, estudo ou compromisso", value: "practical" },
                    { label: "Alguém me cobrando ou pressionando", value: "pressure" }
                ]
            },
            {
                text: "O que mais te pegou nessa mensagem?",
                options: [
                    { label: "O tom da pessoa", value: "tone" },
                    { label: "A demora ou distância", value: "distance" },
                    { label: "O medo de decepcionar", value: "disappoint" },
                    { label: "A vontade de explicar tudo", value: "overexplain" },
                    { label: "O assunto em si", value: "subject" }
                ]
            },
            {
                text: "Essa resposta precisa sair agora ou você sentiu que precisava responder agora?",
                options: [
                    { label: "Precisa de resposta prática agora", value: "now" },
                    { label: "Pode esperar um pouco", value: "wait" },
                    { label: "Eu me senti pressionada", value: "felt-pressure" },
                    { label: "Não sei ainda", value: "unsure" }
                ]
            },
            {
                text: "Que tipo de resposta cuidaria melhor de você?",
                options: [
                    { label: "Curta e clara", value: "short" },
                    { label: "Carinhosa, mas sem me justificar demais", value: "warm-boundary" },
                    { label: "Pedir tempo para pensar", value: "ask-time" },
                    { label: "Colocar um limite", value: "boundary" },
                    { label: "Não responder agora", value: "no-reply-now" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("romantic") && (has("distance") || has("overexplain"))) {
                return {
                    text: "Essa mensagem parece tocar numa parte sensível: vontade de se aproximar, medo de parecer demais ou tentativa de entender o lugar que você ocupa para a outra pessoa. Antes de responder, vale separar carinho de ansiedade.",
                    suggestion: "Você pode responder com afeto e limite: “Quero te responder com calma, então vou pensar um pouco antes.”"
                };
            }

            if (has("pressure") || has("felt-pressure") || has("boundary")) {
                return {
                    text: "A urgência talvez não esteja só na mensagem, mas na sensação de que você precisa dar conta da reação da outra pessoa. Você pode ser clara sem se explicar inteira.",
                    suggestion: "Você pode responder: “Entendi. Agora não consigo resolver isso, mas te retorno quando puder.”"
                };
            }

            if (has("practical") && has("now")) {
                return {
                    text: "Aqui parece existir uma resposta prática a ser dada. Não precisa virar uma conversa emocional se o que a situação pede é clareza e objetividade.",
                    suggestion: "Você pode responder em uma frase direta: “Confirmo sim” ou “Não consigo nesse horário.”"
                };
            }

            if (has("close") && has("disappoint")) {
                return {
                    text: "Com pessoas próximas, às vezes a vontade de cuidar vira medo de frustrar. Responder com carinho não significa aceitar tudo, nem explicar cada detalhe da sua vida.",
                    suggestion: "Você pode responder: “Eu entendo você, mas agora preciso fazer de outro jeito.”"
                };
            }

            if (has("wait") || has("ask-time") || has("no-reply-now")) {
                return {
                    text: "Você percebeu que uma resposta imediata talvez não seja a mais cuidadosa. Pausar também é uma forma de responder melhor, principalmente quando o tom ou o assunto mexeu com você.",
                    suggestion: "Você pode deixar para responder depois ou dizer: “Vou pensar e te respondo com calma.”"
                };
            }

            return {
                text: "Parece que você está tentando encontrar um tom que seja honesto sem se atropelar. Uma boa resposta não precisa carregar tudo: pode ser simples, clara e suficiente.",
                suggestion: "Você pode escrever uma versão curta primeiro e cortar tudo que for só justificativa."
            };
        }
    },
    {
        id: "tell",
        color: "pink",
        icon: "❤️",
        title: "Quero contar algo",
        description: "Vale a pena dividir isso agora?",
        questions: [
            {
                text: "O que você espera sentir depois de contar isso?",
                options: [
                    { label: "Alívio", value: "relief" },
                    { label: "Apoio", value: "support" },
                    { label: "Validação", value: "validation" },
                    { label: "Mais proximidade", value: "closeness" }
                ]
            },
            {
                text: "Essa pessoa costuma cuidar bem do que você compartilha?",
                options: [
                    { label: "Sim, confio", value: "trust" },
                    { label: "Às vezes", value: "sometimes" },
                    { label: "Não tenho certeza", value: "unsure" }
                ]
            },
            {
                text: "Quanto disso você realmente quer contar agora?",
                options: [
                    { label: "Tudo", value: "all" },
                    { label: "Só uma parte", value: "part" },
                    { label: "Talvez ainda não", value: "not-yet" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("trust") && (has("support") || has("closeness"))) {
                return {
                    text: "Existe desejo de aproximação e algum nível de confiança. Contar pode fazer sentido, principalmente se você não precisar se explicar inteira de uma vez.",
                    suggestion: "Você pode começar por uma parte pequena e observar como se sente."
                };
            }

            if (has("validation") || has("unsure")) {
                return {
                    text: "Talvez uma parte sua queira ser acolhida, mas ainda não sabe se essa pessoa consegue oferecer isso. Sua história merece cuidado, não pressa.",
                    suggestion: "Você pode se perguntar: “Eu quero compartilhar ou quero ser validada agora?”"
                };
            }

            if (has("part") || has("not-yet") || has("sometimes")) {
                return {
                    text: "Você não precisa entregar tudo para ser verdadeira. Às vezes, contar só uma parte é uma forma inteligente de proteger algo que ainda está sensível.",
                    suggestion: "Você pode dizer: “Tem uma coisa que eu queria dividir, mas aos poucos.”"
                };
            }

            return {
                text: "Contar algo importante é uma escolha de confiança. Se ainda houver dúvida, talvez a pausa seja justamente o cuidado que a situação pede.",
                suggestion: "Escolha primeiro o quanto você quer contar, depois escolha para quem."
            };
        }
    },
    {
        id: "other",
        color: "green",
        icon: "✨",
        title: "Outra situação",
        description: "Me conta o que aconteceu.",
        questions: [
            {
                text: "Essa situação está mexendo mais com qual parte de você?",
                options: [
                    { label: "Ansiedade", value: "anxiety" },
                    { label: "Culpa", value: "guilt" },
                    { label: "Cansaço", value: "tired" },
                    { label: "Confusão", value: "confused" }
                ]
            },
            {
                text: "O que você precisa antes de responder ou agir?",
                options: [
                    { label: "Tempo", value: "time" },
                    { label: "Clareza", value: "clarity" },
                    { label: "Descanso", value: "rest" },
                    { label: "Conversar com alguém", value: "talk" }
                ]
            }
        ],
        reflection: ({ has }) => {
            if (has("anxiety")) {
                return {
                    text: "Quando a ansiedade está alta, tudo parece pedir uma decisão imediata. Mas urgência emocional nem sempre é urgência real.",
                    suggestion: "Respire, espere um pouco e só depois escolha o próximo passo."
                };
            }

            if (has("guilt")) {
                return {
                    text: "A culpa pode tentar decidir por você. Antes de agir, vale separar responsabilidade real de medo de desagradar.",
                    suggestion: "Pergunte a si mesma: “Eu faria isso se não estivesse com culpa?”"
                };
            }

            if (has("tired") || has("rest")) {
                return {
                    text: "Cansaço muda a forma como tudo parece. Talvez a melhor decisão agora seja não decidir tudo agora.",
                    suggestion: "Cuide do básico primeiro: água, descanso, comida, silêncio."
                };
            }

            return {
                text: "Você percebeu que precisa de mais clareza. Isso já é um começo. Nem toda situação precisa ser resolvida no primeiro impulso.",
                suggestion: "Anote o que aconteceu, o que você sente e qual seria um próximo passo pequeno."
            };
        }
    }
];

function render() {
    switch (state.screen) {
        case "home":
            renderHome();
            break;
        case "question":
            renderQuestion();
            break;
        case "reflection":
            renderReflection();
            break;
        default:
            state.screen = "home";
            renderHome();
    }
}

function renderHome() {
    const frase = frases[Math.floor(Math.random() * frases.length)];

    app.innerHTML = `
        <section class="home fade">
            <header class="hero">
                <div>
                    <small>Hoje.</small>
                    <h1>Pausa</h1>
                    <p>Como posso te ajudar?</p>
                </div>
            </header>
            <section class="grid" aria-label="Situações"></section>
            <footer>
                <div class="quote">${frase}</div>
            </footer>
        </section>
    `;

    const grid = document.querySelector(".grid");
    const template = document.querySelector("#card-template");

    situations.forEach((situation) => {
        const card = template.content.cloneNode(true);
        const article = card.querySelector(".card");

        article.classList.add(situation.color);
        article.querySelector(".icon").textContent = situation.icon;
        article.querySelector("h2").textContent = situation.title;
        article.querySelector("p").textContent = situation.description;
        article.setAttribute("aria-label", situation.title);

        article.addEventListener("click", () => startSituation(situation.id));
        article.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                startSituation(situation.id);
            }
        });

        grid.appendChild(card);
    });
}

function startSituation(id) {
    state.screen = "question";
    state.situation = id;
    state.step = 0;
    state.answers = [];
    render();
}

function renderQuestion() {
    const situation = getCurrentSituation();

    if (!situation) {
        goHome();
        return;
    }

    const question = situation.questions[state.step];

    app.innerHTML = `
        <section class="flow fade">
            <button class="back" type="button">← Voltar</button>
            <div class="question-card ${situation.color}">
                <div class="question-icon">${situation.icon}</div>
                <span class="category">${situation.title}</span>
                <h2>${question.text}</h2>
                <div class="options"></div>
            </div>
        </section>
    `;

    document.querySelector(".back").addEventListener("click", goHome);

    const options = document.querySelector(".options");
    const template = document.querySelector("#option-template");

    question.options.forEach((answer) => {
        const option = template.content.cloneNode(true);
        const button = option.querySelector(".option");

        option.querySelector("span").textContent = answer.label;
        option.querySelector(".option-icon").textContent = "💭";

        button.addEventListener("click", () => {
            state.answers.push({
                question: question.text,
                label: answer.label,
                value: answer.value
            });

            state.step += 1;

            if (state.step >= situation.questions.length) {
                state.screen = "reflection";
            }

            render();
        });

        options.appendChild(option);
    });
}

function renderReflection() {
    const situation = getCurrentSituation();

    if (!situation) {
        goHome();
        return;
    }

    const values = state.answers.map((answer) => answer.value);
    const result = situation.reflection({
        values,
        has: (value) => values.includes(value),
        answers: state.answers
    });

    app.innerHTML = `<section class="reflection-screen fade"></section>`;

    const screen = document.querySelector(".reflection-screen");
    const template = document.querySelector("#reflection-template");
    const reflection = template.content.cloneNode(true);

    reflection.querySelector("h2").textContent = "O que eu percebi";
    reflection.querySelector("p").textContent = result.text;
    fillAnswerSummary(reflection);
    reflection.querySelector(".suggestion").textContent = result.suggestion;
    screen.appendChild(reflection);

    document.querySelector("#restart").addEventListener("click", goHome);
}

function fillAnswerSummary(reflection) {
    const summary = reflection.querySelector(".answer-summary");
    const list = summary.querySelector("ul");

    state.answers.forEach((answer) => {
        const item = document.createElement("li");
        item.textContent = answer.label;
        list.appendChild(item);
    });
}

function getCurrentSituation() {
    return situations.find((item) => item.id === state.situation);
}

function goHome() {
    state.screen = "home";
    state.step = 0;
    state.answers = [];
    state.situation = null;
    render();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.screen !== "home") {
        goHome();
    }
});

render();
