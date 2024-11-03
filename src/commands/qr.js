import fs from 'fs';
import qr from 'qr-image';

async function QR(text) {
    const qr_png = qr.image(text, { type: 'png' });
    const qrPath = './qr.png';
    const qrStream = fs.createWriteStream(qrPath);
    
    return new Promise((resolve, reject) => {
      qrStream.on('finish', resolve);
      qrStream.on('error', reject);
      qr_png.pipe(qrStream);
    });
  }

  export default QR;