import { writeFileSync } from "fs";
const API_KEY = "AIzaSyCIRUhEx9k6heHX0nJKzNg2JJCPu5-q4mg";
const targetUrl = "https://www.confeccionesliss.com/";

async function main() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&category=performance&key=${API_KEY}`;
  console.log("Fetching PageSpeed data for mobile...");
  const res = await fetch(apiUrl);
  const data = await res.json();
  writeFileSync("pagespeed-full-response.json", JSON.stringify(data, null, 2));
  console.log("Saved full response to pagespeed-full-response.json");
}

main().catch(console.error);
