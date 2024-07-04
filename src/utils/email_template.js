/** @format */
import email_service from "../config/nodemailer.js";

const email_template = async () => {
  const config = {
    from: {
      name: "Logos App",
      address: "vzeinternal@gmail.com",
    }, // sender address
    to: ["loloklolok14@gmail.com"], // list of receivers
    subject: "Notification Reminder", // Subject line
    html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>E-Ticket</title>
            <style>
                body {
                    font-family: Roboto, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px 10px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                .header,.footer {
                    background-color: #fff;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
        
                .header img{
                    width: 100%;
                    height: auto;
                }
                .footer img{
                    width: 40%;
                    height: auto;
                }
        
                .ticket {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
        
                .ticket h2 {
                    color: #eb0028;
                    margin-top: 0;
                }
        
                p a {
                    color: #eb0028;
                }
        
                .ticket p {
                    margin-top: 5px;
                    text-align: justify;
                    line-height: 1.5em;
                }
        
                .cta {
                    width: 100%;
                    margin: 50px 0;
                }
        
                .cta a {
                    width: fit-content;
                    margin: auto;
                    display: block;
                }
        
                .cta button {
                    background-color: #eb0028;
                    border: none;
                    padding: 14px 52px;
                    color: white;
                    font-size: 1em;
                    border-radius: 20px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://res.cloudinary.com/dnbtkwgwz/image/upload/v1708162393/rqoavfbiwaiktstjdjfh.png">
                </div>
                <div class="content">
                    <div class="ticket">
                        <p><b>Payment Success: Ticket Confirmed! 🎫</b></p>
                        <p>Yeayy! Ticket payment has been made successfully! Now it's time to grab your tickets and get ready for an unforgettable experience!</p>
                        <p>Click the button below to instantly access your tickets:</p>
                        <p>Make sure you prepare with passion and enthusiasm. If you have any questions or need any assistance, please do not hesitate to <a
                            href="https://wa.me/6281210696745" target="_blank">contact
                            us</a>.</p>
                        <p>Thank you, we hope you enjoy every moment of this event ✨✨
                            Hope to see you there!</p>
                        <br>
                        <br>
                        <p><b>TEDxUINJakarta</b></p>
                    </div>            
                </div>
                <div class="footer">
                    <img src="https://res.cloudinary.com/dnbtkwgwz/image/upload/v1707485076/idvp4ypfne3kc3809cew.png" />
                </div>
            </div>
        </body>
        
        </html>`, // html body,
  };

  await email_service(config);
};

export default email_template;
