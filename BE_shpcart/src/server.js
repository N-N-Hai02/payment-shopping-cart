require('dotenv').config()
import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import connection from "./config/connectDB"
import initApiRoutes from "./routes/api"
import bodyParser from "body-parser"
import configCors from "./config/cors"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 8081

// config Cors
configCors(app)

// config veiw wengine
configViewEngine(app)

// body-parser in data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config cookie - parser:
app.use(cookieParser())

// connect database
connection()

// init web route
initWebRoutes(app)

// init API route
initApiRoutes(app)

app.listen(PORT, () => {console.log(">>> Shopping cart is running - " + PORT)})
