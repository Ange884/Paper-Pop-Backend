const express = require("express");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

function getBirthdayTemplate(data) {
  const { name, message, image } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Great+Vibes&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #45291B;
          font-family: 'Playfair Display', serif;
          color: white;
          width: 794px;
          height: 1123px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .banner-container {
          position: absolute;
          top: -20px;
          left: -5%;
          width: 110%;
          display: flex;
          justify-content: center;
          gap: 2px;
          z-index: 1;
        }

        .flag {
          width: 70px;
          height: 100px;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
          margin: 0 2px;
        }

        .flag:nth-child(1) {
          background-color: #F1C98E;
        }

        .header {
          margin-top: 130px;
          text-align: center;
          z-index: 10;
        }

        .header .happy {
          font-size: 36px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: -15px;
        }

        .header .birthday {
          font-family: 'Great Vibes', cursive;
          font-size: 110px;
          margin: 0;
          line-height: 1;
        }

        .header .recipient-name {
          font-family: 'Great Vibes', cursive;
          font-size: 60px;
          color: white;
          margin-top: -15px;
        }

        .photo-frame {
          margin-top: 25px;
          background: white;
          padding: 18px;
          padding-bottom: 70px;
          transform: rotate(-1deg);
          width: 440px;
          z-index: 5;
        }

        .photo-frame img {
          width: 100%;
          height: 480px;
          object-fit: cover;
        }

        .personal-message {
          margin-top: 40px;
          width: 80%;
          text-align: center;
          font-size: 22px;
          font-style: italic;
        }
      </style>
    </head>

    <body>
      <div class="header">
        <div class="happy">Happy</div>
        <h1 class="birthday">Birthday</h1>
        <div class="recipient-name">${name}</div>
      </div>

      <div class="photo-frame">
        <img src="${image}" alt="Moment">
      </div>

      <div class="personal-message">${message}</div>
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
          ${
            date
              .split(/[/\-.]/)
              .map(
                (part, i, arr) => `
                  <span>${part.trim()}</span>
                  ${
                    i < arr.length - 1
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
    eventDate,
    eventDay,
    hostingFamily,
    location,
    imenaLogo,
    beigeBg
  } = data;

  // Parse eventDay field (e.g., "7 May 2025" or "12th January 2026")
  const dateParts = eventDay.trim().split(/\s+/);

  // Handle formats like "7 May 2025" or "7th May 2025"
  const dayRaw = dateParts[0] || "1";
  const day = dayRaw.replace(/\D/g, "") || "1"; // remove st/nd/rd/th
  const month = (dateParts[1] || "January").toUpperCase();
  const year = dateParts[2] || "2025";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700&family=Playfair+Display:ital,wght@0,400;1,400&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: url('${beigeBg}') center center / cover no-repeat;
          font-family: 'Crimson Pro', serif;
          color: #5D707C;
          width: 794px;
          height: 1123px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .card-arch {
          background: white;
          width: 620px;
          height: 850px;
          border-radius: 310px 310px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 40px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .logo {
          width: 350px;
          margin-bottom: 10px;
        }

        .event-title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 64px;
          line-height: 1;
          margin: 0 0 25px 0;
          color: #5D707C;
        }
        .event-title span {
          display: block;
        }

        .hosted-by {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 16px;
          margin-bottom: 35px;
          font-weight: 400;
          color: #5D707C;
        }

        .date-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: 80%;
          margin-bottom: 30px;
        }

        .date-divider {
          height: 1px;
          background: #5D707C;
          flex: 1;
          opacity: 0.8;
          margin: 4px 0;
        }

        .month-year {
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-size: 14px;
          padding: 0 10px;
        }

        .day-big {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 80px;
          color: #5D707C;
          line-height: 0.8;
        }

        .miss-out {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .location-text {
          font-size: 20px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .courtesy {
          font-style: italic;
          font-size: 16px;
          opacity: 0.8;
        }
      </style>
    </head>

    <body>
      <div class="card-arch">
        <img src="${imenaLogo}" class="logo" />

        <h1 class="event-title">
          <span>${eventDay}</span>
          <span>Meetup</span>
        </h1>

        <div class="hosted-by">
          HOSTED BY ${hostingFamily.toUpperCase()}
        </div>

        <div class="date-section">
          <div style="display:flex; flex-direction:column; flex:1; align-items:center;">
            <div class="date-divider"></div>
            <div class="month-year">${year}</div>
            <div class="date-divider"></div>
          </div>

          <div class="day-big">${day}</div>

          <div style="display:flex; flex-direction:column; flex:1; align-items:center;">
            <div class="date-divider"></div>
            <div class="month-year">${month}</div>
            <div class="date-divider"></div>
          </div>
        </div>

        <div class="miss-out">Don't miss out</div>
        <div class="location-text">${location}</div>
        <div class="courtesy">A courtesy of Imena family</div>
      </div>
    </body>
    </html>
  `;
}



app.post("/generate-pdf", async (req, res) => {
  try {
    const data = req.body;
    const { templateId } = data;

    let html = "";

    if (templateId === "birthday") {
      html = getBirthdayTemplate(data);
    } 
    else if (templateId === "event") {
  html = getEventTemplate(data);
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
const browser = await puppeteer.launch({
  headless: true, // "new" also works, but true is fine
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome-stable',
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});


    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 });
    await page.setContent(html, {  waitUntil: "networkidle2", timeout: 0 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${templateId}-invitation.pdf"`,
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});