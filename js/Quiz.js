class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.cover()
 
    background("orange")

    this.title = createElement('h1')
    this.title.html("Results of the Quiz!!!");
    this.title.position(150, 80)
    Contestant.getContestantInfo();

    if(allContestants !== undefined){
     fill("Blue")
     textSize(20);
     text("CONTESTANTS WHO ARE CURRENTLY HIGHLIGHTED GREEN HAVE ANSWERED CORRECTLY", 130, 250) 
    }

    for(var plr in allContestants){
      var correctAns = "2"
      if(correctAns === allContestants[plr].answer){
        fill("green")
      text(allContestants[plr].name, 200, 200)
      }
    }
    
  }
}
