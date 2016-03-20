'use strict';

module.exports = function(sequelize, DataTypes) {

	var Sensor = sequelize.define('Sensor', {
			name: 		DataTypes.STRING,
			macAddress:	DataTypes.STRING(24),
			logicalId:	DataTypes.STRING(9),
			lat:		DataTypes.FLOAT,
			lon:		DataTypes.FLOAT,
			GatewayId:	DataTypes.INTEGER			
		},
		{
			associate: function(models){
				Sensor.belongsTo(models.Gateway);
			}
		}
	);

	return Sensor;
};
