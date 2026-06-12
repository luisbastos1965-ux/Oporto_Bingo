// Registar o Service Worker para PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// 1. Pedir permissão para enviar notificações logo que a app abre
if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

// Configuração dos 16 locais do Bingo
const locations = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: `Local ${i + 1}`,
    lat: 41.1496 + (Math.random() * 0.01 - 0.005),
    lon: -8.6109 + (Math.random() * 0.01 - 0.005),
    // Coloquei um ícone com fundo transparente (PNG) temporário 
    // para poderes ver o efeito visual de pop-out sem o quadrado opaco!
    imgUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Compass_icon.png/200px-Compass_icon.png`, 
    unlocked: false
}));

// 2. Recuperar progresso guardado na memória do telemóvel
function loadProgress() {
    const savedProgress = localStorage.getItem('oportoBingoProgress');
    if (savedProgress) {
        const unlockedStates = JSON.parse(savedProgress);
        locations.forEach((loc, i) => {
            if (unlockedStates[i]) {
                loc.unlocked = true; // Restaura o que já estava desbloqueado
            }
        });
    }
}

// 3. Guardar progresso sempre que um local é desbloqueado
function saveProgress() {
    const unlockedStates = locations.map(loc => loc.unlocked);
    localStorage.setItem('oportoBingoProgress', JSON.stringify(unlockedStates));
}

const grid = document.getElementById('bingo-grid');
const modal = document.getElementById('location-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.getElementById('close-modal');
const unlockSound = document.getElementById('unlock-sound');

// Inicializar o jogo carregando o que estava guardado
loadProgress();

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

function openModal(loc) {
    modalTitle.innerText = loc.name;
    modalImg.src = loc.imgUrl;
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            if (dist < 50) { 
                loc.unlocked = true;
                saveProgress(); // Guarda imediatamente o novo estado no telemóvel!
                
                unlockSound.play().catch(e => console.log("O som precisa de interação prévia para tocar"));
                
                // 4. Enviar notificação push (se permitido pelo utilizador)
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("📍 Oporto Bin'Go", {
                        body: `Parabéns! Desbloqueaste o ${loc.name}!`,
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

// Rastreio de GPS
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        position => checkProximity(position.coords.latitude, position.coords.longitude),
        error => console.warn("Erro no GPS:", error.message),
        { enableHighAccuracy: true }
    );
} else {
    alert("O teu navegador não suporta GPS.");
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
        alert("PARABÉNS! Completaste o cartão de Bingo!");
    } 
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false);
            alert("Boa! Fizeste Linha!");
        }
    }
}

function fireConfetti(isFullCard) {
    const duration = isFullCard ? 5000 : 2000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Lógica da Tela de Splash (O vídeo)
const splash = document.getElementById('splash-screen');
const video = document.getElementById('splash-video');

if (video) {
    video.onended = function() {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 800);
    };
}

// Segurança extra caso o vídeo falhe
setTimeout(() => {
    if (splash && splash.style.display !== 'none') {
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 800);
    }
}, 5000);

// Iniciar a grelha
renderGrid();
