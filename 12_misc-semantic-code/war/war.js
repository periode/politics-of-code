/**
 * Created by Suhan on 28/11/2017.
 */

function War(country_a,country_b) {
    var force_a = country_a.allies.power? country_a.power + country_a.allies.power : country_a.power;
    var force_b = country_b.allies.power? country_b.power + country_b.allies.power : country_b.power;
    if(force_a>force_b){
        this.winner = country_a.name
    }else {
        this.winner = country_b.name
    }
    this.length = Math.floor(100/((force_b-force_a)*(force_b-force_a)))
}

var DPRK = new Object();
DPRK.name = "DPRK";
DPRK.allies = "";
DPRK.power = 0.5;


var ROK = new Object();
ROK.name = "ROK";
ROK.allies = US;
ROK.power = 0.7;

var US = new Object();
US.name = "US";
US.allies = ROK;
US.power = 0.9;

var war = new War(DPRK,US);
console.log(war.winner,"wins war after",war.length,"days")
