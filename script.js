/*
  ==========================================================================
  script.js
  Arquivo: funcionalidades do site Mercadinho Canaã
  ==========================================================================

  RESPONSABILIDADES DESTE ARQUIVO:
  - Menu mobile (abrir/fechar, Escape)
  - Scroll reveal (animação de fade ao rolar a página)
  - Highlight de nav conforme a seção visível
  - Renderização de produtos a partir do catalogoProdutos (produtos.js)
  - Carrinho de compras (adicionar, alterar quantidade, remover)
  - Envio do pedido via WhatsApp

  NÚMERO DO WHATSAPP: definido na constante WA_NUMBER abaixo.
  Altere apenas aqui para que o FAB e o carrinho usem o mesmo número.
  ==========================================================================
*/

'use strict';

// ─── CONFIGURAÇÃO ─────────────────────────────────────────────────────────────
const WA_NUMBER = '5598987128631'; // número sem + e sem espaços

// ─── ESTADO DO CARRINHO ───────────────────────────────────────────────────────
// Cada item: { chave, nome, preco (número), precoFormatado, unidade, imagem, quantidade }
let carrinho = [];

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────

/** Converte "R$ 4,99" → 4.99 */
function precoParaNumero(str) {
  return parseFloat(str.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
}

/** Formata 4.99 → "R$ 4,99" */
function numeroParaPreco(n) {
  return 'R$ ' + n.toFixed(2).replace('.', ',');
}

// ─── MENU MOBILE ──────────────────────────────────────────────────────────────
function iniciarMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.classList.toggle('open', !open);
    mobileNav.setAttribute('aria-hidden', String(open));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharMenuMobile();
  });
}

function fecharMenuMobile() {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}

// exposta globalmente para os onclick inline do mobile-nav
window.closeMobile = fecharMenuMobile;

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function iniciarScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 60 * i);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observarReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  observarReveal();
  // reobservar após renderização dinâmica de produtos
  window._observarReveal = observarReveal;
}

// ─── HIGHLIGHT DE NAV (com efeito brilho) ────────────────────────────────────
function iniciarNavHighlight() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = document.querySelectorAll('header nav a, .mobile-nav a');

  // Mapeia href → link para lookup rápido
  function atualizarAtivo(idAtivo) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const match = href === '#' + idAtivo;
      link.classList.toggle('nav-ativo', match);
    });
  }

  // Usa IntersectionObserver com rootMargin para detectar qual seção está
  // ocupando a maior parte da viewport (topo da tela)
  const observerOpcoes = {
    threshold: 0,
    rootMargin: '-10% 0px -75% 0px'   // considera seção ativa quando cruza os 10–25% superiores
  };

  // Mantém controle de quais seções estão "visíveis" no intervalo definido
  const visiveis = new Set();

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visiveis.add(entry.target.id);
      } else {
        visiveis.delete(entry.target.id);
      }
    });

    // Usa a primeira seção visível na ordem do DOM como ativa
    if (visiveis.size > 0) {
      const primeiraAtiva = sections.find(s => visiveis.has(s.id));
      if (primeiraAtiva) atualizarAtivo(primeiraAtiva.id);
    }
  }, observerOpcoes);

  sections.forEach(s => navObserver.observe(s));

  // Ativa "inicio" por padrão ao carregar
  atualizarAtivo('inicio');
}

// ─── FORMULÁRIO DE CONTATO ────────────────────────────────────────────────────
function iniciarFormContato() {
  const form = document.getElementById('contato-form');
  const successMsg = document.getElementById('form-success');
  if (!form || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    setTimeout(() => {
      successMsg.classList.add('show');
      form.reset();
      btn.textContent = 'Enviar Mensagem';
      btn.disabled = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
  });
}

// ─── RENDERIZAÇÃO DE PRODUTOS ─────────────────────────────────────────────────

/** Gera a chave única de um produto para o carrinho */
function gerarChaveProduto(chaveCategoria, nomeProduto) {
  return chaveCategoria + '::' + nomeProduto;
}

/** Monta o HTML de um único card de produto */
function criarCardProduto(produto, nomeCategoria, chaveCategoria) {
  const selo = produto.selo
    ? `<span class="produto-badge">${produto.selo}</span>`
    : '';

  const chave = gerarChaveProduto(chaveCategoria, produto.nome);
  const chaveEsc = chave.replace(/'/g, "\\'");

  return `
    <article class="produto-card reveal visible">
      <div class="produto-img" role="img" aria-label="${produto.nome}">
        ${selo}
        ${produto.imagem.includes('/') ? `<img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">` : produto.imagem}
      </div>
      <div class="produto-body">
        <p class="produto-cat">${nomeCategoria}</p>
        <h3 class="produto-name">${produto.nome}</h3>
        <p class="produto-desc">${produto.descricao}</p>
        <div class="produto-footer">
          <span class="produto-price">${produto.preco} <span>/ ${produto.unidade}</span></span>
          <button
            class="btn btn-dark btn-adicionar-carrinho"
            style="font-size:13px;padding:10px 18px;"
            aria-label="Adicionar ${produto.nome} ao carrinho"
            onclick="adicionarAoCarrinho('${chaveEsc}', '${produto.nome.replace(/'/g,"\\'")}', '${produto.preco}', '${produto.unidade}', '${produto.imagem}')"
          >🛒 Adicionar</button>
        </div>
      </div>
    </article>
  `;
}

/** Monta a vitrine "Ofertas da Semana" */
function renderizarOfertas() {
  const grid = document.getElementById('ofertas-grid');
  if (!grid) return;

  let html = '';
  for (const chave in catalogoProdutos) {
    const cat = catalogoProdutos[chave];
    cat.itens.forEach(produto => {
      if (produto.destaque) html += criarCardProduto(produto, cat.nome, chave);
    });
  }
  grid.innerHTML = html;
}

/** Monta a lista completa por categoria */
function renderizarCategorias() {
  const container = document.getElementById('lista-produtos-categorias');
  if (!container) return;

  let html = '';
  for (const chave in catalogoProdutos) {
    const cat = catalogoProdutos[chave];
    const cardsHtml = cat.itens.map(p => criarCardProduto(p, cat.nome, chave)).join('');

    html += `
      <div class="categoria-bloco" id="categoria-${chave}">
        <h3 class="categoria-titulo">
          <span aria-hidden="true">${cat.emoji}</span> ${cat.nome}
        </h3>
        <div class="produtos-grid">${cardsHtml}</div>
      </div>
    `;
  }
  container.innerHTML = html;
}

/** Rola até o bloco da categoria clicada */
function irParaCategoria(chaveCategoria) {
  const alvo = document.getElementById('categoria-' + chaveCategoria);
  if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.irParaCategoria = irParaCategoria;

// ─── CARRINHO DE COMPRAS ──────────────────────────────────────────────────────

/** Abre/fecha o painel lateral do carrinho */
function toggleCarrinho() {
  const drawer = document.getElementById('carrinho-drawer');
  const overlay = document.getElementById('carrinho-overlay');
  if (!drawer) return;
  const aberto = drawer.classList.toggle('aberto');
  overlay.classList.toggle('visivel', aberto);
  document.body.classList.toggle('carrinho-aberto', aberto);
}
window.toggleCarrinho = toggleCarrinho;

function fecharCarrinho() {
  const drawer = document.getElementById('carrinho-drawer');
  const overlay = document.getElementById('carrinho-overlay');
  if (!drawer) return;
  drawer.classList.remove('aberto');
  overlay.classList.remove('visivel');
  document.body.classList.remove('carrinho-aberto');
}
window.fecharCarrinho = fecharCarrinho;

/** Adiciona produto ao carrinho ou incrementa quantidade */
function adicionarAoCarrinho(chave, nome, precoStr, unidade, imagem) {
  const existente = carrinho.find(i => i.chave === chave);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      chave,
      nome,
      precoFormatado: precoStr,
      preco: precoParaNumero(precoStr),
      unidade,
      imagem,
      quantidade: 1
    });
  }
  atualizarCarrinho();
  mostrarFeedbackAdicao();
}
window.adicionarAoCarrinho = adicionarAoCarrinho;

/** Altera quantidade de um item; remove se chegar a 0 */
function alterarQuantidade(chave, delta) {
  const item = carrinho.find(i => i.chave === chave);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) carrinho = carrinho.filter(i => i.chave !== chave);
  atualizarCarrinho();
}
window.alterarQuantidade = alterarQuantidade;

/** Remove item diretamente */
function removerItem(chave) {
  carrinho = carrinho.filter(i => i.chave !== chave);
  atualizarCarrinho();
}
window.removerItem = removerItem;

/** Atualiza badge, lista e total do carrinho */
function atualizarCarrinho() {
  const badge = document.getElementById('carrinho-badge');
  const lista = document.getElementById('carrinho-lista');
  const totalEl = document.getElementById('carrinho-total');
  const vazioEl = document.getElementById('carrinho-vazio');
  const rodapeEl = document.getElementById('carrinho-rodape');

  const totalItens = carrinho.reduce((s, i) => s + i.quantidade, 0);
  const totalValor = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);

  // badge
  if (badge) {
    badge.textContent = totalItens;
    badge.style.display = totalItens > 0 ? 'flex' : 'none';
  }

  // vazio / rodapé
  if (vazioEl) vazioEl.style.display = carrinho.length === 0 ? 'flex' : 'none';
  if (rodapeEl) rodapeEl.style.display = carrinho.length > 0 ? 'block' : 'none';

  // lista de itens
  if (lista) {
    lista.innerHTML = carrinho.map(item => {
      const subtotal = numeroParaPreco(item.preco * item.quantidade);
      const chaveEsc = item.chave.replace(/'/g, "\\'");
      return `
        <div class="carrinho-item">
          <div class="carrinho-item-emoji" aria-hidden="true">${item.imagem.includes('/') ? `<img src="${item.imagem}" alt="${item.nome}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">` : item.imagem}</div>
          <div class="carrinho-item-info">
            <p class="carrinho-item-nome">${item.nome}</p>
            <p class="carrinho-item-preco-unit">${item.precoFormatado} / ${item.unidade}</p>
            <div class="carrinho-item-controles">
              <button class="qty-btn" onclick="alterarQuantidade('${chaveEsc}', -1)" aria-label="Diminuir quantidade de ${item.nome}">−</button>
              <span class="qty-valor" aria-live="polite">${item.quantidade}</span>
              <button class="qty-btn" onclick="alterarQuantidade('${chaveEsc}', 1)" aria-label="Aumentar quantidade de ${item.nome}">+</button>
            </div>
          </div>
          <div class="carrinho-item-direita">
            <p class="carrinho-item-subtotal">${subtotal}</p>
            <button class="carrinho-remover" onclick="removerItem('${chaveEsc}')" aria-label="Remover ${item.nome}">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // total
  if (totalEl) totalEl.textContent = numeroParaPreco(totalValor);
}

/** Feedback visual ao adicionar (o botão pulsa) */
function mostrarFeedbackAdicao() {
  // abre o carrinho brevemente em mobile ao adicionar
  const badge = document.getElementById('carrinho-badge');
  if (badge) {
    badge.classList.remove('pulsar');
    void badge.offsetWidth; // reflow
    badge.classList.add('pulsar');
    setTimeout(() => badge.classList.remove('pulsar'), 600);
  }
}

/** Gera e abre a mensagem de pedido no WhatsApp */
function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio. Adicione produtos antes de enviar o pedido.');
    return;
  }

  const totalValor = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);

  let linhas = [];
  linhas.push('Olá! Gostaria de fazer um pedido:');
  linhas.push('');
  linhas.push('─────────────────────');

  carrinho.forEach(item => {
    const subtotal = numeroParaPreco(item.preco * item.quantidade);
    linhas.push(`*${item.nome}*`);
    linhas.push(`   ${item.quantidade}x ${item.precoFormatado}/${item.unidade} = ${subtotal}`);
  });

  linhas.push('─────────────────────');
  linhas.push(`*Total: ${numeroParaPreco(totalValor)}*`);
  linhas.push('');
  linhas.push('Vou retirar na loja. Pode confirmar a disponibilidade?');

  const mensagem = linhas.join('\n');
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank', 'noopener');
}
window.enviarPedidoWhatsApp = enviarPedidoWhatsApp;

/** Injeta o HTML do drawer do carrinho no body */
function criarDrawerCarrinho() {
  const overlay = document.createElement('div');
  overlay.id = 'carrinho-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.onclick = fecharCarrinho;

  const drawer = document.createElement('aside');
  drawer.id = 'carrinho-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Carrinho de compras');
  drawer.setAttribute('aria-modal', 'true');

  drawer.innerHTML = `
    <div class="carrinho-header">
      <h2 class="carrinho-titulo">🛒 Meu Carrinho</h2>
      <button class="carrinho-fechar" onclick="fecharCarrinho()" aria-label="Fechar carrinho">✕</button>
    </div>

    <div class="carrinho-corpo">
      <div id="carrinho-vazio" class="carrinho-vazio" role="status">
        <span aria-hidden="true">🛒</span>
        <p>Seu carrinho está vazio.</p>
        <p class="carrinho-vazio-sub">Adicione produtos para montar seu pedido.</p>
      </div>
      <div id="carrinho-lista" aria-live="polite" aria-label="Itens no carrinho"></div>
    </div>

    <div id="carrinho-rodape" class="carrinho-rodape" style="display:none">
      <div class="carrinho-total-linha">
        <span>Total</span>
        <span id="carrinho-total" class="carrinho-total-valor">R$ 0,00</span>
      </div>
      <p class="carrinho-aviso">Pedido para retirada na loja.</p>
      <button class="btn btn-whatsapp" onclick="enviarPedidoWhatsApp()">
        <span aria-hidden="true">💬</span> Enviar pedido pelo WhatsApp
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Cria o drawer do carrinho no DOM
  criarDrawerCarrinho();
  atualizarCarrinho(); // estado inicial

  // Funcionalidades gerais
  iniciarMenuMobile();
  iniciarScrollReveal();
  iniciarNavHighlight();
  iniciarFormContato();

  // Renderiza produtos (depende de produtos.js estar carregado antes)
  try {
    if (typeof catalogoProdutos === 'undefined') {
      console.error('produtos.js não foi carregado. Verifique se o arquivo está na mesma pasta do index.html.');
    } else {
      renderizarOfertas();
      renderizarCategorias();
      // Reobserva os elementos de reveal gerados dinamicamente
      if (window._observarReveal) window._observarReveal();
    }
  } catch (erro) {
    console.error('Erro ao renderizar produtos:', erro);
  }
});