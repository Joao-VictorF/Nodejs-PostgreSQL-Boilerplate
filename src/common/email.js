const Email = require('email-templates');
const path = require('path');

const _host = 'smtp.googlemail.com';

require('dotenv').config();

const production = process.env.NODE_ENV === 'production';

const _email = new Email({
  message: {
    from: process.env.EMAIL
  },
  // to send emails in production env:
  send: production,

  // preview email result in browser
  preview: !production,
  
  transport: {
    host: _host,
    port: 587,
    secure: false,
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PWD },
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      // this is the relative directory to your CSS/image assets
      relativeTo: path.join(__dirname, 'email-templates', 'assets'),
      images: false,
    }
  }
});

/**
 * Envia um email de primeiro acesso para um usuário.
 *
 * @param {String} email
 * @param {String} password
 * @param {String} name
 */
exports.sendPwdRecoveryEmail = async (email, token, name) => {
  try {
    _email
      .send({
        template: 'recoveryPwd',
        message: {
          to: email,
          attachments: [
            {
              filename: 'logo-sizeid.png',
              path: path.join(__dirname, 'email-templates', 'assets', 'logo.png'),
              cid: 'logo-sizeid',
            },
          ],
        },
        locals: {
          name: name,
          url: `${process.env.FRONTEND_URL}/forgetpass/${token}`,
        }
      })
  } catch (err) {
    throw err;
  }
};


/**
 * Email send test function
 */
async function testEmail() {
  try {
    let email = 'youremail@gmail.com';
    let name = 'Your name';
    let token = 'asldbasyudgasoubasdjasnd2235dkahdla';
    
    _email
      .send({
        template: path.join(__dirname, 'email-templates', 'recoveryPwd'),
        message: {
          to: email,
          attachments: [
            {
              filename: 'logo-sizeid.png',
              path: path.join(__dirname, 'email-templates', 'assets', 'logo.png'),
              cid: 'logo-sizeid',
            },
          ],
        },
        locals: {
          name: name,
          url: `${process.env.FRONTEND_URL}/forgetpass/${token}`,
        }
      })
        .then((res) => {
          console.log('Email successfully sent');
        })
        .catch((err) => {
          console.log(err);
        })
  } catch (err) {
    throw err;
  }
}

exports.test = testEmail;
