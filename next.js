import Telegram from 'telegraf/telegram';
import request from 'request';
import cheerio from 'cheerio';

const telegram = new Telegram('5624335999:AAFImjmCT3CUJZaarubyNfvgreJirDpdGWs');

export default async (req, res) => {
    request.post({
        url: 'https://www.generatorslist.com/random/text/random-joke-generator',
        form: {
            numResults: '3',
            jokeType: 'all'
        }
    }, (err, httpResponse, body) => {
        if (err) {
            res.status(500).send('Error fetching jokes');
        } else {
            const $ = cheerio.load(body);
            const jokes = $('.col-sm-12.col-lg-4.mb-4');
            jokes.each((i, elem) => {
                telegram.sendMessage('@funwithchatgpt', $(elem).text());
            });
            res.status(200).send('Jokes sent to Telegram channel');
        }
    });
}
