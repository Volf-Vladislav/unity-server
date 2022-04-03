import express, { Express } from 'express'
import mongoose from 'mongoose'

import authRouter from './router/AuthRouter'

class Server {
    private readonly port: string = process.env.PORT || '8000'
    private readonly dataBaseUrl: string = 'mongodb://admin:admin@cluster0-shard-00-00.843j3.mongodb.net:27017,cluster0-shard-00-01.843j3.mongodb.net:27017,cluster0-shard-00-02.843j3.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-15gpa0-shard-0&authSource=admin&retryWrites=true&w=majority'
    private readonly app: Express = express()

    private createMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
    }

    private createRoutes() {
        this.app.use('/api/auth', authRouter)
    }

    private connectToDB() {
        mongoose.connect(this.dataBaseUrl).then(() => {
            console.log('DB connected')
        })
    }

    private listenPort() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }

    public createServer() {
        try {
            this.connectToDB()
            this.listenPort()
            this.createMiddleware()
            this.createRoutes()
        }
        catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
}

const server = new Server()
server.createServer()
