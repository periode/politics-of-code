import random
import re

reflections = {
    "are": "am",
    "was": "were",
    "i": "you",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "my": "your",
    "are": "am",
    "you've": "I have",
    "you'll": "I will",
    "your": "my",
    "yours": "mine",
    "you": "you",
    "me": "you"
}

psychobabble = [
    [r'I feel (.*)',
     ["Why do you feel {0}?",
      "Tell me more about why you feel {0}."]],
     [r'I mean (.*).',
      ["How come you mean {0}?",
       "Hmm. {0}. Why is that?"]],

    [r'(.*)\?',
     ["Why is that?",
      "Really?"]],

    [r'(.*)',
     ["What do you mean?",
      "I don't understand. How do you feel?"]]
]

def reflect(user_sentence):
    #clean up the sentence, lowercase it and split into words
    tokens = user_sentence.lower().split()

    #go through all these words
    for i in range(len(tokens)):

        #if we find some of the keywords that need to be reflected (me > you, I am > you are)
        if tokens[i] in reflections:

            #we operate the switch
            tokens[i] = reflections[tokens[i]]

    #and then join all the words to form a sentence again
    return ' '.join(tokens)



def analyze(answer):
    #we go through all of our potential responses
    for pattern, responses in psychobabble:
        #there is a match if the user answer matches a given pattern
        match =  re.match(pattern, answer.rstrip(".?!"))

        #if we've found a match
        if match:
            #pick a response at random which
            response = random.choice(responses)

            #now we need to replace any potential "holes" in our string with what the user said
            #and as we go through these words we will also reflect any pronoun/verb
            final_response = response.format(*[reflect(g) for g in match.groups()])

            return final_response

print "Hello, my name is Eliza."
while True:
    user = raw_input('>')
    print analyze(user)
