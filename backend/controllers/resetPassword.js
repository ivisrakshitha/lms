const User = require("../models/user");
const OTP = require("../models/OTP"); // Import OTP model
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// ================ resetPasswordToken ================
exports.resetPasswordToken = async (req, res) => {
  try {
    // extract email
    const { email } = req.body;

    // email validation
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your Email is not registered with us",
      });
    }

    // generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete any existing password reset OTP for this email
    await OTP.deleteMany({ email: email, purpose: "password-reset" });

    // Create new OTP document
    const otpDocument = new OTP({
      email: email,
      otp: otp,
      purpose: "password-reset",
    });

    await otpDocument.save();

    // create email content
    const emailContent = `
            <h2>Password Reset OTP</h2>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;

    // send email containing OTP
    await mailSender(email, "Password Reset OTP", emailContent);

    // return success response
    res.status(200).json({
      success: true,
      message:
        "OTP sent successfully to your email. Please check your mailbox.",
    });
  } catch (error) {
    console.log("Error while creating OTP for reset password");
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while creating OTP for reset password",
    });
  }
};

// ================ verifyOTPAndResetPassword ================
exports.verifyOTPAndResetPassword = async (req, res) => {
  try {
    // extract data
    const { email, otp, password, confirmPassword } = req.body;

    // validation
    if (!email || !otp || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // validate both passwords
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // find user by email from DB
    const userDetails = await User.findOne({ email: email });

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the most recent OTP for this email and purpose
    const otpDocument = await OTP.findOne({
      email: email,
      purpose: "password-reset",
      otp: otp,
    }).sort({ createdAt: -1 });

    if (!otpDocument) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user with new password
    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    // Delete the used OTP
    await OTP.deleteOne({ _id: otpDocument._id });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error while resetting password");
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while resetting password",
    });
  }
};
