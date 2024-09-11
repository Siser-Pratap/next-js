import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcryptjs from "bcryptjs";


export const sendEmail = async({email, emailType, userId}) =>{

    try{

    const hashedToken = await bcryptjs.hash(userId, 10);

    if(emailType === "VERIFY"){
        User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+3600});
    }
    else if(emailType === "RESET"){
        User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+3600});
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "48f198beadddc4",
          pass: "3aaea0b9716c8c"
        }
      });

      
      
        const info = await transport.sendMail({
          from: "insasp0@gmail.com", // sender address
          to: {email}, // list of receivers
          subject:emailType==="VERIFY"?"Verify your email":"Reset your password", // Subject line
          html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        });

        return info;
    }
    catch(err){
        throw new Error(err.message);
    }

    


}