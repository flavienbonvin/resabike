const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbresabike', 'max', 'pass$1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});


var Role = sequelize.define('role', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
})

var Station = sequelize.define('station', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    posX: Sequelize.INTEGER,
    posY: Sequelize.INTEGER
})
var Zone = sequelize.define('zone', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
})

var Line = sequelize.define('line', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
})

Station.hasMany(Line, { foreignKey: 'idEndStation' })
Station.hasMany(Line, { foreignKey: 'idStartStation' })
Zone.hasMany(Line, { foreignKey: 'idZone' })

var Book = sequelize.define('book', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    pseudo: Sequelize.STRING,
    email: Sequelize.STRING,
    number: Sequelize.INTEGER,
    token: Sequelize.TEXT
});

Station.hasMany(Book, { foreignKey: 'idStartStation' });
Station.hasMany(Book, { foreignKey: 'idEndStation' });


var User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    pseudo: Sequelize.STRING,
    password: Sequelize.TEXT,
    email: Sequelize.STRING,
    changePass: Sequelize.BOOLEAN
})
Zone.hasMany(User, { foreignKey: 'idZone' })
Role.hasMany(User, { foreignKey: 'idRole' })

var LineStation = sequelize.define('linestation', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nbrOnLine: Sequelize.INTEGER
})

Line.hasMany(LineStation, { foreignKey: 'idLine' })
Station.hasMany(LineStation, { foreignKey: 'idStation' })

var Trips = sequelize.define('trips', {
    idTrips: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    startHour: Sequelize.DATE,
})

Line.hasMany(Trips,{foreignKey:'idLine'})
Book.hasMany(Trips,{foreignKey:'idBook'})
Station.hasMany(Trips,{foreignKey:'idStartStation'})
Station.hasMany(Trips,{foreignKey:'idEndStation'})

module.exports = {
    sync: function () {
        return new Promise((resolve, reject) => {
            sequelize.sync({ force: true }).then(() => {
                resolve();
            })
        })
    },
    close: function () {
        sequelize.close();
    },
    Role,
    Station,
    Zone,
    Line,
    Book,
    User,
    LineStation
}