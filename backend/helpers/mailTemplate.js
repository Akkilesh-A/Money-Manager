const mail=
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 30px;
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333333;
            font-size: 24px;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        .otp {
            font-size: 28px;
            color: #007BFF;
            font-weight: bold;
            margin: 20px auto;
            padding: 10px 20px;
            border: 2px solid #007BFF;
            display: inline-block;
            border-radius: 5px;
        }
        footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777777;
        }
        .socials {
            margin-top: 30px;
            text-align: center;
        }
        .socials a {
            margin: 0 10px;
            text-decoration: none;
        }
        .socials img {
            width: 32px; /* Adjust icon size */
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Money Muncher</h1>
        <p>Your One-Time Password (OTP) is:</p>
        <div class="otp">${otp}</div>

        <!-- Social Links Section -->
        <div class="socials">
            <p>Checkout the developer:</p>
            
            <!-- LinkedIn Icon and Link -->
            <a href="https://www.linkedin.com/in/akkilesh-a-620561275/" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
            </a>

            <!-- GitHub Icon and Link -->
            <a href="https://github.com/Akkilesh-A" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub">
            </a>
        </div>

        <footer>
            If you did not request this email, please ignore it.
        </footer>
    </div>
</body>
</html>`

export {
    mail
}