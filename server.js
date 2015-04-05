var express     =    require("express");
var multer      =    require('multer');
var app         =    express();
var done        =    false;
var parser      =    require('./parser');
var path        =    require('path');

var users = []

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
  return filename+Date.now();
},
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));



app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.get('/:filename',function(req,res){

  res.sendfile("results.html");
});

app.get('/api/:filename', function(req, res) {

  parser.parseFile(req.params.filename + '.csv', function(data) {

    res.json(data)
  });
});


app.post('/api/load',function(req,res){


  if(done==true){

    if(req.files) {
      console.log(req.files)

      res.locals.filename = req.files.userFile.name

      res.end(""
      +"<p>File uploaded. \nfile name: " + res.locals.filename + "</p><p>" + 
      "<a href='/" + (res.locals.filename).replace(".csv", "")+"'>click here to generate report</a>");

    }
    res.redirect('/');

  }

});


app.listen(app.get('port'),function(){
  console.log("Working on port 3000");
});