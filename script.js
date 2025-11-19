// Update waktu
// const time = document.getElementById("waktu");
// time.textContent = `Pukul ${showTime()} (${getTime()})`;

/**
 * Load data dari data.json
 */
async function loadData() {
	try {
		const req = await fetch("data.json");
		if (req.ok) {
			return req.json();
		} else {
			throw new Error("Can't request to that URL");
		}
	} catch (error) {
		console.log(error);
	}
}

/**
 * Fungsi untuk mencari makanan dengan data yang dihasilkan dari fungsi `loadData`
 */
async function cariMakanan() {
	try {
		const data = await loadData();
		const waktu = getTime();
		const gambarMakanan = `media/${
			waktu === "pagi"
				? "makanan-pagi/"
				: waktu === "siang"
					? "makanan-siang/"
					: waktu === "sore"
						? "makanan-sore/"
						: waktu === "malam"
							? "makanan-malam/"
							: waktu === "tengah malam"
								? "makanan-tengah-malam"
								: ""
		}`;

		if (waktu === "pagi") {
			const makananPagi = data["pagi"].makanan;
			const randomMakananPagi =
				makananPagi[Math.floor(Math.random() * makananPagi.length)];
			const randomGambarMakananPagi =
				randomMakananPagi.gambar[
					Math.floor(Math.random() * randomMakananPagi.gambar.length)
				];
			editElement(
				"img#gambar-makanan",
				gambarMakanan + randomGambarMakananPagi,
			);
			editElement("#nama-makanan", randomMakananPagi.nama);
			editElement("#deskripsi-makanan", randomMakananPagi.deskripsi);
			editElement("#alasan-makanan", data["pagi"].alasan);
		} else if (waktu === "siang") {
			const makananSiang = data["siang"].makanan;
			const randomMakananSiang =
				makananSiang[Math.floor(Math.random() * makananSiang.length)];
			const randomGambarMakananSiang =
				randomMakananSiang.gambar[
					Math.floor(Math.random() * randomMakananSiang.gambar.length)
				];
			editElement(
				"img#gambar-makanan",
				gambarMakanan + randomGambarMakananSiang,
			);
			editElement("#nama-makanan", randomMakananSiang.nama);
			editElement("#deskripsi-makanan", randomMakananSiang.deskripsi);
			editElement("#alasan-makanan", data["siang"].alasan);
		} else if (waktu === "sore") {
			const makananSore = data["sore"].makanan;
			const randomMakananSore =
				makananSore[Math.floor(Math.random() * makananSore.length)];
			const randomGambarMakananSore =
				randomMakananSore.gambar[
					Math.floor(Math.random() * randomMakananSore.gambar.length)
				];
			editElement(
				"img#gambar-makanan",
				gambarMakanan + randomGambarMakananSore,
			);
			editElement("#nama-makanan", randomMakananSore.nama);
			editElement("#deskripsi-makanan", randomMakananSore.deskripsi);
			editElement("#alasan-makanan", data["sore"].alasan);
		} else if (waktu === "malam") {
			const makananMalam = data["malam"].makanan;
			const randomMakananMalam =
				makananMalam[Math.floor(Math.random() * makananMalam.length)];
			const randomGambarMakananMalam =
				randomMakananMalam.gambar[
					Math.floor(Math.random() * randomMakananMalam.gambar.length)
				];
			editElement(
				"img#gambar-makanan",
				gambarMakanan + randomGambarMakananMalam,
			);
			editElement("#nama-makanan", randomMakananMalam.nama);
			editElement("#deskripsi-makanan", randomMakananMalam.deskripsi);
			editElement("#alasan-makanan", data["malam"].alasan);
		} else if (waktu === "tengah malam") {
			const makananTengahMalam = data["tengahMalam"].makanan;
			const randomMakananTengahMalam =
				makananTengahMalam[
					Math.floor(Math.random() * makananTengahMalam.length)
				];
			const randomGambarMakananTengahMalam =
				randomMakananTengahMalam.gambar[
					Math.floor(Math.random() * randomMakananTengahMalam.gambar.length)
				];
			editElement(
				"img#gambar-makanan",
				gambarMakanan + randomGambarMakananTengahMalam,
			);
			editElement("#nama-makanan", randomMakananTengahMalam.nama);
			editElement("#deskripsi-makanan", randomMakananTengahMalam.deskripsi);
			editElement("#alasan-makanan", data["tengahMalam"].alasan);
		}

		// Tampilkan makanan
		document.querySelector("#display-makanan").classList.remove("hidden");
	} catch (error) {
		console.log(error);
	}
}

/**
 * Fungsi untuk mendapatkan waktu
 */
function getTime() {
	const waktu = new Date();
	const jam = waktu.getHours();
	if (jam >= 4 && jam < 10) {
		return "pagi";
	} else if (jam >= 10 && jam < 15) {
		return "siang";
	} else if (jam >= 15 && jam < 19) {
		return "sore";
	} else if (jam >= 19 && jam < 23) {
		return "malam";
	} else if (jam >= 23 && jam < 4) {
		return "tengah malam";
	}
}

/**
 * Fungsi untuk meng-edit elemen yang tersedia di HTML
 * @param {keyof HTMLElementTagNameMap} selector Selector untuk elemen yang ingin di-edit
 * @param {string|any} content Konten yang ingin diterapkan di elemen
 */
function editElement(selector, content) {
	const element = document.querySelector(selector);
	if (!element) throw new Error("Error: Elemen tidak ada");
	element.src = content;
	element.value = content;
	element.textContent = content;
}

function showTime() {
	const timeElement = document.getElementById("waktu");
	const waktu = new Date();
	const jam = waktu.getHours().toString().padStart(2, "0");
	const menit = waktu.getMinutes().toString().padStart(2, "0");
	timeElement.textContent = `Pukul ${jam}:${menit} (${getTime()})`;
}

function scheduleNextMinute() {
	const now = new Date();
	const msToNextMinute = (60 - now.getSeconds()) * 1000;

	setTimeout(() => {
		showTime();
		scheduleNextMinute();
	}, msToNextMinute);
}
