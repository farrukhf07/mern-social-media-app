const fs = require('fs');

const moveFile = (oldPath, newPath)=>{
    return new Promise((resolve, reject)=>{
        fs.rename(oldPath, newPath, (err)=>{
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = moveFile