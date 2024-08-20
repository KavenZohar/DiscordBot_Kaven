import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../../config.json');

export const Help = {
    title: "**Lệnh Bot**",
    help: `===========================
**Danh sách lệnh**
===========================
    
> **${config.prefix}food**: __*Món ăn ngẫu nhiên.*__
> **${config.prefix}qr <nội dung>**: __*Tạo mã QR.*__
> **${config.prefix}help**: __*Thông tin về Bot.*__
    
    **A custom Bot created by [Kaven](https:/www.facebook.com/KavenZohar)**`
};