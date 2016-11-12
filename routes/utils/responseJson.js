module.exports = function(res,message){
  return function(err, json) {
    if(err){
      res.json({status:0,message:err.message});
    }else if(message){
      res.json({status:1,message:message});
    }
    else{
      res.json({status:1,json:json});
    }
  }
}