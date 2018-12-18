var express = require('express');
var router = express.Router();

var query = require('../mysql');

/* GET home page. */
router.get('/api/get/train_tickets', function(req, res, next) {
  var date = req.query.date;

  if(!date){
    res.json({code:3,msg:"时间没有"})
  }else{
    query('select * from list where date_format(timer,"%Y-%m-%d")=?',[date],function(error,results){
      if(error){
        res.json({code:0,msg:error});
      }else{
        res.json({code:1,data:results});
      }
    })
  }
});

module.exports = router;
