const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.path} from ${req.headers.origin || "No Origin"}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

function getBirthdayTemplate(data) {
  const { name, message, image, birthdayBg, birthdayLogo } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 794px;
          height: 1123px;
          background: url('${birthdayBg}') center center / cover no-repeat;
          font-family: 'Pinyon Script', cursive;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          color: black;
        }

        .logo-container {
            margin-top: 20px; /* Reduced from 40px */
            margin-bottom: 10px; /* Reduced from 20px */
        }

        .logo {
            width: 300px; /* Compromise: 400px is likely too big, reduced slightly to fit, but kept large */
            height: auto;
            max-height: 200px; /* prevent it from taking too much vertical space if aspect ratio is tall */
            object-fit: contain; 
        }

        /* Polaroid Card Frame */
        .polaroid-card {
            background-color: #F8F8F8; 
            width: 480px; 
            padding: 15px 15px 40px 15px; /* Compact padding */
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: rotate(-2deg);
            position: relative;
        }

        .top-text {
            font-size: 50px; 
            margin-bottom: 15px;
            text-align: center;
            line-height: 1;
            font-family: 'Pinyon Script', cursive;
        }

        .photo-container {
            width: 100%;
            height: 380px; /* Reduced height to strict fit */
            background-color: #333;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .photo-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .recipient-name {
            font-size: 56px;
            margin-top: 25px;
            text-align: center;
            line-height: 1;
            font-family: 'Pinyon Script', cursive;
        }

        .message-container {
            margin-top: 40px;
            width: 80%;
            text-align: center;
            font-family: 'Pinyon Script', cursive; /* Applied explicitly as requested */
            font-size: 24px; /* Increased for script readability */
            color: #FFFFF0;
            /* text-transform: uppercase; Script usually looks bad in all caps */
            letter-spacing: 1px;
            line-height: 1.4;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            font-weight: 400;
        }
      </style>
    </head>

    <body>
      <div class="logo-container">
        <img src="${birthdayLogo}" class="logo" alt="Logo">
      </div>

      <div class="polaroid-card">
        <div class="top-text">Happy Birthday!</div>
        
        <div class="photo-container">
            <img src="${image}" alt="Moment">
        </div>

        <div class="recipient-name">${name}</div>
      </div>

      <div class="message-container">
        ${message}
      </div>
    </body>
    </html>
  `;
}

function getKwibukaTemplate(data) {
  const {
    years,
    date,
    venue,
    messageOfHope,
    imenaLogo,
    kwibukaIcon,
    kwibukaBg
  } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&family=Montserrat:wght@400;700;800&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 794px;
          height: 1123px;
          position: relative;
          overflow: hidden;
          background: url('${kwibukaBg}') center center / cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          width: 580px;
          height: 860px;
          border-radius: 12px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 40px;
          position: relative;
          text-align: center;
          color: #6D645F;
        }

        .kwibuka-logo {
          width: 75px;
          margin-bottom: 60px;
          display: block;
        }

        .label-commemoration {
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 26px;
          font-family: 'Crimson Pro', serif;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .title-main {
          font-size: 78px;
          font-weight: 800;
          line-height: 0.9;
          margin: 0;
          color: #6D645F;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .divider-with {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 20px;
          margin: 40px 0;
        }

        .divider-line {
          height: 1.5px;
          background: #6D645F;
          flex: 1;
          opacity: 0.6;
        }

        .with-text {
          font-family: 'Crimson Pro', serif;
          font-style: italic;
          font-size: 32px;
          color: #6D645F;
        }

        .family-name {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #6D645F;
          border-bottom: 2.5px solid rgba(109, 100, 95, 0.4);
          padding-bottom: 5px;
          width: fit-content;
        }

        .date-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          font-size: 38px;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .date-separator {
          opacity: 0.4;
          font-weight: 200;
        }

        .date-underline {
          width: 280px;
          height: 1.5px;
          background: #6D645F;
          opacity: 0.6;
          margin-bottom: 60px;
        }

        .venue-name {
          font-family: 'Crimson Pro', serif;
          font-size: 28px;
          line-height: 1.4;
          max-width: 80%;
          color: #6D645F;
        }
      </style>
    </head>

    <body>
      <div class="card">
        <img src="${kwibukaIcon}" class="kwibuka-logo" alt="Kwibuka Icon" />

        <div class="label-commemoration">COMMEMORATION</div>

        <h1 class="title-main">
          <span>KWIBUKA</span>
          <span>${years}</span>
        </h1>

        <div class="divider-with">
          <div class="divider-line"></div>
          <div class="with-text">with</div>
          <div class="divider-line"></div>
        </div>

        <div class="family-name">Imena Family</div>

        <div class="date-container">
          ${date
      .split(/[/\-.]/)
      .map(
        (part, i, arr) => `
                  <span>${part.trim()}</span>
                  ${i < arr.length - 1
            ? '<span class="date-separator">/</span>'
            : ''
          }
                `
      )
      .join("")
    }
        </div>

        <div class="date-underline"></div>

        <div class="venue-name">${venue}</div>
      </div>
    </body>
    </html>
  `;
}
function getEventTemplate(data) {
  const {
    eventDay,
    eventDate, // Added missing field
    hostingFamily,
    location,
    eventBg,
    eventLogo
  } = data;

  // Try to determine the day of the week
  let weekday = "Saturday"; // Default
  try {
    const dateObj = new Date(eventDay);
    if (!isNaN(dateObj.getTime())) {
      weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    }
  } catch (e) {
    console.error("Error parsing date for weekday:", e);
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;500;600&family=Playfair+Display:wght@700&family=Pinyon+Script&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 794px;
          height: 1123px;
          background: url('${eventBg}') center center / cover no-repeat;
          font-family: 'Pinyon Script', cursive; /* Applied globally as requested */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          color: white;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          z-index: 1;
        }

        .content {
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          text-align: center;
          position: relative; /* Context for absolute positioning if needed */
        }

        .logo-container {
            margin-bottom: 50px;
        }

        .logo {
          width: 280px; /* Doubled from 140px */
          height: auto;
          display: block;
        }

        .main-title {
          /* font-family: 'Pinyon Script', cursive; Inherited from body */
          font-size: 110px;
          color: #D4AF37; /* Gold */
          margin: 0;
          line-height: 1;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .subtitle-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .line {
          width: 150px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.8);
          margin: 0 20px;
        }

        .subtitle {
          font-size: 32px;
          text-transform: capitalize; /* "Let's celebrate" */
          letter-spacing: 2px;
          font-weight: 500;
          color: white;
          /* font-family: 'Pinyon Script', cursive; Inherited from body */
        }

        .script-date {
            /* font-family: 'Pinyon Script', cursive; Inherited from body */
            font-size: 80px;
            color: #D4AF37; /* Gold */
            margin: 20px 0;
            font-weight: 400;
        }

        .date-numeric {
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 2px;
            margin-top: 10px;
            color: white;
            /* font-family: 'Pinyon Script', cursive; Inherited from body */
        }
        
        .event-time {
             font-size: 32px;
             font-weight: 600;
             margin-top: 5px;
             color: white; 
             /* Inherits Pinyon Script */
        }

        .footer-location {
            position: absolute;
            bottom: -250px; /* Adjust based on flex centering spacing */
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1.5px;
            color: white;
            /* font-family: 'Pinyon Script', cursive; Inherited from body */
        }
        
        /* Adjust layout spacing */
        .spacer {
            height: 50px;
        }
      </style>
    </head>

    <body>
      <div class="overlay"></div>
      
      <div class="content">
        <div class="logo-container">
            <img src="${eventLogo}" class="logo" alt="Logo" />
        </div>

        <div class="main-title">${hostingFamily}</div>

        <div class="subtitle-wrapper">
            <div class="line"></div>
            <div class="subtitle">Let's celebrate</div>
            <div class="line"></div>
        </div>

        <div class="script-date">on ${weekday}</div>
        
        <div class="date-numeric">${eventDay}</div>
        <div class="event-time">${eventDate}</div> <!-- Added eventDate here -->

        <div class="spacer" style="height: 100px;"></div>

        <div class="date-numeric" style="font-size: 28px;">${location}</div>
      </div>
    </body>
    </html>
  `;
}



app.post("/generate-pdf", async (req, res) => {
  console.log("Received /generate-pdf request");
  try {
    console.log("Body:", JSON.stringify(req.body).substring(0, 100) + "...");
    const data = req.body;
    const { templateId } = data;

    let html = "";

    if (templateId === "birthday") {
      const publicDir = path.join(__dirname, "public");
      const birthdayBgBase64 = fs.readFileSync(
        path.join(publicDir, "background.png"),
        "base64"
      );
      // NOTE: User file name has a space: "birthday logo.png"
      const birthdayLogoBase64 = fs.readFileSync(
        path.join(publicDir, "birthday logo.png"),
        "base64"
      );

      html = getBirthdayTemplate({
        ...data,
        birthdayBg: `data:image/png;base64,${birthdayBgBase64}`,
        birthdayLogo: `data:image/png;base64,${birthdayLogoBase64}`
      });
    }
    else if (templateId === "event") {
      const publicDir = path.join(__dirname, "public");
      const eventBgBase64 = fs.readFileSync(
        path.join(publicDir, "event-bg.png"),
        "base64"
      );
      const eventLogoBase64 = fs.readFileSync(
        path.join(publicDir, "event-logo.png"),
        "base64"
      );

      html = getEventTemplate({
        ...data,
        eventBg: `data:image/png;base64,${eventBgBase64}`,
        eventLogo: `data:image/png;base64,${eventLogoBase64}`
      });
    }
    else if (templateId === "kwibuka") {
      const publicDir = path.join(__dirname, "public");

      const imenaBase64 = fs.readFileSync(
        path.join(publicDir, "IMENA.png"),
        "base64"
      );

      const kwibukaBase64 = fs.readFileSync(
        path.join(publicDir, "kwibuka.png"),
        "base64"
      );

      const kwibukaBgBase64 = fs.readFileSync(
        path.join(publicDir, "kwibuka-bg.jpeg"),
        "base64"
      );

      html = getKwibukaTemplate({
        ...data,
        imenaLogo: `data:image/png;base64,${imenaBase64}`,
        kwibukaIcon: `data:image/png;base64,${kwibukaBase64}`,
        kwibukaBg: `data:image/jpeg;base64,${kwibukaBgBase64}`,
      });
    }
    else {
      return res.status(400).json({ error: "Invalid templateId" });
    }

    console.log("Launching Puppeteer with args:", ["--no-sandbox", "--disable-setuid-sandbox"]);
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log("Puppeteer launched successfully");
    } catch (launchError) {
      console.error("Puppeteer launch FAILED:", launchError);
      throw launchError;
    }

    console.log("New Page...");
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 794, height: 1123 });
    await page.setContent(html, { waitUntil: "networkidle2", timeout: 0 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log(`[${new Date().toLocaleString()}] PDF generation complete. Sending response...`);

    // Headers are now handled by cors middleware correctly
    res.header("Content-Type", "application/json");

    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    return res.status(200).json({
      success: true,
      pdfBase64: pdfBase64,
      filename: `${templateId}-invitation.pdf`
    });

  } catch (error) {
    console.error("PDF generation error DETAILED:", error);
    res.status(500).json({ error: "Failed to generate PDF", details: error.message, stack: error.stack });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
