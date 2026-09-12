if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission();
}

// =========================================
// DICIONÁRIO DA INTERFACE (UI) + ALERTAS
// =========================================
const uiTexts = {
    pt: {
        map: "Direções", audio: "🔊", stopAudio: "⏸️", tab1: "Resumo", tab2: "História", tab3: "Curiosidades",
        locked: "Aproxima-te a menos de 50 metros para revelar os segredos deste local histórico!",
        winLine: "Parabéns! Conseguiste completar uma linha!", winFull: "EXTRAORDINÁRIO! Completaste todo o mapa!", ttsLang: "pt-PT",
        obT1: "Explora o Porto", obD1: "Caminha pela cidade e descobre os locais históricos escondidos.",
        obT2: "Radar GPS", obD2: "Fica atento às cores: laranja é perto, vermelho a pulsar é quase lá!\n\n(Dica: Mantém o jogo aberto enquanto caminhas)",
        obT3: "Desbloqueia a História", obD3: "Aproxima-te a 50 metros para revelar os segredos e ouvir o áudio guia.", obBtn: "Começar",
        helpTitle: "COMO JOGAR",
        helpT1: "Explorar", help1: "Caminha pela cidade para descobrir.",
        helpT2: "Perto", help2: "Laranja: Estás a menos de 400m!",
        helpT3: "Muito Perto", help3: "Vermelho (A pulsar): Menos de 150m!",
        helpT4: "Desbloquear", help4: "Aproxima-te a menos de 50m.",
        helpT5: "Pistas", help5: "Perdido? Clica na bússola para uma dica!",
        alertGPS: "O radar precisa de sinal GPS verde para te dar uma pista!", alertNoHints: "Já não há pistas a dar. Descobriste o mapa todo!", alertTitle: "Aviso", alertOk: "OK",
        dist: "Distância:", meters: "metros",
        contactTitle: "Falar Connosco", contactDesc: "Deixa a tua mensagem e responderemos para o teu email.", contactName: "O teu nome", contactEmail: "O teu email", contactMsg: "Escreve aqui...", contactBtn: "Enviar Mensagem", contactSuccess: "Mensagem enviada com sucesso! Responderemos em breve.", contactError: "Ocorreu um erro ao enviar. Tenta de novo.", contactNoNet: "Sem ligação à internet para enviar a mensagem.",
        walkTime: "a pé"
    },
    en: {
        map: "Directions", audio: "🔊", stopAudio: "⏸️", tab1: "Summary", tab2: "History", tab3: "Trivia",
        locked: "Get closer than 50 meters to reveal the secrets of this historic location!",
        winLine: "Congratulations! You completed a line!", winFull: "EXTRAORDINARY! You completed the entire map!", ttsLang: "en-GB",
        obT1: "Explore Porto", obD1: "Walk around the city and discover hidden historic locations.",
        obT2: "GPS Radar", obD2: "Watch the colors: orange is close, pulsing red means you are almost there!\n\n(Tip: Keep the app open while walking)",
        obT3: "Unlock History", obD3: "Get closer than 50 meters to reveal secrets and hear our audio guide.", obBtn: "Start",
        helpTitle: "HOW TO PLAY",
        helpT1: "Explore", help1: "Walk around the city to discover.",
        helpT2: "Close", help2: "Orange: You are under 400m away!",
        helpT3: "Very Close", help3: "Red (Pulsing): Under 150m away!",
        helpT4: "Unlock", help4: "Get closer than 50m.",
        helpT5: "Hints", help5: "Lost? Click the compass for a hint!",
        alertGPS: "The radar needs a green GPS signal to give you a hint!", alertNoHints: "No more hints available. You discovered the entire map!", alertTitle: "Notice", alertOk: "OK",
        dist: "Distance:", meters: "meters",
        contactTitle: "Contact Us", contactDesc: "Leave your message and we will reply to your email.", contactName: "Your name", contactEmail: "Your email", contactMsg: "Write here...", contactBtn: "Send Message", contactSuccess: "Message sent successfully! We will reply soon.", contactError: "An error occurred while sending. Try again.", contactNoNet: "No internet connection to send the message.",
        walkTime: "on foot"
    },
    es: {
        map: "Direcciones", audio: "🔊", stopAudio: "⏸️", tab1: "Resumen", tab2: "Historia", tab3: "Curiosidades",
        locked: "¡Acércate a menos de 50 metros para revelar los secretos de este lugar histórico!",
        winLine: "¡Felicidades! ¡Has completado una línea!", winFull: "¡EXTRAORDINARIO! ¡Has completado todo el mapa!", ttsLang: "es-ES",
        obT1: "Explora Oporto", obD1: "Camina por la ciudad y descubre lugares históricos ocultos.",
        obT2: "Radar GPS", obD2: "Atento a los colores: naranja es cerca, rojo parpadeando es casi allí.\n\n(Consejo: Mantén la app abierta al caminar)",
        obT3: "Desbloquea la Historia", obD3: "Acércate a 50 metros para revelar secretos y escuchar la audioguía.", obBtn: "Comenzar",
        helpTitle: "CÓMO JUGAR",
        helpT1: "Explorar", help1: "Camina por la ciudad para descubrir.",
        helpT2: "Cerca", help2: "Naranja: ¡Estás a menos de 400m!",
        helpT3: "Muy Cerca", help3: "Rojo (Parpadeando): ¡Menos de 150m!",
        helpT4: "Desbloquear", help4: "Acércate a menos de 50m.",
        helpT5: "Pistas", help5: "¿Perdido? ¡Haz clic en la brújula para una pista!",
        alertGPS: "¡El radar necesita señal GPS verde para darte una pista!", alertNoHints: "No hay más pistas. ¡Descubriste todo el mapa!", alertTitle: "Aviso", alertOk: "OK",
        dist: "Distancia:", meters: "metros",
        contactTitle: "Contáctanos", contactDesc: "Deja tu mensaje y te responderemos a tu correo.", contactName: "Tu nombre", contactEmail: "Tu correo", contactMsg: "Escribe aquí...", contactBtn: "Enviar Mensaje", contactSuccess: "¡Mensaje enviado con éxito! Responderemos pronto.", contactError: "Ocurrió un error al enviar. Inténtalo de nuevo.", contactNoNet: "Sin conexión a internet para enviar el mensaje.",
        walkTime: "a pie"
    },
    fr: {
        map: "Itinéraire", audio: "🔊", stopAudio: "⏸️", tab1: "Résumé", tab2: "Histoire", tab3: "Anecdotes",
        locked: "Approchez-vous à moins de 50 mètres pour révéler les secrets de ce lieu !",
        winLine: "Félicitations ! Ligne complétée !", winFull: "EXTRAORDINAIRE ! Carte complétée !", ttsLang: "fr-FR",
        obT1: "Explorez Porto", obD1: "Promenez-vous dans la ville et découvrez des lieux historiques cachés.",
        obT2: "Radar GPS", obD2: "Surveillez les couleurs : orange c'est près, rouge clignotant c'est tout près !\n\n(Astuce : Gardez l'app ouverte en marchant)",
        obT3: "Débloquez l'Histoire", obD3: "Approchez à moins de 50m pour révéler les secrets et écouter le guide.", obBtn: "Commencer",
        helpTitle: "COMMENT JOUER",
        helpT1: "Explorer", help1: "Promenez-vous pour découvrir.",
        helpT2: "Près", help2: "Orange : À moins de 400m !",
        helpT3: "Très Près", help3: "Rouge (Clignotant) : À moins de 150m !",
        helpT4: "Débloquer", help4: "Approchez à moins de 50m.",
        helpT5: "Indices", help5: "Perdu ? Cliquez sur la boussole pour un indice !",
        alertGPS: "Le radar a besoin d'un signal GPS vert pour un indice !", alertNoHints: "Plus d'indices. Vous avez découvert toute la carte !", alertTitle: "Avis", alertOk: "OK",
        dist: "Distance :", meters: "mètres",
        contactTitle: "Contactez-nous", contactDesc: "Laissez votre message et nous vous répondrons par e-mail.", contactName: "Votre nom", contactEmail: "Votre e-mail", contactMsg: "Écrivez ici...", contactBtn: "Envoyer le message", contactSuccess: "Message envoyé avec succès ! Nous répondrons bientôt.", contactError: "Une erreur s'est produite lors de l'envoi. Réessayez.", contactNoNet: "Pas de connexion internet pour envoyer le message.",
        walkTime: "à pied"
    },
    de: {
        map: "Route", audio: "🔊", stopAudio: "⏸️", tab1: "Zusammenfassung", tab2: "Geschichte", tab3: "Fakten",
        locked: "Nähern Sie sich auf weniger als 50 Meter, um die Geheimnisse zu enthüllen!",
        winLine: "Glückwunsch! Linie vervollständigt!", winFull: "AUSSERGEWÖHNLICH! Karte vervollständigt!", ttsLang: "de-DE",
        obT1: "Entdecke Porto", obD1: "Spaziere durch die Stadt und entdecke verborgene historische Orte.",
        obT2: "GPS-Radar", obD2: "Achte auf die Farben: Orange ist nah, pulsierendes Rot bedeutet fast da!\n\n(Tipp: Lass die App beim Gehen offen)",
        obT3: "Geschichte freischalten", obD3: "Nähere dich auf 50m, um Geheimnisse zu enthüllen und den Audioguide zu hören.", obBtn: "Starten",
        helpTitle: "SPIELANLEITUNG",
        helpT1: "Erkunden", help1: "Spaziere durch die Stadt zum Entdecken.",
        helpT2: "Nah", help2: "Orange: Unter 400m entfernt!",
        helpT3: "Sehr Nah", help3: "Rot (Pulsierend): Unter 150m entfernt!",
        helpT4: "Freischalten", help4: "Nähere dich auf unter 50m.",
        helpT5: "Hinweise", help5: "Verloren? Klicke auf den Kompass für einen Tipp!",
        alertGPS: "Das Radar benötigt ein grünes GPS-Signal für Hinweise!", alertNoHints: "Keine Hinweise mehr. Du hast die ganze Karte entdeckt!", alertTitle: "Hinweis", alertOk: "OK",
        dist: "Entfernung:", meters: "Meter",
        contactTitle: "Kontaktiere uns", contactDesc: "Hinterlasse deine Nachricht und wir antworten per E-Mail.", contactName: "Dein Name", contactEmail: "Deine E-Mail", contactMsg: "Schreibe hier...", contactBtn: "Nachricht senden", contactSuccess: "Nachricht erfolgreich gesendet! Wir werden bald antworten.", contactError: "Ein Fehler ist aufgetreten. Versuch es noch einmal.", contactNoNet: "Keine Internetverbindung zum Senden der Nachricht.",
        walkTime: "zu Fuß"
    },
    it: {
        map: "Indicazioni", audio: "🔊", stopAudio: "⏸️", tab1: "Riassunto", tab2: "Storia", tab3: "Curiosità",
        locked: "Avvicinati a meno di 50 metri per revelar i segreti di questo luogo!",
        winLine: "Congratulazioni! Linea completata!", winFull: "STRAORDINARIO! Mappa completata!", ttsLang: "it-IT",
        obT1: "Esplora Porto", obD1: "Passeggia per la città e scopri luoghi storici nascosti.",
        obT2: "Radar GPS", obD2: "Guarda i colori: arancione è vicino, rosso lampeggiante è quasi arrivato!\n\n(Consiglio: Tieni l'app aperta mentre cammini)",
        obT3: "Sblocca la Storia", obD3: "Avvicinati a 50m per svelare segreti e ascoltare l'audioguida.", obBtn: "Inizia",
        helpTitle: "COME GIOCARE",
        helpT1: "Esplorare", help1: "Passeggia per la città per scoprire.",
        helpT2: "Vicino", help2: "Arancione: A meno di 400m!",
        helpT3: "Molto Vicino", help3: "Rosso (Lampeggiante): A meno di 150m!",
        helpT4: "Sbloccare", help4: "Avvicinati a meno di 50m.",
        helpT5: "Indizi", help5: "Perso? Clicca sulla bussola per un suggerimento!",
        alertGPS: "Il radar ha bisogno di un segnale GPS verde per aiutarti!", alertNoHints: "Nessun indizio. Hai scoperto tutta la mappa!", alertTitle: "Avviso", alertOk: "OK",
        dist: "Distanza:", meters: "metri",
        contactTitle: "Contattaci", contactDesc: "Lascia il tuo messaggio e ti risponderemo via email.", contactName: "Il tuo nome", contactEmail: "La tua email", contactMsg: "Scrivi qui...", contactBtn: "Invia Messaggio", contactSuccess: "Messaggio inviato con successo! Risponderemo presto.", contactError: "Si è verificato un errore durante l'invio. Riprova.", contactNoNet: "Nessuna connessione internet per inviare il messaggio.",
        walkTime: "a piedi"
    },
    zh: {
        map: "路线", audio: "🔊", stopAudio: "⏸️", tab1: "总结", tab2: "历史", tab3: "趣闻",
        locked: "靠近50米以内，揭开这个历史名胜的秘密！",
        winLine: "恭喜！您完成了一条线！", winFull: "🏆 太棒了！您完成了整个地图！", ttsLang: "zh-CN",
        obT1: "探索波尔图", obD1: "在城市中漫步，发现隐藏的历史古迹。",
        obT2: "GPS雷达", obD2: "观察颜色：橙色代表接近，闪烁的红色表示即将到达！\n\n（提示：走路时请保持应用开启）",
        obT3: "解锁历史", obD3: "靠近50米以内，揭开秘密并收听我们的语音导览。", obBtn: "开始",
        helpTitle: "怎么玩",
        helpT1: "探索", help1: "在城市中漫步以发现。",
        helpT2: "接近", help2: "橙色：距离不到400米！",
        helpT3: "非常接近", help3: "红色（闪烁）：距离不到150米！",
        helpT4: "解锁", help4: "靠近至50米以内。",
        helpT5: "提示", help5: "迷路了？点击指南针获取提示！",
        alertGPS: "雷达需要绿色的GPS信号才能给您提示！", alertNoHints: "没有更多提示了。您已探索整个地图！", alertTitle: "提示", alertOk: "确定",
        dist: "距离:", meters: "米",
        contactTitle: "联系我们", contactDesc: "留下您的信息，我们将通过电子邮件回复您。", contactName: "您的名字", contactEmail: "您的电子邮件", contactMsg: "在这里写...", contactBtn: "发送信息", contactSuccess: "信息发送成功！我们将尽快回复。", contactError: "发送时发生错误。请重试。", contactNoNet: "没有网络连接来发送信息。",
        walkTime: "步行"
    }
};

// =========================================
// SISTEMA CÍCLICO E DETEÇÃO INTELIGENTE
// =========================================
const langCycle = [
    { code: 'pt', flag: '🇵🇹' }, { code: 'en', flag: '🇬🇧' },
    { code: 'es', flag: '🇪🇸' }, { code: 'fr', flag: '🇫🇷' },
    { code: 'de', flag: '🇩🇪' }, { code: 'it', flag: '🇮🇹' },
    { code: 'zh', flag: '🇨🇳' }
];

function detectLanguage() {
    const savedLang = localStorage.getItem('oportoBingoLang');
    if (savedLang) return savedLang;
    const browserLang = navigator.language.slice(0, 2);
    const supportedLangs = ['pt', 'en', 'es', 'fr', 'de', 'it', 'zh'];
    return supportedLangs.includes(browserLang) ? browserLang : 'en';
}

let currentLang = detectLanguage();

window.onload = () => {
    const savedLangObj = langCycle.find(l => l.code === currentLang);
    const btnLang = document.getElementById('btn-lang');
    if (savedLangObj && btnLang) {
        btnLang.innerText = savedLangObj.flag;
    }
    updateUILanguage();
};

function cycleLanguage() {
    if (navigator.vibrate) navigator.vibrate(50);
    const currentIndex = langCycle.findIndex(l => l.code === currentLang);
    const nextIndex = (currentIndex + 1) % langCycle.length;
    const nextLang = langCycle[nextIndex];
    currentLang = nextLang.code;
    localStorage.setItem('oportoBingoLang', currentLang);

    const btnLang = document.getElementById('btn-lang');
    if (btnLang) btnLang.innerText = nextLang.flag;
    updateUILanguage();
    if (currentLocation) openModal(currentLocation);
}

function updateUILanguage() {
    document.getElementById('btn-map').innerText = uiTexts[currentLang].map;
    document.getElementById('tab-btn-resumo').innerText = uiTexts[currentLang].tab1;
    document.getElementById('tab-btn-historia').innerText = uiTexts[currentLang].tab2;
    document.getElementById('tab-btn-curiosidades').innerText = uiTexts[currentLang].tab3;

    if (document.getElementById('ob-t1')) {
        document.getElementById('ob-t1').innerText = uiTexts[currentLang].obT1;
        document.getElementById('ob-d1').innerText = uiTexts[currentLang].obD1;
        document.getElementById('ob-t2').innerText = uiTexts[currentLang].obT2;
        document.getElementById('ob-d2').innerText = uiTexts[currentLang].obD2;
        document.getElementById('ob-t3').innerText = uiTexts[currentLang].obT3;
        document.getElementById('ob-d3').innerText = uiTexts[currentLang].obD3;
        document.getElementById('ob-btn-text').innerText = uiTexts[currentLang].obBtn;
    }

    if (document.getElementById('help-title')) {
        document.getElementById('help-title').innerText = uiTexts[currentLang].helpTitle;
        document.getElementById('help-t1').innerText = uiTexts[currentLang].helpT1;
        document.getElementById('help-1').innerText = uiTexts[currentLang].help1;
        document.getElementById('help-t2').innerText = uiTexts[currentLang].helpT2;
        document.getElementById('help-2').innerText = uiTexts[currentLang].help2;
        document.getElementById('help-t3').innerText = uiTexts[currentLang].helpT3;
        document.getElementById('help-3').innerText = uiTexts[currentLang].help3;
        document.getElementById('help-t4').innerText = uiTexts[currentLang].helpT4;
        document.getElementById('help-4').innerText = uiTexts[currentLang].help4;
        document.getElementById('help-t5').innerText = uiTexts[currentLang].helpT5;
        document.getElementById('help-5').innerText = uiTexts[currentLang].help5;
    }

    if (document.getElementById('contact-title')) {
        document.getElementById('contact-title').innerText = uiTexts[currentLang].contactTitle;
        document.getElementById('contact-desc').innerText = uiTexts[currentLang].contactDesc;
        document.getElementById('contact-name').placeholder = uiTexts[currentLang].contactName;
        document.getElementById('contact-email').placeholder = uiTexts[currentLang].contactEmail;
        document.getElementById('contact-msg').placeholder = uiTexts[currentLang].contactMsg;
        document.getElementById('send-btn-text').innerText = uiTexts[currentLang].contactBtn;
    }
}

// =========================================
// SISTEMA DE ALERTAS CUSTOMIZADO
// =========================================
function showCustomAlert(title, message, icon = "⚠️") {
    document.getElementById('alert-icon').innerText = icon;
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    document.getElementById('alert-ok').innerText = uiTexts[currentLang].alertOk;
    document.getElementById('custom-alert').classList.remove('hidden');
}

function closeCustomAlert() {
    if (navigator.vibrate) navigator.vibrate(30);
    document.getElementById('custom-alert').classList.add('hidden');
}

// =========================================
// MODO DE TESTE (MOCKING) - 5 Cliques no Título
// =========================================
let devClickCount = 0;
let devClickTimer = null;
const titleElement = document.querySelector('header h1');

titleElement.addEventListener('click', () => {
    devClickCount++;
    clearTimeout(devClickTimer);

    devClickTimer = setTimeout(() => devClickCount = 0, 3000);

    if (devClickCount === 5) {
        devClickCount = 0;
        const nextLocked = locations.find(loc => !loc.unlocked);
        if (nextLocked) {
            showCustomAlert("Dev Mode", "A simular GPS para: " + nextLocked.name, "🛠️");
            checkProximity(nextLocked.lat, nextLocked.lon);
        } else {
            showCustomAlert("Dev Mode", "Já tens o mapa todo desbloqueado!", "🛠️");
        }
    }
});

// =========================================
// BASE DE DADOS DOS MONUMENTOS
// =========================================
const locations = [
    { id: 0, name: "Ribeira do Porto", lat: 41.1405, lon: -8.6120, imgUrl: "./assets/ribeira.png", unlocked: false, desc: { pt: "O coração histórico da cidade, banhado pelo rio Douro. As suas casas coloridas são um ícone mundial.", en: "The historic heart of the city, bathed by the Douro River. Its colorful houses are a global icon.", es: "El corazón histórico de la ciudad, bañado por el río Duero. Sus coloridas casas son un icono mundial.", fr: "Le cœur historique de la ville, baigné par le fleuve Douro. Ses maisons colorées sont une icône mondiale.", de: "Das historische Herz der Stadt am Douro. Seine bunten Häuser sind ein weltweites Symbol.", it: "Il cuore storico della città, bagnato dal fiume Douro. Le sue case colorate sono un'icona mondiale.", zh: "这座城市的历史中心，沐浴在杜罗河畔。其色彩缤纷的房屋是全球的标志。" }, hist: { pt: "Uma das zonas mais antigas do Porto, foi desde a Idade Média um intenso centro de comércio marítimo.", en: "One of the oldest areas in Porto, it has been an intense center of maritime trade since the Middle Ages.", es: "Una de las zonas más antiguas de Oporto, ha sido un intenso centro de comercio marítimo desde la Edad Media.", fr: "L'un des plus anciens quartiers de Porto, c'est un centre intense de commerce maritime depuis le Moyen Âge.", de: "Als eines der ältesten Viertel von Porto war es seit dem Mittelalter ein Zentrum für Seehandel.", it: "Una delle zone più antiche di Porto, è stata un intenso centro di commercio marittimo fin dal Medioevo.", zh: "波尔图最古老的地区之一，自中世纪以来一直是繁忙的海洋贸易中心。" }, curio: { pt: "Sabias que as casas estreitas foram construídas assim porque os impostos eram pagos consoante a largura da fachada?", en: "Did you know that the narrow houses were built this way because taxes were paid based on the width of the facade?", es: "¿Sabías que las casas estrechas se construyeron así porque los impuestos se pagaban según el ancho de la fachada?", fr: "Saviez-vous que les maisons étroites ont été construites ainsi car les impôts étaient payés en fonction de la largeur de la façade ?", de: "Wussten Sie, dass die schmalen Häuser so gebaut wurden, weil Steuern nach der Fassadenbreite berechnet wurden?", it: "Sapevi che le case strette furono costruite così perché le tasse si pagavano in base alla larghezza della facciata?", zh: "您知道吗？这些狭窄的房屋之所以这样建造，是因为当时的税收是根据外墙的宽度来缴纳的。" } },
    { id: 1, name: "Mercado do Bolhão", lat: 41.1488, lon: -8.6058, imgUrl: "./assets/bolhao.png", unlocked: false, desc: { pt: "O mercado mais emblemático do Porto, vibrante de cores, cheiros e tradição.", en: "Porto's most emblematic market, vibrant with colors, smells, and tradition.", es: "El mercado más emblemático de Oporto, vibrante de colores, olores y tradición.", fr: "Le marché le plus emblématique de Porto, vibrant de couleurs, d'odeurs et de tradition.", de: "Portos symbolträchtigster Markt, voller Farben, Gerüche und Tradition.", it: "Il mercato più emblematico di Porto, vibrante di colori, profumi e tradizione.", zh: "波尔图最具标志性的市场，充满色彩、气味和传统。" }, hist: { pt: "Inaugurado em 1914, a sua arquitetura neoclássica alberga o comércio tradicional de frescos há mais de um século.", en: "Inaugurated in 1914, its neoclassical architecture has housed traditional fresh produce trade for over a century.", es: "Inaugurado en 1914, su arquitectura neoclásica alberga el comercio tradicional de productos frescos desde hace más de un siglo.", fr: "Inaugurée en 1914, son architecture néoclassique abrite le commerce traditionnel de produits frais depuis plus d'un siècle.", de: "Die 1914 eingeweihte neoklassizistische Architektur beherbergt seit über einem Jahrhundert den traditionellen Frischwarenhandel.", it: "Inaugurata nel 1914, la sua architettura neoclassica ospita il commercio tradizionale di prodotti freschi da oltre un secolo.", zh: "建于1914年，其新古典主义建筑在一个多世纪以来一直是传统生鲜贸易的场所。" }, curio: { pt: "As vendedoras do Bolhão, conhecidas pelo seu forte sotaque e pregões castiços, são a verdadeira alma do espaço.", en: "The Bolhão vendors, known for their strong accents and traditional calls, are the true soul of the place.", es: "Las vendedoras de Bolhão, conocidas por su fuerte acento y gritos tradicionales, son la verdadera alma del lugar.", fr: "Les vendeuses de Bolhão, connues pour leur fort accent et leurs cris traditionnels, sont la véritable âme du lieu.", de: "Die Verkäuferinnen von Bolhão, bekannt für ihren starken Akzent, sind die wahre Seele des Ortes.", it: "Le venditrici del Bolhão, note per il loro forte accento e i richiami tradizionali, sono la vera anima del luogo.", zh: "Bolhão 的女摊贩以其浓重的口音和传统的叫卖声而闻名，是这里的真正灵魂。" } },
    { id: 2, name: "Igreja de Santo Ildefonso", lat: 41.1458, lon: -8.6066, imgUrl: "./assets/santo-ildefonso.png", unlocked: false, desc: { pt: "Uma belíssima igreja barroca com uma imponente fachada revestida a azulejos.", en: "A beautiful baroque church with an imposing facade covered in azulejos.", es: "Una hermosa iglesia barroca con una imponente fachada cubierta de azulejos.", fr: "Une belle église baroque avec une imposante façade recouverte d'azulejos.", de: "Eine wunderschöne Barockkirche mit einer imposanten, mit Kacheln bedeckten Fassade.", it: "Una bellissima chiesa barocca con un'imponente facciata ricoperta di azulejos.", zh: "一座美丽的巴洛克式教堂，其宏伟的正面覆盖着葡萄牙瓷砖。" }, hist: { pt: "Reconstruída no século XVIII, a fachada foi revestida em 1932 com 11 mil azulejos.", en: "Rebuilt in the 18th century, the facade was covered in 1932 with 11,000 tiles.", es: "Reconstruida en el siglo XVIII, la fachada fue revestida en 1932 con 11.000 azulejos.", fr: "Reconstruite au XVIIIe siècle, la façade a été recouverte en 1932 de 11 000 tuiles.", de: "Die im 18. Jahrhundert erbaute Fassade wurde 1932 mit 11.000 Kacheln verkleidet.", it: "Ricostruita nel XVIII secolo, la facciata è stata ricoperta nel 1932 con 11.000 piastrelle.", zh: "重建于18世纪，1932年外墙铺设了11000块瓷砖。" }, curio: { pt: "A igreja sobreviveu ao Cerco do Porto e a várias tempestades severas.", en: "The church survived the Siege of Porto and several severe storms.", es: "La iglesia sobrevivió al Sitio de Oporto y a varias tormentas severas.", fr: "L'église a survécu au siège de Porto et à plusieurs violentes tempêtes.", de: "Die Kirche überstand die Belagerung von Porto und mehrere schwere Stürme.", it: "La chiesa è sopravvissuta all'Assedio di Porto e a diverse forti tempeste.", zh: "这座教堂在波尔图之围和几次猛烈的风暴中幸存下来。" } },
    { id: 3, name: "Casa da Música", lat: 41.1582, lon: -8.6307, imgUrl: "./assets/casa-musica.png", unlocked: false, desc: { pt: "Um ícone da arquitetura contemporânea e a principal sala de espetáculos do Porto.", en: "An icon of contemporary architecture and Porto's main concert hall.", es: "Un icono de la arquitectura contemporánea y la principal sala de conciertos de Oporto.", fr: "Une icône de l'architecture contemporaine et la principale salle de concert de Porto.", de: "Ein Symbol zeitgenössischer Architektur und Portos wichtigster Konzertsaal.", it: "Un'icona dell'architettura contemporanea e la principale sala da concerto di Porto.", zh: "当代建筑的标志和波尔图的主要音乐厅。" }, hist: { pt: "Desenhada por Rem Koolhaas, foi projetada para a capital europeia da cultura de 2001.", en: "Designed by Rem Koolhaas, it was planned for the 2001 European Capital of Culture.", es: "Diseñada por Rem Koolhaas, fue planeada para la Capital Europea de la Cultura 2001.", fr: "Conçue par Rem Koolhaas, elle a été prévue pour la Capitale européenne de la culture 2001.", de: "Entworfen von Rem Koolhaas für die Kulturhauptstadt Europas 2001.", it: "Progettata da Rem Koolhaas, è stata concepita per la Capitale Europea della Cultura 2001.", zh: "由雷姆·库哈斯设计，为2001年欧洲文化之都而建。" }, curio: { pt: "A sua forma geométrica assimétrica faz lembrar um meteorito que aterrou na cidade.", en: "Its asymmetrical geometric shape resembles a meteorite that landed in the city.", es: "Su forma geométrica asimétrica se asemeja a un meteorito que aterrizó en la ciudad.", fr: "Sa forme géométrique asymétrique ressemble à une météorite qui aurait atterri dans la ville.", de: "Seine asymmetrische Form erinnert an einen Meteoriten, der in der Stadt gelandet ist.", it: "La sua forma geometrica asimmetrica ricorda un meteorite atterrato in città.", zh: "其不对称的几何形状类似于降落在城市中的陨石。" } },
    { id: 4, name: "Estação de São Bento", lat: 41.1455, lon: -8.6105, imgUrl: "./assets/sao-bento.png", unlocked: false, desc: { pt: "Uma das estações mais deslumbrantes do mundo, famosa pelos seus azulejos.", en: "One of the most stunning stations in the world, famous for its tiles.", es: "Una de las estaciones más impresionantes del mundo, famosa por sus azulejos.", fr: "L'une des gares les plus époustouflantes au monde, célèbre pour ses azulejos.", de: "Einer der atemberaubendsten Bahnhöfe der Welt, berühmt für seine Kacheln.", it: "Una delle stazioni più straordinarie al mondo, famosa per i suoi azulejos.", zh: "世界上最迷人的火车站之一，以其瓷砖而闻名。" }, hist: { pt: "Construída no século XX sobre as ruínas de um antigo convento.", en: "Built in the 20th century on the ruins of an old convent.", es: "Construida en el siglo XX sobre las ruinas de un antiguo convento.", fr: "Construite au XXe siècle sur les ruines d'un ancien couvent.", de: "Erbaut im 20. Jahrhundert auf den Ruinen eines alten Klosters.", it: "Costruita nel XX secolo sulle rovine di un antico convento.", zh: "建于20世纪，位于一座古老修道院的废墟上。" }, curio: { pt: "Os seus 20 mil azulejos contam detalhadamente a história de Portugal.", en: "Its 20,000 tiles detail the history of Portugal.", es: "Sus 20.000 azulejos detallan la historia de Portugal.", fr: "Ses 20 000 azulejos détaillent l'histoire du Portugal.", de: "Seine 20.000 Kacheln erzählen die Geschichte Portugals.", it: "I suoi 20.000 azulejos raccontano la storia del Portogallo.", zh: "它的两万块瓷砖详细描绘了葡萄牙的历史。" } },
    { id: 5, name: "Avenida dos Aliados", lat: 41.1478, lon: -8.6112, imgUrl: "./assets/aliados.png", unlocked: false, desc: { pt: "O imponente 'salão de visitas' do Porto, ladeado por edifícios em granito.", en: "Porto's imposing 'living room', flanked by granite buildings.", es: "La imponente 'sala de estar' de Oporto, flanqueada por edificios de granito.", fr: "L'imposant 'salon' de Porto, bordé de bâtiments en granit.", de: "Portos imposantes 'Wohnzimmer', gesäumt von Granitgebäuden.", it: "L'imponente 'salotto' di Porto, fiancheggiato da edifici in granito.", zh: "波尔图宏伟的'客厅'，两侧是花岗岩建筑。" }, hist: { pt: "Projetada no século XX para criar uma praça monumental digna das metrópoles europeias.", en: "Designed in the 20th century to create a monumental square worthy of European metropolises.", es: "Diseñada en el siglo XX para crear una plaza monumental digna de las metrópolis europeas.", fr: "Conçue au XXe siècle pour créer une place monumentale digne des métropoles européennes.", de: "Im 20. Jahrhundert entworfen, um einen monumentalen Platz zu schaffen.", it: "Progettata nel XX secolo per creare una piazza monumentale degna delle metropoli europee.", zh: "设计于20世纪，旨在创造一个无愧于欧洲大都市的纪念性广场。" }, curio: { pt: "O nome homenageia os Aliados da 1ª Guerra. É aqui que se celebram as vitórias.", en: "Named after the WWI Allies. This is where victories are celebrated.", es: "Lleva el nombre de los Aliados de la Primera Guerra Mundial. Aquí se celebran las victorias.", fr: "Nommée d'après les Alliés de la 1ère Guerre mondiale. C'est ici que l'on célèbre les victoires.", de: "Benannt nach den Alliierten des Ersten Weltkriegs. Hier werden Siege gefeiert.", it: "Prende il nome dagli Alleati della Prima Guerra Mondiale. È qui che si celebrano le vittorie.", zh: "以一战同盟国的名字命名。这里是庆祝胜利的地方。" } },
    { id: 6, name: "Teatro Nacional São João", lat: 41.1443, lon: -8.6074, imgUrl: "./assets/sao-joao.png", unlocked: false, desc: { pt: "O teatro mais prestigiado da cidade, com uma arquitetura elegante.", en: "The most prestigious theater in the city, with elegant architecture.", es: "El teatro más prestigioso de la ciudad, con una arquitectura elegante.", fr: "Le théâtre le plus prestigieux de la ville, avec une architecture élégante.", de: "Das renommierteste Theater der Stadt mit eleganter Architektur.", it: "Il teatro più prestioso della città, con un'architettura elegante.", zh: "这座城市最负盛名的剧院，拥有优雅的建筑。" }, hist: { pt: "O edifício atual foi inaugurado em 1920, após o original de 1798 arder.", en: "The current building opened in 1920, after the 1798 original burned down.", es: "El edificio actual se inauguró en 1920, después de que el original de 1798 se incendiara.", fr: "Le bâtiment actuel a ouvert en 1920, après l'incendie de l'original de 1798.", de: "Das heutige Gebäude wurde 1920 eröffnet, nachdem das Original abbrannte.", it: "L'edificio attuale è stato inaugurato nel 1920, dopo che l'originale del 1798 è bruciato.", zh: "现有的建筑于1920年开放，原建于1798年的建筑被烧毁。" }, curio: { pt: "A sua fachada assemelha-se muito à da Ópera Garnier em Paris.", en: "Its facade closely resembles the Palais Garnier opera house in Paris.", es: "Su fachada se asemeja mucho a la de la Ópera Garnier en París.", fr: "Sa façade ressemble beaucoup à celle de l'Opéra Garnier à Paris.", de: "Seine Fassade ähnelt stark der Opéra Garnier in Paris.", it: "La sua facciata ricorda molto quella dell'Opéra Garnier a Parigi.", zh: "其外观与巴黎加尼叶歌剧院非常相似。" } },
    { id: 7, name: "Torre dos Clérigos", lat: 41.1458, lon: -8.6139, imgUrl: "./assets/clerigos.png", unlocked: false, desc: { pt: "A torre sineira mais alta de Portugal e o ex-líbris do Porto.", en: "The tallest bell tower in Portugal and Porto's iconic landmark.", es: "El campanario más alto de Portugal y el símbolo de Oporto.", fr: "Le plus haut clocher du Portugal et le symbole de Porto.", de: "Der höchste Glockenturm in Portugal und das Wahrzeichen von Porto.", it: "Il campanile più alto del Portogallo e il simbolo di Porto.", zh: "葡萄牙最高的钟楼，也是波尔图的标志性建筑。" }, hist: { pt: "Uma obra-prima barroca desenhada por Nicolau Nasoni no século XVIII.", en: "A baroque masterpiece designed by Nicolau Nasoni in the 18th century.", es: "Una obra maestra barroca diseñada por Nicolau Nasoni en el siglo XVIII.", fr: "Un chef-d'œuvre baroque conçu par Nicolau Nasoni au XVIIIe siècle.", de: "Ein barockes Meisterwerk, das im 18. Jahrhundert von Nicolau Nasoni entworfen wurde.", it: "Un capolavoro barocco progettato da Nicolau Nasoni nel XVIII secolo.", zh: "18世纪由 Nicolau Nasoni 设计的巴洛克式杰作。" }, curio: { pt: "Para teres a melhor vista de 360 graus, tens de subir 225 degraus!", en: "To get the best 360-degree view, you have to climb 225 steps!", es: "¡Para tener la mejor vista de 360 grados, tienes que subir 225 escalones!", fr: "Pour avoir la meilleure vue à 360 degrés, vous devez gravir 225 marches !", de: "Für die beste 360-Grad-Aussicht müssen Sie 225 Stufen erklimmen!", it: "Per avere la migliore vista a 360 gradi, devi salire 225 gradini!", zh: "为了获得最佳的360度视野，您必须爬225级台阶！" } },
    { id: 8, name: "Mosteiro S. Bento da Vitória", lat: 41.1444, lon: -8.6160, imgUrl: "./assets/mosteiro-vitoria.png", unlocked: false, desc: { pt: "Um imponente edifício monástico no coração do antigo bairro judeu.", en: "An imposing monastic building in the heart of the old Jewish quarter.", es: "Un imponente edificio monástico en el corazón de la antigua judería.", fr: "Un imposant bâtiment monastique au cœur de l'ancien quartier juif.", de: "Ein imposantes Klostergebäude im Herzen des alten jüdischen Viertels.", it: "Un imponente edificio monastico nel cuore dell'antico quartiere ebraico.", zh: "位于古老犹太区中心的一座宏伟的修道院建筑。" }, hist: { pt: "A construção começou em 1596 no terreno de uma antiga sinagoga.", en: "Construction began in 1596 on the site of an old synagogue.", es: "La construcción comenzó en 1596 en el sitio de una antigua sinagoga.", fr: "La construction a commencé en 1596 sur le site d'une ancienne synagogue.", de: "Der Bau begann 1596 an der Stelle einer alten Synagoge.", it: "La costruzione iniziò nel 1596 sul sito di un'antica sinagoga.", zh: "建筑始于1596年，原址是一座古老的犹太教堂。" }, curio: { pt: "Chegou a ser utilizado como hospital militar nas Invasões Francesas.", en: "It was used as a military hospital during the French Invasions.", es: "Fue utilizado como hospital militar durante las Invasiones Francesas.", fr: "Il a été utilisé comme hôpital militaire pendant les invasions françaises.", de: "Während der französischen Invasionen wurde es als Militärkrankenhaus genutzt.", it: "È stato utilizzato come ospedale militare durante le Invasioni Francesi.", zh: "在法国入侵期间，它曾被用作军事医院。" } },
    { id: 9, name: "Mercado Ferreira Borges", lat: 41.1418, lon: -8.6148, imgUrl: "./assets/ferreira-borges.png", unlocked: false, desc: { pt: "Um belíssimo edifício vermelho, exemplo da arquitetura do ferro.", en: "A beautiful red building, an example of iron architecture.", es: "Un hermoso edificio rojo, ejemplo de la arquitectura del hierro.", fr: "Un beau bâtiment rouge, exemple de l'architecture en fer.", de: "Ein wunderschönes rotes Gebäude, ein Beispiel für Eisenarchitektur.", it: "Un bellissimo edificio rosso, esempio di architettura in ferro.", zh: "一座美丽的红色建筑，是铁质建筑的典范。" }, hist: { pt: "Construído em 1885, a verdade é que nunca operou como mercado.", en: "Built in 1885, the truth is it never operated as a market.", es: "Construido en 1885, la verdad es que nunca funcionó como mercado.", fr: "Construit en 1885, la vérité est qu'il n'a jamais fonctionné comme marché.", de: "1885 erbaut, diente es eigentlich nie als Markt.", it: "Costruito nel 1885, la verità è che non ha mai funzionato come mercato.", zh: "建于1885年，事实是它从未作为市场运营过。" }, curio: { pt: "Hoje em dia, é uma casa de espetáculos e eventos muito popular.", en: "Today, it is a very popular concert and event venue.", es: "Hoy en día, es un lugar de conciertos y eventos muy popular.", fr: "Aujourd'hui, c'est une salle de concert et d'événements très populaire.", de: "Heute ist es ein sehr beliebter Ort für Konzerte und Veranstaltungen.", it: "Oggi è un luogo molto popolare per concerti ed eventi.", zh: "如今，这是一个非常受欢迎的音乐会和活动场所。" } },
    { id: 10, name: "Ponte Luiz I", lat: 41.1401, lon: -8.6096, imgUrl: "./assets/ponte-luiz.png", unlocked: false, desc: { pt: "A ponte metálica de dois tabuleiros que une Porto e Gaia.", en: "The double-deck metal bridge connecting Porto and Gaia.", es: "El puente metálico de dos pisos que une Oporto y Gaia.", fr: "Le pont métallique à deux niveaux reliant Porto et Gaia.", de: "Die doppelstöckige Metallbrücke, die Porto und Gaia verbindet.", it: "Il ponte metallico a due piani che collega Porto e Gaia.", zh: "连接波尔图和加亚的双层金属桥。" }, hist: { pt: "Inaugurada em 1886, foi projetada pelo sócio de Gustave Eiffel.", en: "Inaugurated in 1886, it was designed by Gustave Eiffel's partner.", es: "Inaugurado en 1886, fue diseñado por el socio de Gustave Eiffel.", fr: "Inauguré en 1886, il a été conçu par l'associé de Gustave Eiffel.", de: "Die 1886 eingeweihte Brücke wurde von Gustave Eiffels Partner entworfen.", it: "Inaugurato nel 1886, è stato progettato dal socio di Gustave Eiffel.", zh: "落成于1886年，由居斯塔夫·埃菲尔的合伙人设计。" }, curio: { pt: "Chama-se oficialmente 'Luiz I' e não 'Dom Luís', como muitos dizem.", en: "It is officially named 'Luiz I' and not 'Dom Luís', as many say.", es: "Se llama oficialmente 'Luiz I' y no 'Dom Luís', como muchos dicen.", fr: "Il s'appelle officiellement 'Luiz I' et non 'Dom Luís', comme beaucoup le disent.", de: "Sie heißt offiziell 'Luiz I' und nicht 'Dom Luís', wie viele sagen.", it: "Si chiama ufficialmente 'Luiz I' e non 'Dom Luís', come dicono molti.", zh: "它的正式名称是'Luiz I'，而不是许多人所说的'Dom Luís'。" } },
    { id: 11, name: "Igreja da Lapa", lat: 41.1579, lon: -8.6131, imgUrl: "./assets/lapa.png", unlocked: false, desc: { pt: "Uma igreja majestosa que guarda o coração do rei D. Pedro IV.", en: "A majestic church that guards the heart of King D. Pedro IV.", es: "Una majestuosa iglesia que guarda el corazón del rey D. Pedro IV.", fr: "Une église majestueuse qui garde le cœur du roi D. Pedro IV.", de: "Eine majestätische Kirche, die das Herz von König D. Pedro IV. bewacht.", it: "Una chiesa maestosa che custodisce il cuore del re D. Pedro IV.", zh: "一座雄伟的教堂，守卫着佩德罗四世国王的心脏。" }, hist: { pt: "A sua construção durou mais de um século (1755-1863).", en: "Its construction lasted for more than a century (1755-1863).", es: "Su construcción duró más de un siglo (1755-1863).", fr: "Sa construction a duré plus d'un siècle (1755-1863).", de: "Der Bau dauerte über ein Jahrhundert (1755-1863).", it: "La sua costruzione è durata più di un secolo (1755-1863).", zh: "它的建造历时一个多世纪 (1755-1863)。" }, curio: { pt: "O coração do rei foi doado por ele à cidade em agradecimento.", en: "The king's heart was donated by him to the city in gratitude.", es: "El corazón del rey fue donado por él a la ciudad en agradecimento.", fr: "Le cœur du roi a été donné par lui à la ville en signe de gratitude.", de: "Das Herz des Königs wurde von ihm aus Dankbarkeit an die Stadt gespendet.", it: "Il cuore del re fu donato da lui alla città in segno di gratitudine.", zh: "国王的心脏是由他捐赠给这座城市以示感谢。" } },
    { id: 12, name: "Sé Catedral do Porto", lat: 41.1427, lon: -8.6112, imgUrl: "./assets/se-catedral.png", unlocked: false, desc: { pt: "Uma robusta fortaleza-igreja que vigia silenciosamente a cidade.", en: "A robust fortress-church that silently watches over the city.", es: "Una robusta iglesia-fortaleza que vigila silenciosamente la ciudad.", fr: "Une robuste église-forteresse qui veille silencieusement sur la ville.", de: "Eine robuste Festungskirche, die stumm über die Stadt wacht.", it: "Una robusta chiesa-fortezza che veglia silenziosamente sulla città.", zh: "一座坚固的堡垒教堂，静静地注视着这座城市。" }, hist: { pt: "Iniciada no século XII, mistura os estilos românico, gótico e barroco.", en: "Started in the 12th century, it mixes Romanesque, Gothic and Baroque styles.", es: "Iniciada en el siglo XII, mezcla estilos románico, gótico y barroco.", fr: "Commencée au XIIe siècle, elle mélange les styles roman, gothique et baroque.", de: "Im 12. Jahrhundert begonnen, mischt sie romanische, gotische und barocke Stile.", it: "Iniziata nel XII secolo, mescola stili romanico, gotico e barocco.", zh: "始建于12世纪，融合了罗马式、哥特式和巴洛克式风格。" }, curio: { pt: "Foi aqui que D. João I casou com a inglesa D. Filipa de Lencastre.", en: "This is where King John I married the English Philippa of Lancaster.", es: "Aquí es donde el rey Juan I se casó con la inglesa Felipa de Lancaster.", fr: "C'est ici que le roi Jean Ier a épousé l'Anglaise Philippa de Lancastre.", de: "Hier heiratete König Johann I. die Engländerin Philippa von Lancaster.", it: "È qui che il re Giovanni I sposò l'inglese Filippa di Lancaster.", zh: "约翰一世国王就是在这里与英国的兰开斯特的菲利帕结婚的。" } },
    { id: 13, name: "Palácio da Bolsa", lat: 41.1414, lon: -8.6157, imgUrl: "./assets/palacio-bolsa.png", unlocked: false, desc: { pt: "Um faustoso palácio construído pela Associação Comercial do Porto.", en: "A lavish palace built by the Porto Commercial Association.", es: "Un lujoso palacio construido por la Asociación Comercial de Oporto.", fr: "Un somptueux palais construit par l'Association commerciale de Porto.", de: "Ein opulenter Palast, erbaut vom Handelsverband von Porto.", it: "Un sontuoso palazzo costruito dall'Associazione Commerciale di Porto.", zh: "由波尔图商业协会建造的豪华宫殿。" }, hist: { pt: "Erguido sobre as ruínas do Convento de São Francisco, ardido em 1832.", en: "Built on the ruins of the São Francisco Convent, burned down in 1832.", es: "Construido sobre las ruinas del Convento de San Francisco, incendiado en 1832.", fr: "Construit sur les ruines du couvent de São Francisco, incendié en 1832.", de: "Erbaut auf den Ruinen des 1832 niedergebrannten Klosters São Francisco.", it: "Costruito sulle rovine del Convento di São Francisco, bruciato nel 1832.", zh: "建于1832年被烧毁的圣弗朗西斯科修道院的废墟上。" }, curio: { pt: "O Salão Árabe é uma das salas mais ornamentadas do país.", en: "The Arabian Hall is one of the most ornate rooms in the country.", es: "El Salón Árabe es una de las salas más ornamentadas del país.", fr: "Le Salon Arabe est l'une des pièces les plus ornées du pays.", de: "Der Arabische Saal ist einer der am reichsten verzierten Räume des Landes.", it: "La Sala Araba è una delle stanze più decorate del paese.", zh: "阿拉伯厅是该国装饰最华丽的房间之一。" } },
    { id: 14, name: "Antiga Cadeia da Relação", lat: 41.1447, lon: -8.6153, imgUrl: "./assets/cadeia-relacao.png", unlocked: false, desc: { pt: "Um edifício maciço, atualmente Centro Português de Fotografia.", en: "A massive building, currently the Portuguese Centre of Photography.", es: "Un edificio enorme, actualmente el Centro Portugués de Fotografía.", fr: "Un bâtiment massif, actuellement le Centre portugais de la photographie.", de: "Ein massives Gebäude, heute das Portugiesische Zentrum für Fotografie.", it: "Un enorme edificio, attualmente il Centro Portoghese di Fotografia.", zh: "一座宏伟的建筑，目前是葡萄牙摄影中心。" }, hist: { pt: "Serviu como o mais severo tribunal e prisão da cidade até 1974.", en: "It served as the city's strictest court and prison until 1974.", es: "Sirvió como el tribunal y prisión más estrictos de la ciudad hasta 1974.", fr: "Il a servi de tribunal et de prison les plus stricts de la ville jusqu'en 1974.", de: "Es diente bis 1974 als strengstes Gericht und Gefängnis der Stadt.", it: "È servito come tribunale e prigione più severi della città fino al 1974.", zh: "直到1974年，它一直作为该市最严厉的法院和监狱。" }, curio: { pt: "O escritor Camilo Castelo Branco esteve preso nas suas celas.", en: "The writer Camilo Castelo Branco was imprisoned in its cells.", es: "El escritor Camilo Castelo Branco estuvo preso en sus celdas.", fr: "L'écrivain Camilo Castelo Branco a été emprisonné dans ses cellules.", de: "Der Schriftsteller Camilo Castelo Branco war in seinen Zellen inhaftiert.", it: "Lo scrittore Camilo Castelo Branco fu imprigionato nelle sue celle.", zh: "作家卡米洛·卡斯特洛·布兰科曾被关押在牢房里。" } },
    { id: 15, name: "Livraria Lello", lat: 41.1469, lon: -8.6149, imgUrl: "./assets/lello.png", unlocked: false, desc: { pt: "Uma das livrarias mais bonitas do mundo, com a sua escadaria fluida.", en: "One of the most beautiful bookstores in the world, with its flowing staircase.", es: "Una de las librerías más bonitas del mundo, con su escalera fluida.", fr: "L'une des plus belles librairies du monde, avec son escalier fluide.", de: "Eine der schönsten Buchhandlungen der Welt mit ihrer fließenden Treppe.", it: "Una delle librerie più belle del mondo, con la sua scalinata fluida.", zh: "世界上最美丽的书店之一，有着流畅的楼梯。" }, hist: { pt: "Inaugurada em 1906, possui uma impressionante traça neogótica.", en: "Opened in 1906, it has an impressive neo-Gothic design.", es: "Inaugurada en 1906, tiene un impresionante diseño neogótico.", fr: "Ouverte en 1906, elle présente un impressionnant design néo-gothique.", de: "1906 eröffnet, beeindruckt sie mit ihrem neugotischen Design.", it: "Aperta nel 1906, ha un impressionante design neogotico.", zh: "开业于1906年，拥有令人印象深刻的新哥特式设计。" }, curio: { pt: "Reza a lenda que inspirou J.K. Rowling no mundo de Harry Potter.", en: "Legend has it that it inspired J.K. Rowling in the world of Harry Potter.", es: "La leyenda dice que inspiró a J.K. Rowling en el mundo de Harry Potter.", fr: "La légende veut qu'elle ait inspiré J.K. Rowling pour le monde de Harry Potter.", de: "Die Legende besagt, dass sie J.K. Rowling in class Welt von Harry Potter inspirierte.", it: "La leggenda narra che abbia ispirato J.K. Rowling nel mondo di Harry Potter.", zh: "传说是它激发了J.K.罗琳创作《哈利·波特》世界的灵感。" } }
];

// Elementos HTML
const grid = document.getElementById('bingo-grid');
const modal = document.getElementById('location-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const unlockSound = document.getElementById('unlock-sound');
const openSound = document.getElementById('open-sound');

const modalDesc = document.getElementById('modal-desc');
const modalHist = document.getElementById('modal-hist');
const modalCurio = document.getElementById('modal-curio');

let currentLocation = null;
let userLat = null;
let userLon = null;

// Progresso Local
function loadProgress() {
    const savedProgress = localStorage.getItem('oportoBingoProgress');
    if (savedProgress) {
        const unlockedStates = JSON.parse(savedProgress);
        locations.forEach((loc, i) => {
            if (unlockedStates[i]) loc.unlocked = true;
        });
    }
}

function saveProgress() {
    const unlockedStates = locations.map(loc => loc.unlocked);
    localStorage.setItem('oportoBingoProgress', JSON.stringify(unlockedStates));
}

loadProgress();

// Grelha Dinâmica
function renderGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    locations.forEach((loc) => {
        const cell = document.createElement('div');
        cell.id = `cell-${loc.id}`;
        cell.className = `cell ${loc.unlocked ? 'unlocked' : ''}`;
        cell.innerHTML = `<img src="${loc.imgUrl}" alt="${loc.name}">`;

        cell.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(50);
            openModal(loc);
        });
        grid.appendChild(cell);
    });
}

// =========================================
// JANELA MODAL INTELIGENTE (ESTÁVEL E SEGURA)
// =========================================
function openModal(loc) {
    currentLocation = loc;
    modalTitle.innerText = loc.name;

    if (openSound) {
        openSound.currentTime = 0;
        openSound.play().catch(() => { });
    }

    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const btnAudioText = document.getElementById('btn-audio');
    if (btnAudioText) btnAudioText.innerText = uiTexts[currentLang].audio;

    const tabsContainer = document.getElementById('modal-tabs');
    const btnAudio = document.getElementById('btn-audio');
    const actionsBar = document.getElementById('modal-actions');
    const miniPill = document.getElementById('miniIconPillContainer');
    const btnMap = document.getElementById('btn-map');

    if (loc.unlocked) {
        // MODO DESBLOQUEADO
        modalImg.src = loc.imgUrl;
        modalImg.classList.remove('hidden', 'locked-blur');

        modalDesc.innerHTML = loc.desc[currentLang];
        modalHist.innerText = loc.hist[currentLang];
        modalCurio.innerText = loc.curio[currentLang];

        if (tabsContainer) tabsContainer.classList.remove('hidden');
        if (btnAudio) btnAudio.classList.remove('hidden');
        if (actionsBar) actionsBar.classList.remove('locked-actions');

        if (miniPill) miniPill.classList.add('hidden');
        if (btnMap) {
            btnMap.classList.remove('hidden');
            btnMap.innerHTML = uiTexts[currentLang].map;
            if (btnMap.dataset.originalHtml) delete btnMap.dataset.originalHtml;
        }

        const firstTabBtn = document.querySelector('.tab-btn');
        if (firstTabBtn) firstTabBtn.click();
    } else {
        // MODO BLOQUEADO
        modalImg.src = loc.imgUrl;
        modalImg.classList.remove('hidden');
        modalImg.classList.add('locked-blur');

        // Usa imediatamente a última posição conhecida do watchPosition (sem atrasos)
        if (userLat && userLon) {
            currentDistanceMeters = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
        } else {
            currentDistanceMeters = 0;
        }

        modalDesc.innerHTML = '';

        if (tabsContainer) tabsContainer.classList.add('hidden');
        if (btnAudio) btnAudio.classList.add('hidden');
        if (actionsBar) actionsBar.classList.add('locked-actions');

        if (miniPill) miniPill.classList.remove('hidden');
        if (btnMap) {
            btnMap.classList.remove('hidden');
            btnMap.innerHTML = uiTexts[currentLang].map;
            if (btnMap.dataset.originalHtml) delete btnMap.dataset.originalHtml;
        }

        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active");
        const tabResumo = document.getElementById("tab-resumo");
        if (tabResumo) tabResumo.classList.add("active");
    }

    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    currentLocation = null;
}

function formatDistanceAndDuration(meters) {
    let distText = "";
    if (meters < 1000) {
        distText = `${Math.round(meters)}m`;
    } else {
        distText = `${(meters / 1000).toFixed(1)} km`;
    }

    const minutes = Math.round(meters / 80);

    let timeText = "";
    if (minutes < 1) {
        timeText = `< 1 min`;
    } else if (minutes < 60) {
        timeText = `~${minutes} min`;
    } else {
        const hours = (minutes / 60).toFixed(1);
        timeText = `~${hours}h`;
    }

    return { distText, timeText };
}

// =========================================
// MINI-PÍLULA INTERATIVA (DISTÂNCIA / TEMPO NO BOTÃO)
// =========================================
let currentDistanceMeters = 0;
let metricTimeout = null;

function showMetric(type) {
    const btnMap = document.getElementById('btn-map');
    if (!btnMap) return;

    // Cancela imediatamente qualquer temporizador anterior
    if (metricTimeout) {
        clearTimeout(metricTimeout);
        metricTimeout = null;
    }

    // Se ainda não guardou o HTML original, guarda agora ("Direções")
    if (!btnMap.dataset.originalHtml || btnMap.dataset.originalHtml.includes('min') || btnMap.dataset.originalHtml.includes('km') || btnMap.dataset.originalHtml.includes('m')) {
        btnMap.dataset.originalHtml = uiTexts[currentLang].map;
    }

    // Atualiza a distância se houver coordenadas
    if (currentLocation && userLat && userLon) {
        currentDistanceMeters = getDistanceFromLatLonInM(userLat, userLon, currentLocation.lat, currentLocation.lon);
    }

    const { distText, timeText } = formatDistanceAndDuration(currentDistanceMeters);

    if (type === 'dist') {
        if (!userLat || !userLon) {
            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">A procurar GPS...</span>`;
        } else {
            // Mostra EXCLUSIVAMENTE a distância
            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 800;">${distText}</span>`;
        }
    } else if (type === 'time') {
        if (!userLat || !userLon) {
            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">A procurar GPS...</span>`;
        } else {
            // Mostra EXCLUSIVAMENTE o tempo
            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 700;">${timeText}</span>`;
        }
    }

    // Programa o retorno limpo ao texto "Direções" após exatamente 2 segundos
    metricTimeout = setTimeout(() => {
        resetButtonMap();
        metricTimeout = null;
    }, 2000);
}

function resetButtonMap() {
    const btnMap = document.getElementById('btn-map');
    if (btnMap) {
        btnMap.innerHTML = uiTexts[currentLang].map;
        if (btnMap.dataset.originalHtml) delete btnMap.dataset.originalHtml;
    }
}

// Algoritmo de Localização e Radar
function checkProximity(userLat, userLon) {
    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            const cellElement = document.getElementById(`cell-${loc.id}`);

            if (dist < 50) {
                loc.unlocked = true;
                saveProgress();
                if (unlockSound) unlockSound.play().catch(() => { });

                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

                if (cellElement) {
                    cellElement.classList.remove('warm', 'hot', 'hint-active');
                    cellElement.classList.add('unlocked');

                    const img = cellElement.querySelector('img');
                    if (img) {
                        img.style.filter = "none";
                        img.style.webkitFilter = "none";
                        img.style.opacity = "1";
                    }
                }

                checkWinConditions();
                setTimeout(() => { openModal(loc); }, 800);

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

// =========================================
// ANIMAÇÃO DO BOTÃO "COMEÇAR"
// =========================================
function startAppAnimation() {
    const btn = document.getElementById('ob-btn');
    if (navigator.vibrate) navigator.vibrate(30);
    btn.classList.add('animating');
    finishOnboarding();
}

// =========================================
// MOTOR GPS SENSÍVEL E OTIMIZADO
// =========================================
const gpsStatus = document.getElementById('gps-status');
let watchId = null;

function updateGpsIndicator(status) {
    if (!gpsStatus) return;
    if (status === 'searching' || status === 'updating') {
        gpsStatus.className = 'gps-dot searching';
    } else {
        gpsStatus.className = 'gps-dot ' + status;
    }
}

function initGPS() {
    if (!("geolocation" in navigator)) return;

    updateGpsIndicator('searching');

    if (watchId) navigator.geolocation.clearWatch(watchId);

    watchId = navigator.geolocation.watchPosition(
        position => {
            updateGpsIndicator('active');
            userLat = position.coords.latitude;
            userLon = position.coords.longitude;
            checkProximity(userLat, userLon);

            // 🌟 ATUALIZAÇÃO EM TEMPO REAL DO MODAL ABERTO (SE ESTIVER BLOQUEADO)
            if (currentLocation && !currentLocation.unlocked) {
                // Atualiza a distância global para a mini-pílula usar
                currentDistanceMeters = getDistanceFromLatLonInM(userLat, userLon, currentLocation.lat, currentLocation.lon);

                // Se o botão estiver a mostrar uma métrica ativa, atualiza o valor dinamicamente ao caminhar
                const btnMap = document.getElementById('btn-map');
                if (btnMap && btnMap.dataset.originalHtml && btnMap.innerHTML !== btnMap.dataset.originalHtml) {
                    const { distText, timeText } = formatDistanceAndDuration(currentDistanceMeters);

                    // Identifica se o botão estava a mostrar a distância ou o tempo (verificando o valor atual ou a estrutura)
                    if (btnMap.innerHTML.includes('km') || btnMap.innerHTML.includes('m')) {
                        // Verifica se é o bloco de distância (não tem formato de minutos/horas)
                        if (!btnMap.innerHTML.includes('min') && !btnMap.innerHTML.includes('h')) {
                            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 800;">${distText}</span>`;
                        } else {
                            btnMap.innerHTML = `<span style="color: #ffffff; font-weight: 700;">${timeText}</span>`;
                        }
                    }
                }
            }
        },
        error => {
            console.warn("GPS Erro:", error.message);
            updateGpsIndicator('error');
        },
        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    );
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        if (localStorage.getItem('oportoBingoIntroSeen_43') === 'true') {
            initGPS();
        }
    }
});

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Regras de Vitória e Confettis
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
            showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].winFull, "🏆");
        }, 1200);
    }
    else if (!lineWon) {
        const hasLine = lines.some(line => line.every(index => unlockedArr[index]));
        if (hasLine) {
            lineWon = true;
            fireConfetti(false);
            setTimeout(() => {
                showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].winLine, "🎉");
            }, 1200);
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

// Motores Externos
function openMap() {
    if (!currentLocation) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${currentLocation.lat},${currentLocation.lon}&travelmode=walking`, '_blank');
}

function toggleAudio() {
    if (!currentLocation || !currentLocation.unlocked) return;
    const btnAudio = document.getElementById('btn-audio');

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        if (btnAudio) btnAudio.classList.remove('playing');
        return;
    }

    const activeTabContent = document.querySelector('.tab-content.active p')?.innerText || document.querySelector('.tab-content.active')?.innerText;
    if (!activeTabContent) return;

    const utterance = new SpeechSynthesisUtterance(activeTabContent);
    utterance.lang = uiTexts[currentLang].ttsLang;

    utterance.onstart = () => {
        if (btnAudio) btnAudio.classList.add('playing');
    };

    utterance.onend = () => {
        if (btnAudio) btnAudio.classList.remove('playing');
    };

    utterance.onerror = () => {
        if (btnAudio) btnAudio.classList.remove('playing');
    };

    speechSynthesis.speak(utterance);
}

// =========================================
// MOTOR DE ONBOARDING - SWIPE & SNAP
// =========================================
const splash = document.getElementById('splash-screen');
const gridElement = document.getElementById('bingo-grid');
const footerTitle = document.querySelector('footer h2');
const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');

if (carousel) {
    carousel.addEventListener('scroll', () => {
        const scrollPos = carousel.scrollLeft;
        const cardWidth = carousel.offsetWidth;
        const activeIndex = Math.round(scrollPos / cardWidth);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });

        const startBtn = document.getElementById('ob-btn');
        if (startBtn) {
            if (activeIndex === 2) startBtn.classList.remove('hidden');
            else startBtn.classList.add('hidden');
        }
    });
}

// O Tutorial definitivo (Nunca mais repete depois desta versão)
function finishOnboarding() {
    if (navigator.vibrate) navigator.vibrate(50);
    if (splash) splash.classList.add('fade-out');
    if (gridElement) gridElement.classList.remove('hidden');

    if (document.getElementById('footer-title')) document.getElementById('footer-title').classList.remove('hidden');
    if (document.getElementById('brand-footer')) document.getElementById('brand-footer').classList.remove('hidden');

    setTimeout(() => { if (splash) splash.remove(); }, 1000);

    // CHAVE DEFINITIVA:
    localStorage.setItem('oportoBingoIntroSeen_Final', 'true');

    renderGrid();
    initGPS();
}

const introSeen = localStorage.getItem('oportoBingoIntroSeen_Final');
if (introSeen === 'true') {
    if (splash) splash.remove();
    if (gridElement) gridElement.classList.remove('hidden');

    if (document.getElementById('footer-title')) document.getElementById('footer-title').classList.remove('hidden');
    if (document.getElementById('brand-footer')) document.getElementById('brand-footer').classList.remove('hidden');

    initGPS();
}

// Abas de Navegação
function openTab(evt, tabName) {
    if (navigator.vibrate) navigator.vibrate(30);
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active");
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) tabBtns[i].classList.remove("active");
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Modo Dia/Noite
function checkTimeOfDay() {
    const h = new Date().getHours();
    (h >= 7 && h < 20) ? document.body.classList.add('day-mode') : document.body.classList.remove('day-mode');
}
checkTimeOfDay();
setInterval(checkTimeOfDay, 3600000);

renderGrid();

// =========================================
// MODAL DE AJUDA & MOTOR DE PISTA
// =========================================
const helpModal = document.getElementById('help-modal');

function openHelpModal() {
    if (navigator.vibrate) navigator.vibrate(30);
    helpModal.classList.remove('hidden');
}

function showHint() {
    if (!userLat || !userLon) {
        showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].alertGPS, "📡");
        return;
    }

    let closestLoc = null;
    let minDist = Infinity;

    locations.forEach(loc => {
        if (!loc.unlocked) {
            const dist = getDistanceFromLatLonInM(userLat, userLon, loc.lat, loc.lon);
            if (dist < minDist) {
                minDist = dist;
                closestLoc = loc;
            }
        }
    });

    if (closestLoc) {
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        const cellElement = document.getElementById(`cell-${closestLoc.id}`);

        if (cellElement) {
            cellElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cellElement.classList.add('hint-active');
            setTimeout(() => cellElement.classList.remove('hint-active'), 2400);
        }
    } else {
        showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].alertNoHints, "🗺️");
    }
}

// =========================================
// O PORTÃO DE INSTALAÇÃO CAMALEÃO
// =========================================
let deferredPrompt;
const installGate = document.getElementById('install-gate');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const androidBox = document.getElementById('android-install-box');
const iosBox = document.getElementById('ios-install-box');

function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function checkInstallGate() {
    if (!installGate) return;

    if (isPWA()) {
        installGate.remove();
        return;
    }

    installGate.classList.remove('hidden');

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        if (iosBox) iosBox.classList.remove('hidden');
    } else {
        if (androidBox) androidBox.classList.remove('hidden');
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

if (btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        } else {
            showCustomAlert("Aviso", "Abre as opções (3 pontos) no topo direito e escolhe 'Instalar Aplicação'.", "📱");
        }
    });
}

function copyAppUrl() {
    if (navigator.vibrate) navigator.vibrate(30);
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btnText = document.getElementById('copy-btn-text');
        btnText.innerText = "✅ Link Copiado!";
        setTimeout(() => { btnText.innerText = "🔗 Copiar Link da App"; }, 3000);
    }).catch(err => {
        console.error('Erro a copiar:', err);
    });
}

checkInstallGate();

// =========================================
// WAKE LOCK (IMPEDIR O ECRÃ DE APAGAR)
// =========================================
let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Ecrã mantido ligado ativo!');

            document.addEventListener('visibilitychange', async () => {
                if (wakeLock !== null && document.visibilityState === 'visible') {
                    wakeLock = await navigator.wakeLock.request('screen');
                }
            });
        } catch (err) {
            console.warn('Wake Lock falhou:', err.message);
        }
    }
}

// =========================================
// SISTEMA DE CONTACTO IN-APP
// =========================================
function openContactModal() {
    if (navigator.vibrate) navigator.vibrate(30);
    document.getElementById('help-modal').classList.add('hidden');
    document.getElementById('contact-modal').classList.remove('hidden');
}

function closeContactModal() {
    if (navigator.vibrate) navigator.vibrate(30);
    document.getElementById('contact-modal').classList.add('hidden');
    document.getElementById('contact-form').reset();
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('btn-send-msg');
    btn.classList.add('animating');

    const formData = new FormData(this);

    fetch('https://formspree.io/f/TEU_CODIGO_AQUI', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        btn.classList.remove('animating');
        if (response.ok) {
            closeContactModal();
            showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].contactSuccess, "✅");
        } else {
            showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].contactError, "❌");
        }
    }).catch(error => {
        btn.classList.remove('animating');
        showCustomAlert(uiTexts[currentLang].alertTitle, uiTexts[currentLang].contactNoNet, "📡");
    });
});

// =========================================
// GESTOR INTELIGENTE DE MODAIS (Corrige o bug do iOS)
// =========================================
document.querySelectorAll('.modal').forEach(modalElement => {
    modalElement.addEventListener('click', function (event) {
        if (event.target === this) {
            if (this.id === 'location-modal') closeModal();
            if (this.id === 'custom-alert') closeCustomAlert();
            if (this.id === 'help-modal') this.classList.add('hidden');
            if (this.id === 'contact-modal') closeContactModal();
        }
    });
});