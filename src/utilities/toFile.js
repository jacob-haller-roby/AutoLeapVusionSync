import fs from "fs";

export const toFile = (content) => {
    fs.mkdirSync('results', { recursive: true });

    fs.writeFile(`results/output-${new Date().getTime()}.json`, JSON.stringify(content), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('file written');
        }
    })
}