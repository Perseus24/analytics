import puppeteer from 'puppeteer';

export async function GET() {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // navigate
        await page.goto('https://manilatimes.net/');
        const text = await page.$$eval('a', elements => {
            return elements.map(e => {
                if(e.innerText.trim() === ""){
                    return null;
                } else {
                    return e.innerText.trim();
                }
            }).filter(text => text !== null);
        });

        const combinedTexts = text.join(" ").toLowerCase();
        const words = combinedTexts.split(/\s+/); // split into spaces
        const uniqueWords = [...new Set(words)]; // remove duplicates



        await browser.close();
        return new Response(JSON.stringify({ words, uniqueWords }), { status: 200 });
    } catch (e) {
        console.error(e);
    }
}