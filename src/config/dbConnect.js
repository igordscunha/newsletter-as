import mongoose from "mongoose"

mongoose.connect(process.env.DB_CONNECT)
  .catch(erro => console.log(erro))

let db = mongoose.connection

db.on("error", console.log.bind(console, 'Erro de conexão com o banco de dados'))
db.once("open", () => console.log('Conexão com o banco de dados feita com sucesso'))

export default db
