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

  // Story Database (All 7 Stories + Images + Custom Puzzles + Vestibular Questions)
  const STORIES = [
    {
      id: "miss-dollar",
      title: "Miss Dollar",
      numberText: "Conto I",
      location: "📍 Botafogo & Passeio Público, Rio de Janeiro",
      image: "assets/miss_dollar.jpg",
      tags: ["Ironia", "Interesse Social", "Narrador Dissimulado"],
      xpValue: 150,
      summary: "Mendonça, um jovem cético de 36 anos, encontra a cadelinha 'Miss Dollar' perdida na rua. Ao devolvê-la à sua dona, a rica viúva Dona Margarida, tem início um jogo de sedução e segundas intenções.",
      
      step1Context: {
        title: "O Cão Desaparecido e o Pugilismo Amoroso",
        text: "Publicado em 1870, 'Miss Dollar' abre a coletânea apresentando um narrador machadiano extremamente consciente de seu leitor. O médico Dr. Mendonça jura não acreditar no amor por ter sido desiludido no passado. Porém, o destino coloca em seus braços a cadelinha de raça de Dona Margarida, desencadeando visitas frenéticas à casa da viúva rica. Seria afeição sincera ou interesse pecuniário?",
        quote: "— Se esta cadela se chamasse de outro modo, não iria devolver. Mas 'Miss Dollar'... há um mistério nisso! E além do mais, a dona é viúva e rica!"
      },

      step2Puzzle: {
        instruction: "Reconstrua o anúncio de jornal e a ordem dos fatos que uniram Mendonça a Margarida:",
        fragments: [
          { id: "f1", text: "Mendonça encontra uma cadelinha perdida com coleira gravada 'Miss Dollar' e descobre o endereço da dona." },
          { id: "f2", text: "Ele hesita em devolver, receoso de parecer caçador de dotes, mas decide entregar o animal pessoalmente." },
          { id: "f3", text: "Dona Margarida o recebe com efusiva gratidão e o convida para tomar chá em sua residência em Botafogo." },
          { id: "f4", text: "Mendonça passa a frequentar a casa diariamente sob o pretexto de perguntar pela saúde da cadela." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "Pense na progressão lógica: Encontro do cão -> Devolução hesitante -> Convite de agradecimento -> Frequência diária."
      },

      step3Analysis: {
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

      step4Vestibular: {
        examTag: "FUVEST / UNICAMP - Análise Textual",
        question: "No conto 'Miss Dollar', o nome da cadelinha possui um papel simbólico fundamental na narrativa. Assinale a alternativa correta sobre esse simbolismo:",
        options: [
          { letter: "A", text: "Ironiza a influência estrangeira no Brasil Imperial e sintetiza o interesse financeiro subjacente às relações amorosas da elite.", correct: true },
          { letter: "B", text: "Trata-se de uma mera coincidência sem relevância para a crítica social machadiana.", correct: false },
          { letter: "C", text: "Representa a devoção incondicional dos personagens à causa abolicionista do século XIX.", correct: false },
          { letter: "D", text: "Simboliza a decadência das tradições religiosas no Rio de Janeiro vitoriano.", correct: false }
        ],
        explanation: "O nome 'Miss Dollar' (Senhorita Dólar) condensa a crítica machadiana ao casamento como transação comercial na sociedade burguesa carioca."
      }
    },

    {
      id: "luiz-soares",
      title: "Luiz Soares",
      numberText: "Conto II",
      location: "📍 Rua do Ouvidor, Rio de Janeiro",
      image: "assets/luiz_soares.jpg",
      tags: ["Dândi", "Parasitismo Burguês", "Moralismo"],
      xpValue: 150,
      summary: "Luiz Soares torrou toda a sua herança com extravagâncias na Rua do Ouvidor. Falido, tenta recuperar o status casando-se com a prima Rita, mas descobre que a virtude não se compra.",

      step1Context: {
        title: "O Declínio do Dândi Carioca",
        text: "Luiz Soares representa o típico jovem libertino do Rio de Janeiro Imperial: esbanjador, egoísta e fascinado pelo luxo da Rua do Ouvidor. Após gastar até o último tostão de sua fortuna, recorre ao tio respeitável pedindo a mão da prima Rita, pretendendo cobrir suas dívidas com o dote.",
        quote: "— Devo duzentos contos de réis... O casamento com Rita é o único remédio capaz de estancar a sangria das minhas finanças!"
      },

      step2Puzzle: {
        instruction: "Organize as cartas e promessas de Luiz Soares para desmascarar sua estratégia financeira:",
        fragments: [
          { id: "f1", text: "Luiz Soares esgota sua herança em orgias, roupas de alta costura e jogos na corte." },
          { id: "f2", text: "Com a falência iminente, reaproxime-se da família sob o disfarce de parente regenerado." },
          { id: "f3", text: "Pede a mão da prima Rita, que inicialmente o admira por sua elegância e civilidade." },
          { id: "f4", text: "O tio descobre suas verdadeiras motivações escusas e o expulsa sumariamente de casa." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "A sequência mostra o ciclo do parasitismo: Gastança -> Disfarce de regeneração -> Proposta interesseira -> Desmascaramento."
      },

      step3Analysis: {
        title: "Análise da Hipocrisia e Parasitismo Social",
        question: "Qual o traço de caráter que Machado de Assis mais evidencia e critica na figura de Luiz Soares?",
        options: [
          { letter: "A", text: "A ingenuidade diante dos golpes de comerciantes da Rua do Ouvidor.", correct: false },
          { letter: "B", text: "O parasitismo e a instrumentalização dos laços afetivos em prol da subsistência fútil.", correct: true },
          { letter: "C", text: "O fervor religioso reprimido pelo ambiente laico da capital.", correct: false },
          { letter: "D", text: "O patriotismo exagerado durante os conflitos de fronteira.", correct: false }
        ],
        feedbackCorrect: "Perfeito! Machado ridiculariza o jovem aristocrata improdutivo que enxerga o casamento e a família apenas como tábua de salvação financeira.",
        feedbackIncorrect: "Revise a obra: Luiz Soares não é ingênuo; ele tenta conscientemente usar a prima e o tio para financiar seu estilo de vida esbanjador."
      },

      step4Vestibular: {
        examTag: "ENEM / UERJ - Crítica Social",
        question: "A trajetória de Luiz Soares reflete uma característica marcante da prosa machadiana inicial. Trata-se de:",
        options: [
          { letter: "A", text: "A desmistificação do herói aristocrático, revelando o vazio moral por trás das aparências elegantes.", correct: true },
          { letter: "B", text: "A exaltação da natureza tropical brasileira em contraste com a corrupção da cidade.", correct: false },
          { letter: "C", text: "A defesa do determinismo biológico absoluto sobre o destino humano.", correct: false },
          { letter: "D", text: "O resgate de valores medievais e de cavalaria no cenário carioca.", correct: false }
        ],
        explanation: "Machado desconstrói o mito do jovem romântico urbano, mostrando como a futilidade da elite imperial escondia profunda degradação ética."
      }
    },

    {
      id: "mulher-de-preto",
      title: "A Mulher de Preto",
      numberText: "Conto III",
      location: "📍 Baile da Sociedade, Rio de Janeiro",
      image: "assets/mulher_de_preto.jpg",
      tags: ["Ciúme", "Segredo", "Luto Social"],
      xpValue: 150,
      summary: "Estevão apaixona-se por uma misteriosa mulher vestida de luto em um baile. O que parece um mistério romântico revela-se uma complexa teia de honra, ciúmes e segredos de família com seu amigo Meneses.",

      step1Context: {
        title: "O Mistério no Baile da Corte",
        text: "Estevão, jovem romântico e sonhador, fica fascinado por Magdalena, uma belíssima mulher vestida inteiramente de preto que se recusa a dançar nos bailes cariocas. Ao investigar seu passado, descobre que ela está ligada a Meneses, seu amigo e conselheiro.",
        quote: "— Aquele luto não era dor de finados... era o disfarce de um coração ferido pelo preconceito!"
      },

      step2Puzzle: {
        instruction: "Decifre o segredo da Mulher de Preto alinhando os fragmentos da revelação:",
        fragments: [
          { id: "f1", text: "Estevão avista Magdalena vestida de preto e apaixona-se perdidamente pela figura enigmática." },
          { id: "f2", text: "Meneses desestimula o amigo, afirmando que a mulher esconde um passado deshonroso." },
          { id: "f3", text: "Estevão descobre que Magdalena é cunhada de Meneses e vive isolada devido a calúnias morais." },
          { id: "f4", text: "Ao esclarecer os fatos, o amor triunfa sobre o julgamento apressado da sociedade." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "Acompanhe o mistério: Fascínio inicial -> Alerta do amigo -> Descoberta da verdade -> Superação das calúnias."
      },

      step3Analysis: {
        title: "Máscaras Sociais e a Falsa Moralidade",
        question: "Qual o papel das fofocas e das aparências na narrativa de 'A Mulher de Preto'?",
        options: [
          { letter: "A", text: "Não têm impacto, pois os personagens resolvem tudo com duelos de espadas.", correct: false },
          { letter: "B", text: "Funcionam como julgamento social precipitado que condena inocentes com base no decoro superficial.", correct: true },
          { letter: "C", text: "Ajudam Magdalena a enriquecer vendendo joias de luto.", correct: false },
          { letter: "D", text: "Fazem com que Estevão abandone a carreira de advogado para virar poeta solitário.", correct: false }
        ],
        feedbackCorrect: "Exato! Machado expõe como a opinião pública da corte carioca criava estigmas injustos, forçando mulheres a carregarem o 'luto social'.",
        feedbackIncorrect: "Atenção: A maledicência social é o motor da discórdia no conto, demonstrando a rigidez dos códigos morais da elite."
      },

      step4Vestibular: {
        examTag: "FUVEST - Transição Literária",
        question: "Em 'A Mulher de Preto', percebe-se a transição da prosa romântica para a fase realista de Machado de Assis porque:",
        options: [
          { letter: "A", text: "Embora haja um enredo de paixão à primeira vista, o autor disseca a psicologia do ciúme e a hipocrisia das convenções sociais.", correct: true },
          { letter: "B", text: "O livro utiliza elementos sobrenaturais e monstros folclóricos brasileiros.", correct: false },
          { letter: "C", text: "O autor abandona a língua portuguesa e escreve em latim arcaico.", correct: false },
          { letter: "D", text: "A história se passa inteiramente no meio rural do interior de Goiás.", correct: false }
        ],
        explanation: "Machado mantém a fachada do mistério romântico, mas introduz a agudeza analítica sobre as convenções e preconceitos da burguesia."
      }
    },

    {
      id: "segredo-augusta",
      title: "O Segredo de Augusta",
      numberText: "Conto IV",
      location: "📍 Salão das Laranjeiras, Rio de Janeiro",
      image: "assets/segredo_augusta.jpg",
      tags: ["Vaidade", "Falência Oculta", "Dote"],
      xpValue: 150,
      summary: "Gomes e Augusta mantêm a ilusão de opulência na sociedade carioca enquanto escondem a falência total. O casamento da filha torna-se o palco onde a vaidade vence o desespero.",

      step1Context: {
        title: "A Opulência de Fachada",
        text: "Vasconcelos e sua esposa Augusta vivem em um palacete suntuoso nas Laranjeiras, promovendo bailes faustosos. No entanto, o patrimônio da família está em ruínas. Para não perder a pose diante da aristocracia, ocultam as dívidas até o limite extremo.",
        quote: "— Prefiro a bancarrota secreta ao vexame público de vender as carruagens!"
      },

      step2Puzzle: {
        instruction: "Decifre o vocabulário e a sequência da ruína velada em 'O Segredo de Augusta':",
        fragments: [
          { id: "f1", text: "O casal ostenta luxo desmedido em bailes para manter o prestígio social perante os pares." },
          { id: "f2", text: "Em segredo, as dívidas acumuladas com credores ameaçam o confisco dos bens do lar." },
          { id: "f3", text: "Planejam o casamento da filha com um pretendente abastado para liquidar os débitos." },
          { id: "f4", text: "O segredo da penúria é mantido até o fim, mostrando a tirania da vaidade sobre a razão." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "A sequência reflete a tragédia da vaidade: Ostentação -> Ruína secreta -> Arranjo matrimonial -> Ocultação obstinada."
      },

      step3Analysis: {
        title: "A Tirania das Aparências",
        question: "O que o 'Segredo de Augusta' revela sobre o comportamento da burguesia imperial?",
        options: [
          { letter: "A", text: "A preferência pela vida simples e rural longe dos luxos da capital.", correct: false },
          { letter: "B", text: "A obsessão em parecer próspero, onde a aprovação alheia vale mais do que a segurança financeira real.", correct: true },
          { letter: "C", text: "O desejo de doar todos os bens para a construção de hospitais públicos.", correct: false },
          { letter: "D", text: "A escolha das cores das vestimentas militares dos oficiais da guarda.", correct: false }
        ],
        explanation: "Machado ridiculariza a teatralidade do cotidiano burguês, no qual viver bem significa apenas representar um papel para a plateia social."
      }
    },

    {
      id: "confissoes-viuva",
      title: "Confissões de uma Viúva Moça",
      numberText: "Conto V",
      location: "📍 Sobrado de Santa Teresa, Rio de Janeiro",
      image: "assets/confissoes_viuva.jpg",
      tags: ["Narrativa Epistolar", "Dilema Moral", "Subjetividade"],
      xpValue: 150,
      summary: "Em forma de cartas confidenciais à amiga Eugênia, Carolina relata a viuvez, a tentação de um novo amor por Jorge e a descoberta cruel sobre as intenções dos homens.",

      step1Context: {
        title: "As Cartas Íntimas de Carolina",
        text: "Após a morte de um marido com quem se casara por conveniência, a jovem Carolina refugia-se em Santa Teresa. Em correspondências secretas enviadas à amiga Eugênia, ela analisa com lucidez implacável os sentimentos contraditórios entre o duelo, o desejo e a desconfiança moral.",
        quote: "— A viuvez me deu a liberdade de pensar, mas também me revelou o egoísmo que habita nos corações masculinos..."
      },

      step2Puzzle: {
        instruction: "Ordene os trechos epistolares das confissões de Carolina:",
        fragments: [
          { id: "f1", text: "Carolina fica viúva de um casamento sem paixão e experimenta uma mistura de alívio e solidão." },
          { id: "f2", text: "Surge o jovem Jorge, que declara amor fervoroso, despertando esperanças românticas em Carolina." },
          { id: "f3", text: "Ela descobre que Jorge já a cobiçava quando o ex-marido ainda era vivo, revelando falta de ética." },
          { id: "f4", text: "Desiludida, Carolina decide preservar sua autonomia e rejeita a ilusão do amor perfeito." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "Acompanhe o amadurecimento psicológico: Viuvez -> Encanto por Jorge -> Descoberta da traição -> Escolha pela autonomia."
      },

      step3Analysis: {
        title: "A Voz Feminina e a Análise Psicológica",
        question: "Qual o diferencial da técnica narrativa adotada em 'Confissões de uma Viúva Moça'?",
        options: [
          { letter: "A", text: "A narrativa em primeira pessoa através de cartas dá acesso direto à introspecção e à desilusão da mulher do século XIX.", correct: true },
          { letter: "B", text: "É uma peça de teatro escrita inteiramente em rimas cômicas.", correct: false },
          { letter: "C", text: "O narrador é um fantasma que observa a casa do telhado.", correct: false },
          { letter: "D", text: "O conto não possui texto, apenas desenhos de paisagens cariocas.", correct: false }
        ],
        feedbackCorrect: "Excelente! O formato epistolar permite a Machado construir uma voz feminina densa, analítica e contestadora da ingenuidade romântica.",
        feedbackIncorrect: "Atenção: Trata-se de uma narrativa epistolar (em cartas) de primeira pessoa com altíssimo valor psicológico."
      },

      step4Vestibular: {
        examTag: "ENEM - Foco Narrativo & Gênero Epistolar",
        question: "A escolha da forma epistolar (cartas) em 'Confissões de uma Viúva Moça' permite ao leitor:",
        options: [
          { letter: "A", text: "Compreender a psicologia da protagonista sem o filtro moralizador de um narrador masculino da época.", correct: true },
          { letter: "B", text: "Observar dados numéricos detalhados sobre a economia do café no Império.", correct: false },
          { letter: "C", text: "Confirmar que todas as cartas de amor do século XIX terminavam em duelos fatais.", correct: false },
          { letter: "D", text: "Identificar o autor Machado de Assis como personagem ativo da história de amor.", correct: false }
        ],
        explanation: "As cartas conferem intimidade e verossimilhança psicológica, mostrando a desconstrução da heroína ingênua em prol de uma mulher consciente dos limites sociais."
      }
    },

    {
      id: "linha-reta-curva",
      title: "Linha Reta e Linha Curva",
      numberText: "Conto VI",
      location: "📍 Estrada da Gávea, Rio de Janeiro",
      image: "assets/cover.jpg",
      tags: ["Dissimulação", "Geometria Amorosa", "Estratégia"],
      xpValue: 150,
      summary: "Tito prefere a 'linha reta' (a conquista direta e franca), enquanto Diogo usa a 'linha curva' (estratégia indireta e dissimulada). Quem vencerá a disputa pela atenção de Viúva Isaura?",

      step1Context: {
        title: "A Geometria da Sedução",
        text: "Em um passeio de carruagem pela Gávea, dois amigos discutem a melhor tática para seduzir a cobiçada Viúva Isaura. Tito defende a franqueza direta (linha reta), ao passo que Diogo aposta nos arrodeios, noites de dúvida e ciúmes calculados (linha curva).",
        quote: "— Na amor como na política, a linha reta é o caminho mais longo! A linha curva encurta as distâncias da vaidade!"
      },

      step2Puzzle: {
        instruction: "Associe as estratégias de sedução aos seus respectivos caminhos geométricos:",
        fragments: [
          { id: "f1", text: "Tito declara-se abertamente a Isaura, acreditando que a sinceridade imediata é infalível." },
          { id: "f2", text: "Diogo aparenta indiferença e elogia outras damas para despertar o ciúme de Isaura." },
          { id: "f3", text: "Isaura ignora a proposta direta de Tito por achá-la previsível e sem graça." },
          { id: "f4", text: "A 'linha curva' de Diogo triunfa, provando que a alma humana aprecia o jogo da dissimulação." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "Pense na tese do conto: Declaração direta (falha) -> Dissimulação (estratégia) -> Rejeição da reta -> Vitória da curva."
      },

      step3Analysis: {
        title: "A Vitória da Dissimulação",
        question: "Qual a lição moralista e irônica que Machado transmite neste conto?",
        options: [
          { letter: "A", text: "Que a verdade nua e crua sempre vence os jogos de manipulação.", correct: false },
          { letter: "B", text: "Que o coração humano na sociedade burguesa prefere a intriga e o mistério à transparência direta.", correct: true },
          { letter: "C", text: "Que a matemática e a geometria são matérias obrigatórias no casamento.", correct: false },
          { letter: "D", text: "Que passear de carruagem na Gávea é perigoso em dias de chuva.", correct: false }
        ],
        feedbackCorrect: "Exato! Machado de Assis usa a metáfora geométrica para mostrar como o jogo social e o amor exigem estratégias de aparente desinteresse.",
        feedbackIncorrect: "Reflita: O conto demonstra a vitória da 'linha curva' (dissimulação) sobre a 'linha reta' (sinceridade direta)."
      },

      step4Vestibular: {
        examTag: "FUVEST / UNICAMP - Metáfora e Enredo",
        question: "A oposição entre 'Linha Reta' e 'Linha Curva' no conto machadiano serve para ilustrar:",
        options: [
          { letter: "A", text: "Dois modos opostos de comportamento social: a ingenuidade direta contra a astúcia manipuladora.", correct: true },
          { letter: "B", text: "O trazado das primeiras linhas de bonde elétrico no Rio de Janeiro.", correct: false },
          { letter: "C", text: "A disputa entre engenheiros e arquitetos durante a reforma da capital.", correct: false },
          { letter: "D", text: "A diferença entre o estilo poético barroco e o arcádico.", correct: false }
        ],
        explanation: "A metáfora espacial revela a profundidade com que Machado analisa os jogos de interesse e a psicologia das relações interpessoais."
      }
    },

    {
      id: "frei-simao",
      title: "Frei Simão",
      numberText: "Conto VII",
      location: "📍 Convento de Santa Teresa, Rio de Janeiro",
      image: "assets/frei_simao.jpg",
      tags: ["Tragédia", "Amor Impossível", "Loucura Psicológica"],
      xpValue: 150,
      summary: "Simão refugia-se no claustro religioso após acreditar que sua amada Helena o traíra. Anos mais tarde, a descoberta do engano o leva ao colapso mental e à morte na cela do convento.",

      step1Context: {
        title: "A Tragédia do Monge e a Perda de Helena",
        text: "Encerrando a coletânea, 'Frei Simão' apresenta o tom mais sombrio do livro. O jovem Simão, desenganado ao crer que Helena se casara com outro por ganância, professa votos perpétuos como monge. Contudo, uma carta revelará que tudo não passara de um plano cruel de terceiros.",
        quote: "— A cela do convento sepultou meu corpo, mas a dúvida destruiu minha razão..."
      },

      step2Puzzle: {
        instruction: "Recompunha os fatos trágicos da vida de Frei Simão:",
        fragments: [
          { id: "f1", text: "Simão apaixona-se por Helena, mas mentiras de familiares fazem-no crer em sua infidelidade." },
          { id: "f2", text: "Em desespero e desilusão com o mundo, ele abandona a vida civil e toma o hábito de frei." },
          { id: "f3", text: "Anos depois, descobre que Helena sempre fora fiel e morrera chamando por seu nome." },
          { id: "f4", text: "O impacto da revelação destrói a sanidade de Simão, que sucumbe à loucura na cela." }
        ],
        correctOrder: ["f1", "f2", "f3", "f4"],
        hint: "Acompanhe a tragédia: Engano cruel -> Reclusão religiosa -> Descoberta da verdade -> Colapso fatal."
      },

      step3Analysis: {
        title: "Análise do Absurdo e do Sofrimento Psíquico",
        question: "Diferente dos outros contos mais cômicos e irônicos da obra, 'Frei Simão' se destaca por:",
        options: [
          { letter: "A", text: "Apresentar um desfecho tragicômico com final feliz em um circo.", correct: false },
          { letter: "B", text: "Mergulhar na patologia da dor, na desilusão devastadora e na impotência do indivíduo perante o erro indescritível.", correct: true },
          { letter: "C", text: "Defender a expulsão de todos os monges do Brasil Imperial.", correct: false },
          { letter: "D", text: "Focar em negociações de compra e venda de escravos no porto.", correct: false }
        ],
        feedbackCorrect: "Perfeito! Frei Simão antecipa os grandes dramas psicológicos da fase madura de Machado, explorando o ciúme destrutivo e o colapso moral.",
        feedbackIncorrect: "Atenção: O conto encerra a obra em tom grave e trágico, abordando o trauma irreversível provocado pela mentira."
      },

      step4Vestibular: {
        examTag: "ENEM / FUVEST - Visão Trágica",
        question: "No conto 'Frei Simão', a instituição religiosa (o convento) funciona como:",
        options: [
          { letter: "A", text: "Um refúgio ilusório que não consegue apagar o trauma e a dor do mundo exterior.", correct: true },
          { letter: "B", text: "Um local de festas e alegrias constantes para a juventude carioca.", correct: false },
          { letter: "C", text: "Uma escola de negócios financeiros para a elite comercial.", correct: false },
          { letter: "D", text: "Um tribunal militar encarregado de julgar réus da guerra.", correct: false }
        ],
        explanation: "Para Machado, os muros do convento são impotentes para aplacar a tempestade interna da mente humana devastada pelo engano."
      }
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
      storyRef: "Luiz Soares & O Segredo de Augusta",
      examTag: "ENEM / Adaptada",
      question: "O conceito de 'máscara social' na prosa machadiana de *Contos Fluminenses* diz respeito:",
      options: [
        { letter: "A", text: "Ao uso obrigatório de disfarces nos bailes de carnaval do Rio de Janeiro.", correct: false },
        { letter: "B", text: "À necessidade dos indivíduos burgueses de parecerem virtuosos e prósperos, ocultando a ruína e o egoísmo.", correct: true },
        { letter: "C", text: "Ao teatro de marionetes popular das praças públicas cariocas.", correct: false },
        { letter: "D", text: "Às artes plásticas importadas da Europa no século XIX.", correct: false }
      ],
      explanation: "A máscara social é o artifício com o qual a elite carioca esconde suas misérias morais e econômicas para manter o status."
    }
  ];

  // Achievements Database (7 Per-Story Perfect Badges + 1 Super Achievement)
  const ACHIEVEMENTS = [
    {
      id: "ach-miss-dollar",
      title: "Mestre de Miss Dollar",
      icon: "🐾",
      desc: "Desvendou 'Miss Dollar' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("miss-dollar")
    },
    {
      id: "ach-luiz-soares",
      title: "Desmascarador de Luiz Soares",
      icon: "🎩",
      desc: "Desvendou 'Luiz Soares' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("luiz-soares")
    },
    {
      id: "ach-mulher-de-preto",
      title: "Segredo de Magdalena",
      icon: "🎭",
      desc: "Desvendou 'A Mulher de Preto' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("mulher-de-preto")
    },
    {
      id: "ach-segredo-augusta",
      title: "Vaidade Desfeita",
      icon: "💎",
      desc: "Desvendou 'O Segredo de Augusta' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("segredo-augusta")
    },
    {
      id: "ach-confissoes-viuva",
      title: "Lucidez de Carolina",
      icon: "✉️",
      desc: "Desvendou 'Confissões de uma Viúva Moça' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("confissoes-viuva")
    },
    {
      id: "ach-linha-reta-curva",
      title: "Estrategista Geométrico",
      icon: "📐",
      desc: "Desvendou 'Linha Reta e Linha Curva' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("linha-reta-curva")
    },
    {
      id: "ach-frei-simao",
      title: "Monge da Verdade",
      icon: "⛪",
      desc: "Desvendou 'Frei Simão' com 150 XP (sem errar e sem pedir dicas).",
      condition: (u) => u.perfectStories && u.perfectStories.includes("frei-simao")
    },
    {
      id: "ach-super-machadiano",
      title: "Lenda Machadiana de 1870",
      icon: "👑",
      desc: "SUPER CONQUISTA: Concluiu TODOS OS 7 CONTOS de forma impecável (150 XP em cada, 100% sem erros e sem dicas)!",
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
    btnProfessor: document.getElementById('btnProfessor'),
    btnSwitchUser: document.getElementById('btnSwitchUser'),

    // Main Sections
    storyGrid: document.getElementById('storyGrid'),
    overallProgressBar: document.getElementById('overallProgressBar'),
    overallPercentText: document.getElementById('overallPercentText'),
    btnStartBoss: document.getElementById('btnStartBoss'),

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

  function loadStudentsFromStorage() {
    try {
      const data = localStorage.getItem('CF_STUDENTS_LIST');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          STATE.studentsList = parsed.filter(s => s && typeof s === 'object' && s.name);
        }
      }
      const activeId = localStorage.getItem('CF_ACTIVE_STUDENT_ID');
      if (activeId && STATE.studentsList.length > 0) {
        const found = STATE.studentsList.find(s => s && s.id === activeId);
        if (found && found.name) {
          if (!found.completedStories) found.completedStories = [];
          if (!found.perfectStories) found.perfectStories = [];
          if (!found.xpHistory) found.xpHistory = [];
          STATE.currentUser = found;
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

    const payload = {
      action: 'saveStudent',
      id: student.id,
      name: student.name,
      studentClass: student.studentClass,
      xp: student.xp,
      completedStoriesCount: student.completedStories ? student.completedStories.length : 0,
      completedStories: (student.completedStories || []).join(', '),
      bossPassed: student.bossPassed ? 'Aprovado' : 'Pendente',
      score10: ((student.completedStories ? student.completedStories.length : 0) / STORIES.length * 10).toFixed(1),
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
      const idx = STATE.studentsList.findIndex(s => s && (s.id === remoteStd.id || (s.name && s.name.toLowerCase() === remoteStd.name.toLowerCase() && s.studentClass === remoteStd.studentClass)));
      if (idx !== -1) {
        if ((remoteStd.xp || 0) > (STATE.studentsList[idx].xp || 0)) {
          STATE.studentsList[idx] = { ...STATE.studentsList[idx], ...remoteStd };
        }
      } else {
        STATE.studentsList.push({
          id: remoteStd.id || ('std_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)),
          name: remoteStd.name,
          studentClass: remoteStd.studentClass || 'Sem Turma',
          xp: Number(remoteStd.xp) || 0,
          completedStories: Array.isArray(remoteStd.completedStories) ? remoteStd.completedStories : [],
          perfectStories: Array.isArray(remoteStd.perfectStories) ? remoteStd.perfectStories : [],
          bossPassed: !!remoteStd.bossPassed,
          xpHistory: Array.isArray(remoteStd.xpHistory) ? remoteStd.xpHistory : []
        });
      }
    });
    saveToStorage(false); // não re-sincroniza em loop
    renderProfAnalytics();
    renderRankingModal();
  }

  function saveToStorage(shouldSync = true) {
    try {
      if (STATE.currentUser && STATE.currentUser.name) {
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

    DOM.playerBar.classList.remove('hidden');
    DOM.btnSwitchUser.classList.remove('hidden');
    
    const firstName = STATE.currentUser.name.trim().split(' ')[0] || 'Aluno';
    DOM.headerPlayerName.textContent = firstName;
    DOM.headerPlayerName.title = STATE.currentUser.name;
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
      const card = document.createElement('div');
      card.className = `story-card ${isCompleted ? 'story-card-completed' : ''}`;

      card.innerHTML = `
        <div class="story-card-img-wrapper">
          <img src="${story.image}" alt="${story.title}" class="story-card-img" onerror="this.src='assets/cover.jpg'">
          <span class="story-num-badge">${story.numberText}</span>
          <span class="story-status-badge ${isCompleted ? 'status-completed' : 'status-pending'}">
            ${isCompleted ? '✓ Concluído' : '📍 Disponível'}
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
            <span class="story-xp-info">⭐ +${story.xpValue} XP</span>
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
    if (!Array.isArray(STATE.currentUser.completedStories)) {
      STATE.currentUser.completedStories = [];
    }
    const completedCount = STATE.currentUser.completedStories.length;
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
    STATE.step3Passed = false;
    STATE.step4Passed = false;

    const story = STORIES[index];
    DOM.gameStoryNumber.textContent = story.numberText;
    DOM.gameStoryTitle.textContent = story.title;
    DOM.gameStoryLocation.textContent = story.location;

    // 1. Randomize Puzzle Fragments (Ensure it doesn't start already correctly ordered)
    let shuffledPuzzle = shuffleArray(story.step2Puzzle.fragments);
    const isAlreadyCorrect = shuffledPuzzle.every((f, idx) => f.id === story.step2Puzzle.correctOrder[idx]);
    if (isAlreadyCorrect && shuffledPuzzle.length > 1) {
      [shuffledPuzzle[0], shuffledPuzzle[1]] = [shuffledPuzzle[1], shuffledPuzzle[0]];
    }
    STATE.activePuzzleOrder = shuffledPuzzle;

    // 2. Randomize Step 3 Analysis Options and re-assign A, B, C, D letters dynamically
    const shuffledStep3 = shuffleArray(story.step3Analysis.options);
    const letters = ["A", "B", "C", "D"];
    STATE.activeStep3Options = shuffledStep3.map((opt, i) => ({
      ...opt,
      letter: letters[i]
    }));

    // 3. Randomize Step 4 Vestibular Options and re-assign A, B, C, D letters dynamically
    const shuffledStep4 = shuffleArray(story.step4Vestibular.options);
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
      DOM.btnNextGame.textContent = 'Verificar Sequência →';

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <p class="puzzle-instruction">🧩 ${story.step2Puzzle.instruction}</p>
          <div class="puzzle-sequence-box" id="puzzleContainer">
            ${STATE.activePuzzleOrder.map((frag, idx) => `
              <div class="puzzle-slot-item" data-slot="${idx}" id="puzzleSlot_${idx}">
                <span class="slot-num-badge">${idx + 1}º</span>
                <div class="puzzle-fragment-item" data-id="${frag.id}">
                  <span class="fragment-text">${frag.text}</span>
                  <div class="fragment-controls">
                    <button class="btn-move" onclick="window.CF_GAME.moveFragment(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button class="btn-move" onclick="window.CF_GAME.moveFragment(${idx}, 1)" ${idx === STATE.activePuzzleOrder.length - 1 ? 'disabled' : ''}>▼</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Step 3: Análise Psicológica & Máscara Social
    else if (STATE.currentStep === 3) {
      DOM.btnHintGame.classList.add('hidden');
      DOM.btnNextGame.textContent = 'Ir para Vestibular →';

      const optionsToRender = STATE.activeStep3Options || story.step3Analysis.options;

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <h3>🎭 ${story.step3Analysis.title}</h3>
          <p class="puzzle-instruction">${story.step3Analysis.question}</p>

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

      const optionsToRender = STATE.activeStep4Options || story.step4Vestibular.options;

      DOM.gameBody.innerHTML = `
        <div class="slide-container">
          <span class="boss-badge">${story.step4Vestibular.examTag}</span>
          <p class="puzzle-instruction" style="margin-top: 10px;">${story.step4Vestibular.question}</p>

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
    if (STATE.isAnimatingPuzzle) return;
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
    const data = stepId === 'step3' ? story.step3Analysis : story.step4Vestibular;
    const activeOptions = stepId === 'step3' ? STATE.activeStep3Options : STATE.activeStep4Options;
    const optionsList = activeOptions || data.options;
    const selectedOpt = optionsList.find(o => o.letter === letter);

    if (selectedOpt) {
      feedbackBox.classList.remove('hidden', 'feedback-correct', 'feedback-incorrect');
      if (selectedOpt.correct) {
        selectedCard.classList.add('correct');
        feedbackBox.classList.add('feedback-correct');
        feedbackBox.innerHTML = `
          <div class="feedback-title">✓ Resposta Correta!</div>
          <p>${stepId === 'step3' ? data.feedbackCorrect : data.explanation}</p>
        `;
        if (stepId === 'step3') STATE.step3Passed = true;
        if (stepId === 'step4') STATE.step4Passed = true;
      } else {
        STATE.madeErrorInCurrentStory = true;
        if (stepId === 'step3') STATE.step3Passed = false;
        if (stepId === 'step4') STATE.step4Passed = false;
        selectedCard.classList.add('incorrect');
        feedbackBox.classList.add('feedback-incorrect');
        feedbackBox.innerHTML = `
          <div class="feedback-title">✗ Tente Novamente!</div>
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

    // Validate Step 2 Puzzle
    if (STATE.currentStep === 2) {
      const currentIds = STATE.activePuzzleOrder.map(f => f.id);
      const isCorrect = currentIds.every((id, idx) => id === story.step2Puzzle.correctOrder[idx]);

      if (!isCorrect) {
        STATE.madeErrorInCurrentStory = true;
        showToast("A sequência ainda não está correta! Reordene os fatos antes de avançar.", "warning");
        return;
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

      const isFirstTime = !STATE.currentUser.completedStories.includes(storyId);
      const isPerfectAttempt = !STATE.usedHintInCurrentStory && !STATE.madeErrorInCurrentStory;

      if (isFirstTime) {
        STATE.currentUser.completedStories.push(storyId);
        
        let baseXP = 100;
        if (STATE.usedHintInCurrentStory) {
          baseXP = 50;
          addXP(50, `Conclusão (c/ Dica): ${story.title}`, '📜');
        } else {
          addXP(100, `Conclusão Limpa: ${story.title}`, '📜');
        }

        if (isPerfectAttempt) {
          STATE.currentUser.perfectStories.push(storyId);
          addXP(50, `Conquista Perfeita: ${story.title}`, '🌟');
          showToast(`🏆 Conquista Perfeita! Desvendou ${story.title} sem errar e sem dicas (+50 XP)!`);
        } else {
          showToast(`🎉 Parabéns! Você concluiu ${story.title}! (+${baseXP} XP)`);
        }
      } else {
        // Repeat Play (Anti-farming protection: 0 base XP)
        if (isPerfectAttempt && !STATE.currentUser.perfectStories.includes(storyId)) {
          STATE.currentUser.perfectStories.push(storyId);
          logXPEvent(`Conquista Perfeita (Repetição): ${story.title}`, 0, 'neutral', '🌟');
          showToast(`🏆 Conquista Perfeita em ${story.title}! (Sem XP adicional em repetições)`);
        } else {
          logXPEvent(`Revisão de Conto: ${story.title}`, 0, 'neutral', '📖');
          showToast(`📖 ${story.title} revisado! (Sem XP adicional em repetições)`);
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
    if (STATE.currentStep === 2 && story.step2Puzzle.hint) {
      if (STATE.usedHintInCurrentStory) {
        alert(`💡 DICA DO NARRADOR (Já Solicitada):\n\n${story.step2Puzzle.hint}`);
        return;
      }
      STATE.usedHintInCurrentStory = true;
      showToast("💡 Dica solicitada! (-50 XP do valor deste conto)", "warning");
      alert(`💡 DICA DO NARRADOR:\n\n${story.step2Puzzle.hint}`);
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
      const xpGained = STATE.bossScore * 100;
      addXP(xpGained);
      if (STATE.bossScore >= 2) {
        STATE.currentUser.bossPassed = true;
      }
      showToast(`🎓 Simulado Concluído! Você acertou ${STATE.bossScore}/${BOSS_QUESTIONS.length} questões! (+${xpGained} XP)`);
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
    STATE.currentUser.xp = Math.max(0, (STATE.currentUser.xp || 0) + amount);
    DOM.headerPlayerXP.textContent = `${STATE.currentUser.xp} XP`;
    
    const type = amount > 0 ? (title.includes('Conquista') ? 'bonus' : 'gain') : (amount < 0 ? 'loss' : 'neutral');
    logXPEvent(title, amount, type, icon);

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
          <span class="achievement-status">${isUnlocked ? '✓ Desbloqueada! (+150 XP Perfeito)' : '🔒 Bloqueada (Exige 150 XP sem erros e sem dicas)'}</span>
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
    let list = (STATE.studentsList || []).filter(s => s && s.name);

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
      const completedCount = std.completedStories ? std.completedStories.length : 0;
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
    const student = STATE.studentsList.find(s => s && s.id === studentId);
    if (!student || !student.name) {
      showToast("Aluno não encontrado!", "error");
      return;
    }

    DOM.detailStudentName.textContent = student.name;
    DOM.detailStudentClass.textContent = `🏫 Turma: ${student.studentClass || 'Não informada'}`;
    DOM.detailStudentXP.textContent = `${student.xp || 0} XP`;

    const completedCount = student.completedStories ? student.completedStories.length : 0;
    const grade = ((completedCount / STORIES.length) * 10).toFixed(1);
    DOM.detailStudentGrade.textContent = `${grade} / 10`;
    DOM.detailStudentStoriesCount.textContent = `${completedCount} / 7`;
    DOM.detailStudentBossStatus.textContent = student.bossPassed ? '✓ Aprovado' : 'Pendente';

    // Lista de contos
    DOM.detailStudentStoriesList.innerHTML = '';
    STORIES.forEach(story => {
      const isCompleted = student.completedStories && student.completedStories.includes(story.id);
      const isPerfect = student.perfectStories && student.perfectStories.includes(story.id);

      const row = document.createElement('div');
      row.className = 'student-story-row';
      row.innerHTML = `
        <span>${story.number}. ${story.title}</span>
        <span class="badge ${isCompleted ? (isPerfect ? 'badge-gold' : 'badge-green') : 'badge-dim'}">
          ${isCompleted ? (isPerfect ? '⭐ Impecável (150 XP)' : '✓ Concluído') : '○ Pendente'}
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
    const list = (STATE.studentsList || []).filter(s => s && s.name);
    DOM.profMetricTotalStudents.textContent = list.length;

    // Calc Average Score (0 to 10 scale)
    let totalScoreSum = 0;
    let completedAllCount = 0;

    list.forEach(s => {
      const completedCount = s.completedStories ? s.completedStories.length : 0;
      const score10 = (completedCount / STORIES.length) * 10;
      totalScoreSum += score10;
      if (completedCount >= STORIES.length) completedAllCount++;
    });

    const avgScore = list.length > 0 ? (totalScoreSum / list.length).toFixed(1) : '0.0';
    DOM.profMetricAvgScore.textContent = `${avgScore} / 10`;

    const completionRate = list.length > 0 ? Math.round((completedAllCount / list.length) * 100) : 0;
    DOM.profMetricCompletion.textContent = `${completionRate}%`;

    // Table
    DOM.profTableBody.innerHTML = '';
    list.forEach(std => {
      const completedCount = std.completedStories ? std.completedStories.length : 0;
      const nota10 = ((completedCount / STORIES.length) * 10).toFixed(1);
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td><strong>${std.name}</strong></td>
        <td>${std.studentClass || 'Sem Turma'}</td>
        <td>${std.xp || 0} XP</td>
        <td><strong style="color:${nota10 >= 7 ? '#28a745' : '#ffc107'}">${nota10}</strong></td>
        <td>${completedCount} / 7 Contos</td>
        <td>${std.bossPassed ? '✓ Aprovado' : 'Pendente'}</td>
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
    const list = (STATE.studentsList || []).filter(s => s && s.name);
    if (list.length === 0) {
      showToast("Não há dados de alunos para exportar!", "warning");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nome do Aluno,Turma,Pontuacao (XP),Nota Sugerida (0-10),Contos Concluidos,Simulado Final\n";

    list.forEach(s => {
      const completedCount = s.completedStories ? s.completedStories.length : 0;
      const nota10 = ((completedCount / STORIES.length) * 10).toFixed(1);
      csvContent += `"${s.id}","${s.name}","${s.studentClass || ''}",${s.xp || 0},${nota10},"${completedCount}/7","${s.bossPassed ? 'Aprovado' : 'Pendente'}"\n`;
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
