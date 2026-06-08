import { curadoriaVideos, type CuradoriaProduto, type CuradoriaVideoValidada } from "@/lib/curadoria-videos";

export type QuestaoNivel = "facil" | "medio" | "dificil";
export type QuestaoArea = "operacionais" | "saude" | "magisterio" | "pmes" | "enem";
export type QuestaoBanca = "IDESG" | "IDECAN" | "IBADE" | "FGV" | "VUNESP" | "Cebraspe" | "INEP";
export type QuestaoTipo = "autoral" | "prova_publica_referenciada" | "inspirada";

export type QuestaoAlternativa = {
  letra: "A" | "B" | "C" | "D" | "E";
  texto: string;
};

export type QuestaoAutoral = {
  id: string;
  bancaEstilo: QuestaoBanca;
  area: QuestaoArea;
  produto?: "agua-doce" | "pmes" | "enem";
  cargoSlug: string;
  cargo: string;
  cargoRelacionados?: string[];
  disciplina: string;
  assunto: string;
  subassunto?: string;
  microassunto?: string;
  topicoEdital?: string;
  fonte?: string;
  ano?: number;
  enunciado: string;
  alternativas: QuestaoAlternativa[];
  gabarito: QuestaoAlternativa["letra"];
  comentario: string;
  nivel: QuestaoNivel;
  fonteReferencia: string;
  referenciaUrl?: string;
  tipo?: QuestaoTipo;
};

export type QuestaoFiltro = {
  disciplina?: string;
  assunto?: string;
  subassunto?: string;
  banca?: QuestaoBanca;
  cargoSlug?: string;
  area?: QuestaoArea;
  nivel?: QuestaoNivel;
};

function criarQuestao(questao: QuestaoAutoral) {
  return questao;
}

const questoesBase: QuestaoAutoral[] = [
  criarQuestao({
    id: "asg-portugues-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "auxiliar-servicos-gerais",
    cargo: "Auxiliar de Servicos Gerais",
    disciplina: "Lingua Portuguesa",
    assunto: "Interpretacao de texto",
    enunciado:
      "Em um aviso interno da escola, le-se: \"Mantenha os corredores livres para garantir seguranca e circulacao adequada\". A ideia principal do aviso e:",
    alternativas: [
      { letra: "A", texto: "proibir qualquer atividade nos corredores durante todo o expediente." },
      { letra: "B", texto: "orientar uma conduta que favorece ordem e seguranca no ambiente." },
      { letra: "C", texto: "determinar que so os alunos podem utilizar os corredores." },
      { letra: "D", texto: "informar que os corredores passarao por reforma imediata." },
      { letra: "E", texto: "substituir a sinalizacao de emergencia por cartazes informativos." },
    ],
    gabarito: "B",
    comentario:
      "O enunciado valoriza a manutencao da ordem para seguranca e circulacao. Nao fala em proibicao absoluta nem em reforma.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para cargos operacionais.",
  }),
  criarQuestao({
    id: "asg-matematica-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "auxiliar-servicos-gerais",
    cargo: "Auxiliar de Servicos Gerais",
    disciplina: "Matematica Basica",
    assunto: "Proporcao e medidas",
    enunciado:
      "Um auxiliar precisa diluir 2 litros de produto em 8 litros de agua. Mantendo a mesma proporcao, quantos litros de agua serao usados para 5 litros do produto?",
    alternativas: [
      { letra: "A", texto: "10 litros" },
      { letra: "B", texto: "12 litros" },
      { letra: "C", texto: "16 litros" },
      { letra: "D", texto: "20 litros" },
      { letra: "E", texto: "24 litros" },
    ],
    gabarito: "D",
    comentario:
      "A proporcao e de 1 para 4. Para 5 litros de produto, sao necessarios 20 litros de agua.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Matematica para cargos operacionais.",
  }),
  criarQuestao({
    id: "asg-especificos-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "auxiliar-servicos-gerais",
    cargo: "Auxiliar de Servicos Gerais",
    disciplina: "Conhecimentos Especificos",
    assunto: "Seguranca no trabalho",
    enunciado:
      "Ao realizar limpeza em area molhada, a medida mais adequada para prevenir acidentes e:",
    alternativas: [
      { letra: "A", texto: "deixar o local sem sinalizacao para evitar aglomeracao." },
      { letra: "B", texto: "aplicar o produto e retornar apenas no fim do expediente." },
      { letra: "C", texto: "sinalizar a area e utilizar os EPIs indicados para a tarefa." },
      { letra: "D", texto: "solicitar que terceiros realizem a limpeza sem orientacao previa." },
      { letra: "E", texto: "fechar o local e impedir qualquer atividade no predio." },
    ],
    gabarito: "C",
    comentario:
      "Sinalizacao e EPI compoem a conduta preventiva basica para reduzir risco de quedas e exposicoes.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Auxiliar de Servicos Gerais.",
  }),
  criarQuestao({
    id: "asg-especificos-02",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "auxiliar-servicos-gerais",
    cargo: "Auxiliar de Servicos Gerais",
    disciplina: "Conhecimentos Especificos",
    assunto: "Organizacao de rotina",
    enunciado:
      "Em uma escola, o melhor criterio para organizar a sequencia de limpeza de salas, banheiros e corredores e:",
    alternativas: [
      { letra: "A", texto: "escolher os locais de forma aleatoria para variar a rotina." },
      { letra: "B", texto: "seguir apenas a preferencia pessoal do servidor em cada turno." },
      { letra: "C", texto: "priorizar locais de maior uso e necessidade, respeitando o planejamento do setor." },
      { letra: "D", texto: "esperar todas as demandas surgirem para depois decidir por onde comecar." },
      { letra: "E", texto: "limpar apenas os ambientes mais visiveis para os visitantes." },
    ],
    gabarito: "C",
    comentario:
      "A banca costuma cobrar nocao de rotina funcional. A organizacao parte da demanda, do fluxo de uso e do planejamento.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Auxiliar de Servicos Gerais.",
  }),
  criarQuestao({
    id: "mer-portugues-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "merendeira",
    cargo: "Merendeira",
    disciplina: "Lingua Portuguesa",
    assunto: "Sentido de palavras no contexto",
    enunciado:
      "Na frase \"os alimentos devem ser armazenados em local arejado\", a palavra \"arejado\" indica um ambiente:",
    alternativas: [
      { letra: "A", texto: "com forte incidencia de luz solar direta." },
      { letra: "B", texto: "ventilado e apropriado para conservacao." },
      { letra: "C", texto: "fechado para impedir circulacao de pessoas." },
      { letra: "D", texto: "exclusivo para produtos de limpeza." },
      { letra: "E", texto: "destinado apenas a alimentos pereciveis." },
    ],
    gabarito: "B",
    comentario: "No contexto, ambiente arejado e o que possui ventilacao adequada, favorecendo melhor conservacao.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para cargos operacionais.",
  }),
  criarQuestao({
    id: "mer-matematica-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "merendeira",
    cargo: "Merendeira",
    disciplina: "Matematica Basica",
    assunto: "Medidas e fracoes",
    enunciado:
      "Uma receita usa 3/4 de litro de leite por preparo. Para fazer 4 preparos iguais, a quantidade total de leite sera:",
    alternativas: [
      { letra: "A", texto: "2 litros" },
      { letra: "B", texto: "2,5 litros" },
      { letra: "C", texto: "3 litros" },
      { letra: "D", texto: "3,5 litros" },
      { letra: "E", texto: "4 litros" },
    ],
    gabarito: "C",
    comentario: "Quatro vezes 3/4 corresponde a 12/4, isto e, 3 litros.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Matematica para cargos operacionais.",
  }),
  criarQuestao({
    id: "mer-especificos-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "merendeira",
    cargo: "Merendeira",
    disciplina: "Conhecimentos Especificos",
    assunto: "Higiene de alimentos",
    enunciado:
      "Entre as praticas abaixo, a que mais contribui para evitar contaminacao cruzada durante o preparo da merenda e:",
    alternativas: [
      { letra: "A", texto: "usar o mesmo utensilio para alimentos crus e cozidos sem higienizacao." },
      { letra: "B", texto: "lavar as maos e higienizar utensilios ao trocar de etapa no preparo." },
      { letra: "C", texto: "manter os alimentos em temperatura ambiente por mais tempo." },
      { letra: "D", texto: "armazenar produtos de limpeza junto aos generos alimenticios." },
      { letra: "E", texto: "descongelar carnes diretamente sobre a pia de preparo." },
    ],
    gabarito: "B",
    comentario:
      "A troca de etapa com higienizacao adequada evita transferencia de microrganismos entre alimentos e superficies.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Merendeira.",
  }),
  criarQuestao({
    id: "mer-especificos-02",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "merendeira",
    cargo: "Merendeira",
    disciplina: "Conhecimentos Especificos",
    assunto: "Armazenamento",
    enunciado:
      "Ao organizar o estoque da cozinha escolar, o procedimento mais adequado e:",
    alternativas: [
      { letra: "A", texto: "misturar produtos novos e antigos no mesmo recipiente sem identificacao." },
      { letra: "B", texto: "guardar alimentos pereciveis ao lado de saneantes para economizar espaco." },
      { letra: "C", texto: "utilizar identificacao e observar validade para consumo em ordem correta." },
      { letra: "D", texto: "deixar o estoque aberto para facilitar a ventilacao geral." },
      { letra: "E", texto: "remover todas as etiquetas para evitar rasuras futuras." },
    ],
    gabarito: "C",
    comentario:
      "Controle de validade e identificacao sao essenciais para seguranca alimentar e organizacao do estoque.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Merendeira.",
  }),
  criarQuestao({
    id: "mot-portugues-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "motorista",
    cargo: "Motorista",
    disciplina: "Lingua Portuguesa",
    assunto: "Compreensao de instrucao",
    enunciado:
      "Ao ler a orientacao \"conduza o veiculo com atencao redobrada em periodo chuvoso\", entende-se que o motorista deve:",
    alternativas: [
      { letra: "A", texto: "aumentar a velocidade para reduzir o tempo de exposicao a chuva." },
      { letra: "B", texto: "reduzir cuidados, pois a via estara vazia." },
      { letra: "C", texto: "adotar postura mais prudente diante do maior risco da via." },
      { letra: "D", texto: "ignorar a sinalizacao por se tratar de orientacao geral." },
      { letra: "E", texto: "parar o veiculo sempre que chover, independentemente da situacao." },
    ],
    gabarito: "C",
    comentario: "A expressao indica maior prudencia e atencao ao risco aumentado de derrapagem e baixa visibilidade.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para cargos operacionais.",
  }),
  criarQuestao({
    id: "mot-matematica-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "motorista",
    cargo: "Motorista",
    disciplina: "Matematica Basica",
    assunto: "Regra de tres simples",
    enunciado:
      "Um veiculo percorre 180 km com 20 litros de combustivel. Mantendo o mesmo rendimento, quantos litros serao necessarios para 270 km?",
    alternativas: [
      { letra: "A", texto: "24 litros" },
      { letra: "B", texto: "27 litros" },
      { letra: "C", texto: "30 litros" },
      { letra: "D", texto: "32 litros" },
      { letra: "E", texto: "36 litros" },
    ],
    gabarito: "C",
    comentario: "Se 180 km consomem 20 litros, 270 km representam 1,5 vez essa distancia. Logo, 20 x 1,5 = 30.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Matematica para cargos operacionais.",
  }),
  criarQuestao({
    id: "mot-especificos-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "motorista",
    cargo: "Motorista",
    disciplina: "Conhecimentos Especificos",
    assunto: "Direcao defensiva",
    enunciado:
      "Uma conduta tipica de direcao defensiva consiste em:",
    alternativas: [
      { letra: "A", texto: "confiar exclusivamente na experiencia pessoal e ignorar a distancia de seguranca." },
      { letra: "B", texto: "antecipar riscos, respeitar sinalizacao e manter distancia adequada do veiculo a frente." },
      { letra: "C", texto: "ultrapassar em qualquer situacao, desde que a via esteja aparentemente livre." },
      { letra: "D", texto: "usar o celular rapidamente durante o transito quando houver pouca movimentacao." },
      { letra: "E", texto: "aplicar freadas bruscas como tecnica padrao de controle do veiculo." },
    ],
    gabarito: "B",
    comentario: "Direcao defensiva envolve previsao de riscos e adocao de medidas preventivas de seguranca.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Motorista.",
  }),
  criarQuestao({
    id: "mot-especificos-02",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "motorista",
    cargo: "Motorista",
    disciplina: "Conhecimentos Especificos",
    assunto: "Primeiros socorros",
    enunciado:
      "Em uma ocorrencia de transito com vitima, uma medida inicial adequada do condutor e:",
    alternativas: [
      { letra: "A", texto: "retirar a vitima do local imediatamente, mesmo sem risco adicional." },
      { letra: "B", texto: "abandonar o local para buscar ajuda sem sinalizar a via." },
      { letra: "C", texto: "sinalizar o local e acionar socorro especializado, evitando condutas precipitadas." },
      { letra: "D", texto: "oferecer qualquer medicacao para aliviar a dor da vitima." },
      { letra: "E", texto: "movimentar a vitima para posicao sentada, independentemente do quadro." },
    ],
    gabarito: "C",
    comentario:
      "A sinalizacao e o acionamento do socorro especializado sao condutas seguras; mover a vitima sem necessidade pode agravar lesoes.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Motorista.",
  }),
  criarQuestao({
    id: "maq-portugues-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "operador-maquinas",
    cargo: "Operador de Maquinas",
    disciplina: "Lingua Portuguesa",
    assunto: "Interpretacao de orientacao tecnica",
    enunciado:
      "Quando o manual orienta o operador a \"verificar os instrumentos antes do inicio do turno\", isso significa:",
    alternativas: [
      { letra: "A", texto: "realizar apenas uma observacao externa da maquina." },
      { letra: "B", texto: "cumprir uma etapa preventiva de seguranca e funcionamento." },
      { letra: "C", texto: "dispensar qualquer conferencia posterior durante a operacao." },
      { letra: "D", texto: "substituir a manutencao preventiva por teste de campo." },
      { letra: "E", texto: "deixar o equipamento ligado por longo periodo antes de usar." },
    ],
    gabarito: "B",
    comentario: "A verificacao inicial faz parte da rotina preventiva para reduzir falhas e acidentes.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para cargos operacionais.",
  }),
  criarQuestao({
    id: "maq-matematica-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "operador-maquinas",
    cargo: "Operador de Maquinas",
    disciplina: "Matematica Basica",
    assunto: "Porcentagem",
    enunciado:
      "Se o painel indica que o tanque esta com 25% da capacidade total de 200 litros, o volume presente no tanque e de:",
    alternativas: [
      { letra: "A", texto: "25 litros" },
      { letra: "B", texto: "40 litros" },
      { letra: "C", texto: "50 litros" },
      { letra: "D", texto: "75 litros" },
      { letra: "E", texto: "100 litros" },
    ],
    gabarito: "C",
    comentario: "25% de 200 equivale a 50 litros.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Matematica para cargos operacionais.",
  }),
  criarQuestao({
    id: "maq-especificos-01",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "operador-maquinas",
    cargo: "Operador de Maquinas",
    disciplina: "Conhecimentos Especificos",
    assunto: "Seguranca operacional",
    enunciado:
      "Antes de iniciar a operacao de uma maquina pesada em area com circulacao de pessoas, o operador deve:",
    alternativas: [
      { letra: "A", texto: "confiar apenas no alarme sonoro da maquina." },
      { letra: "B", texto: "definir sinalizacao e observar se a area de manobra esta desobstruida." },
      { letra: "C", texto: "iniciar a atividade rapidamente para reduzir o tempo de exposicao." },
      { letra: "D", texto: "dispensar o uso de EPI quando o clima estiver favoravel." },
      { letra: "E", texto: "manter auxiliares no raio de giro para otimizar a comunicacao." },
    ],
    gabarito: "B",
    comentario:
      "A banca tende a cobrar condutas preventivas. Sinalizacao e controle da area de manobra sao medidas basicas.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Operador de Maquinas.",
  }),
  criarQuestao({
    id: "maq-especificos-02",
    bancaEstilo: "IDESG",
    area: "operacionais",
    cargoSlug: "operador-maquinas",
    cargo: "Operador de Maquinas",
    disciplina: "Conhecimentos Especificos",
    assunto: "Manutencao preventiva",
    enunciado:
      "A verificacao rotineira de oleo, agua e condicoes gerais da maquina tem como principal objetivo:",
    alternativas: [
      { letra: "A", texto: "substituir as revisoes programadas por observacao visual." },
      { letra: "B", texto: "evitar qualquer necessidade de desligamento do equipamento." },
      { letra: "C", texto: "identificar falhas precocemente e preservar a seguranca da operacao." },
      { letra: "D", texto: "aumentar o consumo de combustivel para melhorar o desempenho." },
      { letra: "E", texto: "tornar desnecessario o uso do manual do fabricante." },
    ],
    gabarito: "C",
    comentario: "Manutencao preventiva busca detectar anormalidades antes que evoluam para falhas ou acidentes.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos do cargo de Operador de Maquinas.",
  }),
  criarQuestao({
    id: "te-portugues-01",
    bancaEstilo: "IDESG",
    area: "saude",
    cargoSlug: "tecnico-enfermagem",
    cargo: "Tecnico em Enfermagem",
    disciplina: "Lingua Portuguesa",
    assunto: "Compreensao de procedimento",
    enunciado:
      "Em uma instrucao escrita, a frase \"registrar imediatamente o procedimento realizado\" orienta o tecnico a:",
    alternativas: [
      { letra: "A", texto: "adiar o registro para o fim do plantao." },
      { letra: "B", texto: "anotar apenas se o procedimento tiver intercorrencia." },
      { letra: "C", texto: "documentar a assistencia sem demora, conforme a rotina do servico." },
      { letra: "D", texto: "substituir o registro por comunicacao verbal ao colega." },
      { letra: "E", texto: "preencher o prontuario somente sob autorizacao medica." },
    ],
    gabarito: "C",
    comentario:
      "O termo imediatamente reforca que o registro integra a assistencia e deve ocorrer sem postergacao indevida.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para Tecnico em Enfermagem.",
  }),
  criarQuestao({
    id: "te-informatica-01",
    bancaEstilo: "IDESG",
    area: "saude",
    cargoSlug: "tecnico-enfermagem",
    cargo: "Tecnico em Enfermagem",
    disciplina: "Informatica Basica",
    assunto: "Seguranca da informacao",
    enunciado:
      "No uso de sistema de prontuario eletronico, uma conduta adequada do servidor e:",
    alternativas: [
      { letra: "A", texto: "compartilhar senha com colegas do mesmo setor para agilizar o atendimento." },
      { letra: "B", texto: "deixar a sessao aberta durante a troca de turno para continuidade do trabalho." },
      { letra: "C", texto: "usar credenciais proprias e encerrar a sessao ao se afastar do terminal." },
      { letra: "D", texto: "registrar a senha em papel visivel para evitar esquecimento." },
      { letra: "E", texto: "permitir acesso de terceiros ao sistema para consultas rapidas." },
    ],
    gabarito: "C",
    comentario:
      "Controle individual de acesso e encerramento da sessao preservam sigilo e rastreabilidade das informacoes.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica Basica para Tecnico em Enfermagem.",
  }),
  criarQuestao({
    id: "te-sus-01",
    bancaEstilo: "IDESG",
    area: "saude",
    cargoSlug: "tecnico-enfermagem",
    cargo: "Tecnico em Enfermagem",
    disciplina: "Saude Publica e SUS",
    assunto: "Principios do SUS",
    enunciado:
      "O principio da universalidade no SUS significa que:",
    alternativas: [
      { letra: "A", texto: "somente servidores publicos efetivos podem acessar os servicos." },
      { letra: "B", texto: "o atendimento e destinado a todos, sem exclusao por condicao social." },
      { letra: "C", texto: "apenas a atencao hospitalar integra a rede publica de saude." },
      { letra: "D", texto: "cada unidade escolhe livremente quais usuarios atender." },
      { letra: "E", texto: "os servicos especializados substituem a atencao basica." },
    ],
    gabarito: "B",
    comentario: "Universalidade assegura acesso a toda populacao, dentro da organizacao do sistema.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Saude Publica/SUS para Tecnico em Enfermagem.",
  }),
  criarQuestao({
    id: "te-especificos-01",
    bancaEstilo: "IDESG",
    area: "saude",
    cargoSlug: "tecnico-enfermagem",
    cargo: "Tecnico em Enfermagem",
    disciplina: "Conhecimentos Especificos",
    assunto: "Controle de infeccao",
    enunciado:
      "Entre as medidas abaixo, a mais diretamente relacionada a prevencao de infeccoes assistenciais e:",
    alternativas: [
      { letra: "A", texto: "higienizar as maos nos momentos indicados da assistencia." },
      { letra: "B", texto: "utilizar luvas apenas em procedimentos de longa duracao." },
      { letra: "C", texto: "manter materiais abertos para uso eventual ao longo do plantao." },
      { letra: "D", texto: "compartilhar itens nao esterilizados entre pacientes do mesmo setor." },
      { letra: "E", texto: "dispensar protocolo quando o paciente estiver estavel." },
    ],
    gabarito: "A",
    comentario:
      "Higienizacao das maos e medida basica e central para reducao de infeccoes relacionadas a assistencia.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de conhecimentos especificos de Tecnico em Enfermagem.",
  }),
  criarQuestao({
    id: "cp-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "conhecimentos-pedagogicos",
    cargo: "Conhecimentos Pedagogicos",
    disciplina: "Lingua Portuguesa",
    assunto: "Coesao textual",
    enunciado:
      "No trecho \"o planejamento orienta a pratica; por isso, deve ser revisto continuamente\", a expressao \"por isso\" introduz ideia de:",
    alternativas: [
      { letra: "A", texto: "oposicao." },
      { letra: "B", texto: "explicacao conclusiva." },
      { letra: "C", texto: "comparacao." },
      { letra: "D", texto: "duvida." },
      { letra: "E", texto: "condicao." },
    ],
    gabarito: "B",
    comentario: "\"Por isso\" retoma a ideia anterior e apresenta uma conclusao decorrente dela.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para o magisterio.",
  }),
  criarQuestao({
    id: "cp-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "conhecimentos-pedagogicos",
    cargo: "Conhecimentos Pedagogicos",
    disciplina: "Informatica",
    assunto: "Uso pedagogico de ferramentas digitais",
    enunciado:
      "Ao preparar um material digital para a equipe escolar, uma pratica recomendada e:",
    alternativas: [
      { letra: "A", texto: "utilizar nomes de arquivos genéricos e sem organizacao." },
      { letra: "B", texto: "armazenar o documento de forma identificada para facilitar localizacao e compartilhamento." },
      { letra: "C", texto: "dispensar qualquer padrao de salvamento porque o material e interno." },
      { letra: "D", texto: "deixar o arquivo sem revisao por se tratar de uso pedagogico." },
      { letra: "E", texto: "salvar em pasta publica sem controle minimo de acesso." },
    ],
    gabarito: "B",
    comentario: "Organizacao e identificacao favorecem o uso institucional e reduzem retrabalho.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "cp-pedagogicos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "conhecimentos-pedagogicos",
    cargo: "Conhecimentos Pedagogicos",
    disciplina: "Conhecimentos Pedagogicos",
    assunto: "Planejamento e avaliacao",
    enunciado:
      "Uma avaliacao coerente com o planejamento pedagogico e aquela que:",
    alternativas: [
      { letra: "A", texto: "mede apenas memorizacao ao fim do periodo letivo." },
      { letra: "B", texto: "se afasta dos objetivos para nao limitar a criatividade docente." },
      { letra: "C", texto: "acompanha a aprendizagem e orienta ajustes na pratica." },
      { letra: "D", texto: "ocorre somente em situacoes de recuperacao final." },
      { letra: "E", texto: "substitui integralmente as observacoes do professor." },
    ],
    gabarito: "C",
    comentario:
      "A avaliacao formativa acompanha o processo, produz evidencias e orienta a reorganizacao do ensino.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Conhecimentos Pedagogicos.",
  }),
  criarQuestao({
    id: "cp-pedagogicos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "conhecimentos-pedagogicos",
    cargo: "Conhecimentos Pedagogicos",
    disciplina: "Conhecimentos Pedagogicos",
    assunto: "Gestao democratica",
    enunciado:
      "Em uma perspectiva de gestao democratica da escola, a tomada de decisoes tende a:",
    alternativas: [
      { letra: "A", texto: "concentrar-se exclusivamente na equipe diretiva." },
      { letra: "B", texto: "desconsiderar a comunidade escolar para evitar conflitos." },
      { letra: "C", texto: "incluir participacao e dialogo entre os diferentes segmentos." },
      { letra: "D", texto: "ocorrer apenas em momentos de crise institucional." },
      { letra: "E", texto: "ser delegada somente aos orgaos externos de controle." },
    ],
    gabarito: "C",
    comentario: "Gestao democratica pressupoe participacao, corresponsabilidade e dialogo na vida escolar.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Conhecimentos Pedagogicos.",
  }),
  criarQuestao({
    id: "ei-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "educacao-infantil",
    cargo: "Educacao Infantil",
    disciplina: "Lingua Portuguesa",
    assunto: "Interpretacao de enunciado",
    enunciado:
      "Ao ler que a crianca e \"sujeito de direitos\", compreende-se que ela deve ser vista como:",
    alternativas: [
      { letra: "A", texto: "alguem passivo, que apenas recebe ordens e conteudos." },
      { letra: "B", texto: "participante do processo educativo, com dignidade e voz." },
      { letra: "C", texto: "responsavel exclusiva por definir toda a rotina escolar." },
      { letra: "D", texto: "independente de qualquer mediacao do adulto." },
      { letra: "E", texto: "prioritariamente preparada para provas e rankings." },
    ],
    gabarito: "B",
    comentario: "A expressao remete a uma concepcao de infancia que reconhece protagonismo, cuidado e direitos.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Educacao Infantil.",
  }),
  criarQuestao({
    id: "ei-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "educacao-infantil",
    cargo: "Educacao Infantil",
    disciplina: "Informatica",
    assunto: "Organizacao de registros",
    enunciado:
      "No registro digital de atividades da turma, uma boa pratica e:",
    alternativas: [
      { letra: "A", texto: "armazenar fotos e documentos sem identificacao da turma ou da data." },
      { letra: "B", texto: "manter arquivos organizados por tema, periodo ou proposta pedagogica." },
      { letra: "C", texto: "apagar registros antigos para liberar memoria, sem criterio institucional." },
      { letra: "D", texto: "compartilhar todo o material em grupos abertos da internet." },
      { letra: "E", texto: "substituir observacoes pedagogicas por imagens sem contextualizacao." },
    ],
    gabarito: "B",
    comentario: "A organizacao adequada facilita acompanhamento, consulta e documentacao pedagogica.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "ei-especificos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "educacao-infantil",
    cargo: "Educacao Infantil",
    disciplina: "Educacao Infantil",
    assunto: "Ludicidade",
    enunciado:
      "Na Educacao Infantil, a brincadeira tem relevancia pedagogica porque:",
    alternativas: [
      { letra: "A", texto: "serve apenas para preencher intervalos entre atividades formais." },
      { letra: "B", texto: "dispensa qualquer intencionalidade educativa do professor." },
      { letra: "C", texto: "favorece experiencias, interacoes e desenvolvimento integral." },
      { letra: "D", texto: "substitui integralmente o planejamento docente." },
      { letra: "E", texto: "deve ocorrer somente em ambientes externos." },
    ],
    gabarito: "C",
    comentario:
      "Na infancia, brincar se articula ao desenvolvimento cognitivo, motor, social e afetivo em situacoes significativas.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Educacao Infantil.",
  }),
  criarQuestao({
    id: "ei-especificos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "educacao-infantil",
    cargo: "Educacao Infantil",
    disciplina: "Educacao Infantil",
    assunto: "Planejamento pedagogico",
    enunciado:
      "Ao planejar uma proposta para Educacao Infantil, o professor deve considerar prioritariamente:",
    alternativas: [
      { letra: "A", texto: "a repeticao de exercicios padronizados de longa duracao." },
      { letra: "B", texto: "a centralidade do conteudo formal desvinculado da experiencia da crianca." },
      { letra: "C", texto: "a articulacao entre interacoes, brincadeiras e objetivos de aprendizagem." },
      { letra: "D", texto: "o uso exclusivo de fichas impressas para avaliar a turma." },
      { letra: "E", texto: "a reducao da participacao da crianca para facilitar o controle da sala." },
    ],
    gabarito: "C",
    comentario: "Planejamento na etapa infantil articula intencionalidade pedagogica com experiencias proprias da infancia.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Educacao Infantil.",
  }),
  criarQuestao({
    id: "si-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "series-iniciais",
    cargo: "Series Iniciais",
    disciplina: "Lingua Portuguesa",
    assunto: "Leitura e inferencia",
    enunciado:
      "Quando o professor propõe perguntas para que os alunos deduzam informacoes nao explicitas em um texto, ele trabalha principalmente:",
    alternativas: [
      { letra: "A", texto: "copiacao mecanica." },
      { letra: "B", texto: "inferencias de leitura." },
      { letra: "C", texto: "memorizacao de regras isoladas." },
      { letra: "D", texto: "transcricao literal de frases." },
      { letra: "E", texto: "decoracao de titulos e autores." },
    ],
    gabarito: "B",
    comentario: "Inferir e construir sentido alem do que esta explicitado na superficie do texto.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para o magisterio.",
  }),
  criarQuestao({
    id: "si-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "series-iniciais",
    cargo: "Series Iniciais",
    disciplina: "Informatica",
    assunto: "Apresentacao de atividades",
    enunciado:
      "Ao preparar um roteiro de aula em editor de texto, uma vantagem de usar titulos e subtitulos de forma organizada e:",
    alternativas: [
      { letra: "A", texto: "reduzir a clareza para os demais docentes." },
      { letra: "B", texto: "facilitar leitura, revisao e reaproveitamento do material." },
      { letra: "C", texto: "impedir alteracoes futuras no documento." },
      { letra: "D", texto: "substituir todo planejamento por uma estrutura visual." },
      { letra: "E", texto: "dispensar registro do objetivo da aula." },
    ],
    gabarito: "B",
    comentario: "Estrutura organizada melhora compreensao, navegacao e uso pedagogico do arquivo.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "si-especificos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "series-iniciais",
    cargo: "Series Iniciais",
    disciplina: "Series Iniciais",
    assunto: "Alfabetizacao e letramento",
    enunciado:
      "Uma proposta que articula alfabetizacao e letramento nos anos iniciais e aquela em que a crianca:",
    alternativas: [
      { letra: "A", texto: "aprende letras isoladas sem contato com textos reais." },
      { letra: "B", texto: "escreve apenas copias, sem compreender funcao social da escrita." },
      { letra: "C", texto: "participa de situacoes significativas de leitura e escrita." },
      { letra: "D", texto: "estuda ortografia antes de qualquer experiencia de leitura." },
      { letra: "E", texto: "trabalha somente com exercicios de fixacao mecanica." },
    ],
    gabarito: "C",
    comentario:
      "A articulacao entre alfabetizacao e letramento pressupoe aprendizagem do sistema de escrita em uso social significativo.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Series Iniciais.",
  }),
  criarQuestao({
    id: "si-especificos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "series-iniciais",
    cargo: "Series Iniciais",
    disciplina: "Series Iniciais",
    assunto: "Avaliacao",
    enunciado:
      "Nos anos iniciais, uma avaliacao que acompanha o progresso da turma de forma continua e melhor caracterizada como:",
    alternativas: [
      { letra: "A", texto: "classificatoria." },
      { letra: "B", texto: "punitiva." },
      { letra: "C", texto: "formativa." },
      { letra: "D", texto: "eliminatoria." },
      { letra: "E", texto: "sancionatoria." },
    ],
    gabarito: "C",
    comentario: "Avaliacao formativa monitora o processo e orienta intervencoes pedagogicas ao longo da aprendizagem.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Series Iniciais.",
  }),
  criarQuestao({
    id: "aeev-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-visual",
    cargo: "AEE Deficiencia Visual",
    disciplina: "Lingua Portuguesa",
    assunto: "Compreensao de texto",
    enunciado:
      "No contexto da educacao inclusiva, o termo \"acessibilidade\" se relaciona a:",
    alternativas: [
      { letra: "A", texto: "uso restrito de recursos apenas em casos excepcionais." },
      { letra: "B", texto: "condicoes que favorecem participacao e acesso ao processo educativo." },
      { letra: "C", texto: "substituicao do curriculo comum por atividades sem planejamento." },
      { letra: "D", texto: "isolamento do estudante para melhor adaptacao." },
      { letra: "E", texto: "reduzir a interacao entre aluno e turma." },
    ],
    gabarito: "B",
    comentario: "Acessibilidade amplia acesso, participacao e permanencia com condicoes adequadas de aprendizagem.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para o magisterio.",
  }),
  criarQuestao({
    id: "aeev-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-visual",
    cargo: "AEE Deficiencia Visual",
    disciplina: "Informatica",
    assunto: "Tecnologias assistivas digitais",
    enunciado:
      "No apoio a estudantes com deficiencia visual, o uso de recursos digitais pode contribuir quando:",
    alternativas: [
      { letra: "A", texto: "substitui toda mediacao do professor." },
      { letra: "B", texto: "e integrado ao planejamento com foco na autonomia e no acesso." },
      { letra: "C", texto: "e aplicado sem considerar as necessidades do estudante." },
      { letra: "D", texto: "serve apenas para entretenimento nos intervalos." },
      { letra: "E", texto: "dispensa adaptacoes de materiais impressos." },
    ],
    gabarito: "B",
    comentario: "Tecnologia assistiva deve estar articulada a intencionalidade pedagogica e acessibilidade real.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "aeev-especificos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-visual",
    cargo: "AEE Deficiencia Visual",
    disciplina: "AEE Deficiencia Visual",
    assunto: "Recursos especificos",
    enunciado:
      "No AEE para deficiencia visual, um exemplo de recurso pedagogico especifico e:",
    alternativas: [
      { letra: "A", texto: "uso exclusivo de textos ampliados para todos os estudantes, sem criterio." },
      { letra: "B", texto: "emprego de braille e outros recursos conforme a necessidade educacional do aluno." },
      { letra: "C", texto: "retirada do estudante de todas as atividades coletivas." },
      { letra: "D", texto: "substituicao permanente de materiais concretos por atividades orais." },
      { letra: "E", texto: "padronizacao de um unico recurso para todos os casos." },
    ],
    gabarito: "B",
    comentario:
      "A escolha do recurso precisa dialogar com a funcionalidade visual, a autonomia e os objetivos pedagogicos.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de AEE Deficiencia Visual.",
  }),
  criarQuestao({
    id: "aeev-especificos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-visual",
    cargo: "AEE Deficiencia Visual",
    disciplina: "AEE Deficiencia Visual",
    assunto: "Orientacao e mobilidade",
    enunciado:
      "O trabalho com orientacao e mobilidade no contexto escolar busca favorecer principalmente:",
    alternativas: [
      { letra: "A", texto: "dependencia constante do estudante em relacao a terceiros." },
      { letra: "B", texto: "autonomia para deslocamentos e uso mais seguro dos espacos." },
      { letra: "C", texto: "restricao do estudante a ambientes previamente controlados." },
      { letra: "D", texto: "substituicao de todas as experiencias coletivas por atividades individuais." },
      { letra: "E", texto: "dispensa da sinalizacao acessivel no ambiente escolar." },
    ],
    gabarito: "B",
    comentario: "Orientacao e mobilidade ampliam autonomia, seguranca e participacao do estudante na rotina escolar.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de AEE Deficiencia Visual.",
  }),
  criarQuestao({
    id: "aeea-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-auditiva",
    cargo: "AEE Deficiencia Auditiva",
    disciplina: "Lingua Portuguesa",
    assunto: "Sentido no contexto",
    enunciado:
      "Quando um texto pedagogico menciona \"educacao bilingue para surdos\", a ideia principal e a de:",
    alternativas: [
      { letra: "A", texto: "eliminar a lingua portuguesa do percurso escolar." },
      { letra: "B", texto: "articular linguas e praticas adequadas ao processo de aprendizagem do estudante surdo." },
      { letra: "C", texto: "usar apenas uma forma de comunicacao em qualquer contexto." },
      { letra: "D", texto: "substituir toda mediacao pedagogica por tecnologia." },
      { letra: "E", texto: "isolar o estudante em atividades exclusivas do AEE." },
    ],
    gabarito: "B",
    comentario: "A nocao de bilingue articula Libras e lingua portuguesa em perspectivas adequadas ao processo educativo.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para o magisterio.",
  }),
  criarQuestao({
    id: "aeea-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-auditiva",
    cargo: "AEE Deficiencia Auditiva",
    disciplina: "Informatica",
    assunto: "Recursos visuais digitais",
    enunciado:
      "No planejamento de uma atividade digital para estudantes com deficiencia auditiva, e recomendavel priorizar:",
    alternativas: [
      { letra: "A", texto: "materiais com informacoes apenas em audio." },
      { letra: "B", texto: "recursos visuais claros e organizados, articulados ao objetivo da aula." },
      { letra: "C", texto: "arquivos sem imagens, esquemas ou legenda." },
      { letra: "D", texto: "uso de plataformas sem qualquer possibilidade de adaptacao." },
      { letra: "E", texto: "reducao das interacoes para facilitar a disciplina." },
    ],
    gabarito: "B",
    comentario: "Apoios visuais e organizacao da informacao favorecem acesso e compreensao em diferentes contextos.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "aeea-especificos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-auditiva",
    cargo: "AEE Deficiencia Auditiva",
    disciplina: "AEE Deficiencia Auditiva",
    assunto: "Libras e inclusao",
    enunciado:
      "No AEE para estudantes com deficiencia auditiva, a Libras e compreendida como:",
    alternativas: [
      { letra: "A", texto: "recurso opcional sem impacto pedagogico." },
      { letra: "B", texto: "lingua importante no processo de comunicacao e aprendizagem de muitos estudantes surdos." },
      { letra: "C", texto: "estrategia limitada a contextos informais fora da escola." },
      { letra: "D", texto: "substituta de todo trabalho com lingua portuguesa." },
      { letra: "E", texto: "atividade complementar sem relacao com o curriculo." },
    ],
    gabarito: "B",
    comentario: "A Libras ocupa papel central na educacao de estudantes surdos em perspectiva bilingue e inclusiva.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de AEE Deficiencia Auditiva.",
  }),
  criarQuestao({
    id: "aeea-especificos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "aee-auditiva",
    cargo: "AEE Deficiencia Auditiva",
    disciplina: "AEE Deficiencia Auditiva",
    assunto: "Planejamento pedagogico",
    enunciado:
      "Um planejamento pedagogico coerente para o AEE auditivo deve:",
    alternativas: [
      { letra: "A", texto: "ser identico para todos os alunos, sem considerar singularidades." },
      { letra: "B", texto: "articular recursos, objetivos e acessibilidade conforme as necessidades do estudante." },
      { letra: "C", texto: "ocorrer apenas apos a avaliacao final do bimestre." },
      { letra: "D", texto: "dispensar o dialogo com a sala comum." },
      { letra: "E", texto: "concentrar-se unicamente em atividades de copia." },
    ],
    gabarito: "B",
    comentario: "O AEE se fortalece quando o planejamento considera necessidades, recursos e articulacao com a escolarizacao.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de AEE Deficiencia Auditiva.",
  }),
  criarQuestao({
    id: "sr-portugues-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "sala-recursos",
    cargo: "Sala de Recursos",
    disciplina: "Lingua Portuguesa",
    assunto: "Compreensao de texto",
    enunciado:
      "Em um documento escolar, a expressao \"trabalho colaborativo\" sugere uma pratica em que:",
    alternativas: [
      { letra: "A", texto: "cada profissional atua sem compartilhar informacoes." },
      { letra: "B", texto: "a responsabilidade pelo estudante e dividida com dialogo entre os envolvidos." },
      { letra: "C", texto: "somente um setor decide sobre todas as intervencoes." },
      { letra: "D", texto: "a familia e afastada do processo educativo." },
      { letra: "E", texto: "o atendimento ocorre apenas em situacoes de emergencia." },
    ],
    gabarito: "B",
    comentario: "Trabalho colaborativo envolve articulacao entre profissionais, familia e escola em favor do estudante.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Lingua Portuguesa para o magisterio.",
  }),
  criarQuestao({
    id: "sr-informatica-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "sala-recursos",
    cargo: "Sala de Recursos",
    disciplina: "Informatica",
    assunto: "Organizacao de atendimento",
    enunciado:
      "Ao registrar atendimentos da Sala de Recursos em planilha ou sistema, a organizacao adequada dos dados permite:",
    alternativas: [
      { letra: "A", texto: "acompanhar melhor o historico e planejar intervencoes." },
      { letra: "B", texto: "dispensar qualquer analise pedagogica posterior." },
      { letra: "C", texto: "substituir observacao e avaliacao do estudante." },
      { letra: "D", texto: "evitar dialogo com a equipe escolar." },
      { letra: "E", texto: "limitar o atendimento a um unico modelo de registro." },
    ],
    gabarito: "A",
    comentario: "Registros bem organizados apoiam acompanhamento, avaliacao e planejamento de atendimentos.",
    nivel: "facil",
    fonteReferencia: "Edital 001/2026 - conteudo programatico de Informatica para o magisterio.",
  }),
  criarQuestao({
    id: "sr-especificos-01",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "sala-recursos",
    cargo: "Sala de Recursos",
    disciplina: "Sala de Recursos",
    assunto: "Atendimento Educacional Especializado",
    enunciado:
      "A Sala de Recursos Multifuncionais se caracteriza por:",
    alternativas: [
      { letra: "A", texto: "substituir a matricula do estudante na classe comum." },
      { letra: "B", texto: "oferecer apoio complementar ou suplementar ao processo de escolarizacao." },
      { letra: "C", texto: "restringir a participacao do estudante em atividades da turma regular." },
      { letra: "D", texto: "trabalhar somente com conteudos desvinculados do curriculo." },
      { letra: "E", texto: "atender estudantes sem necessidade de planejamento individualizado." },
    ],
    gabarito: "B",
    comentario:
      "O AEE complementa ou suplementa a escolarizacao, favorecendo acessibilidade, autonomia e participacao.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Sala de Recursos.",
  }),
  criarQuestao({
    id: "sr-especificos-02",
    bancaEstilo: "IDESG",
    area: "magisterio",
    cargoSlug: "sala-recursos",
    cargo: "Sala de Recursos",
    disciplina: "Sala de Recursos",
    assunto: "Plano de AEE",
    enunciado:
      "No Plano de Atendimento Educacional Especializado, e essencial constar:",
    alternativas: [
      { letra: "A", texto: "apenas a lista de materiais disponiveis na escola." },
      { letra: "B", texto: "objetivos, estrategias, recursos e formas de acompanhamento." },
      { letra: "C", texto: "somente o nome dos profissionais envolvidos." },
      { letra: "D", texto: "um conjunto fixo de atividades igual para todos os estudantes." },
      { letra: "E", texto: "a exclusao de qualquer revisao periodica do plano." },
    ],
    gabarito: "B",
    comentario: "O plano organiza intencionalidade, recursos e monitoramento do atendimento especializado.",
    nivel: "medio",
    fonteReferencia: "Edital 001/2026 - conteudo programatico especifico de Sala de Recursos.",
  }),
  criarQuestao({
    id: "pmes-portugues-01",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Lingua Portuguesa",
    assunto: "Interpretacao de texto",
    enunciado:
      "Em um texto sobre seguranca publica, o autor afirma que a confianca entre comunidade e instituicoes se fortalece quando ha presenca preventiva, escuta e resposta rapida. A ideia central do trecho e:",
    alternativas: [
      { letra: "A", texto: "a seguranca depende apenas do aumento do numero de viaturas." },
      { letra: "B", texto: "a relacao entre policia e comunidade se fortalece com presenca, dialogo e eficiencia." },
      { letra: "C", texto: "a resposta rapida substitui a necessidade de planejamento preventivo." },
      { letra: "D", texto: "a escuta da comunidade tem valor secundario nas acoes policiais." },
      { letra: "E", texto: "a confianca social independe da qualidade do atendimento." },
    ],
    gabarito: "B",
    comentario:
      "A questao cobra leitura global. O trecho associa seguranca a confianca social construida por presenca preventiva, escuta e resposta eficaz.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Lingua Portuguesa: interpretacao e compreensao textual.",
  }),
  criarQuestao({
    id: "pmes-portugues-02",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Lingua Portuguesa",
    assunto: "Pontuacao",
    enunciado: "Assinale a alternativa em que a virgula foi empregada corretamente.",
    alternativas: [
      { letra: "A", texto: "Os policiais que atuam no patrulhamento ostensivo, precisam manter atencao constante." },
      { letra: "B", texto: "Em dias de operacao, o planejamento, define prioridades de deslocamento." },
      { letra: "C", texto: "A equipe avaliou o risco, organizou a rota e iniciou o patrulhamento." },
      { letra: "D", texto: "A comunidade espera, respostas rapidas e atendimento respeitoso." },
      { letra: "E", texto: "Sempre que necessario os agentes, reforcam a vigilancia no entorno." },
    ],
    gabarito: "C",
    comentario:
      "A alternativa C usa a virgula para separar itens coordenados. Nas demais, a pontuacao separa indevidamente sujeito, verbo ou adjunto.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Lingua Portuguesa: pontuacao e sintaxe.",
  }),
  criarQuestao({
    id: "pmes-mrl-01",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Raciocinio Logico e Matematico",
    assunto: "Porcentagem",
    enunciado:
      "Em uma turma preparatoria com 80 candidatos, 30% ainda nao iniciaram o bloco de geografia. Quantos candidatos ja iniciaram esse bloco?",
    alternativas: [
      { letra: "A", texto: "24" },
      { letra: "B", texto: "32" },
      { letra: "C", texto: "48" },
      { letra: "D", texto: "56" },
      { letra: "E", texto: "60" },
    ],
    gabarito: "D",
    comentario: "Se 30% ainda nao iniciaram, entao 70% ja iniciaram. 70% de 80 e 56.",
    nivel: "facil",
    fonteReferencia: "Conteudo programatico PMES - Raciocinio Logico e Matematico: porcentagem e problemas.",
  }),
  criarQuestao({
    id: "pmes-mrl-02",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Raciocinio Logico e Matematico",
    assunto: "Sequencias logicas",
    enunciado: "Observe a sequencia 3, 6, 12, 24, ... Mantido o mesmo padrao, o proximo termo sera:",
    alternativas: [
      { letra: "A", texto: "30" },
      { letra: "B", texto: "36" },
      { letra: "C", texto: "42" },
      { letra: "D", texto: "46" },
      { letra: "E", texto: "48" },
    ],
    gabarito: "E",
    comentario: "A sequencia dobra a cada passo. Depois de 24, vem 48.",
    nivel: "facil",
    fonteReferencia: "Conteudo programatico PMES - Raciocinio Logico e Matematico: sequencias e padroes.",
  }),
  criarQuestao({
    id: "pmes-historia-01",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Historia do Brasil e do Espirito Santo",
    assunto: "Republica no Brasil",
    enunciado: "A Proclamacao da Republica, em 1889, alterou o regime politico brasileiro ao:",
    alternativas: [
      { letra: "A", texto: "instalar um regime parlamentar monarquico." },
      { letra: "B", texto: "substituir a monarquia por um regime republicano." },
      { letra: "C", texto: "encerrar o federalismo e concentrar todo poder nos municipios." },
      { letra: "D", texto: "abolir a Constituicao e o voto em todo o territorio." },
      { letra: "E", texto: "eliminar a participacao militar na vida politica." },
    ],
    gabarito: "B",
    comentario:
      "A banca costuma cobrar marcos historicos basicos. A Proclamacao da Republica encerra o periodo monarquico e inaugura o republicano.",
    nivel: "facil",
    fonteReferencia: "Conteudo programatico PMES - Historia do Brasil e do Espirito Santo.",
  }),
  criarQuestao({
    id: "pmes-historia-02",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Historia do Brasil e do Espirito Santo",
    assunto: "Historia do Espirito Santo",
    enunciado:
      "Na formacao historica do Espirito Santo, a ocupacao do territorio esteve relacionada, entre outros fatores, a:",
    alternativas: [
      { letra: "A", texto: "expansao de frentes coloniais e organizacao de nucleos de povoamento." },
      { letra: "B", texto: "isolamento completo em relacao ao restante da colonia." },
      { letra: "C", texto: "ausencia de atividade economica durante o periodo colonial." },
      { letra: "D", texto: "proibicao de qualquer organizacao administrativa local." },
      { letra: "E", texto: "independencia politica anterior ao restante do Brasil." },
    ],
    gabarito: "A",
    comentario:
      "A questao pede leitura historica ampla do processo de ocupacao e organizacao do territorio capixaba.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Historia do Espirito Santo.",
  }),
  criarQuestao({
    id: "pmes-geografia-01",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Geografia Geral, do Brasil e do Espirito Santo",
    assunto: "Urbanizacao",
    enunciado:
      "O crescimento urbano acelerado, quando ocorre sem planejamento, pode favorecer:",
    alternativas: [
      { letra: "A", texto: "melhoria automatica de todos os indicadores sociais." },
      { letra: "B", texto: "reducao espontanea dos problemas de mobilidade." },
      { letra: "C", texto: "expansao de areas com carencia de infraestrutura e servicos." },
      { letra: "D", texto: "equilibrio natural entre moradia, trabalho e transporte." },
      { letra: "E", texto: "desaparecimento das desigualdades territoriais." },
    ],
    gabarito: "C",
    comentario:
      "Urbanizacao sem planejamento tende a ampliar problemas de mobilidade, infraestrutura e acesso a servicos.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Geografia Geral, Brasil e Espirito Santo.",
  }),
  criarQuestao({
    id: "pmes-geografia-02",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Geografia Geral, do Brasil e do Espirito Santo",
    assunto: "Territorio e regionalizacao",
    enunciado:
      "Na Geografia, o conceito de territorio se relaciona principalmente a:",
    alternativas: [
      { letra: "A", texto: "uma paisagem observada sem relacao com poder ou uso." },
      { letra: "B", texto: "um espaco apropriado, controlado ou usado por grupos sociais." },
      { letra: "C", texto: "uma divisao puramente natural sem dimensao politica." },
      { letra: "D", texto: "uma area definida apenas por coordenadas climaticas." },
      { letra: "E", texto: "um espaco sem dinamica historica." },
    ],
    gabarito: "B",
    comentario:
      "Territorio envolve uso, controle, poder e relacao social sobre o espaco.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Geografia Geral, Brasil e Espirito Santo.",
  }),
  criarQuestao({
    id: "pmes-redacao-01",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Redacao",
    assunto: "Leitura do comando",
    enunciado:
      "Em uma proposta de redacao discursiva para concurso policial, a primeira atitude mais segura do candidato e:",
    alternativas: [
      { letra: "A", texto: "comecar a escrever imediatamente para ganhar tempo." },
      { letra: "B", texto: "substituir o tema cobrado por outro mais facil de desenvolver." },
      { letra: "C", texto: "identificar tema, recorte, objetivo e limite do comando antes de planejar." },
      { letra: "D", texto: "decorar um texto pronto e encaixar no assunto." },
      { letra: "E", texto: "fazer uma introducao longa sem definir tese." },
    ],
    gabarito: "C",
    comentario:
      "A leitura do comando e decisiva em discursivas. Antes de escrever, o candidato precisa saber exatamente o que a banca pediu.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Redacao.",
  }),
  criarQuestao({
    id: "pmes-redacao-02",
    bancaEstilo: "IDECAN",
    area: "pmes",
    cargoSlug: "pmes",
    cargo: "PMES",
    disciplina: "Redacao",
    assunto: "Objetividade",
    enunciado:
      "Entre as alternativas abaixo, a que melhor representa uma qualidade importante na redacao de concurso policial e:",
    alternativas: [
      { letra: "A", texto: "uso de linguagem vaga para parecer mais sofisticado." },
      { letra: "B", texto: "excesso de frases longas para demonstrar repertorio." },
      { letra: "C", texto: "objetividade, argumento direto e fechamento coerente com o tema." },
      { letra: "D", texto: "repeticao da mesma ideia ao longo do texto." },
      { letra: "E", texto: "uso de exemplos sem relacao com o comando." },
    ],
    gabarito: "C",
    comentario:
      "Em discursivas de concurso, a banca valoriza resposta aderente ao tema, com objetividade e organizacao logica.",
    nivel: "medio",
    fonteReferencia: "Conteudo programatico PMES - Redacao.",
  }),
];

const areaLabels: Record<QuestaoArea, string> = {
  operacionais: "Operacionais",
  saude: "Saude",
  magisterio: "Magisterio",
  pmes: "PMES",
  enem: "ENEM",
};

const aguaTrackNames: Record<string, { cargo: string; area: QuestaoArea }> = {
  "auxiliar-servicos-gerais": { cargo: "Auxiliar de Servicos Gerais", area: "operacionais" },
  merendeira: { cargo: "Merendeira", area: "operacionais" },
  motorista: { cargo: "Motorista", area: "operacionais" },
  "operador-maquinas": { cargo: "Operador de Maquinas", area: "operacionais" },
  vigia: { cargo: "Vigia", area: "operacionais" },
  "auxiliar-de-cuidador": { cargo: "Auxiliar de Cuidador", area: "saude" },
  cuidador: { cargo: "Cuidador Infantil", area: "saude" },
  "tecnico-enfermagem": { cargo: "Tecnico em Enfermagem", area: "saude" },
  "conhecimentos-pedagogicos": { cargo: "Conhecimentos Pedagogicos", area: "magisterio" },
  pedagogo: { cargo: "Pedagogo", area: "magisterio" },
  "educacao-infantil": { cargo: "Educacao Infantil", area: "magisterio" },
  "series-iniciais": { cargo: "Series Iniciais", area: "magisterio" },
  "aee-visual": { cargo: "AEE Deficiencia Visual", area: "magisterio" },
  "aee-auditiva": { cargo: "AEE Deficiencia Auditiva", area: "magisterio" },
  "sala-recursos": { cargo: "Sala de Recursos", area: "magisterio" },
};

const aguaTrackGroups = {
  all: Object.keys(aguaTrackNames),
  educacao: [
    "conhecimentos-pedagogicos",
    "pedagogo",
    "educacao-infantil",
    "series-iniciais",
    "aee-visual",
    "aee-auditiva",
    "sala-recursos",
  ],
  saude: ["auxiliar-de-cuidador", "cuidador", "tecnico-enfermagem"],
} as const;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function hashText(value: string) {
  return normalize(value)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
}

function rotateAlternatives(correct: string, distractors: string[], seed: string) {
  const letters = ["A", "B", "C", "D", "E"] as const;
  const pool = [correct, ...distractors.slice(0, 4)];
  const offset = hashText(seed) % letters.length;
  const rotated = pool.map((_, index) => pool[(index + offset) % pool.length]);
  const gabarito = letters[rotated.findIndex((item) => item === correct)];

  return {
    alternativas: rotated.map((texto, index) => ({ letra: letters[index], texto })),
    gabarito,
  };
}

function getAguaRelacionados(video: CuradoriaVideoValidada) {
  const micro = normalize(video.microassunto);
  const disciplina = normalize(video.disciplina);

  if (disciplina.includes("portugues") || disciplina.includes("matematica") || disciplina.includes("informatica")) {
    return [...aguaTrackGroups.all];
  }

  if (disciplina.includes("educacao")) {
    return [...aguaTrackGroups.educacao];
  }

  if (disciplina.includes("saude")) {
    return [...aguaTrackGroups.saude];
  }

  if (micro.includes("servicos gerais")) return ["auxiliar-servicos-gerais"];
  if (micro.includes("merendeira")) return ["merendeira"];
  if (micro.includes("motorista")) return ["motorista"];
  if (micro.includes("operador de maquinas")) return ["operador-maquinas"];
  if (micro.includes("vigia")) return ["vigia"];
  if (micro.includes("cuidador")) return ["auxiliar-de-cuidador", "cuidador"];

  return ["auxiliar-servicos-gerais"];
}

function getAguaDisciplina(video: CuradoriaVideoValidada) {
  const disciplina = normalize(video.disciplina);
  if (disciplina.includes("portugues")) return "Lingua Portuguesa";
  if (disciplina.includes("matematica")) return "Matematica Basica";
  if (disciplina.includes("informatica")) return "Informatica Basica";
  if (disciplina.includes("educacao")) return "Conhecimentos Pedagogicos";
  return "Conhecimentos Especificos";
}

function getQuestaoAreaByTrackSlug(slug: string): QuestaoArea {
  return aguaTrackNames[slug]?.area ?? "operacionais";
}

function getQuestaoCargoByTrackSlug(slug: string) {
  return aguaTrackNames[slug]?.cargo ?? "Trilha municipal";
}

function getQuestionMetadata(video: CuradoriaVideoValidada, variantIndex: number) {
  if (video.produto === "pmes") {
    return {
      produto: "pmes" as const,
      bancaEstilo: "IDECAN" as const,
      area: "pmes" as const,
      cargoSlug: "pmes",
      cargo: "PMES",
      cargoRelacionados: ["pmes"],
      disciplina: video.disciplina === "Redacao PMES" ? "Redacao" : video.disciplina,
      assunto: video.assunto,
      topicoEdital: video.microassunto,
      fonte: "Curadoria oficial PMES",
      ano: 2026,
    };
  }

  if (video.produto === "enem" || video.produto === "redacao-enem") {
    return {
      produto: "enem" as const,
      bancaEstilo: "INEP" as const,
      area: "enem" as const,
      cargoSlug: video.produto === "redacao-enem" ? "redacao-enem" : "enem",
      cargo: video.produto === "redacao-enem" ? "Redacao ENEM" : "ENEM",
      cargoRelacionados: [video.produto === "redacao-enem" ? "redacao-enem" : "enem"],
      disciplina: video.disciplina,
      assunto: video.assunto,
      topicoEdital: video.microassunto,
      fonte: "Curadoria oficial ENEM",
      ano: 2026,
    };
  }

  if (video.produto === "redacao-concursos") {
    return {
      produto: "agua-doce" as const,
      bancaEstilo: "IDECAN" as const,
      area: "pmes" as const,
      cargoSlug: "pmes",
      cargo: "PMES / Concursos",
      cargoRelacionados: ["pmes"],
      disciplina: "Redacao",
      assunto: video.assunto,
      topicoEdital: video.microassunto,
      fonte: "Curadoria oficial redacao concursos",
      ano: 2026,
    };
  }

  const relacionados = getAguaRelacionados(video);
  const cargoSlug = relacionados[variantIndex % relacionados.length] ?? relacionados[0];

  return {
    produto: "agua-doce" as const,
    bancaEstilo: "IDESG" as const,
    area: getQuestaoAreaByTrackSlug(cargoSlug),
    cargoSlug,
    cargo: getQuestaoCargoByTrackSlug(cargoSlug),
    cargoRelacionados: relacionados,
    disciplina: getAguaDisciplina(video),
    assunto: video.assunto,
    topicoEdital: video.microassunto,
    fonte: "Curadoria oficial Agua Doce",
    ano: 2026,
  };
}

function buildQuestaoEnunciado(video: CuradoriaVideoValidada, variantIndex: number, cargo: string) {
  const micro = titleCase(video.microassunto);

  if (variantIndex === 0) {
    return `No estudo de ${micro} para ${cargo}, assinale a alternativa que melhor resume a ideia central desse microassunto.`;
  }

  return `Durante a revisao de ${micro}, qual atitude mostra que o aluno entendeu o que a banca costuma cobrar nesse ponto?`;
}

function buildCorrectOption(video: CuradoriaVideoValidada, variantIndex: number) {
  const micro = video.microassunto;
  const conceito = video.observacaoPedagogica;
  if (variantIndex === 0) {
    return `Relacionar ${micro} ao contexto da prova, entendendo a ideia central antes de partir para as alternativas.`;
  }

  if (video.usoRecomendado === "questoes") {
    return `Depois da teoria curta, resolver questoes comentadas de ${micro} para transformar conteudo em resposta objetiva.`;
  }

  if (video.usoRecomendado === "revisao") {
    return `Usar ${micro} como bloco de revisao, retomando palavras-chave e erros mais comuns antes do treino maior.`;
  }

  return `Estudar ${micro} com video curto, resumo guiado e pratica logo em seguida, sem separar teoria e aplicacao.`;
}

function buildDistractors(video: CuradoriaVideoValidada) {
  const micro = video.microassunto;
  return [
    `Memorizar ${micro} isoladamente e escolher a alternativa mais parecida com o que ficou da leitura superficial.`,
    `Ignorar o comando da questao, porque em ${micro} o importante e decorar termos soltos e nao interpretar contexto.`,
    `Tratar ${micro} como detalhe sem relacao com edital, rotina do cargo ou estrategia de prova.`,
    `Pular leitura e pratica, porque ${micro} se resolve apenas por intuicao quando a alternativa parece convincente.`,
  ];
}

function buildComentario(video: CuradoriaVideoValidada, variantIndex: number) {
  const micro = titleCase(video.microassunto);

  if (variantIndex === 0) {
    return `${micro} precisa aparecer com contexto, leitura do comando e aplicacao pratica. A curadoria BenThec usa esse microassunto como passo curto, nao como bloco solto.`;
  }

  return `A melhor resposta em ${micro} e a que junta video, resumo e pratica. O erro mais comum e estudar sem converter o conteudo em decisao de prova.`;
}

function inferDifficulty(video: CuradoriaVideoValidada, variantIndex: number): QuestaoNivel {
  if (video.nivel === "avancado") return "dificil";
  if (video.nivel === "intermediario") return variantIndex === 0 ? "medio" : "dificil";
  if (video.nivel === "revisao") return "medio";
  return variantIndex === 0 ? "facil" : "medio";
}

function createGeneratedQuestion(video: CuradoriaVideoValidada, variantIndex: number): QuestaoAutoral {
  const meta = getQuestionMetadata(video, variantIndex);
  const correct = buildCorrectOption(video, variantIndex);
  const { alternativas, gabarito } = rotateAlternatives(correct, buildDistractors(video), `${video.id}-${variantIndex}`);

  return criarQuestao({
    id: `${video.id}-q${variantIndex + 1}`,
    bancaEstilo: meta.bancaEstilo,
    area: meta.area,
    produto: meta.produto,
    cargoSlug: meta.cargoSlug,
    cargo: meta.cargo,
    cargoRelacionados: meta.cargoRelacionados,
    disciplina: meta.disciplina,
    assunto: meta.assunto,
    subassunto: titleCase(video.microassunto),
    microassunto: video.microassunto,
    topicoEdital: meta.topicoEdital,
    fonte: meta.fonte,
    ano: meta.ano,
    enunciado: buildQuestaoEnunciado(video, variantIndex, meta.cargo),
    alternativas,
    gabarito,
    comentario: buildComentario(video, variantIndex),
    nivel: inferDifficulty(video, variantIndex),
    fonteReferencia: video.linkDescricao,
    referenciaUrl: video.playlistVideoEspecifico ?? undefined,
    tipo: "inspirada",
  });
}

function getVariantCount(video: CuradoriaVideoValidada) {
  if (video.produto === "agua-doce" || video.produto === "enem" || video.produto === "redacao-enem") {
    return 2;
  }

  if (video.produto === "redacao-concursos") {
    return 1;
  }

  return 1;
}

function dedupeQuestions(base: QuestaoAutoral[]) {
  const map = new Map<string, QuestaoAutoral>();
  base.forEach((questao) => {
    map.set(questao.id, questao);
  });
  return [...map.values()];
}

const generatedQuestions = curadoriaVideos
  .filter((video) => video.produto !== "canais-coringa")
  .flatMap((video) =>
    Array.from({ length: getVariantCount(video) }, (_, index) => createGeneratedQuestion(video, index)),
  );

export const questoes: QuestaoAutoral[] = dedupeQuestions([...questoesBase, ...generatedQuestions]);

export function getQuestaoById(id: string) {
  return questoes.find((questao) => questao.id === id);
}

export function getQuestoesByCargoSlug(cargoSlug: string) {
  return questoes.filter((questao) => questao.cargoSlug === cargoSlug || questao.cargoRelacionados?.includes(cargoSlug));
}

export function getQuestoesByArea(area: QuestaoArea) {
  return questoes.filter((questao) => questao.area === area);
}

export function getQuestoesByProduto(produto: "agua-doce" | "pmes" | "enem") {
  if (produto === "pmes") return getQuestoesByArea("pmes");
  if (produto === "enem") return getQuestoesByArea("enem");
  return questoes.filter((questao) => questao.area !== "pmes" && questao.area !== "enem");
}

export function getQuestoesDisponiveisParaCargo(cargoSlug: string, area: QuestaoArea) {
  const proprias = getQuestoesByCargoSlug(cargoSlug);

  if (proprias.length >= 12) {
    return {
      tipo: "proprias" as const,
      questoes: proprias,
    };
  }

  const complementares = getQuestoesByArea(area).filter(
    (questao) => questao.cargoSlug !== cargoSlug && !questao.cargoRelacionados?.includes(cargoSlug),
  );

  return {
    tipo: proprias.length > 0 ? "proprias" as const : "base-da-area" as const,
    questoes: [...proprias, ...complementares].slice(0, Math.max(12, proprias.length + 6)),
  };
}

export function getQuestoesFiltradas(filtro: QuestaoFiltro) {
  return questoes.filter((questao) => {
    if (filtro.disciplina && questao.disciplina !== filtro.disciplina) return false;
    if (filtro.assunto && questao.assunto !== filtro.assunto) return false;
    if (filtro.subassunto && (questao.subassunto ?? questao.microassunto ?? questao.assunto) !== filtro.subassunto) return false;
    if (filtro.banca && questao.bancaEstilo !== filtro.banca) return false;
    if (filtro.cargoSlug && questao.cargoSlug !== filtro.cargoSlug && !questao.cargoRelacionados?.includes(filtro.cargoSlug)) return false;
    if (filtro.area && questao.area !== filtro.area) return false;
    if (filtro.nivel && questao.nivel !== filtro.nivel) return false;
    return true;
  });
}

export function getQuestionFilterOptions(baseQuestoes = questoes) {
  return {
    disciplinas: [...new Set(baseQuestoes.map((questao) => questao.disciplina))].sort(),
    assuntos: [...new Set(baseQuestoes.map((questao) => questao.assunto))].sort(),
    subassuntos: [...new Set(baseQuestoes.map((questao) => questao.subassunto ?? questao.microassunto ?? questao.assunto))].sort(),
    bancas: [...new Set(baseQuestoes.map((questao) => questao.bancaEstilo))].sort(),
    cargos: [...new Set(baseQuestoes.map((questao) => questao.cargoSlug))].sort(),
    niveis: [...new Set(baseQuestoes.map((questao) => questao.nivel))].sort(),
  };
}

export function getQuestionBankCoverage() {
  const structure = ["IDECAN", "IDESG", "IBADE", "FGV", "VUNESP", "Cebraspe", "INEP"] as const;

  return {
    total: questoes.length,
    porBanca: Object.fromEntries(
      structure.map((banca) => [banca, questoes.filter((questao) => questao.bancaEstilo === banca).length]),
    ) as Record<typeof structure[number], number>,
    estruturaPreparada: [...structure],
  };
}

export function getQuestoesOverview() {
  const cargoCount = new Set(questoes.map((questao) => questao.cargoSlug)).size;
  const disciplinaCount = new Set(questoes.map((questao) => `${questao.cargoSlug}:${questao.disciplina}`)).size;

  return {
    totalQuestoes: questoes.length,
    cargoCount,
    disciplinaCount,
    porArea: (Object.keys(areaLabels) as QuestaoArea[]).map((area) => ({
      area,
      label: areaLabels[area],
      total: getQuestoesByArea(area).length,
    })),
  };
}
