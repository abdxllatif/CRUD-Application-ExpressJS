var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//users table
users=[];

//show users
app.get("/utilisateurs",function(req,res){
  res.render("index",{users:users});
});

//add user function
app.post("/add",function(req,res){
  users.push({id:req.body.id,name:req.body.name,pw:req.body.pw});
  res.redirect("/utilisateurs");
});

//modify user function
app.post("/modify",function(req,res){
  var name=req.body.name;
  var pw=req.body.pw;
  console.log(req.body)
  users.forEach(function(user) {
    user.name=name;
    user.pw=pw;    
  });
  res.redirect("/utilisateurs");
});

//delete user function
app.get("/delete/:id",function(req,res){
  var id=req.params.id;
  console.log(id);
  users=users.filter(function(user){
    return (user.id != id);
  });
  res.redirect("/utilisateurs");
});


//add user route
app.get("/utilisateur/add_utilisateur",function(req,res){
  res.render("ajout");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,()=>{
  console.log("server ON");
})

module.exports = app;
