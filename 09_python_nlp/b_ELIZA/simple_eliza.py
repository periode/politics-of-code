import re
import random

### input

possible_patterns = [
    [r'i feel (.*)',
        ['why do you feel {0}?',
        'tell me more']],
    [r'(.*) i am (.*)',
        ['i don\'t think you are "{0}"',
        'are you sure? {0}',
        'why do you feel like {0}?']],
    [r'(.*)',
        ['how was your day?',
        'let\'s talk about how you feel?',
        'i didn\'t catch that']]
]

flip = {
    "i am" : "you are",
    "you are": "i am",
    "me" : "you",
    "you" : "me",

}

def analyze(answer):
    for pattern, answers in possible_patterns:
        found = re.match(pattern, answer)

        if found:
            eliza_answer = random.choice(answers)


            extracted_proposition = found.groups()[len(found.groups())-1]
            final_response = eliza_answer.format(*[extracted_proposition])

            return final_response


while True:
    user_input = raw_input('> ')

    if "i'm so sorry" in user_input:
        exit()

    response = analyze(user_input)

    print response
