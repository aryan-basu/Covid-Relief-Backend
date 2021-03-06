const express = require("express");
const app=express();
const firebase=require("firebase");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');

const config = {
  apiKey: "AIzaSyBv7tylwD4VmHhXnbH0QVAxfV4xpYI-Slg",
  authDomain: "covid-relief-3a4ad.firebaseapp.com",
  databaseURL: "https://covid-relief-3a4ad-default-rtdb.firebaseio.com",
  projectId: "covid-relief-3a4ad",
  storageBucket: "covid-relief-3a4ad.appspot.com",
  messagingSenderId: "267147448708",
  appId: "1:267147448708:web:ed99ad0e6e308a8f2dcdd1",
  measurementId: "G-Q0R9RM82NF"
};

// Initialize Firebase
firebase.initializeApp(config);

app.get('/',async(req,res)=>{
  res.send("Welcome to the backend")
 
})

 app.get('/download',async(req,res) => {
//console.log(daydata.length);
firebase.database().ref('/data').on('value', (snapshot) => {
  // console.log(snapshot.val())
  const address=snapshot.val().Address[0];
  const name=snapshot.val().Name
  
createInvoice(res,name,address)
 // tempgenralinfo.push(snapshot.val());
 // console.log(tempdata[0][0].Dish);
})



  
  });
    const PORT=process.env.PORT||8000






app.listen(PORT,()=>{
 /* firebase.database().ref('temp/foodinfo').on('value', (snapshot) => {
    tempdata.push(snapshot.val());
  })
  firebase.database().ref('temp/generalinfo').on('value', (snapshot) => {
   

    tempgenralinfo.push(snapshot.val());
   // console.log(tempdata[0][0].Dish);
  })

  firebase.database().ref(`coustmers/${fecha}`).orderByChild("genralinfo").on("value", function(snapshot) {
    snapshot.forEach(snap=>{
      var position = daydata.indexOf(snap.val());
     // console.log(position);
      if (!~position)
      daydata.push({Name:snap.val().genralinfo.Name,Phone:snap.val().genralinfo.Phone,SeatNumber:snap.val().genralinfo.SeatNumber,Payement:snap.val().genralinfo.Payement,TotalPrice:snap.val().genralinfo.Totalprice});
  // More code but we don't need to see it here
    })

  })
  */

  console.log(`listening to the port number at ${PORT}`);
})

function  createInvoice(res,name,address) {
const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
});

// Helper to move to next line
function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}

doc.pipe(res);

doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

doc.fontSize(10);

// Margin
const distanceMargin = 18;

doc
  .fillAndStroke('#FF0000')
  .lineWidth(20)
  .lineJoin('round')
  .rect(
    distanceMargin,
    distanceMargin,
    doc.page.width - distanceMargin * 2,
    doc.page.height - distanceMargin * 2,
  )
  .stroke();

// Header
const maxWidth = 140;
const maxHeight = 70;

doc.image('assets/heart.png', doc.page.width / 2 - maxWidth / 2, 60, {
  fit: [maxWidth, maxHeight],
  align: 'center',
});

jumpLine(doc, 5)

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('COVID RELIEF', {
    align: 'center',
  });

jumpLine(doc, 2)

// Content
doc
  .font('fonts/NotoSansJP-Regular.otf')
  .fontSize(16)
  .fill('#021c27')
  .text('CERTIFICATE OF APPRECIATION', {
    align: 'center',
  });

jumpLine(doc, 1)

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Present to', {
    align: 'center',
  });



jumpLine(doc, 1)
doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(24)
  .fill('#021c27')
  .text(`${name}`, {
    align: 'center',
  });
  jumpLine(doc, 1)

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(`${address}`, {
    align: 'center',
  });
  jumpLine(doc, 1)

  doc
    .font('fonts/NotoSansJP-Light.otf')
    .fontSize(14)
    .fill('#021c27')
    .text('In Recognition of your donation to help the victims of the Covid-19 ', {
      align: 'center',
    });


jumpLine(doc, 7)

doc.lineWidth(1);

// Signatures
const lineSize = 174;
const signatureHeight = 390;

doc.fillAndStroke('#021c27');
doc.strokeOpacity(0.2);

const startLine1 = 128;
const endLine1 = 128 + lineSize;
doc
  .moveTo(startLine1, signatureHeight)
  .lineTo(endLine1, signatureHeight)
  .stroke();

const startLine2 = endLine1 + 32;
const endLine2 = startLine2 + lineSize;
doc
  .moveTo(startLine2, signatureHeight)
  .lineTo(endLine2, signatureHeight)
  .stroke();

const startLine3 = endLine2 + 32;
const endLine3 = startLine3 + lineSize;
doc
  .moveTo(startLine3, signatureHeight)
  .lineTo(endLine3, signatureHeight)
  .stroke();

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Nidhi garg', startLine1, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Director', startLine1, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('ARYAN BASU', startLine2, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Student', startLine2, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Aryan Sharma', startLine3, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Student', startLine3, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

jumpLine(doc, 4);

// Validation link
const link =
  'https://validate-your-certificate.hello/validation-code-here';

const linkWidth = doc.widthOfString(link);
const linkHeight = doc.currentLineHeight();

doc
  .underline(
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight,
    { color: '#021c27' },
  )
  .link(
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight,
    link,
  );

/*doc
  .font('fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(
    link,
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight
  );
*/
// Footer
const bottomHeight = doc.page.height - 100;

doc.image('assets/seal.png', doc.page.width / 2 - 30, bottomHeight, {
  fit: [60, 60],
});

doc.end();
}
