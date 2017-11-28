//how likely a country is to go to war

function War(){
  this.patriotism = 1
  this.enemy = 1 //is there an enemy
  this.money = 100 //country GDP? 
  this.profit = this.money * 100 //random number

this.leader = function(political_purpose) { //assess how likely leader is to contribute to war
	this.charisma = 1
	this.selfishness = 1
	return leader_impact = this.charisma * this.selfishness * political_purpose.reelection
}

  this.motivation = function(leader_impact){
    return amount_of_motivation = this.profit * leader_impact * this.ignorance * this.money
  }
}

function probability(){
	return this.leader * this.motivation
}

political_purpose {
	good_intentions: 0
	popularity: 5
	relection: 100
	personal_profit: 1000
}

var egypt = new War();

console.log(egypt.probability()); 
