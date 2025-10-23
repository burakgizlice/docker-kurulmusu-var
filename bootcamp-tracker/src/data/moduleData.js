export const modules = [
  {
    id: 'module1',
    title: 'Modül 1',
    content: `### **Modül 1 --- Hoşgeldiniz, Nedir bu Docker?**

### Önce Docker'ın Çözdüğü Problemi Anlayalım: (5dk)

Eğer daha önce herhangi bir program kodladıysanız, veyahut ileride kodlamanız gerekirse muhtemelen en başlarda hepimizin yaşadığı ortak bir problemle karşılaşacaksınız!

![](https://cdn-images-1.medium.com/max/979/1*rlI3TBoSLP9VHObvXEpl-w.png)

Heyecanla kodunuzu yazdınız, tam istediğiniz gibi çalışan ve sizi mutlu eden bir programınız var diyelim. 

![](https://cdn-images-1.medium.com/max/979/1*ldWOqi1LXaQBNvogoxrK3g.png)

Örneğin benim geliştirdiğim ALKÜ Kütüphanesinde yer bulmak oyunu!

Bu programı arkadaşlarıma da gönderip onların da oynamalarını istiyorum farz edelim, sizler de takım arkadaşlarınız için kıymetli ve kritik işlevsel programlar yazıp bunu onlara kullanmaya başlamaları için göndermek istiyor ve hatta göndermek zorunda olabilirsiniz.

Programınızı bir şekilde paketleyip arkadaşlarınıza veya herhangi birine yolladığınızda başınıza gelecek şey muhtemelen arkadaşınızın size bu çalışmıyor demesidir!

![](https://cdn-images-1.medium.com/max/979/1*LQ_Iooj1LlC9Bp4Ocs23hg.png)

Bir yazılım çalışmak için şu üç şeye muhtaçtır:\\
- Kaynak koduna (yazdığımız ALKÜ Kütüphane'de Yer Bul oyunu) 👨‍💻\\
- Doğru Bağımlılıklara (Python, Node, kütüphaneler) 🐍\\
- Doğru Ortama (İşletim sistemi, ortam değişkenleri) 🍏🪟🐧

Muhtemelen arkadaşınız kendi bilgisayarında yüklü olmayan veya erişilemeyen bir kütüphane, veya sürüm uyuşmazlıkları gibi sebeplerle hatalar alacak.

Çünkü onun bilgisayarından tam olarak sizinkiyle aynı durumda olmasını bekleyemezsiniz.

Docker, kodu, bağımlılıkları ve ortamı tek bir standart taşınabilir birimde paketleyerek bu sorunu çözer.

![](https://cdn-images-1.medium.com/max/979/1*oBfikdlf6qyPpCuygxQQdA.png)

Yabancı kaynaklarda bu sorunu "It Works on My Machine!" olarak da görebilirsiniz. Docker'ı anlayıp kullanmaya başlamak yalnızca yazdığınız programları güzelce paketlemekte değil, uzun ve yorucu kurulum süreçlerini de rahatlatma konusunda size epey yardımcı olacak. 

### Konteynerler vs. Sanal Makineler: Fark Ne? (10dk)

Peki bu "standart taşınabilir birim" tam olarak nedir? Çoğumuzun bildiği bir teknoloji var: **Sanal Makineler (VM)**. Docker'ı anlamak için önce VM'in ne yaptığını, sonra da Docker'ın nasıl farklılaştığını görelim.

![](https://cdn-images-1.medium.com/max/979/1*hWYgaLw745AvWhUmyFganw.png)

#### Sanal Makineler (VM): Köpeğiniz İçin Bambaşka Bir Ev 🏡

-   **Analoji:** Sanal Makine (VM), **uygulamanız olan köpeğiniz için bambaşka, sıfır bir ev inşa etmek gibidir**. Bu evin kendi işletim sistemi, kendi donanımı vardır ve köpeğiniz orada canının istediği her şeyi yapabilir.f
-   **Ağırlığı:** VM, uygulamanızın (köpeğinizin) yanında, **bütün bir işletim sistemini, çekirdeği (kernel) ve donanım emülasyonunu** da taşır. Bu yüzden **ağırdır, yavaş başlar** ve aşırı kaynak tüketir. Yazdığımız programı çalıştırmak için koca bir eve ihtiyacımız yok!

#### Konteynerler: Köpeğin Evinizin Bahçesinde Çiti 🚧

-   **Analoji:** Docker Konteyneri ise **uygulamanız olan köpeğinizin evinize (Ana İşletim Sisteminize) zarar vermemesi için sağlam bir çit çekmek gibidir**. Köpeğiniz (uygulamanız) o çitin içinde istediğini yapar ama **sizin evinizin (OS'inizin)** düzenini bozamaz.
-   **Teknik Fark:** Bir konteyner **donanımı sanallaştırmaz**. Ana işletim sistemi (Host OS) ile **aynı çekirdek (kernel) üzerinde çalışır**. Sadece diğer konteynerlerden ve ana sistemden **izolasyon** sağlar. Yani VM'deki gibi ağır bir yük yoktur.
-   **Temel Çıkarım:** Konteynerler **saniyeler içinde** başlar, **çok hafiftir** ve yalnızca uygulamanızın çalışması için gerekli minimum kaynağı kullanır. Amacımız sadece uygulamamızı izole etmek ve taşınabilir kılmak; bunun için yeni bir ev inşa etmeye gerek yok!

![](https://cdn-images-1.medium.com/max/979/1*9004Txf8Qyys3ODgGph2ig.png)

#### 💡 Detaylı Teknik Bilgi: Çitin Sırrı (\`cgroups\` ve \`namespaces\`)

Arkadaşlar, mühendislik gözüyle bakarsak, konteynerler sihir değil; Linux'un halihazırda var olan iki temel teknolojisi üzerine inşa edilmiş, **kullanımı kolaylaştırılmış** bir araçtır:

1.  **Namespaces (İsim Alanları):** Bu teknoloji, bir uygulama için **sanki tek başınaymış gibi** görünen izole bir ortam yaratır. Kendi ağ arayüzüne, kendi kullanıcı ID'sine, kendi dosya sistemine sahip olmasını sağlar.
2.  **cgroups (Kontrol Grupları):** Bu da bir uygulamanın kullanabileceği CPU, RAM, disk I/O gibi **kaynakları kısıtlamaya** yarar. Bu sayede bir konteynerin tüm makine kaynaklarını yemesini engellersiniz.

Özetle, konteynerler, bu \`cgroups\` ve \`namespaces\` teknolojilerini paketleyip herkesin kolayca kullanabileceği bir ürün haline getirmiştir.

### Docker'ın Temel Üçlüsü: İmaj, Konteyner ve Kayıt Defteri (Registry) (10dk)

Şimdi gelelim bu çitin, bu kutunun, yani bu **konteyner** olayının arkasındaki üç temel yapı taşına. Docker dünyasında her şey bu üç kavram etrafında döner. Bunları anladığımız anda kalan her şey kolaylaşacak:

#### 1\\. İmaj (Image) 🖼️: Orijinal Yemek Tarifi

![](https://cdn-images-1.medium.com/max/979/1*697m-ulcpMAPxgLwvFyhsQ.png)

-   **Nedir?** İmaj, uygulamanızın, tüm bağımlılıklarının ve ayarlarının **salt okunur (read-only)** bir şablonudur. Tıpkı bir .ISO dosyası gibi düşünebilirsiniz. **Statiktir**, bir kez oluşturulur ve değişmez.
-   **Benzetme:** Bu, bizim **ALKÜ Kütüphane Oyunu'nun tam ve kesin tarifi** demektir. Hangi ReactJS sürümünü, hangi kütüphaneyi kullanacağının bilgisi içeridedir.

#### 2\\. Konteyner (Container) ⚙️: Pişmiş Yemek

![](https://cdn-images-1.medium.com/max/979/1*nhKgOrJJqsTYsVfUoAyP0Q.png)

-   **Nedir?** Konteyner, bir imajın **canlı, çalışan örneğidir**. İmajı çalıştırdığınız anda konteyner oluşur. İmaj bir kez hazırlanır, ama ondan binlerce konteyner çalıştırabilirsiniz.
-   **Farkı:** İmaj statikken, konteyner **dinamiktir** ve bir durumu (state) olabilir. İçindeki dosyaları değiştirebilir, log üretebilirsiniz (ancak bu veriler genellikle kalıcı değildir, 5. modülde kalıcı hale getireceğiz!).

#### 3\\. Kayıt Defteri (Registry) ☁️: Büyük Yemek Kitabı

![](https://cdn-images-1.medium.com/max/979/1*bNhTArOJGFzSW0Dsy-qKXQ.png)

-   **Nedir?** İmajların depolandığı ve paylaşıldığı merkezi bir depodur. En meşhuru, tüm dünyanın kullandığı **Docker Hub**'dır.
-   **Akış:** Bizim ekip ALKÜ Kütüphane Oyunu'nun **İmajını** hazırlar, sonra bu İmajı **Kayıt Defterine** yükler. Sizin makineniz de o İmajı **çeker (pull)** ve **çalıştırarak** bir **Konteyner** oluşturur.
-   **Yerel Kayıt:** Unutmayın, şirketler ve kurumlar kendi hassas kodlarını bu genel defter yerine, kurum içinde sadece kendilerinin erişebildiği **yerel (private) kayıt defterlerinde** saklarlar. Bu, bizim için çok kıymetli bir kaynak olacak.

### Docker Mimarisine Kısa Bir Bakış ve Kapanış (5dk)

Peki biz terminale \`docker run\` yazdığımızda arka planda bu sihir nasıl oluyor?

Docker, çok basit bir **İstemci-Sunucu** mimarisi üzerinde çalışır:

1.  **Docker Daemon (Sunucu/Motor):** Bu, bilgisayarınızın arka planında sürekli çalışan ana hizmettir. Konteynerleri oluşturan, imajları depolayan, ağları yöneten ve ağır işi yapan *motor* budur. Tüm işi o yapar.
2.  **Docker İstemcisi (CLI):** Bu, sizin terminalden yazdığınız \`docker run\` gibi komutlardır. İstemci, bu komutu alır ve Daemon'a gönderir.

![](https://cdn-images-1.medium.com/max/979/1*rX41Zz1Bgoj_WltFR48ODQ.png)

**Yani süreç şu:** Siz **İstemci'ye** (CLI) bir emir verirsiniz, o da arka planda çalışan **Daemon'a** bu isteği iletir. Daemon da sizin için gerekli İmajı çeker ve Konteyneri ayağa kaldırır.

### Modül 1 Kapanışı

**Sadece bu kadar!** Docker, uygulamamızın kodunu ve ortamını bir **İmaj** haline getiren, bunu bir **Kayıt Defteri** aracılığıyla paylaşmamızı sağlayan ve herkesin tek komutla **Konteyner** olarak çalıştırabileceği bir araçtır.

Amacımız, **"Benim makinemde çalışıyordu!"** mazeretini ortadan kaldırmaktır.

Hazırsanız, bir sonraki modülde hemen bu İstemci'yi kullanmaya başlayıp **ALKÜ Kütüphane Oyunu'nu** ilk kez bir Docker konteyneri içinde çalıştıracağız!`
  },
  {
    id: 'module15', 
    title: 'Modül 1.5',
    content: `### Modül 1.5: Docker Kurulumu ve Anonim Değerlendirme! (30dk)

> *Arkadaşlar, Modül 1'de ne kadar heyecanlı bir dünyaya adım attığımızı gördük. Şimdi sıra pratik yapmaya geldi, ancak uygulamaya geçmeden önce temel aracımız olan Docker'ı bilgisayarımızda hazır etmemiz gerekiyor.*

> *Bu 30 dakikalık süreyi üç gruba ayrılarak en verimli şekilde kullanacağız.*

### 1\\. Hızlı Teşhis: Sen Hangi Gruptasın? (5 dk)

> *Şimdi herkesin terminalini (Komut İstemi/PowerShell/Terminal) açmasını istiyorum. Lütfen şu komutu yazın ve Enter'a basın:*

> \`*docker --version*\`

> *Bu komutun çıktısına göre kendinizi bir gruba dahil edin:*

-   **Grup A (Hazır Gelenler):** Komut çıktısında bir sürüm numarası (\`Docker version 25.0.3, build 4930bc0\`) gibi bir yazı gördünüz. **Siz Hazırsınız!** Harika bir iş çıkardınız.
-   **Grup B (Kurulum Gerekli):** Komut bulunamadı veya benzeri bir hata aldınız. Docker henüz sisteminizde kurulu değil.
-   **Grup C (Sorunlular):** Komut var ama "Docker Engine çalışmıyor" veya "WSL hatası" gibi bir sorun alıyorsunuz.

### 2\\. Ön Değerlendirme (Anonim Anket): Başlangıç Noktamız Ne? (10 dk)

> *Şimdi, gruplarımız ne olursa olsun,* ***herkesin*** *doldurmasını istediğim kısa ve anonim bir ön değerlendirme formu var.*

> *Bu form, kaç puan aldığınızı ölçmekten çok, bu bootcamp'e hangi konularda ne kadar güvenle başladığınızı görmek için. Tamamen anonimdir, hiçbir çekinceniz olmasın lütfen.*

![](https://cdn-images-1.medium.com/max/979/1*W2n_LLwCPzc1bxLXA1KAAQ.png)

-   **Grup A'daki arkadaşlar:** Siz formu doldururken biz de B ve C gruplarıyla kurulumu başlatacağız. Lütfen form bitince hemen bir sonraki **Yan Aktivite** bölümüne geçin!
-   **Grup B ve C'deki arkadaşlar:** Lütfen siz de formu telefonunuzdan veya tarayıcınızdan doldurmaya başlayın. Formu bitirir bitirmez hemen kuruluma geçeceğiz.

### 3\\. Kurulum ve Sorun Giderme (15 dk)

#### 🚀 Grup B ve C: Kurulum Başlasın!

Kurulum linkini paylaşıyor ve adımları hızlandırıyorum. Bu talimatları çok basit adımlara ayırdım ki, en karmaşık hata bile çözülsün:

> Adım 1: İndirme (Herkes İçin Ortak)

1.  **Tarayıcınızı Açın** ve **"Docker Desktop İndir"** diye aratın (veya paylaştığım linke gidin).
2.  İşletim sisteminiz neyse (Windows, Mac), ona uygun butona tıklayıp dosyayı indirin. **Mac kullanıcıları** için iki seçenek olabilir; çipleri M1/M2/M3 olanlar "Apple Chip" olanı, diğerleri "Intel Chip" olanı seçmeli.

> Adım 2: Windows İçin Can Alıcı Ayar (Çoğunluk İçin)

Arkadaşlar, Docker'ın Windows'ta çalışması için **WSL 2 (Windows Subsystem for Linux)** adlı küçük bir Linux ortamına ihtiyacımız var. Burası **en çok hata aldığımız yer!**

1.  **Komut Verin:** Terminali açın ve indirme devam ederken hemen şu komutu yazıp **Enter** yapın: \`wsl --update\`
2.  **Yeniden Başlatma:** Kurulum bittiğinde sizden **bilgisayarı yeniden başlatmanız** istenebilir. Bu çok normal ve gerekli bir adımdır.
3.  **Hata Kontrolü (BIOS):** Eğer kurulum size "Sanallaştırma (Virtualization) açık değil" gibi bir hata verirse, bu BIOS ayarlarınızı kontrol etmeniz gerektiği anlamına gelir. **Bu hatayı alanlar hemen el kaldırsın!**

> Adım 3: Kurulumu Tamamlayın

1.  İndirilen dosyayı çift tıklayın ve çıkan her şeye **"OK"** veya **"Devam Et"** deyin. Çoğu ayar varsayılan olarak kalabilir.
2.  Kurulum bittiğinde, Docker sizden hesabınıza giriş yapmanızı isteyebilir. Şimdilik bu adımı **atlayabiliriz.**

> ***Teknik Destek:******Grup C'deki*** *(sorunlu) ve BIOS hatası alan arkadaşlara yardım etmeleri için salondaki teknik arkadaşlarımızı yönlendirelim.*

#### ✅ Grup A: Yan Aktivite ve Eğlenceli Pratik

Sizler anketi doldurdunuz ve hazırsınız. Sizden biraz eğlenerek Modül 2'ye hazırlanmanızı istiyorum. Bu komutlar tıpkı çitini yeni çektiğimiz köpeği çalıştırmak gibi olacak:

1.  **Sistem Kontrolü:** Önce meşhur "Hello World" imajını bir çalıştırın: \`docker run hello-world\`
2.  **Eğlenceli Konteyner:** Şimdi size bir **inek** göstereceğim. Bu imaj, bize terminalde komik bir inek ASCII sanatı gösterir: \`docker run --rm rancher/cowsay "Docker Harika Bir Icat"\`
3.  **Temizlik:** Ardından, Nginx'in arka planda nasıl çalıştığını görmek için:

-   İlk İmajı Çekin ve Çalıştırın: \`docker run -d nginx:latest\`
-   Konteyneri Görün: \`docker ps\`
-   Temizleyin: \`docker stop <id>\` ve \`docker rm <id>\` komutlarını kullanarak çalıştırdığınız Nginx konteynerini sistemden temizleyin.

[COMPLETE:cowsay]

### 4\\. Kapanış ve Ara

Arkadaşlar, kurulumu tamamlayabilenler lütfen terminalde son bir doğrulama yapsın:

\`docker run hello-world\`

[COMPLETE:hello-world]`
  },
  {
    id: 'module2',
    title: 'Modül 2', 
    content: `### Modül 2: Docker CLI'a Başlangıç(60 Dakika)

**Ana Tema:** **"Kurulmuşu Var!"** --- Artık bilgisayarımızı kirletmeden, tek komutla uygulamaları çalıştırıp, işimiz bitince iz bırakmadan çöpe atıyoruz.

### 2.1 Temel Söz Dizimi ve Akış (5 dk)

Modül 1'de Daemon'u, İmajı ve Konteyneri öğrendik. Şimdi o bilgiyi eyleme dökme zamanı. Bizim Docker İstemcimiz (CLI) ile Daemon'a komut gönderme şeklimiz her zaman aynıdır:

\`docker <komut> <alt-komut> [seçenekler] [argümanlar]\`

Yaygın kullanabileceğimiz bazı örnek komutlara bakalım ve komutların parça parça hangi kısımlara ait olduğunu inceleyelim.

docker image ls\\
docker image pull alpine:latest\\
docker build -t my-app:v1 .\\
docker image rm my-old-image\\
docker run -d -p 8080:80 webapp:v1\\
docker container ls -a\\
docker logs -f <konteyner_adı_veya_id>\\
docker stop <konteyner_adı_veya_id>\\
docker container rm -f <konteyner_adı_veya_id>

Şimdi aramızda kurulu olan, ya da kurulumu yeni biten arkadaşlarla bu komutları denemeye başlayacağız.

### 2.2 Kullan-At Konsepti: Tek Seferlik İşler için Konteyner (10 dk)

Arkadaşlar, biliyorsunuz hepimiz bir projeye başlarken bir şeyi test etmek için tonla paket kurarız, sonra o paketi bir daha açmayız ve bilgisayarımızda çöp olarak kalır. Docker bu duruma son veriyor: **İşin bitince iz bırakma!**

![](https://cdn-images-1.medium.com/max/979/1*YDnLw2jCLWlOr81tnxZfVQ.png)

Bu konsept için **Curl** aracını kullanacağız. Curl, normalde ağ testleri yapmak için kurmanız gereken bir araçtır.

-   **Komutun Sihri:** Şu komutu yazalım: \`docker run --rm curlimages/curl google.com\`
-   **Ne Oldu?**

1.  Docker, \`curlimages/curl\` adlı imajı **çekti**.
2.  Ondan bir **konteyner oluşturdu**.
3.  Konteynerin içindeki \`curl google.com\` komutunu **çalıştırdı**.
4.  Ve en önemlisi: \`**--rm**\` (remove) seçeneği sayesinde, işi biter bitmez konteyner **otomatik olarak kendini sildi!** Ne bir program kaldı, ne bir iz. Tertemiz! İşte **"Kurulmuşu Var!"** felsefesi budur.

-   **Canlı Gösterim:** Peki rm bayrağını kullanmasak ne olurdu? docker ps ile kontrol ederek gözleyelim.

[COMPLETE:module2-curl]

### 2.3 Zahmetli Kurulumlara Son: Jupyter Notebook (15 dk)

Şimdi biraz daha ciddi bir araca geçelim. Aramızda veri bilimine meraklı olanlar bilir: Jupyter Notebook kurmak, Python'ı kur, üzerine Anaconda kur, bir sürü kütüphane kur... tam bir çile.

![](https://cdn-images-1.medium.com/max/979/1*Em-2ILNqUAWSYRMCEt2tZQ.png)

Bakın Docker'da bu iş nasıl oluyor:

-   **Tek Komutla Notebook Server:** \`docker run -p 8888:8888 jupyter/scipy-notebook\`
-   **Peki Buradaki Sır Ne?**

1.  \`**jupyter/notebook**\`**:** Bu aracı sıfırdan kurmak yerine, **kurulumu tamamlanmış imajı** kullandık! Yani kısaca kurmakla uğraşma işte burada **KURULMUŞU VAR!**
2.  \`**-p 8888:8888**\` **(Port Haritalama):** Modül 4'te detayını göreceğiz ama şimdilik şunu bilin: Notebook konteynerin içinde 8888. portta çalışıyor. Bu seçenekle onu bizim bilgisayarımızın (Host OS) 8888. portuna bağlıyoruz. **Olmazsa dışarıdan erişemeyiz.**

![](https://cdn-images-1.medium.com/max/979/1*jc3UqhBtSmwXNHtE3Fno9Q.png)

-   **Doğrulama:** Tarayıcınızı açın ve \`**localhost:8888**\` adresine gidin. Terminalde size verilen **token'ı** kopyalayıp yapıştırarak Jupyter Notebook arayüzüne erişin. Tebrikler, kurulumsuz veri bilimine hoş geldiniz!
-   Jupyter notebook'umuzu aktif edip print ile adımızı soyadımızı yazalım.

[COMPLETE:module2-jupyter]

### 2.4 Konteyner Yaşam Döngüsünü Yönetme (15 dk)

Artık çalışan bir sürü konteynerimiz var (Nginx, Jupyter, belki köpek balığı). Bunları yönetmeyi öğrenmeliyiz.

-   **Ne Çalışıyor?:**
-   \`docker ps\`: Arka planda (\`-d\` ile) çalışan **canlı** konteynerleri görme.
-   Çıktı Sütunları: \`CONTAINER ID\` (Kısa ID'si), \`IMAGE\` (Hangi İmajdan geldiği), \`STATUS\` (Ne kadar süredir çalıştığı) ve \`PORTS\` (Hangi portlara bağlı olduğu) kritik!
-   \`docker ps -a\`: Çalışan ve **durdurulmuş** tüm konteynerleri görme. (Bakın \`--rm\` kullanmadıklarınız hala orada duruyor!)
-   **Durdurma, Başlatma ve İzleme:**
-   \`docker stop <id>\`: Konteyneri durdurur. Jupyter'i durdurup deneyin.
-   \`docker start <id>\`: Durdurulmuşu tekrar başlatır.
-   \`docker logs -f <id>\`: Bir konteynerin çıktılarını (hatalarını, işlemlerini) gerçek zamanlı izleme. Mühendislikte hata ayıklama için en çok kullanacağımız komut!
-   \`docker rm <id>\`: Konteyneri kalıcı olarak siler.

**Uygulama:** Hadi kendimiz de bir konteyner çalıştıralım, \`-d\` bayrağı ne işe yarıyor gözleyelim.

-   \`docker run -d nginx:latest \`
-   \`docker ps\`
-   \`docker stop <id>\`
-   \`docker ps -a\` 
-   \`docker start <id>\`
-   \`docker ps\`
-   \`docker logs -f <id>\`
-   \`docker rm <id>\`

[COMPLETE:module2-container-lifecycle]

### 2.5 Oyun Entegrasyonu: Dosyayı Konteynere Nasıl Koyarız? (15 dk)

Şimdi gelelim kendi **ALKÜ Kütüphane Oyunumuzun** statik HTML dosyasını çalıştırmaya. Biz buna **Nginx** adlı web sunucusu imajını kullanacağız.

1.  **Boş Sunucuyu Kaldırma:** Nginx imajını çekip, 8080 portunu dışarıya açarak arka planda çalıştırıyoruz: \`docker run -d -p 8080:80 --name alkü_yer_bul nginx:latest\`

-   Şimdi \`localhost:8080\`'e giderseniz Nginx'in varsayılan, boş sayfasını görmeniz gerekir.

#### 💡 Sık Karşılaşılan Hata Notu: Adres Zaten Kullanımda!

Arkadaşlar, bu komutu çalıştırdığınızda \`**address already in use**\` (adres zaten kullanımda) hatası alırsanız, **panik yok!**

Bu, bilgisayarınızda (Host OS) 8080 numaralı kapının zaten başka bir program (belki XAMPP, belki bir Node projeniz, belki de durdurmayı unuttuğunuz eski bir Docker konteyneri) tarafından kullanıldığı anlamına gelir.

**Çözüm Basit:**

1.  **Önce Kontrol Edin:** Tarayıcıdan \`localhost:8080\` adresine gidip, gerçekten çalışan bir servis arayüzü olup olmadığına bakın. Belki unuttuğunuz bir sunucu açıktır.
2.  **Farklı Port Kullanın:** En kolayı, dışarıya açtığımız portu değiştirmektir. 8080 yerine 8081, 9000 gibi başka bir port deneyin: \`docker run -d -p 8081:80 --name alkü_yer_bul nginx:latest\` 

Bu küçük hile ile port karmaşasını anında çözebiliriz!

-   **Manuel Kopyalama (**\`**docker cp**\`**): Klasör Kopyalama Sanatı**
-   Normalde Modül 3'te bunu otomatik yapacağız ama **ne kadar emek harcadığımızı görmeniz için** şimdi manuel yapıyoruz. React projenizin tüm içeriğini Nginx'in sunucu klasörüne kopyalamalıyız.
-   **Ön Hazırlık:** Lütfen QR ile indirebileceğiniz \`index.html\`, \`assets\` klasörü gibi tüm dosyaların olduğu \`**dist**\` klasörünün olduğu yere terminal ile girin.
  Drive Linki: https://drive.google.com/file/d/1gAsIysPOZ56BYEvap8nTbpDmF-CbDqFN/view?usp=sharing
-   **Komut:** Klasörün içindeki *tüm içeriği* kopyalamak için \`.\` (yıldız) karakterini kullanacağız.
-   \`docker cp ./dist/. alku_yer_bul:/usr/share/nginx/html\`
-   **Ne Yaptık?** Kendi bilgisayarımızdaki \`./dist\` klasörünün **içindeki her şeyi** (nokta koyarak), \`alkü_yer_bul_server\` adlı konteynerin içindeki Nginx'in web klasörüne (\`/usr/share/nginx/html\`) kopyaladık!
-   **Sonuç:**
-   Şimdi \`localhost:8080\` adresini yenileyin. **Tebrikler!** React uygulamanız (alkü Kütüphane Oyunu) an itibarıyla Docker konteyneri içinde, tek bir komutla yayınlanmış oldu!

#### 💡 Ekstra Bilgi: Konteynerin İçine Girmek ve Manipülasyon

Arkadaşlar, bizim **ALKÜ Kütüphane Oyunu** basit bir HTML dosyasıydı. Ama gerçek projelerde durum bu kadar kolay olmayabilir. Belki yüzlerce dosyayı kopyaladıktan sonra, konteynerin içindeki bir dosyanın **izinlerini (permissions)** ayarlamanız, bir yapılandırma dosyasını kontrol etmeniz veya bir hata ayıklaması yapmanız gerekebilir.

İşte bu noktada imdadımıza \`**exec**\` komutu ve Modül 2.2'de gördüğümüz sihirli \`**-it**\` bayrağı yetişiyor:

-   **Komut:** \`docker exec -it alku_yer_bul bash\`

Bu komutla, çalışan \`**alkü_yer_bul**\` konteynerinin içine **interaktif (i)** ve **sanal terminal (t)** (\`-it\`) üzerinden giriyorsunuz. Artık konteynerin içindesiniz! Tıpkı SSH ile bir sunucuya bağlanmış gibi:

1.  \`ls /usr/share/nginx/html\` yazarak kopyaladığınız \`index.html\` dosyasını görebilirsiniz.
2.  Gerekiyorsa \`chmod\` komutuyla dosya izinlerini değiştirebilirsiniz.
3.  İşiniz bitince \`exit\` yazarak konteynerden çıkarsınız.

Bu yetenek, bize tam bir kontrol sağlıyor. Unutmayın, Docker sadece çalıştırmak değil, aynı zamanda **hata ayıklamak ve yönetmek** için de güçlü bir araçtır!
[COMPLETE:module2-docker-it]
Bu modülde **run, ps, stop, rm** gibi temel komutları öğrendik ve \`cp\` ile uygulamamızı zor yoldan konteynere koyduk. Bir sonraki modülde, bu manuel kopyalama zahmetini nasıl **otomatikleştireceğimizi** göreceğiz: **Dockerfile** ile!`
  },
  {
    id: 'module3',
    title: 'Modül 3',
    content: `### Modül 3: Kendi İmajımızı İnşa Etmek (45 Dakika)

**Ana Tema:** **"Zahmete Son, Otomasyona Başla!"** --- Modül 2'de kopyala-yapıştır ile yaptığımız işi şimdi Docker'a öğretiyoruz.

### 3.1 Neden Kendi İmajımızı İnşa Etmeliyiz? (5 dk)

Arkadaşlar, Modül 2'nin sonunda ne kadar zahmetli bir iş yaptığımızı hatırlayın: Nginx'i çalıştırdık ve \`**docker cp**\` komutuyla \`index.html\` dosyamızı **manuel** olarak içine kopyaladık.

Bu bir mühendislik çözümünden çok, geçici bir yama gibiydi.

-   **Sorun Neydi?** Bu yöntem ne tekrarlanabilir ne de profesyoneldi. Uygulamanızda bir değişiklik yaptığınızda, her şeyi yeniden kopyalamak, silmek, durdurmak zorunda kalıyorsunuz. **Zaman kaybı!**
-   Eğer kütüphanede yer bul uygulamamıza bir güncelleme yapsaydık, ve insanların bırakıp gittikleri defter kitaplarını ekleseydik. Her güncellemede aynı işlemi yeni kodumuz için tekrarlamak zorunda kalacaktık.
-   **Çözüm:** Docker'a **tek bir tarif** (yani **Dockerfile**) vererek şunu demeliyiz: "Bu Nginx imajını al, bu dosyaları otomatik olarak içine koy ve sonra bu tarifi **alku_oyun_v2** adıyla kaydet." İşte bu tarif, Docker'daki otomasyonun başlangıcıdır.

![](https://cdn-images-1.medium.com/max/979/1*4l41dki42QzjF4vLPUAtSQ.png)

### 3.2 Dockerfile: İmajın Tarifi (15 dk)

**Dockerfile**, Docker'ın kendi dilinde yazılmış, adım adım talimatlar içeren bir metin dosyasıdır. Tıpkı Python'daki gibi, bu talimatları sırayla okur ve uygular.

![](https://cdn-images-1.medium.com/max/979/1*9004Txf8Qyys3ODgGph2ig.png)

Şimdi basit bir web uygulaması için temel talimatlara ve bunların ne işe yaradığına yakından bakalım:

-   \`**FROM [temel-imaj]**\`**:** **"Nereden Başlıyoruz?"** İmajımızın hangi temel imajdan (örneğin Nginx veya Python) başlayacağını belirtir. *Bizim Oyunumuz:* \`FROM nginx:latest\`
-   \`**WORKDIR [dizin]**\`**:** **"Nerede Çalışacağız?"** Konteyner içinde çalışacağımız ve dosyaları kopyalayacağımız ana dizini belirler. *Bizim Oyunumuz:* \`WORKDIR /usr/share/nginx/html\`
-   \`**COPY [kaynak] [hedef]**\`**:** **"Hangi Dosyaları Koyuyoruz?"** Kendi bilgisayarımızdaki (host) dosyaları, imajın içine kopyalar. Modül 2'deki \`docker cp\` komutunun otomatikleşmiş hali budur. *Bizim Oyunumuz:* \`COPY . .\` (Mevcut klasördeki her şeyi, çalışma dizinine kopyala)
-   \`**EXPOSE [port]**\`**:** **"Hangi Kapıda Bekliyorum?"** Uygulamanın **hangi portta çalıştığını** belgeler. *Unutmayın, bu komut portu çalıştırmaz, sadece bilgi verir!*

> ***Ek Not (Teknik Bilgi):*** *Eğer bu bir Node.js uygulaması olsaydı,* \`*COPY*\` *komutundan hemen sonra* \`*RUN npm install*\` *gibi komutlarla gerekli bağımlılıkları* ***imaj inşa edilirken*** *kurardık. Bu, her seferinde tekrar tekrar kurmak zorunda kaldığımız durumlardan da kendimizi tamamen kurtarmak anlamına gelir.*

### 3.3 Kendi İmajımızı İnşa Etme ve Test Etme (25 dk)

![](https://cdn-images-1.medium.com/max/979/1*yaDpugXY7T5zvCEmBnaZSw.png)

Artık teoriyi pratiğe dökme zamanı!
Dosya Linki: https://drive.google.com/file/d/1rkkE8MtUabB8BiAqNhO1HPS7LwOZXHz5/view?usp=sharing

**Adım 1: Dockerfile Oluşturma**

Lütfen projemizin olduğu klasörde (yani \`index.html\`'in yanında) \`**Dockerfile**\` adında, uzantısı olmayan bir dosya oluşturun. İçine şu üç sihirli satırı yazalım:

FROM nginx:latest\\
WORKDIR /usr/share/nginx/html\\
COPY . .

**Adım 2: İmajı İnşa Etme (**\`**docker build**\`**)**

İmaj tarifimizi güzelce hazırladık, şimdi burada yazdığımız işlemleri gerçekleştirip imajımızı her yerde kullanıma hazır hale getirelim. Terminalde projenizin bulunduğu klasördeyken bu komutu çalıştırın:

\`docker build -t alku-kutuphane:v1 .\`

-   \`**-t**\` **(tag):** İmajımıza kolay hatırlanabilir bir isim ve versiyon (\`alku-oyun:v1\`) verdik.
-   \`**.**\` **(nokta):** Docker'a, tarifin (\`Dockerfile\`'ın) **bu klasörde** olduğunu söyledik.
-   **Katmanlar (Layers):** Komutu çalıştırdığınızda her bir **FROM**, **WORKDIR** ve **COPY** komutunun ayrı bir **katman** olarak işlendiğini göreceksiniz. Bu katmanlama, Docker'ın en hızlı ve verimli olmasının sırrıdır.

**Adım 3: İmajı Çalıştırma ve Test Etme**

Artık elimizde Modül 2'deki Nginx imajı değil, **kendi inşa ettiğimiz** \`**alku-oyun:v1**\` imajımız var! Çalıştırmak için komutu güncelliyoruz:

\`docker run -d -p 8081:80 --name oyun_v3 alku-oyun:v1\`

**Doğrulama:** Tarayıcıdan \`**localhost:8081**\` adresine gidin. Oyununuz direkt olarak açılmalı.

> ***SONUÇ:*** *Tebrikler!* \`***docker cp***\`** *ile kopyalama ve container'ın içine girip ayarlamalar yapma zahmetinden kurtuldunuz!*** *Bir sonraki modülde, bu oyuna bir arka plan servisi ekleyip* ***ağları*** *karıştırarak mühendislik seviyesini daha da artıracağız. Artık oyunumuz sadece statik değil, verileri de yönetecek!*

[COMPLETE:module3-docker-image-building]

### Final: İmajı Paylaşma ve Her Yerde Kullanma (Registry Kullanımı)

Arkadaşlar, şimdi \`**alku-oyun:v1**\` imajımız bilgisayarımızda. Peki bu tarifi **ALKÜ'deki 50 arkadaşımızla** nasıl paylaşacağız? Tekrar mail atmak mı? Hayır! **Kayıt Defterleri (Registry)** işte tam bu noktada devreye giriyor.

Modül 1'de bahsettiğimiz o büyük yemek kitabı (Docker Hub) şimdi bizim bu hazırladığımız özel imajları kolaylıkla paylaşmamızı sağlayacak.

1.  **Giriş Yapma:** İlk olarak terminalinizden Docker Hub hesabınıza giriş yapmanız gerekiyor: \`docker login\` *(Bu komutu verdiğinizde kullanıcı adınızı ve şifrenizi soracaktır.)*
2.  **İmajı Etiketleme (Tagging):** Docker Hub'a yüklemek için imajımızın adını, **kullanıcı adımızla** birlikte yeniden etiketlemeliyiz (tarifin üzerine kendi adımızı yazmak gibi): \`docker tag alku-oyun:v1 <kullanici_adiniz>/alku-oyun:v1\` *(Örnek:* \`*docker tag alku-oyun:v1 burakgizlice/alku-oyun:v1*\`*)*
3.  **İmajı Yükleme (Pushing):** Artık bu tarifi sunucuya gönderebiliriz! \`docker push <kullanici_adiniz>/alku-oyun:v1\` *(Bu, birkaç saniye veya dakika sürebilir.)*
4.  **Sizden İstek:** Şimdi, benim yüklediğim imajı (kendi kullanıcı adımla etiketlenmiş halini) **herkesin kendi bilgisayarına çekmesini** istiyorum: \`docker pull <benim_kullanici_adim>/alku-oyun:v1\`

[COMPLETE:module3-pulling-from-burak]

#### 💡 Kritik Not: Docker Hub Her Zaman Çözüm Değil

Şunu hayal edelim: Şirketiniz içinde çok kritik, sadece sizin ekibinizin kullanması gereken bir uygulama geliştirdiniz. Bu uygulamayı tüm dünyaya açık olan Docker Hub'a yüklemek **güvenlik açısından doğru olmaz.**

İşte bu noktada devreye **yerel (Local / Private) Registry'ler** giriyor. Siz, tıpkı Docker Hub gibi, ancak sadece şirket ağından erişilebilen kendi özel sunucunuzu kurarsınız. Uygulamanızı buraya yüklersiniz ve ekip arkadaşlarınıza haber verirsiniz. Onlar da herhangi bir uyumsuzluk hatası almadan, sadece:

\`docker pull <özel_sunucu_adresi>/<imaj_adi>\`

komutunu kullanarak uygulamayı kolayca çekebilirler. Bu sayede uygulamanız hem **izole** hem de **profesyonel bir şekilde** dağıtılmış olur.`
  },
  {
    id: 'module456',
    title: 'Modül 4-5-6',
    content: `### Kapanışa Doğru: Bir Üst Seviyede Neler Var? (45 Dakika)

Arkadaşlar, Modül 3 ile Docker'ın en kritik üç adımını (Çalıştırma, CLI Yönetimi ve Kendi İmajını İnşa Etme) tamamladık. Şu an elinizde, çoğu yazılım geliştiricinin bilmesi gereken temel araç seti var.

Ancak gerçekçi olalım: **Zamanımız daraldı!**

Programımızda kalan **Ağ Yönetimi, Veri Yönetimi ve Docker Compose** konuları, *profesyonel bir uygulamayı hayata geçirmek* için olmazsa olmaz konulardır. Bu konuları 15'er dakikalık mini seanslarla **teorik olarak** işleyeceğiz.

> ***Pratik Etmek İsteyenlere:*** *Bu bootcamp bittiğinde, tıpkı burada yaptığımız gibi, adım adım pratik edebileceğiniz,* ***ALKÜ Kütüphane Oyunu'nun tam versiyonunu içeren (Arka-Yüz, Veritabanı dahil)*** *detaylı kaynakları ve komut dosyalarını içeren bir* ***GitHub*** *paylaşacağım. Yani zamanımızın yetmediği pratik kısmı size emanet!*

Hadi başlayalım.

### Modül 4: Konteyner Ağ Yönetimi (Container Networking) (15 dk)

**Ana Fikir:** "Konteynerleriniz Sadece Çit Değil, Aynı Zamanda Telefon Hattına Da Sahip!"

#### 4.1 Port Haritalama (Port Mapping) Hakkında Unuttuklarımız

Modül 2'de \`**docker run -p 8081:80**\` komutunu kullanmıştık. İşte bu **Port Haritalama'dır.**

-   **Neden Gerekli?** Konteynerler izole ortamlardır. Nginx 80. portta çalışsa bile, bu sadece çitin **içindeki** bir numaradır. Biz \`-p 8081:80\` diyerek, Host OS (bizim bilgisayarımız) üzerindeki 8081 numaralı kapıyı, Konteynerin 80 numaralı kapısına bağlıyoruz.

**Hızlı Canlı Uygulama (Port'ların Çalışma Mantığı):**

Arkadaşlar, Modül 2'deki Nginx'i tekrar çalıştıralım, ama bu sefer **farklı bir host portu** ile. Bu, Port Mapping'in tek yönlü bir köprü olduğunu kanıtlayacak:

1.  \`docker run -d -p 9000:80 --name farklı_port_oyun nginx\`
2.  Tarayıcıyı açıp \`**localhost:9000**\` adresine gidin. Çalıştığını göreceğiz.
3.  Şimdi tarayıcıyı açıp \`**localhost:80**\` adresine gidin. Çalışmayacak!

Bu, 80 numaralı portun sadece *konteynerin* içinde kaldığını, bizim sadece 9000 numaralı kapıyı açtığımızı kanıtlar.

\`**docker ps**\` **ile de bağlanılan portlar gözlemlenebilir.**

#### 4.2 Konteynerler Arası İletişim (User-Defined Networks)

Peki ALKÜ Kütüphane Oyunumuzun **ön yüzü (Front-end) olan konteyner** ile yeni ekleyeceğimiz **arka yüzü (Back-end) olan konteyner** nasıl konuşacak? IP adresleriyle uğraşmak çok zahmetli!

-   **Çözüm:** Docker'ın **Kullanıcı Tanımlı Ağları (User-Defined Networks)**.
-   **Ne İşe Yarar?** Bu, konteynerlere özel bir **özel ağ (private network)** kurar. Bu ağa bağlı konteynerler, birbirleriyle **doğrudan isimleriyle** konuşabilirler!

> ***Örnek:*** *Arka yüzümüzün konteyner adına* \`***oyun_api***\` *dediysek, ön yüzümüz arka yüze IP adresi yerine direkt* \`***http://oyun_api/notes***\` *yazarak ulaşır. Bu, profesyonel bir mimarinin temelidir.*

**Hızlı Canlı Uygulama (Ağ Oluşturma):**

\`docker network ls\` komutunu çalıştıralım.

Çıktıda **üç tane varsayılan ağ** göreceksiniz:

-   \`**host**\` **ve** \`**null**\`**:** Bunlar, özel durumlar için kullanılan, şimdilik bilmemize gerek olmayan ağlar.
-   \`**bridge**\` **(Köprü):** Bu Docker'ın **varsayılan** ağ trafiğidir. Modül 2'de çalıştırdığınız tüm konteynerler (Nginx, Jupyter) buraya bağlıydı. Ancak bu ağda, konteynerler birbirini **isimleriyle** göremezler; sadece IP adresleriyle iletişim kurabilirler, ki bu da zahmetlidir.

İşte bu yüzden **özel ağımızı** kuruyoruz:

\`docker network create alku_net\`

**Şimde** \`**docker network ls**\` **yazın.** Artık listede dördüncü bir ağ var: \`**alku_net**\`**!** Bu ağ, tıpkı evinizdeki Wi-Fi gibi, bu ağa bağladığımız tüm konteynerlerin (ön yüz, arka yüz) birbirini **direkt isimleriyle** bulabileceği, izole bir iletişim hattıdır.

### Modül 5: Veri Yönetimi (Managing Data) (15 dk)

**Ana Fikir:** "Uygulamanız Ölümsüz Olsun!"

#### 5.1 Verilerin Geçiciliği Sorunu (Ephemeral Data)

Modül 2'deki \`**--rm**\` komutunu hatırlayın. Konteynerler **geçicidir (ephemeral)**. Bir konteyneri sildiğiniz anda, içindeki tüm veriler (loglar, geçici dosyalar) de yok olur.

Peki biz oyunumuzda yeni yerler açtığımızda bu verilerin kaybolmasını ister miyiz? Asla! Verileri **kalıcı** hale getirmeliyiz.

#### 5.2 Çözüm: Docker Volume'ler

Docker, bu sorunu çözmek için iki ana yöntem sunar:

1.  **Bind Mounts (Bağlama):** Konteynerdeki bir klasörü, **bilgisayarımızdaki (Host OS) belirli bir klasöre** doğrudan bağlar. *Avantajı:* Dosyalara dışarıdan erişmek kolaydır.
2.  **Named Volumes (İsimli Birimler):** Konteyner verilerinin Docker tarafından yönetilen **özel bir alanda** saklanmasıdır. *Avantajı:* Daha güvenlidir, performansı daha yüksektir ve Docker'ın tercih ettiği yöntemdir.

> ***Örnek:*** *Yeni ekleyeceğimiz* ***SQLite veritabanını*** *bir Volume'e bağlayacağız. Konteyner çökse bile, Volume'deki boş yerler listesi* ***güvende*** *kalacak.*

**Hızlı Canlı Uygulama (Volume'ün Gücü):**

***Bind Mounts (Bağlama):***

1.  **Klasör Oluşturma:** Masaüstünüzde \`**oyun_data**\` adında bir klasör oluşturun.
2.  **Veriyi Bağlayarak Yazma:** \`docker run --rm -v $(pwd)/oyun_data:/veri alpine sh -c "echo 'Yer bulundu' > /veri/log.txt"\`
3.  **Hemen Kontrol:** \`**oyun_data**\` **klasörünüze** bakın. İçinde \`**log.txt**\` dosyasını göreceksiniz.
4.  **Konteyneri Siliyoruz:** Konteynerimiz zaten \`--rm\` ile sildi kendini. Ama \`oyun_data\` klasörünüzdeki veri **HALA ORADA!**

***Named Volumes (İsimli Birimler):***

1.  **Volume Oluşturma:** \`docker volume create oyun_verileri\`
2.  **Veri Yazma:** \`docker run --rm -v oyun_verileri:/veri alpine sh -c "echo 'Yer bulundu' > /veri/log.txt"\`

Konteyner silindi. Şimde **tamamen farklı, sıfır bir konteyner** çalıştıracağız:

\`docker run --rm -v oyun_verileri:/goster alpine cat /goster/log.txt\`

**Sonuç:** Sıfırdan oluşturduğumuz bu ikinci konteyner, anında gidip **eski veriyi** Volume'den çekti ve okudu: **'Yer bulundu'**!

### Modül 6: Docker Compose (15 dk)

**Ana Fikir:** "Tek Komutla Tüm Uygulamayı Başlat!"

#### 6.1 Problemin Büyüklüğü

Şu an ALKÜ Kütüphane Oyunumuz 3 parçadan oluşuyor:

1.  **Ön Yüz (Nginx):** Kendi imajımız.
2.  **Arka Yüz (API):** Kendi imajımız (Node.js/Python).
3.  **Veritabanı (SQLite):** Hazır imaj.

Bu üçünü çalıştırmak için 3 uzun \`**docker run**\` komutu yazmak, ağlarını manuel bağlamak, volume'lerini tek tek tanımlamak gerekir. **Bu çok zahmetli!**

#### 6.2 Çözüm: Docker Compose'un Sihri

**Docker Compose**, çoklu konteynerli uygulamaları tanımlamak ve çalıştırmak için kullanılan bir araçtır.

-   \`**docker-compose.yml**\`**:** Tüm bu ayarları (hangi imajı çalıştır, hangi portu bağla, hangi ağa dahil et, hangi volume'ü kullan) **tek bir YAML dosyasına** yazarsınız. Bu, uygulamanızın **manifestosu** olur.
-   **Tek Komutla Başlatma:** Artık 3 ayrı komut vermek yerine, tek bir klasörde: \`docker compose up\`

Bu komut, YAML dosyasını okur ve tüm servisleri (ön yüz, arka yüz, veritabanı) doğru sırayla, doğru ağa bağlı olarak, verileri güvende tutacak şekilde ayağa kaldırır. **Profesyonel Docker kullanımının zirvesi budur!**

**Hızlı Canlı Uygulama (YAML Gösterimi ve Tek Komut):**

Arkadaşlar, 3 parçalı uygulamamızı (Ön Yüz, Arka Yüz, Veritabanı) çalıştırmak için **3 ayrı** \`**docker run**\` komutu yazmak yerine...

Gördüğünüz gibi, bu tek YAML dosyası tüm ayarları, ağları ve volume'leri tanımlıyor.

-   Bunu çalıştıran komut sadece: \`docker compose up -d\`
-   Kapatan komut sadece: \`docker compose down\`

İşte bu, profesyonel bir yazılımcının projesini dağıtma şeklidir. **Kurulum sıfır, zahmet sıfır.**

### Kapanış ve Final (Soru-Cevap ve Kaynak Paylaşımı)

Arkadaşlar, tebrikler! 4 saatlik hızlandırılmış Docker bootcamp'imizin sonuna geldik.

Unutmayın: En iyi öğrenme pratiğin ta kendisidir.

Şimde sorularınız varsa, kalan zamanı onlara ayıralım! Anonim formları tekrar doldurarak bootcamp sonunda sahip olduğunuz özgüven seviyesini dürüstçe bildirirseniz memnun oluruz.
![](https://cdn-images-1.medium.com/max/979/1*2Ez8sAAK3py0o5ezLwTlLQ.png)`
  }
];