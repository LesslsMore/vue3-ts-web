// const { createClient } = require("webdav");


// Get directory contents
// const directoryItems = await client.getDirectoryContents("/");
//
// console.log(directoryItems)

// 列出目录中的文件
async function listDirectory() {
    try {
        const directoryItems = await client.getDirectoryContents('/ali_o/30-Interest/1-Music');
        console.log('Directory contents:', directoryItems);
    } catch (error) {
        console.error('Error listing directory:', error);
    }
}

listDirectory()

async function getFileDownloadLink() {
    const downloadLink = client.getFileDownloadLink("/ali_o/30-Interest/1-Music/柯立可 - 我多想说再见啊（星尘Infinity）.mp3");
    console.log(downloadLink)
}
getFileDownloadLink()
