import nlp from 'nlp_compromise';

describe('exploring nlp-compromise', () => {
  it.skip('works', () => {
    const sentence = nlp.sentence('create a new feature security and authorisation');
    
    const tags = sentence.tags();
    const root = sentence.normal();

    // console.log(sentence);

    const matches = sentence.text().match('[infinitive]? [determiner]? [adjective]? (feature|epic) *');

    // console.log(matches);
    // console.log(matches[0]);

    expect(true).toEqual(true);
  })
})