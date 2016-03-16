'use strict';

module.exports = function(sequelize, DataTypes) {

	//var SensorUpdate = sequelize.define('sensorData', {
	var SensorUpdate = sequelize.define('SensorUpdate', {
			nodeId: DataTypes.STRING,
			data:  DataTypes.STRING //TEXT
		}/*,
		{
			associate: function(models){
				SensorUpdate.belongsTo(models.User);
			}
		}*/
	);

	return SensorUpdate;
};
