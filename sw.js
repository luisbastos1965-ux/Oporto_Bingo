// O nome da tua cache. Quando fizeres grandes alterações no design no futuro, 
// muda isto para 'oporto-bingo-v47' para forçar os telemóveis a atualizarem.
const CACHE_NAME = 'oporto-bingo-v47';

// 1. INSTALAÇÃO: Força a atualização imediata do Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('[Service Worker] Instalado e pronto a arrancar');
});

// 2. ATIVAÇÃO: Limpa o lixo de versões antigas e assume o controlo
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] A limpar cache antiga:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. INTERCEÇÃO DE PEDIDOS (O SEGREDO PARA O BOTÃO DE INSTALAR)
// Estratégia: Tenta a Net primeiro. Se falhar, usa a Cache.
self.addEventListener('fetch', (event) => {
    // Ignora pedidos que não sejam GET (como extensões do Chrome, etc)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Se a net funcionar, guarda uma cópia fresca na cache silenciosamente
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Se não houver net, vai buscar à memória do telemóvel!
                return caches.match(event.request);
            })
    );
});