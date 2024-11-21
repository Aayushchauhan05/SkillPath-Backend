const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'ayushchauhan0508@gmail.com',
        pass: 'qncv jxxq usth ssca'
    }
});

// Send Acceptance or Rejection Email
const sendStatusUpdateEmail = async (status, menteeName, menteeEmail) => {
    const subject = status === 'accepted' ? 'Mentor Meeting Accepted' : 'Mentor Meeting Rejected';
    const message = status === 'accepted' 
        ? `Your mentor has accepted your meeting request. Please visit your dashboard for more details.`
        : `Your mentor has rejected your meeting request. Please visit your dashboard for more details.`;

    let mailOptions = {
        from: '"Mentoring Platform" <your-email@gmail.com>',
        to: menteeEmail,
        subject: subject,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${subject}</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .email-container { padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto; background-color: #f9f9f9; }
                    .email-header { text-align: center; margin-bottom: 20px; }
                    .email-content { margin-bottom: 20px; }
                    .button { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h2>${subject}</h2>
                    </div>
                    <div class="email-content">
                        <p>Hello <strong>${menteeName}</strong>,</p>
                        <p>${message}</p>
                    </div>
                    <div class="email-content">
                        <p>For more details, please visit your <a href="https://your-dashboard-link.com" class="button" target="_blank">Dashboard</a>.</p>
                    </div>
                    <div class="email-content">
                        <p>Best regards,</p>
                        <p>The Mentoring Platform Team</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
       
    } catch (error) {
        console.log('Error:', error);
    }
};

// Example of updating the status
const updateMeetingStatus = async (status, menteeName, menteeEmail) => {
    await sendStatusUpdateEmail(status, menteeName, menteeEmail);
};

module.exports = {
    sendStatusUpdateEmail,
    updateMeetingStatus
};
