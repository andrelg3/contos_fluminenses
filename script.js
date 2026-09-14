/* ==========================================================================
   O ENIGMA DOS CONTOS FLUMINENSES - MACHADO DE ASSIS
   Interactive Gameplay, Puzzles, Pedagogical Analytics & Teacher Dashboard
   ========================================================================== */

(function() {
  'use strict';

  // State Management
  const STATE = {
    currentUser: null, // { id, name, studentClass, xp, completedStories: [], achievements: [], answersHistory: {} }
    studentsList: [],
    classesList: ["3º Ano A", "3º Ano B", "3º Ano C", "1º/2º Ano", "Pré-Vestibular"],
    currentStoryIndex: null,
    currentStep: 1, // 1: Contexto, 2: Puzzle, 3: Análise, 4: Vestibular
    isBossMode: false,
    bossQuestionIndex: 0,
    bossScore: 0,
    activePuzzleState: null
  };

  // Story Database (All 7 Stories + Dynamic Pools: 3 Puzzles, 3 Analyses, 3 Vestibular Questions each = 63 Challenges)
  const STORIES = [
    {
      id: "miss-dollar",
      title: "Miss Dollar",
      numberText: "Conto I",
      location: "📍 Botafogo & Passeio Público, Rio de Janeiro",
      image: "assets/miss_dollar.jpg",
      tags: ["Ironia", "Interesse Social", "Narrador Dissimulado"],
      xpValue: 143,
      summary: "O Dr. Mendonça encontra na rua a cadelinha galga 'Miss Dollar' e a devolve sem aceitar recompensa à sua dona, D. Margarida. A viúva rica, traumatizada por um casamento anterior onde temia ser amada só por dinheiro, reluta diante da corte do médico, até que um episódio noturno com a tia D. Antônia sela o destino do casal.",
      
      step1Context: {
        title: "O Cão Desaparecido e o Enigma do Amor Burguês",
        text: "Publicado em 1870, 'Miss Dollar' abre a coletânea apresentando um narrador machadiano que desconstrói a expectativa romântica do leitor logo na abertura. O Dr. Mendonça devolve a cadelinha perdida à rica e reservada viúva D. Margarida sem exigir gratificação. Margarida, marcada pela desconfiança de que os homens só cobiçam sua fortuna, mantém-se esquiva, enquanto Mendonça tenta provar a pureza de seus sentimentos.",
        quote: "— Se esta cadela se chamasse de outro modo, não iria devolver. Mas 'Miss Dollar'... há um mistério nisso! E além do mais, a dona é viúva e rica!"
      },

      puzzlesPool: [
        {
          id: "puzzle_md_1",
          variantLabel: "Variação A: O Encontro & Devolução",
          instruction: "Reconstrua o encontro e a ordem dos fatos que uniram Mendonça a Margarida:",
          fragments: [
            { id: "f1", text: "Mendonça encontra uma cadelinha galga com coleira gravada 'Miss Dollar' e descobre o anúncio no jornal." },
            { id: "f2", text: "Ele devolve o animal pessoalmente a Dona Margarida em Botafogo, recusando a recompensa oferecida." },
            { id: "f3", text: "Margarida, traumatizada pelo primeiro marido, desconfia que Mendonça seja apenas outro caçador de dotes." },
            { id: "f4", text: "Com o auxílio da tia D. Antônia e após visitas regulares, as barreiras de desconfiança dissolvem-se em matrimônio." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Pense na progressão lógica: Encontro da cadela -> Devolução sem recompensa -> Desconfiança da viúva -> Matrimônio."
        },
        {
          id: "puzzle_md_2",
          variantLabel: "Variação B: O Ceticismo de Mendonça",
          instruction: "Ordene as reflexões psicológicas de Dr. Mendonça ao longo de sua aproximação amorosa:",
          fragments: [
            { id: "f1", text: "Mendonça proclama-se imune ao amor após ter sofrido uma grande desilusão na juventude." },
            { id: "f2", text: "Ao ver o luxo do palacete de Margarida, teme que a corte o julgue como homem interesseiro." },
            { id: "f3", text: "Ele tenta se afastar de Botafogo para provar seu desinteresse pela fortuna da viúva." },
            { id: "f4", text: "A ausência de Margarida provoca uma febre sentimental que desmonta todas as suas defesas racionais." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe a queda das defesas de Mendonça: Desilusão inicial -> Medo da opinião pública -> Tentativa de fuga -> Rendição afetiva."
        },
        {
          id: "puzzle_md_3",
          variantLabel: "Variação C: O Desfecho em Botafogo",
          instruction: "Reconstitua os passos finais que selaram o enlace matrimonial entre Mendonça e Margarida:",
          fragments: [
            { id: "f1", text: "Mendonça entra na casa à noite para declarar-se e é surpreendido pela tia D. Antônia." },
            { id: "f2", text: "Para evitar o escândalo e admitindo a sinceridade do médico, Margarida escreve que o casamento é inevitável." },
            { id: "f3", text: "O enlace realiza-se e a desconfiança cede lugar a uma genuína e madura afeição conjugal." },
            { id: "f4", text: "A cadela Miss Dollar é mais tarde atropelada por um veículo e sepultada com honras no jardim." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Observe o desfecho: Entrada noturna -> Carta da inevitabilidade -> Casamento sincero -> Destino final da cadelinha."
        }
      ],

      analysesPool: [
        {
          id: "analysis_md_1",
          variantLabel: "Análise 1: A Máscara Moral",
          title: "Desvendando a Máscara Social de Mendonça",
          question: "Qual recurso o narrador usa para expor a ambiguidade moral das atitudes de Mendonça perante a fortuna de Margarida?",
          options: [
            { letter: "A", text: "Apresenta Mendonça como um herói romântico puro e desinteressado que ignora o dinheiro da viúva.", correct: false },
            { letter: "B", text: "Usa a ironia ao mostrar que Mendonça busca convencer a si mesmo de sua pureza, enquanto suas ações visam ao prestígio social.", correct: true },
            { letter: "C", text: "Demonstra que Margarida enganou Mendonça usando o cão para roubar seus pertences.", correct: false },
            { letter: "D", text: "Revela no final que a cadela Miss Dollar era uma espiã treinada pela polícia da época.", correct: false }
          ],
          feedbackCorrect: "Exato! Machado de Assis utiliza o narrador onisciente e irônico para evidenciar o fosso entre o discurso virtuoso e o cálculo social inconsciente do personagem.",
          feedbackIncorrect: "Atenção: Na literatura de Machado de Assis, a ironia desmonta a idealização romântica, mostrando como o interesse social molda os afetos."
        },
        {
          id: "analysis_md_2",
          variantLabel: "Análise 2: A Metalinguagem Machadiana",
          title: "A Construção do Narrador e o Diálogo com o Leitor",
          question: "No primeiro capítulo de 'Miss Dollar', como o narrador quebra as convenções do romance romântico tradicional?",
          options: [
            { letter: "A", text: "Conversa diretamente com o leitor, ironizando a expectativa de que 'Miss Dollar' seja uma bela heroína inglesa quando é apenas uma cadela.", correct: true },
            { letter: "B", text: "Usa versos rimados de cordel para narrar a vida dos escravizados no campo.", correct: false },
            { letter: "C", text: "Recusa-se a dar nomes aos personagens para manter o mistério policial.", correct: false },
            { letter: "D", text: "Afirma que a história foi ditada por um espírito do além em uma sessão espírita.", correct: false }
          ],
          feedbackCorrect: "Perfeito! A abertura metalinguística desconstrói a fantasia romântica dos leitores de folhetim, marca registrada da genialidade machadiana.",
          feedbackIncorrect: "Revise o início do conto: o narrador brinca com a suposição do leitor sobre quem seria Miss Dollar, revelando ser um galgo de caça."
        },
        {
          id: "analysis_md_3",
          variantLabel: "Análise 3: O Jogo do Desinteresse",
          title: "O Paradoxo do Orgulho Burguês",
          question: "Por que Mendonça se desespera tanto ao ser chamado de 'caçador de dotes' pelos seus contemporâneos?",
          options: [
            { letter: "A", text: "Porque na sociedade imperial, a respeitabilidade pública dependia da aparência de independência moral e decoro.", correct: true },
            { letter: "B", text: "Porque ele não tinha dinheiro sequer para pagar o aluguel do seu consultório.", correct: false },
            { letter: "C", text: "Porque pretendia fugir do país para lutar na Guerra do Paraguai.", correct: false },
            { letter: "D", text: "Porque acreditava que a nobreza de sangue proibia o casamento com viúvas ricas.", correct: false }
          ],
          feedbackCorrect: "Excelente! Para o burguês carioca, manter a fachada de honradez e altruísmo era essencial para validar sua posição de elite.",
          feedbackIncorrect: "Atenção: O conflito de Mendonça é de ordem psicológica e de imagem pública: ele quer o casamento rico sem carregar o estigma de interesseiro."
        }
      ],

      vestibularPool: [
        {
          id: "vest_md_1",
          examTag: "FUVEST / UNICAMP - Simbolismo & Enredo",
          question: "No conto 'Miss Dollar', o nome da cadelinha possui um papel simbólico fundamental na narrativa. Assinale a alternativa correta sobre esse simbolismo:",
          options: [
            { letter: "A", text: "Ironiza a influência estrangeira no Brasil Imperial e sintetiza o interesse financeiro subjacente às relações amorosas da elite.", correct: true },
            { letter: "B", text: "Trata-se de uma mera coincidência sem relevância para a crítica social machadiana.", correct: false },
            { letter: "C", text: "Representa a devoção incondicional dos personagens à causa abolicionista do século XIX.", correct: false },
            { letter: "D", text: "Simboliza a decadência das tradições religiosas no Rio de Janeiro vitoriano.", correct: false }
          ],
          explanation: "O nome 'Miss Dollar' (Senhorita Dólar) condensa a crítica machadiana ao casamento como transação comercial na sociedade burguesa carioca."
        },
        {
          id: "vest_md_2",
          examTag: "ENEM - Metalinguagem e Foco Narrativo",
          question: "Ao iniciar o conto interrogando o leitor sobre a identidade de 'Miss Dollar', o narrador machadiano manifesta um procedimento estético que:",
          options: [
            { letter: "A", text: "Desnuda os artifícios da ficção, convidando o leitor a uma postura crítica e participativa diante do texto.", correct: true },
            { letter: "B", text: "Demonstra a inexperiência técnica do jovem autor em estruturar um enredo contínuo.", correct: false },
            { letter: "C", text: "Imita as crônicas medievais portuguesas para resgatar o lirismo trovadoresco.", correct: false },
            { letter: "D", text: "Busca ocultar a falta de criatividade literária através de digressões sem nexo.", correct: false }
          ],
          explanation: "A interlocução com o leitor é um recurso de modernidade em Machado, quebrando a ilusão de realidade e exigindo reflexão crítica."
        },
        {
          id: "vest_md_3",
          examTag: "UERJ - Sociologia da Literatura",
          question: "Em relação ao ambiente social retratado em 'Miss Dollar', é correto afirmar que Machado de Assis:",
          options: [
            { letter: "A", text: "Mapeia a nascente burguesia do Rio de Janeiro, evidenciando o contraste entre os bairros nobres e a vida boêmia.", correct: true },
            { letter: "B", text: "Ignora completamente a geografia do Rio de Janeiro, ambientando o conto em uma cidade imaginária.", correct: false },
            { letter: "C", text: "Centra sua narrativa na dura rotina de operários das fábricas têxteis suburbanas.", correct: false },
            { letter: "D", text: "Retrata exclusivamente as tribos indígenas do litoral fluminense.", correct: false }
          ],
          explanation: "Machado utiliza Botafogo, o Passeio Público e o Centro do Rio como cenários geográficos do poder e da circulação da elite imperial."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "luiz-soares",
      title: "Luís Soares",
      numberText: "Conto II",
      location: "📍 Rua do Ouvidor, Rio de Janeiro",
      image: "assets/luiz_soares.jpg",
      tags: ["Dândi", "Parasitismo Burguês", "Casamento por Interesse"],
      xpValue: 143,
      summary: "Luís Soares dissipa sua herança vivendo como dândi e tenta garantir seu sustento com a herança do tio, o Major Vilela. Para demonstrar regeneração, aceita um emprego público arranjado pelo major. Quando descobre que a prima Adelaide herdará trezentos contos de réis se casar com ele, simula paixão súbita, mas é desmascarado e rejeitado pela jovem.",

      step1Context: {
        title: "O Declínio do Dândi Carioca",
        text: "Luís Soares personifica o dândi esbanjador da corte imperial: após dilapidar quase toda a fortuna paterna na Rua do Ouvidor, restando-lhe apenas seis contos em sua modesta habitação, passa a frequentar assiduamente a casa do tio, o Major Luís da Cunha Vilela, visando tornar-se seu herdeiro. Para simular regeneração moral, aceita um emprego público arranjado pelo tio. O plano sofre uma reviravolta quando é revelado que a prima Adelaide herdará trezentos contos de réis sob a condição de casar-se com ele.",
        quote: "— Trezentos contos! É muito dinheiro para comprar um miserável."
      },

      puzzlesPool: [
        {
          id: "puzzle_ls_1",
          variantLabel: "Variação A: O Cálculo do Parasita",
          instruction: "Organize os passos da manobra interesseira de Luís Soares diante da fortuna de Adelaide:",
          fragments: [
            { id: "f1", text: "Luís Soares dissipa sua fortuna na Rua do Ouvidor e, com seis contos restantes em sua habitação, passa a cortejar a herança do tio Major Vilela." },
            { id: "f2", text: "Mesmo sabendo do afeto sincero da prima Adelaide, Luís inicialmente desdenha o casamento, preferindo herdar tudo sozinho do tio." },
            { id: "f3", text: "Revela-se a cláusula testamentária que lega trezentos contos a Adelaide sob a condição de desposar Luís, despertando nele súbito fervor amoroso." },
            { id: "f4", text: "Adelaide percebe o mercantilismo vil do primo e o repele categoricamente antes de partir com a família para a Europa." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A sequência mostra o cálculo: Gastança e aproximação do tio -> Desdém inicial por Adelaide -> Paixão repentina pelos 300 contos -> Rejeição humilhante por Adelaide."
        },
        {
          id: "puzzle_ls_2",
          variantLabel: "Variação B: A Dissimulação e a Ruptura",
          instruction: "Ordene os momentos do confronto entre a farsa de Luís Soares e a dignidade de Adelaide:",
          fragments: [
            { id: "f1", text: "Para agradar ao Major Vilela e simular juízo, Luís Soares aceita o emprego público que o tio lhe consegue." },
            { id: "f2", text: "Ao saber dos trezentos contos estipulados no testamento, Luís transforma sua indiferença em declarações inflamadas de amor." },
            { id: "f3", text: "Adelaide descobre que a mudança repentina de comportamento do primo é movida unicamente pelo cálculo financeiro." },
            { id: "f4", text: "Adelaide pronuncia a célebre recusa: 'Trezentos contos! É muito dinheiro para comprar um miserável.'" }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Siga o enredo: Emprego aceito por dissimulação -> Falsa paixão interesseira -> Descoberta da farsa por Adelaide -> Sentença e rompimento definitivo."
        },
        {
          id: "puzzle_ls_3",
          variantLabel: "Variação C: O Desfecho Trágico do Dândi",
          instruction: "Reconstitua a derrocada definitiva e o fim trágico de Luís Soares após a rejeição da família:",
          fragments: [
            { id: "f1", text: "Adelaide e o Major Vilela partem para a Europa, deixando Luís Soares isolado e sem recursos no Rio de Janeiro." },
            { id: "f2", text: "Com seus últimos seis contos esgotados e as portas fechadas na alta sociedade, Luís vê desmoronar sua farsa de dândi." },
            { id: "f3", text: "Incapaz de aceitar a pobreza, o trabalho ou o vexame público da decadência social, Luís sucumbe ao desespero." },
            { id: "f4", text: "Sozinho em seu quarto, Luís Soares põe fim à própria vida com um tiro de pistola." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A derrocada fatal: Partida da família para a Europa -> Insolvência e isolamento -> Desespero moral -> Suicídio por arma de fogo."
        }
      ],

      analysesPool: [
        {
          id: "analysis_ls_1",
          variantLabel: "Análise 1: O Parasitismo Social",
          title: "Análise da Hipocrisia e Parasitismo Social",
          question: "Qual o traço de caráter que Machado de Assis mais evidencia e critica na figura de Luís Soares?",
          options: [
            { letter: "A", text: "A ingenuidade diante dos golpes de comerciantes da Rua do Ouvidor.", correct: false },
            { letter: "B", text: "O parasitismo e a instrumentalização dos laços afetivos e familiares em prol da subsistência fútil.", correct: true },
            { letter: "C", text: "O fervor religioso reprimido pelo ambiente laico da capital.", correct: false },
            { letter: "D", text: "O patriotismo exagerado durante os conflitos de fronteira.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Machado ridiculariza o jovem aristocrata improdutivo que enxerga o casamento e a família apenas como tábua de salvação financeira.",
          feedbackIncorrect: "Revise a obra: Luís Soares não é ingênuo; ele tenta conscientemente usar a prima Adelaide e o tio para financiar seu estilo de vida esbanjador."
        },
        {
          id: "analysis_ls_2",
          variantLabel: "Análise 2: A Rua do Ouvidor como Vitrine",
          title: "O Dândi Carioca e a Sociedade de Aparências",
          question: "O que a Rua do Ouvidor representa na construção psicológica e social de Luís Soares?",
          options: [
            { letter: "A", text: "O epicentro da vaidade, do consumo conspícuo e da alienação da elite jovem do Segundo Reinado.", correct: true },
            { letter: "B", text: "Um centro acadêmico dedicado exclusivamente à pesquisa científica e filosófica.", correct: false },
            { letter: "C", text: "Um retiro espiritual para intelectuais reclusos.", correct: false },
            { letter: "D", text: "A sede do poder judiciário encarregada da cobrança de impostos.", correct: false }
          ],
          feedbackCorrect: "Exato! A Rua do Ouvidor era o coração do luxo importado de Paris no Rio Imperial, onde os dândis gastavam fortunas para serem vistos.",
          feedbackIncorrect: "Atenção: A Rua do Ouvidor funcionava como grande passarela de vaidades e modismos da burguesia carioca da época."
        },
        {
          id: "analysis_ls_3",
          variantLabel: "Análise 3: O Papel de Adelaide",
          title: "A Dignidade Moral vs. O Cálculo Cínico",
          question: "Na famosa frase de Adelaide ('Trezentos contos! É muito dinheiro para comprar um miserável'), a personagem manifesta:",
          options: [
            { letter: "A", text: "A recusa em submeter sua dignidade moral e seus sentimentos à lógica mercantil e interesseira do casamento de conveniência.", correct: true },
            { letter: "B", text: "O desejo de aumentar a quantia exigida pelo dote antes de aceitar a proposta de casamento.", correct: false },
            { letter: "C", text: "A intenção de doar toda a herança para obras de caridade na Europa.", correct: false },
            { letter: "D", text: "A submissão incondicional às ordens patriarcais do Major Vilela.", correct: false }
          ],
          feedbackCorrect: "Correto! Adelaide desmascara o mercantilismo do primo e recusa-se a servir de instrumento financeiro para resgatar um homem moralmente falido.",
          feedbackIncorrect: "Observe: Adelaide profere a frase ao perceber que o suposto amor de Luís Soares nasceu apenas após a revelação da herança de trezentos contos."
        }
      ],

      vestibularPool: [
        {
          id: "vest_ls_1",
          examTag: "ENEM / UERJ - Crítica Social",
          question: "A trajetória de Luís Soares reflete uma característica marcante da prosa machadiana inicial. Trata-se de:",
          options: [
            { letter: "A", text: "A desmistificação do herói aristocrático, revelando o vazio moral e o parasitismo por trás das aparências elegantes.", correct: true },
            { letter: "B", text: "A exaltação da natureza tropical brasileira em contraste com a corrupção da cidade.", correct: false },
            { letter: "C", text: "A defesa do determinismo biológico absoluto sobre o destino humano.", correct: false },
            { letter: "D", text: "O resgate de valores medievais e de cavalaria no cenário carioca.", correct: false }
          ],
          explanation: "Machado desconstrói o mito do jovem romântico urbano, mostrando como a futilidade da elite imperial escondia profunda degradação ética e desespero."
        },
        {
          id: "vest_ls_2",
          examTag: "FUVEST - A Dissimulação e o Parasitismo",
          question: "No conto 'Luís Soares', a aceitação temporária de um emprego público arranjado pelo tio Major Vilela enquanto corteja a herança familiar revela:",
          options: [
            { letter: "A", text: "A dissimulação utilitária do dândi, que se sujeita formalmente ao emprego para encenar juízo e assegurar o patrimônio e a simpatia da família.", correct: true },
            { letter: "B", text: "A vocação genuína para a burocracia estatal e o abandono definitivo da vaidade mundana.", correct: false },
            { letter: "C", text: "A rebeldia aberta e a recusa frontal a qualquer tipo de compromisso com a família.", correct: false },
            { letter: "D", text: "O desejo altruísta de servir aos interesses patrióticos do Segundo Reinado.", correct: false }
          ],
          explanation: "Luís Soares aceita o emprego público não por apreço ao trabalho, mas como cálculo de sobrevivência e encenação perante o Major Vilela, comprovando que a regeneração moral era mera máscara social."
        },
        {
          id: "vest_ls_3",
          examTag: "UNICAMP - O Desfecho Trágico e a Máscara Social",
          question: "O desfecho trágico de Luís Soares (o suicídio com pistola após a partida da família para a Europa) evidencia na obra machadiana:",
          options: [
            { letter: "A", text: "A incapacidade do dândi parasitário de sobreviver quando desprovido de recursos e desmascarado em sua farsa social perante a corte.", correct: true },
            { letter: "B", text: "Uma conversão religiosa milagrosa de última hora.", correct: false },
            { letter: "C", text: "A vitória triunfante dos planos de enriquecimento fácil no Segundo Reinado.", correct: false },
            { letter: "D", text: "A reconciliação amorosa entre os primos antes do embarque marítimo.", correct: false }
          ],
          explanation: "Luís Soares prefere a morte à perda da máscara de homem rico e elegante, demonstrando a tirania das aparências e a ruína inevitável do parasita social."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "mulher-de-preto",
      title: "A Mulher de Preto",
      numberText: "Conto III",
      location: "📍 Salões da Corte, Rio de Janeiro",
      image: "assets/mulher_de_preto.jpg",
      tags: ["Honra", "Mediação Moral", "Aparência de Culpa"],
      xpValue: 143,
      summary: "O jovem médico Dr. Estêvão Soares apaixona-se por Madalena, mulher elegante vestida de preto que ele supõe equivocadamente ser viúva. Na verdade, ela é a esposa legítima de seu grande amigo, o deputado Meneses, de quem vivia separada por um falso e injusto ciúme. Ao saber que ela nunca o traiu e anseia pela restauração do lar, Estêvão sacrifica seu sentimento e atua como nobre mediador para reconciliar o casal.",

      step1Context: {
        title: "O Enigma da Mulher de Preto",
        text: "Dr. Estêvão Soares, jovem médico idealista de vinte e quatro anos, torna-se amigo íntimo do influente deputado Meneses. Ao avistar no teatro e depois num baile uma formosa mulher vestida inteiramente de preto (Madalena), Estêvão apaixona-se julgando-a viúva. Na verdade, ela não é viúva nem guarda luto de morte: é a esposa legítima de Meneses, de quem vivia separada por uma infundada suspeita de infidelidade que jamais cometeu. Sabendo da forte amizade entre Estêvão e seu marido, Madalena recorre ao jovem médico para desfazer o mal-entendido e restabelecer a verdade e a paz conjugal.",
        quote: "— Não sou viúva, doutor; sou casada com o deputado Meneses, seu amigo; e preciso do senhor para restabelecer a verdade e a minha paz."
      },

      puzzlesPool: [
        {
          id: "puzzle_mp_1",
          variantLabel: "Variação A: O Encontro & A Revelação",
          instruction: "Decifre o segredo da Mulher de Preto organizando os fatos na ordem autêntica:",
          fragments: [
            { id: "f1", text: "Estêvão avista Madalena vestida de preto no teatro e apaixona-se, supondo equivocadamente que ela seja viúva." },
            { id: "f2", text: "Ao declarar sua afeição no baile, descobre com assombro que ela é a esposa legítima de seu amigo, o deputado Meneses, de quem vivia separada." },
            { id: "f3", text: "Madalena esclarece que nunca foi infiel ao marido e que a separação decorrera de um infundado mal-entendido de ciúme." },
            { id: "f4", text: "Ciente da amizade entre Estêvão e Meneses, ela pede sua intercessão para desfazer o engano e reconciliar os esposos." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe a revelação: Encanto no teatro -> Descoberta do casamento com o amigo -> Certeza da inocência de Madalena -> Pedido de mediação."
        },
        {
          id: "puzzle_mp_2",
          variantLabel: "Variação B: O Ciúme Injusto e a Reconciliação",
          instruction: "Ordene os passos do drama do ciúme e da honra conjugal entre Meneses e Madalena:",
          fragments: [
            { id: "f1", text: "Meneses desconfia injustamente da fidelidade de Madalena e promove a separação conjugal, movido pelo ciúme." },
            { id: "f2", text: "Madalena, inocente de qualquer traição, sofre com o afastamento e veste-se de preto pela tristeza de seu lar desfeito." },
            { id: "f3", text: "A prova definitiva da inocência de Madalena vem à tona, desfazendo completamente a suspeita infundada de adultério." },
            { id: "f4", text: "Com a intervenção sincera e mediadora de Estêvão, Meneses arrepende-se de sua precipitação e acolhe Madalena com ternura." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe o drama da honra: Desconfiança infundada de Meneses -> Tristeza de Madalena vestida de preto -> Prova da inocência -> Reconciliação do casal."
        },
        {
          id: "puzzle_mp_3",
          variantLabel: "Variação C: A Renúncia e a Nobreza de Estêvão",
          instruction: "Reconstitua a nobre atitude de Dr. Estêvão Soares no desfecho da narrativa:",
          fragments: [
            { id: "f1", text: "Estêvão compreende que sua paixão por Madalena não pode concorrer com a lealdade devida à amizade de Meneses." },
            { id: "f2", text: "Superando o sentimento pessoal, ele emprega toda a sua influência e respeito para unir novamente o casal desavindo." },
            { id: "f3", text: "Consumada a reconciliação dos esposos, Estêvão opta por afastar-se para silenciar seu próprio coração ferido." },
            { id: "f4", text: "Deixa uma carta carinhosa aos amigos e parte discretamente para o interior de Minas Gerais." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A marcha ética: Dilema moral de Estêvão -> Opção pela amizade e honra -> Mediação bem-sucedida -> Renúncia e partida para Minas Gerais."
        }
      ],

      analysesPool: [
        {
          id: "analysis_mp_1",
          variantLabel: "Análise 1: A Aparência e o Pré-julgamento",
          title: "O Falso Juízo e as Aparências Enganosas",
          question: "O fato de Estêvão julgar Madalena viúva pela cor de suas roupas e a separação precipitada imposta por Meneses evidenciam que:",
          options: [
            { letter: "A", text: "Na sociedade da corte, os julgamentos eram frequentemente precipitados, baseados em falsas aparências e suspeitas infundadas.", correct: true },
            { letter: "B", text: "Demonstra que as leis civis do Império obrigavam as mulheres a usarem preto após qualquer discussão conjugal.", correct: false },
            { letter: "C", text: "Prova que Meneses queria expulsar a esposa para casar-se com a herdeira da coroa britânica.", correct: false },
            { letter: "D", text: "Indica que Madalena era uma criminosa procurada pela polícia internacional.", correct: false }
          ],
          feedbackCorrect: "Exato! Machado critica como a sociedade e os indivíduos se deixavam guiar por aparências e pré-julgamentos que condenavam injustamente a mulher.",
          feedbackIncorrect: "Atenção: Madalena foi repudiada unicamente por uma suspeita precipitada e sem fundamento de Meneses, sem que houvesse traição real."
        },
        {
          id: "analysis_mp_2",
          variantLabel: "Análise 2: A Nobreza de Estêvão",
          title: "O Sacrifício Moral e a Vitória da Amizade",
          question: "Qual o significado da decisão de Estêvão ao aceitar mediar a reconciliação de Madalena e Meneses?",
          options: [
            { letter: "A", text: "O triunfo do dever moral e da lealdade fraterna sobre o egoísmo da paixão individual e a posse amorosa.", correct: true },
            { letter: "B", text: "O medo covarde de enfrentar Meneses em um duelo de pistolas na praia.", correct: false },
            { letter: "C", text: "A tentativa de extorquir dinheiro do casal para financiar sua viagem a Minas Gerais.", correct: false },
            { letter: "D", text: "A indiferença absoluta pelos sentimentos de ambos os amigos.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Estêvão encarna uma nobreza de caráter que prefere restaurar a felicidade dos outros à custa de sua própria renúncia afetiva.",
          feedbackIncorrect: "Reflita: Estêvão ama Madalena, mas coloca a verdade, a honra da mulher e a amizade fraterna de Meneses acima de seus próprios anseios."
        },
        {
          id: "analysis_mp_3",
          variantLabel: "Análise 3: O Signo do Vestido Negro",
          title: "O Vestido Preto como Metáfora de Separação",
          question: "O que o traje negro de Madalena expressa simbolicamente na narrativa, dado que ela não é viúva?",
          options: [
            { letter: "A", text: "A tristeza pelo lar desfeito e o sofrimento moral decorrente do afastamento injusto imposto pelo ciúme do marido.", correct: true },
            { letter: "B", text: "Uma fantasia para participar do baile de máscaras municipal.", correct: false },
            { letter: "C", text: "A devoção a uma ordem religiosa de freiras penitentes.", correct: false },
            { letter: "D", text: "Apenas uma obrigação imposta pela alfândega portuária do Rio de Janeiro.", correct: false }
          ],
          feedbackCorrect: "Excelente! O vestido preto externaliza a condição de mulher afastada da convivência conjugal e ferida na sua dignidade.",
          feedbackIncorrect: "Atenção: O traje não decorre de viuvez real, mas do pesar íntimo pelo casamento rompido por infundada desconfiança."
        }
      ],

      vestibularPool: [
        {
          id: "vest_mp_1",
          examTag: "FUVEST - Transição e Dilema Moral",
          question: "Em 'A Mulher de Preto', Machado de Assis articula elementos do melodrama romântico com traços de sua futura maturidade analítica ao:",
          options: [
            { letter: "A", text: "Explorar o dilema íntimo entre a paixão individual e a lealdade fraternal ao amigo, resolvido pela renúncia abnegada do protagonista.", correct: true },
            { letter: "B", text: "Narrar uma aventura de pirataria e duelos marítimos na baía de Guanabara.", correct: false },
            { letter: "C", text: "Defender o divórcio obrigatório para todos os casamentos do Segundo Reinado.", correct: false },
            { letter: "D", text: "Substituir a prosa de ficção por crônicas jornalísticas de economia.", correct: false }
          ],
          explanation: "Estêvão ama Madalena, mas coloca a honra dela e a fidelidade ao amigo Meneses acima de seus sentimentos, atuando como pacificador altruísta."
        },
        {
          id: "vest_mp_2",
          examTag: "UNICAMP - O Ciúme Patriarcal e o Casamento Oitocentista",
          question: "O drama vivido por Madalena em 'A Mulher de Preto', separada sumariamente de Meneses por uma suspeita infundada de infidelidade, evidencia na sociedade carioca do século XIX:",
          options: [
            { letter: "A", text: "A vulnerabilidade da mulher casada perante o arbítrio e o ciúme masculino, em que meras conjecturas bastavam para afastar a esposa inocente do lar.", correct: true },
            { letter: "B", text: "A existência de plena igualdade jurídica e patrimonial entre homens e mulheres sob o Código Criminal do Império.", correct: false },
            { letter: "C", text: "O costume social segundo o qual os maridos eram punidos com exílio forçado em caso de discussão doméstica.", correct: false },
            { letter: "D", text: "A preferência das famílias da corte pela vida monástica feminina em detrimento do casamento.", correct: false }
          ],
          explanation: "Machado desnuda a assimetria de poder patriarcal: bastava uma suspeita sem provas para que Meneses rompesse a convivência com Madalena, que só recupera o lar após a intervenção de Estêvão."
        },
        {
          id: "vest_mp_3",
          examTag: "ENEM - Foco Narrativo & Ética da Renúncia",
          question: "A partida de Dr. Estêvão Soares para Minas Gerais, ao término da narrativa de 'A Mulher de Preto', traduz:",
          options: [
            { letter: "A", text: "A sublimação ética do sentimento amoroso, consolidando sua condição de amigo leal que renuncia à posse para preservar a paz reconquistada pelo casal.", correct: true },
            { letter: "B", text: "A fuga covarde de um médico desempregado e sem recursos.", correct: false },
            { letter: "C", text: "O desejo de vingar-se de Meneses criando uma clínica rival no interior.", correct: false },
            { letter: "D", text: "A expulsão forçada de Estêvão por ordem judicial do gabinete ministerial.", correct: false }
          ],
          explanation: "A retirada discreta de Estêvão coroa sua atitude abnegada, encerrando o conto sob uma aura de admirável grandeza moral e lealdade."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "segredo-augusta",
      title: "O Segredo de Augusta",
      numberText: "Conto IV",
      location: "📍 Residência da Família, Botafogo (Rio de Janeiro)",
      image: "assets/segredo_augusta.jpg",
      tags: ["Vaidade Feminina", "Terror de Ser Avó", "Conflito Doméstico"],
      xpValue: 143,
      summary: "Vasconcelos, arruinado por gastos e dívidas, pressiona para casar sua filha Adelaide (de apenas quinze anos) com o amigo Gomes, julgando-o rico e capaz de salvar a família da falência. A esposa Augusta, porém, opõe-se veementemente: alega publicamente que a moça é jovem demais, mas seu segredo inconfessável é o terror patológico de envelhecer e ser chamada de avó nos círculos da corte.",

      step1Context: {
        title: "O Terror de Ser Avó e o Arranjo Doméstico",
        text: "Em um drama estritamente doméstico e sem qualquer grande baile, Vasconcelos — dilapidado por despesas descontroladas — vê no casamento da filha Adelaide, de quinze anos, com o amigo Gomes a salvação para suas dívidas. No entanto, Augusta opõe uma resistência feroz ao matrimônio. O motivo declarado é a juventude da filha; o motivo real e inconfessável ('o segredo de Augusta') é a sua vaidade exacerbada: aos trinta e poucos anos e ainda bela, Augusta tem pavor absoluto de que a filha tenha filhos e a transforme em avó perante a sociedade carioca. Para completar a ironia machadiana, Adelaide recusa o pretendente e descobre-se que Gomes também estava arruinado, cortejando Adelaide na ilusão de que ela era uma herdeira rica.",
        quote: "— Casar a Adelaide já? Mas ela é uma criança de quinze anos!... (E no íntimo: ser avó aos trinta anos? Nunca!)"
      },

      puzzlesPool: [
        {
          id: "puzzle_sa_1",
          variantLabel: "Variação A: A Oposição ao Casamento",
          instruction: "Decifre o conflito doméstico e a ordem dos fatos em 'O Segredo de Augusta':",
          fragments: [
            { id: "f1", text: "Vasconcelos, arruinado por dívidas, pressiona o casamento de sua filha Adelaide com Gomes, julgando-o abastado." },
            { id: "f2", text: "Augusta insurge-se furiosamente contra o noivado, alegando publicamente que a filha de quinze anos é jovem demais." },
            { id: "f3", text: "Vasconcelos desespera-se diante da recusa obstinada da esposa perante um arranjo que salvaria a família da falência." },
            { id: "f4", text: "Revela-se o segredo de Augusta: sua vaidade narcísica recusa terminantemente ter netos e virar avó aos trinta anos." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe o conflito: Pressão de Vasconcelos -> Pretexto de Augusta -> Desespero do pai -> Revelação do pavor de ser avó."
        },
        {
          id: "puzzle_sa_2",
          variantLabel: "Variação B: A Máscara da Juventude",
          instruction: "Ordene as revelações sobre a psicologia vaidosa de Augusta na sociedade fluminense:",
          fragments: [
            { id: "f1", text: "Augusta cultiva com esmero a aparência de jovem donzela e sua vaidade perante a corte." },
            { id: "f2", text: "O crescimento e a beleza de sua filha Adelaide tornam-se uma ameaça secreta à sua autoimagem." },
            { id: "f3", text: "A perspectiva do casamento da jovem traz consigo a possibilidade fatal de netos e do envelhecimento público." },
            { id: "f4", text: "A tirania estética da mãe sobrepõe-se à própria salvação econômica e ao futuro da filha." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A psicologia de Augusta: Culto da juventude -> Ameaça da filha adolescente -> Pavor de ser avó -> Prevalência da vaidade."
        },
        {
          id: "puzzle_sa_3",
          variantLabel: "Variação C: O Desfecho e a Ironia Machadiana",
          instruction: "Reconstitua o desfecho irônico do casamento arranjado por Vasconcelos:",
          fragments: [
            { id: "f1", text: "Vasconcelos insiste no casamento de Adelaide com Gomes para obter alívio financeiro imediato." },
            { id: "f2", text: "Augusta segue sabotando a união nas conversas domésticas por puro medo de parecer velha e ser chamada de avó." },
            { id: "f3", text: "A jovem Adelaide opõe sua própria vontade e recusa terminantemente casar-se com Gomes por não amá-lo." },
            { id: "f4", text: "Descobre-se a ironia final: Gomes também estava arruinado e pretendia casar-se na ilusão de que Adelaide possuía dote." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A ironia do desfecho: Insistência de Vasconcelos -> Resistência de Augusta -> Recusa de Adelaide -> Descoberta da ruína de Gomes."
        }
      ],

      analysesPool: [
        {
          id: "analysis_sa_1",
          variantLabel: "Análise 1: A Tirania da Vaidade",
          title: "O Terror da Idade e o Narcisismo Social",
          question: "O que o 'Segredo de Augusta' expõe sobre os valores que regiam a autoimagem feminina na corte imperial?",
          options: [
            { letter: "A", text: "A obsessão pela juventude e pela sedução social, na qual a maternidade madura e o papel de avó eram vistos como decadência insuportável.", correct: true },
            { letter: "B", text: "O desejo das mulheres da época de abandonarem a cidade para viverem como eremitas.", correct: false },
            { letter: "C", text: "A preferência de Augusta por casar a filha com um general estrangeiro.", correct: false },
            { letter: "D", text: "A obrigação legal de as mães se tornarem monjas após os trinta anos de idade.", correct: false }
          ],
          feedbackCorrect: "Exato! Machado de Assis desnuda com fina ironia o narcisismo de Augusta, cujo segredo inconfessável era o terror de envelhecer e tornar-se avó.",
          feedbackIncorrect: "Atenção: O verdadeiro segredo de Augusta é a recusa em aceitar a passagem do tempo e o pavor de ser chamada de avó aos trinta anos."
        },
        {
          id: "analysis_sa_2",
          variantLabel: "Análise 2: A Mercantilização dos Afetos",
          title: "O Casamento como Transação de Alívio Financeiro",
          question: "Como a conduta de Vasconcelos ao pressionar pelo casamento de Adelaide com Gomes ilustra os costumes patriarcais da época?",
          options: [
            { letter: "A", text: "Trata a filha adolescente de quinze anos como moeda de troca para saldar dívidas financeiras e escapar da ruína material.", correct: true },
            { letter: "B", text: "Recusa qualquer acordo financeiro por defender a liberdade romântica irrestrita da jovem.", correct: false },
            { letter: "C", text: "Exige que a filha permaneça solteira para cuidar das propriedades da família.", correct: false },
            { letter: "D", text: "Subordina a decisão à autoridade de um tribunal eclesiástico.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Vasconcelos é quem comanda a pressão pelo casamento, instrumentalizando a filha para salvar as finanças dilapidadas do lar.",
          feedbackIncorrect: "Reflita: Vasconcelos pressiona pelo casamento de Adelaide para salvar sua própria bancarrota, sem atentar para a vontade da jovem."
        },
        {
          id: "analysis_sa_3",
          variantLabel: "Análise 3: A Dupla Falência e a Ironia do Desfecho",
          title: "O Desmascaramento das Ilusões Financeiras",
          question: "Qual o efeito crítico e irônico gerado pela revelação sobre a real situação de Gomes e a recusa de Adelaide?",
          options: [
            { letter: "A", text: "Desmascara a mútua ilusão utilitária: o pai tentava negociar a filha com um pretendente supostamente rico que, na verdade, também estava falido.", correct: true },
            { letter: "B", text: "Demonstra que a família Vasconcelos resolveu seus problemas ganhando uma loteria clandestina.", correct: false },
            { letter: "C", text: "Mostra que Gomes comprou um palacete imperial para presentear a noiva.", correct: false },
            { letter: "D", text: "Comprova que Adelaide fugiu com um capitão da marinha para a Europa.", correct: false }
          ],
          feedbackCorrect: "Excelente! A ironia machadiana expõe que ambos os homens estavam falidos tentando usar o casamento como golpe de salvação financeira.",
          feedbackIncorrect: "Atenção: A ironia do desfecho reside no fato de Gomes também estar arruinado e Adelaide recusar a imposição do pai."
        }
      ],

      vestibularPool: [
        {
          id: "vest_sa_1",
          examTag: "FUVEST - Desconstrução do Ideal Materno",
          question: "Em 'O Segredo de Augusta', a caracterização da protagonista feminina distancia-se do modelo romântico tradicional de maternidade ao:",
          options: [
            { letter: "A", text: "Subordinar o destino da própria filha ao seu egoísmo estético e ao terror inconfessável de tornar-se avó aos trinta anos.", correct: true },
            { letter: "B", text: "Apresentar uma mãe que se sacrifica heroicamente no trabalho fabril para sustentar o lar.", correct: false },
            { letter: "C", text: "Retratar uma matriarca devota que abre mão de todas as joias em favor dos necessitados.", correct: false },
            { letter: "D", text: "Substituir o afeto maternal pela devoção militar nas guerras cisplatinas.", correct: false }
          ],
          explanation: "Machado desconstrói o mito romântico da mãe abnegada: a oposição de Augusta ao casamento de Adelaide nasce unicamente do pavor de virar avó e perder a aura de juventude."
        },
        {
          id: "vest_sa_2",
          examTag: "UNICAMP - O Embate entre Interesses no Casamento",
          question: "No conto 'O Segredo de Augusta', o conflito doméstico em torno do casamento precoce de Adelaide (15 anos) caracteriza-se pelo choque entre:",
          options: [
            { letter: "A", text: "O pragmatismo financeiro do pai (Vasconcelos), que tenta negociar a filha para salvar-se da falência, e a vaidade narcísica da mãe (Augusta), que rejeita ser avó.", correct: true },
            { letter: "B", text: "A exigência da mãe em realizar um baile suntuoso e a recusa do pai em gastar com festas.", correct: false },
            { letter: "C", text: "A recusa conjunta dos pais em permitir que a filha se case antes de completar vinte e cinco anos.", correct: false },
            { letter: "D", text: "A imposição de Gomes para que a noiva assumisse a gestão de uma empresa comercial.", correct: false }
          ],
          explanation: "O pai arruinado pressiona pelo casamento para quitar dívidas; a mãe opõe-se por vaidade pessoal, temendo o estigma do envelhecimento precoce."
        },
        {
          id: "vest_sa_3",
          examTag: "ENEM - Aparência Social e Desengano",
          question: "O desfecho de 'O Segredo de Augusta', no qual Adelaide recusa o pretendente e revela-se que Gomes também estava arruinado, evidencia na prosa de Machado de Assis:",
          options: [
            { letter: "A", text: "A farsa dos arranjos matrimoniais burgueses, em que o cálculo utilitário e a encenação social de prosperidade mascaram a mútua decadência material.", correct: true },
            { letter: "B", text: "A celebração do amor romântico triunfando sobre todas as barreiras econômicas da corte.", correct: false },
            { letter: "C", text: "A punição judicial de Gomes por fraude contratual perante os tribunais civis do Império.", correct: false },
            { letter: "D", text: "A pacificação do conflito através de um empréstimo concedido pelo Ministério da Fazenda.", correct: false }
          ],
          explanation: "Machado ridiculariza as pretensões da corte: Vasconcelos tentava salvar-se com Gomes, e Gomes pretendia salvar-se com Adelaide; o fracasso do arranjo expõe a vaidade e a hipocrisia de ambos."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "confissoes-viuva",
      title: "Confissões de uma Viúva Moça",
      numberText: "Conto V",
      location: "📍 Petrópolis & Rio de Janeiro",
      image: "assets/confissoes_viuva.jpg",
      tags: ["Narrativa Epistolar", "Cinismo Amoroso", "Desilusão"],
      xpValue: 143,
      summary: "Em cartas confessionais enviadas de Petrópolis à amiga Carlota, a jovem viúva Eugênia revela como resistiu às investidas de Emílio durante seu casamento sem amor, apenas para descobrir, após ficar viúva, o cinismo do pretendente, que só a desejava como amante proibida.",

      step1Context: {
        title: "As Cartas de Eugênia a Carlota",
        text: "Narrado em forma epistolar através de cartas íntimas enviadas por Eugênia de Petrópolis para sua confidente Carlota, o conto disseca as contradições do desejo e da moral burguesa. Casada por imposição familiar com um homem a quem não amava, Eugênia resistiu estoicamente às juras de paixão de Emílio. Com a morte súbita do marido, ela esperava consagrar o amor no matrimônio, mas depara-se com o recuo cínico do sedutor, cuja atração residia apenas na proibição do adultério.",
        quote: "— Ele me amava enquanto o adultério era proibido; livre e viúva, o casamento lhe pareceu um fardo intolerável..."
      },

      puzzlesPool: [
        {
          id: "puzzle_cv_1",
          variantLabel: "Variação A: As Confissões de Eugênia",
          instruction: "Reconstitua a ordem das confidências epistolares de Eugênia à amiga Carlota:",
          fragments: [
            { id: "f1", text: "Eugênia casa-se por conveniência e resiste moralmente às investidas apaixonadas do galanteador Emílio." },
            { id: "f2", text: "O falecimento repentino do marido encerra o matrimônio sem amor e liberta Eugênia para uma nova união." },
            { id: "f3", text: "Livre para o casamento legítimo, Eugênia descobre o esfriamento e o desinteresse súbito de Emílio." },
            { id: "f4", text: "Compreendendo que o pretendente só cobiçava a transgressão mundana, Eugênia isola-se com altivez em Petrópolis." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe a revelação nas cartas: Casamento por conveniência -> Viuvez inesperada -> Esfriamento de Emílio -> Isolamento digno."
        },
        {
          id: "puzzle_cv_2",
          variantLabel: "Variação B: O Confronto com o Cinismo",
          instruction: "Ordene os passos da desilusão amorosa e psicológica vivida por Eugênia:",
          fragments: [
            { id: "f1", text: "Durante a vida do marido, Emílio cerca Eugênia de cartas ardentes e protestos de adoração eterna." },
            { id: "f2", text: "Eugênia reprime seu afeto recíproco para zelar pela honra conjugal e pelo dever de esposa." },
            { id: "f3", text: "Com a viuvez, a visita de Emílio revela-se formal, polida e desprovida do menor compromisso matrimonial." },
            { id: "f4", text: "A jovem compreende a hipocrisia do sedutor de salão, que buscava apenas um capricho vaidoso." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A marcha da desilusão: Sedução clandestina -> Repressão moral -> Reencontro frio -> Compreensão do cinismo."
        },
        {
          id: "puzzle_cv_3",
          variantLabel: "Variação C: A Sabedoria da Renúncia",
          instruction: "Reconstitua o desfecho ético da protagonista em sua correspondência com Carlota:",
          fragments: [
            { id: "f1", text: "Emílio recua diante da possibilidade real de um casamento público e respeitável." },
            { id: "f2", text: "Eugênia recusa-se a implorar afeto ou a transformar-se em mera amante descartável nos salões." },
            { id: "f3", text: "Ela decide registrar suas memórias em cartas para instruir e alertar a amiga Carlota sobre as ilusões da corte." },
            { id: "f4", text: "A solidão em Petrópolis consolida-se como um ato de preservação de sua lucidez e dignidade feminina." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A postura ética: Recuo de Emílio -> Rejeição da subserviência -> Cartas a Carlota -> Paz interior em Petrópolis."
        }
      ],

      analysesPool: [
        {
          id: "analysis_cv_1",
          variantLabel: "Análise 1: A Estrutura Epistolar",
          title: "A Voz Feminina e a Introspecção Epistolar",
          question: "Qual a importância do gênero epistolar (cartas de Eugênia a Carlota) para a profundidade do conto?",
          options: [
            { letter: "A", text: "Permite a expressão direta da intimidade e da lucidez feminina sem a interferência moralizadora de um narrador masculino externo.", correct: true },
            { letter: "B", text: "Serve apenas como comprovante de dívidas bancárias entre duas famílias ricas.", correct: false },
            { letter: "C", text: "Tem o objetivo de ensinar culinária e bordado às leitoras da corte.", correct: false },
            { letter: "D", text: "Substitui os diálogos por versos épicos inspirados na mitologia grega.", correct: false }
          ],
          feedbackCorrect: "Excelente! O formato epistolar confere verossimilhança psicológica e dá voz autêntica aos dilemas íntimos da mulher oitocentista.",
          feedbackIncorrect: "Atenção: As cartas de Eugênia funcionam como canal de refinada autoanálise e desconstrução das ilusões românticas."
        },
        {
          id: "analysis_cv_2",
          variantLabel: "Análise 2: A Psicologia do Sedutor",
          title: "O Desejo pela Transgressão e o Medo do Compromisso",
          question: "O que explica o esfriamento repentino de Emílio assim que Eugênia fica viúva e livre para casar?",
          options: [
            { letter: "A", text: "O cinismo do sedutor que se alimentava do perigo da transgressão do adultério, mas repudiava os deveres do casamento legítimo.", correct: true },
            { letter: "B", text: "A perda repentina de memória causada por um acidente de carruagem em Botafogo.", correct: false },
            { letter: "C", text: "A falência bancária da família de Carlota.", correct: false },
            { letter: "D", text: "A ordem do bispo do Rio de Janeiro proibindo o noivado.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Machado disseca a vaidade masculina dos salões: para homens como Emílio, o prazer residia no troféu da conquista proibida, não na união conjugal.",
          feedbackIncorrect: "Reflita sobre a psicologia de Emílio: livre o caminho do altar, o encanto do fruto proibido desfaz-se e dá lugar ao desinteresse covarde."
        },
        {
          id: "analysis_cv_3",
          variantLabel: "Análise 3: A Dignidade da Protagonista",
          title: "A Recusa à Condição de Vítima Passiva",
          question: "De que maneira Eugênia rompe com o estereótipo da heroína frágil do romantismo sentimental?",
          options: [
            { letter: "A", text: "Ao encarar a realidade com lucidez analítica, recusando-se a mendigar carinho e escolhendo o autoexílio digno em Petrópolis.", correct: true },
            { letter: "B", text: "Ao cometer suicídio melodramático no Passeio Público.", correct: false },
            { letter: "C", text: "Ao desafiar Emílio para um duelo de pistolas no largo do Paço.", correct: false },
            { letter: "D", text: "Ao aceitar tornar-se amante secreta e submissa de Emílio.", correct: false }
          ],
          feedbackCorrect: "Excelente! Eugênia não sucumbe ao desespero romântico; ela analisa o ocorrido com rigor ético e preserva sua soberania moral.",
          feedbackIncorrect: "Atenção: A força de Eugênia está na sua maturidade reflexiva e na recusa absoluta de submeter-se ao capricho de um homem egoísta."
        }
      ],

      vestibularPool: [
        {
          id: "vest_cv_1",
          examTag: "ENEM - Gênero Epistolar & Subjetividade",
          question: "No conto 'Confissões de uma Viúva Moça', as cartas enviadas por Eugênia a Carlota constituem um procedimento literário que:",
          options: [
            { letter: "A", text: "Possibilita a sondagem psicológica das contradições morais da elite a partir da perspectiva crítica da própria mulher.", correct: true },
            { letter: "B", text: "Imita os documentos burocráticos dos ministérios do Império para conferir tom oficial à história.", correct: false },
            { letter: "C", text: "Elimina qualquer reflexão moral para priorizar o suspense de mistério policial.", correct: false },
            { letter: "D", text: "Condena o uso da escrita por mulheres no contexto da sociedade patriarcal.", correct: false }
          ],
          explanation: "O gênero epistolar machadiano transforma o desabafo íntimo em instrumento agudo de radiografia social e autoconhecimento."
        },
        {
          id: "vest_cv_2",
          examTag: "FUVEST - Crítica à Hipocrisia Amorosa",
          question: "A reação de Emílio à viuvez de Eugênia exemplifica um traço marcante da visão machadiana sobre as relações humanas:",
          options: [
            { letter: "A", text: "A hipocrisia dos galanteadores burgueses, cujo ardor sentimental esconde a busca por vaidade e a aversão a compromissos sérios.", correct: true },
            { letter: "B", text: "A pureza inabalável das intenções românticas dos jovens cavalheiros da corte.", correct: false },
            { letter: "C", text: "A determinação incondicional dos homens em honrar suas juras de amor na juventude.", correct: false },
            { letter: "D", text: "A submissão voluntária dos solteirões aos preceitos mais rígidos da moral católica.", correct: false }
          ],
          explanation: "Machado ironiza a retórica apaixonada dos salões, revelando que muitos protestos amorosos eram meros artifícios de vaidade social."
        },
        {
          id: "vest_cv_3",
          examTag: "UNICAMP - Desencanto e Autonomia",
          question: "Ao encerrar suas confidências em Petrópolis, Eugênia demonstra:",
          options: [
            { letter: "A", text: "Um desencanto maduro perante os códigos mundanos, convertendo sua frustração afetiva em autonomia e independência moral.", correct: true },
            { letter: "B", text: "A total subordinação aos caprichos de Emílio, aceitando qualquer condição para reavê-lo.", correct: false },
            { letter: "C", text: "O arrependimento por não ter fugido com o pretendente durante o casamento anterior.", correct: false },
            { letter: "D", text: "A adesão fanática a uma ordem religiosa de penitência física.", correct: false }
          ],
          explanation: "O conto recusa o sentimentalismo vazio e exalta a lucidez da personagem, que prefere a solidão reflexiva à farsa dos afetos mundanos."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "linha-reta-curva",
      title: "Linha Reta e Linha Curva",
      numberText: "Conto VI",
      location: "📍 Petrópolis, Rio de Janeiro",
      image: "assets/cover_.jpg",
      tags: ["Dissimulação", "Geometria do Desejo", "Vaidade Feminina"],
      xpValue: 143,
      summary: "Em Petrópolis, na casa de Ernesto Azevedo e Adelaide, Tito finge indiferença absoluta ao amor para despertar o orgulho da viúva rica D. Emília, que é cortejada pelo idoso Diogo. No final, Tito revela que utilizou a 'linha curva' (estratégia indireta) para conquistá-la após ter falhado no passado com a 'linha reta' (declaração direta).",

      step1Context: {
        title: "A Geometria da Conquista nos Salões",
        text: "Hospedado em Petrópolis na residência do amigo recém-casado Ernesto Azevedo e de Adelaide, o jovem Tito proclama-se imune às seduções femininas. A bela e caprichosa viúva D. Emília, habituada aos galanteios diretos e obsequiosos do maduro Diogo, sente sua vaidade ferida pelo desdém de Tito e empenha-se em conquistá-lo. Ao final, Tito revela o seu cálculo: rejeitado no passado pela 'linha reta' da confissão sincera, triunfou agora pela 'linha curva' da fingida indiferença.",
        quote: "— A linha reta vai direto ao alvo e falha pela pressa; a linha curva faz a volta da vaidade e atinge o coração com certeza!"
      },

      puzzlesPool: [
        {
          id: "puzzle_lrc_1",
          variantLabel: "Variação A: O Jogo de Petrópolis",
          instruction: "Reconstitua a estratégia de Tito e o enredo em Petrópolis:",
          fragments: [
            { id: "f1", text: "Tito hospeda-se na casa de Ernesto e Adelaide e ostenta completa frieza e desinteresse pelas mulheres." },
            { id: "f2", text: "A bela viúva D. Emília sente sua vaidade ferida pela indiferença de Tito e decide dobrar seu orgulho." },
            { id: "f3", text: "Diogo, pretendente idoso e formal de Emília, cerca a viúva de galanteios diretos, sendo solenemente ignorado." },
            { id: "f4", text: "Tito e Emília anunciam o casamento, coroando a vitória da estratégia indireta concebida por Tito." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A dinâmica em Petrópolis: Frieza ostensiva -> Vaidade ferida de Emília -> Fracasso de Diogo -> Anúncio do matrimônio."
        },
        {
          id: "puzzle_lrc_2",
          variantLabel: "Variação B: A Revelação da Linha Curva",
          instruction: "Ordene os passos da comparação geométrica formulada por Tito:",
          fragments: [
            { id: "f1", text: "No passado, Tito declarara-se a Emília com paixão direta ('linha reta') e fora zombado e recusado pela viúva." },
            { id: "f2", text: "Ele compreende que a facilidade e a sinceridade desarmada entorpecem o interesse da mulher cortejada." },
            { id: "f3", text: "Adota a 'linha curva', fingindo total imunidade amorosa para transformar a conquista em um desafio de vaidade." },
            { id: "f4", text: "A viúva cai no ardil e persegue obstinadamente o coração daquele que aparentava desprezá-la." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A tese geométrica: Rejeição da linha reta -> Reflexão sobre a vaidade -> Adoção da linha curva -> Triunfo sobre o orgulho."
        },
        {
          id: "puzzle_lrc_3",
          variantLabel: "Variação C: O Contraste entre Diogo e Tito",
          instruction: "Reconstitua a oposição de métodos entre os dois pretendentes da viúva:",
          fragments: [
            { id: "f1", text: "Diogo gasta seus dias cobrindo D. Emília de elogios banais e mesuras previsíveis." },
            { id: "f2", text: "Emília desdenha a corte fácil de Diogo e concentra todas as atenções na pose esquiva de Tito." },
            { id: "f3", text: "Diogo queixa-se amargurado a Ernesto, sem entender por que a dedicação não comove a dama." },
            { id: "f4", text: "O sucesso de Tito consagra a regra machadiana de que a resistência calculada aguça o desejo nos salões." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "O confronto de condutas: Galanteio insistente de Diogo -> Desprezo de Emília -> Queixa a Ernesto -> Vitória do desdém calculado."
        }
      ],

      analysesPool: [
        {
          id: "analysis_lrc_1",
          variantLabel: "Análise 1: A Geometria do Comportamento",
          title: "A Metáfora Geométrica e a Psicologia Social",
          question: "Qual o significado da distinção entre 'Linha Reta' e 'Linha Curva' nas relações afetivas da corte?",
          options: [
            { letter: "A", text: "A linha reta simboliza a franqueza que fracassa por matar o suspense, enquanto a linha curva representa a dissimulação estratégica que manipula a vaidade alheia.", correct: true },
            { letter: "B", text: "Indica o traçado topográfico das estradas de ferro imperiais de Petrópolis.", correct: false },
            { letter: "C", text: "Representa a preferência estética dos personagens por móveis e carruagens barrocas.", correct: false },
            { letter: "D", text: "Trata-se de uma regra de esgrima militar praticada pelos jovens oficiais.", correct: false }
          ],
          feedbackCorrect: "Exato! Machado usa a metáfora espacial para dissecar como a dissimulação e o cálculo psicológico regem o jogo social da elite.",
          feedbackIncorrect: "Atenção: A linha reta representa a declaração direta ineficaz; a linha curva é a estratégia de fingir indiferença para despertar a cobiça."
        },
        {
          id: "analysis_lrc_2",
          variantLabel: "Análise 2: A Psicologia da Coqueteria",
          title: "O Desejo Humano e a Provocação da Vaidade",
          question: "Por que D. Emília ignora as homenagens servis de Diogo e concentra seus esforços em dobrar a frieza de Tito?",
          options: [
            { letter: "A", text: "Porque a adulação constante entedia o amor-próprio, enquanto o desdém aparente é interpretado como um desafio intolerável à sua vaidade.", correct: true },
            { letter: "B", text: "Porque Diogo não tinha dinheiro para pagar os passeios a cavalo.", correct: false },
            { letter: "C", text: "Porque Ernesto e Adelaide a obrigaram a assinar um contrato com Tito.", correct: false },
            { letter: "D", text: "Porque Tito era médico particular do imperador Dom Pedro II.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Machado demonstra com precisão que a conquista nos salões é movida pelo amor-próprio e pelo desejo de dominar o que parece inalcançável.",
          feedbackIncorrect: "Reflita: A viúva já tinha Diogo aos seus pés; sua atenção foi capturada justamente pelo homem que simulava não se render a seus encantos."
        },
        {
          id: "analysis_lrc_3",
          variantLabel: "Análise 3: A Ironia sobre a Sinceridade",
          title: "A Fragilidade da Franqueza nos Salões",
          question: "Que visão de mundo a vitória de Tito expressa no contexto da prosa machadiana?",
          options: [
            { letter: "A", text: "A visão cética de que a sinceridade ingênua é ineficaz no teatro social burguês, onde o sucesso exige o domínio das máscaras e da representação.", correct: true },
            { letter: "B", text: "A convicção romântica de que os amores predestinados acontecem sem nenhum esforço humano.", correct: false },
            { letter: "C", text: "A defesa de que o celibato perpétuo é a única solução moral para a mocidade.", correct: false },
            { letter: "D", text: "A crença de que os astros determinam a compatibilidade dos casais da corte.", correct: false }
          ],
          feedbackCorrect: "Excelente! Para Machado de Assis, as relações mundanas operam sob leis de convenção e fingimento em que o afeto sincero precisa da máscara para vingar.",
          feedbackIncorrect: "Atenção: A experiência de Tito prova que a verdade nua foi rejeitada, triunfando apenas quando vestida com a armadura da dissimulação."
        }
      ],

      vestibularPool: [
        {
          id: "vest_lrc_1",
          examTag: "FUVEST / UNICAMP - Teoria das Aparências",
          question: "Em 'Linha Reta e Linha Curva', o comportamento de Tito em Petrópolis exemplifica:",
          options: [
            { letter: "A", text: "A manipulação deliberada dos códigos de conduta e da vaidade mundana como método infalível de conquista social.", correct: true },
            { letter: "B", text: "A submissão irracional de um jovem doente às ordens de sua família abastada.", correct: false },
            { letter: "C", text: "O choque entre a moralidade religiosa do clero e as festas carnavalescas.", correct: false },
            { letter: "D", text: "A impossibilidade total de relacionamento amoroso entre membros da mesma classe social.", correct: false }
          ],
          explanation: "Tito compreende os resortes da psicologia mundana e arquiteta uma encenação fria para dobrar o orgulho da viúva."
        },
        {
          id: "vest_lrc_2",
          examTag: "ENEM - Recursos Linguísticos & Metáforas",
          question: "O recurso à terminologia geométrica para qualificar as atitudes de Tito e Diogo reflete um traço de estilo machadiano voltado a:",
          options: [
            { letter: "A", text: "Analisar as paixões humanas com distanciamento crítico, elegância irônica e precisão quase científica.", correct: true },
            { letter: "B", text: "Dificultar a compreensão dos leitores através de termos matemáticos incompreensíveis.", correct: false },
            { letter: "C", text: "Substituir a literatura de costumes por manuais de engenharia de estradas.", correct: false },
            { letter: "D", text: "Elogiar os estudos de agrimensura promovidos pelo Ministério da Agricultura.", correct: false }
          ],
          explanation: "Machado utiliza conceitos da geometria como metáfora irônica para dissecar a dinâmica dos sentimentos e o teatro social."
        },
        {
          id: "vest_lrc_3",
          examTag: "UERJ - Sociabilidade e Veraneio Imperial",
          question: "O cenário de Petrópolis no conto 'Linha Reta e Linha Curva' desempenha a função de:",
          options: [
            { letter: "A", text: "Espaço privilegiado de sociabilidade e ócio da elite carioca, onde a intriga mundana e as disputas de salão ganham ritmo livre.", correct: true },
            { letter: "B", text: "Território de conflito armado entre tropas legalistas e rebeldes monarquistas.", correct: false },
            { letter: "C", text: "Senzala coletiva que denuncia a exploração escravista nas lavouras do café.", correct: false },
            { letter: "D", text: "Comunidade religiosa isolada sob rígida disciplina monástica.", correct: false }
          ],
          explanation: "Petrópolis era o refúgio de veraneio da corte imperial, ambiente propício para os refinados jogos de cortejo, vaidade e entretenimento da burguesia."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    },

    {
      id: "frei-simao",
      title: "Frei Simão",
      numberText: "Conto VII",
      location: "📍 Convento de São Bento, Rio de Janeiro",
      image: "assets/frei_simao.jpg",
      tags: ["Tragédia", "Tirania Familiar", "Desencanto Absoluto"],
      xpValue: 143,
      summary: "Simão e a órfã Helena cresceram juntos e apaixonaram-se, mas os pais de Simão opuseram-se ao enlace, mandando o rapaz para longe e mentindo que Helena havia morrido. Desolado, Simão professou votos no convento beneditino. Anos depois, ao reencontrar Helena viva e casada por imposição, o choque causa a morte da moça e mergulha Frei Simão na loucura, culminando em sua célebre frase final no leito de morte: 'Morro odiando a humanidade!'.",

      step1Context: {
        title: "A Tirania dos Pais e o Destino de Simão",
        text: "Encerrando a coletânea com um tom de profunda tragédia moral, 'Frei Simão' narra a destruição da vida de dois jovens pela autoridade despótica dos pais. Simão fora criado com a órfã Helena e planejava desposá-la, mas sua família repudia a união e inventa a pérfida mentira de que a jovem falecera. Desesperado, Simão busca refúgio no claustro beneditino. Anos depois, descobre a farsa ao vê-la viva em uma missa; a dor do reencontro mata Helena e arrasta o frade para a loucura e para o desencanto total com a humanidade.",
        quote: "— Morro odiando a humanidade!"
      },

      puzzlesPool: [
        {
          id: "puzzle_fs_1",
          variantLabel: "Variação A: A Mentira dos Pais",
          instruction: "Reconstitua os passos da tragédia que conduziu Simão ao claustro religioso:",
          fragments: [
            { id: "f1", text: "Simão e a órfã Helena crescem sob o mesmo teto e juram amor eterno na juventude." },
            { id: "f2", text: "Os pais de Simão desaprovam a união por orgulho social e afastam o filho para outra cidade." },
            { id: "f3", text: "O pai comunica falsamente a Simão que Helena falecera repentinamente de grave enfermidade." },
            { id: "f4", text: "Arrasado pela perda da amada, Simão abandona a vida civil e professa votos no convento beneditino." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "A marcha do engano: Amor de infância -> Oposição dos pais -> Mentira da morte -> Ingresso na ordem religiosa."
        },
        {
          id: "puzzle_fs_2",
          variantLabel: "Variação B: O Reencontro Fatal",
          instruction: "Ordene os acontecimentos após a descoberta da mentira no convento:",
          fragments: [
            { id: "f1", text: "Anos após professar votos solenes, Frei Simão reconhece Helena viva assistindo a uma cerimônia na igreja." },
            { id: "f2", text: "Ele descobre estarrecido que Helena fora forçada pela família dele a desposar outro homem contra a vontade." },
            { id: "f3", text: "O abalo psíquico do reencontro e a dor da traição ceifam a vida de Helena dois meses depois." },
            { id: "f4", text: "Frei Simão perde completamente a razão, mergulhando no isolamento e no delírio dentro de sua cela." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "Acompanhe o choque: Visão na igreja -> Descoberta do casamento forçado -> Morte de Helena -> Loucura do monge."
        },
        {
          id: "puzzle_fs_3",
          variantLabel: "Variação C: Os Manuscritos e a Morte",
          instruction: "Reconstitua os momentos finais de Frei Simão e o conteúdo de suas memórias:",
          fragments: [
            { id: "f1", text: "Confinado à cela, Frei Simão redige secretamente suas memórias, expondo a torpeza humana que arruinou sua vida." },
            { id: "f2", text: "Acometido de enfermidade fatal, recebe a extrema-unção cercado pelos membros da irmandade religiosa." },
            { id: "f3", text: "Em seu último suspiro no leito de morte, pronuncia a sentença indelével: 'Morro odiando a humanidade!'." },
            { id: "f4", text: "Os papéis encontrados em sua cela revelam ao Prior a nobreza e a tragédia injusta de sua existência." }
          ],
          correctOrder: ["f1", "f2", "f3", "f4"],
          hint: "O epílogo: Escrita das memórias -> Agonia no leito -> Frase final -> Leitura dos manuscritos."
        }
      ],

      analysesPool: [
        {
          id: "analysis_fs_1",
          variantLabel: "Análise 1: A Tirania Familiar",
          title: "O Despotismo Patriarcal e o Sacrifício dos Filhos",
          question: "Como a conduta dos pais de Simão ilustra a autoridade patriarcal da elite brasileira do século XIX?",
          options: [
            { letter: "A", text: "Mostra o arbítrio absoluto de pais que não hesitavam em recorrer à mentira e à destruição psíquica dos filhos para preservar seus preconceitos de classe.", correct: true },
            { letter: "B", text: "Demonstra que as famílias imperiais incentivavam os jovens a escolherem livremente suas vocações sem interferência.", correct: false },
            { letter: "C", text: "Indica que os pais de Simão queriam apenas que ele se tornasse oficial da marinha mercante.", correct: false },
            { letter: "D", text: "Comprova que todas as decisões familiares eram mediadas pelo imperador Dom Pedro II.", correct: false }
          ],
          feedbackCorrect: "Exato! Machado denuncia a crueldade fria das convenções burguesas, nas quais o interesse e a vaidade familiar sobrepunham-se aos sentimentos mais sagrados.",
          feedbackIncorrect: "Atenção: A tragédia de Simão nasce exclusivamente do preconceito social dos pais, que forjaram a morte de Helena para impedir o casamento."
        },
        {
          id: "analysis_fs_2",
          variantLabel: "Análise 2: A Ilusão do Claustro",
          title: "O Claustro Religioso e a Impossibilidade de Esquecer",
          question: "O que a vida de Frei Simão no convento revela sobre o isolamento religioso como tentativa de fuga?",
          options: [
            { letter: "A", text: "Que as paredes do convento e os votos solenes não têm o poder de apagar a memória da injustiça nem de curar o trauma afetivo.", correct: true },
            { letter: "B", text: "Que os monges tinham permissão para casar-se em segredo dentro da capela.", correct: false },
            { letter: "C", text: "Que a vida no mosteiro transformava automaticamente qualquer pessoa em um sábio imune a dores.", correct: false },
            { letter: "D", text: "Que o mosteiro era usado apenas como esconderijo para criminosos políticos foragidos.", correct: false }
          ],
          feedbackCorrect: "Perfeito! Machado demonstra que o hábito não confere paz espiritual quando a mente está dilacerada pela violência moral sofrida no mundo.",
          feedbackIncorrect: "Reflita: O refúgio no mosteiro foi uma fuga desesperada, mas a dor do passado permaneceu intacta e explodiu com a revelação da verdade."
        },
        {
          id: "analysis_fs_3",
          variantLabel: "Análise 3: A Sentença Final",
          title: "O Clímax do Desencanto Machadiano",
          question: "Qual o significado da célebre exclamação final de Frei Simão: 'Morro odiando a humanidade!'?",
          options: [
            { letter: "A", text: "Sintetiza o julgamento ético definitivo contra a hipocrisia, o egoísmo e a perfídia que regem as relações sociais dos homens.", correct: true },
            { letter: "B", text: "Representa um surto sem relação com a história narrada nos manuscritos.", correct: false },
            { letter: "C", text: "Uma brincadeira final de Machado para ironizar a literatura de terror gótico.", correct: false },
            { letter: "D", text: "Uma citação extraída diretamente dos manuais de liturgia beneditina.", correct: false }
          ],
          feedbackCorrect: "Excelente! Essa sentença condensa o profundo pessimismo e a denúncia moral que encerram *Contos Fluminenses*, distanciando-se de qualquer conciliação romântica.",
          feedbackIncorrect: "Atenção: A frase é o veredito de quem foi vítima de uma crueldade irreparável perpetrada pelos próprios pais e pela sociedade."
        }
      ],

      vestibularPool: [
        {
          id: "vest_fs_1",
          examTag: "FUVEST / UNICAMP - Ruptura com o Romantismo",
          question: "Em 'Frei Simão', a recusa de um final consolador e a ênfase na destruição irreversível dos amantes marcam:",
          options: [
            { letter: "A", text: "A superação definitiva da fábula romântica da providência divina em favor de uma visão trágica e determinista da sociedade dos homens.", correct: true },
            { letter: "B", text: "A cópia servil dos contos de fadas medievais alemães.", correct: false },
            { letter: "C", text: "A exaltação do sentimentalismo ingênuo dos folhetins de época.", correct: false },
            { letter: "D", text: "O abandono do realismo psicológico em prol de lendas do folclore amazônico.", correct: false }
          ],
          explanation: "Machado recusa a redenção mística e o final feliz, apresentando a tragédia como consequência direta da vileza e do egoísmo social."
        },
        {
          id: "vest_fs_2",
          examTag: "ENEM - Recursos Narrativos e Memória",
          question: "O recurso aos manuscritos autobiográficos deixados por Frei Simão na cela tem como efeito:",
          options: [
            { letter: "A", text: "Conferir autoridade testemunhal à dor do protagonista, revelando postumamente a verdade oculta sob as aparências do silêncio monástico.", correct: true },
            { letter: "B", text: "Comprovar que o frei não sabia escrever em língua portuguesa.", correct: false },
            { letter: "C", text: "Eximir os pais de Simão de qualquer responsabilidade moral sobre o destino dos jovens.", correct: false },
            { letter: "D", text: "Divertir os monges com histórias cômicas do carnaval fluminense.", correct: false }
          ],
          explanation: "Os manuscritos funcionam como documento de denúncia moral póstuma, desvendando o segredo que a sociedade fingia ignorar."
        },
        {
          id: "vest_fs_3",
          examTag: "UERJ - Sociologia das Emoções Oitocentistas",
          question: "A trajetória de Simão e Helena em 'Frei Simão' demonstra que, na ordem patriarcal do Segundo Reinado:",
          options: [
            { letter: "A", text: "A felicidade individual e o afeto sincero dos jovens eram sistematicamente sacrificados em nome de interesses de casta e alianças de prestígio.", correct: true },
            { letter: "B", text: "As leis imperiais protegiam irrestritamente a livre união de jovens órfãos com membros da elite.", correct: false },
            { letter: "C", text: "A autoridade dos pais cessava compulsoriamente aos doze anos de idade.", correct: false },
            { letter: "D", text: "O clero católico proibia qualquer casamento entre pessoas da mesma cidade.", correct: false }
          ],
          explanation: "O conto é uma das mais contundentes críticas machadianas à violência simbólica exercida pelas famílias de elite sobre a autonomia afetiva dos jovens."
        }
      ],

      get step2Puzzle() { return this.puzzlesPool[0]; },
      get step3Analysis() { return this.analysesPool[0]; },
      get step4Vestibular() { return this.vestibularPool[0]; }
    }
  ];

  // Integrated Boss Challenge Questions (Simulado Final)
  const BOSS_QUESTIONS = [
    {
      id: "bq1",
      storyRef: "Obra Geral",
      examTag: "FUVEST 2024 / Adaptada",
      question: "Sobre a coletânea *Contos Fluminenses* (1870), de Machado de Assis, considere as afirmativas:\n\nI. Marca o início da fase de maturidade realista pura de Machado de Assis, sem resquícios românticos.\nII. Retrata a sociedade carioca do Segundo Reinado, expondo a hipocrisia, o parasitismo e os interesses por trás dos afetos.\nIII. Apresenta narradores que dialogam com o leitor e desconstroem a figura do herói virtuoso.\n\nEstá(ão) correta(s):",
      options: [
        { letter: "A", text: "Apenas I.", correct: false },
        { letter: "B", text: "Apenas II e III.", correct: true },
        { letter: "C", text: "Apenas I e III.", correct: false },
        { letter: "D", text: "Todas as afirmativas.", correct: false }
      ],
      explanation: "A afirmativa I é incorreta pois a obra pertence à fase inicial de transição (1870), ainda mantendo molduras românticas que são criticadas por dentro."
    },
    {
      id: "bq2",
      storyRef: "Miss Dollar & A Mulher de Preto",
      examTag: "UNICAMP / Adaptada",
      question: "Em contos como 'Miss Dollar' e 'A Mulher de Preto', o objeto material ou o vestuário (a cadela, o vestido de luto) desempenha a função de:",
      options: [
        { letter: "A", text: "Mero adorno cênico sem interferência na psicologia das personagens.", correct: false },
        { letter: "B", text: "Catalisador das relações sociais, revelando segundas intenções e preconceitos da corte.", correct: true },
        { letter: "C", text: "Símbolo de protesto contra o governo imperial brasileiro.", correct: false },
        { letter: "D", text: "Prova material para investigações policiais de assassinatos reais.", correct: false }
      ],
      explanation: "Os elementos materiais em Machado concentram significados simbólicos que desnudam as intenções ocultas dos indivíduos."
    },
    {
      id: "bq3",
      storyRef: "Luís Soares & O Segredo de Augusta",
      examTag: "ENEM / Adaptada",
      question: "O conceito de 'máscara social' na prosa machadiana de *Contos Fluminenses* diz respeito:",
      options: [
        { letter: "A", text: "Ao uso obrigatório de disfarces nos bailes de carnaval do Rio de Janeiro.", correct: false },
        { letter: "B", text: "À necessidade dos indivíduos burgueses de parecerem virtuosos e prósperos, ocultando a ruína e o egoísmo.", correct: true },
        { letter: "C", text: "Ao teatro de marionetes popular das praças públicas cariocas.", correct: false },
        { letter: "D", text: "Às artes plásticas importadas da Europa no século XIX.", correct: false }
      ],
      explanation: "A máscara social é o artifício com o qual a elite carioca esconde suas misérias morais e econômicas para manter o status."
    },
    {
      id: "bq4",
      storyRef: "Linha Reta e Linha Curva & Confissões de uma Viúva Moça",
      examTag: "FUVEST / UNICAMP Adaptada",
      question: "Nos contos ambientados no cenário de veraneio de Petrópolis ('Linha Reta e Linha Curva' e 'Confissões de uma Viúva Moça'), a dinâmica das relações amorosas revela que:",
      options: [
        { letter: "A", text: "O isolamento da serra permitia aos jovens viver paixões puras e imunes à malícia da corte.", correct: false },
        { letter: "B", text: "A conquista amorosa funciona como jogo estratégico de vaidade e dissimulação, no qual a franqueza é punida e o fingimento é valorizado.", correct: true },
        { letter: "C", text: "As leis da corte proibiam qualquer tipo de galanteio fora dos limites do município neutro do Rio de Janeiro.", correct: false },
        { letter: "D", text: "As viúvas eram legalmente impedidas de receber visitas ou manter correspondências privadas.", correct: false }
      ],
      explanation: "Petrópolis serve como palco para o refinamento dos jogos de dissimulação, nos quais a vaidade e o cálculo regem os afetos da elite fluminense."
    },
    {
      id: "bq5",
      storyRef: "Frei Simão & O Segredo de Augusta",
      examTag: "ENEM / UERJ Adaptada",
      question: "Comparando os destinos de Simão ('Frei Simão') e de Adelaide ('O Segredo de Augusta'), constata-se uma denúncia contundente de Machado contra:",
      options: [
        { letter: "A", text: "O despotismo patriarcal que instrumentaliza e sacrifica a felicidade dos filhos para preservar o patrimônio ou o orgulho de classe.", correct: true },
        { letter: "B", text: "A falta de colégios públicos de ensino secundário na cidade do Rio de Janeiro.", correct: false },
        { letter: "C", text: "A recusa da juventude imperial em aprender idiomas estrangeiros como francês e inglês.", correct: false },
        { letter: "D", text: "A cobrança compulsória de impostos alfandegários sobre heranças familiares.", correct: false }
      ],
      explanation: "Tanto Simão quanto Adelaide têm suas vidas afetivas destruídas pela imposição tirânica de pais que colocam o dinheiro e as convenções acima da integridade humana."
    }
  ];

  // Achievements Database (7 Per-Story Perfect Badges + 1 Super Achievement)
  const ACHIEVEMENTS = [
    {
      id: "ach-miss-dollar",
      title: "Mestre de Miss Dollar",
      icon: "🐾",
      desc: "Desvendou 'Miss Dollar' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("miss-dollar")
    },
    {
      id: "ach-luiz-soares",
      title: "Desmascarador de Luís Soares",
      icon: "🎩",
      desc: "Desvendou 'Luís Soares' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("luiz-soares")
    },
    {
      id: "ach-mulher-de-preto",
      title: "Segredo de Magdalena",
      icon: "🎭",
      desc: "Desvendou 'A Mulher de Preto' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("mulher-de-preto")
    },
    {
      id: "ach-segredo-augusta",
      title: "Vaidade Desfeita",
      icon: "💎",
      desc: "Desvendou 'O Segredo de Augusta' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("segredo-augusta")
    },
    {
      id: "ach-confissoes-viuva",
      title: "Lucidez de Eugênia",
      icon: "✉️",
      desc: "Desvendou 'Confissões de uma Viúva Moça' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("confissoes-viuva")
    },
    {
      id: "ach-linha-reta-curva",
      title: "Estrategista Geométrico",
      icon: "📐",
      desc: "Desvendou 'Linha Reta e Linha Curva' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("linha-reta-curva")
    },
    {
      id: "ach-frei-simao",
      title: "Monge da Verdade",
      icon: "⛪",
      desc: "Desvendou 'Frei Simão' com 143 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("frei-simao")
    },
    {
      id: "ach-super-machadiano",
      title: "Lenda Machadiana de 1870",
      icon: "👑",
      desc: "SUPER CONQUISTA: Concluiu TODOS OS 7 CONTOS de forma impecável (143 XP em cada, atingindo 1000 XP e Nota 10,0 sem erros e sem dicas)!",
      isSuper: true,
      condition: (u) => u.perfectStories && u.perfectStories.length >= 7
    }
  ];

  // DOM Element Selectors
  const DOM = {
    // Nav Header
    playerBar: document.getElementById('playerBar'),
    headerPlayerName: document.getElementById('headerPlayerName'),
    headerPlayerClass: document.getElementById('headerPlayerClass'),
    headerPlayerXP: document.getElementById('headerPlayerXP'),
    headerBadgeCount: document.getElementById('headerBadgeCount'),
    btnRanking: document.getElementById('btnRanking'),
    btnConquistas: document.getElementById('btnConquistas'),
    btnRules: document.getElementById('btnRules'),
    btnProfessor: document.getElementById('btnProfessor'),
    btnSwitchUser: document.getElementById('btnSwitchUser'),

    // Main Sections
    storyGrid: document.getElementById('storyGrid'),
    overallProgressBar: document.getElementById('overallProgressBar'),
    overallPercentText: document.getElementById('overallPercentText'),
    btnStartBoss: document.getElementById('btnStartBoss'),

    // Rules & Scoring Modal
    modalRules: document.getElementById('modalRules'),
    rulesBackdrop: document.getElementById('rulesBackdrop'),
    btnCloseRules: document.getElementById('btnCloseRules'),

    // Login Modal
    modalLogin: document.getElementById('modalLogin'),
    formLogin: document.getElementById('formLogin'),
    inputStudentName: document.getElementById('inputStudentName'),
    inputStudentClass: document.getElementById('inputStudentClass'),

    // Game Modal
    modalGame: document.getElementById('modalGame'),
    btnCloseGame: document.getElementById('btnCloseGame'),
    gameStoryNumber: document.getElementById('gameStoryNumber'),
    gameStoryTitle: document.getElementById('gameStoryTitle'),
    gameStoryLocation: document.getElementById('gameStoryLocation'),
    gameBody: document.getElementById('gameBody'),
    btnPrevGame: document.getElementById('btnPrevGame'),
    btnNextGame: document.getElementById('btnNextGame'),
    btnHintGame: document.getElementById('btnHintGame'),
    gameStepper: document.getElementById('gameStepper'),

    // Ranking Modal
    modalRanking: document.getElementById('modalRanking'),
    btnCloseRanking: document.getElementById('btnCloseRanking'),
    selectFilterClass: document.getElementById('selectFilterClass'),
    podiumContainer: document.getElementById('podiumContainer'),
    rankingTableBody: document.getElementById('rankingTableBody'),

    // Conquistas Modal
    modalConquistas: document.getElementById('modalConquistas'),
    btnCloseConquistas: document.getElementById('btnCloseConquistas'),
    achievementsGrid: document.getElementById('achievementsGrid'),

    // History Modal
    modalHistory: document.getElementById('modalHistory'),
    btnCloseHistory: document.getElementById('btnCloseHistory'),
    historyStudentName: document.getElementById('historyStudentName'),
    historyTotalXP: document.getElementById('historyTotalXP'),
    historyPerfectCount: document.getElementById('historyPerfectCount'),
    historyTimeline: document.getElementById('historyTimeline'),

    // Teacher Modal
    modalProfessor: document.getElementById('modalProfessor'),
    btnCloseProfessor: document.getElementById('btnCloseProfessor'),
    profLockScreen: document.getElementById('profLockScreen'),
    profDashboard: document.getElementById('profDashboard'),
    inputProfPass: document.getElementById('inputProfPass'),
    btnUnlockProf: document.getElementById('btnUnlockProf'),
    btnOpenGoogleSheets: document.getElementById('btnOpenGoogleSheets'),
    btnSyncSheetsNow: document.getElementById('btnSyncSheetsNow'),
    btnExportCSV: document.getElementById('btnExportCSV'),
    btnPrintReport: document.getElementById('btnPrintReport'),
    profTableBody: document.getElementById('profTableBody'),
    profMetricTotalStudents: document.getElementById('profMetricTotalStudents'),
    profMetricAvgScore: document.getElementById('profMetricAvgScore'),
    profMetricHardestStory: document.getElementById('profMetricHardestStory'),
    profMetricCompletion: document.getElementById('profMetricCompletion'),
    formAddClass: document.getElementById('formAddClass'),
    inputNewClassName: document.getElementById('inputNewClassName'),
    classesTagsList: document.getElementById('classesTagsList'),

    // Student Details Modal
    modalStudentDetails: document.getElementById('modalStudentDetails'),
    btnCloseStudentDetails: document.getElementById('btnCloseStudentDetails'),
    btnCloseStudentDetailsBtn: document.getElementById('btnCloseStudentDetailsBtn'),
    detailStudentName: document.getElementById('detailStudentName'),
    detailStudentClass: document.getElementById('detailStudentClass'),
    detailStudentXP: document.getElementById('detailStudentXP'),
    detailStudentGrade: document.getElementById('detailStudentGrade'),
    detailStudentStoriesCount: document.getElementById('detailStudentStoriesCount'),
    detailStudentBossStatus: document.getElementById('detailStudentBossStatus'),
    detailStudentStoriesList: document.getElementById('detailStudentStoriesList'),

    // Apps Script Modal
    modalAppsScriptCode: document.getElementById('modalAppsScriptCode'),
    btnOpenAppsScriptModal: document.getElementById('btnOpenAppsScriptModal'),
    btnCloseAppsScriptModal: document.getElementById('btnCloseAppsScriptModal'),
    appsScriptBackdrop: document.getElementById('appsScriptBackdrop'),
    btnCopyAppsScriptCode: document.getElementById('btnCopyAppsScriptCode'),
    codeAppsScriptBlock: document.getElementById('codeAppsScriptBlock'),

    // Confirmation Modal
    modalConfirm: document.getElementById('modalConfirm'),
    confirmTitle: document.getElementById('confirmTitle'),
    confirmMessage: document.getElementById('confirmMessage'),
    btnConfirmCancel: document.getElementById('btnConfirmCancel'),
    btnConfirmOk: document.getElementById('btnConfirmOk'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1R4f6Oottbca3KVYBnS7h6V1S1ZUvphUCFM142Hgzb5w/edit?gid=0#gid=0";
  const DEFAULT_GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbweuKS0Pgxp_kju4rPyA0GgBs4gaS7yoknqUTWJvOeB0sbKJcuW2chlC0APY4cn4N4W/exec";

  let confirmCallback = null;

  function customConfirm(title, message, onConfirm) {
    if (!DOM.modalConfirm) {
      if (window.confirm(message)) onConfirm();
      return;
    }
    DOM.confirmTitle.textContent = title || "Confirmação";
    DOM.confirmMessage.textContent = message;
    confirmCallback = onConfirm;
    openModal(DOM.modalConfirm);
  }

  /* ==========================================================================
     INITIALIZATION & STORAGE
     ========================================================================== */
  function init() {
    loadClassesFromStorage();
    loadStudentsFromStorage();
    setupEventListeners();
    // Busca turmas do servidor central (Apps Script)
    fetchClassesFromGoogleSheets();
    // Busca ranking central
    fetchRankingFromGoogleSheets();

    if (STATE.currentUser && STATE.currentUser.name) {
      closeModal(DOM.modalLogin);
      onUserLoggedIn();
    } else {
      STATE.currentUser = null;
      openModal(DOM.modalLogin);
    }
  }

  function extractArrayData(payload) {
    if (!payload) return null;
    if (Array.isArray(payload)) return payload;
    if (payload.data) {
      if (Array.isArray(payload.data)) return payload.data;
      if (payload.data.data && Array.isArray(payload.data.data)) return payload.data.data;
    }
    return null;
  }

  function loadClassesFromStorage() {
    try {
      const stored = localStorage.getItem('CF_CLASSES_LIST');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          STATE.classesList = parsed.filter(c => typeof c === 'string' && c.trim() !== '');
        }
      }
    } catch (e) {
      console.log('Error loading local classes:', e);
    }
    updateClassDropdowns();
  }

  /* ------------------------------------------------------------------
     CLASSES — Leitura e escrita central via Google Apps Script e LocalStorage
     ------------------------------------------------------------------ */
  function fetchClassesFromGoogleSheets() {
    const scriptUrl = getGoogleSheetsURL();
    if (!scriptUrl) { updateClassDropdowns(); return Promise.resolve(STATE.classesList); }

    // 1. Tenta primeiro pelo endpoint proxy do servidor
    return fetch('/api/fetch-sheets?scriptUrl=' + encodeURIComponent(scriptUrl) + '&action=getClasses')
      .then(res => res.json())
      .then(resData => {
        const arr = extractArrayData(resData);
        if (arr && arr.length > 0) {
          STATE.classesList = arr.map(c => String(c).trim()).filter(Boolean);
          localStorage.setItem('CF_CLASSES_LIST', JSON.stringify(STATE.classesList));
          updateClassDropdowns();
        }
        return STATE.classesList;
      })
      .catch(() => {
        // 2. Fallback direto
        return fetch(scriptUrl + '?action=getClasses')
          .then(res => res.json())
          .then(resData => {
            const arr = extractArrayData(resData);
            if (arr && arr.length > 0) {
              STATE.classesList = arr.map(c => String(c).trim()).filter(Boolean);
              localStorage.setItem('CF_CLASSES_LIST', JSON.stringify(STATE.classesList));
              updateClassDropdowns();
            }
            return STATE.classesList;
          })
          .catch(err => {
            console.log('Notice fetching classes from sheet:', err);
            updateClassDropdowns();
            return STATE.classesList;
          });
      });
  }

  function syncClassesToGoogleSheets() {
    const scriptUrl = getGoogleSheetsURL();
    if (!scriptUrl) return Promise.resolve(false);

    const payload = { action: 'saveClasses', classes: STATE.classesList };

    // 1. Tenta pelo proxy do servidor
    return fetch('/api/sync-sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scriptUrl, payload })
    })
    .then(res => res.json())
    .then(resData => {
      return resData.success || (resData.data && resData.data.success);
    })
    .catch(() => {
      // 2. Fallback direto
      return fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
      .then(() => true)
      .catch(err => {
        console.log('Classes sync notice:', err);
        return false;
      });
    });
  }

  function updateClassDropdowns() {
    // 1. Student Login Select
    if (DOM.inputStudentClass) {
      const currentSelected = DOM.inputStudentClass.value;
      DOM.inputStudentClass.innerHTML = `<option value="" disabled ${!currentSelected ? 'selected' : ''}>Selecione a sua turma...</option>`;
      STATE.classesList.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls;
        opt.textContent = cls;
        if (cls === currentSelected) opt.selected = true;
        DOM.inputStudentClass.appendChild(opt);
      });
    }

    // 2. Ranking Filter Select
    if (DOM.selectFilterClass) {
      const currentFilter = DOM.selectFilterClass.value || 'ALL';
      DOM.selectFilterClass.innerHTML = `<option value="ALL">Todas as Turmas</option>`;
      STATE.classesList.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls;
        opt.textContent = cls;
        if (cls === currentFilter) opt.selected = true;
        DOM.selectFilterClass.appendChild(opt);
      });
    }

    // 3. Teacher Dashboard Class Tags List
    if (DOM.classesTagsList) {
      DOM.classesTagsList.innerHTML = '';
      STATE.classesList.forEach(cls => {
        const tag = document.createElement('div');
        tag.className = 'class-tag-item';
        tag.innerHTML = `
          <span>🏫 ${cls}</span>
          <button type="button" class="class-tag-delete" onclick="window.CF_GAME.deleteClass('${cls}')" title="Excluir turma ${cls}">&times;</button>
        `;
        DOM.classesTagsList.appendChild(tag);
      });
    }
  }

  function handleAddClass(e) {
    e.preventDefault();
    const name = DOM.inputNewClassName.value.trim();
    if (!name) return;

    if (STATE.classesList.some(c => c.toLowerCase() === name.toLowerCase())) {
      showToast(`A turma "${name}" já existe!`, "error");
      return;
    }

    STATE.classesList.push(name);
    localStorage.setItem('CF_CLASSES_LIST', JSON.stringify(STATE.classesList));
    updateClassDropdowns();
    DOM.inputNewClassName.value = '';
    showToast(`Salvando turma "${name}" na Planilha Google...`);

    syncClassesToGoogleSheets().then(ok => {
      if (ok) {
        showToast(`✅ Turma "${name}" salva na Planilha Google com sucesso!`, "success");
      }
    });
  }

  function deleteClass(className) {
    if (STATE.classesList.length <= 1) {
      showToast("É necessário manter ao menos uma turma cadastrada!", "error");
      return;
    }

    customConfirm(
      "Excluir Turma",
      `Tem certeza que deseja excluir a turma "${className}"? Os alunos cadastrados nela continuarão com seu histórico preservado.`,
      () => {
        STATE.classesList = STATE.classesList.filter(c => c !== className);
        localStorage.setItem('CF_CLASSES_LIST', JSON.stringify(STATE.classesList));
        updateClassDropdowns();
        showToast(`Atualizando turmas na Planilha Google...`);

        syncClassesToGoogleSheets().then(ok => {
          if (ok) {
            showToast(`✅ Turma "${className}" excluída da Planilha Google!`, "success");
          }
        });
      }
    );
  }

  /* ==========================================================================
     PEDAGOGICAL EVALUATION & DATA NORMALIZATION HELPERS
     ========================================================================== */
  function getStudentCompletedCount(student) {
    if (!student) return 0;
    if (Array.isArray(student.completedStories) && student.completedStories.length > 0) {
      return Math.min(STORIES.length, student.completedStories.length);
    }
    if (typeof student.completedStoriesCount === 'number' && student.completedStoriesCount > 0 && student.completedStoriesCount <= STORIES.length) {
      return Math.min(STORIES.length, student.completedStoriesCount);
    }
    return 0;
  }

  function getStudentApprovalStatus(student) {
    if (!student) return { text: 'Pendente', shortText: 'Pendente', approved: false, color: '#ffc107', badgeClass: 'badge-pending' };
    const gradeNum = parseFloat(calculateStudentGrade(student));
    const hasBossScore = typeof student.bossScore === 'number';
    const bossScore = hasBossScore ? student.bossScore : 0;
    const didAttemptBoss = hasBossScore || student.bossPassed;

    if (didAttemptBoss) {
      if (gradeNum >= 6.0 && bossScore >= 3) {
        return { 
          text: `✓ Aprovado (${bossScore}/5)`, 
          shortText: 'Aprovado',
          approved: true, 
          color: '#28a745', 
          badgeClass: 'badge-success' 
        };
      }
      return { 
        text: `Em Recuperação (${bossScore}/5)`, 
        shortText: 'Em Recuperação',
        approved: false, 
        color: '#dc3545', 
        badgeClass: 'badge-warning' 
      };
    }
    return { 
      text: 'Pendente', 
      shortText: 'Pendente',
      approved: false, 
      color: '#ffc107', 
      badgeClass: 'badge-pending' 
    };
  }

  /* ==========================================================================
     CÁLCULO OFICIAL DE NOTA (0.0 a 10.0)
     Regra Pedagógica Fixada:
     - 1.000 XP Máximo = Nota 10,0 (Nota = XP ÷ 100).
     - 7 Contos chegam a 143 XP cada se concluídos perfeitamente (7 x 143 = 1.001 XP, arredondado para 1.000 XP = Nota 10,0).
     - Pontuação em 3 etapas por conto: 2. O Enigma (até 71 XP; dica: -30, erro: -10, piso mínimo: 21 XP), 3. Análise Oculta (36 XP; se errar cai pela metade para 18 XP) e 4. Vestibular (36 XP; se errar cai pela metade para 18 XP).
     - Simulado Final (Boss): até 100 XP (5 questões × 20 XP cada = +0,2 por questão), funcionando como complemento pedagógico de recuperação para quem perdeu pontos, sem ultrapassar o teto de 1.000 XP.
     ========================================================================== */
  function calculateStudentGrade(student) {
    if (!student) return '0.0';
    const xp = Number(student.xp) || 0;
    if (xp <= 0) return '0.0';

    // Regra direta: 1.000 XP = 10.0
    const rawGrade = xp / 100;
    const clamped = Math.min(10.0, Math.max(0.0, rawGrade));
    return clamped.toFixed(1);
  }

  function normalizeStudentData(student) {
    if (!student || typeof student !== 'object') return student;
    if (!Array.isArray(student.completedStories)) {
      student.completedStories = [];
    }
    if (!Array.isArray(student.perfectStories)) {
      student.perfectStories = [];
    }
    if (!Array.isArray(student.xpHistory)) {
      student.xpHistory = [];
    }
    if (!student.storyScores || typeof student.storyScores !== 'object') {
      student.storyScores = {};
    }
    student.xp = Number(student.xp) || 0;

    // Se completedStories estiver vazio mas houver contos declarados no objeto
    if (student.completedStories.length === 0 && typeof student.completedStoriesCount === 'number' && student.completedStoriesCount > 0) {
      const allIds = STORIES.map(s => s.id);
      student.completedStories = allIds.slice(0, Math.min(STORIES.length, student.completedStoriesCount));
    }
    student.completedStoriesCount = student.completedStories.length;

    // Boss status: NÃO forçar aprovação arbitrária!
    if (typeof student.bossScore === 'number') {
      student.bossPassed = student.bossScore >= 3;
    } else if (student.bossPassed === undefined) {
      student.bossPassed = false;
    }

    student.grade = calculateStudentGrade(student);
    return student;
  }

  function loadStudentsFromStorage() {
    try {
      const data = localStorage.getItem('CF_STUDENTS_LIST');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          STATE.studentsList = parsed
            .filter(s => s && typeof s === 'object' && s.name)
            .map(normalizeStudentData);
        }
      }
      const activeId = localStorage.getItem('CF_ACTIVE_STUDENT_ID');
      if (activeId && STATE.studentsList.length > 0) {
        const found = STATE.studentsList.find(s => s && s.id === activeId);
        if (found && found.name) {
          STATE.currentUser = normalizeStudentData(found);
        } else {
          STATE.currentUser = null;
        }
      } else {
        STATE.currentUser = null;
      }
    } catch (e) {
      console.error("Storage error:", e);
      STATE.studentsList = [];
      STATE.currentUser = null;
    }
  }

  function getGoogleSheetsURL() {
    return DEFAULT_GOOGLE_SHEETS_URL;
  }

  function syncStudentToGoogleSheets(student) {
    if (!student || !student.name) return Promise.resolve(false);
    const scriptUrl = getGoogleSheetsURL();
    if (!scriptUrl) return Promise.resolve(false);

    normalizeStudentData(student);
    const completedCount = getStudentCompletedCount(student);
    const notaCalculada = calculateStudentGrade(student);
    const approvalStatus = getStudentApprovalStatus(student);

    // Compatibilidade com a versão legada do Apps Script que faz:
    // var grade = ((data.completedStories.length / 7) * 10).toFixed(1);
    // Para que o script legado NUNCA MAIS mostre "151.4" e grave uma nota proporcional correta no Sheets:
    const notaNum = parseFloat(notaCalculada) || 0;
    const legacyEquivCount = Math.min(STORIES.length, Math.max(0, Math.round((notaNum / 10) * STORIES.length)));
    const legacyStoriesArray = [];
    for (let i = 0; i < legacyEquivCount; i++) {
      legacyStoriesArray.push(STORIES[i] ? STORIES[i].id : `c${i+1}`);
    }

    const payload = {
      action: 'saveStudent',
      id: student.id,
      name: student.name,
      studentClass: student.studentClass || 'Sem Turma',
      xp: student.xp || 0,
      grade: notaCalculada,
      score: notaCalculada,
      score10: notaCalculada,
      nota: notaCalculada,
      completedStoriesCount: completedCount,
      completedStories: legacyStoriesArray,
      realCompletedStories: student.completedStories || [],
      bossPassed: approvalStatus.shortText,
      bossStatus: approvalStatus.text,
      bossScore: student.bossScore || 0,
      timestamp: new Date().toLocaleString('pt-BR')
    };

    // 1. Tenta envio através do servidor proxy
    return fetch('/api/sync-sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scriptUrl, payload })
    })
    .then(res => res.json())
    .then(data => {
      return data.success;
    })
    .catch(() => {
      // 2. Fallback direto para o Google Apps Script
      return fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
      .then(() => true)
      .catch(err => {
        console.log('Offline/Sync notice:', err);
        return false;
      });
    });
  }

  function fetchRankingFromGoogleSheets() {
    const scriptUrl = getGoogleSheetsURL();
    if (!scriptUrl) return Promise.resolve();

    // 1. Tenta primeiro via proxy
    return fetch('/api/fetch-sheets?scriptUrl=' + encodeURIComponent(scriptUrl) + '&action=getRanking')
      .then(res => res.json())
      .then(resData => {
        const arr = extractArrayData(resData);
        if (arr && arr.length > 0) {
          applyRemoteRankingData(arr);
        }
      })
      .catch(() => {
        // 2. Fallback direto
        return fetch(scriptUrl + '?action=getRanking')
          .then(res => res.json())
          .then(resData => {
            const arr = extractArrayData(resData);
            if (arr && arr.length > 0) {
              applyRemoteRankingData(arr);
            }
          })
          .catch(err => console.log('Notice fetching sheets ranking:', err));
      });
  }

  function applyRemoteRankingData(data) {
    if (!Array.isArray(data)) return;
    data.forEach(remoteStd => {
      if (!remoteStd || !remoteStd.name) return;
      const normalizedRemote = normalizeStudentData({ ...remoteStd });
      const idx = STATE.studentsList.findIndex(s => s && (s.id === normalizedRemote.id || (s.name && s.name.toLowerCase() === normalizedRemote.name.toLowerCase() && s.studentClass === normalizedRemote.studentClass)));
      if (idx !== -1) {
        if ((normalizedRemote.xp || 0) >= (STATE.studentsList[idx].xp || 0)) {
          STATE.studentsList[idx] = { 
            ...STATE.studentsList[idx], 
            ...normalizedRemote,
            completedStories: normalizedRemote.completedStories.length > 0 ? normalizedRemote.completedStories : (STATE.studentsList[idx].completedStories || [])
          };
        }
      } else {
        STATE.studentsList.push(normalizedRemote);
      }
    });
    saveToStorage(false); // não re-sincroniza em loop
    renderProfAnalytics();
    renderRankingModal();
  }

  function saveToStorage(shouldSync = true) {
    try {
      if (STATE.currentUser && STATE.currentUser.name) {
        normalizeStudentData(STATE.currentUser);
        const idx = STATE.studentsList.findIndex(s => s && s.id === STATE.currentUser.id);
        if (idx !== -1) {
          STATE.studentsList[idx] = STATE.currentUser;
        } else {
          STATE.studentsList.push(STATE.currentUser);
        }
        localStorage.setItem('CF_ACTIVE_STUDENT_ID', STATE.currentUser.id);
        if (shouldSync) {
          syncStudentToGoogleSheets(STATE.currentUser);
        }
      }
      localStorage.setItem('CF_STUDENTS_LIST', JSON.stringify(STATE.studentsList));
    } catch (e) {
      console.error("Error saving data:", e);
    }
  }

  /* ==========================================================================
     LOGIN & USER MANAGEMENT
     ========================================================================== */
  function handleLogin(e) {
    e.preventDefault();
    const name = DOM.inputStudentName.value.trim();
    const studentClass = DOM.inputStudentClass.value;

    if (!name || !studentClass) {
      showToast("Por favor, preencha nome e turma!", "error");
      return;
    }

    // Check if student exists or create new
    const existing = STATE.studentsList.find(
      s => s && s.name && s.name.toLowerCase() === name.toLowerCase() && s.studentClass === studentClass
    );

    if (existing) {
      STATE.currentUser = existing;
      showToast(`Bem-vindo(a) de volta, ${name}!`);
    } else {
      const newUser = {
        id: 'std_' + Date.now(),
        name: name,
        studentClass: studentClass,
        xp: 0,
        completedStories: [],
        perfectStories: [],
        storyScores: {},
        achievements: [],
        xpHistory: [],
        answersHistory: {},
        createdAt: new Date().toLocaleDateString('pt-BR'),
        noHintStreak: 0,
        bossPassed: false
      };
      STATE.studentsList.push(newUser);
      STATE.currentUser = newUser;
      showToast(`Estudante ${name} registrado com sucesso!`);
    }

    saveToStorage();
    closeModal(DOM.modalLogin);
    onUserLoggedIn();
  }

  function onUserLoggedIn() {
    if (!STATE.currentUser || !STATE.currentUser.name) {
      DOM.playerBar.classList.add('hidden');
      DOM.btnSwitchUser.classList.add('hidden');
      renderStoryGrid();
      return;
    }

    normalizeStudentData(STATE.currentUser);

    DOM.playerBar.classList.remove('hidden');
    DOM.btnSwitchUser.classList.remove('hidden');
    
    // Mostra estritamente apenas o primeiro nome do jogador atual
    const fullName = (STATE.currentUser.name || '').trim();
    const firstName = fullName.split(' ')[0] || 'Aluno';
    DOM.headerPlayerName.textContent = firstName;
    DOM.headerPlayerName.title = `Estudante: ${fullName} (${STATE.currentUser.studentClass || 'Sem Turma'})`;
    DOM.headerPlayerClass.textContent = STATE.currentUser.studentClass || '';
    DOM.headerPlayerXP.textContent = `${STATE.currentUser.xp || 0} XP`;

    checkAchievements();
    updateOverallProgress();
    renderStoryGrid();
  }

  function switchUser() {
    STATE.currentUser = null;
    localStorage.removeItem('CF_ACTIVE_STUDENT_ID');
    DOM.playerBar.classList.add('hidden');
    DOM.btnSwitchUser.classList.add('hidden');
    DOM.inputStudentName.value = '';
    fetchClassesFromGoogleSheets();
    openModal(DOM.modalLogin);
  }

  /* ==========================================================================
     STORY MAP & GRID RENDER
     ========================================================================== */
  function renderStoryGrid() {
    DOM.storyGrid.innerHTML = '';

    STORIES.forEach((story, idx) => {
      const isCompleted = STATE.currentUser ? STATE.currentUser.completedStories.includes(story.id) : false;
      const isPerfect = isCompleted && STATE.currentUser && Array.isArray(STATE.currentUser.perfectStories) && STATE.currentUser.perfectStories.includes(story.id);
      const earnedScore = STATE.currentUser && STATE.currentUser.storyScores ? STATE.currentUser.storyScores[story.id] : null;
      
      let xpBadgeHtml = `<span class="story-xp-info">⭐ Até 143 XP</span>`;
      if (isCompleted) {
        if (isPerfect) {
          xpBadgeHtml = `<span class="story-xp-info" style="color: #ffd700; font-weight: 700;">⭐ +143 XP (Impecável)</span>`;
        } else if (earnedScore) {
          xpBadgeHtml = `<span class="story-xp-info" style="color: var(--primary-gold);">✓ +${earnedScore} XP</span>`;
        } else {
          xpBadgeHtml = `<span class="story-xp-info" style="color: var(--primary-gold);">✓ Concluído</span>`;
        }
      }

      const card = document.createElement('div');
      card.className = `story-card ${isCompleted ? 'story-card-completed' : ''}`;

      card.innerHTML = `
        <div class="story-card-img-wrapper">
          <img src="${story.image}" alt="${story.title}" class="story-card-img" onerror="this.src='assets/cover.jpg'">
          <span class="story-num-badge">${story.numberText}</span>
          <span class="story-status-badge ${isCompleted ? (isPerfect ? 'status-perfect' : 'status-completed') : 'status-pending'}">
            ${isCompleted ? (isPerfect ? '⭐ Impecável' : '✓ Concluído') : '📍 Disponível'}
          </span>
        </div>
        <div class="story-card-body">
          <span class="story-card-location">${story.location}</span>
          <h3 class="story-card-title">${story.title}</h3>
          <p class="story-card-desc">${story.summary}</p>
          <div class="story-card-tags">
            ${story.tags.map(t => `<span class="story-tag-pill">${t}</span>`).join('')}
          </div>
          <div class="story-card-footer">
            ${xpBadgeHtml}
            <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="window.CF_GAME.openStory(${idx})">
              ${isCompleted ? 'Revisar Enigma' : 'Investigar Conto'}
            </button>
          </div>
        </div>
      `;

      DOM.storyGrid.appendChild(card);
    });
  }

  function updateOverallProgress() {
    if (!STATE.currentUser) {
      DOM.overallProgressBar.style.width = '0%';
      DOM.overallPercentText.textContent = `0% (0/${STORIES.length} contos)`;
      return;
    }
    normalizeStudentData(STATE.currentUser);
    const completedCount = getStudentCompletedCount(STATE.currentUser);
    const total = STORIES.length;
    const percent = Math.round((completedCount / total) * 100);

    DOM.overallProgressBar.style.width = `${percent}%`;
    DOM.overallPercentText.textContent = `${percent}% (${completedCount}/${total} contos)`;
  }

  // Fisher-Yates Shuffle Helper
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ==========================================================================
     GAMEPLAY ENGINE & MODAL PLAYER
     ========================================================================== */
  function openStory(index) {
    if (!STATE.currentUser) {
      openModal(DOM.modalLogin);
      return;
    }
    STATE.isBossMode = false;
    STATE.currentStoryIndex = index;
    STATE.currentStep = 1;
    STATE.usedHintInCurrentStory = false;
    STATE.madeErrorInCurrentStory = false;
    STATE.step2Passed = false;
    STATE.step3Passed = false;
    STATE.step4Passed = false;

    // Pontuação Granular Pedagógica (Total máx: 143 XP)
    // 2. O Enigma: Vale até 71 XP (dica: -30, erro: -10, piso mínimo: 21 XP)
    // 3. Análise Oculta: Vale 36 XP (se errar: cai para 18 XP)
    // 4. Vestibular: Vale 36 XP (se errar: cai para 18 XP)
    STATE.step2XP = 71;
    STATE.step2HintUsed = false;
    STATE.step2ErrorCount = 0;
    STATE.step3XP = 36;
    STATE.step3MadeError = false;
    STATE.step4XP = 36;
    STATE.step4MadeError = false;

    const story = STORIES[index];
    DOM.gameStoryNumber.textContent = story.numberText;
    DOM.gameStoryTitle.textContent = story.title;
    DOM.gameStoryLocation.textContent = story.location;

    // 1. Dynamic selection from Pools (Random variant for replayability)
    const puzzlePool = story.puzzlesPool && story.puzzlesPool.length ? story.puzzlesPool : [story.step2Puzzle];
    const selectedPuzzleIdx = Math.floor(Math.random() * puzzlePool.length);
    const activePuzzleData = puzzlePool[selectedPuzzleIdx];

    const analysisPool = story.analysesPool && story.analysesPool.length ? story.analysesPool : [story.step3Analysis];
    const selectedAnalysisIdx = Math.floor(Math.random() * analysisPool.length);
    const activeAnalysisData = analysisPool[selectedAnalysisIdx];

    const vestPool = story.vestibularPool && story.vestibularPool.length ? story.vestibularPool : [story.step4Vestibular];
    const selectedVestIdx = Math.floor(Math.random() * vestPool.length);
    const activeVestData = vestPool[selectedVestIdx];

    STATE.activeStoryChallenge = {
      puzzle: activePuzzleData,
      puzzleIndex: selectedPuzzleIdx + 1,
      puzzleTotal: puzzlePool.length,
      analysis: activeAnalysisData,
      analysisIndex: selectedAnalysisIdx + 1,
      analysisTotal: analysisPool.length,
      vestibular: activeVestData,
      vestibularIndex: selectedVestIdx + 1,
      vestibularTotal: vestPool.length
    };

    // 2. Randomize Puzzle Fragments (Ensure it doesn't start already correctly ordered)
    let shuffledPuzzle = shuffleArray(activePuzzleData.fragments);
    const isAlreadyCorrect = shuffledPuzzle.every((f, idx) => f.id === activePuzzleData.correctOrder[idx]);
    if (isAlreadyCorrect && shuffledPuzzle.length > 1) {
      [shuffledPuzzle[0], shuffledPuzzle[1]] = [shuffledPuzzle[1], shuffledPuzzle[0]];
    }
    STATE.activePuzzleOrder = shuffledPuzzle;

    // 3. Randomize Step 3 Analysis Options and re-assign A, B, C, D letters dynamically
    const shuffledStep3 = shuffleArray(activeAnalysisData.options);
    const letters = ["A", "B", "C", "D"];
    STATE.activeStep3Options = shuffledStep3.map((opt, i) => ({
      ...opt,
      letter: letters[i]
    }));

    // 4. Randomize Step 4 Vestibular Options and re-assign A, B, C, D letters dynamically
    const shuffledStep4 = shuffleArray(activeVestData.options);
    STATE.activeStep4Options = shuffledStep4.map((opt, i) => ({
      ...opt,
      letter: letters[i]
    }));

    renderGameStep();
    openModal(DOM.modalGame);
  }

  function renderGameStep() {
    updateStepperPills();

    const story = STORIES[STATE.currentStoryIndex];
    DOM.gameBody.innerHTML = '';
    DOM.btnPrevGame.classList.add('hidden'); // Disables returning to previous steps

    // Step 1: Contexto Histórico
    if (STATE.currentStep === 1) {
      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <div class="slide-hero">
            <img src="${story.image}" class="slide-img" alt="${story.title}" onerror="this.src='assets/cover.jpg'">
            <div class="slide-hero-text">
              <h3>${story.step1Context.title}</h3>
              <p>${story.step1Context.text}</p>
            </div>
          </div>
          <div class="parchment-box">
            ${story.step1Context.quote}
          </div>
        </div>
      `;
      DOM.btnNextGame.textContent = 'Iniciar Enigma →';
      DOM.btnHintGame.classList.add('hidden');
    }
    
    // Step 2: Puzzle de Sequência Lógica
    else if (STATE.currentStep === 2) {
      DOM.btnHintGame.classList.remove('hidden');
      DOM.btnHintGame.textContent = STATE.step2HintUsed ? '💡 Dica Revelada (-30 XP)' : '💡 Pedir Ajuda / Dica (-30 XP)';
      DOM.btnNextGame.textContent = STATE.step2Passed ? 'Ir para Análise Oculta →' : 'Verificar Sequência →';

      const activePuzzle = STATE.activeStoryChallenge ? STATE.activeStoryChallenge.puzzle : story.step2Puzzle;

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <p class="puzzle-instruction">
            🧩 ${activePuzzle.instruction}
            <span id="liveStep2XP" style="display:inline-block; margin-left:8px; padding:2px 10px; border-radius:12px; background:rgba(212,175,55,0.15); border:1px solid var(--border-gold); font-size:0.85rem; color:var(--primary-gold); font-weight:700;">
              Etapa: ${STATE.step2XP} XP (máx. 71)
            </span>
          </p>
          <div class="puzzle-sequence-box" id="puzzleContainer">
            ${STATE.activePuzzleOrder.map((frag, idx) => `
              <div class="puzzle-slot-item" data-slot="${idx}" id="puzzleSlot_${idx}">
                <span class="slot-num-badge">${idx + 1}º</span>
                <div class="puzzle-fragment-item ${STATE.step2Passed ? 'puzzle-fragment-correct' : ''}" data-id="${frag.id}">
                  <span class="fragment-text">${frag.text}</span>
                  <div class="fragment-controls">
                    <button class="btn-move" onclick="window.CF_GAME.moveFragment(${idx}, -1)" ${idx === 0 || STATE.step2Passed ? 'disabled' : ''}>▲</button>
                    <button class="btn-move" onclick="window.CF_GAME.moveFragment(${idx}, 1)" ${idx === STATE.activePuzzleOrder.length - 1 || STATE.step2Passed ? 'disabled' : ''}>▼</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div id="step2Feedback" class="feedback-box ${STATE.step2Passed ? 'feedback-correct' : 'hidden'}">
            ${STATE.step2Passed ? `
              <div class="feedback-title">✓ Sequência Cronológica Decifrada! (+${STATE.step2XP} XP garantidos)</div>
              <p>Excelente dedução! A linha temporal dos acontecimentos foi reconstituída com fidelidade à narrativa machadiana.</p>
            ` : ''}
          </div>
        </div>
      `;
    }

    // Step 3: Análise Psicológica & Máscara Social
    else if (STATE.currentStep === 3) {
      DOM.btnHintGame.classList.add('hidden');
      DOM.btnNextGame.textContent = 'Ir para Vestibular →';

      const activeAnalysis = STATE.activeStoryChallenge ? STATE.activeStoryChallenge.analysis : story.step3Analysis;
      const optionsToRender = STATE.activeStep3Options || activeAnalysis.options;

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <h3>🎭 ${activeAnalysis.title}</h3>
          <p class="puzzle-instruction">
            ${activeAnalysis.question}
            <span id="liveStep3XP" style="display:inline-block; margin-left:8px; padding:2px 10px; border-radius:12px; background:rgba(40,167,69,0.15); border:1px solid rgba(40,167,69,0.4); font-size:0.85rem; color:#28a745; font-weight:700;">
              Vale ${STATE.step3XP} XP ${STATE.step3MadeError ? '(reduzido pela metade)' : ''}
            </span>
          </p>

          <div class="quiz-options" id="step3Options">
            ${optionsToRender.map(opt => `
              <div class="quiz-option-card" onclick="window.CF_GAME.selectQuizOption('step3', '${opt.letter}')" data-letter="${opt.letter}">
                <span class="option-letter">${opt.letter}</span>
                <span class="option-text">${opt.text}</span>
              </div>
            `).join('')}
          </div>
          <div id="step3Feedback" class="feedback-box hidden"></div>
        </div>
      `;
    }

    // Step 4: Simulado Estilo Vestibular
    else if (STATE.currentStep === 4) {
      DOM.btnHintGame.classList.add('hidden');
      DOM.btnNextGame.textContent = 'Concluir Investigação ✨';

      const activeVest = STATE.activeStoryChallenge ? STATE.activeStoryChallenge.vestibular : story.step4Vestibular;
      const optionsToRender = STATE.activeStep4Options || activeVest.options;

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <span class="boss-badge">${activeVest.examTag}</span>
          <p class="puzzle-instruction" style="margin-top: 10px;">
            ${activeVest.question}
            <span id="liveStep4XP" style="display:inline-block; margin-left:8px; padding:2px 10px; border-radius:12px; background:rgba(40,167,69,0.15); border:1px solid rgba(40,167,69,0.4); font-size:0.85rem; color:#28a745; font-weight:700;">
              Vale ${STATE.step4XP} XP ${STATE.step4MadeError ? '(reduzido pela metade)' : ''}
            </span>
          </p>

          <div class="quiz-options" id="step4Options">
            ${optionsToRender.map(opt => `
              <div class="quiz-option-card" onclick="window.CF_GAME.selectQuizOption('step4', '${opt.letter}')" data-letter="${opt.letter}">
                <span class="option-letter">${opt.letter}</span>
                <span class="option-text">${opt.text}</span>
              </div>
            `).join('')}
          </div>
          <div id="step4Feedback" class="feedback-box hidden"></div>
        </div>
      `;
    }
  }

  function moveFragment(index, direction) {
    if (STATE.isAnimatingPuzzle || STATE.step2Passed) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= STATE.activePuzzleOrder.length) return;

    const currentEl = document.getElementById(`puzzleSlot_${index}`);
    const targetEl = document.getElementById(`puzzleSlot_${targetIdx}`);

    if (currentEl && targetEl) {
      STATE.isAnimatingPuzzle = true;

      const currentRect = currentEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const dy = targetRect.top - currentRect.top;

      currentEl.style.transform = `translateY(${dy}px)`;
      currentEl.style.zIndex = '5';
      targetEl.style.transform = `translateY(${-dy}px)`;
      targetEl.style.zIndex = '4';

      setTimeout(() => {
        const temp = STATE.activePuzzleOrder[index];
        STATE.activePuzzleOrder[index] = STATE.activePuzzleOrder[targetIdx];
        STATE.activePuzzleOrder[targetIdx] = temp;

        STATE.isAnimatingPuzzle = false;
        renderGameStep();
      }, 350);
    } else {
      const temp = STATE.activePuzzleOrder[index];
      STATE.activePuzzleOrder[index] = STATE.activePuzzleOrder[targetIdx];
      STATE.activePuzzleOrder[targetIdx] = temp;
      renderGameStep();
    }
  }

  function selectQuizOption(stepId, letter) {
    const container = document.getElementById(`${stepId}Options`);
    const feedbackBox = document.getElementById(`${stepId}Feedback`);
    if (!container) return;

    const cards = container.querySelectorAll('.quiz-option-card');
    cards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));

    const selectedCard = container.querySelector(`[data-letter="${letter}"]`);
    if (selectedCard) selectedCard.classList.add('selected');

    const story = STORIES[STATE.currentStoryIndex];
    const data = stepId === 'step3' 
      ? (STATE.activeStoryChallenge ? STATE.activeStoryChallenge.analysis : story.step3Analysis)
      : (STATE.activeStoryChallenge ? STATE.activeStoryChallenge.vestibular : story.step4Vestibular);

    const activeOptions = stepId === 'step3' ? STATE.activeStep3Options : STATE.activeStep4Options;
    const optionsList = activeOptions || data.options;
    const selectedOpt = optionsList.find(o => o.letter === letter);

    if (selectedOpt) {
      feedbackBox.classList.remove('hidden', 'feedback-correct', 'feedback-incorrect');
      if (selectedOpt.correct) {
        selectedCard.classList.add('correct');
        feedbackBox.classList.add('feedback-correct');
        const earnedXP = (stepId === 'step3') ? STATE.step3XP : STATE.step4XP;
        feedbackBox.innerHTML = `
          <div class="feedback-title">✓ Resposta Correta (+${earnedXP} XP)!</div>
          <p>${stepId === 'step3' ? data.feedbackCorrect : data.explanation}</p>
        `;
        if (stepId === 'step3') STATE.step3Passed = true;
        if (stepId === 'step4') STATE.step4Passed = true;
      } else {
        STATE.madeErrorInCurrentStory = true;
        if (stepId === 'step3') {
          STATE.step3Passed = false;
          STATE.step3MadeError = true;
          STATE.step3XP = 18; // Cai pela metade!
          const liveEl = document.getElementById('liveStep3XP');
          if (liveEl) {
            liveEl.style.color = '#dc3545';
            liveEl.style.borderColor = 'rgba(220,53,69,0.4)';
            liveEl.style.background = 'rgba(220,53,69,0.12)';
            liveEl.textContent = 'Vale 18 XP (reduzido pela metade)';
          }
        }
        if (stepId === 'step4') {
          STATE.step4Passed = false;
          STATE.step4MadeError = true;
          STATE.step4XP = 18; // Cai pela metade!
          const liveEl = document.getElementById('liveStep4XP');
          if (liveEl) {
            liveEl.style.color = '#dc3545';
            liveEl.style.borderColor = 'rgba(220,53,69,0.4)';
            liveEl.style.background = 'rgba(220,53,69,0.12)';
            liveEl.textContent = 'Vale 18 XP (reduzido pela metade)';
          }
        }
        selectedCard.classList.add('incorrect');
        feedbackBox.classList.add('feedback-incorrect');
        feedbackBox.innerHTML = `
          <div class="feedback-title">✗ Alternativa Incorreta!</div>
          <p style="color: #dc3545; font-weight: 600; margin-bottom: 6px;">⚠️ A pontuação desta questão caiu pela metade: vale agora 18 XP.</p>
          <p>${stepId === 'step3' ? data.feedbackIncorrect : "Analise o contexto histórico e a crítica social machadiana para escolher a alternativa ideal."}</p>
        `;
      }
    }
  }

  function handleNextStep() {
    if (STATE.isBossMode) {
      handleBossNext();
      return;
    }

    const story = STORIES[STATE.currentStoryIndex];
    const activePuzzle = STATE.activeStoryChallenge ? STATE.activeStoryChallenge.puzzle : story.step2Puzzle;

    // Validate Step 2 Puzzle
    if (STATE.currentStep === 2) {
      const currentIds = STATE.activePuzzleOrder.map(f => f.id);
      const isCorrect = currentIds.every((id, idx) => id === activePuzzle.correctOrder[idx]);
      const feedbackBox = document.getElementById('step2Feedback');
      const fragmentEls = document.querySelectorAll('.puzzle-fragment-item');

      if (!isCorrect) {
        STATE.madeErrorInCurrentStory = true;
        STATE.step2Passed = false;
        STATE.step2ErrorCount = (STATE.step2ErrorCount || 0) + 1;

        // Deduz 10 XP por erro na ordenação, com piso mínimo de 21 XP
        STATE.step2XP = Math.max(21, STATE.step2XP - 10);
        const liveEl = document.getElementById('liveStep2XP');
        if (liveEl) liveEl.innerHTML = `Etapa: <strong>${STATE.step2XP} XP</strong> (máx. 71)`;

        fragmentEls.forEach(el => {
          el.classList.remove('puzzle-fragment-correct');
          el.classList.add('puzzle-fragment-incorrect');
          setTimeout(() => el.classList.remove('puzzle-fragment-incorrect'), 600);
        });

        if (feedbackBox) {
          feedbackBox.classList.remove('hidden', 'feedback-correct');
          feedbackBox.classList.add('feedback-incorrect');
          feedbackBox.innerHTML = `
            <div class="feedback-title">✗ Sequência Incorreta (-10 XP)!</div>
            <p>A ordem cronológica dos fatos ainda contém incoerências. Saldo atual desta etapa: <strong>${STATE.step2XP} XP</strong> (piso de 21 XP). Use as setas ▲ e ▼ para reordenar os fatos antes de prosseguir.</p>
          `;
        }
        showToast(`A sequência ainda não está correta (-10 XP). Saldo do Enigma: ${STATE.step2XP} XP. Reordene os fatos antes de avançar.`, "warning");
        return;
      }

      // Se a sequência está correta e ainda não havia sido confirmada:
      if (!STATE.step2Passed) {
        STATE.step2Passed = true;

        fragmentEls.forEach(el => {
          el.classList.remove('puzzle-fragment-incorrect');
          el.classList.add('puzzle-fragment-correct');
        });

        // Desabilita botões de movimento após decifrar
        const moveBtns = document.querySelectorAll('.btn-move');
        moveBtns.forEach(btn => btn.disabled = true);

        if (feedbackBox) {
          feedbackBox.classList.remove('hidden', 'feedback-incorrect');
          feedbackBox.classList.add('feedback-correct');
          feedbackBox.innerHTML = `
            <div class="feedback-title">✓ Sequência Cronológica Decifrada! (+${STATE.step2XP} XP garantidos)</div>
            <p>Excelente dedução! A linha temporal dos acontecimentos foi reconstituída com fidelidade à narrativa machadiana.</p>
          `;
        }

        DOM.btnNextGame.textContent = 'Ir para Análise Oculta →';
        showToast(`✓ Enigma resolvido! +${STATE.step2XP} XP garantidos nesta etapa!`, "success");
        return; // Permite ao aluno visualizar e ler a confirmação de acerto antes de avançar
      }
    }
    // Validate Step 3 Analysis Quiz
    else if (STATE.currentStep === 3) {
      if (!STATE.step3Passed) {
        showToast("Selecione e acerte a resposta da análise psicológica para avançar!", "warning");
        return;
      }
    }
    // Validate Step 4 Vestibular Quiz
    else if (STATE.currentStep === 4) {
      if (!STATE.step4Passed) {
        showToast("Selecione e acerte a questão de vestibular para concluir a investigação!", "warning");
        return;
      }
    }

    // Advance
    if (STATE.currentStep < 4) {
      STATE.currentStep++;
      renderGameStep();
    } else {
      // Completed Story!
      const storyId = story.id;
      if (!STATE.currentUser.completedStories) STATE.currentUser.completedStories = [];
      if (!STATE.currentUser.perfectStories) STATE.currentUser.perfectStories = [];
      if (!STATE.currentUser.storyScores || typeof STATE.currentUser.storyScores !== 'object') {
        STATE.currentUser.storyScores = {};
      }

      const isFirstTime = !STATE.currentUser.completedStories.includes(storyId);
      
      const step2Earned = STATE.step2XP; // 21 a 71 XP
      const step3Earned = STATE.step3XP; // 18 ou 36 XP
      const step4Earned = STATE.step4XP; // 18 ou 36 XP
      const storyEarnedXP = Math.min(143, step2Earned + step3Earned + step4Earned);
      const isPerfectAttempt = (storyEarnedXP === 143);
      const previousStoryXP = STATE.currentUser.storyScores[storyId] || 0;

      if (isFirstTime) {
        STATE.currentUser.completedStories.push(storyId);
        STATE.currentUser.storyScores[storyId] = storyEarnedXP;
        
        if (isPerfectAttempt) {
          STATE.currentUser.perfectStories.push(storyId);
          addXP(storyEarnedXP, `Desempenho Impecável: ${story.title}`, '🏆');
          showToast(`🏆 Desempenho Impecável em ${story.title}! Enigma: +${step2Earned} XP | Análise: +${step3Earned} XP | Vestibular: +${step4Earned} XP = +${storyEarnedXP} XP!`, 'success');
        } else {
          addXP(storyEarnedXP, `Conclusão: ${story.title}`, '📜');
          showToast(`📜 Conto Concluído! Enigma: +${step2Earned} XP | Análise: +${step3Earned} XP | Vestibular: +${step4Earned} XP = +${storyEarnedXP} XP obtidos!`, 'info');
        }
      } else {
        // Repeat Play / Re-tentativa
        // Se o aluno obteve mais XP nesta rodada do que no histórico anterior (ex: ganhou 50 antes e agora fez 75 ou 143):
        if (storyEarnedXP > previousStoryXP) {
          const diffXP = storyEarnedXP - previousStoryXP;
          STATE.currentUser.storyScores[storyId] = storyEarnedXP;
          if (isPerfectAttempt && !STATE.currentUser.perfectStories.includes(storyId)) {
            STATE.currentUser.perfectStories.push(storyId);
          }
          addXP(diffXP, `Melhoria de Desempenho: ${story.title} (+${diffXP} XP)`, '⭐');
          showToast(`⭐ Desempenho Superado em ${story.title}! Nova pontuação: ${storyEarnedXP} XP (Enigma: ${step2Earned}, Análise: ${step3Earned}, Vestibular: ${step4Earned}). Diferença creditada: +${diffXP} XP!`, 'success');
        } else {
          if (isPerfectAttempt && !STATE.currentUser.perfectStories.includes(storyId)) {
            STATE.currentUser.perfectStories.push(storyId);
            logXPEvent(`Conquista Perfeita (Repetição): ${story.title}`, 0, 'neutral', '🌟');
            showToast(`🏆 Conquista Perfeita em ${story.title}! (Sem XP adicional em repetições)`);
          } else {
            logXPEvent(`Revisão de Conto: ${story.title}`, 0, 'neutral', '📖');
            showToast(`📖 ${story.title} revisado (${storyEarnedXP} XP)! (Sem acréscimo em relação à sua melhor marca anterior de ${previousStoryXP} XP)`);
          }
        }
      }

      saveToStorage();
      closeModal(DOM.modalGame);
      onUserLoggedIn();
    }
  }

  function handlePrevStep() {
    if (STATE.currentStep > 1) {
      STATE.currentStep--;
      renderGameStep();
    }
  }

  function giveHint() {
    const story = STORIES[STATE.currentStoryIndex];
    const activePuzzle = STATE.activeStoryChallenge ? STATE.activeStoryChallenge.puzzle : story.step2Puzzle;
    if (STATE.currentStep === 2 && activePuzzle && activePuzzle.hint) {
      if (STATE.step2HintUsed) {
        showToast(`💡 DICA DO NARRADOR: ${activePuzzle.hint}`, "warning");
        return;
      }
      STATE.step2HintUsed = true;
      STATE.usedHintInCurrentStory = true;
      // Perde 30 XP com piso mínimo de 21 XP
      STATE.step2XP = Math.max(21, STATE.step2XP - 30);

      const liveEl = document.getElementById('liveStep2XP');
      if (liveEl) liveEl.innerHTML = `Etapa: <strong>${STATE.step2XP} XP</strong> (máx. 71)`;
      DOM.btnHintGame.textContent = '💡 Dica Revelada (-30 XP)';

      showToast(`💡 DICA: ${activePuzzle.hint} (-30 XP na etapa do Enigma! Saldo restante da etapa: ${STATE.step2XP} XP)`, "warning");
    }
  }

  function updateStepperPills() {
    const pills = DOM.gameStepper.querySelectorAll('.step-pill');
    pills.forEach((p, idx) => {
      p.classList.remove('active', 'done');
      if (idx + 1 === STATE.currentStep) {
        p.classList.add('active');
      } else if (idx + 1 < STATE.currentStep) {
        p.classList.add('done');
      }
    });
  }

  /* ==========================================================================
     FINAL VESTIBULAR BOSS CHALLENGE
     ========================================================================== */
  function startBossChallenge() {
    if (!STATE.currentUser) {
      openModal(DOM.modalLogin);
      return;
    }

    STATE.isBossMode = true;
    STATE.bossQuestionIndex = 0;
    STATE.bossScore = 0;

    DOM.gameStoryNumber.textContent = "DESAFIO SUPREMO";
    DOM.gameStoryTitle.textContent = "Simulado Integrado de Vestibular";
    DOM.gameStoryLocation.textContent = "📍 FUVEST, UNICAMP & ENEM";

    renderBossQuestion();
    openModal(DOM.modalGame);
  }

  function renderBossQuestion() {
    const q = BOSS_QUESTIONS[STATE.bossQuestionIndex];
    DOM.btnHintGame.classList.add('hidden');
    DOM.btnPrevGame.classList.add('hidden');
    DOM.btnNextGame.textContent = STATE.bossQuestionIndex === BOSS_QUESTIONS.length - 1 ? 'Concluir Simulado' : 'Próxima Questão →';

    const shuffledBossOpts = shuffleArray(q.options);
    const letters = ["A", "B", "C", "D"];
    STATE.activeBossOptions = shuffledBossOpts.map((opt, i) => ({
      ...opt,
      letter: letters[i]
    }));

    DOM.gameBody.innerHTML = `
      <div class="slide-container">
        <span class="boss-badge">${q.examTag} — ${q.storyRef}</span>
        <p class="puzzle-instruction" style="white-space: pre-line; margin-top: 12px;">${q.question}</p>

        <div class="quiz-options" id="bossOptions">
          ${STATE.activeBossOptions.map(opt => `
            <div class="quiz-option-card" onclick="window.CF_GAME.selectBossOption('${opt.letter}')" data-letter="${opt.letter}">
              <span class="option-letter">${opt.letter}</span>
              <span class="option-text">${opt.text}</span>
            </div>
          `).join('')}
        </div>
        <div id="bossFeedback" class="feedback-box hidden"></div>
      </div>
    `;
  }

  function selectBossOption(letter) {
    const container = document.getElementById('bossOptions');
    const feedbackBox = document.getElementById('bossFeedback');
    if (!container) return;

    const q = BOSS_QUESTIONS[STATE.bossQuestionIndex];
    const cards = container.querySelectorAll('.quiz-option-card');
    cards.forEach(c => c.classList.remove('selected', 'correct', 'incorrect'));

    const selectedCard = container.querySelector(`[data-letter="${letter}"]`);
    if (selectedCard) selectedCard.classList.add('selected');

    const optionsList = STATE.activeBossOptions || q.options;
    const selectedOpt = optionsList.find(o => o.letter === letter);
    if (selectedOpt) {
      feedbackBox.classList.remove('hidden', 'feedback-correct', 'feedback-incorrect');
      if (selectedOpt.correct) {
        selectedCard.classList.add('correct');
        feedbackBox.classList.add('feedback-correct');
        feedbackBox.innerHTML = `
          <div class="feedback-title">✓ Gabaritou!</div>
          <p>${q.explanation}</p>
        `;
        STATE.lastBossCorrect = true;
      } else {
        selectedCard.classList.add('incorrect');
        feedbackBox.classList.add('feedback-incorrect');
        feedbackBox.innerHTML = `
          <div class="feedback-title">✗ Incorreto</div>
          <p>${q.explanation}</p>
        `;
        STATE.lastBossCorrect = false;
      }
    }
  }

  function handleBossNext() {
    if (STATE.lastBossCorrect) {
      STATE.bossScore++;
    }

    if (STATE.bossQuestionIndex < BOSS_QUESTIONS.length - 1) {
      STATE.bossQuestionIndex++;
      STATE.lastBossCorrect = false;
      renderBossQuestion();
    } else {
      // Finish Boss
      // Regra Pedagógica Fixada:
      // O Simulado Final (Boss) vale 20 XP (+0,2) por questão (até 100 XP / 1,0 ponto no total).
      // Funciona como COMPLEMENTO PEDAGÓGICO / RECUPERAÇÃO para quem perdeu pontos nos contos.
      // Em nenhuma hipótese a pontuação total pode ultrapassar 1.000 XP (Nota 10,0).
      const prevXP = Number(STATE.currentUser.xp) || 0;
      const prevBossScore = typeof STATE.currentUser.bossScore === 'number' ? STATE.currentUser.bossScore : 0;
      const currentScore = STATE.bossScore;
      const xpPerQuestion = 20;
      
      let xpToAward = 0;
      if (typeof STATE.currentUser.bossScore !== 'number') {
        xpToAward = currentScore * xpPerQuestion;
      } else if (currentScore > prevBossScore) {
        xpToAward = (currentScore - prevBossScore) * xpPerQuestion;
      }

      if (xpToAward > 0) {
        addXP(xpToAward, `Simulado Final (Complemento): ${currentScore}/5 acertos`, '🎓');
      }

      STATE.currentUser.bossScore = Math.max(prevBossScore, currentScore);
      STATE.currentUser.bossPassed = STATE.currentUser.bossScore >= 3;

      const currentXP = Number(STATE.currentUser.xp) || 0;
      const notaAtual = (currentXP / 100).toFixed(1);

      if (prevXP >= 1000) {
        showToast(`🎓 Simulado Concluído! Você acertou ${currentScore}/${BOSS_QUESTIONS.length} questões. Como sua nota já é 10,0 (1.000 XP), o complemento não é necessário!`, "success");
      } else if (xpToAward > 0) {
        const actualGain = currentXP - prevXP;
        showToast(`🎓 Simulado Concluído! Você acertou ${currentScore}/${BOSS_QUESTIONS.length} questões (+${actualGain} XP de complemento pedagógico / Nota atual: ${notaAtual})!`, "success");
      } else {
        showToast(`🎓 Simulado Concluído! Você acertou ${currentScore}/${BOSS_QUESTIONS.length} questões (Nota atual: ${notaAtual}).`, "info");
      }
      saveToStorage();
      closeModal(DOM.modalGame);
      onUserLoggedIn();
    }
  }

  /* ==========================================================================
     ACHIEVEMENTS & XP SYSTEM
     ========================================================================== */
  function logXPEvent(title, amount, type = 'gain', icon = '📜') {
    if (!STATE.currentUser) return;
    if (!STATE.currentUser.xpHistory) STATE.currentUser.xpHistory = [];

    STATE.currentUser.xpHistory.unshift({
      id: 'log_' + Date.now() + Math.random().toString(36).substr(2, 4),
      title: title,
      amount: amount,
      type: type,
      icon: icon,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
  }

  function addXP(amount, title = 'Recompensa', icon = '⭐') {
    if (!STATE.currentUser) return;
    // Teto máximo oficial fixado: 1.000 XP (referente à nota 10,0)
    const current = Number(STATE.currentUser.xp) || 0;
    const updated = Math.min(1000, Math.max(0, current + amount));
    const actualGain = updated - current;
    STATE.currentUser.xp = updated;
    DOM.headerPlayerXP.textContent = `${STATE.currentUser.xp} XP`;
    
    const type = actualGain > 0 ? (title.includes('Conquista') ? 'bonus' : 'gain') : (amount < 0 ? 'loss' : 'neutral');
    logXPEvent(title, actualGain, type, icon);

    checkAchievements();
    saveToStorage();
  }

  function renderHistoryModal() {
    if (!STATE.currentUser) return;
    DOM.historyStudentName.textContent = STATE.currentUser.name;
    DOM.historyTotalXP.textContent = `${STATE.currentUser.xp} XP`;

    const perfectCount = (STATE.currentUser.perfectStories || []).length;
    DOM.historyPerfectCount.textContent = `${perfectCount}/${STORIES.length}`;

    DOM.historyTimeline.innerHTML = '';
    const history = STATE.currentUser.xpHistory || [];

    if (history.length === 0) {
      DOM.historyTimeline.innerHTML = `
        <div class="timeline-item" style="justify-content: center; color: var(--text-muted); font-style: italic;">
          Nenhum evento registrado ainda. Complete um conto para iniciar sua trilha!
        </div>
      `;
      return;
    }

    history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      
      let badgeClass = 'timeline-gain';
      let amountText = `+${item.amount} XP`;
      if (item.type === 'bonus') {
        badgeClass = 'timeline-bonus';
        amountText = `+${item.amount} XP Bônus`;
      } else if (item.type === 'loss' || item.amount < 0) {
        badgeClass = 'timeline-loss';
        amountText = `${item.amount} XP`;
      } else if (item.type === 'neutral' || item.amount === 0) {
        badgeClass = 'timeline-neutral';
        amountText = `0 XP (Repetição)`;
      }

      div.innerHTML = `
        <div class="timeline-icon">${item.icon || '📜'}</div>
        <div class="timeline-details">
          <span class="timeline-title">${item.title}</span>
          <span class="timeline-time">${item.timestamp}</span>
        </div>
        <span class="timeline-badge ${badgeClass}">${amountText}</span>
      `;
      DOM.historyTimeline.appendChild(div);
    });
  }

  function checkAchievements() {
    if (!STATE.currentUser) {
      DOM.headerBadgeCount.textContent = `0/${ACHIEVEMENTS.length}`;
      return;
    }
    if (!Array.isArray(STATE.currentUser.achievements)) {
      STATE.currentUser.achievements = [];
    }

    let unlockedCount = 0;
    ACHIEVEMENTS.forEach(ach => {
      const alreadyHas = STATE.currentUser.achievements.includes(ach.id);
      if (ach.condition(STATE.currentUser)) {
        if (!alreadyHas) {
          STATE.currentUser.achievements.push(ach.id);
          showToast(`🏅 Nova Conquista Desbloqueada: ${ach.title}!`);
        }
        unlockedCount++;
      } else if (alreadyHas) {
        unlockedCount++;
      }
    });

    DOM.headerBadgeCount.textContent = `${unlockedCount}/${ACHIEVEMENTS.length}`;
  }

  function renderAchievementsModal() {
    DOM.achievementsGrid.innerHTML = '';
    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = STATE.currentUser && STATE.currentUser.achievements ? STATE.currentUser.achievements.includes(ach.id) : false;
      const isSuper = ach.isSuper === true;
      const card = document.createElement('div');
      card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''} ${isSuper ? 'super-achievement-card' : ''}`;
      card.innerHTML = `
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-info">
          <h4>${ach.title} ${isSuper ? '<span class="super-badge-pill">SUPER</span>' : ''}</h4>
          <p>${ach.desc}</p>
          <span class="achievement-status">${isUnlocked ? '✓ Desbloqueada! (+143 XP Impecável)' : '🔒 Bloqueada (Exige 143 XP de primeira sem erros e sem dicas)'}</span>
        </div>
      `;
      DOM.achievementsGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     RANKING MODAL & PODIUM
     ========================================================================== */
  function renderRankingModal() {
    const filterClass = DOM.selectFilterClass.value;
    let list = (STATE.studentsList || []).filter(s => s && s.name).map(normalizeStudentData);

    if (filterClass !== 'ALL') {
      list = list.filter(s => s.studentClass === filterClass);
    }

    // Sort by XP descending
    list.sort((a, b) => (b.xp || 0) - (a.xp || 0));

    // Podium Top 3
    DOM.podiumContainer.innerHTML = '';
    const top3 = list.slice(0, 3);

    top3.forEach((std, idx) => {
      const place = idx + 1;
      const item = document.createElement('div');
      item.className = `podium-item podium-item-${place}`;
      item.innerHTML = `
        <div class="podium-avatar">${place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉'}</div>
        <div class="podium-name">${std.name}</div>
        <div class="podium-score">${std.xp || 0} XP</div>
        <div class="podium-pillar pillar-${place}">${place}º</div>
      `;
      DOM.podiumContainer.appendChild(item);
    });

    // Table
    DOM.rankingTableBody.innerHTML = '';
    list.forEach((std, idx) => {
      const tr = document.createElement('tr');
      const completedCount = getStudentCompletedCount(std);
      const completionPercent = Math.round((completedCount / STORIES.length) * 100);

      tr.innerHTML = `
        <td><strong>#${idx + 1}</strong></td>
        <td>${std.name} ${STATE.currentUser && std.id === STATE.currentUser.id ? '⭐ (Você)' : ''}</td>
        <td><span class="story-tag-pill">${std.studentClass || 'Geral'}</span></td>
        <td><strong style="color:var(--primary-gold);">${std.xp || 0} XP</strong></td>
        <td>${completedCount}/7 Contos</td>
        <td>${completionPercent}% Concluído</td>
      `;
      DOM.rankingTableBody.appendChild(tr);
    });
  }

  function refreshDataNow() {
    if (DOM.btnSyncSheetsNow) {
      DOM.btnSyncSheetsNow.disabled = true;
      DOM.btnSyncSheetsNow.innerHTML = "⏳ Atualizando...";
    }
    showToast("🔃 Buscando dados mais recentes da Planilha Google...");

    Promise.all([
      fetchClassesFromGoogleSheets(),
      fetchRankingFromGoogleSheets()
    ]).then(() => {
      renderProfAnalytics();
      renderRankingModal();
      if (DOM.btnSyncSheetsNow) {
        DOM.btnSyncSheetsNow.disabled = false;
        DOM.btnSyncSheetsNow.innerHTML = "🔃 Atualizar Dados";
      }
      showToast("✅ Dados pedagógicos e turmas atualizados com sucesso!", "success");
    }).catch(() => {
      if (DOM.btnSyncSheetsNow) {
        DOM.btnSyncSheetsNow.disabled = false;
        DOM.btnSyncSheetsNow.innerHTML = "🔃 Atualizar Dados";
      }
      showToast("Não foi possível atualizar dados agora.", "error");
    });
  }

  function resetAllData() {
    customConfirm(
      "Zerar Ranking e Alunos",
      "Tem certeza que deseja zerar a lista de todos os alunos e o ranking? Esta ação apagará os dados locais salvos neste navegador para iniciar um novo período letivo.",
      () => {
        STATE.studentsList = [];
        STATE.currentUser = null;
        localStorage.removeItem('CF_STUDENTS_LIST');
        localStorage.removeItem('CF_ACTIVE_STUDENT_ID');
        DOM.playerBar.classList.add('hidden');
        DOM.btnSwitchUser.classList.add('hidden');
        renderProfAnalytics();
        renderRankingModal();
        renderStoryGrid();
        openModal(DOM.modalLogin);
        showToast("Ranking e alunos zerados com sucesso!", "warning");
      }
    );
  }

  /* ==========================================================================
     GOOGLE SHEETS DIRECT SYNC & ACTIONS
     ========================================================================== */
  function openGoogleSheetsLink() {
    showToast("📊 Abrindo a Planilha Google no navegador...");
    syncAllStudentsNow(false);
    window.open(SPREADSHEET_URL, '_blank');
  }

  function syncAllStudentsNow(showAlert = true) {
    const list = (STATE.studentsList || []).filter(s => s && s.name);
    if (!list || list.length === 0) {
      if (showAlert) showToast("Nenhum aluno cadastrado para sincronizar!", "warning");
      return;
    }

    if (DOM.btnSyncSheetsNow) {
      DOM.btnSyncSheetsNow.disabled = true;
      DOM.btnSyncSheetsNow.textContent = "⏳ Sincronizando...";
    }

    let syncedCount = 0;
    const promises = list.map(student => {
      return syncStudentToGoogleSheets(student)
        .then(ok => { if (ok) syncedCount++; })
        .catch(() => {});
    });

    Promise.all(promises).then(() => {
      if (DOM.btnSyncSheetsNow) {
        DOM.btnSyncSheetsNow.disabled = false;
        DOM.btnSyncSheetsNow.textContent = "🔄 Sincronizar Planilha";
      }
      if (showAlert) {
        showToast(`🎉 ${list.length} aluno(s) sincronizado(s) com a planilha do Google!`, "success");
      }
    });
  }

  /* ==========================================================================
     STUDENT DETAILS MODAL
     ========================================================================== */
  function showStudentDetails(studentId) {
    let student = STATE.studentsList.find(s => s && s.id === studentId);
    if (!student || !student.name) {
      showToast("Aluno não encontrado!", "error");
      return;
    }
    student = normalizeStudentData(student);

    DOM.detailStudentName.textContent = student.name;
    DOM.detailStudentClass.textContent = `🏫 Turma: ${student.studentClass || 'Não informada'}`;
    DOM.detailStudentXP.textContent = `${student.xp || 0} XP`;

    const completedCount = getStudentCompletedCount(student);
    const grade = calculateStudentGrade(student);
    const approval = getStudentApprovalStatus(student);
    DOM.detailStudentGrade.textContent = `${grade} / 10`;
    DOM.detailStudentStoriesCount.textContent = `${completedCount} / 7`;
    DOM.detailStudentBossStatus.textContent = approval.text;
    DOM.detailStudentBossStatus.style.color = approval.color;

    // Lista de contos
    DOM.detailStudentStoriesList.innerHTML = '';
    STORIES.forEach((story, idx) => {
      const isCompleted = student.completedStories && student.completedStories.includes(story.id);
      const isPerfect = student.perfectStories && student.perfectStories.includes(story.id);
      const earnedXP = student.storyScores && student.storyScores[story.id] ? student.storyScores[story.id] : null;

      const row = document.createElement('div');
      row.className = 'student-story-row';
      const storyLabel = story.numberText || `Conto ${idx + 1}`;
      let badgeLabel = '○ Pendente';
      let badgeClass = 'badge-dim';
      if (isCompleted) {
        if (isPerfect) {
          badgeLabel = '⭐ Impecável (+143 XP)';
          badgeClass = 'badge-gold';
        } else if (earnedXP) {
          badgeLabel = `✓ Concluído (+${earnedXP} XP)`;
          badgeClass = 'badge-green';
        } else {
          badgeLabel = '✓ Concluído';
          badgeClass = 'badge-green';
        }
      }

      row.innerHTML = `
        <span><strong>${storyLabel}:</strong> ${story.title}</span>
        <span class="badge ${badgeClass}">
          ${badgeLabel}
        </span>
      `;
      DOM.detailStudentStoriesList.appendChild(row);
    });

    openModal(DOM.modalStudentDetails);
  }

  /* ==========================================================================
     TEACHER DASHBOARD & ANALYTICS
     ========================================================================== */
  function unlockProfDashboard() {
    const pass = DOM.inputProfPass.value.trim();
    if (pass === 'professor@2026') {
      DOM.profLockScreen.classList.add('hidden');
      DOM.profDashboard.classList.remove('hidden');
      fetchClassesFromGoogleSheets();
      fetchRankingFromGoogleSheets();
      renderProfAnalytics();
    } else {
      showToast("Senha incorreta!", "error");
    }
  }

  function renderProfAnalytics() {
    const list = (STATE.studentsList || []).filter(s => s && s.name).map(normalizeStudentData);
    DOM.profMetricTotalStudents.textContent = list.length;

    // Calc Average Score (0 to 10 scale) e Taxa de Conclusão Global real
    let totalScoreSum = 0;
    let totalStoriesCompletedSum = 0;

    list.forEach(s => {
      const completedCount = getStudentCompletedCount(s);
      totalStoriesCompletedSum += completedCount;
      const score10 = parseFloat(calculateStudentGrade(s));
      totalScoreSum += isNaN(score10) ? 0 : score10;
    });

    const avgScore = list.length > 0 ? (totalScoreSum / list.length).toFixed(1) : '0.0';
    DOM.profMetricAvgScore.textContent = `${avgScore} / 10`;

    const totalPossibleStories = list.length * STORIES.length;
    const completionRate = totalPossibleStories > 0 
      ? Math.round((totalStoriesCompletedSum / totalPossibleStories) * 100) 
      : 0;
    DOM.profMetricCompletion.textContent = `${completionRate}%`;

    // Table
    DOM.profTableBody.innerHTML = '';
    list.forEach(std => {
      const completedCount = getStudentCompletedCount(std);
      const nota10 = calculateStudentGrade(std);
      const approval = getStudentApprovalStatus(std);
      const tr = document.createElement('tr');
      const scoreNum = parseFloat(nota10);

      tr.innerHTML = `
        <td><strong>${std.name}</strong></td>
        <td>${std.studentClass || 'Sem Turma'}</td>
        <td>${std.xp || 0} XP</td>
        <td><strong style="color:${scoreNum >= 7.0 ? '#28a745' : scoreNum >= 6.0 ? '#17a2b8' : scoreNum >= 5.0 ? '#ffc107' : '#dc3545'}">${nota10}</strong></td>
        <td>${completedCount} / 7 Contos</td>
        <td><span style="color:${approval.color}; font-weight:600;">${approval.text}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="window.CF_GAME.showStudentDetails('${std.id}')">
            🔍 Detalhes
          </button>
        </td>
      `;
      DOM.profTableBody.appendChild(tr);
    });
  }

  function exportCSV() {
    const list = (STATE.studentsList || []).filter(s => s && s.name).map(normalizeStudentData);
    if (list.length === 0) {
      showToast("Não há dados de alunos para exportar!", "warning");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nome do Aluno,Turma,Pontuacao (XP),Nota Oficial (0-10),Contos Concluidos,Simulado Final\n";

    list.forEach(s => {
      const completedCount = getStudentCompletedCount(s);
      const nota10 = calculateStudentGrade(s);
      const approval = getStudentApprovalStatus(s);
      csvContent += `"${s.id}","${s.name}","${s.studentClass || ''}",${s.xp || 0},${nota10},"${completedCount}/7","${approval.shortText}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_desempenho_contos_fluminenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Relatório CSV baixado com sucesso!");
  }

  /* ==========================================================================
     UI MODAL & TOAST HELPERS
     ========================================================================== */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    modalEl.classList.add('modal-active');
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    modalEl.classList.remove('modal-active');
  }

  function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✨'}</span> ${msg}`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     EVENT LISTENERS SETUP
     ========================================================================== */
  function setupEventListeners() {
    DOM.formLogin.addEventListener('submit', handleLogin);
    DOM.btnSwitchUser.addEventListener('click', switchUser);

    // Nav buttons
    DOM.btnRanking.addEventListener('click', () => {
      fetchRankingFromGoogleSheets();
      renderRankingModal();
      openModal(DOM.modalRanking);
    });

    DOM.btnConquistas.addEventListener('click', () => {
      renderAchievementsModal();
      openModal(DOM.modalConquistas);
    });

    if (DOM.btnRules) {
      DOM.btnRules.addEventListener('click', () => {
        openModal(DOM.modalRules);
      });
    }

    DOM.btnProfessor.addEventListener('click', () => {
      fetchClassesFromGoogleSheets();
      fetchRankingFromGoogleSheets();
      openModal(DOM.modalProfessor);
    });

    DOM.btnStartBoss.addEventListener('click', startBossChallenge);

    // XP & Achievements Badge Clicks -> Opens Progress History Trail
    if (DOM.headerPlayerXP) {
      DOM.headerPlayerXP.parentElement.addEventListener('click', () => {
        renderHistoryModal();
        openModal(DOM.modalHistory);
      });
    }
    if (DOM.headerBadgeCount) {
      DOM.headerBadgeCount.parentElement.addEventListener('click', () => {
        renderHistoryModal();
        openModal(DOM.modalHistory);
      });
    }

    // Modal Close buttons
    DOM.btnCloseGame.addEventListener('click', () => {
      STATE.currentStep = 1;
      STATE.step3Passed = false;
      STATE.step4Passed = false;
      closeModal(DOM.modalGame);
    });
    DOM.btnCloseRanking.addEventListener('click', () => closeModal(DOM.modalRanking));
    DOM.btnCloseConquistas.addEventListener('click', () => closeModal(DOM.modalConquistas));
    DOM.btnCloseHistory.addEventListener('click', () => closeModal(DOM.modalHistory));
    DOM.btnCloseProfessor.addEventListener('click', () => closeModal(DOM.modalProfessor));

    if (DOM.btnCloseRules) {
      DOM.btnCloseRules.addEventListener('click', () => closeModal(DOM.modalRules));
    }
    if (DOM.rulesBackdrop) {
      DOM.rulesBackdrop.addEventListener('click', () => closeModal(DOM.modalRules));
    }

    if (DOM.btnCloseGoogleSheets) {
      DOM.btnCloseGoogleSheets.addEventListener('click', () => closeModal(DOM.modalGoogleSheets));
    }
    if (DOM.btnCloseStudentDetails) {
      DOM.btnCloseStudentDetails.addEventListener('click', () => closeModal(DOM.modalStudentDetails));
    }
    if (DOM.btnCloseStudentDetailsBtn) {
      DOM.btnCloseStudentDetailsBtn.addEventListener('click', () => closeModal(DOM.modalStudentDetails));
    }

    // Confirmation modal buttons
    if (DOM.btnConfirmCancel) {
      DOM.btnConfirmCancel.addEventListener('click', () => {
        confirmCallback = null;
        closeModal(DOM.modalConfirm);
      });
    }
    if (DOM.btnConfirmOk) {
      DOM.btnConfirmOk.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        confirmCallback = null;
        closeModal(DOM.modalConfirm);
      });
    }

    // Game Footer
    DOM.btnNextGame.addEventListener('click', handleNextStep);
    DOM.btnPrevGame.addEventListener('click', handlePrevStep);
    DOM.btnHintGame.addEventListener('click', giveHint);

    // Ranking Controls
    DOM.selectFilterClass.addEventListener('change', renderRankingModal);

    // Teacher Controls
    DOM.btnUnlockProf.addEventListener('click', unlockProfDashboard);

    if (DOM.btnExportCSV) {
      DOM.btnExportCSV.addEventListener('click', exportCSV);
    }
    if (DOM.btnPrintReport) {
      DOM.btnPrintReport.addEventListener('click', () => window.print());
    }

    if (DOM.btnOpenGoogleSheets) {
      DOM.btnOpenGoogleSheets.addEventListener('click', openGoogleSheetsLink);
    }
    if (DOM.btnSyncSheetsNow) {
      DOM.btnSyncSheetsNow.addEventListener('click', refreshDataNow);
    }

    // Apps Script Modal Listeners
    if (DOM.btnOpenAppsScriptModal) {
      DOM.btnOpenAppsScriptModal.addEventListener('click', () => openModal(DOM.modalAppsScriptCode));
    }
    if (DOM.btnCloseAppsScriptModal) {
      DOM.btnCloseAppsScriptModal.addEventListener('click', () => closeModal(DOM.modalAppsScriptCode));
    }
    if (DOM.appsScriptBackdrop) {
      DOM.appsScriptBackdrop.addEventListener('click', () => closeModal(DOM.modalAppsScriptCode));
    }
    if (DOM.btnCopyAppsScriptCode) {
      DOM.btnCopyAppsScriptCode.addEventListener('click', () => {
        const codeText = DOM.codeAppsScriptBlock ? DOM.codeAppsScriptBlock.textContent : '';
        const setCopySuccess = () => {
          DOM.btnCopyAppsScriptCode.textContent = "✅ Código Copiado!";
          showToast("Código do Apps Script copiado para a área de transferência!", "success");
          setTimeout(() => {
            if (DOM.btnCopyAppsScriptCode) DOM.btnCopyAppsScriptCode.textContent = "📋 Copiar Código Completo";
          }, 2500);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(codeText)
            .then(setCopySuccess)
            .catch(() => {
              const ta = document.createElement('textarea');
              ta.value = codeText;
              ta.style.position = 'fixed';
              ta.style.opacity = '0';
              document.body.appendChild(ta);
              ta.select();
              try {
                document.execCommand('copy');
                setCopySuccess();
              } catch {
                showToast("Por favor, selecione e copie o código manualmente.", "warning");
              }
              document.body.removeChild(ta);
            });
        } else {
          const ta = document.createElement('textarea');
          ta.value = codeText;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand('copy');
            setCopySuccess();
          } catch {
            showToast("Por favor, selecione e copie o código manualmente.", "warning");
          }
          document.body.removeChild(ta);
        }
      });
    }

    const btnProfLoginShortcut = document.getElementById('btnProfLoginShortcut');
    if (btnProfLoginShortcut) {
      btnProfLoginShortcut.addEventListener('click', () => {
        openModal(DOM.modalProfessor);
      });
    }

    const btnResetAllData = document.getElementById('btnResetAllData');
    if (btnResetAllData) {
      btnResetAllData.addEventListener('click', resetAllData);
    }

    if (DOM.formAddClass) {
      DOM.formAddClass.addEventListener('submit', handleAddClass);
    }

    const btnImportJSON = document.getElementById('btnImportJSON');
    const inputImportJSON = document.getElementById('inputImportJSON');

    if (btnImportJSON && inputImportJSON) {
      btnImportJSON.addEventListener('click', () => inputImportJSON.click());
      inputImportJSON.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target.result);
            const items = Array.isArray(importedData) ? importedData : [importedData];
            let addedCount = 0;

            items.forEach(newStd => {
              if (newStd.id && newStd.name) {
                const existingIdx = STATE.studentsList.findIndex(s => s.id === newStd.id || (s.name === newStd.name && s.studentClass === newStd.studentClass));
                if (existingIdx !== -1) {
                  STATE.studentsList[existingIdx] = newStd;
                } else {
                  STATE.studentsList.push(newStd);
                }
                addedCount++;
              }
            });

            saveToStorage();
            renderProfAnalytics();
            renderRankingModal();
            showToast(`🎉 ${addedCount} registro(s) de alunos importado(s) com sucesso!`);
          } catch (err) {
            showToast("Erro ao ler arquivo JSON de importação!", "error");
          }
        };
        reader.readAsText(file);
      });
    }
  }

  // Expose Global Namespace for Inline Handlers
  window.CF_GAME = {
    openStory,
    moveFragment,
    selectQuizOption,
    selectBossOption,
    deleteClass,
    showStudentDetails,
    openGoogleSheetsLink,
    syncAllStudentsNow
  };

  // Run App
  document.addEventListener('DOMContentLoaded', init);

})();
