const attackValue = 10;
const monsterAttackValue = 14;
const strongAttackValue=17;
const healValue=20;

const enteredValue = prompt('maximum life for you and monster','100');
const logPlayerAttack = 'playerAttack';
const logPlayerStrongAttack = 'playerStrongAttack';
const logMonsterAttack = 'monsterAttack';
const logHealPlayer = 'healPlayer';
const logGameOver = 'gameOver';


let chosenMaxLife = parseInt(enteredValue);
let battleLog =[];  

if( isNaN(chosenMaxLife)|| chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let hasBonusLife=true;



adjustHealthBars(chosenMaxLife);

function writeToLog(ev,val,monsterHealth,playerHealth){
    let logEntry; 
     if(ev===logPlayerAttack ){
         logEntry = {
             event: ev,
             value:val,
             target: 'monster',
             finalMonsterHealth: monsterHealth,
             finalPlayerHealth: playerHealth,

         };
     }
     else if(ev===logPlayerStrongAttack){
        logEntry = {
            event: ev,
            value:val,
            target: 'monster',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,

        };
         

     }
     else if(ev===logMonsterAttack){
        logEntry = {
            event: ev,
            value:val,
            target: 'player',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,

        };
     }
     else if(ev===logHealPlayer){
        logEntry = {
            event: ev,
            value:val,
            target: 'monster',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,

        };
     }
     else if(ev===logGameOver){
        logEntry = {
            event: ev,
            value:val,
            target: 'monster',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,

        };
     }
     battleLog.push(logEntry);
}



function reset(){
     currentMonsterHealth = chosenMaxLife;
     currentPlayerHealth = chosenMaxLife;
     resetGame(chosenMaxLife);
}

function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth-=playerDamage;
    writeToLog(
        logMonsterAttack,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth 
    )
    if(currentPlayerHealth<=0 && hasBonusLife){
        
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you would be dead but bonus life has saved you!! ')
        
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('you won');
        writeToLog(
            logGameOver,
            'player won',
            currentMonsterHealth,
            currentPlayerHealth
        );

    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
        alert('monster won');
        writeToLog(
            logGameOver,
            'player lost',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth<=0){
    alert('match drawn');
    writeToLog(
        logGameOver,
        'a draw',
        currentMonsterHealth,
        currentPlayerHealth
    )
}

    if(currentMonsterHealth<=0 || currentPlayerHealth<=0){
        reset();
    }
    
}


function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode==='attack'){
        maxDamage=attackValue;
        logEvent = logPlayerAttack;
    }
    else if(mode==='strongAttack'){
        maxDamage=strongAttackValue;
        logEvent = logPlayerStrongAttack 
    }
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth-=monsterDamage;
    writeToLog(
        logEvent,
        monsterDamage,
        currentMonsterHealth,
        currentPlayerHealth
    )
    
    endRound();
   
}

function attackHandler(){
  attackMonster('attack');
}

function strongAttackHandler(){
   
    attackMonster('strongAttack');

}
function healHandler(){
    let HealValue;
    if(currentPlayerHealth>=chosenMaxLife-healValue){
        alert('you can not use heal opportunity!! ');
        HealValue = chosenMaxLife - currentPlayerHealth;

    }
    else{
        HealValue = healValue;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth+=healValue;
    writeToLog(
        logHealPlayer,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound()

}
function logHandler(){
    let i=0;
    for(const logEntry of battleLog){
        console.log(`${i}`);
        for(const key in logEntry){
            console.log(`${key}=>${logEntry[key]}`);
        }
        i++;

    }
    console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healHandler);
logBtn.addEventListener('click',logHandler);


