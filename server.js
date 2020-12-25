const express = require('express');
const { db } = require('./db')

const app = express();
const port = 8080;

// const topics = db.topics.find({})
// const topic = db.topics.findOne({_id:id})

// const faqs = db.faqs.findOne({_id:topicId})

app.get('/topics',(req,res) => {
  const id = req.query.id
  if(id){
    const topic = db.topics.findOne({_id:id})
    return res.json({...topic})
  }
  const topics = db.topics.find({})
  res.json(topics)
})

app.get("topics/:id", (req,res) => {
  const id = req.params.id
  const topic = db.topics.findOne({_id:id})
  return res.json({...topic})
})

app.get('topics/:id/faqs', (req,res) => {
  const id = req.params.id
  const topic = db.topics.findOne({_id,id})
  const filterFaqs = db.faqs.find({topicId:id})

  return res.json({
    topic,
    faqs:filterFaqs
  })
})

app.get("/topics/:topicId/faqs/:faqId",(req,res) => {
  const faqId = req.params.faqId
  const topicId = req.params.topicId
  const topic = db.topics.findOne({_id:topicId})
  const faq = db.faqs.findOne({_id:faqId})
  return res.json({
    faq:{
      ...faq,
      topic
    },
  })
})

app.get("/faqs",(req,res) => {
  const topicId = req.params.topicId
  if(topicId){
    const filterFaqs = db.faqs.find({topicId})
    return res.json(filterFaqs)
  }
  const faqs = db.faqs.find({})
  res.json(faqs)
})

app.get('faqs/:id',(req,res) => {
  const id = req.params.id
  const extend = req.query.extend
  const faq = db.faqs.findOne({_id:id})
  if(extend){
    if(extend === 'topics' && faq.topicId){
      faq.topic = db.topics.findOne({_id:faq.topicId})
    }
  }
  return res.json({...faq})
})

// const topics = [
//   {
//     id:"1",
//     title:'Topics 1',
//     description:'Topics description 1'
//   },
//   {
//     id:"2",
//     title:'Topics 2',
//     description:'Topics description 2'
//   },
//   {
//     id:"3",
//     title:'Topics 3',
//     description:'Topics description 3'
//   },
// ]

// const faqs = [
//   {
//     id:'1',
//     topicId:'1',
//     question:'FAQ quertion 1 - beautiful',
//     answer:'FAQ answer 1'
//   },
//   {
//     id:'2',
//     topicId:'2',
//     question:'FAQ quertion 2 - Beautiful',
//     answer:'FAQ answer 2 - Beautiful'
//   },
//   {
//     id:'3',
//     topicId:'3',
//     question:'FAQ quertion 3',
//     answer:'FAQ answer 3 -'
//   },
//   {
//     id:'4',
//     topicId:'4',
//     question:'FAQ quertion 4',
//     answer:'FAQ answer 4 -'
//   },
//   {
//     id:'5',
//     topicId:'5',
//     question:'FAQ quertion 5',
//     answer:'FAQ answer 5 -'
//   },
//   {
//     id:'6',
//     topicId:'6',
//     question:'FAQ quertion 6',
//     answer:'FAQ answer 6 -'
//   },
//   {
//     id:'7',
//     topicId:'7',
//     question:'FAQ quertion 7',
//     answer:'FAQ answer 7 -'
//   },
//   {
//     id:'8',
//     topicId:'8',
//     question:'FAQ quertion 8',
//     answer:'FAQ answer 8 -'
//   },
//   {
//     id:'9',
//     topicId:'9',
//     question:'FAQ quertion 9',
//     answer:'FAQ answer 9'
//   },
//   {
//     id:'10',
//     topicId:'10',
//     question:'FAQ quertion 10',
//     answer:'FAQ answer 10 -'
//   },
//   {
//     id:'11',
//     topicId:'11',
//     question:'FAQ quertion 11',
//     answer:'FAQ answer 11 -'
//   },
//   {
//     id:'12',
//     topicId:'12',
//     question:'FAQ quertion 12',
//     answer:'FAQ answer 12 -'
//   },
//   {
//     id:'13',
//     topicId:'13',
//     question:'FAQ quertion 13',
//     answer:'FAQ answer 13 -'
//   },
// ]


// Add a route for the root URL - i.e, `/`
app.get('/', (req, res) => {
  // Send a string - Hello World!
  res.send('Hello World is change!');
});

/** 传参 */
// app.get('/topics/:id',(req,res)=>{
//   // const id = req.query.id;
//   const id = req.params.id
//   console.log(id)
//   if(id){
//     const topic = topics.find(item => item.id === id)
//     return res.json({...topic})
//   }
//   res.json(topics)
// })

// /** 排序 */
// app.get('/topics',(req,res)=>{
//   const id = req.query.id
//   const sort = req.query.sort
//   let results = topics
  
//   if(sort){
//     const sortKey = sort.replace("-","")
//     if("title|description".includes(sortKey)){
//       if(sort.includes("-")){
//         results.sort((a,b)=> a[sortKey]-b[sortKey])
//         // results.sort((a,b)=> sortFn(a[sortKey],b[sortKey]))
//       }else{
//         results.sort((a,b) => b[sortKey]-a[sortKey])
//         // results.sort((a,b) => sortFn(b[sortKey],a[sortKey]))
//       }
//     }
//   }
//   return res.json(results)
// })
// /**排序方法 */
// const sortFn=(a,b)=>{
//   if (a > b) {return -1;}
//   if (b > a) {return 1;}
//   return 0;
// }

// /** 嵌套资源 */
// app.get('/topics/faqs/:id',(req,res)=>{
//   const id = req.params.id
//   const topic = topics.find( item => item.id === id)
//   const filterFaqs = faqs.filter( faq => faq.topicId === id)

//   return res.json({
//     topic,
//     faqs:filterFaqs
//   })

// })


/** 传参 */
// app.get('/faqs/:id',(req,res) => {
//   const id = req.params.id
//   if(id){
//     const faq = faqs.find(item => item.id === id)
//     return res.json({...faq})
//   }
//   res.json(fags)
// })

/** 过滤 */
// app.get('/faqs',(req,res)=>{
//   const topicId = req.query.topicId

//   if(topicId){
//     const filterFaqs = faqs.filter( item => item.topicId === topicId)
//     return res.json(filterFaqs)
//   }
//   res.json(faqs)
// })

// /** 搜索 */
// app.get('/faqs',(req,res)=>{
//   let results
//   const topicId = req.query.topicId;
//   const search = req.query.search;
//   console.log(search)
//   if(search){  
//     const searchTerm = search.toLowerCase();
//     const searchedFaqs = faqs.filter( faq => {
//       const question = faq.question.toLowerCase();
//       const answer = faq.answer.toLowerCase();
//       return `${question}${answer}`.includes(searchTerm)
//     })
//     results = searchedFaqs
//   }
//   if(topicId){
//     const filteredFaqs = faqs.filter(faq => {
//       return faq.topicId === topicId
//     })
//     results = filteredFaqs
//   }
//  res.json(results)
// })

// /** 扩展资源 */
// app.get('/faqs/:id',(req,res) => {
//   const id = req.params.id;
//   const extend = req.query.extend;
//   const faq = faqs.find( item => item.id === id)

//   if(extend){
//     if(extend === 'topics' && faq.topicId ){
//       faq.topic === topics.find(item => item.id === faq.topicId)
//     }
//   }
//   return res.json({...faq})
// })


// /** 嵌套与扩展 */
// app.get('/topics/:topicId/faqs/:faqId',(req,res) => {
//   const faqId = req.params.faqId;
//   const topicId = req.params.topicId;

//   const topic = topics.find( item => item.id === topicId)
//   const faq = faqs.find(item => item.id === faqId)

//   return res.json({
//     faq:{
//       ...faq,
//       topic
//     }
//   })
// })

/** 分页 */
// app.use('/faqs',(req,res)=>{
//   let result = faqs
//   const topicId = req.query.topicId
//   const search = req.query.search

//   // if(search){
//   //   const searchTrem = search.toLowerCase();
//   //   const searchedFaqs = result.filter( item => {
//   //     const question = item.question.toLowerCase()
//   //     const answer = item.answer.toLowerCase()

//   //     return `${question}${answer}`.includes(searchTrem)
//   //   })
//   //   result = searchedFaqs
//   // }

//   // if(topicId){
//   //   const filterFaqs = result.filter( item => {
//   //     return item.topicId = topicId
//   //   })

//   //   result = filterFaqs
//   // }

//   const limit = parseInt(req.query.limit,10) || 0 
//   const offset = parseInt(req.query.offset,10) || 0

//   console.log("limit:"+limit,"offset:"+offset)

//   if(limit){
//     result = result.slice(offset,limit+offset)
//   }
  
//   res.json(result)
// })


/** 选择显示数据 */
// app.use('/topics',(req,res) => {
//   const select = req.query.select
//   let results = topics
//   if(select){
//     const arr = select.split(",")
//     let newArr = []
//     topics.map(topic => {   //map --- 异步（不能确定谁先执行完）
//       let obj = {}
//       arr.map(item => {
//         obj[item] = topic[item]
//       })
//       newArr.push(obj)
//       console.log(obj)
//     })
//     results = newArr
//     console.log(results)
//   }
//   res.json(results)
// })



// Server will listen to port - 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});