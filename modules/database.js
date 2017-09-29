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
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idStartStation: {
        type: Sequelize.INTEGER,
        references: {
            model: Station,
            key: 'id',
        }
    },
    idEndStation: {
        type: Sequelize.INTEGER,
        references: {
            model: Station,
            key: 'id',
        }
    },
    idZone: {
        type: Sequelize.INTEGER,
        references: {
            model: Zone,
            key: 'id',
        }
    }
})


var Book = sequelize.define('book', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    pseudo: Sequelize.STRING,
    email: Sequelize.STRING,
    number: Sequelize.INTEGER,
    startHour: Sequelize.DATE,
    token: Sequelize.TEXT,
    idLine: {
        type: Sequelize.INTEGER,
        references: {
            model: Line,
            key: 'id',
        }
    },
    idStartStation: {
        type: Sequelize.INTEGER,
        references: {
            model: Station,
            key: 'id',
        }
    },
    idEndStation: {
        type: Sequelize.INTEGER,
        references: {
            model: Station,
            key: 'id',
        }
    }
});



var User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    pseudo: Sequelize.STRING,
    password: Sequelize.TEXT,
    email: Sequelize.STRING,
    changePass: Sequelize.BOOLEAN,
    idZone: {
        type: Sequelize.INTEGER,
        references: {
            model: Zone,
            key: 'id',
        }
    },
    idRole: {
        type: Sequelize.INTEGER,
        references: {
            model: Role,
            key: 'id',
        }
    }
})

Line.belongsToMany(Station,{through: 'LineStation'});
Station.belongsToMany(Line,{through: 'LineStation'});


module.exports = {
    sync : function(){
        sequelize.sync({ force: true }).then(() => {
            resolve();
        })
    },
    close : function(){
        sequelize.close();
    },
    Role,
    Station,
    Zone,
    Line,
    Book,
    User
}

