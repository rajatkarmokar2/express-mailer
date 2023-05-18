const express = require( 'express' )
const {mailer,getFile} = require( './services/nodemailer' )
const path = require('path')
const app = express()
const port = 4000
app.use( express.json() )

app.get( '/',( req,res ) => {
    res.send( 'server started' )
} )

app.get( '/api/images/:image',( req,res ) => {
    const __dirname = path.resolve();
    const filePath = path.join( __dirname,'./mail-template/images/'+req.params.image );
    res.sendFile( filePath )
} )

app.post( '/api/sendmail',async ( req,res ) => {
    const { to,subject,text,html } = req.body
    try {
        const response = await mailer( { to,subject,text,html } ).catch( console.error )
        res.status(200).json( { to,subject,text,html,response } )
    } catch ( error ) {
        res.status(400).json( { error: error.message } )
    }
} )

app.listen( port,() => console.log( 'server started at ',port ) )