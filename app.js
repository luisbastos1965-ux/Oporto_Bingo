// Registar o Service Worker para PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// Configuração dos 16 locais do Bingo
// Coloquei coordenadas de teste, terás de substituir pelas reais depois
const locations = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: `Local ${i + 1}`,
    lat: 41.1496 + (Math.random() * 0.01 - 0.005), // Coordenadas em torno do Porto para teste
    lon: -8.6109 + (Math.random() * 0.01 - 0.005),
    imgUrl: `https://picsum.photos/seed/${i + 1}/200`, // Imagens aleatórias
    unlocked: false
}));

const grid = document.getElementById('bingo-grid');
const modal = document.getElementById('location-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.getElementById('close-modal');
const unlockSound = document.getElementById('unlock-sound');

// Renderizar Grelha
function renderGrid() {
    grid.innerHTML = '';
    locations.forEach((loc, index) => {
        const cell = document.createElement('div');
        cell.className = `cell ${loc.unlocked ? 'unlocked' : ''}`;
        cell.innerHTML = `<img src="${loc.imgUrl}" alt="${loc.name}">`;
        
        cell.addEventListener('click', () => {
            if (loc.unlocked) openModal(loc);
        });
        grid.appendChild(cell);
    });
}

// Abrir e Fechar Pop-up
function openModal(loc) {
    modalTitle.innerText = loc.name;
    modalImg.src = loc.imgUrl;
    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Lógica de GPS (Verificar proximidade)
function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            if (dist < 50) { // Desbloqueia a menos de 50 metros
                loc.unlocked = true;
                unlockSound.play().catch(e => console.log("Erro no som")); // Navegadores por vezes bloqueiam som automático
                openModal(loc);
                renderGrid();
                checkWinConditions();
            }
        }
    });
}

// Ativar rastreio por GPS
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        position => checkProximity(position.coords.latitude, position.coords.longitude),
        error => console.warn("Erro no GPS:", error.message),
        { enableHighAccuracy: true }
    );
} else {
    alert("O teu navegador não suporta GPS.");
}

// Fórmula matemática para calcular distância entre coordenadas
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Raio da Terra em metros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Verificar Vitórias (Linha ou Cartão Cheio)
let lineWon = false;
function checkWinConditions() {
    const unlockedArr = locations.map(l => l.unlocked);
    const lines = [
        // Linhas horizontais
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
        // Colunas verticais
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
        // Diagonais
        [0, 5, 10, 15], [3, 6, 9, 12]
    ];

    // Verifica cartão cheio
    if (unlockedArr.every(v => v === true)) {
        fireConfetti(true); // Cartão Cheio!
        alert("PARABÉNS! Completaste o cartão de Bingo!");
    } 
    // Verifica linha
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false); // Linha!
            alert("Boa! Fizeste Linha!");
        }
    }
}

// Animação de Confettis
function fireConfetti(isFullCard) {
    const duration = isFullCard ? 5000 : 2000;
    const end = Date.now() + duration;
    
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// Iniciar a página
renderGrid();
