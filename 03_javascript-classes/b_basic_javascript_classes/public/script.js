console.log('hello!');


var Human = function(_name, _age, _gender, _hopes){
  this.name = _name;
  this.age = _age;
  this.gender = _gender;
  this.hopes = _hopes;

  this.introduction = function(){
    console.log("hey, i'm "+this.name+", a "+this.age+" year-old "+this.gender+" who dreams of "+this.hopes);
  }
}

var you = new Human("pierre", 35, "male", "going to the moon");

you.introduction();
