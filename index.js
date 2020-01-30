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


  const { body: gte_lte } = await client.search({
    index: 'bank',
    body: {
      query: {
          bool: {
            must : { match_all : {}},
            filter : {
                range: {
                    age : { 
                        gte : 35,
                        lte : 37
                    }
                }
            }
          }
              },
      sort: {"account_number": "asc"}
    }
  })

  console.log(gte_lte.hits.hits);

  const { body: accounts_indiana } = await client.search({
    index: 'bank',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { state: "IN"  }
      },
      sort: {"account_number": "asc"}
    }
  })

  console.log(accounts_indiana.hits.hits)
}

//run().catch(console.log)

async function insertName(req, res) { 
    await client.index({
    index: 'customers',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      name: req.query.name
    }
  });
  await client.indices.refresh({ index: 'customers' });
  res.send("inserted");
}

async function getNames(req, res) { 
  const { body: customers } = await client.search({
    index: 'customers',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match_all: {  }
      }
    }
  })
  var result = [];
  var hits = await customers.hits.hits;
  for await (var hit of hits) { 
    result.push( hit._source.name);
  }
  res.send(result);
}

function hello(req, res) { 
  res.send("hello");
}

module.exports.insertName = insertName
module.exports.getNames = getNames
module.exports.hello = hello