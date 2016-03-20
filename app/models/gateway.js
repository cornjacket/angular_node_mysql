'use strict';

module.exports = function(sequelize, DataTypes) {

	var Gateway = sequelize.define('Gateway', {
			name: DataTypes.STRING,
			lat: DataTypes.FLOAT,
			lon: DataTypes.FLOAT,
			RanchId: DataTypes.INTEGER,
			logicalId: DataTypes.STRING,
			ipAddress: DataTypes.STRING(15)
		},
		{
			associate: function(models){
				Gateway.belongsTo(models.Ranch);
			}
		}
	);

	return Gateway;
};
