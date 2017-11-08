var exports = module.exports = {}

var reply = 'nope';

var keywords = [
	 ["(.*)(i feel)(.*)", [
	     "I'm not sure I understand you fully.",
	     "Please go on.",
	     "What does that suggest to you?",
	     "Do you feel strongly about discussing such things?",
	     "That is interesting.  Please continue.",
	     "Tell me more about that.",
	     "Does talking about this bother you?"
	  ]
	],
  ["(.*)(i want)(.*)", [
	     "Do you often think of (2)?",
	     "Does thinking of (2) bring anything else to mind?",
	     "(2). What else do you recollect?",
	     "Why do you remember (2) just now?",
	     "What in the present situation reminds you of (2)?",
	     "What is the connection between me and (2)?",
	     "What else does (2) remind you of?"
	  ]
  ],
  ["(.*)", [
	     "I'm listening.",
	     "What's on your mind?",
	     "What is it that you want?",
	     "I'm sure you're here for a reason. Why is that?",
	     "Yes ?",
	     "lol.",
	     "*whistles*"
	  ]
  ]
]

module.exports.process = function(input){
  for (var k=0; k<keywords.length; k++) {
    var regex =  new RegExp(keywords[k][0], 'i');
    console.log('searchin for',keywords[k][0],'?',regex.test(input));
		if (regex.test(input)) {
      var match = input.match(regex);

      var template = keywords[k][1][Math.floor(Math.random()*keywords[k][1].length)];
      if(match[3] != undefined)
        reply = template.replace('(2)', match[3]).trim()
      else
        reply = template

      return reply
		}
	}
  if (reply!='') return "I'm at loss for words.";
}
