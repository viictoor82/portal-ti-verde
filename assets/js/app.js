/* ========================================
   1. PONTOS DE COLETA EM MACEIÓ
======================================== */

const places = [
    [
        'Pajuçara',
        'Rua Campos Teixeira, 476'
    ],
    [
        'Tabuleiro',
        'Rua Botafogo, atrás do Posto de Saúde Dr. Ib Gatto Falcão'
    ],
    [
        'Dique Estrada',
        'Av. Governador Teobaldo Barbosa, Vergel do Lago'
    ],
    [
        'Santa Lúcia',
        'Av. Oswaldo Ramos, 912, Jardim Petrópolis'
    ],
    [
        'Gruta de Lourdes',
        'Rua Antônio Menezes de Araújo Lemos, 143'
    ],
    [
        'Santa Maria',
        'Av. Lourival Melo Mota, Conjunto Santa Maria, s/n, Cidade Universitária'
    ],
    [
        'Feitosa',
        'Rua André Cardoso Borba, 366/394'
    ],
    [
        'Petrópolis',
        'Av. Jorge de Lima, Petrópolis'
    ]
];


/* ========================================
   2. EXIBIÇÃO DOS PONTOS DE COLETA
======================================== */

const loc = document.querySelector('#locations');

places.forEach(([name, address]) => {

    // Criar o card do ponto de coleta
    const div = document.createElement('div');
    div.className = 'location';

    // Nome do local
    const strong = document.createElement('strong');
    strong.textContent = name;

    // Endereço
    const small = document.createElement('small');
    small.textContent = address;

    // Link do Google Maps
    const link = document.createElement('a');

    link.textContent = 'Ver no mapa ↗';

    link.href =
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(address + ', Maceió, AL, Brasil');

    link.target = '_blank';
    link.rel = 'noopener';

    // Adicionar elementos ao card
    div.append(
        strong,
        small,
        document.createElement('br'),
        link
    );

    // Adicionar card à página
    loc.append(div);

});


/* ========================================
   3. PERGUNTAS DO JOGO
======================================== */

/*
   Estrutura de cada pergunta:

   [
       'Pergunta',
       ['Alternativa A', 'B', 'C', 'D'],
       índice da resposta correta,
       'Explicação'
   ]

   Índices:
   A = 0
   B = 1
   C = 2
   D = 3
*/

const qs = [

    // Pergunta 1
    [
        'Onde ficam os arquivos salvos na nuvem?',

        [
            'Em satélites',
            'Em servidores físicos de data centers',
            'No ar',
            'Apenas no celular'
        ],

        1,

        'A nuvem depende de data centers e equipamentos físicos.'
    ],

    // Pergunta 2
    [
        'O que é obsolescência perceptiva?',

        [
            'Quando o produto quebra',
            'Quando o aparelho é reciclado',
            'Quando a publicidade faz um aparelho funcional parecer ultrapassado',
            'Quando a bateria é substituída'
        ],

        2,

        'A pressão para trocar um aparelho ainda funcional é um exemplo de obsolescência perceptiva.'
    ],

    // Pergunta 3
    [
        'Qual destino é adequado para uma bateria usada?',

        [
            'Lixo comum',
            'Queimar',
            'Jogar em um rio',
            'Ponto de coleta apropriado'
        ],

        3,

        'Baterias precisam de coleta e destinação específicas.'
    ],

    // Pergunta 4
    [
        'Qual atitude ajuda a prolongar a vida de um computador?',

        [
            'Fazer manutenção e trocar peças',
            'Comprar outro todo ano',
            'Descartar ao primeiro travamento',
            'Deixar ligado o tempo todo'
        ],

        0,

        'Manutenção e reparos podem evitar descarte precoce.'
    ],

    // Pergunta 5
    [
        'Qual R significa avaliar a necessidade de uma compra?',

        [
            'Reciclar',
            'Repensar',
            'Reutilizar',
            'Recusar'
        ],

        1,

        'Repensar é questionar se a compra é realmente necessária.'
    ],

    // Pergunta 6
    [
        'O descarte incorreto de eletrônicos pode causar:',

        [
            'Aumento da velocidade da internet',
            'Produção de água potável',
            'Contaminação do solo e da água',
            'Redução automática de resíduos'
        ],

        2,

        'Alguns componentes contêm substâncias que oferecem riscos ambientais.'
    ],

    // Pergunta 7
    [
        'Qual prática é um exemplo de reduzir?',

        [
            'Imprimir mais',
            'Comprar cabos extras sem necessidade',
            'Trocar de celular todo mês',
            'Evitar impressões desnecessárias'
        ],

        3,

        'Reduzir é consumir menos recursos e evitar desperdícios.'
    ],

    // Pergunta 8
    [
        'O que significa reutilizar?',

        [
            'Doar um aparelho que ainda funciona',
            'Queimar peças antigas',
            'Descartar acessórios úteis',
            'Comprar o modelo mais recente'
        ],

        0,

        'Reutilizar é dar continuidade ao uso de produtos em boas condições.'
    ],

    // Pergunta 9
    [
        'Qual ação faz parte da TI Verde?',

        [
            'Manter tudo ligado',
            'Ativar a economia de energia',
            'Descartar aparelhos úteis',
            'Imprimir todos os e-mails'
        ],

        1,

        'A economia de energia ajuda a reduzir o consumo de recursos.'
    ],

    // Pergunta 10
    [
        'O que fazer com um eletrodoméstico inservível em Maceió?',

        [
            'Abandonar na rua',
            'Jogar em um terreno',
            'Consultar os ecopontos municipais para destinação adequada',
            'Queimar em casa'
        ],

        2,

        'Os ecopontos municipais recebem eletrodomésticos inservíveis.'
    ]

];


/* ========================================
   4. CONFIGURAÇÃO DO SUPABASE
======================================== */

const URL = 'https://suxsdoxsbrusxatrdpgt.supabase.co';

const PUBLIC_KEY =
    'sb_publishable_4CgSHG0XPi_O0RGImy5rOw_FZpmrmXg';


/* ========================================
   5. SELETOR DE ELEMENTOS HTML
======================================== */

// Facilita a seleção de elementos pelo ID ou classe.

const $ = selector => document.querySelector(selector);


/* ========================================
   6. VARIÁVEIS DO JOGO
======================================== */

// Número da pergunta atual
let index = 0;

// Pontuação acumulada
let score = 0;

// Quantidade de respostas corretas
let correct = 0;

// Nome da equipe
let team = '';

// Tempo restante da pergunta
let remaining = 20;

// Controle do cronômetro
let timer = null;

// Momento de início da partida
let started = 0;

// Impede responder duas vezes
let locked = false;

// Respostas escolhidas
let answers = [];

// Identificador da equipe no Supabase
let teamToken = '';

// Estado da competição
let gameOpen = false;


/* ========================================
   7. COMUNICAÇÃO COM O SUPABASE
======================================== */

/*
   Envia requisições para funções RPC
   criadas no banco de dados.
*/

async function rpc(fn, body = {}) {

    const res = await fetch(
        `${URL}/rest/v1/rpc/${fn}`,
        {
            method: 'POST',

            headers: {
                'apikey': PUBLIC_KEY,

                'Authorization': `Bearer ${PUBLIC_KEY}`,

                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw Error(
            data?.message ||
            'Erro de conexão. Confira se o SQL foi executado no Supabase.'
        );
    }

    return data;
}


/* ========================================
   8. EFEITOS SONOROS
======================================== */

/*
   Resposta correta: som agudo.
   Resposta incorreta: som grave.
*/

function beep(good) {

    try {

        const ctx = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

        const oscillator = ctx.createOscillator();

        const gain = ctx.createGain();

        oscillator.frequency.value = good ? 660 : 240;

        gain.gain.value = 0.06;

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();

        oscillator.stop(ctx.currentTime + 0.12);

        oscillator.onended = () => ctx.close();

    } catch {
        // Ignora falhas de áudio.
    }

}


/* ========================================
   9. RANKING DAS EQUIPES
======================================== */

async function renderRank() {

    try {

        const rows = $('#rankingRows');

        // Buscar classificação no Supabase
        const arr = await rpc('ti_leaderboard');

        // Limpar tabela anterior
        rows.replaceChildren();

        // Nenhuma equipe cadastrada
        if (!arr.length) {

            const tr = document.createElement('tr');

            const td = document.createElement('td');

            td.colSpan = 5;

            td.textContent =
                'Nenhuma equipe concluiu o desafio ainda.';

            tr.append(td);

            rows.append(tr);
        }

        // Preencher classificação
        arr.forEach((r, i) => {

            const tr = document.createElement('tr');

            const values = [
                `${i + 1}º`,
                r.team,
                `${r.correct}/10`,
                r.score,
                `${r.time_seconds}s`
            ];

            values.forEach(value => {

                const td = document.createElement('td');

                td.textContent = value;

                tr.append(td);

            });

            rows.append(tr);

        });

    } catch (e) {

        $('#rankingRows').innerHTML = '';

        $('#rankingRows').textContent =
            'Ranking indisponível: ' + e.message;

    }

}


/* ========================================
   10. STATUS DA COMPETIÇÃO
======================================== */

/*
   Verifica se o organizador liberou
   ou encerrou o jogo.
*/

async function refreshStatus() {

    try {

        const status = await rpc('ti_game_status');

        gameOpen = !!status.open;

        $('#gameStatus').textContent = gameOpen
            ? '🟢 Competição aberta'
            : '🔴 Competição encerrada';

        $('#start').disabled = !gameOpen;

        $('#start').textContent = gameOpen
            ? 'Iniciar desafio →'
            : 'Aguardando liberação do organizador';

    } catch (e) {

        $('#gameStatus').textContent =
            'Configure o banco de dados: ' + e.message;

        $('#start').disabled = true;

    }

}


/* ========================================
   11. CONTROLE DAS TELAS DO JOGO
======================================== */

/*
   Telas disponíveis:

   setup  = Cadastro da equipe
   play   = Perguntas
   finish = Resultado final
*/

function show(id) {

    ['setup', 'play', 'finish'].forEach(screen => {

        $('#' + screen).classList.toggle(
            'hidden',
            screen !== id
        );

    });

}


/* ========================================
   12. INICIAR UMA PARTIDA
======================================== */

async function start() {

    team = $('#team').value.trim();

    // Verificar nome da equipe
    if (!team) {

        $('#setupError').textContent =
            'Digite o nome da equipe.';

        return;
    }

    $('#start').disabled = true;

    $('#setupError').textContent =
        'Registrando equipe...';

    try {

        // Registrar equipe no banco
        const result = await rpc(
            'ti_join',
            {
                p_team: team
            }
        );

        teamToken = result.token;

        // Guardar identificador na sessão
        sessionStorage.setItem(
            'ti_team_token',
            teamToken
        );

        // Reiniciar variáveis
        index = 0;
        score = 0;
        correct = 0;
        answers = [];

        started = Date.now();

        $('#setupError').textContent = '';

        // Mostrar tela das perguntas
        show('play');

        renderQ();

    } catch (e) {

        $('#setupError').textContent = e.message;

        await refreshStatus();

    }

}


/* ========================================
   13. EXIBIR PERGUNTAS
======================================== */

function renderQ() {

    locked = false;

    remaining = 20;

    const q = qs[index];

    // Atualizar informações
    $('#progress').textContent =
        `Pergunta ${index + 1} de ${qs.length}`;

    $('#points').textContent =
        `${score} pontos (prévia)`;

    // Atualizar barra de progresso
    $('#bar').style.width =
        `${index / qs.length * 100}%`;

    // Mostrar pergunta
    $('#question').textContent = q[0];

    // Ocultar feedback anterior
    $('#feedback').classList.add('hidden');

    $('#next').classList.add('hidden');

    // Limpar alternativas anteriores
    const options = $('#options');

    options.replaceChildren();

    // Criar botões de resposta
    q[1].forEach((value, i) => {

        const button = document.createElement('button');

        button.className = 'option';

        button.textContent =
            `${'ABCD'[i]}. ${value}`;

        button.addEventListener(
            'click',
            () => choose(i)
        );

        options.append(button);

    });

    // Iniciar cronômetro
    updateClock();

    clearInterval(timer);

    timer = setInterval(() => {

        remaining--;

        updateClock();

        if (remaining <= 0) {
            choose(-1);
        }

    }, 1000);

}


/* ========================================
   14. ATUALIZAR CRONÔMETRO
======================================== */

function updateClock() {

    $('#clock').textContent =
        `⏱ ${remaining}s`;

}


/* ========================================
   15. VERIFICAR RESPOSTA
======================================== */

function choose(i) {

    // Impedir múltiplas respostas
    if (locked) {
        return;
    }

    locked = true;

    clearInterval(timer);

    // Registrar resposta
    answers.push(i);

    const q = qs[index];

    const good = i === q[2];

    // Atualizar pontuação
    if (good) {
        correct++;
        score += 100;
    }

    // Reproduzir som
    beep(good);

    // Destacar alternativas
    [...$('#options').children].forEach((button, j) => {

        button.disabled = true;

        if (j === q[2]) {
            button.classList.add('correct');
        }

        if (j === i && !good) {
            button.classList.add('wrong');
        }

    });

    // Atualizar pontuação na tela
    $('#points').textContent =
        `${score} pontos (prévia)`;

    // Exibir explicação
    const feedback = $('#feedback');

    feedback.textContent =
        (
            good
                ? 'Resposta correta!'
                : i === -1
                    ? 'O tempo acabou.'
                    : 'Resposta incorreta.'
        ) + ' ' + q[3];

    feedback.classList.remove('hidden');

    // Atualizar botão de continuação
    $('#next').textContent =
        index === qs.length - 1
            ? 'Finalizar desafio →'
            : 'Próxima pergunta →';

    $('#next').classList.remove('hidden');

}


/* ========================================
   16. PRÓXIMA PERGUNTA OU FINALIZAR
======================================== */

async function next() {

    // Avançar para a próxima pergunta
    if (index < qs.length - 1) {

        index++;

        renderQ();

        return;
    }

    // Última pergunta: salvar resultado
    $('#next').disabled = true;

    $('#next').textContent =
        'Salvando resultado...';

    try {

        const result = await rpc(
            'ti_submit',
            {
                p_token: teamToken,
                p_answers: answers
            }
        );

        // Mostrar pontuação final
        $('#finalTitle').textContent =
            `${team}: ${result.score} pontos!`;

        $('#finalText').textContent =
            `Vocês acertaram ${result.correct} de ${qs.length} perguntas. ` +
            'Resultado salvo no ranking geral.';

        // Exibir resultado
        show('finish');

        // Atualizar ranking
        await renderRank();

    } catch (e) {

        $('#feedback').textContent =
            'Não foi possível salvar: ' + e.message;

        $('#next').disabled = false;

        $('#next').textContent =
            'Tentar salvar novamente';

    }

}


/* ========================================
   17. CONTROLE DO ORGANIZADOR
======================================== */

/*
   Permite liberar ou encerrar
   a competição pelo Supabase.
*/

async function admin(open) {

    const pass = $('#adminPass').value;

    // Verificar senha
    if (!pass) {

        $('#adminMsg').textContent =
            'Digite a senha do organizador.';

        return;
    }

    $('#adminMsg').textContent =
        'Atualizando...';

    try {

        await rpc(
            'ti_admin_set_open',
            {
                p_password: pass,
                p_open: open
            }
        );

        $('#adminMsg').textContent = open
            ? 'Jogo liberado!'
            : 'Jogo encerrado!';

        // Limpar campo de senha
        $('#adminPass').value = '';

        // Atualizar status
        await refreshStatus();

    } catch (e) {

        $('#adminMsg').textContent = e.message;

    }

}


/* ========================================
   18. EVENTOS DOS BOTÕES
======================================== */

// Iniciar desafio
$('#start').addEventListener('click', start);

// Iniciar usando a tecla Enter
$('#team').addEventListener('keydown', e => {

    if (e.key === 'Enter') {
        start();
    }

});

// Avançar ou finalizar
$('#next').addEventListener('click', next);

// Cadastrar uma nova equipe
$('#again').addEventListener('click', () => {

    $('#team').value = '';

    show('setup');

    refreshStatus();

    location.hash = '#jogo';

});

// Liberar competição
$('#openGame').addEventListener(
    'click',
    () => admin(true)
);

// Encerrar competição
$('#closeGame').addEventListener(
    'click',
    () => admin(false)
);


/* ========================================
   19. INICIALIZAÇÃO DO SITE
======================================== */

// Consultar estado inicial da competição
refreshStatus();

// Carregar ranking
renderRank();


/* ========================================
   20. ATUALIZAÇÃO AUTOMÁTICA
======================================== */

/*
   Atualiza o status e o ranking
   a cada 5 segundos.
*/

setInterval(() => {

    refreshStatus();

    renderRank();

}, 5000);