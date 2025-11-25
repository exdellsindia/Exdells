const { Sequelize } = require('sequelize')
const path = require('path')

const databaseUrl = process.env.DATABASE_URL
let sequelize
if (databaseUrl) {
	sequelize = new Sequelize(databaseUrl, { dialect: 'postgres', logging: false })
} else {
	// fallback to a file-based sqlite DB for local development so data persists between restarts
	const storagePath = path.join(__dirname, '../../backend_dev.sqlite')
	sequelize = new Sequelize({ dialect: 'sqlite', storage: storagePath, logging: false })
	console.log('No DATABASE_URL set — using file sqlite at', storagePath)
}

module.exports = sequelize
