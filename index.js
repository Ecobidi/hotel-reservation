let express = require('express')
let expressSession = require('express-session')
let fileupload = require('express-fileupload')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')

let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

// routes
const routes = require('./routes')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qmunc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected to database: ' + process.env.DB_NAME)
} catch (error) {
  console.log('Error connecting to database: ' + process.env.DB_NAME)
  console.log(error)
}

let DBCounterModel = require('./models/db_counter')

DBCounterModel.insertMany([{key: "rooms_id"}, {key: "users_id"}, {key: "reservations_id"}, {key: "guests_id"}, {key: "check_ins_id"}])

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
}))
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

// app.get('/logout', (req, res) => {
//   req.session.loggedIn = false
//   req.session.username = ''
//   res.redirect('/login')
// })

// let getDashboard = async (req, res) => {
//   try {
//     let airports_count = await AirportModel.count()
//     let customers_count = await CustomerModel.count()
//     let flights_count = await FlightModel.count()
//     let tickets_count = await TicketModel.count()
//     let users_count = await UserModel.count()
//     res.render('dashboard', {airports_count, flights_count, tickets_count, users_count})
//   } catch (err) {
//     console.log(err)
//     res.render('dashboard', {
//       flights_count: 0,
//       airports_count: 0, tickets_count: 0, users_count: 0,
//     })
//   }
// }

app.use('/', routes)

app.listen(process.env.PORT, () => { console.log(`${APPNAME} running on port ${process.env.PORT}`) })