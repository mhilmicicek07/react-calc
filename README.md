# 🧮 React Calculator Uygulaması  

Bu proje, kullanıcıların temel matematiksel işlemleri gerçekleştirebileceği **modern bir React tabanlı hesap makinesi uygulamasıdır.**  
Uygulama, sade ama işlevsel bir arayüz sunar ve hem **fareyle tıklama** hem de **klavye (numpad)** üzerinden kullanım desteği sağlar.  

---

## 🚀 Özellikler  

- ✅ **Toplama, çıkarma, çarpma, bölme** gibi temel aritmetik işlemler.  
- ⌨️ **Klavye desteği:** Numpad veya klavye tuşlarıyla doğrudan işlem yapabilme.  
- 🖱️ **Fare desteği:** Butonlara tıklayarak giriş yapma.  
- 💡 **Tuş vurgulama (highlight):** Basılan tuşun kısa süreli vurgulanması ile görsel geri bildirim.  
- 🧹 **AC (All Clear)** ve **DEL (Delete)** fonksiyonları ile ekran temizleme ve son haneyi silme.  
- 💬 **Gerçek zamanlı işlem akışı:** Önceki işlem, geçerli sayı ve seçili operatörün ekranda gösterilmesi.  
- 💻 **Modern arayüz:** React ve CSS kullanılarak oluşturulmuş minimalist tasarım.  

---

## 🧩 Kullanılan Teknolojiler  

| Teknoloji | Rolü |
|------------|------|
| **React.js (Vite)** | Uygulamanın temel iskeleti ve bileşen yapısı. |
| **JavaScript (ES6+)** | Hesaplama mantığı, event handling ve state yönetimi. |
| **useReducer Hook** | Uygulama durumunu yönetmek için Redux benzeri yapı. |
| **CSS3** | Uygulama arayüzü, grid yapısı ve tuş animasyonları. |

---

## 📂 Proje Dosya Yapısı  

📁 react-calc  
├── 📄 App.js  
├── 📄 App.css  
├── 📁 Components  
│ ├── 📄 DigitButton.js  
│ └── 📄 OperationButton.js  
└── 📄 README.md  

---

## ⚙️ Kurulum ve Çalıştırma  

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/mhilmicicek07/react-calc.git
Proje klasörüne geçin:


cd react-calc
Gerekli bağımlılıkları yükleyin:


npm install
Uygulamayı başlatın:


npm start
Tarayıcıda şu adresi açın:
👉 http://localhost:3000

Artık hesap makinesini hem fareyle hem de klavye numpad’iyle test edebilirsiniz! 🎉

🧠 Teknik Açıklama
Uygulama, useReducer hook'u ile global state yönetimini sağlar.
Her tuş etkileşimi bir ACTIONS tipi üzerinden yönlendirilir:

ADD_DIGIT → Yeni rakam ekler

CHOOSE_OPERATION → İşlem türünü belirler (+, -, *, /)

EVALUATE → Hesaplamayı gerçekleştirir

DEL → Son girilen rakamı siler

AC → Tüm ekranı sıfırlar

Ayrıca useEffect ile klavye olayları (keydown) dinlenir.
Kullanıcı bir tuşa bastığında, hem işlem gerçekleştirilir hem de ilgili buton kısa süreli olarak aktif (highlight) hale gelir.

🎨 Arayüzden Görüntü
Kullanıcı dostu, basit ve odaklı bir tasarım:

Üst bölümde önceki işlem + operatör + mevcut sayı görünür.

Alt bölümde sayısal ve işlemsel butonlar grid düzeninde yer alır.

= tuşu ve AC / DEL butonları vurgulu biçimde tasarlanmıştır.

👨‍💻 Geliştirici
Mehmet Hilmi Çiçek
💼 Full Stack Web Developer
📍 Geislingen an der Steige
💬 “Basit ama tutarlı kod, karmaşık olandan her zaman üstündür.”

🪪 Lisans
Bu proje açık kaynaklıdır.
Dilerseniz kodu inceleyebilir, öğrenme amaçlı kopyalayabilir veya kendi projelerinizde uyarlayabilirsiniz.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
