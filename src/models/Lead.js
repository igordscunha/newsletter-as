import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const leadSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String, required: true },
  email: { type: String, required: true }
})

module.exports = mongoose.models.leads || mongoose.model('leads', leadSchema)