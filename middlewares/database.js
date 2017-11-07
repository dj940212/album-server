import mongoose from 'mongoose'
import config from 'config'

export default () => {
	mongoose.set('debug', true)
	mongoose.connect(config.db)
	mongoose.connection.on('disconnected', () => {
		mongoose.connect(config.db)
	})
	mongoose.connection.on('error', err => {
        console.log(err)
    })
    mongoose.connection.on('open', async ()=> {
        console.log('Connected to MongoDB Success')

        let admin = await User.findOne({
        	username: config.admin.username, 
        	password: config.admin.password
        })

        if (!admin) {
            await new User(config.admin).save()
            console.log("写入管理员数据")
        }
    })
}