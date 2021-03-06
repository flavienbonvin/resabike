var database = require('../database');

module.exports = {

    /**
     * Get all the book for a given line
     * 
     * @param {Object} body 
     */
    getBooking(body) {
        return new Promise((resolve, reject) => {
            var date = new Date();

            database.Trailer.findAll({
                where : {
                    idLine: body.lineDropdown
                },
                include : [
                    {
                        model: database.Line,
                        include : [
                            {
                                model: database.Station,
                                as: 'startStation'
                            },
                            {
                                model: database.Station,
                                as: 'endStation'
                            }
                        ]
                    }
                ]
            }).then((trailers) => {
                trailers = JSON.parse(JSON.stringify(trailers));
                
                for(var i = 0;i<trailers.length;i++){
                    var datetimeTemp = new Date(trailers[i].startHour).toLocaleString().split(' ');
                    var date = datetimeTemp[0].split('-');
                    date = date[2]+'.'+date[1]+'.'+date[0];
                    var time = datetimeTemp[1].split(':');
                    time = time[0]+':'+time[1];
                    
                    trailers[i].startHour = date+' '+time;
                    
                }
                
                resolve(trailers)
            })
        })
    },

    /**
     * Find the detail of a given Trailer
     * 
     * @param {Object} body 
     */
    getDetailsBooking(body){
        return new Promise((resolve,reject) => {
            database.Trailer.findOne({
                where : {
                    id : body.id
                }
            }).then((trailer) => {
                database.Trips.findAll({
                    where: {
                        idLine : trailer.idLine,
                        lineStartHour : trailer.startHour
                    },
                    include : [
                        {
                            model : database.Book
                        }, {
                            model : database.Station,
                            as : 'startStationTrip'
                        },{
                            model : database.Station,
                            as : 'endStationTrip'
                        }
                    ]
                }).then((list) => {
                    list = JSON.parse(JSON.stringify(list));
                    for(var i = 0 ;i<list.length;i++){
                        var datetimeTemp = new Date(list[i].startHour).toLocaleString().split(' ');
                        var date = datetimeTemp[0].split('-');
                        date = date[2]+'.'+date[1]+'.'+date[0];
                        var time = datetimeTemp[1].split(':');
                        time = time[0]+':'+time[1];
                        list[i].startHour = date+' '+time;
                    }
                    resolve(list);
                })
            })
        })
    }
}