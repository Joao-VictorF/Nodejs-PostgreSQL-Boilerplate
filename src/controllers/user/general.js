const db      = require("@models");
const logger = require('@common/winston');

const { ReasonPhrases, StatusCodes } = require('http-status-codes')
/**
 * List all Users
 *
 * @param {*} req
 * @param {*} res
 * 
 * @returns {Array<User>}
 */
exports.listAllUsers = async (req, res) => {
  try {
    var users = await db.User.findAll({
      attributes: ['id', 'name', 'email']
    })
    
    res
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: users,
    });
  } catch (error) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error
    });
  }
}