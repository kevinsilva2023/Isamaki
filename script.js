// Configuração das promoções por dia da semana
const promocoesPorDia = {
    5: { // Domingo
        imagem: 'images/temaki1.jpg',
        titulo: 'Temaki Salmão Especial',
        descricao: 'Domingo é dia de relaxar com nosso delicioso temaki de salmão fresco!',
        precoAntigo: 'R$ 25,00',
        precoNovo: 'R$ 18,90'
    },
    1: { // Segunda
        imagem: 'imagens/temaki2.jpeg',
        titulo: 'Temaki Salmão com Cream Cheese',
        descricao: 'Comece a semana com energia! Temaki com desconto especial.',
        precoAntigo: 'R$ 29,90',
        precoNovo: 'R$ 23,90'
    },
    2: { // Terça
        imagem: 'imagens/temaki3.jpeg',
        titulo: 'Temaki Salmão Grelhado',
        descricao: 'Terça-feira é dia de inovar! Experimente nosso temaki de salmão grelhado.',
        precoAntigo: 'R$ 29,90',
        precoNovo: 'R$ 23,90'
    },
    0: { // Quarta
        imagem: 'imagens/yakisoba.jpg',
        titulo: 'Yakisoba de Carne',
        descricao: 'Nesse domingo frio, cabe um yakisoba quentinho',
        precoAntigo: 'R$ 50,00',
        precoNovo: 'R$ 40,00'
    },
    4: { // Quinta
        imagem: 'imagens/poke.jpeg',
        titulo: 'Qualquer poke',
        descricao: 'Escolha qualquer um de nossos deliciosos pokes!',
        precoAntigo: 'R$ 50,00',
        precoNovo: 'R$ 43,00'
    },
    3: { // Sexta
        imagem: 'imagens/hotholl.jpg',
        titulo: '8 Hotholl Crocante',
        descricao: 'Sexta-feira é dia de celebrar!',
        precoAntigo: 'R$ 35,00',
        precoNovo: 'R$ 22,90',
    },
    6: { // Sábado
        imagem: 'imagens/poke.jpeg',
        titulo: 'Qualquer poke',
        descricao: 'Escolha qualquer um de nossos deliciosos pokes!',
        precoAntigo: 'R$ 50,00',
        precoNovo: 'R$ 43,00'
    }
};

const diasSemana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
    'Quinta-feira', 'Sexta-feira', 'Sábado'
];

// Variáveis do carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Elementos da promoção
const currentDayElement = document.getElementById('current-day');
const promoImageElement = document.getElementById('promo-image');
const promoTitleElement = document.getElementById('promo-title');
const promoDescriptionElement = document.getElementById('promo-description');
const oldPriceElement = document.getElementById('old-price');
const newPriceElement = document.getElementById('new-price');

// Função para atualizar a promoção do dia
function atualizarPromocaoDoDia() {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const promocao = promocoesPorDia[diaSemana];
    
    // Atualizar elementos da página
    currentDayElement.textContent = diasSemana[diaSemana];
    promoImageElement.src = promocao.imagem;
    promoImageElement.alt = promocao.titulo;
    promoTitleElement.textContent = promocao.titulo;
    promoDescriptionElement.textContent = promocao.descricao;
    oldPriceElement.textContent = promocao.precoAntigo;
    newPriceElement.textContent = promocao.precoNovo;
    
    // Adicionar efeito de fade na imagem
    promoImageElement.style.opacity = '0';
    setTimeout(() => {
        promoImageElement.style.opacity = '1';
    }, 100);
}

// Função para mostrar slide específico
function mostrarSlide(index) {
    // Remover classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe active ao slide e indicador atual
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Mover o carrossel
    const slideWidth = slides[0].offsetWidth;
    document.querySelector('.carousel-slides').style.transform = `translateX(-${index * slideWidth}px)`;
    
    currentSlide = index;
}

// Função para ir para o próximo slide
function proximoSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    mostrarSlide(nextIndex);
}

// Função para ir para o slide anterior
function slideAnterior() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    mostrarSlide(prevIndex);
}

// Função para auto-play do carrossel
function iniciarAutoPlay() {
    setInterval(() => {
        proximoSlide();
    }, 8000); // Muda slide a cada 8 segundos
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar promoção do dia
    atualizarPromocaoDoDia();
    
    // Configurar controles do carrossel
    document.getElementById('next-btn').addEventListener('click', proximoSlide);
    document.getElementById('prev-btn').addEventListener('click', slideAnterior);
    
    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            mostrarSlide(index);
        });
    });
    
    // Configurar navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            slideAnterior();
        } else if (e.key === 'ArrowRight') {
            proximoSlide();
        }
    });
    
    // Configurar botão CTA
    document.querySelector('.cta-button').addEventListener('click', function() {
        // Simular ação de pedido
        const promocao = promocoesPorDia[new Date().getDay()];
        
        alert(`🍣 Ótima escolha! ${promocao.titulo} por apenas ${promocao.precoNovo}!\n\n📞 Ligue (11) 9999-9999 para fazer seu pedido!`);
    });
    
    // Iniciar auto-play
    iniciarAutoPlay();
    
    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    let autoPlayInterval;
    
    carouselContainer.addEventListener('mouseenter', function() {
        clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        autoPlayInterval = setInterval(() => {
            proximoSlide();
        }, 8000);
    });
});

// Função para redimensionar carrossel em mudanças de tela
window.addEventListener('resize', function() {
    mostrarSlide(currentSlide);
});

// Função para adicionar efeitos de scroll suave
function smoothScroll() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar animações de entrada
function adicionarAnimacoesEntrada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observar elementos que devem animar
    const elementsToAnimate = document.querySelectorAll('.menu-table, .combo-table, .promo-section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para adicionar efeitos de hover nas tabelas
function adicionarEfeitosTabela() {
    const tableRows = document.querySelectorAll('.menu-table tr, .combo-table tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Inicializar todas as funcionalidades quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    adicionarAnimacoesEntrada();
    adicionarEfeitosTabela();
});

// Função para atualizar horário em tempo real (opcional)
function atualizarHorario() {
    const agora = new Date();
    const horario = agora.toLocaleTimeString('pt-BR');
    
    // Se houver um elemento para mostrar horário, atualizar
    const horarioElement = document.getElementById('horario-atual');
    if (horarioElement) {
        horarioElement.textContent = horario;
    }
}

// Atualizar horário a cada segundo (se necessário)
// setInterval(atualizarHorario, 1000);

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento para dispositivos móveis
if (isMobile()) {
    // Reduzir tempo de auto-play em dispositivos móveis
    const autoPlayTime = 6000;
} else {
    const autoPlayTime = 8000;
}

// Adicionar suporte a gestos touch para dispositivos móveis
let startX = 0;
let endX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.querySelector('.carousel-container').addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Mínimo de pixels para considerar um swipe
    
    if (startX - endX > threshold) {
        // Swipe para a esquerda - próximo slide
        proximoSlide();
    } else if (endX - startX > threshold) {
        // Swipe para a direita - slide anterior
        slideAnterior();
    }
}

