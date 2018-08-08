var weather = require('openweather-apis');


weather.setLang('it');
    // English - en, Russian - ru, Italian - it, Spanish - es (or sp),
    // Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
    // Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
    // Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
    // Turkish - tr, Croatian - hr, Catalan - ca
 
	

// 'metric'  'internal'  'imperial'
weather.setUnits('metric');

// check http://openweathermap.org/appid#get for get the APPID
weather.setAPPID("fb732494742712a14bbfcb6123d20925");




var methods = {}
methods.wahid  = function(value,callback){
    weather.setCity(value);

    weather.getAllWeather(function(err, JSONObj){
      console.log(JSONObj);
    //   return  JSONObj;
      callback(JSONObj)
    //   console.log(JSONObj)
    });

    
};

module.exports = methods;