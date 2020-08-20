const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'zephyroswolf@gmail.com',
        subject: 'Ducks',
        text: `They shall banish the geese, ${name}.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'zephyroswolf@gmail.com',
        subject: `The Geese! ${name}, the Geese!!!`,
        text: `Why did you unsubscribe, ${name}?! The geese succeeded. All is lost, the ducks have failed us.` 
    })
}
// sgMail.send({
//     to: 'theleavesarepurple@gmail.com',
//     from: 'zephyroswolf@gmail.com',
//     subject: 'Boop Beep',
//     text: 'Beep boop'
// })

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}