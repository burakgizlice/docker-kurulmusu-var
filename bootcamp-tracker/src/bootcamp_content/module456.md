### Kapanışa Doğru: Bir Üst Seviyede Neler Var? (45 Dakika)

Arkadaşlar, Modül 3 ile Docker'ın en kritik üç adımını (Çalıştırma, CLI Yönetimi ve Kendi İmajını İnşa Etme) tamamladık. Şu an elinizde, çoğu yazılım geliştiricinin bilmesi gereken temel araç seti var.

Ancak gerçekçi olalım: **Zamanımız daraldı!**

Programımızda kalan **Ağ Yönetimi, Veri Yönetimi ve Docker Compose** konuları, *profesyonel bir uygulamayı hayata geçirmek* için olmazsa olmaz konulardır. Bu konuları 15'er dakikalık mini seanslarla **teorik olarak** işleyeceğiz.

> ***Pratik Etmek İsteyenlere:*** *Bu bootcamp bittiğinde, tıpkı burada yaptığımız gibi, adım adım pratik edebileceğiniz,* ***ALKÜ Kütüphane Oyunu'nun tam versiyonunu içeren (Arka-Yüz, Veritabanı dahil)*** *detaylı kaynakları ve komut dosyalarını içeren bir* ***GitHub*** *paylaşacağım. Yani zamanımızın yetmediği pratik kısmı size emanet!*

Hadi başlayalım.

### Modül 4: Konteyner Ağ Yönetimi (Container Networking) (15 dk)

**Ana Fikir:** "Konteynerleriniz Sadece Çit Değil, Aynı Zamanda Telefon Hattına Da Sahip!"

#### 4.1 Port Haritalama (Port Mapping) Hakkında Unuttuklarımız

Modül 2'de `**docker run -p 8081:80**` komutunu kullanmıştık. İşte bu **Port Haritalama'dır.**

-   **Neden Gerekli?** Konteynerler izole ortamlardır. Nginx 80. portta çalışsa bile, bu sadece çitin **içindeki** bir numaradır. Biz `-p 8081:80` diyerek, Host OS (bizim bilgisayarımız) üzerindeki 8081 numaralı kapıyı, Konteynerin 80 numaralı kapısına bağlıyoruz.

burayı görselleştirerek somutlaştıralım.

**Hızlı Canlı Uygulama (Port'ların Çalışma Mantığı):**

Arkadaşlar, Modül 2'deki Nginx'i tekrar çalıştıralım, ama bu sefer **farklı bir host portu** ile. Bu, Port Mapping'in tek yönlü bir köprü olduğunu kanıtlayacak:

1.  `docker run -d -p 9000:80 --name farklı_port_oyun nginx`
2.  Tarayıcıyı açıp `**localhost:9000**` adresine gidin. Çalıştığını göreceğiz.
3.  Şimdi tarayıcıyı açıp `**localhost:80**` adresine gidin. Çalışmayacak!

Bu, 80 numaralı portun sadece *konteynerin* içinde kaldığını, bizim sadece 9000 numaralı kapıyı açtığımızı kanıtlar.

 `**docker ps**` **ile de bağlanılan portlar gözlemlenebilir.**

#### 4.2 Konteynerler Arası İletişim (User-Defined Networks)

Peki ALKÜ Kütüphane Oyunumuzun **ön yüzü (Front-end) olan konteyner** ile yeni ekleyeceğimiz **arka yüzü (Back-end) olan konteyner** nasıl konuşacak? IP adresleriyle uğraşmak çok zahmetli!

-   **Çözüm:** Docker'ın **Kullanıcı Tanımlı Ağları (User-Defined Networks)**.
-   **Ne İşe Yarar?** Bu, konteynerlere özel bir **özel ağ (private network)** kurar. Bu ağa bağlı konteynerler, birbirleriyle **doğrudan isimleriyle** konuşabilirler!

> ***Örnek:*** *Arka yüzümüzün konteyner adına* `***oyun_api***` *dediysek, ön yüzümüz arka yüze IP adresi yerine direkt* `***http://oyun_api/notes***` *yazarak ulaşır. Bu, profesyonel bir mimarinin temelidir.*

**Hızlı Canlı Uygulama (Ağ Oluşturma):**

`docker network ls` komutunu çalıştıralım.

Çıktıda **üç tane varsayılan ağ** göreceksiniz:

-   `**host**` **ve** `**null**`**:** Bunlar, özel durumlar için kullanılan, şimdilik bilmemize gerek olmayan ağlar.
-   `**bridge**` **(Köprü):** Bu Docker'ın **varsayılan** ağ trafiğidir. Modül 2'de çalıştırdığınız tüm konteynerler (Nginx, Jupyter) buraya bağlıydı. Ancak bu ağda, konteynerler birbirini **isimleriyle** göremezler; sadece IP adresleriyle iletişim kurabilirler, ki bu da zahmetlidir.

İşte bu yüzden **özel ağımızı** kuruyoruz:

`docker network create alku_net`

**Şimdi** `**docker network ls**` **yazın.** Artık listede dördüncü bir ağ var: `**alku_net**`**!** Bu ağ, tıpkı evinizdeki Wi-Fi gibi, bu ağa bağladığımız tüm konteynerlerin (ön yüz, arka yüz) birbirini **direkt isimleriyle** bulabileceği, izole bir iletişim hattıdır. Evde projeyi yaparken tüm servisleri buraya bağlayacaksınız."

Yazdığınız programların içerisinde bağlantı kurulması gereken noktalarda sizi yoracak IP adreslemeleri yerine sadece konteyner ismi ile hareket etmek gerçekten inanılmaz bir pratiklik kazandırıyor.

Gördüğünüz gibi, tek bir komutla ALKÜ projelerimize özel, kendi izole ağımızı kurmuş olduk! Artık buraya bağlanan tüm servisler birbirini kolayca bulacak. (Veri tabanı ve API'mizi evde bu ağa bağlayacaksınız.)

### Modül 5: Veri Yönetimi (Managing Data) (15 dk)

**Ana Fikir:** "Uygulamanız Ölümsüz Olsun!"

#### 5.1 Verilerin Geçiciliği Sorunu (Ephemeral Data)

Modül 2'deki `**--rm**` komutunu hatırlayın. Konteynerler **geçicidir (ephemeral)**. Bir konteyneri sildiğiniz anda, içindeki tüm veriler (loglar, geçici dosyalar) de yok olur.

Peki biz oyunumuzda yeni yerler açtığımızda bu verilerin kaybolmasını ister miyiz? Asla! Verileri **kalıcı** hale getirmeliyiz.

#### 5.2 Çözüm: Docker Volume'ler

Docker, bu sorunu çözmek için iki ana yöntem sunar:

1.  **Bind Mounts (Bağlama):** Konteynerdeki bir klasörü, **bilgisayarımızdaki (Host OS) belirli bir klasöre** doğrudan bağlar. *Avantajı:* Dosyalara dışarıdan erişmek kolaydır.
2.  **Named Volumes (İsimli Birimler):** Konteyner verilerinin Docker tarafından yönetilen **özel bir alanda** saklanmasıdır. *Avantajı:* Daha güvenlidir, performansı daha yüksektir ve Docker'ın tercih ettiği yöntemdir.

> ***Örnek:*** *Yeni ekleyeceğimiz* ***SQLite veritabanını*** *bir Volume'e bağlayacağız. Konteyner çökse bile, Volume'deki boş yerler listesi* ***güvende*** *kalacak.*

**Hızlı Canlı Uygulama (Volume'ün Gücü):**

***Bind Mounts (Bağlama):***

Verinin kaybolmadığını en net görmenin yolu, **Bind Mounts** kullanmaktır. Bu, konteynerin içindeki bir klasörü **kendi bilgisayarımızdaki bir klasöre** doğrudan bağlamak demektir.

1.  **Klasör Oluşturma:** Önce terminali kapalı tutarak masaüstünüzde (veya kolay erişilebilir bir yerde) `**oyun_data**` adında bir klasör oluşturun.
2.  **Veriyi Bağlayarak Yazma:** Şimdi bir konteyner çalıştırıp bu klasörü bağlıyoruz ve içine bir dosya yazıyoruz:
3.  `docker run --rm -v $(pwd)/oyun_data:/veri alpine sh -c "echo 'Yer bulundu' > /veri/log.txt"`
4.  *(Not:* `*$(pwd)*` *komutu terminale o an hangi klasörde olduğumuzu söyler)*
5.  **Hemen Kontrol:** Şimdi terminali bırakın ve `**oyun_data**` **klasörünüze** bakın. İçinde `**log.txt**` dosyasını göreceksiniz.
6.  **Konteyneri Siliyoruz:** Konteynerimiz zaten `--rm` ile sildi kendini. Ama `oyun_data` klasörünüzdeki veri **HALA ORADA!** İşte Volume'lerin gücü budur. Veritabanınız bu şekilde hayatta kalacak."

***Named Volumes (İsimli Birimler):***

**Bind Mounts** bize verinin nerede olduğunu gözle gösterdi, ama profesyonel uygulamalarda tercih edilen **Named Volume'lerdir**. Peki neden?

Çünkü **Named Volume'ler**, tıpkı ALKÜ Kütüphane Oyunu'ndaki boşalttığınız yerler listesi gibi, **yeni bir konteyner çalıştırdığınızda bile** veriyi anında o yeni konteynere ulaştırır!

**Oyun Mekaniği ile Açıklama:**

> *Bizim oyunumuzda, bir yeri boşalttınız (yani veritabanına "A3 masası boş" diye yazdınız). Konteyneri sildiniz. Şimdi yeni bir konteyner çalıştırıyorsunuz.* ***Sıfırdan başlayan bu yeni konteynerin, eski veriye ihtiyacı var!*** *Volume tam burada devreye girer.*

"Şimdi o sihirli anı görelim. Diyelim ki az önce **oyun_verileri** adını verdiğimiz bir Volume oluşturduk ve içine 'Yer bulundu' diye veri yazdırdık (bu sizin veritabanı kaydınız).

1.  **Volume Oluşturma:** `docker volume create oyun_verileri`
2.  **Veri Yazma:** `docker run --rm -v oyun_verileri:/veri alpine sh -c "echo 'Yer bulundu' > /veri/log.txt"`

Konteyner silindi. Şimdi **tamamen farklı, sıfır bir konteyner** çalıştıracağız, ama aynı Volume'ü bağlayacağız:

`docker run --rm -v oyun_verileri:/goster alpine cat /goster/log.txt`

**Sonuç:** Gördüğünüz gibi, sıfırdan oluşturduğumuz bu ikinci konteyner, anında gidip **eski veriyi** Volume'den çekti ve okudu: **'Yer bulundu'**! İşte bu yüzden **Volume'ler** kullanırız. Siz sildiğiniz konteyner yerine **sıfırdan yeni bir konteyner çalıştırsanız bile**, Volume gidip ona bağlanarak verilerini kaldığı yerden kullanmasına olanak sağlıyor. Kütüphanedeki eşyaları kaldırdığınızda o yer bir daha asla dolmayacak!"

### Modül 6: Docker Compose (15 dk)

**Ana Fikir:** "Tek Komutla Tüm Uygulamayı Başlat!"

#### 6.1 Problemin Büyüklüğü

Şu an ALKÜ Kütüphane Oyunumuz 3 parçadan oluşuyor:

1.  **Ön Yüz (Nginx):** Kendi imajımız.
2.  **Arka Yüz (API):** Kendi imajımız (Node.js/Python).
3.  **Veritabanı (SQLite):** Hazır imaj.

Bu üçünü çalıştırmak için 3 uzun `**docker run**` komutu yazmak, ağlarını manuel bağlamak, volume'lerini tek tek tanımlamak gerekir. **Bu çok zahmetli!**

#### 6.2 Çözüm: Docker Compose'un Sihri

**Docker Compose**, çoklu konteynerli uygulamaları tanımlamak ve çalıştırmak için kullanılan bir araçtır.

-   `**docker-compose.yml**`**:** Tüm bu ayarları (hangi imajı çalıştır, hangi portu bağla, hangi ağa dahil et, hangi volume'ü kullan) **tek bir YAML dosyasına** yazarsınız. Bu, uygulamanızın **manifestosu** olur.
-   **Tek Komutla Başlatma:** Artık 3 ayrı komut vermek yerine, tek bir klasörde: `docker compose up`

Bu komut, YAML dosyasını okur ve tüm servisleri (ön yüz, arka yüz, veritabanı) doğru sırayla, doğru ağa bağlı olarak, verileri güvende tutacak şekilde ayağa kaldırır. **Profesyonel Docker kullanımının zirvesi budur!**

**Hızlı Canlı Uygulama (YAML Gösterimi ve Tek Komut):**

Arkadaşlar, 3 parçalı uygulamamızı (Ön Yüz, Arka Yüz, Veritabanı) çalıştırmak için **3 ayrı** `**docker run**` komutu yazmak yerine...

**(Ekranda hazırladığınız** `**docker-compose.yml**` **dosyasını açın.)**

Gördüğünüz gibi, bu tek YAML dosyası tüm ayarları, ağları ve volume'leri tanımlıyor.

-   Bunu çalıştıran komut sadece: `docker compose up -d`
-   Kapatan komut sadece: `docker compose down`

İşte bu, profesyonel bir yazılımcının projesini dağıtma şeklidir. **Kurulum sıfır, zahmet sıfır.**

### Kapanış ve Final (Soru-Cevap ve Kaynak Paylaşımı)

Arkadaşlar, tebrikler! 4 saatlik hızlandırılmış Docker bootcamp'imizin sonuna geldik.

Unutmayın: En iyi öğrenme pratiğin ta kendisidir.

Şimdi sorularınız varsa, kalan zamanı onlara ayıralım! Anonim formları tekrar doldurarak bootcamp sonunda sahip olduğunuz özgüven seviyesini dürüstçe bildirirseniz memnun oluruz.