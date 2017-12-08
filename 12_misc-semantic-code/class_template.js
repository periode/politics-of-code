function MyClass(){
  this.property1 = 1
  this.property2 = 'too'

  this.myAction = function(){
    console.log('i would rather not')
  }
}

var cl = new MyClass();

cl.myAction()
