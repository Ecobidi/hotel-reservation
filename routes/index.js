const adminRouter = require('express').Router()

const RoomRouter = require('./room')
const GuestRouter = require('./guest')
const CheckInRouter = require('./checkin')
const CheckOutRouter = require('./checkout')
const ReservationRouter = require('./reservation')
const LoginRouter = require('./login')
const UserRouter = require('./user')
const ClientRouter = require('./client')

const authorization_middleware = (req, res, next) => {
  if (req.session?.user) next()
  else res.redirect('/login')
}

const logout = (req, res) => {
  req.session.user = null
  req.session.loggedIn = false
  res.redirect('/login')
}

adminRouter.use('/login', LoginRouter)

adminRouter.use('/client', ClientRouter)

adminRouter.use(authorization_middleware)

adminRouter.get('/', (req, res) => res.render('dashboard'))

adminRouter.get('/dashboard', (req, res) => res.render('dashboard'))

adminRouter.use('/rooms', RoomRouter)

adminRouter.use('/guests', GuestRouter)

adminRouter.use('/checkins', CheckInRouter)

adminRouter.use('/checkout', CheckOutRouter)

adminRouter.use('/reservations', ReservationRouter)

adminRouter.use('/users', UserRouter)

adminRouter.get('/logout', logout)


module.exports = adminRouter