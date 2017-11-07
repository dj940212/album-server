import axios from 'axios'

class User{
	construtor() {}

	async login(ctx) {
		// 注册
		const {jscode, nickname} = ctx.request.body
		
		const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session',{
			params: {
				appid: 'wx0cabd8483ff83d59',
			    secret: '67095a452704f90ce9d890c269ebac72',
			    js_code: jscode,
			    grant_type: "authorization_code"
			}
		})

		const openid = res.data.openid
		let user = await User.findOne({openid: openid})

		if (user){
			return console.log("用户已存在")
		} 

		console.log("创建新用户")
		user = new User({
			openid: openid,
	        nickName: nickName,
		})

		user = await user.save()
		
		ctx.body = {
			success: true,
			openid: openid
		}
	}
}

