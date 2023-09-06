const Leads = require('../../models/Lead.js')
import sendGridMail  from '@sendgrid/mail'
import db from '../../config/dbConnect.js'

export default async function handler(req, res) {

  db //mongoose.connection

  if (req.method === 'POST') {
    try {
      const leadCadastrado = new Leads(req.body)
      console.log('Requisição POST realizada com sucesso...')
      res.status(201).json({ message: 'Tudo certo' })
      await leadCadastrado.save()
      sendGridMail.setApiKey(process.env.SENDGRID_KEY)
      await sendGridMail.send({
        from: 'hugo@pontesebritto.adv.br',
        to: leadCadastrado.email,
        subject: 'Seja bem vindx, Companheirx!',
        html: `<strong>Olá, camaradx ${leadCadastrado.nome}</strong>.<br><br><br> Muito obrigado por fazer parte da minha newsletter! <br><br> Toda terça-feira, às 08:00 em ponto, reunirei todo o conteúdo da semana e ele chegará no seu e-mail contendo as últimas notícias relevantes, opiniões pessoais, indicações e muito mais... <br><br> Então, mais uma vez, obrigado e um grande abraço do Hugo! <br><br><br><br> @advogadosocialista`
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({error: 'Alguma coias deu errado na requisição POST...'})
    }
  } 

  else if (req.method === 'GET') {
    try {
      const leadsCadastrados = await Leads.find()
      const totalLeads = leadsCadastrados.length
      res.status(200).json({totalLeads, leadsCadastrados})
    }
    catch(error){
      res.status(400).json({error: 'Alguma coisa deu errado na requisição GET...'})
    }
  }
}
