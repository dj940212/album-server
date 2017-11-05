import router from 'koa-router'

export default () => {
	const router = new router({prefix: 'api'})

	return router
}