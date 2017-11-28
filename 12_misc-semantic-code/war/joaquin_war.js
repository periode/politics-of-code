function Country(budget, tech, purpose){

  this.purpose = purpose;
  this.budget = budget;
  this.tech_advancement = tech;
  this.number_of_allies = agreement(this.purpose, this.strength);
  this.strength = this.number_of_allies*0.2 + this.tech_advancement*0.8;

  this.declareWar = function(opponent){
    return victory = (this.strength > opponent.strength);
  }
}

var countries = [
  {
    name: 'USA',
    purpose: 'imperialism'
  },
  {
    name: 'Mexico',
    purpose: 'culture'
  },
  {
    name: 'Canada',
    purpose: 'politeness'
  },
  {
    name: 'Brazil',
    purpose: 'culture'
  },
  {
    name: 'Italy',
    purpose: 'culture'
  }
];

function agreement(purpose){
  var count = 0;
  for(var i = 0; i < countries.length; i++){
    if(countries[i].purpose == purpose)
      count++;
  }
  return count;
}

france = new Country(2.465, 8, 'culture');
uk = new Country(2.619, 8, 'imperialism');

console.log(france.declareWar(uk));
