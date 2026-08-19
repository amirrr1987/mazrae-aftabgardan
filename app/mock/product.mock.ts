import type { IProduct } from "~/models/product.model"

/** تصویر deterministic از picsum.photos بر اساس seed عددی */
function pic(seed: number, w = 400, h = 400) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export const productMock: IProduct[] = [
  { id: 1, createAt: new Date(), updateAt: new Date(), name: "قهوه اسپرسو", slug: "ghahve-espresso", description: "قهوه اسپرسو با عطر و طعم خاص، مناسب برای عاشقان قهوه قوی", logo: pic(10), images: [pic(10), pic(11)], categoryId: 1, brandId: 1, isActive: true, price: 85000, discountPrice: 75000 },
  { id: 2, createAt: new Date(), updateAt: new Date(), name: "قهوه فرانسه", slug: "ghahve-france", description: "قهوه فرانسه مناسب برای صبحانه و لحظات آرامش", logo: pic(20), images: [pic(20), pic(21)], categoryId: 1, brandId: 1, isActive: true, price: 95000 },
  { id: 3, createAt: new Date(), updateAt: new Date(), name: "قهوه ترک", slug: "ghahve-turk", description: "قهوه ترک اصیل با دانه‌های برشته ویژه", logo: pic(30), images: [pic(30), pic(31)], categoryId: 1, brandId: 1, isActive: true, price: 70000 },
  { id: 4, createAt: new Date(), updateAt: new Date(), name: "شکلات تلخ", slug: "shokolat-talkh", description: "شکلات تلخ ۷۵ درصد با کاکائو اعلا", logo: pic(40), images: [pic(40), pic(41)], categoryId: 2, brandId: 2, isActive: true, price: 45000, discountPrice: 38000 },
  { id: 5, createAt: new Date(), updateAt: new Date(), name: "شکلات شیری", slug: "shokolat-shiri", description: "شکلات شیری خوشمزه با طعم کرمی", logo: pic(50), images: [pic(50), pic(51)], categoryId: 2, brandId: 3, isActive: true, price: 40000 },
  { id: 6, createAt: new Date(), updateAt: new Date(), name: "آبنبات چوبی", slug: "abnabat-choobi", description: "آبنبات چوبی رنگی و خوشمزه برای کودکان", logo: pic(60), images: [pic(60), pic(61)], categoryId: 3, brandId: 4, isActive: true, price: 15000 },
  { id: 7, createAt: new Date(), updateAt: new Date(), name: "آبنبات نعناع", slug: "abnabat-nana", description: "آبنبات با طعم نعناع خنک و تازه", logo: pic(70), images: [pic(70), pic(71)], categoryId: 3, brandId: 5, isActive: true, price: 12000 },
  { id: 8, createAt: new Date(), updateAt: new Date(), name: "پاستیل خرسی", slug: "pastil-khersi", description: "پاستیل خرسی نرم و خوشمزه", logo: pic(80), images: [pic(80), pic(81)], categoryId: 4, brandId: 6, isActive: true, price: 25000, discountPrice: 20000 },
  { id: 9, createAt: new Date(), updateAt: new Date(), name: "پاستیل میوه‌ای", slug: "pastil-miveei", description: "پاستیل با طعم انواع میوه‌های تازه", logo: pic(90), images: [pic(90), pic(91)], categoryId: 4, brandId: 7, isActive: true, price: 28000 },
  { id: 10, createAt: new Date(), updateAt: new Date(), name: "قهوه فوری", slug: "ghahve-fori", description: "قهوه فوری برای تهیه سریع در هر مکانی", logo: pic(100), images: [pic(100), pic(101)], categoryId: 1, brandId: 8, isActive: true, price: 60000 },
  { id: 11, createAt: new Date(), updateAt: new Date(), name: "شکلات مغزدار", slug: "shokolat-maghdar", description: "شکلات با مغز فندق و بادام درجه یک", logo: pic(110), images: [pic(110), pic(111)], categoryId: 2, brandId: 9, isActive: true, price: 65000, discountPrice: 55000 },
  { id: 12, createAt: new Date(), updateAt: new Date(), name: "شکلات سفید", slug: "shokolat-sefid", description: "شکلات سفید شیرین و لطیف", logo: pic(120), images: [pic(120), pic(121)], categoryId: 2, brandId: 3, isActive: true, price: 42000 },
  { id: 13, createAt: new Date(), updateAt: new Date(), name: "آبنبات میوه‌ای", slug: "abnabat-miveei", description: "آبنبات با طعم انواع میوه‌های گرمسیری", logo: pic(130), images: [pic(130), pic(131)], categoryId: 3, brandId: 10, isActive: true, price: 18000 },
  { id: 14, createAt: new Date(), updateAt: new Date(), name: "آبنبات کاکائویی", slug: "abnabat-kakaeii", description: "آبنبات با طعم کاکائو غنی", logo: pic(140), images: [pic(140), pic(141)], categoryId: 3, brandId: 11, isActive: true, price: 20000 },
  { id: 15, createAt: new Date(), updateAt: new Date(), name: "پاستیل ترش", slug: "pastil-torsh", description: "پاستیل ترش و هیجان‌انگیز", logo: pic(150), images: [pic(150), pic(151)], categoryId: 4, brandId: 12, isActive: true, price: 22000 },
  { id: 16, createAt: new Date(), updateAt: new Date(), name: "پاستیل هندوانه", slug: "pastil-hendavaneh", description: "پاستیل با طعم هندوانه تابستانی", logo: pic(160), images: [pic(160), pic(161)], categoryId: 4, brandId: 7, isActive: true, price: 26000, discountPrice: 22000 },
  { id: 17, createAt: new Date(), updateAt: new Date(), name: "قهوه لاته", slug: "ghahve-latte", description: "قهوه لاته نرم و خوش‌عطر با شیر بخار", logo: pic(170), images: [pic(170), pic(171)], categoryId: 1, brandId: 1, isActive: true, price: 110000 },
  { id: 18, createAt: new Date(), updateAt: new Date(), name: "قهوه کاپوچینو", slug: "ghahve-cappuccino", description: "قهوه کاپوچینو ایتالیایی با فوم کامل", logo: pic(180), images: [pic(180), pic(181)], categoryId: 1, brandId: 8, isActive: true, price: 105000, discountPrice: 90000 },
  { id: 19, createAt: new Date(), updateAt: new Date(), name: "شکلات پرتقالی", slug: "shokolat-portoghali", description: "شکلات با طعم پرتقال طبیعی", logo: pic(190), images: [pic(190), pic(191)], categoryId: 2, brandId: 2, isActive: true, price: 48000 },
  { id: 20, createAt: new Date(), updateAt: new Date(), name: "شکلات نعنایی", slug: "shokolat-naanaie", description: "شکلات با طعم نعناع تازه و خنک", logo: pic(200), images: [pic(200), pic(201)], categoryId: 2, brandId: 5, isActive: true, price: 46000, discountPrice: 40000 },
]
