import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../../config.json');

export const Help = {
    title: "**Lệnh Bot**",
    help: `===========================
**Đây là tất cả các lệnh của Bot và hướng dẫn sử dụng Bot**
===========================
    
> **${config.prefix}food**: __*Bot sẽ chọn cho bạn 1 món ăn ngẫu nhiên.*__
> **${config.prefix}qr <nội dung>**: __*Tạo mã QR.*__
> **${config.prefix}help**: __*Thông tin về Bot.*__
    
    **A custom Bot created by [Kaven](https:/www.facebook.com/KavenZohar)**`
};