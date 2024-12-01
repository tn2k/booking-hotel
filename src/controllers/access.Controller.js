const createHttpError = require("http-errors");
const { getAllUsers, createUser, getDataUser, updateDataUser, deleteDataUser } = require("../services/user.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const { apiLogin, logout, handlerRefreshToken, checkAuthUser } = require("../services/access.service");

const handlerRefreshToKen = async (req, res, next) => {
  new SuccessResponse({
    message: "Get token User success!",
    metadata: await handlerRefreshToken({
      refreshToken: req.refreshToken,
      decodeUser: req.user,
      keyStore: req.keyStore
    })
  }).send(res)
};

const login = async (req, res, next) => {
  try {
    const data = await apiLogin(req.body);
    res.cookie('accessToken', data.tokens.accessToken, {
      httpOnly: true,      // Cookie chỉ gửi qua HTTP
      secure: false,       // Tắt cho localhost (bật nếu dùng HTTPS)
      sameSite: 'Strict',     // Ngăn chặn CSRF
      maxAge: 15 * 60 * 1000,   // Thời gian tồn tại của access token
    });
    res.cookie('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // Thời gian tồn tại của refresh token
    });
    res.cookie('userId', data.User.tenant_id, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    new SuccessResponse({
      message: "Login User success!",
      metadata: data
    }).send(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkAuth = async (req, res, next) => {
  new SuccessResponse({
    message: "check Auth User success!",
    metadata: await checkAuthUser({ decodeUser: req.user })
  }).send(res)
};

const signUp = async (req, res, next) => {
  new CREATED({
    message: "Registered OK",
    metadata: await createUser(req.body),
  }).send(res)
};

const logOut = async (req, res, next) => {
  const response = await logout(req.keyStore)
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('userId');
  new SuccessResponse({
    message: "logout User success !",
    metadata: response
  }).send(res)
};

const getListUsers = async (req, res, next) => {
  new SuccessResponse({
    message: "Get list User success!",
    metadata: await getAllUsers(),
  }).send(res)
};

const getEditUser = async (req, res, next) => {
  new SuccessResponse({
    message: "Get data User edit success!",
    metadata: await getDataUser({ userId: req.params.id })
  }).send(res)
};

const updateUser = async (req, res, next) => {
  new SuccessResponse({
    message: "Update data User edit success!",
    metadata: await updateDataUser(req.body)
  }).send(res)
};

const deleteUser = async (req, res, next) => {
  new SuccessResponse({
    message: "Delete User success!",
    metadata: await deleteDataUser({ userId: req.params.id })
  }).send(res)
};

module.exports = {
  handlerRefreshToKen,
  login,
  logOut,
  signUp,
  getListUsers,
  getEditUser,
  updateUser,
  deleteUser,
  checkAuth,
};
