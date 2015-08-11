var login = require("facebook-chat-api");
//------
// This is Ziko thread_id
ziko=100000154047359;
nutsu=1732352289;
projectGroup=346408618882754;

// --------api------------
function bot_send_msg(api,msg,thread_id){
  //response.end('It Works!! Path Hit: ' + request.url);
  api.sendMessage("#" + msg, thread_id);
  console.log(thread_id+ "\tM:"+msg);
}

//------
login({email: process.env.FB_LOGIN_EMAIL, password: process.env.FB_PASSWORD}, function callback (err, api) {
  if(err) return console.error(err);

  api.setOptions({listenEvents: true});
  //bot_send_msg(api,"Yo!",ziko);


  // ---------Web api---------
  //Lets require/import the HTTP module
  var http = require('http');
  var dispatcher = require('httpdispatcher');

  //Lets define a port we want to listen to
  const PORT=8000; 

  //We need a function which handles requests and send response
  function handleRequest(request, response){
    //response.end('It Works!! Path Hit: ' + request.url);

    try {
      //log the request on console
      console.log(request.url);
      //Disptach
      dispatcher.dispatch(request, response);

      parts    = request.url.split('/');
      user   = parts[1];
      msg  = decodeURIComponent(parts[2]);
      if (user=="nutsu")
        bot_send_msg(api,msg,nutsu);
      else if(user=="ziko")
        bot_send_msg(api,msg,ziko);

      else if(user=="thoth")
        bot_send_msg(api,msg,projectGroup);
    } catch(err) {
      console.log(err);
    }
  }
  //A sample GET request    
  dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
  });    

  //A sample POST request
  dispatcher.onPost("/thoth", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data'+req.data);
  });

  //Create a server
  var server = http.createServer(handleRequest);

  //Lets start our server
  server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
  });

});

