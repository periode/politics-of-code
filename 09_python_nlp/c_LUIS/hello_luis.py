import luis

endpoint = 'https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=fe5ca229c0464f699f8a461c305360c5&q='

l = luis.Luis(url='https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=fe5ca229c0464f699f8a461c305360c5&q=')

result = l.analyze('set the alarm for 12am!')

print result.entities

print result.intents
