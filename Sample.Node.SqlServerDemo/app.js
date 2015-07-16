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

var connection = new Connection(config);
connection.on('connect', function (err) {
    execteStatement();
});

function rowToObject(row) {
    var o = row.reduce(function (obj, cell) {
        obj[cell.metadata.colName] = cell.value
        return obj
    }, {})
    return o
}

function execteStatement() {
    request = new Request("select * from agents", function (err, rowCount) {
        if (err) {
            console.info(err);
        }
        else {
            console.info(rowCount + " rows");
        }

        connection.close();
    });
    
    request.on('row', function (columns) {
        //columns.forEach(function (column) {
        //    console.info(column.metadata.colName + ":" + column.value);
        //});
        
        var data = rowToObject(columns);
        
        console.info(JSON.stringify(data));
    });
    
    
    
    connection.execSql(request);
}