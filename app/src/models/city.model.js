const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  cityId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const City = mongoose.model('City', schema);

module.exports = City;