const coreModel = require('./../core/models');

module.exports = (sequelize, DataTypes) => {
   const TerminateConfig = sequelize.define(
     "terminateconfig",
     {

        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        message: DataTypes.STRING,
        counter: DataTypes.INTEGER,
        
     },
     {
       timestamps: false,
       freezeTableName: true,
       tableName: "terminateconfig",
     }
   );

   coreModel.call(this, TerminateConfig);

   TerminateConfig._preCreateProcessing = function (data) {

     return data;
   };
   TerminateConfig._postCreateProcessing = function (data) {

     return data;
   };

  TerminateConfig.associate = function (models) {};

  TerminateConfig.allowFields = function () {
    return ["id", "message", "counter"];
  };

  TerminateConfig.labels = function () {
    return ["ID", "Message", "Counter"];
  };

  TerminateConfig.validationRules = function () {
    return [
        ["id", "ID", ""],
        ["message", "Message", "required"],
        ["counter", "Counter", "required"]
    ];
  };

  TerminateConfig.validationEditRules = function () {
    return [
        ["id", "ID", ""],
        ["message", "Message", "required"],
        ["counter", "Counter", "required"]
    ];
  };

  TerminateConfig.getMessage = async() => {
    const message = await TerminateConfig.findByPk(1)



    return message.dataValues
  }


  TerminateConfig.updatee = async (data) => {

    try {
        const repon = await TerminateConfig.update(
          {message: data.message, counter: data.counter},
          { where: { id: 1 } }
        )
      
      } catch (err) {
        console.log('something went wrong', err)
      }
  };


   return TerminateConfig;
 };