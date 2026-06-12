// Registar o Service Worker para permitir o funcionamento PWA e offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// Pedir permissão para enviar notificações assim que a app inicia
if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

// Configuração oficial dos 16 locais do Bingo com estrutura de conteúdos
const locations = [
    // Linha 1
    { 
        id: 0, name: "Ribeira do Porto", lat: 41.1405, lon: -8.6120, imgUrl: "./ribeira.png", unlocked: false,
        desc: "O coração histórico da cidade, banhado pelo rio Douro. As suas casas coloridas são um ícone mundial.",
        hist: "Uma das zonas mais antigas do Porto, foi desde a Idade Média um intenso centro de comércio marítimo e fluvial.",
        curio: "Sabias que as casas estreitas e altas foram construídas assim porque, na época, os impostos eram pagos consoante a largura da fachada?"
    },
    { id: 1, name: "Mercado do Bolhão", lat: 41.1488, lon: -8.6058, imgUrl: "./bolhao.png", unlocked: false },
    { id: 2, name: "Igreja de Santo Ildefonso", lat: 41.1458, lon: -8.6066, imgUrl: "./santo-ildefonso.png", unlocked: false },
    { id: 3, name: "Casa da Música", lat: 41.1582, lon: -8.6307, imgUrl: "./casa-musica.png", unlocked: false },
    
    // Linha 2
    { id: 4, name: "Estação de São Bento", lat: 41.1455, lon: -8.6105, imgUrl: "./sao-bento.png", unlocked: false },
    { id: 5, name: "Avenida dos Aliados", lat: 41.1478, lon: -8.6112, imgUrl: "./aliados.png", unlocked: false },
    { id: 6, name: "Teatro Nacional São João", lat: 41.1443, lon: -8.6074, imgUrl: "./sao-joao.png", unlocked: false },
    { id: 7, name: "Torre dos Clérigos", lat: 41.1458, lon: -8.6139, imgUrl: "./clerigos.png", unlocked: false },
    
    // Linha 3
    { id: 8, name: "Mosteiro S. Bento da Vitória", lat: 41.1444, lon: -8.6160, imgUrl: "./mosteiro-vitoria.png", unlocked: false },
    { id: 9, name: "Mercado Ferreira Borges", lat: 41.1418, lon: -8.6148, imgUrl: "./ferreira-borges.png", unlocked: false },
    { id: 10, name: "Ponte Luiz I", lat: 41.1401, lon: -8.6096, imgUrl: "./ponte-luiz.png", unlocked: false },
    { id: 11, name: "Igreja da Lapa", lat: 41.1579, lon: -8.6131, imgUrl: "./lapa.png", unlocked: false },
    
    // Linha 4
    { id: 12, name: "Sé Catedral do Porto", lat: 41.1427, lon: -8.6112, imgUrl: "./se-catedral.png", unlocked: false },
    { id: 13, name: "Palácio da Bolsa", lat: 41.1414, lon: -8.6157, imgUrl: "./palacio-bolsa.png", unlocked: false },
    { id: 14, name: "Antiga Cadeia da Relação", lat: 41.1447, lon: -8.6153, imgUrl: "./cadeia-relacao.png", unlocked: false },
    { id: 15, name: "Livraria Lello", lat: 41.1469, lon: -8.6149, imgUrl: "./lello.png", unlocked: false }
];

// Elementos do HTML
const grid = document.getElementById('bingo-grid');
const modal = document.getElementById('location-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.getElementById('close-modal');
const unlockSound = document.getElementById('unlock-sound');

// Elementos das Abas
const modalDesc = document.getElementById('modal-desc');
const modalHist = document.getElementById('modal-hist');
const modalCurio = document.getElementById('modal-curio');

// Recuperar progresso guardado no armazenamento do telemóvel
function loadProgress() {
    const savedProgress = localStorage.getItem('oportoBingoProgress');
    if (savedProgress) {
        const unlockedStates = JSON.parse(savedProgress);
        locations.forEach((loc, i) => {
            if (unlockedStates[i]) {
                loc.unlocked = true;
            }
        });
    }
}

// Guardar o progresso atual do utilizador
function saveProgress() {
    const unlockedStates = locations.map(loc => loc.unlocked);
    localStorage.setItem('oportoBingoProgress', JSON.stringify(unlockedStates));
}

// Carregar dados guardados antes de desenhar a interface
loadProgress();

// Desenhar a Grelha do Bingo (com IDs para o Radar)
function renderGrid() {
    grid.innerHTML = '';
    locations.forEach((loc) => {
        const cell = document.createElement('div');
        cell.id = `cell-${loc.id}`; 
        cell.className = `cell ${loc.unlocked ? 'unlocked' : ''}`;
        cell.innerHTML = `<img src="${loc.imgUrl}" alt="${loc.name}">`;
        
        cell.addEventListener('click', () => {
            if (loc.unlocked) openModal(loc);
        });
        grid.appendChild(cell);
    });
}

// Controlar a janela flutuante e injetar dados (Pop-up)
function openModal(loc) {
    modalTitle.innerText = loc.name;
    modalImg.src = loc.imgUrl;
    
    // Injeta os textos (se existirem, senão mostra mensagem padrão)
    modalDesc.innerText = loc.desc || "Desbloqueaste este local!";
    modalHist.innerText = loc.hist || "A história deste local será revelada em breve.";
    modalCurio.innerText = loc.curio || "Ainda não temos curiosidades sobre este local.";
    
    // Garante que abre sempre na aba "Resumo"
    const firstTabBtn = document.querySelector('.tab-btn');
    if(firstTabBtn) firstTabBtn.click(); 
    
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Lógica de Proximidade por GPS (com o Radar Quente/Frio)
function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            const cellElement = document.getElementById(`cell-${loc.id}`);
            
            if (dist < 50) { // Raio de ativação (50 metros)
                loc.unlocked = true;
                saveProgress();
                unlockSound.play().catch(e => console.log("Áudio bloqueado pelas regras do navegador"));
                
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
                // LÓGICA DO RADAR
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

// Ativar monitorização contínua de GPS
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        position => checkProximity(position.coords.latitude, position.coords.longitude),
        error => console.warn("Erro no sensor de GPS:", error.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
} else {
    alert("O dispositivo atual não suporta serviços de localização (GPS).");
}

// Fórmula de Haversine (Distância em metros)
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

// Validar Vitórias
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
        setTimeout(() => alert("🏆 EXTRAORDINÁRIO! Completaste todo o mapa do Oporto Bin'Go!"), 500);
    } 
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false);
            setTimeout(() => alert("🎉 Parabéns! Conseguiste completar uma linha!"), 500);
        }
    }
}

// Confettis
function fireConfetti(isFullCard) {
    const duration = isFullCard ? 6000 : 2500;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Gestão do Ecrã de Introdução
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

// =========================================
// LÓGICA DAS ABAS CULTURAIS NO POP-UP
// =========================================
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// =========================================
// GESTÃO DO MODO DIA / NOITE
// =========================================
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

// Inicializar a renderização visual da grelha
renderGrid();
