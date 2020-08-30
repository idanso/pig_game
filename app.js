/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, finalScore, activeGame = true;
newGame();

function rollDiceBtn(){
    if(activeGame){
        var dice = Math.floor(Math.random()*6) +1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        if(dice === 1){
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            changePlayer();
        }
        else{
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
}
function holdBtn(){
    if(activeGame){
        scores[activePlayer] += roundScore;
        roundScore = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        var input = document.querySelector('.final-score').value;
        if(input){
            finalScore = input;
            if(scores[activePlayer] >= finalScore){
            document.querySelector('#name-' + activePlayer).textContent = 'winner';
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            activeGame = false;
            }

        }
        else
            changePlayer();
    }
}
function changePlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
   }
   else {
       activePlayer = 0 ;
       document.querySelector('.player-1-panel').classList.toggle('active');
       document.querySelector('.player-0-panel').classList.toggle('active');
   }
}
function newGame(){
    if (activePlayer !== undefined){
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('winner');
        document.querySelector('#name-' + activePlayer).textContent = 'Player ' + Number(activePlayer+1);
    }
    activeGame = true;
    activePlayer = Math.floor(Math.random()*2);
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    roundScore = 0;
    scores = [0,0];
}
document.querySelector('.btn-roll').addEventListener('click',rollDiceBtn)
document.querySelector('.btn-hold').addEventListener('click',holdBtn)
document.querySelector('.btn-new').addEventListener('click', newGame);