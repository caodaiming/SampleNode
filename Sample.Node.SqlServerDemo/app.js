var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = {
    server: 'localhost',
    userName: 'sa',
    password: 'cao',
    options: {
        encrypt: true,
        database:'Vwallet'
    }
}

var connection = new Connection(config);
connection.on('connect', function (err) { 
    execteStatement();
});

function execteStatement()
{
    request = new Request("select * from agents", function (err, rowCount) {
        if (err) {
            console.info(err);
        }
        else {
            console.info(rowCount + " rows");
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.info(column.metadata.colName + ":" + column.value);
        });
    });

    connection.execSql(request);
}