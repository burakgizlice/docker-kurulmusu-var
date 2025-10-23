### Modül 1.5: Docker Kurulumu ve Anonim Değerlendirme! (30dk)

> *Arkadaşlar, Modül 1'de ne kadar heyecanlı bir dünyaya adım attığımızı gördük. Şimdi sıra pratik yapmaya geldi, ancak uygulamaya geçmeden önce temel aracımız olan Docker'ı bilgisayarımızda hazır etmemiz gerekiyor.*

> *Bu 30 dakikalık süreyi üç gruba ayrılarak en verimli şekilde kullanacağız.*

### 1\. Hızlı Teşhis: Sen Hangi Gruptasın? (5 dk)

> *Şimdi herkesin terminalini (Komut İstemi/PowerShell/Terminal) açmasını istiyorum. Lütfen şu komutu yazın ve Enter'a basın:*

> `*docker --version*`

> *Bu komutun çıktısına göre kendinizi bir gruba dahil edin:*

-   **Grup A (Hazır Gelenler):** Komut çıktısında bir sürüm numarası (`Docker version 25.0.3, build 4930bc0`) gibi bir yazı gördünüz. **Siz Hazırsınız!** Harika bir iş çıkardınız.
-   **Grup B (Kurulum Gerekli):** Komut bulunamadı veya benzeri bir hata aldınız. Docker henüz sisteminizde kurulu değil.
-   **Grup C (Sorunlular):** Komut var ama "Docker Engine çalışmıyor" veya "WSL hatası" gibi bir sorun alıyorsunuz.

### 2\. Ön Değerlendirme (Anonim Anket): Başlangıç Noktamız Ne? (10 dk)

> *Şimdi, gruplarımız ne olursa olsun,* ***herkesin*** *doldurmasını istediğim kısa ve anonim bir ön değerlendirme formu var.*

> *Bu form, kaç puan aldığınızı ölçmekten çok, bu bootcamp'e hangi konularda ne kadar güvenle başladığınızı görmek için. Tamamen anonimdir, hiçbir çekinceniz olmasın lütfen.*

![](https://cdn-images-1.medium.com/max/979/1*W2n_LLwCPzc1bxLXA1KAAQ.png)

-   **Grup A'daki arkadaşlar:** Siz formu doldururken biz de B ve C gruplarıyla kurulumu başlatacağız. Lütfen form bitince hemen bir sonraki **Yan Aktivite** bölümüne geçin!
-   **Grup B ve C'deki arkadaşlar:** Lütfen siz de formu telefonunuzdan veya tarayıcınızdan doldurmaya başlayın. Formu bitirir bitirmez hemen kuruluma geçeceğiz.

### 3\. Kurulum ve Sorun Giderme (15 dk)

#### 🚀 Grup B ve C: Kurulum Başlasın!

Kurulum linkini paylaşıyor ve adımları hızlandırıyorum. Bu talimatları çok basit adımlara ayırdım ki, en karmaşık hata bile çözülsün:

> Adım 1: İndirme (Herkes İçin Ortak)

1.  **Tarayıcınızı Açın** ve **"Docker Desktop İndir"** diye aratın (veya paylaştığım linke gidin).
2.  İşletim sisteminiz neyse (Windows, Mac), ona uygun butona tıklayıp dosyayı indirin. **Mac kullanıcıları** için iki seçenek olabilir; çipleri M1/M2/M3 olanlar "Apple Chip" olanı, diğerleri "Intel Chip" olanı seçmeli.

> Adım 2: Windows İçin Can Alıcı Ayar (Çoğunluk İçin)

Arkadaşlar, Docker'ın Windows'ta çalışması için **WSL 2 (Windows Subsystem for Linux)** adlı küçük bir Linux ortamına ihtiyacımız var. Burası **en çok hata aldığımız yer!**

1.  **Komut Verin:** Terminali açın ve indirme devam ederken hemen şu komutu yazıp **Enter** yapın: `wsl --update`
2.  **Yeniden Başlatma:** Kurulum bittiğinde sizden **bilgisayarı yeniden başlatmanız** istenebilir. Bu çok normal ve gerekli bir adımdır.
3.  **Hata Kontrolü (BIOS):** Eğer kurulum size "Sanallaştırma (Virtualization) açık değil" gibi bir hata verirse, bu BIOS ayarlarınızı kontrol etmeniz gerektiği anlamına gelir. **Bu hatayı alanlar hemen el kaldırsın!**

> Adım 3: Kurulumu Tamamlayın

1.  İndirilen dosyayı çift tıklayın ve çıkan her şeye **"OK"** veya **"Devam Et"** deyin. Çoğu ayar varsayılan olarak kalabilir.
2.  Kurulum bittiğinde, Docker sizden hesabınıza giriş yapmanızı isteyebilir. Şimdilik bu adımı **atlayabiliriz.**

> ***Teknik Destek:******Grup C'deki*** *(sorunlu) ve BIOS hatası alan arkadaşlara yardım etmeleri için salondaki teknik arkadaşlarımızı yönlendirelim.*

#### ✅ Grup A: Yan Aktivite ve Eğlenceli Pratik

Sizler anketi doldurdunuz ve hazırsınız. Sizden biraz eğlenerek Modül 2'ye hazırlanmanızı istiyorum. Bu komutlar tıpkı çitini yeni çektiğimiz köpeği çalıştırmak gibi olacak:

1.  **Sistem Kontrolü:** Önce meşhur "Hello World" imajını bir çalıştırın: `docker run hello-world`
2.  **Eğlenceli Konteyner:** Şimdi size bir **inek** göstereceğim. Bu imaj, bize terminalde komik bir inek ASCII sanatı gösterir: `docker run --rm rancher/cowsay "Docker Harika Bir Icat"`
3.  **Temizlik:** Ardından, Nginx'in arka planda nasıl çalıştığını görmek için:

-   İlk İmajı Çekin ve Çalıştırın: `docker run -d nginx:latest`
-   Konteyneri Görün: `docker ps`
-   Temizleyin: `docker stop <id>` ve `docker rm <id>` komutlarını kullanarak çalıştırdığınız Nginx konteynerini sistemden temizleyin.

[COMPLETE:cowsay]

### 4\. Kapanış ve Ara

Arkadaşlar, kurulumu tamamlayabilenler lütfen terminalde son bir doğrulama yapsın:

`docker run hello-world`

[COMPLETE:hello-world]