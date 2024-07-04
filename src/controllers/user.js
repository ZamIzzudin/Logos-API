/** @format */

import User from "../models/user.js";
import crypting from "../libs/crypt.js";
import token from "../libs/jwt.js";

const temp_config = {
  penyelenggara_proyek: ["Provinsi DKI Jakarta"],
  jenis_proyek: ["Pekerjaan Konstruksi"],
  lokasi_proyek: [],
  nilai_proyek: { min: 15000000000, max: 20000000000 },
  hbu: null,
  kbli: null,
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check email is exist
    const user = await User.findOne({ username });
    //when data user is not found
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "failed",
        info: "username not exist, make sure to register your username first",
      });
    } else {
      //compare the password
      const hashPassword = await crypting.pairing_one_way(
        password.toString(),
        user.password
      );

      if (hashPassword) {
        //generate access token and refresh token
        const access_token = token.create_access_token(user._id);
        const refresh_token = token.create_refresh_token(user._id);

        //send cookie with contain refresh token
        res.cookie("refreshToken", refresh_token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return res.status(200).json({
          status: 200,
          message: "Success Login",
          data: {
            id: user._id,
            username: user.username,
            config: user.config,
            archive: user.archive,
            record: user.record,
            notification: user.notification,
          },
          access_token,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "failed",
          info: "password doesn't match, please insert a correct password",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
      stack: err,
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    //when user not sent cookie refresh token
    if (!refreshToken) {
      return res.status(400).json({
        status: 400,
        message: "failed",
        info: "forbidden",
      });
    } else {
      token.verify_refresh_token(refreshToken, (error, decoded) => {
        if (error) {
          console.log(error);
          return res.status(401).json({
            status: 401,
            message: "failed",
            info: "forbidden",
          });
        } else {
          // generate token
          const access_token = token.create_access_token(decoded.id);
          const refresh_token = token.create_refresh_token(decoded.id);

          //send cookie with contain refresh token
          res.cookie("refreshToken", refresh_token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //one day
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });

          return res.status(200).json({
            status: 200,
            message: "success",
            access_token,
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
      stack: err,
    });
  }
};

const register = async (req, res) => {
  const { password, username } = req.body;

  try {
    //check duplicated username
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        status: 400,
        message: "failed",
        info: "username was used, try use another username",
      });
    } else {
      const encrypted_password = await crypting.encrpyt_one_way(password);

      // create user
      const new_user = await User.create({
        username,
        password: encrypted_password,
        config: temp_config,
      });

      if (new_user) {
        //generate access token and refresh token
        const access_token = token.create_access_token(new_user._id);
        const refresh_token = token.create_refresh_token(new_user._id);

        //send cookie with contain refresh token
        res.cookie("refreshToken", refresh_token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //one day
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        return res.status(201).json({
          status: 201,
          message: "Success Register User",
          data: {
            id: new_user._id,
            username: new_user.username,
            config: new_user.config,
            archive: new_user.archive,
            record: new_user.record,
            notification: new_user.notification,
          },
          access_token,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "failed",
          info: "failed to register an user",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
      stack: err,
    });
  }
};

const controller = {
  login,
  refresh,
  register,
};

export default controller;
