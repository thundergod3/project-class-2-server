import validatePassword from "../../utils/validatePassword.js";
import generateToken from "../../utils/generateToken.js";
import {
  UserModel,
  ResetTokenModel,
  FacultyModel,
  MajorModel,
} from "../../models/index.js";

const AuthService = {
  myProfile: async (userId) => {
    const user = await UserModel.findOne({
      where: {
        id: userId,
      },
      include: [{ model: FacultyModel }, { model: MajorModel }],
    });

    delete user?.password;

    return user;
  },

  login: async (req, body) => {
    const { username, password } = body;
    const user = await UserModel.findOne({
      where: {
        username,
      },
    });

    if (user && validatePassword(password, user.password)) {
      const currentUser = {
        id: user.id,
        code: user.code,
        name: user.name,
        role: user.role,
        username: user.username,
        password: user.password,
        topicId: user.topicId,
        token: generateToken(user.id),
      };

      return currentUser;
    } else {
      return {
        msg: "Invalid username",
      };
    }
  },

  register: async (body) => {
    const { username, password, code, name, role, facultyId, majorId } = body;
    const userExists = await UserModel.findOne({
      where: {
        username,
      },
    });

    if (userExists) {
      res.status(401).json({
        msg: "User already existed. Please try again with another username",
      });
    } else {
      const user = await UserModel.create({
        username,
        password,
        code,
        name,
        role,
        facultyId,
        majorId,
      });

      if (user) {
        const newUser = {
          id: user.id,
          code: user.code,
          name: user.name,
          role: user.role,
          username: user.username,
          password: user.password,
          token: generateToken(user.id),
        };

        return newUser;
      } else {
        res.status(401).json({
          msg: "Invalid user data. Please try again",
        });
      }
    }
  },

  forgotPassword: async (body) => {
    let msg = "";
    const username = body?.username;

    const findUser = await UserModel.findOne({
      where: {
        username,
      },
    });

    if (findUser) {
      const resetToken = generateToken(findUser.id, "1h");
      const templateHTML = `
    <h3>Hi ${findUser.username}</h3>
    You have requested for a password reset at <b>${moment(new Date())
      .tz("Asia/Singapore")
      .format("MMMM Do YYYY, h:mm:ss a")}</b>
    <p>If this is not you, please ignore the this email.</p>
    <p>Otherwise, please click <a href="${
      process.env.FRONT_END_CALLBACK
    }/reset-password/callback?resetToken=${resetToken}">here</a> to reset your password.</p>
    <p>Alternatively, you can copy this link to reset your password</p>
    ${
      process.env.FRONT_END_CALLBACK
    }/reset-password/callback?resetToken=${resetToken}
    <p>From your PropertyGenie!</p>
        `;

      const result = await sendingMail(
        "Thang Long University <info@thanglongtlu.edu.vn>",
        userEmail,
        "Reset Password",
        templateHTML
      );
      const findResetToken = await ResetTokenModel.findOne({
        where: {
          userId: findUser.id,
        },
      });

      if (findResetToken) findResetToken.destroy();

      if (result) {
        await ResetTokenModel.create({
          token: resetToken,
          userId: findUser.id,
        });

        msg = `Reset password has been sent to ${username}`;
      } else {
        msg = `Error in sending email to ${username}`;
      }
    } else {
      msg = `Reset password has been sent to ${username}`;
    }

    return msg;
  },

  resetPassword: async (body) => {
    const { newPassword, token } = body;

    const resetToken = await ResetTokenModel.findOne({ where: { token } });
    const user = await UserModel.findOne({ where: { id: resetToken.userId } });

    if (!resetToken || !resetToken.userId || !user) {
      return {
        msg: "Cannot reset a password. Please try again",
      };
    }

    await resetToken.destroy({
      where: {},
      truncate: true,
    });
    await user.update({ password: hashPassword(newPassword) });

    return {
      msg: "Password has been reset!",
    };
  },
};

export default AuthService;
