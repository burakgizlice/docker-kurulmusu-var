### Modül 3: Kendi İmajımızı İnşa Etmek (45 Dakika)

**Ana Tema:** **"Zahmete Son, Otomasyona Başla!"** --- Modül 2'de kopyala-yapıştır ile yaptığımız işi şimdi Docker'a öğretiyoruz.

### 3.1 Neden Kendi İmajımızı İnşa Etmeliyiz? (5 dk)

Arkadaşlar, Modül 2'nin sonunda ne kadar zahmetli bir iş yaptığımızı hatırlayın: Nginx'i çalıştırdık ve `**docker cp**` komutuyla `index.html` dosyamızı **manuel** olarak içine kopyaladık.

Bu bir mühendislik çözümünden çok, geçici bir yama gibiydi.

-   **Sorun Neydi?** Bu yöntem ne tekrarlanabilir ne de profesyoneldi. Uygulamanızda bir değişiklik yaptığınızda, her şeyi yeniden kopyalamak, silmek, durdurmak zorunda kalıyorsunuz. **Zaman kaybı!**
-   Eğer kütüphanede yer bul uygulamamıza bir güncelleme yapsaydık, ve insanların bırakıp gittikleri defter kitaplarını ekleseydik. Her güncellemede aynı işlemi yeni kodumuz için tekrarlamak zorunda kalacaktık.
-   **Çözüm:** Docker'a **tek bir tarif** (yani **Dockerfile**) vererek şunu demeliyiz: "Bu Nginx imajını al, bu dosyaları otomatik olarak içine koy ve sonra bu tarifi **alku_oyun_v2** adıyla kaydet." İşte bu tarif, Docker'daki otomasyonun başlangıcıdır.

![](https://cdn-images-1.medium.com/max/979/1*4l41dki42QzjF4vLPUAtSQ.png)

### 3.2 Dockerfile: İmajın Tarifi (15 dk)

**Dockerfile**, Docker'ın kendi dilinde yazılmış, adım adım talimatlar içeren bir metin dosyasıdır. Tıpkı Python'daki gibi, bu talimatları sırayla okur ve uygular.

![](https://cdn-images-1.medium.com/max/979/1*9004Txf8Qyys3ODgGph2ig.png)

Şimdi basit bir web uygulaması için temel talimatlara ve bunların ne işe yaradığına yakından bakalım:

-   `**FROM [temel-imaj]**`**:** **"Nereden Başlıyoruz?"** İmajımızın hangi temel imajdan (örneğin Nginx veya Python) başlayacağını belirtir. *Bizim Oyunumuz:* `FROM nginx:latest`
-   `**WORKDIR [dizin]**`**:** **"Nerede Çalışacağız?"** Konteyner içinde çalışacağımız ve dosyaları kopyalayacağımız ana dizini belirler. *Bizim Oyunumuz:* `WORKDIR /usr/share/nginx/html`
-   `**COPY [kaynak] [hedef]**`**:** **"Hangi Dosyaları Koyuyoruz?"** Kendi bilgisayarımızdaki (host) dosyaları, imajın içine kopyalar. Modül 2'deki `docker cp` komutunun otomatikleşmiş hali budur. *Bizim Oyunumuz:* `COPY . .` (Mevcut klasördeki her şeyi, çalışma dizinine kopyala)
-   `**EXPOSE [port]**`**:** **"Hangi Kapıda Bekliyorum?"** Uygulamanın **hangi portta çalıştığını** belgeler. *Unutmayın, bu komut portu çalıştırmaz, sadece bilgi verir!*

> ***Ek Not (Teknik Bilgi):*** *Eğer bu bir Node.js uygulaması olsaydı,* `*COPY*` *komutundan hemen sonra* `*RUN npm install*` *gibi komutlarla gerekli bağımlılıkları* ***imaj inşa edilirken*** *kurardık. Bu, her seferinde tekrar tekrar kurmak zorunda kaldığımız durumlardan da kendimizi tamamen kurtarmak anlamına gelir.*

### 3.3 Kendi İmajımızı İnşa Etme ve Test Etme (25 dk)

![](https://cdn-images-1.medium.com/max/979/1*yaDpugXY7T5zvCEmBnaZSw.png)

Artık teoriyi pratiğe döküp otomasyonun tadını çıkarma zamanı!

**Adım 1: Dockerfile Oluşturma**

Lütfen projemizin olduğu klasörde (yani `index.html`'in yanında) `**Dockerfile**` adında, uzantısı olmayan bir dosya oluşturun. İçine şu üç sihirli satırı yazalım:

FROM nginx:latest\
WORKDIR /usr/share/nginx/html\
COPY . .

**Adım 2: İmajı İnşa Etme (**`**docker build**`**)**

İmaj tarifimizi güzelce hazırladık, şimdi burada yazdığımız işlemleri gerçekleştirip imajımızı her yerde kullanıma hazır hale getirelim. Terminalde projenizin bulunduğu klasördeyken bu komutu çalıştırın:

`docker build -t alku-kutuphane:v1 .`

-   `**-t**` **(tag):** İmajımıza kolay hatırlanabilir bir isim ve versiyon (`alku-oyun:v1`) verdik.
-   `**.**` **(nokta):** Docker'a, tarifin (`Dockerfile`'ın) **bu klasörde** olduğunu söyledik.
-   **Katmanlar (Layers):** Komutu çalıştırdığınızda her bir **FROM**, **WORKDIR** ve **COPY** komutunun ayrı bir **katman** olarak işlendiğini göreceksiniz. Bu katmanlama, Docker'ın en hızlı ve verimli olmasının sırrıdır.

**Adım 3: İmajı Çalıştırma ve Test Etme**

Artık elimizde Modül 2'deki Nginx imajı değil, **kendi inşa ettiğimiz** `**alku-oyun:v1**` imajımız var! Çalıştırmak için komutu güncelliyoruz:

`docker run -d -p 8081:80 --name oyun_v3 alku-oyun:v1`

**Doğrulama:** Tarayıcıdan `**localhost:8081**` adresine gidin. Oyununuz direkt olarak açılmalı.

> ***SONUÇ:*** *Tebrikler!* `***docker cp***`** *ile kopyalama ve container'ın içine girip ayarlamalar yapma zahmetinden kurtuldunuz!*** *Bir sonraki modülde, bu oyuna bir arka plan servisi ekleyip* ***ağları*** *karıştırarak mühendislik seviyesini daha da artıracağız. Artık oyunumuz sadece statik değil, verileri de yönetecek!*

[COMPLETE:module3-docker-image-building]

### Final: İmajı Paylaşma ve Her Yerde Kullanma (Registry Kullanımı)

Arkadaşlar, şimdi `**alku-oyun:v1**` imajımız bilgisayarımızda. Peki bu tarifi **ALKÜ'deki 50 arkadaşımızla** nasıl paylaşacağız? Tekrar mail atmak mı? Hayır! **Kayıt Defterleri (Registry)** işte tam bu noktada devreye giriyor.

Modül 1'de bahsettiğimiz o büyük yemek kitabı (Docker Hub) şimdi bizim bu hazırladığımız özel imajları kolaylıkla paylaşmamızı sağlayacak.

1.  **Giriş Yapma:** İlk olarak terminalinizden Docker Hub hesabınıza giriş yapmanız gerekiyor: `docker login` *(Bu komutu verdiğinizde kullanıcı adınızı ve şifrenizi soracaktır.)*
2.  **İmajı Etiketleme (Tagging):** Docker Hub'a yüklemek için imajımızın adını, **kullanıcı adımızla** birlikte yeniden etiketlemeliyiz (tarifin üzerine kendi adımızı yazmak gibi): `docker tag alku-oyun:v1 <kullanici_adiniz>/alku-oyun:v1` *(Örnek:* `*docker tag alku-oyun:v1 burakgizlice/alku-oyun:v1*`*)*
3.  **İmajı Yükleme (Pushing):** Artık bu tarifi sunucuya gönderebiliriz! `docker push <kullanici_adiniz>/alku-oyun:v1` *(Bu, birkaç saniye veya dakika sürebilir.)*
4.  **Sizden İstek:** Şimdi, benim yüklediğim imajı (kendi kullanıcı adımla etiketlenmiş halini) **herkesin kendi bilgisayarına çekmesini** istiyorum: `docker pull <benim_kullanici_adim>/alku-oyun:v1`

[COMPLETE:module3-pulling-from-burak]

#### 💡 Kritik Not: Docker Hub Her Zaman Çözüm Değil

Şunu hayal edelim: Şirketiniz içinde çok kritik, sadece sizin ekibinizin kullanması gereken bir uygulama geliştirdiniz. Bu uygulamayı tüm dünyaya açık olan Docker Hub'a yüklemek **güvenlik açısından doğru olmaz.**

İşte bu noktada devreye **yerel (Local / Private) Registry'ler** giriyor. Siz, tıpkı Docker Hub gibi, ancak sadece şirket ağından erişilebilen kendi özel sunucunuzu kurarsınız. Uygulamanızı buraya yüklersiniz ve ekip arkadaşlarınıza haber verirsiniz. Onlar da herhangi bir uyumsuzluk hatası almadan, sadece:

`docker pull <özel_sunucu_adresi>/<imaj_adi>`

komutunu kullanarak uygulamayı kolayca çekebilirler. Bu sayede uygulamanız hem **izole** hem de **profesyonel bir şekilde** dağıtılmış olur.