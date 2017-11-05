import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BabySchame = new Schema({
	name: String,
	birthday: Date,
	superAdmin: {
		type: ObjectId,
		ref: 'User'
	},
	admin: [{
		type: ObjectId,
		ref: 'User',
	}],
	user: [
		type: ObjectId,
		ref: 'User'
	],
	photovideo: [
		type: ObjectId,
		ref: 'Photovideo'
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

BabySchema.pre('save', function(next) {
  	if (this.isNew) {
    	this.meta.createAt = this.meta.updateAt = Date.now()
  	}else {
    	this.meta.updateAt = Date.now()
  	}

  	next()
})

module.exports = mongoose.model('Baby', BabySchema)