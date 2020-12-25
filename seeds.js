const faker = require('faker')
const {db} = require('./db')

const createTopics = n => {
  const topics = Array(n)
    .fill({})
    .map(()=>({
      title:faker.lorem.sentence(),
      des:faker.lorem.paragraphs()
    }))
    db.topics.save(topics)
}

const pickRandomId = (ids=[]) => {
  return ids[Math.floor(Math.random() * ids.length)]
}

const createFaqs = (n,topicsIds) => {
  const faqs = Array(n)
  .fill({})
  .map(() => ({
    title:faker.lorem.sentence(),
    des:faker.lorem.paragraphs(),
    topicId:pickRandomId(topicsIds)
  }))
  db.faqs.save(faqs)
}

const startSeeding = (n=10) => {
  //clear seed data
  db.topics.remove({})
  db.faqs.remove({})

  //create 'n' number of data 
  createTopics(n);
  const topicIds = db.topics.find({}).map(( {_id}) => _id)
  createFaqs(n,topicIds)
}

startSeeding()
