// Registar o Service Worker para permitir o funcionamento PWA e offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// Pedir permissão para enviar notificações assim que a app inicia
if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

// Configuração oficial dos 16 locais do Bingo
const locations = [
    // Linha 1
    { 
        id: 0, name: "Ribeira do Porto", lat: 41.1405, lon: -8.6120, imgUrl: "./ribeira.png", unlocked: false,
        desc: "O coração histórico da cidade, banhado pelo rio Douro. As suas casas coloridas são um ícone mundial.",
        hist: "Uma das zonas mais antigas do Porto, foi desde a Idade Média um intenso centro de comércio marítimo e fluvial.",
        curio: "Sabias que as casas estreitas e altas foram construídas assim porque, na época, os impostos eram pagos consoante a largura da fachada?"
    },
    { 
        id: 1, name: "Mercado do Bolhão", lat: 41.1488, lon: -8.6058, imgUrl: "./bolhao.png", unlocked: false,
        desc: "O mercado mais emblemático do Porto, vibrante de cores, cheiros e tradição.",
        hist: "Inaugurado em 1914, a sua arquitetura neoclássica alberga o comércio tradicional de frescos há mais de um século.",
        curio: "As vendedoras do Bolhão, conhecidas pelo seu forte sotaque e pregões castiços, são consideradas as verdadeiras almas deste espaço."
    },
    { 
        id: 2, name: "Igreja de Santo Ildefonso", lat: 41.1458, lon: -8.6066, imgUrl: "./santo-ildefonso.png", unlocked: false,
        desc: "Uma belíssima igreja barroca que domina a Praça da Batalha com a sua imponente fachada revestida a azulejos.",
        hist: "Reconstruída no início do século XVIII, a sua fachada foi revestida em 1932 com cerca de 11 mil azulejos do mestre Jorge Colaço.",
        curio: "A igreja sobreviveu ao Cerco do Porto e a várias tempestades severas, mantendo-se inabalável no topo da sua escadaria monumental."
    },
    { 
        id: 3, name: "Casa da Música", lat: 41.1582, lon: -8.6307, imgUrl: "./casa-musica.png", unlocked: false,
        desc: "Um ícone da arquitetura contemporânea mundial e a principal sala de espetáculos da cidade do Porto.",
        hist: "Desenhada pelo aclamado arquiteto Rem Koolhaas, foi projetada para assinalar a capital europeia da cultura de 2001, abrindo finalmente as portas em 2005.",
        curio: "A sua forma geométrica completamente assimétrica faz lembrar, de forma propositada, um meteorito que acabou de aterrar na Rotunda da Boavista."
    },
    
    // Linha 2
    { 
        id: 4, name: "Estação de São Bento", lat: 41.1455, lon: -8.6105, imgUrl: "./sao-bento.png", unlocked: false,
        desc: "Uma das estações de comboio mais deslumbrantes do mundo, famosa pelo seu átrio inteiramente forrado a azulejos.",
        hist: "Construída no início do século XX sobre as ruínas do antigo Convento de São Bento de Ave-Maria, que lhe deu o nome.",
        curio: "Os seus 20 mil azulejos contam detalhadamente a história de Portugal, desde batalhas épicas à evolução dos transportes ao longo dos tempos."
    },
    { 
        id: 5, name: "Avenida dos Aliados", lat: 41.1478, lon: -8.6112, imgUrl: "./aliados.png", unlocked: false,
        desc: "O imponente 'salão de visitas' do Porto, ladeado por edifícios monumentais em granito.",
        hist: "Projetada no início do século XX, esta artéria rasgou o centro histórico para criar uma praça monumental digna das grandes metrópoles europeias.",
        curio: "O nome homenageia os países Aliados da Primeira Guerra Mundial. É aqui que todos os portuenses se reúnem para celebrar as grandes vitórias e passagens de ano."
    },
    { 
        id: 6, name: "Teatro Nacional São João", lat: 41.1443, lon: -8.6074, imgUrl: "./sao-joao.png", unlocked: false,
        desc: "O teatro mais prestigiado da cidade, dono de uma arquitetura elegante e de uma rica programação cultural.",
        hist: "O edifício original de 1798 ardeu por completo num grande incêndio. O teatro atual foi inaugurado em 1920, com projeto do arquiteto Marques da Silva.",
        curio: "Se olhares bem para a fachada, vais notar que ela se assemelha muito à da Ópera Garnier em Paris, evidenciando a forte influência francesa da época."
    },
    { 
        id: 7, name: "Torre dos Clérigos", lat: 41.1458, lon: -8.6139, imgUrl: "./clerigos.png", unlocked: false,
        desc: "A torre sineira mais alta de Portugal e o verdadeiro ex-líbris e símbolo incontestável da cidade do Porto.",
        hist: "Trata-se de uma obra-prima barroca desenhada pelo arquiteto italiano Nicolau Nasoni e construída a meio do século XVIII.",
        curio: "Para teres a melhor vista panorâmica em 360 graus sobre a cidade e o rio Douro, terás de ter fôlego para subir os seus 225 degraus!"
    },
    
    // Linha 3
    { 
        id: 8, name: "Mosteiro S. Bento da Vitória", lat: 41.1444, lon: -8.6160, imgUrl: "./mosteiro-vitoria.png", unlocked: false,
        desc: "Um imponente edifício monástico fortificado, enraizado no coração do antigo bairro judeu do Porto.",
        hist: "A sua construção começou em 1596, arrastando-se por quase todo o século XVII. Foi erguido num terreno que albergava antigas casas da judiaria e a velha sinagoga.",
        curio: "O edifício teve múltiplas vidas ao longo da história, chegando mesmo a ser utilizado como hospital militar durante o período das Invasões Francesas."
    },
    { 
        id: 9, name: "Mercado Ferreira Borges", lat: 41.1418, lon: -8.6148, imgUrl: "./ferreira-borges.png", unlocked: false,
        desc: "Um fascinante e chamativo edifício vermelho, um dos mais belos exemplos da arquitetura do ferro em Portugal.",
        hist: "Construído em 1885 para substituir o velho Mercado da Ribeira, a verdade é que os comerciantes nunca se quiseram mudar, e o edifício nunca operou como mercado.",
        curio: "Sobreviveu incólume a várias ameaças de demolição ao longo do século XX. Hoje em dia, é uma casa de espetáculos e eventos muito popular na cidade."
    },
    { 
        id: 10, name: "Ponte Luiz I", lat: 41.1401, lon: -8.6096, imgUrl: "./ponte-luiz.png", unlocked: false,
        desc: "A grandiosa ponte metálica de dois tabuleiros que une as cidades do Porto e de Vila Nova de Gaia sobre as águas do Douro.",
        hist: "Inaugurada em 1886, a ponte foi projetada pelo engenheiro Théophile Seyrig, que havia sido discípulo e antigo sócio de Gustave Eiffel.",
        curio: "Embora quase todos lhe chamem 'Ponte Dom Luís', o decreto original de batismo chamava-lhe apenas 'Ponte Luiz I', facto que ainda hoje gera debate entre historiadores."
    },
    { 
        id: 11, name: "Igreja da Lapa", lat: 41.1579, lon: -8.6131, imgUrl: "./lapa.png", unlocked: false,
        desc: "Uma igreja majestosa e serena que guarda o tesouro mais precioso e simbólico da história monárquica do Porto.",
        hist: "Com uma construção que durou mais de um século (1755-1863), o local tornou-se rapidamente um dos pontos de devoção mais importantes para a população da cidade.",
        curio: "No altar desta igreja repousa o coração do rei D. Pedro IV. Foi doado por ele próprio à cidade em testamento, como agradecimento pela heroica resistência durante o Cerco do Porto."
    },
    
    // Linha 4
    { 
        id: 12, name: "Sé Catedral do Porto", lat: 41.1427, lon: -8.6112, imgUrl: "./se-catedral.png", unlocked: false,
        desc: "Uma robusta fortaleza-igreja românica que vigia silenciosamente a cidade desde o seu ponto mais elevado.",
        hist: "A sua construção iniciou-se no longínquo século XII. Com o passar do tempo, sofreu imensas alterações, resultando numa mistura de estilos: românico, gótico e barroco.",
        curio: "Foi no altar desta Sé Catedral que o rei D. João I e a inglesa D. Filipa de Lencastre celebraram o seu casamento em 1387, e onde o Infante D. Henrique viria a ser batizado."
    },
    { 
        id: 13, name: "Palácio da Bolsa", lat: 41.1414, lon: -8.6157, imgUrl: "./palacio-bolsa.png", unlocked: false,
        desc: "Um deslumbrante e faustoso palácio neoclássico mandado construir pela poderosa Associação Comercial do Porto.",
        hist: "Erguido sobre as ruínas de um antigo claustro do Convento de São Francisco, que tinha sido consumido pelas chamas durante o intenso Cerco do Porto em 1832.",
        curio: "A sua principal joia, o Salão Árabe (diretamente inspirado no Palácio de Alhambra), é considerado uma das salas mais luxuosas e ornamentadas de todo o país."
    },
    { 
        id: 14, name: "Antiga Cadeia da Relação", lat: 41.1447, lon: -8.6153, imgUrl: "./cadeia-relacao.png", unlocked: false,
        desc: "Um edifício imponente, maciço e austero, que atualmente é a casa do Centro Português de Fotografia.",
        hist: "O edifício atual serviu como o mais severo tribunal e prisão da cidade desde a sua conclusão em 1796 até 1974, sendo desativado após a Revolução dos Cravos.",
        curio: "O célebre escritor Camilo Castelo Branco esteve preso nas suas celas frias por causa de um romance adúltero, acabando por escrever lá dentro a sua maior obra: 'Amor de Perdição'."
    },
    { 
        id: 15, name: "Livraria Lello", lat: 41.1469, lon: -8.6149, imgUrl: "./lello.png", unlocked: false,
        desc: "Apontada vezes sem conta como uma das livrarias mais bonitas do mundo, distinguindo-se pela sua escadaria carmesim fluida.",
        hist: "Inaugurada em 1906 pelos irmãos Lello, este edifício de traça neogótica é uma verdadeira obra de arte talhada em madeira esculpida e tetos com vitrais.",
        curio: "Reza a lenda que a sua estética mágica serviu de inspiração a J.K. Rowling para desenhar o mundo de Harry Potter, transformando a rua num local de romaria de fãs internacionais."
    }
];

// Elementos do HTML
const grid = document.getElementById('bingo-grid');
const modal = document.getElementById('location-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.getElementById('close-modal');
const unlockSound = document.getElementById('unlock-sound');

const modalDesc = document.getElementById('modal-desc');
const modalHist = document.getElementById('modal-hist');
const modalCurio = document.getElementById('modal-curio');

let currentLocation = null; // Guarda o local selecionado

// Recuperar progresso guardado
function loadProgress() {
    const savedProgress = localStorage.getItem('oportoBingoProgress');
    if (savedProgress) {
        const unlockedStates = JSON.parse(savedProgress);
        locations.forEach((loc, i) => {
            if (unlockedStates[i]) loc.unlocked = true;
        });
    }
}

// Guardar progresso
function saveProgress() {
    const unlockedStates = locations.map(loc => loc.unlocked);
    localStorage.setItem('oportoBingoProgress', JSON.stringify(unlockedStates));
}

loadProgress();

// Desenhar a Grelha
function renderGrid() {
    grid.innerHTML = '';
    locations.forEach((loc) => {
        const cell = document.createElement('div');
        cell.id = `cell-${loc.id}`; 
        cell.className = `cell ${loc.unlocked ? 'unlocked' : ''}`;
        cell.innerHTML = `<img src="${loc.imgUrl}" alt="${loc.name}">`;
        
        cell.addEventListener('click', () => {
            openModal(loc);
        });
        grid.appendChild(cell);
    });
}

// Controlar o Modal (Adaptado para bloqueados/desbloqueados)
function openModal(loc) {
    currentLocation = loc;
    modalTitle.innerText = loc.name;
    
    const tabsContainer = document.getElementById('modal-tabs');
    const btnAudio = document.getElementById('btn-audio');
    
    if(speechSynthesis.speaking) speechSynthesis.cancel();
    btnAudio.innerText = "🔊 Ouvir Textos";

    if (loc.unlocked) {
        modalImg.src = loc.imgUrl;
        modalDesc.innerText = loc.desc || "Desbloqueaste este local!";
        modalHist.innerText = loc.hist || "A história deste local será revelada em breve.";
        modalCurio.innerText = loc.curio || "Ainda não temos curiosidades sobre este local.";
        
        tabsContainer.classList.remove('hidden');
        btnAudio.classList.remove('hidden');
        
        const firstTabBtn = document.querySelector('.tab-btn');
        if(firstTabBtn) firstTabBtn.click(); 
    } else {
        modalImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Compass_icon.png/200px-Compass_icon.png";
        modalDesc.innerText = "Aproxima-te a menos de 50 metros para revelar os segredos deste local histórico!";
        
        tabsContainer.classList.add('hidden');
        btnAudio.classList.add('hidden');
        
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active");
        document.getElementById("tab-resumo").classList.add("active");
    }
    
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    if(speechSynthesis.speaking) speechSynthesis.cancel();
});

// Lógica de Proximidade e Radar
function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            const cellElement = document.getElementById(`cell-${loc.id}`);
            
            if (dist < 50) { 
                loc.unlocked = true;
                saveProgress();
                unlockSound.play().catch(e => console.log("Áudio bloqueado pelo navegador"));
                
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("📍 Oporto Bin'Go", {
                        body: `Excelente! Encontraste o local: ${loc.name}!`,
                        icon: "./bingo-icon.png"
                    });
                }

                openModal(loc);
                renderGrid();
                checkWinConditions();
            } else if (cellElement) {
                if (dist < 150) { 
                    cellElement.classList.add('hot');
                    cellElement.classList.remove('warm');
                } else if (dist < 400) { 
                    cellElement.classList.add('warm');
                    cellElement.classList.remove('hot');
                } else { 
                    cellElement.classList.remove('warm', 'hot');
                }
            }
        }
    });
}

// GPS
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        position => checkProximity(position.coords.latitude, position.coords.longitude),
        error => console.warn("Erro no GPS:", error.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
}

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371e3; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Condições de Vitória
let lineWon = false;
function checkWinConditions() {
    const unlockedArr = locations.map(l => l.unlocked);
    const lines = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
        [0, 5, 10, 15], [3, 6, 9, 12]
    ];

    if (unlockedArr.every(v => v === true)) {
        fireConfetti(true);
        setTimeout(() => {
            alert("🏆 EXTRAORDINÁRIO! Completaste todo o mapa do Oporto Bin'Go!");
            triggerShare('bingo');
        }, 500);
    } 
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false);
            setTimeout(() => {
                alert("🎉 Parabéns! Conseguiste completar uma linha!");
                triggerShare('linha');
            }, 500);
        }
    }
}

function fireConfetti(isFullCard) {
    const duration = isFullCard ? 6000 : 2500;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Splash Screen
const splash = document.getElementById('splash-screen');
const video = document.getElementById('splash-video');

if (video) {
    video.onended = function() {
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                splash.remove();
            }, 800);
        }
    };
}

setTimeout(() => {
    if (splash && splash.style.display !== 'none') {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            splash.remove();
        }, 800);
    }
}, 6000);

// Abas Culturais
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active");
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) tabBtns[i].classList.remove("active");
    
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Dia/Noite
function checkTimeOfDay() {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 20) {
        document.body.classList.add('day-mode');
    } else {
        document.body.classList.remove('day-mode');
    }
}

checkTimeOfDay();
setInterval(checkTimeOfDay, 3600000);

// =========================================
// MAPAS EXTERNOS, ÁUDIO E PARTILHA
// =========================================
function openMap() {
    if (!currentLocation) return;
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentLocation.lat},${currentLocation.lon}&travelmode=walking`;
    window.open(mapUrl, '_blank');
}

function toggleAudio() {
    if (!currentLocation || !currentLocation.unlocked) return;
    
    const btnAudio = document.getElementById('btn-audio');
    
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        btnAudio.innerText = "🔊 Ouvir Textos";
        return;
    }
    
    const activeTabContent = document.querySelector('.tab-content.active').innerText;
    
    const utterance = new SpeechSynthesisUtterance(activeTabContent);
    utterance.lang = 'pt-PT';
    utterance.rate = 1.0;
    
    utterance.onend = () => {
        btnAudio.innerText = "🔊 Ouvir Textos";
    };
    
    btnAudio.innerText = "⏸️ Parar Áudio";
    speechSynthesis.speak(utterance);
}

function triggerShare(type) {
    if (navigator.share) {
        const shareText = type === 'bingo' 
            ? "🏆 Consegui o Cartão Cheio no Oporto Bin'Go! Já explorei a cidade toda. Vem jogar também!" 
            : "🎉 Fiz Linha no Oporto Bin'Go e estou a descobrir o Porto! Vem jogar também!";
            
        navigator.share({
            title: 'Oporto Bin\'Go',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    }
}

// Inicializar Grelha
renderGrid();
