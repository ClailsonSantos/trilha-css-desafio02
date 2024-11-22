const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#vidas"),
        velocity: document.querySelector("#velocidade")
        
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result:  0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        countDownTimeId: setInterval(countDown,1000),
    }
};

// FUNÇÃO PARA SETAR OS AUDIOS 
function playSound(audioName){
    let audio = new Audio(`./scr/audios/${audioName}.mp3`)
    audio.volume = 0.2;
    audio.play();
}

//  FUNÇÃO PARA O CONTADOR
function countDown(){
    state.values.currentTime--

    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0
    ){
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.values.timerId);
        alert("TEMPO ESGOTADO!!! Seu resultado foi: " + state.values.result);
        clearInterval(state.values.timerId);
        moveEnemy();
        location.reload(true);
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    // SORTEIA UM NUMERO ALEATORIO ENTRE 1 E 9
    let randomNumber = Math.floor(Math.random() * 9);

    // SORTEIA UM QUADRADO ALEATORIO ENTRE 1 E 9
    let randomSquare = state.view.squares[randomNumber];

    // ADICIONA O INIMIGO NO QUADRADO SORTEADO
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// FUNÇÃO PARA MOVER O INIMIGO 

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

// FUNÇÃO PARA VALIDAR O CLICK NAS CAIXAS

function AddListeningHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("Plim")
            }
            // DIMINUIR VIDAS
            else if(square.id != state.values.hitPosition){
                state.values.lives--
                state.view.live.textContent = state.values.lives;
                state.values.hitPosition = null;
                playSound("somERRO")
                if(state.values.lives === 0
                ){
                    alert("Voce perdeu!")
                    location.reload(true);
                }
            }
            
        });
    });
}

// FUNÇÃO PARA AUMENTAR A VELOCIDADE
function aumentaVelocidade() {
    if (state.values.gameVelocity > 100) { // Impede que a velocidade fique negativa ou muito baixa
        state.values.gameVelocity -= 100;
        state.view.velocity.textContent = state.values.gameVelocity; // Aumenta a velocidade 
        clearInterval(state.values.timerId); 
        moveEnemy(); // Inicia o movimento com a nova velocidade
    }
}

// FUNÇÃO PARA DIMINUIR A VELOCIDADE
function diminuiVelocidade() {
    state.values.gameVelocity += 100; // Diminui a velocidade (aumenta o tempo entre os movimentos do inimigo)
    state.view.velocity.textContent = state.values.gameVelocity;
    clearInterval(state.values.timerId); 
    moveEnemy(); // Inicia o movimento com a nova velocidade
}




function main(){
    moveEnemy();
    AddListeningHitBox();
}

main();
