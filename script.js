// ===== 1. Mengambil elemen =====
const form = document.getElementById("bmi-form");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const errorText = document.getElementById("error");
const resultBox = document.getElementById("result");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");

// ===== 2. Fungsi perhitungan =====
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function getCategory(bmi) {
  if (bmi < 18.5) return { label: "Berat badan kurang", className: "under" };
  if (bmi < 25) return { label: "Normal", className: "normal" };
  if (bmi < 30) return { label: "Berat badan berlebih", className: "over" };
  return { label: "Obesitas", className: "obese" };
}

// ===== 3. Validasi =====
function validate(weight, height) {
  if (isNaN(weight) || isNaN(height)) {
    return "Isi berat dan tinggi badan terlebih dahulu.";
  }
  if (weight < 10 || weight > 300) {
    return "Berat badan harus antara 10 dan 300 kg.";
  }
  if (height < 50 || height > 250) {
    return "Tinggi badan harus antara 50 dan 250 cm.";
  }
  return ""; // string kosong = tidak ada error
}

// ===== 4. Saat tombol ditekan =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  const message = validate(weight, height);
  if (message) {
    errorText.textContent = message;
    errorText.hidden = false;
    resultBox.hidden = true;
    return;
  }

  errorText.hidden = true;

  const bmi = calculateBMI(weight, height);
  const category = getCategory(bmi);

  bmiValue.textContent = bmi.toFixed(1);
  bmiCategory.textContent = category.label;
  resultBox.className = `result ${category.className}`;
  resultBox.hidden = false;
});
