var pdfspin = require('pdfspin');
var fs = require('fs');
// Use and chain any of these commands...
var pdf = pdfspin('input.pdf').crop(170, 23,255, 350) // left, bottom, right, top

// Join multiple files.
// var pdfA = pdfspin('1.pdf'), pdfB = pdfspin('2.pdf'), pdfC = pdfspin('3.pdf');
// pdfspin.join(pdfA.page(1), pdfB, pdfC.pages(5, 10)).deflate().pdfStream()...
// or
// var docs= [pdfA.page(1), pdfB, pdfC.pages(5, 10)];
// pdfspin.join(docs).deflate().pdfStream()...

// And output data as streams.
pdf.pdfStream().pipe(fs.createWriteStream('output.pdf')); // PDF of compiled output
//pdf.pngStream(300).pipe(fs.createWriteStream('out-page1.png')); // PNG of first page at 300 dpi
//pdf.textStream().pipe(process.stdout); // Individual text strings