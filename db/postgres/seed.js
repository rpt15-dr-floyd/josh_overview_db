const {Game} = require('./index.js');

const faker = require('faker');
// console.log(OverviewModel);


//with each iteration of i, push 1000 overview entries (iterated by j)
//after 10000 iterations of i, 10,000,000 entries will be made (10000*1000)
const seedOverview = function (batchOfDocs) {
  if (batchOfDocs < 10000) {
    // console.log(i);
    var docsArr = [];
    for (let j = 0; j < 1000; j++) {
      // console.log(j);
      docsArr.push({
        // game_id: j,
        game_name: faker.random.word().slice(0, 250),
        description: faker.lorem.paragraph().slice(0, 250),
        release_date: faker.date.past().toISOString().slice(0, 250),
        developer: faker.company.companyName().slice(0, 250),
        publisher: faker.company.companyName().slice(0, 250),
        tags: faker.random.word().slice(0, 250)
      });
    }
    Game.bulkCreate(docsArr).then(function () {
      batchOfDocs++;
      //recursive call
      seedOverview(batchOfDocs);
      console.log('bulk of overview db accesse at batchOfDocs:', batchOfDocs );
    }).catch(function (err) {
      console.error(err);
    })
  }
  

}
seedOverview(0);