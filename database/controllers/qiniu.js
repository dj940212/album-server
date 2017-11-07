import qiniu from 'qiniu'
import config from 'config'

class Qiniu {
	construtor(){}

	async getUptoken(ctx) {
		const {type, key} = ctx.request.body

		const accessKey = config.qiniu.AK
		const secretKey = config.qiniu.SK

		const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

		const saveMp4Entry = qiniu.util.urlsafeBase64Encode(config.qiniu.bucket + ":" + key)
		const saveJpgEntry = qiniu.util.urlsafeBase64Encode(config.qiniu.bucket + ":" + key)

		const vframeJpgFop = "vframe/jpg/offset/0/rotate/auto|saveas/" + saveJpgEntry;
		const options = {
		  scope: bucket + ":" + key,
		  //将多个数据处理指令拼接起来
		  persistentOps: vframeJpgFop,
		  //数据处理队列名称，必填
		  persistentPipeline: "video-pipe",
		  //数据处理完成结果通知地址
		  persistentNotifyUrl: "http://api.example.com/qiniu/pfop/notify",
		}
		const putPolicy = new qiniu.rs.PutPolicy(options)
		const uploadToken = putPolicy.uploadToken(mac)

		ctx.body = {
			success: true,
			data: {
				uploadToken: uploadToken, 
				key: key
			}
		}
	}
}

export default new Qiniu()