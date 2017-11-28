function War(enemy_01,enemy_02){
  this.enemies = [enemy_01,enemy_02];
  this.intro_string = "";
  this.prologue = function(){
    for(var i = 0; i < this.enemies.length; i++){
      if(i === 0){
        this.intro_string += this.enemies[i].name;
      }else{
        this.intro_string += " and " +  this.enemies[i].name;
      }
    }
    console.log(this.intro_string);
  }

  this.wage = function(){
    var power_difference = this.enemies[0].aggregate_power - this.enemies[1].aggregate_power;
    var relative_winner = power_difference >= 0 ? this.enemies[0].name : this.enemies[1].name;
    if(Math.abs(power_difference) > 1){
      console.log(relative_winner + " will win");
    }else{
      console.log("no side will win");
    }
  }

}

function Enemy(name,power){
  this.name = name;
  this.aggregate_power = power;
};

var houthis = new Enemy("houthis",3);
var coalition_forces = new Enemy("Saudi-led coalition forces",3.5);

var war = new War(houthis,coalition_forces);
war.prologue();
war.wage();
