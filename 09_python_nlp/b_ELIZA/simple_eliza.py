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
    "i" : "you",
    "i'm" : "you are",
    "you're": "i am",
    "me" : "you",
    "you" : "me"
}

def reflect(proposition):
    tokens = proposition.lower().split()

    for i in range(len(tokens)):

        if tokens[i] in flip:
            current_pronoun = tokens[i]
            tokens[i] = flip[current_pronoun]


    return ' '.join(tokens)


def analyze(answer):
    for pattern, answers in possible_patterns:
        found = re.match(pattern, answer)

        if found:
            eliza_answer = random.choice(answers)


            extracted_proposition = found.groups()[len(found.groups())-1]
            reflected_proposition = reflect(extracted_proposition)
            final_response = eliza_answer.format(*[reflected_proposition])

            return final_response


while True:
    user_input = raw_input('> ')

    if "i'm so sorry" in user_input:
        exit()

    response = analyze(user_input)

    print response
