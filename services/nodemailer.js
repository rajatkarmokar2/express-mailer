const nodemailer = require( "nodemailer" );
// const handlebars =require('handlebars');
const fs = require( 'fs' )
const path = require( 'path' )

function getFile ( filepath ) {
    const __dirname = path.resolve();
    const filePath = path.join( __dirname,filepath );
    let source = fs.readFileSync( filePath,'utf-8' ).toString();
    return source
}

// async..await is not allowed in global scope, must use a wrapper
async function mailer ( { to,subject,text,html } ) {
    let testAccount = {
        user: 'rajatkarmokar.tg@gmail.com',
        pass: 'bimraudrdlfaacxj',
    }

    let transporter = nodemailer.createTransport( {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    } );

    const imagePath = path.join( __dirname,'./mail-template/images/')
    let htmlTemplate = getFile( './mail-template/mail-template.html' )
        .replace( '$USERNAME','RAJAT' )
        .replace( /\$IMAGEPATH/gm,imagePath )

    let info = await transporter.sendMail( {
        from: `"Rajat Karmokar" ${testAccount.user}`, // sender address
        to: `${to}`, // list of receivers
        subject: subject, // Subject line
        text: "Hello world? " + text, // plain text body
        html: htmlTemplate, // html body
    } );

    console.log( "Preview URL: %s",nodemailer.getTestMessageUrl( info ) );
    // console.log(htmlTemplate);
    // console.log( "Message sent: %s",info.messageId );
}

module.exports = {
    getFile,mailer
}

// $mail -> Host       = 'smtp.gmail.com';
// $mail -> SMTPAuth   = true;
// $mail -> Username   = 'rajatkarmokar.tg@gmail.com';
// $mail -> Password   = 'cvowhftgcuorcqtb';
// // $mail->Host       = 'mail.thinkgestalt.design';
// // $mail->SMTPAuth   = true;
// // $mail->Username   = 'hrishikesh@thinkgestalt.design';
// // $mail->Password   = 'Hrishikesh@321#';
// $mail -> SMTPSecure = PHPMailer:: ENCRYPTION_STARTTLS;

// // $mail->SMTPSecure = 'ssl';
// // $mail->Port = 465;

// // $mail->SMTPSecure = 'ssl';
// // $mail->Port       = 465;

// $mail -> SMTPSecure = 'tls';
// $mail -> Port = 587;


// // stops all security--------------------
// $mail -> Host = 'localhost';
// $mail -> SMTPAuth = false;
// $mail -> SMTPAutoTLS = false;
// $mail -> Port = 25;
// $mail -> SMTPOptions = array(
//     'ssl' => array(
//         'verify_peer' => false,
//         'verify_peer_name' => false,
//         'allow_self_signed' => true
//     )
// );


// $title = "ThinkGestalt";
// $mail -> setFrom( 'rajatkarmokar.tg@gmail.com',$title );
// // $mail->setFrom('hrishikesh@thinkgestalt.design', $title);
// $mail -> addAddress( $to_email );

// $mail -> isHTML( true );
// $mail -> Subject = 'Wellcome to ThinkGestalt';
// $mail -> Body    = "
//         <head>
//             <meta charset='utf-8' />
//             <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
//             <meta name='viewport' content='width=device-width, initial-scale=1'>
//             <title>thinkgestalt.design</title>
//             <link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css'>
//         </head>
//         <body>
//         <header class='site-header' id='header'>
//             <h2 class='site-header__title' data-lead-id='site-header-title'>HELLO $name,</h2>
//         </header>

//         <header class='site-header' id='header'>
//             <h1 class='site-header__title' data-lead-id='site-header-title'>THANK YOU FOR CONTACTING US!</h1>
//         </header>

//         <div class='main-content'>
//             <i class='fa fa-check main-content__checkmark' id='checkmark'></i>
//             <p class='main-content__body' data-lead-id='main-content-body'>Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you.</p>
//         </div>

//         <footer class='site-footer' id='footer'>
//             <p class='site-footer__fineprint' id='fineprint'>Copyright ©2022 | All Rights Reserved</p>
//         </footer>
//         </body>
//         ";