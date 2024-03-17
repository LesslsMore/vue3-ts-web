import axios from 'axios'

async function netease(id) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        // url: `http://localhost:3000/user/playlist?uid=${id}`,
        url: `https://netease-cloud-music-api-ten-mu-88.vercel.app/user/playlist?uid=${id}`,
        headers: { }
      };

      let dat = []
      
      await axios.request(config)
      .then((response) => {
      //   console.log(JSON.stringify(response.data));
        let p = response.data['playlist']
        p.forEach(el => {
          let name = el['name']
          let id = el['id']
          let tmp =`<option value="${id}">${name}</option>`
          // console.log(tmp)
          dat.push({
            id: id,
            name: name
          })
        });
      //   console.log(p)
      })
      .catch((error) => {
        console.log(error);
      });

      return dat
}

export default netease