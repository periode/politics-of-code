function Leader(status, f){

  this.charisma = 1 //0-1
  this.eloquency = 1
  this.reach = 0.5 * socio_economical_status.king
  this.followers = f //or random distribution
  this.purpose = "friendship"

  this.inspire = function(){
    return number_of_inspired = this.charisma * saudis.acceptance * this.reach
  }

  this.motivation = function(people){
    return number_of_motivated = this.charisma * people.assess(this.purpose) * this.reach
  }

}

people = function(purpose){
  this.acceptance = Math.random() // => look at the history of previous leaders
  this.purpose = purpose

  this.assess = function(purpose){
    if(purpose == this.purpose){
      return 1
    } else {
      return 0.1
    }
  }
}


socio_economical_status = {
  'journalist': 1,
  'president': 2,
  'king': 10
}

saudis = new people('comfort')

king_salman = new Leader('king', 32000000)

console.log(king_salman.inspire())
