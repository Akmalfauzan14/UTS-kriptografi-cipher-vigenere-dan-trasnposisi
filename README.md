saya akan jelaskan cara kerja aplikasi sesuai source code yang saya berikan sebelumnya, langkah demi langkah berdasarkan fungsi-fungsi utama dan alur program di script.js:

1. Membersihkan Input: cleanText(text)

Semua input teks dan kunci dibersihkan agar hanya mengandung huruf kapital A–Z.

Menghilangkan karakter selain huruf (angka, spasi, tanda baca) supaya algoritma hanya bekerja pada huruf kapital.

2. Fungsi Vigenère: vigenere(text, key, encrypt, steps)

Fungsi ini mengimplementasikan enkripsi/dekripsi Vigenère.

Proses per huruf:

Jika huruf termasuk A-Z, dihitung posisinya (0 sampai 25).

Ambil huruf kunci sesuai posisi (modulus panjang kunci).

Untuk enkripsi: (posisi_plaintext + posisi_kunci) mod 26.

Untuk dekripsi: (posisi_ciphertext - posisi_kunci + 26) mod 26.

Konversi kembali ke huruf kapital.

Langkah transformasi tiap huruf disimpan di array steps untuk ditampilkan.

Huruf non-A-Z langsung diteruskan tanpa perubahan.

3. Fungsi Keyed Columnar Transposition Encrypt: keyedTransEncrypt(text, key, steps)

Bersihkan kunci (huruf kapital A-Z).

Tentukan jumlah kolom = panjang kunci.

Hitung jumlah baris = panjang teks dibagi jumlah kolom (dibulatkan ke atas).

Buat matriks 2D (array of arrays), isi teks ke dalamnya baris per baris.

Jika sisa kotak kosong, isi dengan huruf 'X' sebagai padding.

Simpan matriks ke steps sebagai representasi tabel.

Urutkan indeks kolom berdasarkan abjad huruf kunci (order).

Ambil kolom satu per satu sesuai urutan ini dan gabungkan huruf-hurufnya menjadi ciphertext.

Simpan hasil dan urutan kolom di steps.

4. Fungsi Keyed Columnar Transposition Decrypt: keyedTransDecrypt(text, key, steps)

Bersihkan kunci.

Tentukan jumlah kolom dan baris sama seperti enkripsi.

Urutkan kolom berdasarkan abjad kunci.

Buat matriks kosong ukuran baris × kolom.

Isi matriks kolom per kolom berdasarkan urutan kunci dan isi ciphertext huruf demi huruf.

Simpan tabel kosong dan setelah diisi ke steps.

Baca matriks baris per baris untuk mendapatkan plaintext sementara (termasuk padding 'X').

Hapus padding 'X' yang ada di akhir teks.

Return plaintext.

5. Event Listener Tombol "Proses"

Ambil semua input (mode, urutan, teks, kunci).

Cek apakah kunci dan teks sudah diisi.

Jika mode Encrypt:

Jika urutan vigenere-first:

Enkripsi teks dengan Vigenère.

Lalu hasilnya dienkripsi dengan Transposisi.

Jika urutan trans-first:

Enkripsi teks dengan Transposisi.

Lalu hasilnya dienkripsi dengan Vigenère.

Jika mode Decrypt:

Jika urutan vigenere-first:

Dekripsi dengan Transposisi.

Lalu dekripsi hasilnya dengan Vigenère.

Jika urutan trans-first:

Dekripsi dengan Vigenère.

Lalu dekripsi hasilnya dengan Transposisi.

Semua langkah yang terjadi selama proses (penjelasan tiap huruf dan tabel) dikumpulkan di array steps.

Output hasil akhir (ciphertext atau plaintext) ditampilkan di kotak hasil.

Langkah-langkah proses ditampilkan di area khusus untuk membantu pemahaman.

6. Event Listener Tombol "Bersihkan"

Menghapus semua input dan output serta membersihkan tampilan langkah-langkah.
