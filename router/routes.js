import Router from 'koa-router'
import Qiniu from 'controllers/qiniu'
import Photovideo from 'controllers/photovideo'
import User from 'controllers/user'

export default () => {
	const router = new router({prefix: 'api2'})
	
	// admin
	router.post('/admin/login', Admin.login)
	//user
	router.post('/user/login', User.login)
	//qiniu
	router.post('/qiniu/uptoken', Qiniu.getUptoken)
	//photovideo
	router.post('/photovideo/add', Photovideo.add)

	return router
}