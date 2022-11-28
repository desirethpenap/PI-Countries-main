//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require ('axios')

async function createDB (Country) {
  const apiUrl = await axios.get('https://restcountries.com/v3/all');
  const apiInfo = await apiUrl.data.map(c => {
      return {
          name: c.name.common,
          FlagImg: c.flags[1],
          Continent: c.continents != null ? c.continents[0]: "data null",
          Capital: c.capital != null ? c.capital[0]: "data null",
          Subregion: c.subregion != null ? c.subregion[0]: "data null",
          Area: c.area,
          Population: c.population,
          id : c.cca3,
      };
  }); await Country.bulkCreate(apiInfo, {
      ignoreDuplicates: true,
  });
  
};



// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    await createDB(Country)
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
