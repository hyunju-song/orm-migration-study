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
      //res.send(data);
      res.status(200).json(data);
    });
  },

  get_linkId: function (req, res) {
    //console.log(req)
    model.urls
      .findByPk(req.params.id) //findOne을 써도된다. 레퍼런스 코드 참고
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
    if (!isValidUrl(url)) {
      return res.sendStatus(400);
    }
    let maketable = function (err, title) {
      //같은 데이터가 있을 확률도 있으믈 findorcreate 메소드가 더 적절한듯 하다.
      model.urls
        .findOrCreate({
          where: {
            url: url,
          },
          defaults: {
            title: title,
          },
        })
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json(result); // find
          }
          res.status(201).json(result); // Created
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
      // model.urls
      //   .create({
      //     url,
      //     title,
      //     visits: 0,
      //   })
      //   .then((result) => {
      //     //console.log(result)
      //     res.status(201).json(result.dataValues);
      //   })
      //   .catch((err) => {
      //     res.sendStatus(500);
      //   });
    };
    getUrlTitle(url, maketable);
  },
};

/* ㄹㅔ퍼런스코드
const utils = require('../../modules/utils');
const { url: URLModel } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const result = await URLModel.findAll();
    res.status(200).json(result);
  },
  post: (req, res) => {
    const { url } = req.body;

    if (!utils.isValidUrl(url)) {
      return res.sendStatus(400);
    }

    utils.getUrlTitle(url, (err, title) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }

      URLModel
        .findOrCreate({
          where: {
            url: url
          },
          defaults: {
            title: title
          }
        })
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json(result); // find
          }
          res.status(201).json(result); // Created
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
    });
  },
  redirect: (req, res) => {
    URLModel
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if (result) {
          return result.update({
            visits: result.visits + 1
          });
        } else {
          res.sendStatus(204);
        }
      })
      .then(result => {
        res.redirect(result.url);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  }
}
*/
