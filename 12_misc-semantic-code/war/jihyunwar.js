function War(enemies_reason, weapon){

	this.enemies = Object.keys(enemies_reason)

	this.prevent = function(){
		this.enemies.forEach(function(enemy) {
			console.log("Dear " + enemy +
				", you don't need " + enemies_reason[enemy] + ". Make peace instead."
				)})
		
		if (weapon === "nuclear") {
			var firstEnemy = this.enemies[Math.floor(Math.random()*this.enemies.length)]
			console.log("\n"+firstEnemy+" will first remove all of their nuclear weapons. Hopefully everyone will follow.")
			
		}
	}
}

var ww3 = new War({
					"US":"world power",
					"Russia":"world power",
					"China": "world power",
					"Iran": "more friends",
					"IS": "a new state"
				},
				"nuclear"
				);

ww3.prevent()