module.exports = function specialrouts(app, db) {
    app.get('/measurement', function(req, res) {
        db.query(
            'SELECT * FROM measurement ORDER BY unix_timestamp DESC LIMIT 5;',
            function(err, results, fields) {
                console.log(err);
                console.log(results);
                res.json(results)
            }
        );
      });

      app.post('/measurement/add', function (request, response) {

        var temperature = request.body.temperature;
        var unit_id = request.body.unit_id;
  
        if (unit_id != undefined && temperature >= -3 && temperature <= 3) {
          db.query("INSERT INTO measurement (unit_id, temperature) VALUES (" + "'" + unit_id + "'" + "," + temperature +")").run();
          response.send("1");
        } else {
          response.send("0");
        }
      });

}