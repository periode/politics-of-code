function Yemeni(status, innocents){
  this.yemeni_soldiers = 1
  this.coalition_soldiers = 1
  this.hoathis = 1
  this.purpose = "Peace"
  this.civilians = innocents

  this.war = function(){
    return number_of_fatalities = this.yemeni_soldiers * this.coalition_soldiers * this.hoathis * yemenis.s
  }

  this.peace = function(people){
    return number_of_survivors = this.civilians * people.assess(this.purpose) * this.yemeni_soldiers
  }
}


yemenis = new people('safety')


people = function(purpose){
  this.s = Math.random()
  this.purpose = purpose

  this.assess = function(purpose){
    if(purpose == this.purpose){
      return 10
    } else {
      return 0.1
    }
  }
}



Abdulrahman_Fadi = new Yemeni('pres', 27000000)

console.log(Abdulrahman_Fadi.war())
