const fs = require('fs');

// fs.readFile(__dirname + '/../resource/content.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log(data.toString())
// })

//Promise形式
// const p = new Promise((resolve, reject) => {
//     fs.readFile(__dirname + '/../resource/content.txt', (err, data) => {
//         if (err) {
//             reject(err)
//         }
//         resolve(data)
//     })
// })

// p.then(data=>{
//     console.log(data.toString())
// },err=>{
//     console.log(err)
// })

//封装为函数
function makeReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

makeReadFile(__dirname + '/../resource/content.txt')
    .then(data => {
        console.log(data.toString())
    }, err => {
        console.log(err)
    })