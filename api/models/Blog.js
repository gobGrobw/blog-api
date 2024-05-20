const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	author: { type: Schema.Types.ObjectId },
	title: { type: String },
	message: { type: String },
	date: { type: Date },
});

module.exports = mongoose.model('Blog', BlogSchema);

