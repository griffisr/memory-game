
///////////////LEADERBOARD//////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyCzKjRcGq0tnn-4_uIXfwXHnEMHq3rFRrk",
  authDomain: "zoo-pals.firebaseapp.com",
  projectId: "zoo-pals",
  storageBucket: "zoo-pals.appspot.com",
  messagingSenderId: "560907537409",
  appId: "1:560907537409:web:6c2d990e828276b5548400",
  measurementId: "G-J1M9NYZWGS",
  databaseURL: "https://zoo-pals-default-rtdb.firebaseio.com/"
};





  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  var ref = database.ref("highscores")
  ref.on('value', gotData, errData )


  leaderboardNames = [];


  function uploadLeaderboardScore (initials, time){
    var ref = database.ref("highscores")
    var data = {
      name: initials,
      score: time
    }
    ref.push(data)
  }

  var sortedUsers = [];
  function gotData(data){
    
    console.log(data.val());
    var scores = data.val();
    var keys = Object.keys(scores);
    var leaderboard = document.getElementById("highScores");

    for ( var i=0; i < keys.length; i++){
      var k = keys[i];
      var initials = scores[k].name;
      var score = scores[k].score;
      var rank = scores[k].rank;
      sortedUsers.push({rank,initials, score});

      var content = document.createElement("h4")
      var li = document.createElement("li" )
      li.appendChild(content);
      content.textContent = (initials + ": " + score); 
      leaderboard.appendChild(li);
    }
    addsortUsers(sortedUsers);

  }



  function errData(err) {
    console.log("error!");
    console.log(err)
   }

   function addsortUsers (users) {
    
    console.log(users)

   }





   async function getLeaderboardScores (){

  }

////////////Leaderboard Stuff/////////////////
var highScores = document.getElementById("highScores");

var userScores = [];


///////////////CARDS////////////////////////


const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//Win condition variable///////////////////////////////////////////////////
var matchedCards = 0;
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  ++matchedCards;

  console.log(matchedCards)
  resetBoard();
  if(matchedCards>5)
  {
    winCondition();
  }
}



////////////////////WIN CONDITION////////////////////////////////////////////////////////////
function winCondition(){

  var currentScore = (timers[0].counter)
  setTimeout(function addToLeaderboard(){

    let userName;
    let person = prompt("Congrats! You've won! Please enter your initials for the leaderboard!", "AAA");
    if (person == null || person == "" || person.length>3) {
      alert("Please enter your initials to be added to the leaderboard (EX:'AAA')")
      addToLeaderboard();
    }
    else {
      //Momentarily clears both UI lists so items can be added w/o duplicates
      document.getElementById("highScores").innerHTML = "";
      uploadLeaderboardScore(person, currentScore);
      document.location.reload(true);
    }

   
    }
      , 1000);

}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');


    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));



////////////Timer Stuff/////////////////


var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var cw=canvas.width;
var ch=canvas.height;


var timers=[];
timers.push({delay:25,nextFireTime:0,doFunction:doTimers,counter:5000});


requestAnimationFrame(timerLoop);

function timerLoop(currentTime){
  requestAnimationFrame(timerLoop);

  for(var i=0;i<timers.length;i++){
    if(currentTime>timers[i].nextFireTime){
      var t=timers[i];
      t.nextFireTime=currentTime+t.delay;
      t.doFunction(t,i);
    }
  }
}
function doTimers(t,i){ 
  if (t.counter == 0)
  {
    t.counter = 5000;
    resetBoard();
    alert("You lose");
    
  }

  ctx.font = '50px serif';
  ctx.clearRect(0,100+i*50-50,cw,60);
  ctx.fillText((--t.counter),20,100+20*i); 
    
}





