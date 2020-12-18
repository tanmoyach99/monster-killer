const attackValue = 10;
const monsterAttackValue = 14;
const strongAttackValue=17;
const healValue=20;

const enteredValue = prompt('maximum life for you and monster','100');


let chosenMaxLife = parseInt(enteredValue);

if( isNaN(chosenMaxLife)|| chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let hasBonusLife=true;



adjustHealthBars(chosenMaxLife);

function reset(){
     currentMonsterHealth = chosenMaxLife;
     currentPlayerHealth = chosenMaxLife;
     resetGame(chosenMaxLife);
}

function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    currentPlayerHealth-=playerDamage;
    if(currentPlayerHealth<=0 && hasBonusLife){
        
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you would be dead but bonus life has saved you!! ')
        
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('you won');
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
        alert('monster won');
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth<=0){
    alert('match drawn')}

    if(currentMonsterHealth<=0 || currentPlayerHealth<=0){
        reset();
    }
    
}


function attackMonster(mode){
    let maxDamage;
    if(mode==='attack'){
        maxDamage=attackValue;
    }
    else if(mode==='strongAttack'){
        maxDamage=strongAttackValue;
    }
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth-=monsterDamage;
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
        alert('you can not use heal oppurtunity!! ');
        HealValue = chosenMaxLife - currentPlayerHealth;

    }
    else{
        HealValue = healValue;
    }

    currentPlayerHealth+=healValue;
    increasePlayerHealth(healValue);
    endRound()

}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healHandler);


