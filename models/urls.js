"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class urls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  urls.init(
    {
      url: DataTypes.STRING,
      title: DataTypes.STRING,
      visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "urls",
    }
  );
  return urls;
};
