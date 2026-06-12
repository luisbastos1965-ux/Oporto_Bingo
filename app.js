// Registar o Service Worker para permitir o funcionamento PWA e offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// Pedir permissão para enviar notificações assim que a app inicia
if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

// Configuração oficial dos 16 locais do Bingo (Coordenadas reais e imagens locais)
const locations = [
    // Linha 1
    { id: 0, name: "Ribeira do Porto", lat: 41.1405, lon: -8.6120, imgUrl: "./ribeira.png", unlocked: false },
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

// Desenhar a Grelha do Bingo
function renderGrid() {
    grid.innerHTML = '';
    locations.forEach((loc) => {
        const cell = document.createElement('div');
        cell.className = `cell ${loc.unlocked ? 'unlocked' : ''}`;
        cell.innerHTML = `<img src="${loc.imgUrl}" alt="${loc.name}">`;
        
        cell.addEventListener('click', () => {
            if (loc.unlocked) openModal(loc);
        });
        grid.appendChild(cell);
    });
}

// Controlar a janela flutuante (Pop-up)
function openModal(loc) {
    modalTitle.innerText = loc.name;
    modalImg.src = loc.imgUrl;
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Lógica de Proximidade por GPS
function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            if (dist < 50) { // Raio de ativação de 50 metros
                loc.unlocked = true;
                saveProgress();
                
                // Tentar reproduzir som de desbloqueio
                unlockSound.play().catch(e => console.log("Áudio bloqueado pelas regras do navegador"));
                
                // Disparar notificação do sistema
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("📍 Oporto Bin'Go", {
                        body: `Excelente! Encontraste o local: ${loc.name}!`,
                        icon: "./bingo-icon.png"
                    });
                }

                openModal(loc);
                renderGrid();
                checkWinConditions();
            }
        }
    });
}

// Ativar monitorização contínua de GPS de alta precisão
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        position => checkProximity(position.coords.latitude, position.coords.longitude),
        error => console.warn("Erro no sensor de GPS:", error.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
} else {
    alert("O dispositivo atual não suporta serviços de localização (GPS).");
}

// Fórmula de Haversine para calcular distância real em metros
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Raio terrestre em metros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Estado de controlo para não repetir a animação da primeira linha feita
let lineWon = false;

// Validar Linhas, Colunas e Diagonais completas
function checkWinConditions() {
    const unlockedArr = locations.map(l => l.unlocked);
    const lines = [
        // Horizontais
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
        // Verticais
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
        // Diagonais
        [0, 5, 10, 15], [3, 6, 9, 12]
    ];

    // Cartão Completo
    if (unlockedArr.every(v => v === true)) {
        fireConfetti(true);
        setTimeout(() => alert("🏆 EXTRAORDINÁRIO! Completaste todo o mapa do Oporto Bin'Go!"), 500);
    } 
    // Primeira Linha / Coluna / Diagonal feita
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false);
            setTimeout(() => alert("🎉 Parabéns! Conseguiste completar uma linha!"), 500);
        }
    }
}

// Ativar efeitos visuais festivos
function fireConfetti(isFullCard) {
    const duration = isFullCard ? 6000 : 2500;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Lógica de controlo da Ecrã de Introdução (Splash Video)
const splash = document.getElementById('splash-screen');
const video = document.getElementById('splash-video');

if (video) {
    // Esconder e eliminar a introdução mal o vídeo acabe
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

// Mecanismo de segurança caso o vídeo falhe ou demore a carregar
setTimeout(() => {
    if (splash && splash.style.display !== 'none') {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            splash.remove();
        }, 800);
    }
}, 6000);

// Inicializar a renderização visual da grelha
renderGrid();

// =========================================
// GESTÃO DO MODO DIA / NOITE
// =========================================
function checkTimeOfDay() {
    const currentHour = new Date().getHours();
    
    // Consideramos "Dia" entre as 07:00 e as 19:59
    if (currentHour >= 7 && currentHour < 20) {
        document.body.classList.add('day-mode');
    } else {
        document.body.classList.remove('day-mode');
    }
}

// Executa imediatamente quando a app abre
checkTimeOfDay();

// Verifica a cada hora se é preciso mudar (caso o utilizador tenha a app aberta muito tempo)
setInterval(checkTimeOfDay, 3600000);
