// Utility fungsi bersihkan teks dan kunci (huruf besar, tanpa karakter non-huruf)
function cleanText(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, '');
}

// Vigenère Cipher
function vigenere(text, key, encrypt=true, steps=[]) {
  key = cleanText(key);
  if (!key) return text;

  let result = '';
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    let ch = text[i];
    if (ch.match(/[A-Z]/)) {
      let t = ch.charCodeAt(0) - 65;
      let k = key[j % key.length].charCodeAt(0) - 65;
      let val = encrypt ? (t + k) % 26 : (t - k + 26) % 26;
      let c = String.fromCharCode(val + 65);
      steps.push(`Vigenère: '${ch}' dengan kunci '${key[j % key.length]}' → '${c}'`);
      result += c;
      j++;
    } else {
      result += ch;
    }
  }
  return result;
}

// Keyed Columnar Transposition Cipher (Encrypt)
function keyedTransEncrypt(text, key, steps=[]) {
  key = cleanText(key);
  if (!key) return text;

  const cols = key.length;
  const rows = Math.ceil(text.length / cols);

  // Buat matriks dan isi dengan 'X' jika perlu
  let matrix = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(idx < text.length ? text[idx++] : 'X');
    }
    matrix.push(row);
  }

  steps.push(`Membuat tabel ${rows}x${cols} berdasarkan kunci '${key}'`);
  steps.push(matrix.map(r => r.join(' ')).join('\n'));

  // Urutkan indeks kolom berdasarkan huruf kunci
  const order = [...key].map((k, i) => ({k, i})).sort((a,b) => a.k.localeCompare(b.k));

  steps.push(`Urutan kolom berdasarkan kunci: ${order.map(o => o.i).join(', ')}`);

  // Ambil kolom sesuai urutan
  let ciphertext = '';
  order.forEach(({i}) => {
    for(let r = 0; r < rows; r++) ciphertext += matrix[r][i];
  });

  steps.push(`Hasil Transposisi: ${ciphertext}`);
  return ciphertext;
}

// Keyed Columnar Transposition Cipher (Decrypt)
function keyedTransDecrypt(text, key, steps=[]) {
  key = cleanText(key);
  if (!key) return text;

  const cols = key.length;
  const rows = Math.ceil(text.length / cols);

  // Urutkan indeks kolom berdasarkan huruf kunci
  const order = [...key].map((k, i) => ({k, i})).sort((a,b) => a.k.localeCompare(b.k));

  // Buat matriks kosong
  let matrix = Array(rows).fill(null).map(() => Array(cols).fill(''));

  // Isi matriks kolom per kolom sesuai urutan kunci
  let idx = 0;
  order.forEach(({i}) => {
    for(let r = 0; r < rows; r++) {
      matrix[r][i] = text[idx++] || 'X';
    }
  });

  steps.push(`Membuat tabel kosong ${rows}x${cols} berdasarkan kunci '${key}'`);
  steps.push(matrix.map(r => r.join(' ')).join('\n'));

  // Baca baris demi baris untuk plaintext
  let plaintext = matrix.map(r => r.join('')).join('');
  steps.push(`Hasil Transposisi balik (dengan padding X): ${plaintext}`);

  // Hilangkan padding X di akhir
  plaintext = plaintext.replace(/X+$/g, '');
  return plaintext;
}

// Proses utama
document.addEventListener('DOMContentLoaded', () => {
  const mode = document.getElementById('mode');
  const order = document.getElementById('order');
  const vigKey = document.getElementById('vigKey');
  const transKey = document.getElementById('transKey');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const stepsEl = document.getElementById('steps');
  const processBtn = document.getElementById('processBtn');
  const clearBtn = document.getElementById('clearBtn');

  processBtn.addEventListener('click', () => {
    let text = inputText.value.toUpperCase();
    let steps = [];

    if(!vigKey.value.trim() || !transKey.value.trim() || !text.trim()){
      alert('Harap isi teks dan kedua kunci!');
      return;
    }

    if(mode.value === 'encrypt'){
      if(order.value === 'vigenere-first'){
        steps.push('=== Enkripsi dengan Vigenère ===');
        text = vigenere(text, vigKey.value, true, steps);

        steps.push('\n=== Enkripsi dengan Transposisi Kolom ===');
        text = keyedTransEncrypt(text, transKey.value, steps);
      } else {
        steps.push('=== Enkripsi dengan Transposisi Kolom ===');
        text = keyedTransEncrypt(text, transKey.value, steps);

        steps.push('\n=== Enkripsi dengan Vigenère ===');
        text = vigenere(text, vigKey.value, true, steps);
      }
    } else {
      if(order.value === 'vigenere-first'){
        steps.push('=== Dekripsi dengan Transposisi Kolom ===');
        text = keyedTransDecrypt(text, transKey.value, steps);

        steps.push('\n=== Dekripsi dengan Vigenère ===');
        text = vigenere(text, vigKey.value, false, steps);
      } else {
        steps.push('=== Dekripsi dengan Vigenère ===');
        text = vigenere(text, vigKey.value, false, steps);

        steps.push('\n=== Dekripsi dengan Transposisi Kolom ===');
        text = keyedTransDecrypt(text, transKey.value, steps);
      }
    }

    outputText.value = text;
    stepsEl.textContent = steps.join('\n');
  });

  clearBtn.addEventListener('click', () => {
    vigKey.value = '';
    transKey.value = '';
    inputText.value = '';
    outputText.value = '';
    stepsEl.textContent = 'Tekan "Proses" untuk melihat langkah-langkah.';
  });
});
