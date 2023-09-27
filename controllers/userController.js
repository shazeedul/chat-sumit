const User = require("../models/User");
const bcrypt = require("bcrypt");
const { unlink } = require("../routers/userRouter");

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.render("users", {
      users,
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  const { name, email, password, mobile } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (req.files && req.files.length > 0) {
    const { filename } = req.files[0];
    await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      avatar: filename,
    });
  } else {
    await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
  }

  try {
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw createHttpError("User does not exist!");
    }
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          console.log(err);
        }
      );
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!"
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
