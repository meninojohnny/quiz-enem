import { describe, expect, it } from 'vitest'
import { detectFormat, parseCsv, parseImportFile, splitCsvLine } from './importers'

describe('splitCsvLine', () => {
  it('separa campos simples', () => {
    expect(splitCsvLine('a,b,c')).toEqual(['a', 'b', 'c'])
  })

  it('respeita vírgula dentro de aspas', () => {
    expect(splitCsvLine('"a,b",c')).toEqual(['a,b', 'c'])
  })

  it('desfaz aspas duplas escapadas', () => {
    expect(splitCsvLine('"diz ""oi""",b')).toEqual(['diz "oi"', 'b'])
  })

  it('preserva campos vazios', () => {
    expect(splitCsvLine('a,,c')).toEqual(['a', '', 'c'])
  })
})

describe('detectFormat', () => {
  it('reconhece backup completo do app', () => {
    expect(detectFormat({ version: 1, subjects: [], questions: [], attempts: [] })).toBe('backup')
  })

  it('reconhece o formato antigo do perguntas-ludo', () => {
    expect(detectFormat([{ pergunta: 'X', alternativas: [], resposta: 'Y' }])).toBe('legacy')
  })

  it('reconhece lista de perguntas no formato novo', () => {
    expect(detectFormat([{ prompt: 'X', type: 'open', choices: [] }])).toBe('questions')
  })

  it('devolve desconhecido para lixo', () => {
    expect(detectFormat({ foo: 1 })).toBe('unknown')
    expect(detectFormat([])).toBe('unknown')
  })
})

describe('parseImportFile — formato antigo', () => {
  const legacy = JSON.stringify([
    {
      pergunta: 'O sistema endócrino é composto por:',
      alternativas: ['Glândulas que secretam hormônios', 'Órgãos nervosos'],
      resposta: 'Glândulas que secretam hormônios',
      respondida: false,
    },
    {
      pergunta: 'Explique o feedback negativo.',
      alternativas: [],
      resposta: '<b>Reduz</b> o estímulo inicial.',
      respondida: true,
    },
  ])

  it('converte alternativas marcando a correta pelo texto da resposta', () => {
    const { questions, errors } = parseImportFile(legacy, 'perguntas.json', 's1')
    expect(errors).toEqual([])
    expect(questions[0].type).toBe('multiple_choice')
    expect(questions[0].choices.map((c) => c.correct)).toEqual([true, false])
    expect(questions[0].subjectId).toBe('s1')
  })

  it('converte pergunta sem alternativas em discursiva', () => {
    const { questions } = parseImportFile(legacy, 'perguntas.json', 's1')
    expect(questions[1].type).toBe('open')
    expect(questions[1].answerText).toBe('<b>Reduz</b> o estímulo inicial.')
    expect(questions[1].choices).toEqual([])
  })

  it('descarta o flag respondida — histórico agora vive em tentativas', () => {
    const { questions } = parseImportFile(legacy, 'perguntas.json', 's1')
    expect(questions[1]).not.toHaveProperty('respondida')
  })

  it('acusa erro quando a resposta não bate com nenhuma alternativa', () => {
    const broken = JSON.stringify([
      { pergunta: 'P', alternativas: ['A', 'B'], resposta: 'C' },
    ])
    const { questions, errors } = parseImportFile(broken, 'x.json', 's1')
    expect(questions).toHaveLength(0)
    expect(errors[0].message).toMatch(/nenhuma alternativa/i)
  })

  it('acusa erro em pergunta sem enunciado', () => {
    const broken = JSON.stringify([{ pergunta: '   ', alternativas: [], resposta: 'R' }])
    expect(parseImportFile(broken, 'x.json', 's1').errors[0].message).toMatch(/enunciado/i)
  })
})

describe('parseCsv', () => {
  it('importa múltipla escolha com índices de corretas', () => {
    const csv = [
      'pergunta,tipo,alternativas,corretas,resposta,explicacao,dificuldade,tags',
      'Qual é a capital?,multipla,Brasília|Rio|São Paulo,1,,A capital é Brasília,facil,geografia|basico',
    ].join('\n')
    const { questions, errors } = parseCsv(csv, 's1')
    expect(errors).toEqual([])
    expect(questions[0]).toMatchObject({
      type: 'multiple_choice',
      difficulty: 'easy',
      tags: ['geografia', 'basico'],
    })
    expect(questions[0].choices.map((c) => c.correct)).toEqual([true, false, false])
  })

  it('aceita várias corretas', () => {
    const csv = ['pergunta,alternativas,corretas', 'P,A|B|C,1|3'].join('\n')
    const { questions } = parseCsv(csv, 's1')
    expect(questions[0].choices.map((c) => c.correct)).toEqual([true, false, true])
  })

  it('aceita a correta pelo texto, como no formato antigo', () => {
    const csv = ['pergunta,alternativas,corretas', 'P,A|B|C,B'].join('\n')
    const { questions } = parseCsv(csv, 's1')
    expect(questions[0].choices.map((c) => c.correct)).toEqual([false, true, false])
  })

  it('infere discursiva quando não há alternativas', () => {
    const csv = ['pergunta,resposta', 'Explique X,Porque sim'].join('\n')
    const { questions } = parseCsv(csv, 's1')
    expect(questions[0]).toMatchObject({ type: 'open', answerText: 'Porque sim', choices: [] })
  })

  it('monta verdadeiro/falso a partir do tipo vf', () => {
    const csv = ['pergunta,tipo,resposta', 'A Terra é redonda,vf,verdadeiro'].join('\n')
    const { questions } = parseCsv(csv, 's1')
    expect(questions[0].type).toBe('true_false')
    expect(questions[0].choices).toHaveLength(2)
    expect(questions[0].choices[0]).toMatchObject({ text: 'Verdadeiro', correct: true })
  })

  it('aceita cabeçalho com acento e caixa alta', () => {
    const csv = ['Pergunta,Explicação', 'P,E'].join('\n')
    const { questions, errors } = parseCsv(csv, 's1')
    expect(errors).toEqual([])
    expect(questions[0].explanation).toBe('E')
  })

  it('reporta a linha do erro, contando o cabeçalho', () => {
    const csv = ['pergunta,alternativas,corretas', 'P,A|B,9'].join('\n')
    const { errors } = parseCsv(csv, 's1')
    expect(errors[0].line).toBe(2)
  })

  it('ignora linhas em branco', () => {
    const csv = ['pergunta,resposta', 'P,R', '', '  '].join('\n')
    expect(parseCsv(csv, 's1').questions).toHaveLength(1)
  })

  it('exige a coluna pergunta', () => {
    const { errors } = parseCsv('titulo,resposta\nA,B', 's1')
    expect(errors[0].message).toMatch(/coluna "pergunta"/i)
  })

  it('lida com CRLF do Excel', () => {
    const csv = 'pergunta,resposta\r\nP,R\r\n'
    expect(parseCsv(csv, 's1').questions).toHaveLength(1)
  })
})

describe('parseImportFile — erros de entrada', () => {
  it('acusa JSON inválido', () => {
    expect(parseImportFile('{ isso não é json', 'x.json', 's1').errors[0].message).toMatch(/json/i)
  })

  it('acusa formato desconhecido', () => {
    expect(parseImportFile('{"foo":1}', 'x.json', 's1').errors[0].message).toMatch(/formato/i)
  })

  it('escolhe o parser de CSV pela extensão', () => {
    const { questions } = parseImportFile('pergunta,resposta\nP,R', 'dados.csv', 's1')
    expect(questions).toHaveLength(1)
  })
})
