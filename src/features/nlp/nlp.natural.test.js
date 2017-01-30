import NLP from 'natural';

const toMaxValue = (x, y) => ( x && x.value > y.value ? x : y )

const categories = [
  {
    label: "new epic",
    phrases: [
      "create epic", "make epic", "new epic"
    ]
  },
  {
    label: "move epic",
    phrases: [
      "move epic"
    ]
  },
  {
    label: "remove epic",
    phrases: [
       "remove epic", "delete epic"
    ]
  },
    {
    label: "new feature",
    phrases: [
      "create feature", "make feature", "new feature"
    ]
  },
  {
    label: "move feature",
    phrases: [
      "move feature"
    ]
  },
  {
    label: "remove feature",
    phrases: [
       "remove feature", "delete feature"
    ]
  }
]

const classifierFactory = (classifier) => {
    const minConfidence = 0.7;

    categories.forEach(category => {
      category.phrases.forEach(phrase => {
        classifier.addDocument(phrase, category.label);
      })
    })

    classifier.train();

    return classifier;
}

describe('exploring natural nlp framework', () => {

  it.skip('passes with logistic regression', () => {
    const classifier = classifierFactory(new NLP.LogisticRegressionClassifier());

    const sentence = "make a brand new feature called security";

    const guess = classifier.getClassifications(sentence).reduce(toMaxValue);

    expect(guess.label).toBe("new feature");
  })

  it.skip('passes with logistic regression', () => {
    const classifier = classifierFactory(new NLP.BayesClassifier());

    const sentence = "make a brand new feature called new epic security";

    console.log(classifier.getClassifications(sentence))
    const guess = classifier.getClassifications(sentence).reduce(toMaxValue);

    expect(guess.label).toBe("new feature");
  })

})