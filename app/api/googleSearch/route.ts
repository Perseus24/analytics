import puppeteer from 'puppeteer';

export async function GET() {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // navigate
        await page.goto('https://data-analytics-one.vercel.app/');

        const divCount = await page.$$eval('div', divs => divs.length);


        await browser.close();
        return new Response(JSON.stringify({ divCount }), { status: 200 });
    } catch (e) {
        console.error(e);
    }
}