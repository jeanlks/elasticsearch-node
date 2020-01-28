'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
//   // Let's start by indexing some data
//   await client.index({
//     index: 'game-of-thrones',
//     // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//     body: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.'
//     }
//   })


//   // here we are forcing an index refresh, otherwise we will not
//   // get any result in the consequent search
//   await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'bank',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match_all: {  }
      }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)