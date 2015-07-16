var sqldb = require('./SqlDB.js');

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear });
}

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application' });
}

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact' });
}

exports.datatable = function (req, res) {
    
    sqldb.excesql('select * from agents', function (data) {
        
        res.render('datatable', {
            title: 'datatable', userinfos: data//JSON.parse(data)
        });
    });
    
   
}