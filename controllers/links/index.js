const model = require("../../models");
const { getUrlTitle, isValidUrl } = require("../../modules/utils");

module.exports = {
  get: function (req, res) {
    //console.log(model.urls.findAll())
    //table이름.findAll = mysql에서 select 쿼리문과 동일한 기능
    model.urls.findAll().then((results) => {
      //console.log(results)
      const data = results.map((result) => {
        //console.log(result.dataValues)
        return result.dataValues;
      });
      res.send(data);
    });
  },

  get_linkId: function (req, res) {
    //console.log(req)
    model.urls
      .findByPk(req.params.id)
      .then((result) => {
        //console.log(result.dataValues.visits+1)
        ///console.log(req.params.id)
        model.urls.update(
          {
            visits: result.dataValues.visits + 1,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        return result;
      })
      .then((result) => {
        //res.status(302).send(result.dataValues.url).redirect(result.dataValues.url)
        //리 다이렉트***
        res.redirect(302, result.dataValues.url);
      });
  },

  post: function (req, res) {
    //console.log(req)
    let url = req.body.url;
    let maketable = function (err, title) {
      model.urls
        .create({
          url,
          title,
          visits: 0,
        })
        .then((result) => {
          //console.log(result)
          res.status(201).send(result.dataValues);
        });
    };
    getUrlTitle(url, maketable);
  },
};
