const Sequelize = require('sequelize');

const sequelize = new Sequelize('overview', 'postgres', 'password', {
  host: 'overviewpostgres.c7keqqvs0xcu.us-west-1.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl:'Amazon RDS'
  },
  logging: false
});
console.log('sequelize defined:', sequelize);
sequelize.authenticate().then(() => {
  console.log('authenticated');
}).catch((err) => {
  console.log('line 11 consolelog', err);
})

const Game = sequelize.define('game', {
  game_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  game_name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  release_date: { type: Sequelize.STRING },
  developer: { type: Sequelize.STRING },
  publisher: { type: Sequelize.STRING },
  tags: { type: Sequelize.STRING },

});

// Note: using `force: true` will drop the table if it already exists
Game.sync({ force: true }).then(() => {
  console.log(`database overview with table Game created`);
});


//FOR CRUD
const saveGameOverview = (overviewData) => {
  return Game.upsert(overviewData)
    .then(() => {
      console.log(`DB func, save, Successful (: saved game with gameId: ${game.game_id} in database`)
    })
    .catch((err) => {
      console.error(err)
    })

};

const retrieveGameOverview = (id) => {
  console.log('logging at 39')
  return Game.findOne({
    where: {
      game_id:id
    }
  }).then((product) => {
    
    console.log('DB func, retrieve, Successful (: found doc') //should print to server terminal
    return product;
  })
  // .catch((err) => {
  //   console.error(err)
  // })
}
//parameter is an object containing the new overviewData to be upserted
//sequelize upsert function automatically matches it to a row with same primary key
const updateGameOverview = (overviewData) => {
  return Game.upsert(overviewData)
    .then((dataFromUpsertFunc, x, y, z) => {
      console.log(`DB func, update, Successful (: found and updated doc for game ${dataFromUpsertFunc, x, y, z}`)
    }).catch((err) => {
      console.error(err)
    })

};

const deleteGameOverview = (id) => {
  return Game.destroy({
    where: {
      game_id:id
      //^ Can I do this in es6? assumed value for key:value pair? (id: id)
    }
  }).then(() => {
    console.log('DB func delete Successful (: deleted doc') //should print to server terminal
    
  }).catch((err) => {
    console.error(err)
  })
};

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Game,
  saveGameOverview,
  retrieveGameOverview,
  updateGameOverview,
  deleteGameOverview
}
