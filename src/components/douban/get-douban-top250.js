import axios from 'axios'

export function getDoubanTop250() {

    const url = 'https://movie.douban.com/top250';

    let urls = []
    let total = 25
    for(let i = 0; i < total; i+=25) {
        urls.push(url + `?start=${i}`)

    }
    console.log(urls)

    urls.forEach(url => {
        let top = parseInt(url.split('=')[1]) + 25
        console.log(top)
        axios.get(url)
            .then(rep => {
                console.log(rep)
            })
            .catch((error) => {
                console.log(error);
            });
    })
}