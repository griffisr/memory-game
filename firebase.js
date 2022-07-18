
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

  var data = {

    name: "RAG",
    score: "23456"
  }
  ref.push(data);



  leaderboardNames = [];
  leaderboardScores = [];

  
  function gotData(data){
    //Momentarily clears both UI lists so items can be added w/o duplicates
    document.getElementById("highScores").innerHTML = "";

    var scores = data.val();
    var keys = Object.keys(scores);

    var leaderboard = document.getElementById("highScores");

    console.log("test")
    for ( var i=0; i < keys.length; i++){
      var k = keys[i];
      var name = scores[k];
      console.log(name);
      console.log("test");

    }


  }
