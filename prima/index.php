<?php

// Fungsi untuk menentukan apakah bilangan prima atau bukan
function isPrime($number)
{
  // Bilangan kurang dari 2 bukan bilangan prima
  if ($number < 2) {
    return false;
  }

  // Loop untuk memeriksa apakah ada faktor selain 1 dan bilangan itu sendiri
  for ($i = 2; $i <= sqrt($number); $i++) {
    if ($number % $i === 0) {
      // Jika ada faktor lain, bukan bilangan prima
      return false;
    }
  }

  // Jika tidak ada faktor lain, bilangan prima
  return true;
}

// Contoh penggunaan fungsi
$angka = 4; // Ganti dengan bilangan yang ingin diuji
if (isPrime($angka)) {
  echo "$angka adalah bilangan prima.";
} else {
  echo "$angka bukan bilangan prima.";
}
