module.exports = function (app, db) {
    app.post('/geo', (req, res) => {
        res.send("haha");
        console.log(req.body);

        let lat = req.body.lat;
        let lng = req.body.lng;
        let times = req.body.times;
        let dir = req.body.directory;
        
        const request = require('request');
        const fs = require('fs');

        let download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
        
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        download('https://maps.googleapis.com/maps/api/streetview?size=400x300&location=' +
            lat + ',' + lng +
            '&fov=90&heading=90&zoom=1&pitch=0&key=AIzaSyBCNskTKxgdbmwCh4BpVH0oo5-Xqt87MvY',
            dir + '/' + times + '_' + lat + '_' + lng + '.png',
            function () {
                console.log('done');
            });
    });
};