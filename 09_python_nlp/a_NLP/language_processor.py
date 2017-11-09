import re, math, collections, itertools, os
import nltk, nltk.classify.util, nltk.metrics
from nltk import precision
from nltk import recall
from nltk.classify import NaiveBayesClassifier
from nltk.metrics import BigramAssocMeasures
from nltk.probability import FreqDist, ConditionalFreqDist


#define our files
POLARITY_DATA_DIR = os.path.join('polarityData', 'rt-polaritydata')
RT_POLARITY_POS_FILE = os.path.join(POLARITY_DATA_DIR, 'rt-polarity-pos.txt')
RT_POLARITY_NEG_FILE = os.path.join(POLARITY_DATA_DIR, 'rt-polarity-neg.txt')


#this function takes a feature selection mechanism and returns its performance in a variety of metrics
def evaluate_features(feature_select):
	positive_features = []
	negative_features = []

	#breaks up the sentences into lists of individual words (as selected by the input mechanism) and appends 'pos' or 'neg' after each list
	with open(RT_POLARITY_POS_FILE, 'r') as positive_sentences:
		for i in positive_sentences:
			positive_word = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
			positive_word = [feature_select(positive_word), 'pos']
			positive_features.append(positive_word)
	with open(RT_POLARITY_NEG_FILE, 'r') as negative_sentences:
		for i in negative_sentences:
			negative_word = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
			negative_word = [feature_select(negative_word), 'neg']
			negative_features.append(negative_word)


	#selects 3/4 of the features to be used for training and 1/4 to be used for testing
	positive_cutoff = int(math.floor(len(positive_features)*3/4))
	negative_cutoff = int(math.floor(len(negative_features)*3/4))

	#here we define the features on which the classifier will be trained
	trainFeatures = positive_features[:positive_cutoff] + negative_features[:negative_cutoff]

	#testFeatures are all the sentences in the last quarter of our training set (the .txt file)
	testFeatures = positive_features[positive_cutoff:] + negative_features[negative_cutoff:]

	#trains a Naive Bayes Classifier
	#what is a naive bayes classifier? it looks at occurences in sentences marked as either positive or negative, and then classifies the words that are used the most
	classifier = NaiveBayesClassifier.train(trainFeatures)

	#create default dictionaries so that we can store values inside later on
	referenceSets = collections.defaultdict(set)
	testSets = collections.defaultdict(set)

	#separates correctly labeled sentences inside referenceSets and the predictively labeled version inside testSets
    #enumerate the features that are tested
	for i, (features, label) in enumerate(testFeatures):
		referenceSets[label].add(i)

		#here, the classifier goes through the features of the current sentence we're at, and returns a prediction
		#of whether it might be either positive or negative
		predicted = classifier.classify(features)

		#then it adds it to the testSet, either positive or negative
		testSets[predicted].add(i)

	#prints metrics to show how well the feature selection did by comparing to the actual labels
	print '----- RESULT'
	print 'train on %d instances, test on %d instances' % (len(trainFeatures), len(testFeatures))

	#accuracy is correct guesses divided by all guesses
	print 'accuracy:', nltk.classify.util.accuracy(classifier, testFeatures)

	#precision is the correct guesses penalized by the number of incorrect guesses.
	print 'reference set - positive precision:', precision(referenceSets['pos'], testSets['pos'])

	#recall is correct guesses penalized by the number of missed items.
	print 'reference set - pos recall:', recall(referenceSets['pos'], testSets['pos'])

	#and vice versa
	print 'reference set - negative precision:', precision(referenceSets['neg'], testSets['neg'])
	print 'reference set - negative recall:', recall(referenceSets['neg'], testSets['neg'])

	#print some info
	classifier.show_most_informative_features(10)

#creates a feature selection mechanism that uses all words
def make_full_dict(words):
	return dict([(word, True) for word in words])

#tries using all words as the feature selection mechanism
print 'using all words as features'
evaluate_features(make_full_dict)

#scores words based on chi-squared test to show information gain (http://streamhacker.com/2010/06/16/text-classification-sentiment-analysis-eliminate-low-information-features/)
def create_word_scores():
	#creates lists of all positive and negative words
	all_positive_words = []
	all_negative_words = []

	with open(RT_POLARITY_POS_FILE, 'r') as positive_sentences:
		for i in positive_sentences:
			#stripping down all the words from extra characters (tabs, punctuation, etc.)
			positive_word = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
			all_positive_words.append(positive_word)

	with open(RT_POLARITY_NEG_FILE, 'r') as negative_sentences:
		for i in negative_sentences:
			#stripping down all the words from extra characters (tabs, punctuation, etc.)
			negative_word = re.findall(r"[\w']+|[.,!?;]", i.rstrip())
			all_negative_words.append(negative_word)

	all_positive_words = list(itertools.chain(*all_positive_words))
	all_negative_words = list(itertools.chain(*all_negative_words))

	#build frequency distibution of all words and then frequency distributions of words within positive and negative labels
	#how often do words appear?
	word_fd = FreqDist()
	cond_word_fd = ConditionalFreqDist()
	for word in negative_words:
		word_fd[word.lower()] += 1
		cond_word_fd['pos'][word.lower()] += 1

	for word in negative_word:
		word_fd[word.lower()] += 1
		cond_word_fd['neg'][word.lower()] += 1

	#finds the number of positive and negative words, as well as the total number of words
	pos_word_count = cond_word_fd['pos'].N()
	neg_word_count = cond_word_fd['neg'].N()
	total_word_count = pos_word_count + neg_word_count

	#builds dictionary of word scores based on chi-squared test
	word_scores = {}
	for word, freq in word_fd.iteritems():
		pos_score = BigramAssocMeasures.chi_sq(cond_word_fd['pos'][word], (freq, pos_word_count), total_word_count)
		neg_score = BigramAssocMeasures.chi_sq(cond_word_fd['neg'][word], (freq, neg_word_count), total_word_count)
		word_scores[word] = pos_score + neg_score

	return word_scores

#finds the best 'number' words based on word scores
def find_best_words(word_scores, number):
	best_vals = sorted(word_scores.iteritems(), key=lambda (w, s): s, reverse=True)[:number]
	best_words = set([w for w, s in best_vals])
	return best_words

#creates feature selection mechanism that only uses best words
def best_word_features(words):
	return dict([(word, True) for word in words if word in best_words])

#numbers of features to select
numbers_to_test = [10, 100, 1000, 10000, 15000]
#tries the best_word_features mechanism with each of the numbers_to_test of features

print 'evaluating best 10000 word features'

#finds word scores
word_scores = create_word_scores()

#find the best words, the words most strongly correlated with good or bad
best_words = find_best_words(word_scores, 10000)

evaluate_features(best_word_features)

0
