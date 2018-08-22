
const mysql = require('mysql');
const express = require('express');
var path    = require("path");
var app = express();
const bodyparser = require('body-parser');
var port = 3001;
app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cainsa',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(port, () => console.log('Express server is runnig at port no : '+port));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //res.sendFile(path.join(__dirname+'/reporte.html'));
    app.use(express.static(path.join(__dirname, "/")))
   // __dirname : It will resolve to your project folder
});
  



//lista de todos los materiales
app.get('/materiales', (req, res) => {
    mysqlConnection.query('SELECT codigoMaterial as id, nombre as text FROM materiales', (err, rows, fields) => {
        if (!err){
            res.send(rows);
         } else{
            console.log(err);
        }
    })
});


//lista los consumos 
app.get('/used', (req, res) => {
    mysqlConnection.query('SELECT id, fecha, cantidad, nombre FROM consumos', (err, rows, fields) => {
        //console.log(rows);
        if (!err){
            res.send(rows);
         } else{
            console.log(err);
        }
    })
});

/*
//Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM material WHERE  = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
 */
//elimina un material
app.delete('/elimina/:id', (req, res) => {
    var idMaterial = req.params.id[1];
    mysqlConnection.query('DELETE FROM uso WHERE id = ?', [idMaterial], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
    
});

//Inserta un uso de material
app.get('/inserta', (req, res) => {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var arrId = "";
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    hoy = yyyy+'/'+mm+'/'+dd;
    var valores ='"' + hoy + '" , ' + req.query["cantidad"] + ' , ' + req.query["material"] + ');'
    var sql = "INSERT INTO `cainsa`.`uso` ( `fecha`, `cantidad`, `codigoMaterial`) VALUES ( " + valores
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
     
});



///////////////////////////////////////////////////////////////////////////////////////
//reportes
//elimina un material

app.get('/reporteTotal', (req, res) => {
    var from = req.query["desde"];
    var to = req.query["hasta"];
    var dateDesde = ""
    var dateHasta = ""

    
    dateDesde = FormateaFecha(from);
    dateHasta = FormateaFecha(to);
    


    var reportQuery = 'SELECT u.fecha, m.nombre, sum(u.cantidad) as cantidad \
                       FROM uso u INNER JOIN materiales m on m.codigoMaterial = u.codigoMaterial \
                       WHERE u.fecha BETWEEN "' + dateDesde + '" AND "' + dateHasta + '" \
                       GROUP BY u.codigoMaterial '
    //console.log(reportQuery)
    mysqlConnection.query(reportQuery, (err, rows, fields) => {
        if (!err){
            res.send(rows);
         } else{
            console.log(err);
        }
    })
    
});

app.get('/reportesDetalle', (req, res) => {
    var from = req.query["desde"];
    var to = req.query["hasta"];
    var dateDesde = ""
    var dateHasta = ""

    
    dateDesde = FormateaFecha(from);
    dateHasta = FormateaFecha(to);
    


    var reportQuery = 'SELECT u.fecha, m.nombre, u.cantidad as cantidad \
                       FROM uso u INNER JOIN materiales m on m.codigoMaterial = u.codigoMaterial \
                       WHERE u.fecha BETWEEN "' + dateDesde + '" AND "' + dateHasta + '" '
    //console.log(reportQuery)
    mysqlConnection.query(reportQuery, (err, rows, fields) => {
        if (!err){
            res.send(rows);
         } else{
            console.log(err);
        }
    })
    
});




//FUNCIONES////////////////////////////////////////////////////////////////////////////
function FormateaFecha(fecha){
    var dateGringo = ""
    var txtdia = "";
    var txtMes = "";
    var txtAño = "";

     txtMes = fecha.substring(0, 2); 
     txtdia = fecha.substring(3,5);
     txtAño = fecha.substring(6,10);
     dateGringo = txtAño + '/' + txtMes + '/' + txtdia
     return dateGringo;
}
function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
    }
