var JSSoup = require('jssoup').default;
const axios = require('axios');

const url = 'http://{IP}/.hidden/'
var README_LIST = []

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const GetReadmeFiles = async (url) => {
    try {
        var res = await axios.get(url)
        var soup = new JSSoup(res.data);
        var tags = soup.findAll('a')
        for (var i = 0; i < tags.length; i++) {
            await sleep(800)
            var a = tags[i]
            var link = a.contents[0]._text
            if (link.substring(0, 2) === '..') true
            else if (link.slice(-1) === '/') GetReadmeFiles(url + link)
            else {
                var res2 = await axios.get(url + link)
                if (README_LIST.indexOf(res2.data) === -1) {
                    README_LIST.push(res2.data)
                    console.log({ url: url + link, content: res2.data })
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

GetReadmeFiles(url)