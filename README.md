#### O'quv Markaz Boshqaruv Tizimi

Bu loyiha Laravel va React texnologiyalaridan foydalanib yaratilgan zamonaviy o'quv markaz boshqarish tizimi.

## Texnologiyalar

- **Backend**: Laravel 12
- **Frontend**: React.js + TypeScript
- **Ma'lumotlar bazasi**: SQLite/MySQL
- **API**: RESTful API
- **UI Framework**: Tailwind CSS + shadcn/ui
- **State Management**: Inertia.js
- **Development Tools**: 
  - Vite
  - ESLint
  - Prettier
  - TypeScript
  - Pest (Testing)

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

- PHP >= 8.2
- Node.js >= 16.x
- SQLite/MySQL >= 5.7
- Composer
- npm yoki yarn

### Backend o'rnatish

```bash
# Repozitoriyani klonlash
git clone https://github.com/alsheroziy/training-center.git

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
# Frontend paketlarini o'rnatish
npm install

# Development serverni ishga tushirish
npm run dev
```

## Development

Loyihani development rejimida ishga tushirish uchun quyidagi buyruqni ishlatish mumkin:

```bash
# Barcha development serverni ishga tushirish
composer dev

# Yoki alohida
php artisan serve
npm run dev
```

## Testing

Loyihani test qilish uchun quyidagi buyruqlarni ishlatish mumkin:

```bash
# Barcha testlarni ishga tushirish
php artisan test

# Yoki Pest orqali
./vendor/bin/pest
```

## Kod formati

Kod formati va linting uchun quyidagi buyruqlarni ishlatish mumkin:

```bash
# Frontend kodini formatlash
npm run format

# Frontend kodini tekshirish
npm run format:check
npm run lint

# Backend kodini formatlash
composer pint
```

## Ishga tushirish

1. Backend server `http://localhost:8000` portida ishlaydi
2. Frontend server `http://localhost:3000` portida ishlaydi

## Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatilgan. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

## Muallif

- Shehroz

## Bog'lanish

Savollar va takliflar uchun quyidagi manzilga murojaat qiling:
- Telegram @alsheroziy
