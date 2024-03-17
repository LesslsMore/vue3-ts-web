import axios from 'axios'

async function tencent(id) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3300/user/songlist?id=${id}`,
        headers: { }
      };

    let dat = []

    await axios.request(config)
    .then((response) => {
        let l = response.data['data']['list']
        // console.log(l)
        
        l.forEach(el => {
            let name = el['diss_name']
            let id = el['tid']
            let tmp =`<option value="${id}">${name}</option>`
            // console.log(tmp)
            if (id !== 0){
              dat.push({
                id: id,
                name: name
              })
            }
          });
    })
    .catch((error) => {
    console.log(error);
    });
    return dat
}

export default tencent