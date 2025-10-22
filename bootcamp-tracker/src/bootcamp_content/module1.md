### **Modül 1 --- Hoşgeldiniz, Nedir bu Docker?**

### Önce Docker'ın Çözdüğü Problemi Anlayalım: (5dk)

Eğer daha önce herhangi bir program kodladıysanız, veyahut ileride kodlamanız gerekirse muhtemelen en başlarda hepimizin yaşadığı ortak bir problemle karşılaşacaksınız!\
Heyecanla kodunuzu yazdınız, tam istediğiniz gibi çalışan ve sizi mutlu eden bir programınız var diyelim. 

Örneğin benim geliştirdiğim ALKÜ Kütüphanesinde yer bulmak oyunu!

Bu programı arkadaşlarıma da gönderip onların da oynamalarını istiyorum, sizler de takım arkadaşlarınız için kıymetli ve kritik işlevsel programlar yazıp bunu onlara kullanmaya başlamaları için göndermek istiyor ve hatta göndermek zorunda olabilirsiniz.

Programınızı bir şekilde paketleyip arkadaşlarınıza veya herhangi birine yolladığınızda başınıza gelecek şey arkadaşınızın size bu çalışmıyor demesidir!

Bir yazılım çalışmak için şu üç şeye muhtaçtır:\
- Kaynak koduna (yazdığımız ALKÜ Kütüphane'de Yer Bul oyunu)\
- Doğru Bağımlılıklara (Python, Node, kütüphaneler)\
- Doğru Ortama (İşletim sistemi, ortam değişkenleri)

Muhtemelen arkadaşınız kendi bilgisayarında yüklü olmayan veya erişilemeyen bir kütüphane, veya sürüm uyuşmazlıkları gibi sebeplerle hatalar alacak.

Çünkü onun bilgisayarından tam olarak sizinkiyle aynı durumda olmasını bekleyemezsiniz.

Docker, kodu, bağımlılıkları ve ortamı tek b ir standart taşınabilir birimde paketleyerek bu sorunu çözer. Yabancı kaynaklarda bu sorunu "It Works on My Machine!" olarak da görebilirsiniz. Docker'ı anlayıp kullanmaya başlamak yalnızca yazdığınız programları güzelce paketlemekte değil, uzun ve yorucu kurulum süreçlerini de rahatlatma konusunda size epey yardımcı olacak. 

### Konteynerler vs. Sanal Makineler: Fark Ne? (10dk)

Peki bu "standart taşınabilir birim" tam olarak nedir? Çoğumuzun bildiği bir teknoloji var: **Sanal Makineler (VM)**. Docker'ı anlamak için önce VM'in ne yaptığını, sonra da Docker'ın nasıl farklılaştığını görelim.

#### Sanal Makineler (VM): Köpeğiniz İçin Bambaşka Bir Ev 🏡

-   **Analoji:** Sanal Makine (VM), **uygulamanız olan köpeğiniz için bambaşka, sıfır bir ev inşa etmek gibidir**. Bu evin kendi işletim sistemi, kendi donanımı vardır ve köpeğiniz orada canının istediği her şeyi yapabilir.
-   **Ağırlığı:** VM, uygulamanızın (köpeğinizin) yanında, **bütün bir işletim sistemini, çekirdeği (kernel) ve donanım emülasyonunu** da taşır. Bu yüzden **ağırdır, yavaş başlar** ve aşırı kaynak tüketir. Yazdığımız programı çalıştırmak için koca bir eve ihtiyacımız yok!

#### Konteynerler: Köpeğin Evinizin Bahçesinde Çiti 🚧

-   **Analoji:** Docker Konteyneri ise **uygulamanız olan köpeğinizin evinize (Ana İşletim Sisteminize) zarar vermemesi için sağlam bir çit çekmek gibidir**. Köpeğiniz (uygulamanız) o çitin içinde istediğini yapar ama **sizin evinizin (OS'inizin)** düzenini bozamaz.
-   **Teknik Fark:** Bir konteyner **donanımı sanallaştırmaz**. Ana işletim sistemi (Host OS) ile **aynı çekirdek (kernel) üzerinde çalışır**. Sadece diğer konteynerlerden ve ana sistemden **izolasyon** sağlar. Yani VM'deki gibi ağır bir yük yoktur.
-   **Temel Çıkarım:** Konteynerler **saniyeler içinde** başlar, **çok hafiftir** ve yalnızca uygulamanızın çalışması için gerekli minimum kaynağı kullanır. Amacımız sadece uygulamamızı izole etmek ve taşınabilir kılmak; bunun için yeni bir ev inşa etmeye gerek yok!

#### 💡 Detaylı Teknik Bilgi: Çitin Sırrı (`cgroups` ve `namespaces`)

Arkadaşlar, mühendislik gözüyle bakarsak, konteynerler sihir değil; Linux'un halihazırda var olan iki temel teknolojisi üzerine inşa edilmiş, **kullanımı kolaylaştırılmış** bir araçtır:

1.  **Namespaces (İsim Alanları):** Bu teknoloji, bir uygulama için **sanki tek başınaymış gibi** görünen izole bir ortam yaratır. Kendi ağ arayüzüne, kendi kullanıcı ID'sine, kendi dosya sistemine sahip olmasını sağlar.
2.  **cgroups (Kontrol Grupları):** Bu da bir uygulamanın kullanabileceği CPU, RAM, disk I/O gibi **kaynakları kısıtlamaya** yarar. Bu sayede bir konteynerin tüm makine kaynaklarını yemesini engellersiniz.

Özetle, konteynerler, bu `cgroups` ve `namespaces` teknolojilerini paketleyip herkesin kolayca kullanabileceği bir ürün haline getirmiştir.

### Docker'ın Temel Üçlüsü: İmaj, Konteyner ve Kayıt Defteri (Registry) (10dk)

Şimdi gelelim bu çitin, bu kutunun, yani bu **konteyner** olayının arkasındaki üç temel yapı taşına. Docker dünyasında her şey bu üç kavram etrafında döner. Bunları anladığımız anda kalan her şey kolaylaşacak:

#### 1\. İmaj (Image) 🖼️: Orijinal Yemek Tarifi

-   **Nedir?** İmaj, uygulamanızın, tüm bağımlılıklarının ve ayarlarının **salt okunur (read-only)** bir şablonudur. Tıpkı bir .ISO dosyası gibi düşünebilirsiniz. **Statiktir**, bir kez oluşturulur ve değişmez.
-   **Benzetme:** Bu, bizim **ALKÜ Kütüphane Oyunu'nun tam ve kesin tarifi** demektir. Hangi ReactJS sürümünü, hangi kütüphaneyi kullanacağının bilgisi içeridedir.

#### 2\. Konteyner (Container) ⚙️: Pişmiş Yemek

-   **Nedir?** Konteyner, bir imajın **canlı, çalışan örneğidir**. İmajı çalıştırdığınız anda konteyner oluşur. İmaj bir kez hazırlanır, ama ondan binlerce konteyner çalıştırabilirsiniz.
-   **Farkı:** İmaj statikken, konteyner **dinamiktir** ve bir durumu (state) olabilir. İçindeki dosyaları değiştirebilir, log üretebilirsiniz (ancak bu veriler genellikle kalıcı değildir, 5. modülde kalıcı hale getireceğiz!).

#### 3\. Kayıt Defteri (Registry) ☁️: Büyük Yemek Kitabı

-   **Nedir?** İmajların depolandığı ve paylaşıldığı merkezi bir depodur. En meşhuru, tüm dünyanın kullandığı **Docker Hub**'dır.
-   **Akış:** Bizim ekip ALKÜ Kütüphane Oyunu'nun **İmajını** hazırlar, sonra bu İmajı **Kayıt Defterine** yükler. Sizin makineniz de o İmajı **çeker (pull)** ve **çalıştırarak** bir **Konteyner** oluşturur.
-   **Yerel Kayıt:** Unutmayın, şirketler ve kurumlar kendi hassas kodlarını bu genel defter yerine, kurum içinde sadece kendilerinin erişebildiği **yerel (private) kayıt defterlerinde** saklarlar. Bu, bizim için çok kıymetli bir kaynak olacak.

### Docker Mimarisine Kısa Bir Bakış ve Kapanış (5dk)

Peki biz terminale `docker run` yazdığımızda arka planda bu sihir nasıl oluyor?

Docker, çok basit bir **İstemci-Sunucu** mimarisi üzerinde çalışır:

1.  **Docker Daemon (Sunucu/Motor):** Bu, bilgisayarınızın arka planında sürekli çalışan ana hizmettir. Konteynerleri oluşturan, imajları depolayan, ağları yöneten ve ağır işi yapan *motor* budur. Tüm işi o yapar.
2.  **Docker İstemcisi (CLI):** Bu, sizin terminalden yazdığınız `docker run` gibi komutlardır. İstemci, bu komutu alır ve Daemon'a gönderir.

**Yani süreç şu:** Siz **İstemci'ye** (CLI) bir emir verirsiniz, o da arka planda çalışan **Daemon'a** bu isteği iletir. Daemon da sizin için gerekli İmajı çeker ve Konteyneri ayağa kaldırır.

### Modül 1 Kapanışı

**Sadece bu kadar!** Docker, uygulamamızın kodunu ve ortamını bir **İmaj** haline getiren, bunu bir **Kayıt Defteri** aracılığıyla paylaşmamızı sağlayan ve herkesin tek komutla **Konteyner** olarak çalıştırabileceği bir araçtır.

Amacımız, **"Benim makinemde çalışıyordu!"** mazeretini ortadan kaldırmaktır.

Hazırsanız, bir sonraki modülde hemen bu İstemci'yi kullanmaya başlayıp **ALKÜ Kütüphane Oyunu'nu** ilk kez bir Docker konteyneri içinde çalıştıracağız!