/**
 * Conteúdo inicial do Ludo Reprodutor.
 *
 * As 93 perguntas de Sistema Reprodutor vêm dos bancos "Ludo
 * Reprodutivo", "Anatomia Funcional" e questões avulsas de imagem, todas de
 * múltipla escolha.
 *
 * ARQUIVO GERADO — para recriar, rode scripts/gen-seed.cjs.
 */
import type { Question, Subject } from './types'

export const SEED_SUBJECTS: Subject[] = [
  {
    "id": "s-reproducao",
    "name": "Sistema Reprodutor",
    "color": "198 75% 52%",
    "icon": "Baby",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]

export const SEED_QUESTIONS: Question[] = [
  {
    "id": "q-repro-001",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual é a principal função dos testículos no sistema reprodutor masculino?",
    "choices": [
      {
        "id": "q-repro-001-c1",
        "text": "Armazenar urina",
        "correct": false
      },
      {
        "id": "q-repro-001-c2",
        "text": "Produzir espermatozoides e hormônios sexuais",
        "correct": true
      },
      {
        "id": "q-repro-001-c3",
        "text": "Produzir o líquido seminal exclusivamente",
        "correct": false
      },
      {
        "id": "q-repro-001-c4",
        "text": "Transportar os espermatozoides até a uretra",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-002",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Onde ocorre principalmente a maturação dos espermatozoides?",
    "choices": [
      {
        "id": "q-repro-002-c1",
        "text": "Próstata",
        "correct": false
      },
      {
        "id": "q-repro-002-c2",
        "text": "Vesícula seminal",
        "correct": false
      },
      {
        "id": "q-repro-002-c3",
        "text": "Epidídimo",
        "correct": true
      },
      {
        "id": "q-repro-002-c4",
        "text": "Uretra",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-003",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual hormônio hipofisário atua diretamente sobre as células de Sertoli durante a espermatogênese?",
    "choices": [
      {
        "id": "q-repro-003-c1",
        "text": "LH",
        "correct": false
      },
      {
        "id": "q-repro-003-c2",
        "text": "FSH",
        "correct": true
      },
      {
        "id": "q-repro-003-c3",
        "text": "hCG",
        "correct": false
      },
      {
        "id": "q-repro-003-c4",
        "text": "Progesterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-004",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O LH, no sistema reprodutor masculino, atua principalmente sobre:",
    "choices": [
      {
        "id": "q-repro-004-c1",
        "text": "Células de Leydig",
        "correct": true
      },
      {
        "id": "q-repro-004-c2",
        "text": "Células da granulosa",
        "correct": false
      },
      {
        "id": "q-repro-004-c3",
        "text": "Ovócitos",
        "correct": false
      },
      {
        "id": "q-repro-004-c4",
        "text": "Células endometriais",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-005",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A testosterona é produzida principalmente pelas:",
    "choices": [
      {
        "id": "q-repro-005-c1",
        "text": "Células de Sertoli",
        "correct": false
      },
      {
        "id": "q-repro-005-c2",
        "text": "Células de Leydig",
        "correct": true
      },
      {
        "id": "q-repro-005-c3",
        "text": "Células da granulosa",
        "correct": false
      },
      {
        "id": "q-repro-005-c4",
        "text": "Células endometriais",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-006",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual estrutura feminina recebe normalmente o espermatozoide durante a relação sexual?",
    "choices": [
      {
        "id": "q-repro-006-c1",
        "text": "Útero",
        "correct": false
      },
      {
        "id": "q-repro-006-c2",
        "text": "Vagina",
        "correct": true
      },
      {
        "id": "q-repro-006-c3",
        "text": "Ovário",
        "correct": false
      },
      {
        "id": "q-repro-006-c4",
        "text": "Tuba uterina",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-007",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Onde ocorre normalmente a fecundação humana?",
    "choices": [
      {
        "id": "q-repro-007-c1",
        "text": "Útero",
        "correct": false
      },
      {
        "id": "q-repro-007-c2",
        "text": "Colo uterino",
        "correct": false
      },
      {
        "id": "q-repro-007-c3",
        "text": "Ampola da tuba uterina",
        "correct": true
      },
      {
        "id": "q-repro-007-c4",
        "text": "Vagina",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-008",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual órgão produz os ovócitos e os principais hormônios sexuais femininos?",
    "choices": [
      {
        "id": "q-repro-008-c1",
        "text": "Útero",
        "correct": false
      },
      {
        "id": "q-repro-008-c2",
        "text": "Ovário",
        "correct": true
      },
      {
        "id": "q-repro-008-c3",
        "text": "Vagina",
        "correct": false
      },
      {
        "id": "q-repro-008-c4",
        "text": "Tuba uterina",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-009",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual hormônio é responsável pelo pico que desencadeia a ovulação?",
    "choices": [
      {
        "id": "q-repro-009-c1",
        "text": "FSH",
        "correct": false
      },
      {
        "id": "q-repro-009-c2",
        "text": "LH",
        "correct": true
      },
      {
        "id": "q-repro-009-c3",
        "text": "Progesterona",
        "correct": false
      },
      {
        "id": "q-repro-009-c4",
        "text": "hCG",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-010",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O endométrio corresponde:",
    "choices": [
      {
        "id": "q-repro-010-c1",
        "text": "À camada muscular do útero",
        "correct": false
      },
      {
        "id": "q-repro-010-c2",
        "text": "À camada interna do útero",
        "correct": true
      },
      {
        "id": "q-repro-010-c3",
        "text": "À camada externa do ovário",
        "correct": false
      },
      {
        "id": "q-repro-010-c4",
        "text": "Ao colo do útero",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-011",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A espermatogênese ocorre principalmente:",
    "choices": [
      {
        "id": "q-repro-011-c1",
        "text": "Na próstata",
        "correct": false
      },
      {
        "id": "q-repro-011-c2",
        "text": "Nos túbulos seminíferos",
        "correct": true
      },
      {
        "id": "q-repro-011-c3",
        "text": "No epidídimo",
        "correct": false
      },
      {
        "id": "q-repro-011-c4",
        "text": "Na uretra",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-012",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A gametogênese é o processo responsável pela formação de:",
    "choices": [
      {
        "id": "q-repro-012-c1",
        "text": "Hormônios",
        "correct": false
      },
      {
        "id": "q-repro-012-c2",
        "text": "Gametas",
        "correct": true
      },
      {
        "id": "q-repro-012-c3",
        "text": "Embriões",
        "correct": false
      },
      {
        "id": "q-repro-012-c4",
        "text": "Tecidos epiteliais",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-013",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual divisão celular é fundamental para a formação de gametas haploides?",
    "choices": [
      {
        "id": "q-repro-013-c1",
        "text": "Mitose",
        "correct": false
      },
      {
        "id": "q-repro-013-c2",
        "text": "Meiose",
        "correct": true
      },
      {
        "id": "q-repro-013-c3",
        "text": "Fissão binária",
        "correct": false
      },
      {
        "id": "q-repro-013-c4",
        "text": "Brotamento",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-014",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Quantos cromossomos possui normalmente um gameta humano?",
    "choices": [
      {
        "id": "q-repro-014-c1",
        "text": "23",
        "correct": true
      },
      {
        "id": "q-repro-014-c2",
        "text": "46",
        "correct": false
      },
      {
        "id": "q-repro-014-c3",
        "text": "44",
        "correct": false
      },
      {
        "id": "q-repro-014-c4",
        "text": "92",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-015",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual hormônio é predominante na fase lútea do ciclo menstrual?",
    "choices": [
      {
        "id": "q-repro-015-c1",
        "text": "Progesterona",
        "correct": true
      },
      {
        "id": "q-repro-015-c2",
        "text": "FSH",
        "correct": false
      },
      {
        "id": "q-repro-015-c3",
        "text": "LH",
        "correct": false
      },
      {
        "id": "q-repro-015-c4",
        "text": "Testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-016",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O estrogênio é produzido principalmente pelos:",
    "choices": [
      {
        "id": "q-repro-016-c1",
        "text": "Testículos",
        "correct": false
      },
      {
        "id": "q-repro-016-c2",
        "text": "Ovários",
        "correct": true
      },
      {
        "id": "q-repro-016-c3",
        "text": "Rins",
        "correct": false
      },
      {
        "id": "q-repro-016-c4",
        "text": "Pâncreas",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-017",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A menstruação ocorre principalmente devido à:",
    "choices": [
      {
        "id": "q-repro-017-c1",
        "text": "Elevação contínua da progesterona",
        "correct": false
      },
      {
        "id": "q-repro-017-c2",
        "text": "Queda dos hormônios ovarianos",
        "correct": true
      },
      {
        "id": "q-repro-017-c3",
        "text": "Elevação do hCG",
        "correct": false
      },
      {
        "id": "q-repro-017-c4",
        "text": "Aumento da testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-018",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual estrutura transporta o ovócito do ovário em direção ao útero?",
    "choices": [
      {
        "id": "q-repro-018-c1",
        "text": "Vagina",
        "correct": false
      },
      {
        "id": "q-repro-018-c2",
        "text": "Tuba uterina",
        "correct": true
      },
      {
        "id": "q-repro-018-c3",
        "text": "Colo uterino",
        "correct": false
      },
      {
        "id": "q-repro-018-c4",
        "text": "Uretra",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-019",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O zigoto é formado a partir da união de:",
    "choices": [
      {
        "id": "q-repro-019-c1",
        "text": "Dois ovócitos",
        "correct": false
      },
      {
        "id": "q-repro-019-c2",
        "text": "Dois espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-019-c3",
        "text": "Espermatozoide e ovócito",
        "correct": true
      },
      {
        "id": "q-repro-019-c4",
        "text": "Duas células somáticas",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-020",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual hormônio é produzido pelo embrião inicial e mantém o corpo lúteo no início da gestação?",
    "choices": [
      {
        "id": "q-repro-020-c1",
        "text": "FSH",
        "correct": false
      },
      {
        "id": "q-repro-020-c2",
        "text": "LH",
        "correct": false
      },
      {
        "id": "q-repro-020-c3",
        "text": "hCG",
        "correct": true
      },
      {
        "id": "q-repro-020-c4",
        "text": "Testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-021",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual é a principal consequência da meiose durante a gametogênese?",
    "choices": [
      {
        "id": "q-repro-021-c1",
        "text": "Duplicação do número cromossômico",
        "correct": false
      },
      {
        "id": "q-repro-021-c2",
        "text": "Redução do número cromossômico",
        "correct": true
      },
      {
        "id": "q-repro-021-c3",
        "text": "Formação de células geneticamente idênticas",
        "correct": false
      },
      {
        "id": "q-repro-021-c4",
        "text": "Aumento da quantidade de DNA em todas as células",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-022",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Durante a espermatogênese, as espermatogônias são células:",
    "choices": [
      {
        "id": "q-repro-022-c1",
        "text": "Haploides",
        "correct": false
      },
      {
        "id": "q-repro-022-c2",
        "text": "Diploides",
        "correct": true
      },
      {
        "id": "q-repro-022-c3",
        "text": "Poliploides",
        "correct": false
      },
      {
        "id": "q-repro-022-c4",
        "text": "Anucleadas",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-023",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A diferenciação das espermátides em espermatozoides é denominada:",
    "choices": [
      {
        "id": "q-repro-023-c1",
        "text": "Espermatocitogênese",
        "correct": false
      },
      {
        "id": "q-repro-023-c2",
        "text": "Espermiogênese",
        "correct": true
      },
      {
        "id": "q-repro-023-c3",
        "text": "Ovogênese",
        "correct": false
      },
      {
        "id": "q-repro-023-c4",
        "text": "Capacitação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-024",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual é uma função importante das células de Sertoli?",
    "choices": [
      {
        "id": "q-repro-024-c1",
        "text": "Produzir testosterona",
        "correct": false
      },
      {
        "id": "q-repro-024-c2",
        "text": "Dar suporte às células germinativas em desenvolvimento",
        "correct": true
      },
      {
        "id": "q-repro-024-c3",
        "text": "Produzir progesterona",
        "correct": false
      },
      {
        "id": "q-repro-024-c4",
        "text": "Formar o endométrio",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-025",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A barreira hematotesticular está relacionada principalmente à atividade das:",
    "choices": [
      {
        "id": "q-repro-025-c1",
        "text": "Células de Leydig",
        "correct": false
      },
      {
        "id": "q-repro-025-c2",
        "text": "Células de Sertoli",
        "correct": true
      },
      {
        "id": "q-repro-025-c3",
        "text": "Células endometriais",
        "correct": false
      },
      {
        "id": "q-repro-025-c4",
        "text": "Células da teca",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-026",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual sequência representa corretamente o eixo hormonal reprodutivo?",
    "choices": [
      {
        "id": "q-repro-026-c1",
        "text": "Hipófise → hipotálamo → gônada",
        "correct": false
      },
      {
        "id": "q-repro-026-c2",
        "text": "Hipotálamo → hipófise → gônada",
        "correct": true
      },
      {
        "id": "q-repro-026-c3",
        "text": "Gônada → hipotálamo → hipófise",
        "correct": false
      },
      {
        "id": "q-repro-026-c4",
        "text": "Ovário → hipotálamo → testículo",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-027",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O GnRH é produzido pelo:",
    "choices": [
      {
        "id": "q-repro-027-c1",
        "text": "Ovário",
        "correct": false
      },
      {
        "id": "q-repro-027-c2",
        "text": "Hipófise",
        "correct": false
      },
      {
        "id": "q-repro-027-c3",
        "text": "Hipotálamo",
        "correct": true
      },
      {
        "id": "q-repro-027-c4",
        "text": "Útero",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-028",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O GnRH estimula a hipófise a liberar principalmente:",
    "choices": [
      {
        "id": "q-repro-028-c1",
        "text": "Estrogênio e progesterona",
        "correct": false
      },
      {
        "id": "q-repro-028-c2",
        "text": "FSH e LH",
        "correct": true
      },
      {
        "id": "q-repro-028-c3",
        "text": "Testosterona e hCG",
        "correct": false
      },
      {
        "id": "q-repro-028-c4",
        "text": "Prolactina e ocitocina",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-029",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Durante a fase folicular, o FSH atua principalmente estimulando:",
    "choices": [
      {
        "id": "q-repro-029-c1",
        "text": "Desenvolvimento dos folículos ovarianos",
        "correct": true
      },
      {
        "id": "q-repro-029-c2",
        "text": "Formação do corpo lúteo exclusivamente",
        "correct": false
      },
      {
        "id": "q-repro-029-c3",
        "text": "Implantação embrionária",
        "correct": false
      },
      {
        "id": "q-repro-029-c4",
        "text": "Contrações uterinas",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-030",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O aumento progressivo de estrogênio produzido pelo folículo dominante está relacionado diretamente à:",
    "choices": [
      {
        "id": "q-repro-030-c1",
        "text": "Preparação do endométrio",
        "correct": true
      },
      {
        "id": "q-repro-030-c2",
        "text": "Formação dos espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-030-c3",
        "text": "Degeneração imediata do corpo lúteo",
        "correct": false
      },
      {
        "id": "q-repro-030-c4",
        "text": "Produção de hCG",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-031",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "O pico de LH provoca principalmente:",
    "choices": [
      {
        "id": "q-repro-031-c1",
        "text": "Menstruação",
        "correct": false
      },
      {
        "id": "q-repro-031-c2",
        "text": "Ovulação",
        "correct": true
      },
      {
        "id": "q-repro-031-c3",
        "text": "Implantação",
        "correct": false
      },
      {
        "id": "q-repro-031-c4",
        "text": "Fecundação diretamente",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-032",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Após a ovulação, o folículo rompido transforma-se principalmente em:",
    "choices": [
      {
        "id": "q-repro-032-c1",
        "text": "Corpo lúteo",
        "correct": true
      },
      {
        "id": "q-repro-032-c2",
        "text": "Corpo albicans imediatamente",
        "correct": false
      },
      {
        "id": "q-repro-032-c3",
        "text": "Blastocisto",
        "correct": false
      },
      {
        "id": "q-repro-032-c4",
        "text": "Zigoto",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-033",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A principal função da progesterona após a ovulação é:",
    "choices": [
      {
        "id": "q-repro-033-c1",
        "text": "Estimular diretamente a produção de espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-033-c2",
        "text": "Preparar e manter o endométrio para possível implantação",
        "correct": true
      },
      {
        "id": "q-repro-033-c3",
        "text": "Induzir a ovulação seguinte",
        "correct": false
      },
      {
        "id": "q-repro-033-c4",
        "text": "Destruir o corpo lúteo",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-034",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Se não ocorrer fecundação, o corpo lúteo geralmente:",
    "choices": [
      {
        "id": "q-repro-034-c1",
        "text": "Aumenta continuamente sua produção hormonal",
        "correct": false
      },
      {
        "id": "q-repro-034-c2",
        "text": "Regride",
        "correct": true
      },
      {
        "id": "q-repro-034-c3",
        "text": "Produz hCG",
        "correct": false
      },
      {
        "id": "q-repro-034-c4",
        "text": "Transforma-se em placenta",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-035",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A regressão do corpo lúteo provoca principalmente:",
    "choices": [
      {
        "id": "q-repro-035-c1",
        "text": "Aumento de progesterona",
        "correct": false
      },
      {
        "id": "q-repro-035-c2",
        "text": "Queda de progesterona e estrogênio",
        "correct": true
      },
      {
        "id": "q-repro-035-c3",
        "text": "Aumento de hCG",
        "correct": false
      },
      {
        "id": "q-repro-035-c4",
        "text": "Pico de LH imediato",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-036",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A capacitação dos espermatozoides ocorre:",
    "choices": [
      {
        "id": "q-repro-036-c1",
        "text": "Antes de sua formação nos testículos",
        "correct": false
      },
      {
        "id": "q-repro-036-c2",
        "text": "No trato reprodutor feminino",
        "correct": true
      },
      {
        "id": "q-repro-036-c3",
        "text": "Dentro das células de Leydig",
        "correct": false
      },
      {
        "id": "q-repro-036-c4",
        "text": "Dentro da próstata",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-037",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A reação acrossômica é importante porque permite ao espermatozoide:",
    "choices": [
      {
        "id": "q-repro-037-c1",
        "text": "Produzir testosterona",
        "correct": false
      },
      {
        "id": "q-repro-037-c2",
        "text": "Atravessar as estruturas que envolvem o ovócito",
        "correct": true
      },
      {
        "id": "q-repro-037-c3",
        "text": "Formar o endométrio",
        "correct": false
      },
      {
        "id": "q-repro-037-c4",
        "text": "Produzir progesterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-038",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Um dos mecanismos que impede a entrada de múltiplos espermatozoides no ovócito é:",
    "choices": [
      {
        "id": "q-repro-038-c1",
        "text": "Reação cortical",
        "correct": true
      },
      {
        "id": "q-repro-038-c2",
        "text": "Menstruação",
        "correct": false
      },
      {
        "id": "q-repro-038-c3",
        "text": "Espermiogênese",
        "correct": false
      },
      {
        "id": "q-repro-038-c4",
        "text": "Fase folicular",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-039",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A fecundação restaura o número diploide de cromossomos porque:",
    "choices": [
      {
        "id": "q-repro-039-c1",
        "text": "O espermatozoide é diploide",
        "correct": false
      },
      {
        "id": "q-repro-039-c2",
        "text": "O ovócito é diploide",
        "correct": false
      },
      {
        "id": "q-repro-039-c3",
        "text": "Dois gametas haploides se unem",
        "correct": true
      },
      {
        "id": "q-repro-039-c4",
        "text": "O zigoto perde cromossomos",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-040",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A implantação do embrião ocorre normalmente no:",
    "choices": [
      {
        "id": "q-repro-040-c1",
        "text": "Ovário",
        "correct": false
      },
      {
        "id": "q-repro-040-c2",
        "text": "Endométrio uterino",
        "correct": true
      },
      {
        "id": "q-repro-040-c3",
        "text": "Epidídimo",
        "correct": false
      },
      {
        "id": "q-repro-040-c4",
        "text": "Colo uterino",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-041",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual estrutura é responsável por conduzir o espermatozoide do epidídimo em direção ao ducto ejaculatório?",
    "choices": [
      {
        "id": "q-repro-041-c1",
        "text": "Ducto deferente",
        "correct": true
      },
      {
        "id": "q-repro-041-c2",
        "text": "Tuba uterina",
        "correct": false
      },
      {
        "id": "q-repro-041-c3",
        "text": "Ureter",
        "correct": false
      },
      {
        "id": "q-repro-041-c4",
        "text": "Ducto lacrimal",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-042",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "As vesículas seminais contribuem para o sêmen produzindo:",
    "choices": [
      {
        "id": "q-repro-042-c1",
        "text": "Grande parte do líquido seminal rico em nutrientes",
        "correct": true
      },
      {
        "id": "q-repro-042-c2",
        "text": "Espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-042-c3",
        "text": "Testosterona",
        "correct": false
      },
      {
        "id": "q-repro-042-c4",
        "text": "Ovócitos",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-043",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A próstata contribui para o sêmen principalmente por meio da produção de:",
    "choices": [
      {
        "id": "q-repro-043-c1",
        "text": "Secreção prostática",
        "correct": true
      },
      {
        "id": "q-repro-043-c2",
        "text": "Ovócitos",
        "correct": false
      },
      {
        "id": "q-repro-043-c3",
        "text": "FSH",
        "correct": false
      },
      {
        "id": "q-repro-043-c4",
        "text": "hCG",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-044",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual evento ocorre primeiro no ciclo ovariano?",
    "choices": [
      {
        "id": "q-repro-044-c1",
        "text": "Ovulação",
        "correct": false
      },
      {
        "id": "q-repro-044-c2",
        "text": "Desenvolvimento folicular",
        "correct": true
      },
      {
        "id": "q-repro-044-c3",
        "text": "Formação do corpo lúteo",
        "correct": false
      },
      {
        "id": "q-repro-044-c4",
        "text": "Implantação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-045",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Em um ciclo menstrual típico, a ovulação ocorre aproximadamente:",
    "choices": [
      {
        "id": "q-repro-045-c1",
        "text": "No início da menstruação",
        "correct": false
      },
      {
        "id": "q-repro-045-c2",
        "text": "Próximo ao meio do ciclo",
        "correct": true
      },
      {
        "id": "q-repro-045-c3",
        "text": "No último dia do ciclo obrigatoriamente",
        "correct": false
      },
      {
        "id": "q-repro-045-c4",
        "text": "Somente após a implantação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-046",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma mulher apresenta níveis elevados de estrogênio produzido pelo folículo dominante imediatamente antes da ovulação. Qual mecanismo hormonal explica melhor a ocorrência da ovulação?",
    "choices": [
      {
        "id": "q-repro-046-c1",
        "text": "Estrogênio elevado exerce apenas feedback negativo sobre a hipófise",
        "correct": false
      },
      {
        "id": "q-repro-046-c2",
        "text": "Estrogênio elevado promove feedback positivo, favorecendo o pico de LH",
        "correct": true
      },
      {
        "id": "q-repro-046-c3",
        "text": "Progesterona elevada provoca diretamente o pico de LH",
        "correct": false
      },
      {
        "id": "q-repro-046-c4",
        "text": "hCG estimula a ovulação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-047",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma mulher apresenta um ciclo sem ovulação. Qual alteração hormonal seria mais diretamente esperada?",
    "choices": [
      {
        "id": "q-repro-047-c1",
        "text": "Ausência do pico de LH",
        "correct": true
      },
      {
        "id": "q-repro-047-c2",
        "text": "Aumento de hCG",
        "correct": false
      },
      {
        "id": "q-repro-047-c3",
        "text": "Formação antecipada da placenta",
        "correct": false
      },
      {
        "id": "q-repro-047-c4",
        "text": "Aumento permanente da progesterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-048",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Caso as células de Leydig deixassem de responder ao LH, qual consequência seria mais provável?",
    "choices": [
      {
        "id": "q-repro-048-c1",
        "text": "Aumento da produção de testosterona",
        "correct": false
      },
      {
        "id": "q-repro-048-c2",
        "text": "Redução da produção de testosterona",
        "correct": true
      },
      {
        "id": "q-repro-048-c3",
        "text": "Aumento da produção de estrogênio ovariano",
        "correct": false
      },
      {
        "id": "q-repro-048-c4",
        "text": "Aumento de progesterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-049",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Se a produção de FSH fosse significativamente reduzida em um homem, qual processo seria mais diretamente prejudicado?",
    "choices": [
      {
        "id": "q-repro-049-c1",
        "text": "Suporte à espermatogênese pelas células de Sertoli",
        "correct": true
      },
      {
        "id": "q-repro-049-c2",
        "text": "Produção de bile",
        "correct": false
      },
      {
        "id": "q-repro-049-c3",
        "text": "Formação do endométrio",
        "correct": false
      },
      {
        "id": "q-repro-049-c4",
        "text": "Ovulação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-050",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Um indivíduo apresenta obstrução bilateral dos ductos deferentes. Qual consequência é mais provável?",
    "choices": [
      {
        "id": "q-repro-050-c1",
        "text": "Ausência de produção de testosterona",
        "correct": false
      },
      {
        "id": "q-repro-050-c2",
        "text": "Impedimento do transporte dos espermatozoides até o ducto ejaculatório",
        "correct": true
      },
      {
        "id": "q-repro-050-c3",
        "text": "Interrupção da produção de espermatozoides nos testículos",
        "correct": false
      },
      {
        "id": "q-repro-050-c4",
        "text": "Ausência de produção de líquido prostático",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-051",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma alteração que prejudique severamente as células de Sertoli afetaria principalmente:",
    "choices": [
      {
        "id": "q-repro-051-c1",
        "text": "O suporte e a regulação da espermatogênese",
        "correct": true
      },
      {
        "id": "q-repro-051-c2",
        "text": "A produção de progesterona",
        "correct": false
      },
      {
        "id": "q-repro-051-c3",
        "text": "A ovulação",
        "correct": false
      },
      {
        "id": "q-repro-051-c4",
        "text": "A implantação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-052",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Considere uma mulher com níveis persistentemente baixos de progesterona após a ovulação. Qual consequência seria mais provável?",
    "choices": [
      {
        "id": "q-repro-052-c1",
        "text": "Manutenção inadequada do endométrio",
        "correct": true
      },
      {
        "id": "q-repro-052-c2",
        "text": "Aumento da produção de espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-052-c3",
        "text": "Formação de novo folículo imediatamente",
        "correct": false
      },
      {
        "id": "q-repro-052-c4",
        "text": "Aumento de hCG antes da fecundação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-053",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Se ocorrer fecundação e implantação, qual evento hormonal contribui para impedir a regressão do corpo lúteo no início da gestação?",
    "choices": [
      {
        "id": "q-repro-053-c1",
        "text": "Produção de FSH pelo embrião",
        "correct": false
      },
      {
        "id": "q-repro-053-c2",
        "text": "Produção de hCG",
        "correct": true
      },
      {
        "id": "q-repro-053-c3",
        "text": "Produção de testosterona pelo útero",
        "correct": false
      },
      {
        "id": "q-repro-053-c4",
        "text": "Produção de LH pelo endométrio",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-054",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A ausência de hCG no início de uma gestação comprometeria principalmente:",
    "choices": [
      {
        "id": "q-repro-054-c1",
        "text": "A manutenção inicial do corpo lúteo",
        "correct": true
      },
      {
        "id": "q-repro-054-c2",
        "text": "A formação dos espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-054-c3",
        "text": "O pico pré-ovulatório de LH",
        "correct": false
      },
      {
        "id": "q-repro-054-c4",
        "text": "A capacitação dos espermatozoides",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-055",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Um espermatozoide apresenta defeito grave no acrossomo. Qual etapa da reprodução seria diretamente comprometida?",
    "choices": [
      {
        "id": "q-repro-055-c1",
        "text": "Formação do corpo lúteo",
        "correct": false
      },
      {
        "id": "q-repro-055-c2",
        "text": "Penetração das estruturas que envolvem o ovócito",
        "correct": true
      },
      {
        "id": "q-repro-055-c3",
        "text": "Produção de progesterona",
        "correct": false
      },
      {
        "id": "q-repro-055-c4",
        "text": "Implantação do blastocisto",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-056",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Se a reação cortical não ocorresse adequadamente após a entrada do primeiro espermatozoide, qual seria o risco?",
    "choices": [
      {
        "id": "q-repro-056-c1",
        "text": "Ausência de ovulação",
        "correct": false
      },
      {
        "id": "q-repro-056-c2",
        "text": "Polispermia",
        "correct": true
      },
      {
        "id": "q-repro-056-c3",
        "text": "Ausência de menstruação",
        "correct": false
      },
      {
        "id": "q-repro-056-c4",
        "text": "Falha na produção de testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-057",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual alternativa representa corretamente a sequência dos principais eventos?",
    "choices": [
      {
        "id": "q-repro-057-c1",
        "text": "Ovulação → fecundação → implantação",
        "correct": true
      },
      {
        "id": "q-repro-057-c2",
        "text": "Implantação → ovulação → fecundação",
        "correct": false
      },
      {
        "id": "q-repro-057-c3",
        "text": "Fecundação → ovulação → implantação",
        "correct": false
      },
      {
        "id": "q-repro-057-c4",
        "text": "Menstruação → implantação → ovulação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-058",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma mulher apresenta níveis elevados de progesterona durante a fase lútea. Qual estrutura é a principal responsável por sua produção nesse momento?",
    "choices": [
      {
        "id": "q-repro-058-c1",
        "text": "Folículo primordial",
        "correct": false
      },
      {
        "id": "q-repro-058-c2",
        "text": "Corpo lúteo",
        "correct": true
      },
      {
        "id": "q-repro-058-c3",
        "text": "Hipófise",
        "correct": false
      },
      {
        "id": "q-repro-058-c4",
        "text": "Tuba uterina",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-059",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A queda de progesterona e estrogênio ao final de um ciclo não gestacional está diretamente relacionada a:",
    "choices": [
      {
        "id": "q-repro-059-c1",
        "text": "Menstruação",
        "correct": true
      },
      {
        "id": "q-repro-059-c2",
        "text": "Fecundação",
        "correct": false
      },
      {
        "id": "q-repro-059-c3",
        "text": "Ovulação",
        "correct": false
      },
      {
        "id": "q-repro-059-c4",
        "text": "Capacitação espermática",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-060",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Se houver bloqueio da tuba uterina, qual processo reprodutivo poderá ser diretamente afetado?",
    "choices": [
      {
        "id": "q-repro-060-c1",
        "text": "Encontro entre gametas e transporte do ovócito",
        "correct": true
      },
      {
        "id": "q-repro-060-c2",
        "text": "Produção de testosterona",
        "correct": false
      },
      {
        "id": "q-repro-060-c3",
        "text": "Produção de espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-060-c4",
        "text": "Produção de FSH",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-061",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma mulher apresenta uma alteração que impede o desenvolvimento adequado do folículo dominante. Qual evento provavelmente será prejudicado?",
    "choices": [
      {
        "id": "q-repro-061-c1",
        "text": "Pico de LH e ovulação",
        "correct": true
      },
      {
        "id": "q-repro-061-c2",
        "text": "Produção de espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-061-c3",
        "text": "Capacitação espermática",
        "correct": false
      },
      {
        "id": "q-repro-061-c4",
        "text": "Formação da próstata",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-062",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Por que a integração entre FSH e LH é essencial para o funcionamento adequado do ciclo ovariano?",
    "choices": [
      {
        "id": "q-repro-062-c1",
        "text": "Porque ambos possuem exatamente a mesma função",
        "correct": false
      },
      {
        "id": "q-repro-062-c2",
        "text": "Porque participam de etapas distintas e complementares da função ovariana",
        "correct": true
      },
      {
        "id": "q-repro-062-c3",
        "text": "Porque são produzidos pelos ovários",
        "correct": false
      },
      {
        "id": "q-repro-062-c4",
        "text": "Porque substituem o estrogênio e a progesterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-063",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual situação representa melhor a integração entre o sistema nervoso e o sistema endócrino na reprodução?",
    "choices": [
      {
        "id": "q-repro-063-c1",
        "text": "O hipotálamo libera GnRH, que regula a secreção de FSH e LH pela hipófise",
        "correct": true
      },
      {
        "id": "q-repro-063-c2",
        "text": "O útero produz FSH diretamente",
        "correct": false
      },
      {
        "id": "q-repro-063-c3",
        "text": "O testículo libera GnRH para o hipotálamo",
        "correct": false
      },
      {
        "id": "q-repro-063-c4",
        "text": "A vagina produz LH",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-064",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Durante a espermatogênese, a meiose é importante porque:",
    "choices": [
      {
        "id": "q-repro-064-c1",
        "text": "Mantém as células germinativas diploides durante toda a formação dos gametas",
        "correct": false
      },
      {
        "id": "q-repro-064-c2",
        "text": "Produz células haploides geneticamente variadas",
        "correct": true
      },
      {
        "id": "q-repro-064-c3",
        "text": "Impede qualquer variação genética",
        "correct": false
      },
      {
        "id": "q-repro-064-c4",
        "text": "Produz diretamente testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-065",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Um pesquisador observa células germinativas masculinas em diferentes estágios dentro dos túbulos seminíferos. Essa organização espacial está relacionada principalmente:",
    "choices": [
      {
        "id": "q-repro-065-c1",
        "text": "À progressão da espermatogênese",
        "correct": true
      },
      {
        "id": "q-repro-065-c2",
        "text": "Ao ciclo menstrual",
        "correct": false
      },
      {
        "id": "q-repro-065-c3",
        "text": "À implantação",
        "correct": false
      },
      {
        "id": "q-repro-065-c4",
        "text": "À formação do endométrio",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-066",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual alternativa melhor relaciona estrutura e função?",
    "choices": [
      {
        "id": "q-repro-066-c1",
        "text": "Epidídimo — maturação dos espermatozoides",
        "correct": true
      },
      {
        "id": "q-repro-066-c2",
        "text": "Ovário — produção de sêmen",
        "correct": false
      },
      {
        "id": "q-repro-066-c3",
        "text": "Útero — produção de espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-066-c4",
        "text": "Próstata — produção de ovócitos",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-067",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma alteração que impeça a implantação adequada do blastocisto afetaria diretamente:",
    "choices": [
      {
        "id": "q-repro-067-c1",
        "text": "A continuidade inicial da gestação",
        "correct": true
      },
      {
        "id": "q-repro-067-c2",
        "text": "A formação dos espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-067-c3",
        "text": "A ovulação do ciclo anterior",
        "correct": false
      },
      {
        "id": "q-repro-067-c4",
        "text": "A produção de testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-068",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Imagine que uma mulher apresente um pico normal de LH, mas o folículo não se rompa. Qual processo estaria diretamente comprometido?",
    "choices": [
      {
        "id": "q-repro-068-c1",
        "text": "Ovulação",
        "correct": true
      },
      {
        "id": "q-repro-068-c2",
        "text": "Menstruação",
        "correct": false
      },
      {
        "id": "q-repro-068-c3",
        "text": "Fecundação já ocorrida",
        "correct": false
      },
      {
        "id": "q-repro-068-c4",
        "text": "Capacitação espermática",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-069",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Qual alternativa apresenta a integração correta entre os processos reprodutivos masculino e feminino?",
    "choices": [
      {
        "id": "q-repro-069-c1",
        "text": "Espermatogênese → ejaculação → transporte espermático → capacitação → fecundação",
        "correct": true
      },
      {
        "id": "q-repro-069-c2",
        "text": "Ovulação → espermatogênese → implantação → fecundação",
        "correct": false
      },
      {
        "id": "q-repro-069-c3",
        "text": "Menstruação → espermiogênese → ovulação → implantação",
        "correct": false
      },
      {
        "id": "q-repro-069-c4",
        "text": "Fecundação → produção de espermatozoides → ovulação → menstruação",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-070",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Uma estudante afirma: \"A fecundação é um evento isolado, sem relação com o ciclo menstrual\". Qual alternativa corrige melhor essa afirmação?",
    "choices": [
      {
        "id": "q-repro-070-c1",
        "text": "A fecundação depende da sincronização entre produção/maturação dos gametas, ovulação e condições adequadas do trato reprodutor feminino",
        "correct": true
      },
      {
        "id": "q-repro-070-c2",
        "text": "A fecundação ocorre independentemente da ovulação",
        "correct": false
      },
      {
        "id": "q-repro-070-c3",
        "text": "A fecundação ocorre sempre durante a menstruação",
        "correct": false
      },
      {
        "id": "q-repro-070-c4",
        "text": "A fecundação depende exclusivamente da testosterona",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-071",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(UFPA) Uma mulher com 40 anos ou mais tem a maior probabilidade de gerar uma criança com defeitos congênitos do que uma mulher com 20 anos. Mas um homem com 20 ou mais de 40 anos tem a mesmas chances de gerar uma criança normal. Esta diferença deve-se ao fato de:",
    "choices": [
      {
        "id": "q-repro-071-c1",
        "text": "Os ovócitos primários serem produzidos apenas no período embrionário e os espermatócitos primários produzidos continuamente a partir da puberdade.",
        "correct": true
      },
      {
        "id": "q-repro-071-c2",
        "text": "Os ovócitos primários serem produzidos apenas durante a puberdade e os espermatócitos primários produzidos constantemente ao longo da vida.",
        "correct": false
      },
      {
        "id": "q-repro-071-c3",
        "text": "Tanto os ovócitos primários quanto os espermatócitos primários formarem-se apenas na vida embrionária, sendo os espermatócitos produzidos em maior quantidade.",
        "correct": false
      },
      {
        "id": "q-repro-071-c4",
        "text": "Tanto os ovócitos primários quanto espermatócitos primários formarem-se apenas durante a puberdade, sendo os espermatócitos produzidos em maior quantidade.",
        "correct": false
      },
      {
        "id": "q-repro-071-c5",
        "text": "Os ovócitos primários serem produzidos constantemente ao longo da vida e os espermatócitos primários produzidos apenas no período embrionário.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-072",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(UFMT) Assinale a alternativa correta:",
    "choices": [
      {
        "id": "q-repro-072-c1",
        "text": "Gametogênese é um processo de formação de células destinadas à reprodução, onde se verifica apenas a divisão mitótica.",
        "correct": false
      },
      {
        "id": "q-repro-072-c2",
        "text": "Na espermatogênese, cada espermatogônia dá origem a um espermatozoide fértil e três glóbulos polares não-funcionais.",
        "correct": false
      },
      {
        "id": "q-repro-072-c3",
        "text": "Na ovogênese formam-se quatro óvulos férteis a partir de cada ovogônia.",
        "correct": false
      },
      {
        "id": "q-repro-072-c4",
        "text": "Na espécie humana, a ovogênese completa-se apenas quando ocorre a penetração do espermatozoide no ovócito II. O ovário libera o ovócito II que penetra no oviduto (Trompas de Falópio) e só completa a segunda divisão meiótica quando fecundado pelo espermatozoide.",
        "correct": true
      },
      {
        "id": "q-repro-072-c5",
        "text": "Os gametas são células diploides que têm a função de garantir a reprodução das espécies.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-073",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(AOCP) As células germinativas e indiferenciadas que são precursoras dos espermatozoides são chamadas de:",
    "choices": [
      {
        "id": "q-repro-073-c1",
        "text": "espermatócitos primários.",
        "correct": false
      },
      {
        "id": "q-repro-073-c2",
        "text": "espermatócitos secundários.",
        "correct": false
      },
      {
        "id": "q-repro-073-c3",
        "text": "espermatogônia.",
        "correct": true
      },
      {
        "id": "q-repro-073-c4",
        "text": "espermatogêneses.",
        "correct": false
      },
      {
        "id": "q-repro-073-c5",
        "text": "espermátides.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-074",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(IDCAP) Analise as afirmações sobre gametogênese:<br><br>(__) A gametogênese envolve os dois tipos de divisões celulares, sendo a mitose e a meiose. A mitose é responsável pela redução da quantidade do material genético de diploide para haploide. Já a meiose é responsável pelo aumento da produção de células-mãe.<br>(__) As células de Sertoli fagocitam e digerem, através dos lisossomos, os restos citoplasmáticos que se desprendem durante a espermiogênese (o corpo residual), liberando os espermatozoides.<br>(__) O oócito secundário, gameta feminino produzido pelo ovário, é viável por, no máximo, 24h. Se a fertilização não se realiza, o oócito secundário sofre autólise e é reabsorvido pelo trato reprodutor feminino.<br><br>Marque verdadeiro (V) ou falso (F), na ordem:",
    "choices": [
      {
        "id": "q-repro-074-c1",
        "text": "V, F, V.",
        "correct": false
      },
      {
        "id": "q-repro-074-c2",
        "text": "F, V, V.",
        "correct": true
      },
      {
        "id": "q-repro-074-c3",
        "text": "F, V, F.",
        "correct": false
      },
      {
        "id": "q-repro-074-c4",
        "text": "V, V, F.",
        "correct": false
      },
      {
        "id": "q-repro-074-c5",
        "text": "V, F, F.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-075",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(IBADE) Durante a espermatogênese humana, considerando que durante o processo se formaram 250 espermatócitos I, tem-se a formação de:",
    "choices": [
      {
        "id": "q-repro-075-c1",
        "text": "250 espermatócitos II, 500 espermátides e 500 espermatozoides.",
        "correct": false
      },
      {
        "id": "q-repro-075-c2",
        "text": "250 espermatócitos II, 500 espermátides e 1000 espermatozoides.",
        "correct": false
      },
      {
        "id": "q-repro-075-c3",
        "text": "500 espermatócitos II, 500 espermátides e 1000 espermatozoides.",
        "correct": false
      },
      {
        "id": "q-repro-075-c4",
        "text": "500 espermatócitos II, 1000 espermátides e 1000 espermatozoides.",
        "correct": true
      },
      {
        "id": "q-repro-075-c5",
        "text": "1000 espermatócitos II, 1000 espermátides e 2000 espermatozoides.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-076",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(Enade / Concurso Superior - Adaptada) Durante o processo de espermatogênese humana, as células germinativas sofrem diversas transformações até originar os gametas maduros. Analise as afirmativas abaixo sobre a ploidia e as etapas celulares desse processo:<br><br>I. As espermatogônias são células diploides (2n) que se multiplicam por mitose.<br>II. O espermatócito primário (ou de primeira ordem) sofre a primeira divisão da meiose, originando dois espermatócitos secundários haploides (n).<br>III. A espermiogênese é a etapa em que ocorre a divisão reducional (meiose I), transformando espermátides em espermatozoides.<br>IV. Cada espermatócito primário resulta, ao final de todo o processo, em quatro espermatozoides funcionalmente viáveis.<br><br>Estão corretas apenas:",
    "choices": [
      {
        "id": "q-repro-076-c1",
        "text": "I, II e IV.",
        "correct": true
      },
      {
        "id": "q-repro-076-c2",
        "text": "I e III.",
        "correct": false
      },
      {
        "id": "q-repro-076-c3",
        "text": "II, III e IV.",
        "correct": false
      },
      {
        "id": "q-repro-076-c4",
        "text": "I, II e III.",
        "correct": false
      },
      {
        "id": "q-repro-076-c5",
        "text": "Apenas a IV.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-077",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(Residência / Processo Seletivo Superior) No que diz respeito à regulação hormonal e ao microambiente dos túbulos seminíferos durante a espermatogênese humana, assinale a alternativa correta:",
    "choices": [
      {
        "id": "q-repro-077-c1",
        "text": "As células de Leydig são responsáveis pela sustentação mecânica e nutrição direta das espermátides, além de produzirem a proteína ligadora de andrógeno (ABP).",
        "correct": false
      },
      {
        "id": "q-repro-077-c2",
        "text": "O FSH (hormônio folículo-estimulante) atua diretamente sobre as células de Sertoli, estimulando a produção de ABP, o que mantém altas concentrações locais de testosterona essenciais para a espermatogênese.",
        "correct": true
      },
      {
        "id": "q-repro-077-c3",
        "text": "O processo de espermatogênese inicia-se na fase embrionária e sofre pausas prolongadas na meiose I até a chegada da puberdade.",
        "correct": false
      },
      {
        "id": "q-repro-077-c4",
        "text": "A ausência completa de LH impede a espermatogênese unicamente por bloquear a mitose das espermatogônias basais, sem interferir nas células de Leydig.",
        "correct": false
      },
      {
        "id": "q-repro-077-c5",
        "text": "Os espermatócitos secundários realizam mitose equacional para duplicar o material genético antes da diferenciação final.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-078",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(Fuvest / Bioquímica e Citologia da Reprodução - Nível Avançado) Durante a maturação dos gametas masculinos, ocorrem drásticas alterações no citoplasma e no núcleo celular. Sobre as modificações estruturais que ocorrem especificamente na espermiogênese, é correto afirmar que:",
    "choices": [
      {
        "id": "q-repro-078-c1",
        "text": "Ocorre a condensação máxima da cromatina nuclear com substituição de histonas por protaminas, inativando transicionalmente o DNA, e formação do acrossomo a partir do complexo de Golgi.",
        "correct": true
      },
      {
        "id": "q-repro-078-c2",
        "text": "O núcleo celular aumenta de volume consideravelmente para acomodar organelas extras sintetizadas durante a meiose II.",
        "correct": false
      },
      {
        "id": "q-repro-078-c3",
        "text": "O centríolo distal degenera completamente, impedindo que o gameta apresente qualquer tipo de mobilidade futura.",
        "correct": false
      },
      {
        "id": "q-repro-078-c4",
        "text": "As mitocôndrias dispersam-se aleatoriamente pela cabeça do espermatozoide para fornecer energia de uso imediato ao acrossomo.",
        "correct": false
      },
      {
        "id": "q-repro-078-c5",
        "text": "O excesso de citoplasma celular é reciclado internamente pelo núcleo, transformando-se no flagelo locomotor.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-079",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(FCC-SP) Na espécie humana, após a fecundação, verifica-se a suspensão da menstruação porque:",
    "choices": [
      {
        "id": "q-repro-079-c1",
        "text": "a placenta em formação produz um hormônio que mantém o corpo-lúteo funcionante.",
        "correct": true
      },
      {
        "id": "q-repro-079-c2",
        "text": "a hipófise, estimulada pelo corpo-lúteo, passa a produzir gonadotrofina.",
        "correct": false
      },
      {
        "id": "q-repro-079-c3",
        "text": "o nível de estrógeno e progesterona do sangue é mantido pelos folículos ovarianos em desenvolvimento.",
        "correct": false
      },
      {
        "id": "q-repro-079-c4",
        "text": "a hipófise não libera o hormônio folículo estimulante devido ao baixo nível de estrógeno no sangue.",
        "correct": false
      },
      {
        "id": "q-repro-079-c5",
        "text": "a membrana de fertilização do óvulo, formada após a penetração do espermatozoide, produz hormônio luteinizante.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-080",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Um método anticoncepcional muito conhecido pelas mulheres é a tabelinha, que consiste na abstinência sexual em períodos próximos aos dias da ovulação. Levando em consideração que um ciclo tem 28 dias, quando ocorrerá a liberação do óvulo?",
    "choices": [
      {
        "id": "q-repro-080-c1",
        "text": "Em torno do primeiro dia do ciclo.",
        "correct": false
      },
      {
        "id": "q-repro-080-c2",
        "text": "Em torno do sétimo dia do ciclo.",
        "correct": false
      },
      {
        "id": "q-repro-080-c3",
        "text": "Em torno do décimo quarto dia do ciclo.",
        "correct": true
      },
      {
        "id": "q-repro-080-c4",
        "text": "Em torno do vigésimo dia do ciclo.",
        "correct": false
      },
      {
        "id": "q-repro-080-c5",
        "text": "Em torno do vigésimo oitavo dia do ciclo.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-081",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A menstruação é um processo em que ocorre o desprendimento do endométrio e sua eliminação, junto ao sangue, através da vagina. Esse processo ocorre quando os níveis:",
    "choices": [
      {
        "id": "q-repro-081-c1",
        "text": "de LH aumentam e FSH diminuem.",
        "correct": false
      },
      {
        "id": "q-repro-081-c2",
        "text": "de LH e FSH aumentam.",
        "correct": false
      },
      {
        "id": "q-repro-081-c3",
        "text": "de progesterona e estrógeno diminuem.",
        "correct": true
      },
      {
        "id": "q-repro-081-c4",
        "text": "de progesterona e estrógeno aumentam.",
        "correct": false
      },
      {
        "id": "q-repro-081-c5",
        "text": "de progesterona aumentam e estrógeno diminuem.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-082",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Sobre a variação dos hormônios do ciclo menstrual, marque a alternativa correta:",
    "choices": [
      {
        "id": "q-repro-082-c1",
        "text": "O aumento dos níveis de estrógeno está relacionado com a diminuição do endométrio.",
        "correct": false
      },
      {
        "id": "q-repro-082-c2",
        "text": "O aumento do índice de estrógeno faz com que ocorra o aumento da secreção de FSH e LH.",
        "correct": true
      },
      {
        "id": "q-repro-082-c3",
        "text": "Após a ovulação, ocorre uma diminuição nos níveis de progesterona.",
        "correct": false
      },
      {
        "id": "q-repro-082-c4",
        "text": "Altos níveis de progesterona e estrógeno fazem com que ocorra a liberação do ovócito secundário.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-083",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Durante o ciclo menstrual, diversas alterações ocorrem no endométrio a fim de que ele esteja preparado para receber o embrião. O aumento da espessura, de vasos sanguíneos e glândulas nessa região está relacionado com os níveis de:",
    "choices": [
      {
        "id": "q-repro-083-c1",
        "text": "progesterona.",
        "correct": false
      },
      {
        "id": "q-repro-083-c2",
        "text": "LH.",
        "correct": false
      },
      {
        "id": "q-repro-083-c3",
        "text": "FSH.",
        "correct": false
      },
      {
        "id": "q-repro-083-c4",
        "text": "estrógeno.",
        "correct": true
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-084",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "No eixo hipotálamo-hipófise-adrenal (HPA), a regulação da secreção de cortisol envolve mecanismos clássicos de feedback negativo. Contudo, sob condições de estresse crônico grave ou inflamação sistêmica persistente, certos mediadores podem alterar a dinâmica do eixo. Qual das seguintes afirmativas descreve corretamente um mecanismo não convencional de modulação desse eixo durante respostas inflamatórias sistêmicas?",
    "choices": [
      {
        "id": "q-repro-084-c1",
        "text": "O cortisol atua de forma parácrina na adeno-hipófise aumentando a expressão de receptores mineralocorticoides, o que amplifica a sinalização do ACTH de maneira independente do CRH.",
        "correct": false
      },
      {
        "id": "q-repro-084-c2",
        "text": "Citocinas pró-inflamatórias (como IL-1, IL-6 e TNF-alfa) podem contornar o feedback negativo clássico dos glicocorticoides, estimulando diretamente os neurônios secretores de CRH e a liberação de ACTH.",
        "correct": true
      },
      {
        "id": "q-repro-084-c3",
        "text": "O feedback ultracurto do ACTH sobre os neurônios hipotalâmicos ocorre por retrotransporte axonal retrógrado, inibindo diretamente a transcrição do gene POMC no hipotálamo.",
        "correct": false
      },
      {
        "id": "q-repro-084-c4",
        "text": "A supressão do eixo HPA decorre exclusivamente da regulação positiva de receptores de progesterona intracelulares nas células da zona fasciculada da adrenal.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-085",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "A sinalização da insulina é iniciada pela autofosforilação de domínios tirosina-cinase do seu receptor (INSR), recrutando proteínas do substrato do receptor de insulina (IRS). Qual dos seguintes eventos a jusante (downstream) dessa via é diretamente responsável pela inibição aguda da gliconeogênese hepática?",
    "choices": [
      {
        "id": "q-repro-085-c1",
        "text": "Ativação da glicogênio fosforilase via fosforilação dependente de Ca2+/calmodulina no citossol dos hepatócitos.",
        "correct": false
      },
      {
        "id": "q-repro-085-c2",
        "text": "Aumento da expressão do gene PEPCK mediado pela fosforilação direta da proteína FoxO1 na matriz mitocondrial.",
        "correct": false
      },
      {
        "id": "q-repro-085-c3",
        "text": "Translocação de GLUT2 para a membrana plasmática dos hepatócitos mediada por AMPc e ativação da PKA.",
        "correct": false
      },
      {
        "id": "q-repro-085-c4",
        "text": "Fosforilação e exclusão nuclear do fator de transcrição FoxO1 mediada pela via da Akt, impedindo a transcrição de genes gliconeogênicos como PEPCK e G6PC.",
        "correct": true
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-086",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Os hormônios esteroides exercem seus efeitos genômicos primários ligando-se a receptores intracelulares/nucleares. Considerando a dinâmica estrutural e molecular do Receptor de Glicocorticoides (GR) não ativado versus ativado, qual evento ocorre imediatamente após a ligação do hormônio e dissociação das proteínas chaperonas (como a Hsp90)?",
    "choices": [
      {
        "id": "q-repro-086-c1",
        "text": "Inserção imediata do complexo hormônio-receptor nas membranas mitocondriais para desacoplar a cadeia respiratória sem necessidade de regulação transcricional.",
        "correct": false
      },
      {
        "id": "q-repro-086-c2",
        "text": "Fosforilação terminal mediada por adenilato-ciclases de membrana, seguida de degradação proteassomal imediata no citoplasma.",
        "correct": false
      },
      {
        "id": "q-repro-086-c3",
        "text": "Dimerização do receptor, translocação para o núcleo, reconhecimento de elementos de resposta a hormônios (HREs) no DNA e recrutamento de cofatores (como coativadores com atividade de HAT).",
        "correct": true
      },
      {
        "id": "q-repro-086-c4",
        "text": "Associação a receptores acoplados à proteína G de membrana, gerando uma onda de íons cálcio intracelular via canais IP3.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-087",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Na regulação fina da calcemia e do remodelamento ósseo, o paratormônio (PTH) atua para elevar o cálcio iônico extracelular. No microambiente ósseo, o PTH induz a reabsorção por meio de sinalização parácrina entre as células do estroma/osteoblastos e os precursores de osteoclastos. Qual alteração molecular exata na superfície dos osteoblastos mediada pelo PTH desencadeia a diferenciação osteoclástica?",
    "choices": [
      {
        "id": "q-repro-087-c1",
        "text": "Aumento expressivo na secreção de osteoprotegerina (OPG), que neutraliza as vias apoptóticas dos osteoclastos maduros.",
        "correct": false
      },
      {
        "id": "q-repro-087-c2",
        "text": "Inibição direta da expressão de RANKL e estímulo de fatores anti-osteoclastogênicos como a esclerostina.",
        "correct": false
      },
      {
        "id": "q-repro-087-c3",
        "text": "Indução da translocação do complexo Calcitonina-Receptor para o núcleo das células estromais da medula óssea.",
        "correct": false
      },
      {
        "id": "q-repro-087-c4",
        "text": "Redução da síntese de osteoprotegerina (OPG) e forte indução da expressão do ligante de RANK (RANKL) na membrana do osteoblasto.",
        "correct": true
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-088",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Hormônios como a angiotensina II e a vasopressina (através dos receptores V1) exercem seus efeitos biológicos interagindo com receptores acoplados à proteína Gq (GPCRs). Qual é a sequência inicial correta de eventos intracelulares deflagrada diretamente pela ativação da subunidade Gq alfa?",
    "choices": [
      {
        "id": "q-repro-088-c1",
        "text": "Ativação da fosfolipase C-beta (PLC-beta), que cliva o fosfatidilinositol 4,5-bifosfato (PIP2) em inositol trifosfato (IP3) e diacilglicerol (DAG); o IP3 mobiliza cálcio do retículo endoplasmático e o DAG ativa a PKC.",
        "correct": true
      },
      {
        "id": "q-repro-088-c2",
        "text": "Inibição direta da adenilato-ciclase, queda abrupta dos níveis de AMPc citossólico e desativação total da proteína-cinase A (PKA).",
        "correct": false
      },
      {
        "id": "q-repro-088-c3",
        "text": "Recrutamento de proteínas adaptadoras Grb2 e ativação direta da via das MAP-cinases por trans-fosforilação de domínios tirosina intrínsecos do GPCR.",
        "correct": false
      },
      {
        "id": "q-repro-088-c4",
        "text": "Estímulo da guanilato-ciclase solúvel com aumento espetacular de GMPc e relaxamento imediato da musculatura lisa vascular.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-089",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(Formato Residência / Nível Superior) Sobre a dinâmica hormonal e os eventos que envolvem a ovulação no ciclo menstrual humano, é correto afirmar que:",
    "choices": [
      {
        "id": "q-repro-089-c1",
        "text": "A fase lútea do ciclo é caracterizada por níveis persistentemente baixos de progesterona.",
        "correct": false
      },
      {
        "id": "q-repro-089-c2",
        "text": "A ovulação ocorre tipicamente entre 10 a 12 horas após o pico máximo de LH e cerca de 24 a 36 horas após o início da elevação dos níveis de estradiol.",
        "correct": true
      },
      {
        "id": "q-repro-089-c3",
        "text": "O hipotálamo é a estrutura diretamente responsável pela síntese e secreção maciça de FSH e LH na circulação sistêmica.",
        "correct": false
      },
      {
        "id": "q-repro-089-c4",
        "text": "O folículo dominante selecionado secreta baixas quantidades de estrogênio, impedindo qualquer feedback positivo sobre o eixo.",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "hard",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-090",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "(Prefeitura / Nível Superior - Ciências) \"Após a ovulação, o folículo ovariano rompido e a teca formam dobras que, sob a influência do hormônio luteinizante (LH), se transformam em corpo lúteo, altamente responsável por secretar hormônios fundamentais para a implantação.\" Um dos principais hormônios secretados pelo corpo lúteo, que induz as glândulas do endométrio a se tornarem secretoras e prepara o útero para a nidação, é o(a):",
    "choices": [
      {
        "id": "q-repro-090-c1",
        "text": "FSH (Hormônio Folículo-Estimulante)",
        "correct": false
      },
      {
        "id": "q-repro-090-c2",
        "text": "hCG (Gonadotrofina Coriônica Humana)",
        "correct": false
      },
      {
        "id": "q-repro-090-c3",
        "text": "GnRH (Hormônio Liberador de Gonadotrofina)",
        "correct": false
      },
      {
        "id": "q-repro-090-c4",
        "text": "Progesterona",
        "correct": true
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-091",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "É muito comum em textos leigos e de divulgação científica a utilização do termo \"óvulo\" para se referir à célula reprodutiva feminina liberada no momento da ovulação. Do ponto de vista embriológico e citológico estrito, qual é a célula efetivamente liberada pelo ovário durante o processo ovulatório humano?",
    "choices": [
      {
        "id": "q-repro-091-c1",
        "text": "Ovogônia",
        "correct": false
      },
      {
        "id": "q-repro-091-c2",
        "text": "Ovócito primário travado em prófase I",
        "correct": false
      },
      {
        "id": "q-repro-091-c3",
        "text": "Ovócito secundário estacionado em metáfase II",
        "correct": true
      },
      {
        "id": "q-repro-091-c4",
        "text": "Óvulo maduro e fecundado",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "medium",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-092",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "Alguns órgãos que compõem o sistema reprodutor masculino são:",
    "choices": [
      {
        "id": "q-repro-092-c1",
        "text": "uretra, pênis e vesícula seminal",
        "correct": true
      },
      {
        "id": "q-repro-092-c2",
        "text": "próstata, pênis e tubas uterinas",
        "correct": false
      },
      {
        "id": "q-repro-092-c3",
        "text": "testículos, pênis e vesícula",
        "correct": false
      },
      {
        "id": "q-repro-092-c4",
        "text": "canais deferentes, esperma e epidídimo",
        "correct": false
      },
      {
        "id": "q-repro-092-c5",
        "text": "epidídimo, canais deferentes, sêmen",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "q-repro-093",
    "subjectId": "s-reproducao",
    "type": "multiple_choice",
    "prompt": "No sistema reprodutor masculino, a próstata é uma glândula localizada sob a bexiga que tem como função",
    "choices": [
      {
        "id": "q-repro-093-c1",
        "text": "produzir os espermatozoides",
        "correct": false
      },
      {
        "id": "q-repro-093-c2",
        "text": "produzir a urina",
        "correct": false
      },
      {
        "id": "q-repro-093-c3",
        "text": "produzir o sêmen",
        "correct": false
      },
      {
        "id": "q-repro-093-c4",
        "text": "produzir o líquido prostático",
        "correct": true
      },
      {
        "id": "q-repro-093-c5",
        "text": "produzir o líquido seminal",
        "correct": false
      }
    ],
    "answerText": "",
    "explanation": "",
    "difficulty": "easy",
    "tags": [],
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
