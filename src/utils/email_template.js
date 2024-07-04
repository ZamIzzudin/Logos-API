/** @format */
import email_service from "../config/nodemailer.js";

const email_template = async (user, data, step, type) => {
  const config = {
    from: {
      name: "Logos App",
      address: "vzeinternal@gmail.com",
    }, // sender address
    to: [user.email], // list of receivers
    subject: "Notification Reminder", // Subject line
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tender Status Update</title>
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

                    .header, .footer {
                        background-color: #fff;
                        color: #fff;
                        padding: 10px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }

                    .content {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }

                    .content h2 {
                        color: #eb0028;
                        margin-top: 0;
                    }

                    p a {
                        color: #eb0028;
                    }

                    .content p {
                        margin-top: 5px;
                        text-align: justify;
                        line-height: 1.5em;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                    </div>
                    <div class="content">
                        <h2>Reminder Status Updated</h2>
                        <p>Tender-${data.kode_tender} Status Updated - (${step.tahap})</p>
                        <p>Dear Logos Corp,</p>
                        <p>The status of Tender-${data.kode_tender} was updated today. The recent status is (${step.tahap}).</p>
                        <p>Data Detail:</p>
                        <ul>
                          <li>Nama Tender: ${data.nama_tender}</li>
                          <li>Jenis Pengadaan: ${data.jenis_pengadaan}</li>
                          <li>Penyelenggara Proyek: ${data.instansi}</li>
                          <li>Satuan Kerja: ${data.satuan_kerja}</li>
                          <li>Status: ${step.tahap} (Mulai: ${step.mulai} - Selesai: ${step.sampai})</li>
                        </ul>
                        <p>Kindly check your email for further information from the LPSE.</p>
                    </div>
                    <div class="footer">
                    </div>
                </div>
            </body>
            </html>`, // html body,
  };

  await email_service(config);
};

export default email_template;
