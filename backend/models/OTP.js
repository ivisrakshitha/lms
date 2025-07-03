const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["signup", "password-reset"],
    default: "signup",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

//  function to send verification email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      `<h2>Email Verification</h2>
       <p>Your OTP for email verification is: <strong>${otp}</strong></p>
       <p>This OTP will expire in 5 minutes.</p>`
    );
    console.log("Email sent successfully to - ", email);
  } catch (error) {
    console.log("Error while sending verification email to ", email);
    throw error;
  }
}

//  function to send password reset email
async function sendPasswordResetEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Password Reset OTP",
      `<h2>Password Reset OTP</h2>
       <p>Your OTP for password reset is: <strong>${otp}</strong></p>
       <p>This OTP will expire in 5 minutes.</p>
       <p>If you didn't request this, please ignore this email.</p>`
    );
    console.log("Password reset email sent successfully to - ", email);
  } catch (error) {
    console.log("Error while sending password reset email to ", email);
    throw error;
  }
}

// pre middleware
OTPSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    if (this.purpose === "signup") {
      await sendVerificationEmail(this.email, this.otp);
    } else if (this.purpose === "password-reset") {
      await sendPasswordResetEmail(this.email, this.otp);
    }
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
