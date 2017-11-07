import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchame = new Schema({
	openid: String,
	nickname: String,
  	yBaby: [
  		type: ObjectId,
  		ref: 'Baby'
  	],
  	aBaby: [
  		type: ObjectId,
  		ref: 'Baby'
  	],
  	oBaby: [
  		type: ObjectId,
  		ref: 'Baby'
  	],
  	relatives: [
  		type: ObjectId,
  		ref: 'User'
  	],
  	meta: {
	    createAt: {
	      	type: Date,
	      	dafault: Date.now()
	    },
	    updateAt: {
	      	type: Date,
	      	dafault: Date.now()
	    }
  	}
})

UserSchema.pre('save', function(next) {
  	if (this.isNew) {
    	this.meta.createAt = this.meta.updateAt = Date.now()
  	}else {
    	this.meta.updateAt = Date.now()
  	}

  	next()
})

module.exports = mongoose.model('User', UserSchema)