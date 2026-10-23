# Style Guide — Developer Hub Dashboard

> Spesifikasi visual dan komponen untuk mereproduksi dashboard Developer Hub pada gambar referensi. Gunakan sistem kartu di bagian 4.9 sebagai acuan utama untuk kartu dashboard baru maupun yang diperbarui.

## 1. Arah visual

- **Gaya:** dashboard operasional dark glass, atmosferik, padat informasi, dengan permukaan midnight navy dan highlight teal.
- **Kesan:** tenang, profesional, berorientasi status. Informasi harus mudah dipindai di atas latar bertekstur.
- **Komposisi:** kanvas layar penuh; rail navigasi tetap di kiri; bar informasi di atas; dashboard Developer Hub dengan panel ringkasan, Focus Session, Quick Tools, dan Tasks.
- **Prioritas:** keterbacaan, pemindaian status, jarak rapat-teratur, dan hierarki melalui permukaan serta warna status.
- **Jangan mengubah arah visual** menjadi dashboard SaaS putih, tema ungu/biru generik, jendela macOS dengan traffic lights, atau hero marketing.

### Prinsip visual

1. Kanvas memakai latar biru-hitam dengan glow radial teal, slate, dan sedikit amber yang lembut. Background tidak boleh mengganggu teks.
2. Panel besar hampir hitam, sudut membulat lebar, batas tipis transparan, dan bayangan dalam. Blur dipakai selektif; isi panel tetap kontras.
3. Teal adalah aksen navigasi dan aksi. Aksen warna tambahan hanya menandai kategori ikon, prioritas, atau status task.
4. Kartu dashboard memakai permukaan gelap berlapis, border halus, radius besar, dan struktur konten yang konsisten. Hindari ilustrasi dekoratif yang tidak mendukung fungsi Developer Hub.
5. Gunakan ikon outline yang konsisten, bukan emoji. Proyek memakai `lucide-react`.
6. Kontrol kecil berbentuk pill atau lingkaran. Panel dan kartu memakai radius besar.
7. Jangan memberi glow ke semua elemen. Cahaya hanya untuk aksen merek, status, dan fokus aktif.

## 2. Design tokens

Gunakan token CSS berikut sebagai nilai dasar. Tempatkan token global di `app/globals.css` agar halaman dan komponen berbagi nilai yang sama.

### 2.1 Warna

| Token | Nilai | Penggunaan |
| --- | --- | --- |
| `--canvas` | `#06111B` | Latar utama |
| `--canvas-raised` | `#0A1924` | Area kerja di belakang panel |
| `--surface-panel` | `rgba(3, 9, 14, 0.88)` | Panel Containers, Suggestions, Tasks |
| `--surface-card` | `rgba(7, 17, 23, 0.88)` | Kartu kontainer |
| `--surface-card-hover` | `rgba(15, 30, 38, 0.96)` | Hover kartu |
| `--surface-widget` | `rgba(5, 11, 16, 0.94)` | Panel utama dashboard seperti Developer Hub, Focus Session, Quick Tools, dan Tasks |
| `--surface-card-raised` | `rgba(15, 22, 29, 0.88)` | Kartu metrik dan Quick Tools di dalam panel |
| `--surface-card-inset` | `rgba(0, 0, 0, 0.58)` | Area timer dan kartu task yang perlu tampak lebih dalam |
| `--surface-control` | `rgba(255, 255, 255, 0.07)` | Pill, input, menu, tombol sekunder |
| `--surface-control-hover` | `rgba(255, 255, 255, 0.12)` | Hover kontrol |
| `--line-subtle` | `rgba(255, 255, 255, 0.09)` | Border panel/kartu |
| `--line-strong` | `rgba(255, 255, 255, 0.17)` | Border hover/fokus |
| `--text-primary` | `#F5F7F8` | Judul dan teks utama |
| `--text-secondary` | `rgba(235, 241, 243, 0.72)` | Deskripsi dan label sekunder |
| `--text-muted` | `rgba(225, 234, 237, 0.45)` | Metadata, tanggal, hint |
| `--accent-teal` | `#27C6C1` | Ikon aktif, aksi, fokus |
| `--accent-teal-soft` | `rgba(39, 198, 193, 0.16)` | Latar state aktif |
| `--status-green` | `#31C35B` | Kontainer aman/normal |
| `--status-orange` | `#FF8A12` | Kontainer penuh/peringatan |
| `--status-red` | `#E94326` | Status merah/tertutup sesuai data |
| `--status-neutral` | `#92999B` | Kosong, pending, atau nonaktif |
| `--status-critical` | `#F36A2E` | Badge tugas Critical |
| `--status-system` | `#F39A28` | Badge tugas System |

Status tidak boleh disampaikan melalui warna saja. Sertakan persentase atau label seperti `EMPTY`, `PENDING`, dan `CLOSED`.

### 2.2 Radius, ukuran, dan bayangan

| Token | Nilai acuan | Penggunaan |
| --- | --- | --- |
| `--radius-control` | `999px` | Pill, tab, icon button |
| `--radius-task` | `16px` | Kartu tugas |
| `--radius-card` | `20px` | Kartu kontainer |
| `--radius-dashboard-card` | `24px` | Kartu metrik dan Quick Tools |
| `--radius-dashboard-panel` | `30px` | Panel dashboard besar |
| `--radius-panel` | `28px` | Panel Suggestions dan Tasks |
| `--radius-shell` | `32px` | Shell dashboard jika dibatasi sebagai jendela |
| `--shadow-panel` | `0 24px 64px rgba(0,0,0,.42)` | Panel besar |
| `--shadow-card` | `0 12px 30px rgba(0,0,0,.24)` | Kartu kontainer |
| `--shadow-focus` | `0 0 0 3px rgba(39,198,193,.22)` | Ring fokus teal |

### 2.3 Tipografi

Gunakan Geist Sans yang sudah tersedia atau system sans-serif. Angka status/persentase dapat memakai `font-variant-numeric: tabular-nums`.

| Elemen | Ukuran | Weight | Catatan |
| --- | --- | --- | --- |
| Judul panel | `20–22px` | 600 | Sedikit rapat, bukan uppercase |
| Judul halaman | `22–26px` | 600 | Bila diperlukan |
| ID kontainer | `20–22px` | 500 | Contoh `H2390`, kiri atas kartu |
| Nilai status | `12–14px` | 600 | Persentase gelap di atas pill putih |
| Deskripsi kontainer | `12–13px` | 400 | Maksimal 2 baris, rata tengah |
| Metadata/tanggal | `12px` | 400 | Warna muted |
| Judul task | `13–14px` | 500 | Satu baris bila cukup |
| Deskripsi task | `12px` | 400 | Maksimal 2 baris, line-height sekitar 1.4 |
| Label navigasi/tab | `13–14px` | 500 | Kontras tinggi saat aktif |
| Label badge | `10–11px` | 600 | Tetap terbaca |

## 3. Latar, shell, dan grid

### Latar kanvas

Gunakan warna `--canvas` dengan gradien radial besar beropacity rendah. Titik cahaya utama berada di belakang area atas-tengah/kanan panel, menyerupai pantulan ambient pada referensi.

```css
background-color: var(--canvas);
background-image:
  radial-gradient(ellipse 55% 48% at 58% 8%, rgba(220, 208, 174, .20), transparent 68%),
  radial-gradient(ellipse 50% 42% at 98% 52%, rgba(30, 105, 124, .19), transparent 68%),
  radial-gradient(ellipse 52% 55% at 4% 58%, rgba(18, 70, 91, .22), transparent 70%);
```

Untuk mengikuti referensi, gunakan kabut slate terang yang lembut di area atas-tengah, dengan glow biru-teal yang lebih gelap di sisi dan dasar kanvas. Pertahankan panel gelap agar teks tetap terbaca; jangan membuat seluruh aplikasi transparan terhadap wallpaper perangkat. Untuk memberi kesan hidup tanpa membebani interaksi, tambahkan maksimal dua glow ambient besar di belakang konten. Gerakkan glow perlahan menggunakan `transform: translate3d(...)` dengan durasi sekitar `34–42s`; gunakan gradient transparan tanpa aset gambar, filter blur berat, atau event listener pointer. Lapisan dekoratif harus `pointer-events: none`, tidak mengubah layout, dan dinonaktifkan pada `prefers-reduced-motion: reduce`.

### Layout desktop

- Tinggi aplikasi minimal `100dvh`; scroll diatur per area konten bila viewport cukup besar.
- Rail kiri selebar `84–96px`, penuh tinggi, ikon-only pada desktop. Logo di atas, navigasi vertikal, profil/avatar dekat dasar.
- Header menempati sisa lebar, tinggi sekitar `88–104px`. Info cuaca/tanggal di kiri, skor/notifikasi di kanan.
- Area kerja mulai di bawah header dengan gutter `20–28px`.
- Grid: kolom kontainer `minmax(0, 1.85fr)`, kolom samping `minmax(330px, .95fr)`, gap `20–24px`.
- Panel kiri memiliki header dan tab di atas grid yang dapat scroll. Kartu 4 kolom pada lebar referensi; turunkan ke 3/2/1 sesuai ruang.
- Kolom kanan berisi Suggestions di atas Tasks, dengan jarak sekitar `20px`.
- Batasi tinggi panel pada desktop dan scroll isi panel. Scrollbar tipis dan tidak mencolok.
- Floating assistant input berada di tengah bawah, tidak menutupi kontrol; beri padding bawah di area scroll.

### Layout responsif

- **>= 1280px:** rail ikon, dua kolom; grid kontainer empat kolom jika ruang memadai.
- **900–1279px:** rail ikon, kolom kanan menyempit, grid kontainer dua atau tiga kolom.
- **< 900px:** satu kolom; Suggestions dan Tasks turun setelah grid; rail berubah menjadi bottom navigation atau drawer.
- **< 600px:** satu kolom kartu; header menyembunyikan metadata sekunder; assistant input melebar sebagai bar bawah.
- Jangan mengunci tinggi kartu/panel pada mobile. Hindari badge atau tombol terpotong.

## 4. Spesifikasi komponen

### 4.0 Todo page heading — Task Pipeline

Heading halaman Todo mengikuti gaya dashboard Developer Hub: tegas, ringkas, dan mudah dibaca di atas latar gelap. Jangan tampilkan ikon dekoratif di sebelah judul kecuali memiliki fungsi.

- Wrapper berada di bagian atas konten, setelah top navigation, dengan jarak bawah `28px` sebelum search/filter. Beri padding atas minimal `24px` agar judul tidak tertutup header sticky.
- Susun judul dan deskripsi dalam satu kolom; kelompok aksi seperti view toggle dan `New Task` berada di sisi kanan pada desktop, lalu turun ke baris berikutnya jika ruang tidak cukup.
- Judul `Task Pipeline`: `24px` pada layar kecil dan `26px` pada desktop (`sm` ke atas), weight `600`, line-height `1.15`, letter-spacing sekitar `-0.03em`, warna `--text-primary`. Ini mengikuti skala judul halaman pada token tipografi.
- Deskripsi `Organize tasks and move development work through each stage.`: `15px` pada layar kecil dan `16px` pada desktop, weight `400`, line-height `1.5`, warna `--text-secondary`; jarak atas dari judul `8px`.
- Wrapper menggunakan `display: flex`, `align-items: center`, `justify-content: space-between`, dan gap `20px`; judul/deskripsi tidak boleh menyusut sampai terpotong. Pada mobile, stack vertikal dan tombol tetap memiliki target sentuh minimum `44px`.
- Animasi masuk opsional: opacity dan translasi vertikal maksimal `12px`, durasi `150–220ms`; hormati `prefers-reduced-motion`.

#### Ikon status task

- Header kolom `Backlog`, `Todo`, `In Progress`, `Review`, dan `Completed`, serta judul dan badge status pada modal detail task menggunakan ikon outline status; jangan gunakan titik/bullet sebagai penanda status.
- Jaga ruang kartu dengan lebar minimum kolom board `320px` pada mobile, `380px` mulai desktop (`lg`), dan `420px` pada layar lebar (`2xl`). Jika semua kolom tidak muat, board bergulir horizontal; jangan mengecilkan kartu agar semua kolom terlihat sekaligus.
- Pemetaan ikon: `Inbox` untuk Backlog, `Circle` untuk Todo, `CircleDashed` untuk In Progress, `Eye` untuk Review, dan `CircleCheck` untuk Completed.
- Ukuran ikon `16–18px`, sejajar dengan label, dan memakai warna status yang sama dengan label. Label teks tetap ditampilkan agar status jelas dan aksesibel.
- Ikon bersifat dekoratif (`aria-hidden="true"`) karena nama status sudah tersedia sebagai teks. Pertahankan bentuk ikon yang berbeda walau warna tidak terlihat.

Contoh utility Tailwind yang sesuai:

```tsx
<header className="mb-7 flex flex-wrap items-center justify-between gap-5 pt-6">
  <div className="min-w-0">
    <h1 className="text-2xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[26px]">
      Task Pipeline
    </h1>
    <p className="mt-2 text-[15px] leading-6 text-white/65 sm:text-base">
      Organize tasks and move development work through each stage.
    </p>
  </div>
  {/* Page actions */}
</header>
```

### 4.1 App canvas dan navigation rail

Rail adalah pita sempit gelap transparan. Logo teal di atas. Item berupa tombol lingkaran sekitar `42–46px`, ikon outline `20–22px`, dengan jarak vertikal `12–18px`.

- Ikon aktif berada pada lingkaran terang dengan ikon gelap atau teal.
- Ikon nonaktif putih `55–70%`; hover meningkatkan kontras dan memberi latar putih tipis.
- Badge notifikasi kecil menempel di sudut kanan atas ikon, berwarna teal dengan teks gelap.
- Avatar pengguna `40–44px`, bulat dan dekat dasar rail.
- Sediakan tooltip untuk menu ikon-only dan accessible name pada setiap tombol.
- Gunakan `<nav aria-label="Main navigation">`; route aktif memiliki `aria-current="page"`.

### 4.2 Top status bar

Header tidak memakai garis pemisah tegas. Kelompokkan identitas/konteks, cuaca dan waktu di kiri; skor dan notifikasi di kanan.

- Cuaca memakai pill tinggi `40–46px`, ikon matahari outline, kondisi/suhu, dan chevron bila dapat dibuka.
- Tanggal/jam berada dalam pill kedua, tanggal uppercase kecil dan waktu sebagai teks sekunder.
- Skor tim memakai pill panjang berisi ikon/logo tim, skor, pemisah, skor lawan, dan chevron.
- Notifikasi memakai tombol bulat `42px` dengan badge oranye kecil.
- Pill memakai `--surface-control`, border subtil, blur ringan, dan teks sekunder.
- Data cuaca, waktu, skor, serta jumlah notifikasi harus datang dari data/props, bukan nilai contoh yang tertanam di komponen produksi.

### 4.3 Main Containers panel

Panel utama kiri berlatar gelap, radius `28–32px`, padding `24–30px`, dan tinggi mengikuti viewport.

**Header:** ikon kontainer dan judul `Containers` di kiri; aksi `Request`, Settings, serta aksi berikutnya di kanan. Icon button memiliki area klik minimum `40px`.

**Tab filter:** `All`, `Open`, `Flagged`, `Requests`, `Closed` dengan count. Tab aktif terang dengan teks gelap; tab lain transparan dan teks sekunder. Implementasikan sebagai tablist/tab atau button filter dengan state aksesibel.

**Grid:** celah `8–12px`, urutkan berdasarkan data, scroll internal vertikal. Header dan tabs tetap terlihat jika layout memungkinkan.

### 4.4 Container card

Anatomi kartu:

1. **Header:** ID di kiri atas; menu `MoreHorizontal` dalam tombol bulat di kanan atas.
2. **Visual drum:** drum silinder di pusat kartu; bibir oval metal gelap, badan bergradien vertikal, outline dan bayangan dasar. Ikon recycle/status ada di tengah bila relevan.
3. **Badge nilai:** pill putih kecil dengan teks gelap seperti `93%`, diletakkan di atas drum. Untuk kosong gunakan chip hitam `EMPTY`; pending `PENDING`; tertutup `CLOSED`.
4. **Footer:** jenis/material rata tengah maksimal dua baris; tanggal pengisian atau metadata muted di bawahnya.

**Ukuran:** sekitar `190–220px` lebar dan `310–330px` tinggi pada grid referensi. Gunakan aspect ratio/min-height yang stabil dan adaptif.

**Warna status:**

| Status | Latar/glow kartu | Warna drum | Badge |
| --- | --- | --- | --- |
| Normal/terisi | Hijau gelap ke hijau translucent | `#258B43` ke `#39B84C` | Persentase putih |
| Penuh/peringatan | Cokelat tua ke amber translucent | `#F1840B` | Persentase putih |
| Bahaya/merah | Burgundy/cokelat gelap | `#D83A1E` | Persentase putih |
| Kosong | Abu charcoal low contrast | `#4D5353` | Chip hitam `EMPTY` |
| Pending | Slate/abu | Metal silver `#92999B` | Chip hitam `PENDING` |
| Closed | Slate dengan aksen hangat | Merah-oranye | Chip hitam `CLOSED` |

Gunakan tint halus, bukan fill neon datar. Setiap status memiliki label teks yang setara dengan warna. Hover/focus hanya menaikkan brightness/border, bukan mengubah status. Menu kebab berlabel aksesibel seperti `More actions for H2390`.

### 4.5 Drum illustration

Drum adalah elemen visual utama, bukan emoji atau glyph sederhana. Buat sebagai komponen CSS/HTML berlapis atau aset SVG lokal yang dapat diwarnai berdasarkan status.

- Badan berbentuk silinder, sisi hampir vertikal dan sudut bawah membulat.
- Bibir atas berupa elips gelap dengan ring luar metal dan highlight tipis.
- Tambahkan seam horizontal halus dan shadow dasar.
- Warna badan memakai gradien: sisi gelap, tengah terang, sisi gelap; simbol daur ulang tetap kontras.
- Ilustrasi dekoratif diberi `aria-hidden="true"`; persentase/status tetap tersedia sebagai teks DOM.

### 4.6 Suggestions panel

Panel berada di puncak kolom kanan, radius `28px`, padding `24–28px`, latar hampir hitam.

- Judul `Suggestions` dengan ikon sparkles di kiri.
- Tombol `Clear All` kecil dan sekunder di kanan.
- Rekomendasi berupa pesan singkat 2–3 baris dengan line-height nyaman.
- Footer: panah rekomendasi sebelumnya/berikutnya di kiri dan CTA `Request Container` di kanan.
- Panah diberi label aksesibel `Previous suggestion` dan `Next suggestion`.
- Empty state ringkas saat tidak ada saran.

### 4.7 Tasks panel

Panel berada di bawah Suggestions, mengisi tinggi sisa kolom kanan dan dapat scroll internal.

- Header: ikon list/clipboard dan judul `Tasks`; aksi `See All` dan `Add New` di kanan.
- Filter pill `All`, `Today`, `Overdue` beserta hitungan. Filter aktif memakai fill gelap solid dan teks kontras.
- Item task berupa kartu hitam radius `14–16px`, padding `16–20px`, jarak vertikal `6–8px`.
- Baris atas: checkbox, judul, badge prioritas/status.
- Baris kedua: deskripsi singkat muted.
- Baris bawah: due date/owner di kiri, delete/menu di kanan.
- Badge `Critical` oranye; `System` amber; `To-Do` outline. Kata status selalu menyertai warna.
- Checkbox punya target klik minimal `24px` dan label yang mengidentifikasi task.
- Tombol hapus memiliki accessible name yang jelas.

### 4.8 Floating assistant input

Bar bantuan terapung berada di tengah dekat dasar viewport, selebar `min(430px, calc(100vw - 32px))`, tinggi `60–68px), pill besar.

- Latar translucent abu-biru dengan border tipis dan blur `18–24px`.
- Ikon sparkles di kiri, placeholder `How can I help you?`, tombol mikrofon di kanan.
- Fokus input menampilkan ring teal.
- Pada layar kecil, bar hampir memenuhi lebar viewport dengan inset `16px`.
- Sediakan ruang bawah pada konten scroll agar bar tidak menutupi item terakhir.

### 4.9 Developer Hub dashboard cards

Bagian ini adalah acuan utama kartu dashboard Developer Hub. Semua panel dan kartu menggunakan hirarki permukaan yang sama: kanvas paling gelap, panel luar hampir hitam, kartu isi sedikit lebih terang, lalu inset hitam untuk konten fokus seperti timer atau task.

#### Panel dashboard

- Panel `Developer Hub`, `Focus Session`, `Quick Tools`, dan `Tasks` menggunakan `--surface-widget`, border `1px solid var(--line-subtle)`, radius `28–32px`, dan padding `28–36px` pada desktop.
- Gunakan shadow lembut dan tipis. Panel tidak perlu glow; glow teal hanya untuk aksi utama atau status aktif.
- Header panel berupa judul `24–28px` / weight 600, ikon outline `22–24px` bila relevan, serta deskripsi `14–16px` dengan `--text-secondary`.
- Jarak header ke konten sekitar `24–28px`. Jarak antar panel dashboard `24–30px`.
- Panel responsif: pada desktop gunakan dua kolom dengan area utama lebih lebar; di bawah `900px` susun panel vertikal. Jangan memaksa tinggi panel jika isinya bertambah.

#### Kartu metrik

- Susun metrik dalam grid empat kolom bila area cukup; turun ke dua kolom lalu satu kolom pada layar sempit.
- Kartu memakai `--surface-card-raised`, border subtil, radius `22–24px`, padding `20–24px`, dan tinggi minimum sekitar `150px`.
- Baris atas: ikon outline `20–22px` di kiri dan label konteks pendek seperti `Open`, `Done`, `Today`, atau `Saved` di kanan.
- Nilai utama `32–36px`, weight 650–700, warna primer dan angka tabular. Label penjelas `14–16px` muted berada di bawahnya.
- Gunakan warna aksen pada ikon, bukan pada seluruh latar kartu. Contoh: abu-abu untuk task aktif, teal/hijau untuk selesai, cyan untuk sesi fokus, kuning untuk catatan.
- Nilai harus tetap terbaca tanpa mengandalkan warna ikon atau label.

#### Kartu Quick Tools

- Gunakan grid dua kolom pada desktop. Kartu memiliki tinggi minimum `112–124px`, padding `20–24px`, radius `22–24px`, permukaan `--surface-card-raised`, dan border subtil.
- Ikon berada dalam tile `52–60px` persegi dengan radius `18–20px`; tile memakai tint warna aksen transparan sekitar 10–16%. Jangan mewarnai seluruh kartu dengan warna ikon.
- Isi teks berada di samping ikon: judul `17–19px` / weight 550–600 dan deskripsi `14–16px` muted, maksimal dua baris.
- Letakkan panah navigasi di ujung kanan sebagai petunjuk bahwa kartu membuka tool. Seluruh kartu boleh menjadi link jika seluruh permukaan memiliki satu tujuan.
- Hover menaikkan kecerahan permukaan/border sedikit dan menggeser panah maksimal `2px`; tanpa scale besar atau glow kuat.
- Pada lebar di bawah `700px`, gunakan satu kolom dan pertahankan ukuran target sentuh minimal `44px`.

#### Focus Session card

- Panel luar mengikuti gaya panel dashboard. Header menampilkan ikon timer dan judul; status seperti `Ready` memakai pill kecil dengan tint teal.
- Nama mode berada di bawah judul, `14–16px` muted.
- Area timer adalah inset gelap (`--surface-card-inset`), radius `26–30px`, padding `24–28px`, dengan durasi `44–48px` / weight 700 dan angka tabular.
- Teks ringkas waktu fokus berada di bawah timer, `14px` muted. Kontrol play/pause utama berupa tombol bulat teal `60–64px`; kontrol sekunder berbentuk bulat dengan permukaan kontrol.
- Di bawah inset, sediakan tautan `Open Pomodoro` dengan ikon panah. Pastikan label kontrol berubah sesuai aksinya dan tombol punya accessible name.

#### Kartu task pada dashboard

- Kartu task memakai permukaan inset hampir hitam (`--surface-card-inset`), border tipis, radius `22–26px`, padding `20–24px`, dan jarak antar kartu `12–16px`.
- Baris pertama memuat checkbox/status di kiri, judul task, serta badge prioritas di kanan. Checkbox sekitar `34–38px` dengan lingkaran teal saat selesai.
- Judul `16–18px` / weight 550–600. Task selesai menggunakan garis coret dan warna sekunder, tetapi tetap memiliki kontras terbaca.
- Deskripsi opsional `14–16px` dengan jarak atas `12–16px`; potong maksimal dua baris pada ringkasan dashboard.
- Garis pemisah halus memisahkan konten dan footer. Footer menampilkan tanggal di kiri dan aksi seperti hapus di kanan.
- Badge prioritas berupa pill padat ringkas: `High` memakai amber/oranye; prioritas lain menggunakan warna token yang konsisten. Selalu tampilkan teks prioritas.
- Area task dapat menjadi scroll internal jika dibatasi tinggi, tetapi header/filter tetap terlihat. Sisakan ruang cukup agar scrollbar tidak menimpa isi kartu.

#### Spacing, responsif, dan konsistensi

- Gunakan gap `16–20px` di antara kartu dalam satu grup dan `24–30px` antar panel. Hindari kartu berhimpitan atau memenuhi panel tanpa ruang napas.
- Pertahankan padding internal minimum `18px` untuk kartu besar dan `16px` untuk kartu ringkas. Jangan mengecilkan kartu hanya untuk memuat lebih banyak kolom.
- Pada lebar desktop, panel Developer Hub dan Quick Tools mendapat ruang utama; Focus Session dan Tasks berada di kolom samping bila ruang mencukupi. Pada tablet/mobile semua panel menjadi satu kolom.
- Periksa teks panjang, judul dua baris, dan task tanpa deskripsi agar tinggi/align kartu tetap rapi. Gunakan `min-width: 0` dan truncation hanya untuk preview, bukan untuk detail task.
- Gunakan komponen bersama untuk panel, metric card, tool card, dan task card; variasi harus datang dari props data atau state, bukan salinan style yang menyimpang.

### 4.10 Quick Notes page and note cards

- Heading `Quick Notes` memakai `24px` pada mobile dan `26px` pada desktop, weight 600, line-height `1.15`, letter-spacing `-0.03em`. Deskripsi memakai `15–16px`, weight 400, line-height `1.5`, warna sekunder, dengan jarak atas `8px`.
- Aksi `New Note` memakai tombol teal berbentuk pill dengan tinggi minimum `44px`. Search memiliki tinggi `48px`, bentuk pill, permukaan kontrol transparan, dan placeholder muted.
- Filter tag berbentuk pill setinggi minimum `40px`, teks `13–14px`, dengan ikon tag kecil. Filter aktif memakai teal dan kontras teks yang jelas.
- Grid note menggunakan tiga kolom pada desktop, dua kolom pada tablet, dan satu kolom pada mobile; gap `20px`.
- Note card memakai permukaan `--surface-card-raised`, border subtil, radius `24px`, padding `20px`, dan tinggi minimum sekitar `184px`. Varian warna note hanya tint lembut dan border aksen; jangan memenuhi kartu dengan warna jenuh.
- Judul note memakai `16px` / weight 600 dan satu baris pada grid. Preview isi memakai `14px` / weight 400, line-height sekitar `1.5`, maksimal tiga baris. Tanggal memakai `12px` muted; tag memakai pill `10–11px`.
- Pisahkan footer tag/tanggal dari preview dengan border halus. Hover cukup menaikkan border dan permukaan sedikit serta mengangkat kartu maksimal `2px`.
- Aksi pin, lihat, edit, dan hapus berada di header kartu. Ikon dekoratif pin tampil saat note dipin; tombol aksi memiliki accessible name dan target klik yang memadai.

## 5. Tombol, tab, input, dan ikon

### Tombol

- **Primary/teal:** untuk aksi utama seperti Request; latar teal, teks kontras, hover sedikit lebih cerah.
- **Secondary:** latar putih 6–9%, border `--line-subtle`, teks primer.
- **Icon button:** lingkaran 38–42px; ikon 16–20px; hover memakai permukaan kontrol.
- **Destructive:** merah hanya untuk hapus/tutup yang destruktif.
- Setiap tombol memiliki state hover, focus-visible, active, dan disabled semantik.

### Tab dan filter

Pill tinggi `32–38px`, padding horizontal `12–16px`, radius penuh. Tab aktif dibedakan dengan fill/kontras, bukan perubahan warna teks saja. Count memakai angka tabular.

### Input

Search/assistant memakai latar translucent, border halus, placeholder muted, dan radius pill. Form field memakai radius `10–12px`. Fokus menampilkan ring teal. Label formulir tidak digantikan placeholder.

### Ikon

Pakai outline `lucide-react`, ukuran konsisten: navigasi `20–22px`, panel `20–22px`, kontrol `16–18px`. Stroke seragam, umumnya `1.8–2px`. Hindari emoji, campuran set ikon, dan ikon dekoratif yang terlihat seperti kontrol.

## 6. Motion dan interaksi

- Transisi hover/fokus umum `150–220ms`, easing lembut.
- Kartu hanya sedikit menaikkan brightness/border; hindari scale besar.
- Dropdown dekat tombol pemicu, memakai permukaan gelap dan shadow.
- Modal memakai backdrop gelap `45–60%`, panel border tipis dan radius besar.
- Hormati `prefers-reduced-motion`; animasi ambient lambat dan opsional.
- Focus ring wajib terlihat untuk keyboard. Jangan menghapus outline tanpa pengganti.

## 7. Aksesibilitas dan konten

- Kontras teks pada panel gelap harus memadai. Teks muted tidak digunakan untuk instruksi penting atau nilai status.
- Status disampaikan lewat teks/badge/ikon selain warna.
- Semua kontrol ikon memiliki `aria-label`; gambar dekoratif memakai `aria-hidden`.
- Urutan heading logis; gunakan elemen heading semantik.
- Navigasi dapat diakses keyboard; tab/filter memakai pola interaksi konsisten.
- Checkbox task memiliki label yang menyebut task.
- Tanggal/waktu menggunakan format lokal konsisten; jangan memalsukan nilai dinamis.
- Teks yang dipotong harus tetap tersedia lewat detail atau tooltip aksesibel.

## 8. Penerapan pada proyek ini

- Proyek menggunakan Next.js `16.2.9`, App Router (`app/`), React `19`, Tailwind CSS `4`, Geist, dan `lucide-react`.
- Styling global berada di `app/globals.css`; token warna ditempatkan di `:root`/`.dark` dan `@theme inline` jika perlu sebagai utility Tailwind.
- Layout global berada di `app/(app)/layout.tsx`; komponen bersama di `components/layout/`; primitive UI di `components/ui/`.
- Gunakan primitive yang sudah ada seperti `Button`, `Badge`, `Card`, `Tabs`, `Dialog`, dan `DropdownMenu` sebelum membuat versi duplikat.
- App Router: komponen tetap Server Component secara default. Tambahkan `'use client'` hanya pada entry point yang memakai state, event handler, efek, atau browser API; directive ditulis paling atas sebelum import.
- Jangan menambahkan `'use client'` ke semua file atau memindahkan data server ke client hanya untuk styling.
- Tailwind 4 memakai import CSS dan konfigurasi theme CSS yang sudah ada. Jangan menyalin konfigurasi Tailwind v3 (`tailwind.config`/`@tailwind base`) ke proyek ini.
- Contoh JSX berikut menunjukkan struktur visual, bukan API data wajib. Hubungkan status ke data domain sebenarnya.

## 9. Pola implementasi JSX

### 9.1 Komposisi dashboard

```tsx
<div className="dashboard-canvas min-h-dvh text-white">
  <div className="flex min-h-dvh">
    <NavigationRail />
    <div className="min-w-0 flex-1">
      <DashboardTopBar />
      <main className="dashboard-workspace">
        <ContainersPanel />
        <aside className="dashboard-aside">
          <SuggestionsPanel />
          <TasksPanel />
        </aside>
      </main>
    </div>
  </div>
  <AssistantInput />
</div>
```

`dashboard-workspace` membentuk grid dua kolom di desktop dan satu kolom di breakpoint kecil. Panel dibatasi tinggi viewport hanya pada desktop; di mobile tinggi mengikuti isi.

### 9.2 Container card

```tsx
<article className="container-card container-card--warning">
  <header className="flex items-center justify-between">
    <h3 className="text-[21px] font-medium">H2390</h3>
    <button type="button" aria-label="More actions for H2390">
      <MoreHorizontal aria-hidden="true" />
    </button>
  </header>

  <div className="container-card__visual" aria-hidden="true">
    <DrumIllustration status="warning" />
    <RecycleIcon />
  </div>
  <span className="container-card__value" aria-label="74 percent full">74%</span>

  <div className="container-card__meta">
    <p>Acid Batteries, Dry, Nonspillable</p>
    <time dateTime="2025-09-17">Filed Sep 17, 2025</time>
  </div>
</article>
```

Jangan menggambar drum rumit berulang kali sebagai inline utility classes. Letakkan visualnya pada komponen reusable dan variasikan lewat prop status/data attribute.

### 9.3 Task item

```tsx
<article className="task-card">
  <div className="task-card__topline">
    <Checkbox aria-label="Mark Waste Profile complete" />
    <h3>Waste Profile</h3>
    <Badge variant="critical">Critical</Badge>
    <Badge variant="outline">To-Do</Badge>
  </div>
  <p>Update waste profile with material type, hazard details, and quantity.</p>
  <div className="task-card__footer">
    <time dateTime="2025-09-17">Sep 17, 2025</time>
    <button type="button" aria-label="Delete Waste Profile">
      <Trash2 aria-hidden="true" />
    </button>
  </div>
</article>
```

Pastikan checkbox mengendalikan state task. Aksi penghapusan permanen perlu konfirmasi.

## 10. Checklist sebelum menyelesaikan UI

- [ ] Siluet mengikuti referensi: rail kiri, status bar, kontainer besar di kiri, Suggestions lalu Tasks di kanan.
- [ ] Permukaan gelap dan glow ambient mendukung konten, bukan mengambil alih perhatian.
- [ ] Status kontainer memiliki warna, label eksplisit, dan indikator yang sesuai.
- [ ] Drum konsisten bentuk dan skalanya pada semua kartu.
- [ ] Grid, panel, dan input adaptif ke tablet/mobile tanpa clipping.
- [ ] Tombol, menu, tab, checkbox, dan input memiliki state keyboard/focus yang terlihat.
- [ ] Kontras teks dan target klik memadai; ikon-only controls memiliki accessible name.
- [ ] Data dinamis tidak di-hardcode pada komponen presentasi.
- [ ] Komponen interaktif memakai batas Client Component seperlunya sesuai App Router.

