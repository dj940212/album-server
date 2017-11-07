import Router from 'koa-router'
import Qiniu from 'controllers/qiniu'
import Photovideo from 'controllers/photovideo'
import User from 'controllers/user'
import Admin from 'controllers/admin'

export default () => {
	const router = new Router({prefix: 'api2'})
	
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