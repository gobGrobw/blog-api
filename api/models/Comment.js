const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	author: { type: Schema.Types.ObjectId },
	blog: { type: Schema.Types.ObjectId },
	message: { type: String },
	date: { type: Date },
});

module.exports = mongoose.model('Comment', CommentSchema);

