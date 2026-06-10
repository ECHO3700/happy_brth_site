// Защита от копирования и девтулзов
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X' ||
        e.key === 'f' || e.key === 'F' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
    }
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) e.preventDefault();
});
document.addEventListener('selectstart', e => { if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') e.preventDefault(); });
document.addEventListener('copy', e => e.preventDefault());

// Вопросы теста
const questionsList = [
    { text: "Где происходит основное действие повести «Станция Лихо»?", options: ["В мегаполисе будущего", "В глухой лесной местности у заброшенной станции", "В подземном бункере", "На космическом корабле"], correct: 1 },
    { text: "Какую роль играет главная героиня в истории?", options: ["Следователь", "Ведьма / хранительница границы", "Беглая преступница", "Журналистка"], correct: 1 },
    { text: "Что символизирует «Лихо» в названии станции?", options: ["Банду разбойников", "Опасную нечисть или наваждение", "Торговый путь", "Название реки"], correct: 1 },
    { text: "Какой жанр наиболее точно описывает книгу?", options: ["Городское фэнтези", "Мистический триллер с элементами славянского хоррора", "Чистая мелодрама", "Научная фантастика"], correct: 1 },
    { text: "Кто такая Мара в мире книги?", options: ["Богиня любви", "Дух, приносящий кошмары и смерть", "Целительница", "Охотница на демонов"], correct: 1 },
    { text: "Как Морок связан с Марой?", options: ["Он ее брат-близнец", "Он бог сна и наваждения, ее антагонист и партнер", "Он простой смертный, которого она прокляла", "Он ее питомец"], correct: 1 },
    { text: "Что является основным источником конфликта между героями?", options: ["Борьба за трон", "Невозможность доверять друг другу из-за проклятия/обмана", "Разница в социальном статусе", "Конкуренция за магический артефакт"], correct: 1 },
    { text: "Какова главная тема дилогии?", options: ["Технологический прогресс", "Опасная любовь, ложь и искупление", "Путешествие во времени", "Эпическое сражение с драконами"], correct: 1 },
    { text: "Кто является рассказчиком и главным героем книги?", options: ["Охотник на вампиров Габриэль де Леон", "Король вампиров", "Священник-отступник", "Простой крестьянин"], correct: 0 },
    { text: "Что за орден «Серебряная пряжка»?", options: ["Орден воров", "Военная академия для убийц вампиров", "Тайная полиция людей", "Гильдия торговцев"], correct: 1 },
    { text: "Какую ключевую особенность имеют вампиры в этой вселенной?", options: ["Они не переносят святую воду", "Они почти неуязвимы, а солнце лишь ослабляет, но не убивает", "Они пьют только кровь девушек", "Они могут превращаться только в летучих мышей"], correct: 1 },
    { text: "Почему Габриэль оказывается на допросе?", options: ["Его поймали на преступлении", "Он последний живой охотник, и вампиры пытают его ради истории", "Он судится с Орденом", "Он пишет мемуары по своей воле"], correct: 1 },
    { text: "Кто ведет дневниковые записи в повести «Морфий»?", options: ["Доктор Бомгард", "Доктор Поляков", "Профессор Преображенский", "Сам Булгаков"], correct: 1 },
    { text: "Что предшествовало началу зависимости героя?", options: ["Травма", "Лечение собственной болезни (дифтерии) морфием", "Давление коллег", "Случайное отравление"], correct: 1 },
    { text: "Как заканчивается история доктора Полякова?", options: ["Исцеление", "Самоубийство из-за ломки", "Лечебница", "Убийство"], correct: 1 },
    { text: "Как Булгаков связан с текстом?", options: ["Сам пережил зависимость", "Переписал с чужих слов", "Не имел дела", "Вымысел"], correct: 0 },
    { text: "В каком формате написан роман «Дракула»?", options: ["Проза", "Эпистолярный", "Стихи", "Пьеса"], correct: 1 },
    { text: "Кто убивает графа Дракулу?", options: ["Джонатан Харкер", "Квинси Моррис и Джонатан Харкер", "Ван Хельсинг", "Мина Харкер"], correct: 1 },
    { text: "Какая способность НЕ приписывается Дракуле?", options: ["Ползать по стенам", "Превращения", "Обращать поцелуем без обмена кровью", "Контроль волков"], correct: 2 },
    { text: "Как зовут безумного помощника Дракулы?", options: ["Игорь", "Ренфилд", "Квентин", "Артур"], correct: 1 }
];

// Панель тест-режима
let insideTesterUnlocked = false;
const insidePass = document.getElementById('insidePanelPassword');
const insideUnlock = document.getElementById('insideUnlockBtn');
const insideBtnsDiv = document.getElementById('insideTestButtons');
const insideLockSpan = document.getElementById('insideLockStatus');

function unlockInside() {
    if (insidePass.value === "999") {
        insideTesterUnlocked = true;
        insideBtnsDiv.style.display = 'block';
        insideLockSpan.innerHTML = '🔓 РАЗБЛОКИРОВАНО';
        insideLockSpan.style.color = '#a8e06e';
        insidePass.value = '';
        alert('🔓 Тест-режим активирован!');
    } else alert('⛔ Неверный пароль!');
}
insideUnlock.addEventListener('click', unlockInside);
insidePass.addEventListener('keypress', (e) => { if (e.key === 'Enter') unlockInside(); });

// Убегающая кнопка
let escapeCount = 0;
const giftBtn = document.getElementById('giftBtn');
const hintDiv = document.getElementById('hintMessage');
const mainScr = document.getElementById('mainScreen');
const transitionScr = document.getElementById('transitionScreen');
const testScr = document.getElementById('testScreen');
const buttonArea = document.getElementById('buttonArea');

function getRandomPos(btn) {
    const pad = 30;
    const rect = btn.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    const maxX = window.innerWidth - w - pad;
    const maxY = window.innerHeight - h - pad;
    return { x: Math.max(pad, Math.random() * maxX), y: Math.max(pad, Math.random() * maxY) };
}

function moveButton() {
    if (!giftBtn.classList.contains('absolute-mode')) {
        giftBtn.classList.add('absolute-mode');
        buttonArea.style.position = 'relative';
        buttonArea.style.minHeight = '100vh';
        giftBtn.style.position = 'absolute';
    }
    const { x, y } = getRandomPos(giftBtn);
    giftBtn.style.left = x + 'px';
    giftBtn.style.top = y + 'px';
}

function showHintMsg(text) {
    hintDiv.style.display = 'block';
    hintDiv.innerText = text;
    setTimeout(() => {
        hintDiv.style.opacity = '0';
        setTimeout(() => {
            hintDiv.style.display = 'none';
            hintDiv.style.opacity = '1';
        }, 300);
    }, 2300);
}

function showTransitionAndTest() {
    mainScr.classList.add('hide');
    transitionScr.classList.add('active');
    setTimeout(() => {
        transitionScr.classList.remove('active');
        testScr.classList.add('active');
        setTimeout(() => testScr.scrollTop = 0, 60);
    }, 3000);
}

giftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (escapeCount === 0) { escapeCount++; moveButton(); showHintMsg("❄️ Что не получается? ❄️"); }
    else if (escapeCount === 1) { escapeCount++; moveButton(); showHintMsg("🌙 Ну, че, не получается? 🌙"); }
    else if (escapeCount === 2) { escapeCount++; showHintMsg("🍂 Ну ладно, жми 🍂"); setTimeout(showTransitionAndTest, 800); }
});

window.addEventListener('resize', () => {
    if (giftBtn.classList.contains('absolute-mode') && escapeCount < 3 && escapeCount > 0) {
        const left = parseFloat(giftBtn.style.left), top = parseFloat(giftBtn.style.top);
        const rect = giftBtn.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - 30, maxY = window.innerHeight - rect.height - 30;
        let nl = left, nt = top;
        if (left > maxX) nl = maxX - 10; if (left < 30) nl = 30;
        if (top > maxY) nt = maxY - 10; if (top < 30) nt = 30;
        giftBtn.style.left = nl + 'px'; giftBtn.style.top = nt + 'px';
    }
});

// Построение теста
function buildQuiz() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    questionsList.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `<div class="question-text"><span class="question-num">Вопрос ${idx+1}</span> <span>${q.text}</span></div><div class="options" id="opts-${idx}"></div>`;
        const optsDiv = card.querySelector(`.options`);
        q.options.forEach((opt, optIdx) => {
            const optWrap = document.createElement('div');
            optWrap.className = 'option';
            const rId = `q${idx}_opt${optIdx}`;
            optWrap.innerHTML = `<input type="radio" name="question_${idx}" value="${optIdx}" id="${rId}"><label for="${rId}">${opt}</label>`;
            optsDiv.appendChild(optWrap);
        });
        container.appendChild(card);
    });
}

function getScore() {
    let correct = 0;
    for (let i = 0; i < questionsList.length; i++) {
        const selected = document.querySelector(`input[name="question_${i}"]:checked`);
        if (selected && parseInt(selected.value) === questionsList[i].correct) correct++;
    }
    return { correct, total: questionsList.length };
}

// Модальные окна
const epicModal = document.getElementById('epicModal');
const caesarModal = document.getElementById('caesarModal');
const finalModal = document.getElementById('finalModal');
const closeEpicBtn = document.getElementById('closeEpicBtn');
const caesarSubmit = document.getElementById('caesarSubmitBtn');
const caesarClose = document.getElementById('caesarCloseBtn');
const finalClose = document.getElementById('finalCloseBtn');
const caesarAnswer = document.getElementById('caesarAnswer');
const caesarFeedback = document.getElementById('caesarFeedback');

function showEpic() { epicModal.classList.add('active'); }
function hideEpic() { 
    epicModal.classList.remove('active');
    setTimeout(() => { caesarModal.classList.add('active'); }, 200);
}
function hideCaesar() { caesarModal.classList.remove('active'); }
function showFinal() { finalModal.classList.add('active'); }
function hideFinal() { finalModal.classList.remove('active'); }

closeEpicBtn.addEventListener('click', hideEpic);
caesarClose.addEventListener('click', hideCaesar);
finalClose.addEventListener('click', hideFinal);

caesarSubmit.addEventListener('click', () => {
    const userAnswer = caesarAnswer.value.trim().toLowerCase();
    const correctAnswer = "фаликула кукарачи";
    if (userAnswer === correctAnswer) {
        caesarFeedback.innerHTML = '✅ ВЕРНО! Ты взломала шифр!';
        caesarFeedback.style.color = '#a8e06e';
        caesarAnswer.disabled = true;
        caesarSubmit.disabled = true;
        setTimeout(() => {
            hideCaesar();
            setTimeout(() => { showFinal(); }, 200);
        }, 800);
    } else {
        caesarFeedback.innerHTML = '❌ Неправильно. Попробуй ещё раз! Подсказка: сдвиг +3 (или -3 по Цезарю)';
        caesarFeedback.style.color = '#e0a060';
        caesarAnswer.value = '';
    }
});

function showResult() {
    const { correct, total } = getScore();
    const percent = Math.round((correct / total) * 100);
    const resDiv = document.getElementById('resultBlock');
    const passed = percent >= 70;
    if (passed) {
        resDiv.innerHTML = `🍂 РЕЗУЛЬТАТ: ${correct}/${total} (${percent}%) — ТЫ ПРОШЛА ИСПЫТАНИЕ! 🍂<br>🌲 Магия леса признаёт твои знания. 🌲`;
        resDiv.style.background = "#2e4020cc";
        resDiv.style.border = "3px solid #b5d374";
        setTimeout(() => showEpic(), 500);
    } else {
        resDiv.innerHTML = `💀 РЕЗУЛЬТАТ: ${correct}/${total} (${percent}%) 💀<br><br>❗ МАТЬ, ПИЗДУЙ КНИГИ ПЕРЕЧИТЫВАТЬ ❗<br><span style="font-size:1rem;">Нужно 70% для посвящения.</span>`;
        resDiv.style.background = "#341c1ccc";
        resDiv.style.border = "3px solid #ab5f3f";
    }
    resDiv.classList.add('show');
    setTimeout(() => resDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

// Автозаполнение для тест-режима
function autoCompleteQuiz(allCorrect) {
    if (!insideTesterUnlocked) { alert('🔐 Панель заблокирована! Пароль 999.'); return; }
    for (let i = 0; i < questionsList.length; i++) {
        const radios = document.querySelectorAll(`input[name="question_${i}"]`);
        if (radios.length) {
            const targetIndex = allCorrect ? questionsList[i].correct : (questionsList[i].correct + 1) % radios.length;
            if (radios[targetIndex]) radios[targetIndex].checked = true;
        }
    }
    showResult();
}

function completeQuizForPercent(targetPercent) {
    if (!insideTesterUnlocked) { alert('🔐 Панель заблокирована! Пароль 999.'); return; }
    const total = questionsList.length;
    const neededCorrect = Math.round((targetPercent / 100) * total);
    let correctCount = 0;
    for (let i = 0; i < total; i++) {
        const radios = document.querySelectorAll(`input[name="question_${i}"]`);
        if (radios.length) {
            let targetIndex;
            if (correctCount < neededCorrect) { targetIndex = questionsList[i].correct; correctCount++; } 
            else { targetIndex = (questionsList[i].correct + 1) % radios.length; }
            if (radios[targetIndex]) radios[targetIndex].checked = true;
        }
    }
    showResult();
}

document.getElementById('insideAutoPass').addEventListener('click', () => autoCompleteQuiz(true));
document.getElementById('insideAutoFail').addEventListener('click', () => autoCompleteQuiz(false));
document.getElementById('inside70Percent').addEventListener('click', () => completeQuizForPercent(70));
document.getElementById('submitQuiz').addEventListener('click', showResult);

buildQuiz();
console.log('🌲 Лесной храм открыт. Пароль: 999. Шифр: чгмлхнг нхнгугьл → фаликула кукарачи');
