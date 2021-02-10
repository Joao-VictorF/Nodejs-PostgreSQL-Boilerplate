const db      = require("@models");
const logger = require('@common/winston');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { ReasonPhrases, StatusCodes } = require('http-status-codes')

/**
 * Hash password to save in DB
 *
 * @param {string} password
 * 
 * @returns {string} String
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Validate password.
 *
 * @param {string} reqPwd
 * @param {string} userPwd
 * 
 * @returns {Boolean} Boolean
 */
async function validatePassword(reqPwd, userPwd) {
  return await bcrypt.compare(reqPwd, userPwd);
};

/**
 * Creates an instance of User
 *
 * @param {*} req
 * @param {*} res
 * 
 * @returns {User}
 */
exports.sign_up = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    var user = await db.User.findOne({
      attributes: ['email'],
      where: {
        email: email
      }
    })

    if (user != null) {
      return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({
        success: false,
        message: "Já existe uma conta utilizando este e-mail.",
        error: ReasonPhrases.UNPROCESSABLE_ENTITY
      });
    }

    var hashedPwd = await hashPassword(password)

    user = await db.User.create({
      name,
      email,
      password: hashedPwd
    })
    
    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        access_token: user.access_token,
      },
      message: ReasonPhrases.OK
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `Erro ao realizar cadastro. Err: ${error.toString()}.`
    });
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error
    });
  }
}

/**
 * Make a login attempt
 *
 * @param {*} req
 * @param {*} res
 * 
 * @returns {User}
 */
exports.sign_in = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    var user = await db.User.findOne({
      attributes: ['id', 'name', 'photo', 'password', 'access_token'],
      where: {
        email: email
      }
    })
    
    if (user != null) {
      const validPwd = await validatePassword(password, user.password);
      if(validPwd) {
        const id = user._id;
        var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 86400 * 7,
        });

        user.access_token = token;
        await user.save();

        return res
        .status(StatusCodes.OK)
        .json({
            success: true,
            message: StatusCodes.OK,
            data: {
              id: user.id,
              name: user.name,
              access_token: user.access_token,
              photo: user.photo ?? null,
            },
        });
      }
    }
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({
      success: false,
      message: 'Email ou senha inválidos!'
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `Erro ao realizar login. Err: ${error.toString()}.`
    });
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error
    });
  }
}