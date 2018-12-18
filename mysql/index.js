var mysql = require('mysql');

var pool = mysql.createPool({
    user:'root',
    password:'root',
    database:'1609A-zk3',
    port:3306,
    host:'localhost',
    connectionLimit:100
})
/**
 * 连接数据库，进行sql查询
 * 
*/
module.exports = function(sql,query,fn){
    fn = fn ? fn : query;
    
    query = query || [];

    pool.getConnection(function(error,con){
        if(error){
            fn(error);
        }else{
            con.query(sql,query,function(err,results){
                con.release();
                queryCallback(err,results);
            })
        }
    })

    function queryCallback(err,results){
        if(err){
            fn(err);
        }else{
            fn(null,results);
        }
    }
}