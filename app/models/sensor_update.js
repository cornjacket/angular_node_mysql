'use strict';

module.exports = function(sequelize, DataTypes) {

	//var SensorUpdate = sequelize.define('sensorData', {
	var SensorUpdate = sequelize.define('SensorUpdate', {
			data:  DataTypes.STRING, //TEXT
			SensorId: DataTypes.INTEGER
		}/*,
		{
			associate: function(models){
				SensorUpdate.belongsTo(models.User);
			}
		}*/
	);

	return SensorUpdate;
};
