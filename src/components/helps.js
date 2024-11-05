import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../../config.json');

const Helps = {
    title: "**Lệnh Bot**",
    help: `===========================
**Danh sách lệnh**
===========================
    
> **${config.prefix}food**: __*Món ăn ngẫu nhiên.*__
> **${config.prefix}qr <nội dung>**: __*Tạo mã QR.*__
> **${config.prefix}help**: __*Thông tin về Bot.*__
> **Tag BOT**: __*Để hỏi AI.*__
    
    **A custom Bot created by [Kaven](https:/www.facebook.com/KavenZohar)**`
};

export default Helps;