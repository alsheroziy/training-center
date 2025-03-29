# O'quv Markaz Boshqaruv Tizimi

Bu loyiha Laravel va React texnologiyalaridan foydalanib yaratilgan zamonaviy o'quv markaz boshqarish tizimi.

## Texnologiyalar

- **Backend**: Laravel 12
- **Frontend**: React.js
- **Ma'lumotlar bazasi**: MySQL
- **API**: RESTful API

## Tizimning asosiy funksiyalari

- 👥 O'quvchilar boshqaruvi
- 👨‍🏫 O'qituvchilar boshqaruvi
- 📚 Kurslar boshqaruvi
- 📅 Dars jadvali boshqaruvi
- 💰 To'lov tizimlari
- 📊 Hisobotlar va statistika
- 🔐 Foydalanuvchilar autentifikatsiyasi va avtorizatsiyasi

## O'rnatish

### Talablar

- PHP >= 8.1
- Node.js >= 16.x
- MySQL >= 5.7
- Composer
- npm yoki yarn

### Backend o'rnatish

```bash
# Repozitoriyani klonlash
git clone [repository-url]

# Kerakli PHP paketlarini o'rnatish
composer install

# .env faylini yaratish
cp .env.example .env

# Ma'lumotlar bazasini sozlash
php artisan key:generate
php artisan migrate

# Serverni ishga tushirish
php artisan serve
```

### Frontend o'rnatish

```bash
# Frontend papkasiga o'tish
cd frontend

# Kerakli npm paketlarini o'rnatish
npm install

# Development serverni ishga tushirish
npm run dev
```

## Ishga tushirish

1. Backend server `http://localhost:8000` portida ishlaydi
2. Frontend server `http://localhost:3000` portida ishlaydi

## Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatilgan. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

## Muallif

- [Muallif ismi]

## Bog'lanish

Savollar va takliflar uchun quyidagi manzilga murojaat qiling:
- Email: [email]
- Telefon: [telefon]
