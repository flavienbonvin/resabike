var Role = require('../objects/Role');

const connection = require('../modules/conn').getConnection();
connection.connect();

var RoleDB = module.exports = {
    /**
     * Permet d'ajouter un role à la base de données
     * @param {Role} role
     * @return {Promise<Role>}
     */
    add(role) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO `role`(`name`) VALUES (?)',
                [role.name],
                function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    }
                    role.id = results.insertId
                    resolve(role);
                }
            );
        })
    },
    /**
     * Permet d'ajouter plusieurs roles
     * @param {Role[]} roles 
     * @return {Promise<Role[]>}
     */
    addMultiple(role) {
        return new Promise((resolve, reject) => {
            var tab = []
            for (var i = 0; i < role.length; i++){
                tab.push(RoleDB.add(role[i]));
            }
            Promise.all(tab).then((res) =>{
                resolve(res);
            })
        })
    },
    /**
     * Permet de supprimer un role de la base de données
     * @param {Number} id 
     */
    delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM role WHERE id = ?', [id], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            })
        })
    },
    /**
     * Permet de lister tous les éléments présents dans la base de données
     * @return {Promise<Role[]>}
     */
    getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM role', [], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                var res = [];
                for (var i = 0; i < results.length; i++) {
                    var current = results[i];
                    var temp = new Role(current.id, current.name);
                    res.push(temp);
                }
                resolve(res);
            })
        });
    },
    /**
     * Permet d'obtenir un élément unique de la base de données
     * @param {Number} id 
     */
    get(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role WHERE id=?", [id], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                var current = results[0];
                var temp = new Role(current.id, current.name);
                resolve(temp);
            })
        })
    },
    /**
     * Permet de clore la liaison avec la base de données
     */
    close() {
        connection.end();
    }
}