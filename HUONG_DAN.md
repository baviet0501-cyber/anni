# 📝 HƯỚNG DẪN UPLOAD LÊN GITHUB VÀ TẠO TRANG WEB

## Bước 1: Chuẩn bị icon cho app

Vì không tạo được icon tự động, bạn cần tạo 2 file icon:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

**Cách tạo dễ nhất:**
1. Vào https://favicon.io/favicon-generator/
2. Chọn emoji ❤️ hoặc 💕
3. Background color: #FF6B9D
4. Tải về và đổi tên thành `icon-192.png` và `icon-512.png`
5. Copy vào thư mục `e:\anni\`

## Bước 2: Tạo GitHub Repository

### 2.1. Tạo tài khoản GitHub (nếu chưa có)
- Truy cập: https://github.com
- Click "Sign up" và tạo tài khoản

### 2.2. Tạo Repository mới
1. Đăng nhập GitHub
2. Click nút "+" góc trên phải → "New repository"
3. Đặt tên repository: `love-counter` (hoặc tên bạn thích)
4. Chọn "Public"
5. **KHÔNG** tick "Add a README file" (vì đã có rồi)
6. Click "Create repository"

## Bước 3: Upload code lên GitHub

### Cách 1: Upload qua GitHub Web Interface (Dễ nhất)

1. Vào repository vừa tạo
2. Click "uploading an existing file"
3. Kéo thả TẤT CẢ các file trong `e:\anni\` vào:
   - index.html
   - style.css
   - script.js
   - manifest.json
   - README.md
   - photo1.jpg
   - photo2.png
   - icon-192.png (nếu đã tạo)
   - icon-512.png (nếu đã tạo)
4. Viết commit message: "Initial commit - Love counter"
5. Click "Commit changes"

### Cách 2: Dùng Git Command Line

```bash
# Mở PowerShell/Command Prompt, cd vào thư mục
cd e:\anni

# Khởi tạo git
git init

# Thêm remote
git remote add origin https://github.com/[username]/[repo-name].git

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - Love counter"

# Push lên GitHub
git branch -M main
git push -u origin main
```

## Bước 4: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click tab "Settings"
3. Bên trái, click "Pages"
4. Trong "Source", chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Đợi 1-2 phút
7. Trang web sẽ có link: `https://[username].github.io/[repo-name]/`

## Bước 5: Thêm vào màn hình chính Android

### 5.1. Mở trang web trên Chrome Android
- Vào link: `https://[username].github.io/[repo-name]/`

### 5.2. Add to Home Screen
1. Nhấn menu (3 chấm dọc) góc trên phải
2. Chọn "Add to Home screen" hoặc "Thêm vào màn hình chính"
3. Đặt tên: "Vjet ❤️ Mì" (hoặc tên bạn thích)
4. Nhấn "Add" hoặc "Thêm"

### 5.3. Sử dụng như app
- Icon sẽ xuất hiện trên màn hình chính
- Nhấn vào để mở như một ứng dụng độc lập
- Không có thanh địa chỉ Chrome
- Toàn màn hình như app thật!

## 🎯 Kiểm tra

✅ Trang web hoạt động: https://[username].github.io/[repo-name]/
✅ Có thể Add to Home Screen
✅ Mở như app độc lập
✅ Ảnh hiển thị đúng
✅ Đếm ngày hoạt động
✅ Kéo thả ảnh được

## 🔧 Cập nhật sau này

Muốn sửa code:
1. Sửa file trong `e:\anni\`
2. Vào GitHub repository
3. Click vào file muốn sửa
4. Click icon bút chì (Edit)
5. Sửa code
6. Commit changes
7. Đợi 1-2 phút → Trang web tự động cập nhật!

## 💡 Tips

- Nếu không có icon, app vẫn hoạt động bình thường
- GitHub Pages miễn phí hoàn toàn
- Có thể share link cho người khác
- Dữ liệu được cache trên điện thoại nên load rất nhanh

## ❤️ Chúc bạn thành công!
