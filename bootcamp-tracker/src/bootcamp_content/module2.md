### Modül 2: Docker CLI'a Başlangıç(60 Dakika)

**Ana Tema:** **"Kurulmuşu Var!"** --- Artık bilgisayarımızı kirletmeden, tek komutla uygulamaları çalıştırıp, işimiz bitince iz bırakmadan çöpe atıyoruz.

### 2.1 Temel Söz Dizimi ve Akış (5 dk)

Modül 1'de Daemon'u, İmajı ve Konteyneri öğrendik. Şimdi o bilgiyi eyleme dökme zamanı. Bizim Docker İstemcimiz (CLI) ile Daemon'a komut gönderme şeklimiz her zaman aynıdır:

`docker <komut> <alt-komut> [seçenekler] [argümanlar]`

***buraya bazı örnek komutlar ve alt komutlar koyalım, görselleştirme olarak üstteki yapıda hangisine girdiğini gösterelim.***

Şimdi aramızda kurulu olan, ya da kurulumu yeni biten arkadaşlarla bu komutları denemeye başlayacağız.

### 2.2 Kullan-At Konsepti: Tek Seferlik İşler için Konteyner (10 dk)

Arkadaşlar, biliyorsunuz hepimiz bir projeye başlarken bir şeyi test etmek için tonla paket kurarız, sonra o paketi bir daha açmayız ve bilgisayarımızda çöp olarak kalır. Docker bu duruma son veriyor: **İşin bitince iz bırakma!**

Bu konsept için **Curl** aracını kullanacağız. Curl, normalde ağ testleri yapmak için kurmanız gereken, bazen kurulumu uğraştıran bir araçtır.

-   **Komutun Sihri:** Şu komutu yazalım: `docker run --rm curlimages/curl google.com`
-   **Ne Oldu?**

1.  Docker, `curlimages/curl` adlı imajı **çekti**.
2.  Ondan bir **konteyner oluşturdu**.
3.  Konteynerin içindeki `curl google.com` komutunu **çalıştırdı**.
4.  Ve en önemlisi: `**--rm**` (remove) seçeneği sayesinde, işi biter bitmez konteyner **otomatik olarak kendini sildi!** Ne bir program kaldı, ne bir iz. Tertemiz! İşte **"Kurulmuşu Var!"** felsefesi budur.

***burada ufaktan docker ps ve docker ps -a ile --- rm seçeneğinin testlerini canlı gösterelim ki insanlarda bir şeyler ifade etmeye başlasın.***

### 2.3 Zahmetli Kurulumlara Son: Jupyter Notebook (15 dk)

Şimdi biraz daha ciddi bir araca geçelim. Aramızda veri bilimine meraklı olanlar bilir: Jupyter Notebook kurmak, Python'ı kur, üzerine Anaconda kur, bir sürü kütüphane kur... tam bir çile.

Bakın Docker'da bu iş nasıl oluyor:

-   **Tek Komutla Notebook Server:** `docker run -p 8888:8888 jupyter/notebook`
-   **Peki Buradaki Sır Ne?**

1.  `**jupyter/notebook**`**:** Bu devasa aracı kurmak yerine, **kurulumu tamamlanmış imajı** kullandık! Yani kısaca kurmakla uğraşma işte burada **KURULMUŞU VAR!**
2.  `**-p 8888:8888**` **(Port Haritalama):** Modül 4'te detayını göreceğiz ama şimdilik şunu bilin: Notebook konteynerin içinde 8888. portta çalışıyor. Bu seçenekle onu bizim bilgisayarımızın (Host OS) 8888. portuna bağlıyoruz. **Olmazsa dışarıdan erişemeyiz.**

-   **Doğrulama:** Tarayıcınızı açın ve `**localhost:8888**` adresine gidin. Terminalde size verilen **token'ı** kopyalayıp yapıştırarak Jupyter Notebook arayüzüne erişin. Tebrikler, kurulumsuz veri bilimine hoş geldiniz!

***buraya jupyter notebook içerisinden yapılacak birkaç şey ekleyebiliriz, gayet eğlenceli ve etkileşimli olur.***

### 2.4 Konteyner Yaşam Döngüsünü Yönetme (15 dk)

Artık çalışan bir sürü konteynerimiz var (Nginx, Jupyter, belki köpek balığı). Bunları yönetmeyi öğrenmeliyiz.

-   **Ne Çalışıyor?:**
-   `docker ps`: Arka planda (`-d` ile) çalışan **canlı** konteynerleri görme.
-   Çıktı Sütunları: `CONTAINER ID` (Kısa ID'si), `IMAGE` (Hangi İmajdan geldiği), `STATUS` (Ne kadar süredir çalıştığı) ve `PORTS` (Hangi portlara bağlı olduğu) kritik!
-   `docker ps -a`: Çalışan ve **durdurulmuş** tüm konteynerleri görme. (Bakın `--rm` kullanmadıklarınız hala orada duruyor!)
-   **Durdurma, Başlatma ve İzleme:**
-   `docker stop <id>`: Konteyneri durdurur. Jupyter'i durdurup deneyin.
-   `docker start <id>`: Durdurulmuşu tekrar başlatır.
-   `docker logs -f <id>`: Bir konteynerin çıktılarını (hatalarını, işlemlerini) gerçek zamanlı izleme. Mühendislikte hata ayıklama için en çok kullanacağımız komut!
-   `docker rm <id>`: Konteyneri kalıcı olarak siler.

### 2.5 Oyun Entegrasyonu: Dosyayı Konteynere Nasıl Koyarız? (15 dk)

Şimdi gelelim kendi **ALKÜ Kütüphane Oyunumuzun** statik HTML dosyasını çalıştırmaya. Biz buna **Nginx** adlı web sunucusu imajını kullanacağız.

1.  **Boş Sunucuyu Kaldırma:** Nginx imajını çekip, 8080 portunu dışarıya açarak arka planda çalıştırıyoruz: `docker run -d -p 8080:80 --name alkü_kutuphane_server nginx`

-   Şimdi `localhost:8080`'e giderseniz Nginx'in varsayılan, boş sayfasını görmeniz gerekir.

**2\. Manuel Kopyalama (**`**docker cp**`**):** Normalde Modül 3'te bunu otomatik yapacağız ama **ne kadar emek harcadığımızı görmeniz için** şimdi manuel yapıyoruz:

-   **Ön hazırlık:** Lütfen yanınızda bulunan `**index.html**` (oyun dosyası) dosyasının nerede olduğunu bilin.
-   **Komut:** `docker cp ./index.html alkü_kutuphane_server:/usr/share/nginx/html/index.html`
-   **Ne yaptık?** `index.html` dosyasını `alkü_kutuphane_server` adlı konteynerin içindeki Nginx'in web klasörüne kopyaladık!

**3\. Sonuç:** Şimdi `localhost:8080` adresini yenileyin. **Tebrikler!** İlk kendi uygulamanızı bir konteynerde, tek bir komutla yayınlamış oldunuz!

#### 💡 Ekstra Bilgi: Konteynerin İçine Girmek ve Manipülasyon

Arkadaşlar, bizim **ALKÜ Kütüphane Oyunu** basit bir HTML dosyasıydı. Ama gerçek projelerde durum bu kadar kolay olmayabilir. Belki yüzlerce dosyayı kopyaladıktan sonra, konteynerin içindeki bir dosyanın **izinlerini (permissions)** ayarlamanız, bir yapılandırma dosyasını kontrol etmeniz veya bir hata ayıklaması yapmanız gerekebilir.

İşte bu noktada imdadımıza `**exec**` komutu ve Modül 2.2'de gördüğümüz sihirli `**-it**` bayrağı yetişiyor:

-   **Komut:** `docker exec -it alkü_kutuphane_server bash`

Bu komutla, çalışan `**alkü_kutuphane_server**` konteynerinin içine **interaktif (i)** ve **sanal terminal (t)** (`-it`) üzerinden giriyorsunuz. Artık konteynerin içindesiniz! Tıpkı SSH ile bir sunucuya bağlanmış gibi:

1.  `ls /usr/share/nginx/html` yazarak kopyaladığınız `index.html` dosyasını görebilirsiniz.
2.  Gerekiyorsa `chmod` komutuyla dosya izinlerini değiştirebilirsiniz.
3.  İşiniz bitince `exit` yazarak konteynerden çıkarsınız.

Bu yetenek, bize tam bir kontrol sağlıyor. Unutmayın, Docker sadece çalıştırmak değil, aynı zamanda **hata ayıklamak ve yönetmek** için de güçlü bir araçtır!

Bu modülde **run, ps, stop, rm** gibi temel komutları öğrendik ve `cp` ile uygulamamızı zor yoldan konteynere koyduk. Bir sonraki modülde, bu manuel kopyalama zahmetini nasıl **otomatikleştireceğimizi** göreceğiz: **Dockerfile** ile!