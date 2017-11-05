import Koa from 'koa'
import cors from 'cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import router from './router/routes'
import config from './config'


const app = new Koa()
const router = new router()

app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(config.port)
console.log("server is starting at port " + config.port)