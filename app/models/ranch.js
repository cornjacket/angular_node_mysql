'use strict';

module.exports = function(sequelize, DataTypes) {

	var Ranch = sequelize.define('Ranch', {
			name: DataTypes.STRING,
			lat: DataTypes.FLOAT, // later this can be an array of FLOATs enclosing the Ranch
			lon: DataTypes.FLOAT // later this can be an array of FLOATs enclosing the Ranch
		},
		{
			associate: function(models){
				Ranch.belongsTo(models.User);
			}
		}
	);

	return Ranch;
};
