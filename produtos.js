/*
  ==========================================================================
  produtos.js
  Arquivo: lista de produtos do Mercadinho Canaã
  ==========================================================================

  COMO FUNCIONA:
  - Este arquivo só GUARDA as informações dos produtos (nome, preço, etc).
  - Quem "desenha" os produtos na página é o script.js.
  - Ou seja: para adicionar, remover ou editar um produto, você só precisa
    mexer AQUI. Não precisa tocar no HTML nem no script.js.

  COMO ADICIONAR UM PRODUTO NOVO:
  1. Encontre a categoria certa aqui embaixo (ex: temperos, salgados...).
  2. Dentro de "itens: [ ... ]", copie um produto existente (as chaves { }),
     cole logo abaixo dele e troque as informações.
  3. Não esqueça da vírgula "," no final de cada produto, EXCETO no último
     item da lista.

  CAMPOS DE CADA PRODUTO:
  - nome:      Nome do produto                          (texto, obrigatório)
  - preco:     Preço já formatado, ex: "R$ 4,99"        (texto, obrigatório)
  - unidade:   Unidade de venda, ex: "kg", "un", "L"    (texto, obrigatório)
  - imagem:    Um emoji que representa o produto         (texto, obrigatório)
  - descricao: Frase curta que aparece no card           (texto, obrigatório)
  - destaque:  true ou false — true = aparece também na
               vitrine "Ofertas da Semana"
  - selo:      Texto do selinho colorido no card, ex: "Oferta",
               "Promoção", "Destaque" (só usado se "destaque" for true)
*/

const catalogoProdutos = {

  // ─── Temperos ──────────────────────────────────────────────────────
  tempero: {
    nome: "Temperos",
    emoji: "🧅",
    itens: [
      {
        nome: "Alho Triturado Ricco",
        preco: "R$ 6,00",
        unidade: "200g",
        imagem: "img/alho.jpg",
        descricao: "Sem sal, prático e cheio de sabor.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Colorífico Dona Clara",
        preco: "R$ 1,80",
        unidade: "110g",
        imagem: "img/colorifico.jpg",
        descricao: "Dá cor e sabor especial às suas receitas.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Tempero Completo c/Pim Mariza",
        preco: "R$ 6,51",
        unidade: "300g",
        imagem: "img/temperocomp.jpg",
        descricao: "Tempero completo com pimenta para realçar qualquer prato.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Folha de Louro",
        preco: "R$ 2,00",
        unidade: "un",
        imagem: "img/folhalouro.jpg",
        descricao: "Aroma inconfundível para feijão, carnes e molhos.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Açafrão",
        preco: "R$ 2,00",
        unidade: "un",
        imagem: "img/açafrao.jpg",
        descricao: "Cor e sabor especial para arroz e refogados.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Pimenta do Reino",
        preco: "R$ 2,00",
        unidade: "un",
        imagem: "img/pimentareino.jpg",
        descricao: "Toque picante e aromático para temperar a gosto.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── BISCOITOS E DOCES ─────────────────────────────────────────────────
  biscoitosDoces: {
    nome: "Biscoitos e Doces",
    emoji: "🍪",
    itens: [
      {
        nome: "Biscoito Recheado Rochester",
        preco: "R$ 3,57",
        unidade: "125g",
        imagem: "img/biscoitorichester.jpg",
        descricao: "Crocante por fora, recheado e gostoso por dentro.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Biscoito Wafer Bauducco",
        preco: "R$ 2,93",
        unidade: "80g",
        imagem: "img/wafferbauducco.jpg",
        descricao: "Leve e crocante, perfeito para o lanche.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Biscoito Cream Cracker Fortaleza",
        preco: "R$ 7,14",
        unidade: "350g",
        imagem: "img/creamcracker.jpg",
        descricao: "Rende bastante, ideal para o café da família.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Docinho Bauducco",
        preco: "R$ 2,84",
        unidade: "40g",
        imagem: "🍬",
        descricao: "Doce e saboroso, perfeito para adoçar o dia.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Rocambole Bauducco",
        preco: "R$ 3,36",
        unidade: "34g",
        imagem: "img/rocambolebauducco.jpg",
        descricao: "Fofinho e recheado, uma delícia a qualquer hora.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Salgadinho Yokitos Milho Assado",
        preco: "R$ 3,88",
        unidade: "45g",
        imagem: "img/salgadinhoyoki.jpg",
        descricao: "Crocante e levinho, o clássico salgadinho assado.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── SALGADOS ─────────────────────────────────────────────────────────
  salgados: {
    nome: "Salgados",
    emoji: "🥖",
    itens: [
      {
        nome: "Folheados de Queijo",
        preco: "R$ 6,00",
        unidade: "un",
        imagem: "🥖",
        descricao: "Massa crocante e dourada, recheada com queijo cremoso e saboroso.",
        destaque: true,
        selo: ""
      },
      {
        nome: "Folheados de Frango",
        preco: "R$ 6,00",
        unidade: "un",
        imagem: "img/folheadofrango.jpg",
        descricao: "Massa crocante e dourada, recheada com frango temperado e saboroso.",
        destaque: true,
        selo: ""
      }
    ]
  },

  // ─── BEBIDAS ─────────────────────────────────────────────────────────
  bebidas: {
    nome: "Bebidas",
    emoji: "🧃",
    itens: [
      {
        nome: "Coca Cola",
        preco: "R$ 13,00",
        unidade: "2L",
        imagem: "img/coca.jpg",
        descricao: "Refrigerante super gelado e refrescante.",
        destaque: true,
        selo: ""
      },
      {
        nome: "Coca Cola Lata",
        preco: "R$ 5,00",
        unidade: "350ml",
        imagem: "img/cocalata.jpg",
        descricao: "Gelada e pronta para matar a sede.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Guaraná Antartica",
        preco: "R$ 10,00",
        unidade: "2L",
        imagem: "img/guarana.jpg",
        descricao: "Refrigerante refrescante e saboroso, com o clássico sabor do guaraná brasileiro.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Heineken",
        preco: "R$ 8,50",
        unidade: "330ml",
        imagem: "img/heineken.jpg",
        descricao: "Cerveja refrescante e encorpada, com sabor marcante e o clássico toque de amargor.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Coca Cola Zero",
        preco: "R$ 13,00",
        unidade: "2L",
        imagem: "img/cocazero.jpg",
        descricao: "Bebida refrescante e saborosa, com o clássico sabor da Coca-Cola e zero açúcar.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Stella Gold",
        preco: "R$ 8,50",
        unidade: "330ml",
        imagem: "img/stella.jpg",
        descricao: "Cerveja leve e refrescante, com sabor suave e um toque dourado marcante.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Amstel Lata",
        preco: "R$ 5,00",
        unidade: "269ml",
        imagem: "img/amstel.jpg",
        descricao: "Cerveja leve e refrescante, com sabor equilibrado e perfeita para aproveitar bem gelada.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Suco Maratinho",
        preco: "R$ 2,69",
        unidade: "200ml",
        imagem: "img/maratinho.jpg",
        descricao: "Suco saboroso e refrescante, perfeito para acompanhar suas refeições ou matar a sede.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Coca Cola",
        preco: "R$ 9,00",
        unidade: "1l",
        imagem: "img/coca1l.jpg",
        descricao: "Refrigerante clássico, refrescante e saboroso, ideal para compartilhar nas refeições.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Guaraná Jesus",
        preco: "R$ 13,00",
        unidade: "2L",
        imagem: "img/guaranajesus.jpg",
        descricao: "Refrigerante refrescante com autêntico sabor de guaraná brasileiro.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Fanta Laranja",
        preco: "R$ 13,00",
        unidade: "2L",
        imagem: "img/fantalaranja.jpg",
        descricao: "Refrigerante cítrico e refrescante com o clássico sabor de laranja.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Tampico",
        preco: "R$ 9,50",
        unidade: "1L",
        imagem: "img/tampico.jpg",
        descricao: "Suco refrescante com sabor tropical intenso e autêntico.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── MERCEARIA ───────────────────────────────────────────────────────
  mercearia: {
    nome: "Mercearia",
    emoji: "🛒",
    itens: [
      {
        nome: "Arroz Girassol",
        preco: "R$ 4,86",
        unidade: "1kg",
        imagem: "img/arrozgirassol.jpg",
        descricao: "Leve e soltinho, perfeito para o almoço do dia a dia.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Macarrão Parafuso Estrela",
        preco: "R$ 5,44",
        unidade: "400g",
        imagem: "img/macarraoestrela.jpg",
        descricao: "Cozinha rápido e combina com qualquer molho.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Café União",
        preco: "R$ 16,70",
        unidade: "un",
        imagem: "img/cafeuniao.jpg",
        descricao: "Encorpado e aromático, o café que não pode faltar.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Açúcar Itajá",
        preco: "R$ 3,88",
        unidade: "1kg",
        imagem: "img/acucaritaja.jpg",
        descricao: "Cristalino e puro, ideal para o café e receitas.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Extrato de Tomate Elefante",
        preco: "R$ 8,10",
        unidade: "300g",
        imagem: "img/extratotomate.jpg",
        descricao: "Concentrado e saboroso, base perfeita para molhos.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Sardinha Pescador",
        preco: "R$ 6,48",
        unidade: "un",
        imagem: "img/sardinhapescador.jpg",
        descricao: "Prática e nutritiva, ótima para refeições rápidas.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── LIMPEZA ─────────────────────────────────────────────────────────
  limpeza: {
    nome: "Limpeza",
    emoji: "🧹",
    itens: [
      {
        nome: "Água Sanitária Clorito",
        preco: "R$ 2,49",
        unidade: "1L",
        imagem: "img/aguasanitaria.jpg",
        descricao: "Desinfeta e limpa com eficiência.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Sabão em Pó Tixan",
        preco: "R$ 6,60",
        unidade: "un",
        imagem: "img/sabaoempotixan.jpg",
        descricao: "Remove manchas e deixa as roupas com cheiro agradável.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Desinfetante Azulim",
        preco: "R$ 6,22",
        unidade: "1L",
        imagem: "img/desinfetanteazulim.jpg",
        descricao: "Elimina germes e deixa o ambiente limpo e perfumado.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Amaciante Ypê",
        preco: "R$ 6,21",
        unidade: "675ml",
        imagem: "img/amacianteype.jpg",
        descricao: "Deixa as roupas macias e com cheiro suave.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Sabão em Barra Bem-te-vi",
        preco: "R$ 10,25",
        unidade: "900g",
        imagem: "img/sabaobemtevi.jpg",
        descricao: "Limpeza poderosa para roupas e superfícies.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Detergente Brilux",
        preco: "R$ 2,49",
        unidade: "500ml",
        imagem: "img/detergentebrilux.jpg",
        descricao: "Corta gordura e brilha a louça com facilidade.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── HIGIENE E CUIDADOS ──────────────────────────────────────────────
  higiene: {
    nome: "Higiene e Cuidados",
    emoji: "🧴",
    itens: [
      {
        nome: "Sabonete Nívea",
        preco: "R$ 2,71",
        unidade: "85g",
        imagem: "img/sabonetenivea.jpg",
        descricao: "Hidratação e cuidado para a pele do dia a dia.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Creme Dental Closeup",
        preco: "R$ 3,50",
        unidade: "70g",
        imagem: "img/pastacloseup.jpg",
        descricao: "Hálito fresco e dentes brancos a cada escovação.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Desodorante Nívea",
        preco: "R$ 13,00",
        unidade: "150ml",
        imagem: "img/desodorantenivea.jpg",
        descricao: "Proteção duradoura e sensação de frescor o dia todo.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Absorvente Intimus",
        preco: "R$ 5,31",
        unidade: "8un",
        imagem: "img/absorventeintimus.jpg",
        descricao: "Proteção segura e confortável para o dia a dia.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Papel Higiênico Finus Prime",
        preco: "R$ 5,83",
        unidade: "un",
        imagem: "img/papelfinus.jpg",
        descricao: "Folha dupla, macio e resistente.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Papel Toalha Familiar",
        preco: "R$ 4,98",
        unidade: "fd",
        imagem: "img/papeltoalhafamiliar.jpg",
        descricao: "Absorvente e resistente para uso doméstico.",
        destaque: false,
        selo: ""
      }
    ]
  },

  // ─── LATICÍNIOS ──────────────────────────────────────────────────────
  laticinios: {
    nome: "Laticínios",
    emoji: "🧀",
    itens: [
      {
        nome: "Leite em Pó Piracanjuba",
        preco: "R$ 7,66",
        unidade: "200g",
        imagem: "img/leiteempo.jpg",
        descricao: "Cremoso e nutritivo, perfeito para receitas e bebidas.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Leite Condensado Piracanjuba",
        preco: "R$ 8,74",
        unidade: "un",
        imagem: "img/leitecondensado.jpg",
        descricao: "Cremoso e doce, indispensável nas sobremesas.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Creme de Leite Piracanjuba",
        preco: "R$ 3,76",
        unidade: "un",
        imagem: "img/cremedeleite.jpg",
        descricao: "Suave e encorpado, ideal para molhos e sobremesas.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Leite Condensado Zero Lactose",
        preco: "R$ 0,00",
        unidade: "un",
        imagem: "🍮",
        descricao: "Todo o sabor do leite condensado, sem lactose.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Creme de Leite Zero Lactose",
        preco: "R$ 0,00",
        unidade: "un",
        imagem: "🍦",
        descricao: "Cremoso e saboroso, sem lactose.",
        destaque: false,
        selo: ""
      },
      {
        nome: "Leite em Pó Zero Lactose",
        preco: "R$ 0,00",
        unidade: "un",
        imagem: "🥛",
        descricao: "Nutritivo e saboroso, sem lactose.",
        destaque: false,
        selo: ""
      }
    ]
  }

};