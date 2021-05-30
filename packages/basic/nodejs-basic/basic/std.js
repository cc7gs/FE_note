#! /Users/wuchen/.nvm/versions/node/v10.16.0/bin/node
"use strict";
var util = require("util");
var path = require("path");
var fs = require("fs");
var zlib = require("zlib");
var Transform = require("stream").Transform;

var getStdin = require("get-stdin");

var args = require("minimist")(process.argv.slice(2), {
    boolean: ["help", "in", "out", "compress", "uncompress"],
    string: ["file"]
})

var OUTFILE = path.relative(__dirname, 'out.txt');

if (process.env.name) {
    console.log(process.env.name, 'name')
}

if (args.help) {
    printHelp()
}
else if (
    args.in ||
    args._.includes('-')
) {
    // getStdin().then(processFile).catch(error)
    processFile(process.stdin)
        .catch(error)
}
else if (args.file) {

    // var contents=fs.readFileSync(path.resolve(args.file))
    // processFile(contents)

    var stream = fs.createReadStream(path.resolve(args.file));
    processFile(stream).then(() => {
        console.log("complete");
    })
        .catch(error)

} else {
    error("Incorrect usage.", true)
}



// ***************

async function processFile(inStream) {
    var outStream = inStream;

    if (args.uncompress) {
        let gunzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gunzipStream)
    }

    var upperStream = new Transform({
        transform(chunk, enc, cb) {
            this.push(chunk.toString().toUpperCase());
            cb();
        }
    })
    outStream = outStream.pipe(upperStream);

    //gzip压缩
    if (args.compress) {
        var gizpStream = zlib.createGzip();
        outStream = outStream.pipe(gizpStream);
        OUTFILE = `${OUTFILE}.gz`
    }

    var targetStream;
    if (args.out) {
        targetStream = process.stdout
    } else {
        targetStream = fs.createWriteStream(OUTFILE);
    }
    outStream.pipe(targetStream);
    await streamComplete(outStream)
}


// function processFile(contents){
//     process.stdout.write(contents)
// }

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log("");
        printHelp();
    }
}
function streamComplete(stream) {
    return new Promise((res) => {
        stream.on('end', res)
    })
}

function printHelp() {
    console.log("std usage:");
    console.log(" std.js  --file={FILENAME}");
    console.log("");
    console.log("--help                 print this help")
    console.log("--file={FILENAME}      process the file")
    console.log("--in, -                process stdin")
    console.log("--out                  process to stdout")
    console.log("--compress             gzip the output")
    console.log("--uncompress           un-gzip the input")

    console.log("")

}
