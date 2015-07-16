var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = {
    server: 'localhost',
    userName: 'sa',
    password: 'cao',
    options: {
        encrypt: true,
        database: 'Vwallet'
    }
}

exports.excesql = function (sqlstring, callback) {
    
    var connection = new Connection(config);
    
    connection.on('connect', function (err) {
        
        request = new Request(sqlstring, function (err, rowCount) {
            if (err) {
                console.info(err);
                callback(null);
            }
            else {
                console.info(rowCount + " rows");
                callback(RS);
            }
            
            connection.close();
        });
        
        var RS = [];
        request.on('row', function (columns) {
            var row = {};
            columns.forEach(function (column) {
                if (column.isNull) {
                    row[column.metadata.colName] = null;
                } else {
                    row[column.metadata.colName] = column.value;
                }
            });
            RS.push(row);
        });
        
        connection.execSql(request);
        
    });

}

