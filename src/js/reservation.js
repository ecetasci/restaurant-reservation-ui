// OPEN POPUP
const dialog = document.querySelector("dialog");
const bookTableBtn = document.getElementById("rezerv-popup");
const bookTableBtn2= document.getElementById("rezerv-popup-bottom");
const closeBtn = document.querySelector(".close-btn");

bookTableBtn.addEventListener("click", () => {
    // Popup'ı aç
    dialog.showModal();
    // Popup açıldığında arka plana scroll olmaması için
    document.body.style.overflow = "hidden";

    //Popup açıldığında gerçekleşecek olan animasyon animasyon
    dialog.style.opacity = "0";
    dialog.style.transform = "scale(0.9)";


    setTimeout(() => {
        dialog.style.transition =
            "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
        dialog.style.opacity = "1";
        dialog.style.transform = "scale(1)";
    }, 10);

    generatePersonOptions();

});

bookTableBtn2.addEventListener("click", () => {
    // Popup'ı aç
    dialog.showModal();
    // Popup açıldığında arka plana scroll olmaması için
    document.body.style.overflow = "hidden";

    //Popup açıldığında gerçekleşecek olan animasyon animasyon
    dialog.style.opacity = "0";
    dialog.style.transform = "scale(0.9)";


    setTimeout(() => {
        dialog.style.transition =
            "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
        dialog.style.opacity = "1";
        dialog.style.transform = "scale(1)";
    }, 10);

    generatePersonOptions();

});











closeBtn.addEventListener("click", () => {
    // Popup'ı kapat
    // Popup kapatıldığında arka plana scroll olabilmesi için
    document.body.style.overflow = "auto";
    // Popup kapatıldığında gerçekleşecek olan animasyon
    dialog.style.opacity = "0";
    dialog.style.transform = "scale(0.9)";

    setTimeout(() => {
        dialog.close();
    }, 300); // Animasyon süresi kadar bekle
});

document.addEventListener("DOMContentLoaded", function () {
    const person = document.querySelector(".guest-count-selection");

    function noOfPerson() {
        for (let i = 1; i <= 10; i++) {
            const creatNum = document.createElement("div");
            creatNum.classList.add("selection-item");
            creatNum.dataset.value = i; // ✅ Değer için data attribute ekliyoruz

            const numOfPerson = document.createElement("h3");
            numOfPerson.className = "selection-item-label";
            numOfPerson.textContent = i;

            creatNum.appendChild(numOfPerson);
            person.appendChild(creatNum);
        }

        selectPerson();
    }

    function selectPerson() {
        const selectionItems = document.querySelectorAll(".selection-item");

        selectionItems.forEach((item) => {
            item.addEventListener("click", function () {
                // Önce tüm seçimleri kaldır
                selectionItems.forEach((el) => el.classList.remove("selected"));

                // Seçilen elemana selected class'ı ekle
                item.classList.add("selected");

            });
        });
    }

    noOfPerson();
});

function generatePersonOptions() {
    const person = document.querySelector(".guest-count-selection");
    person.innerHTML = ""; // önceki seçimleri temizle

    for (let i = 1; i <= 10; i++) {
        const creatNum = document.createElement("div");
        creatNum.className = "selection-item";
        const numOfPerson = document.createElement("h3");
        numOfPerson.className = "selection-item-label";
        numOfPerson.innerHTML = i;

        creatNum.appendChild(numOfPerson);
        person.appendChild(creatNum);
    }

    setupPersonSelection();
}


function setupPersonSelection() {
    const selectionItems = document.querySelectorAll(".guest-count-selection .selection-item");
    selectionItems.forEach((item) => {
        item.addEventListener("click", function () {
            selectionItems.forEach((el) => el.classList.remove("selected"));
            item.classList.add("selected");
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.querySelector(".month-year");
    const daysContainer = document.querySelector(".days");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();
    let today = new Date();
    let selectedDayDiv = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = "";

        // Günleri çiz
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }

        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = i;
            dayDiv.dataset.date = i; // ✅ data-date olarak günü kaydet

            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayDiv.classList.add("today");
            }

            dayDiv.addEventListener("click", function () {
                if (selectedDayDiv) {
                    selectedDayDiv.classList.remove("selected");
                }

                dayDiv.classList.add("selected");
                selectedDayDiv = dayDiv;

                console.log(`Selected Date: ${i} ${months[month]} ${year}`);
            });

            daysContainer.appendChild(dayDiv);
        }

        // Ayın sonu sonrası boşluklar (7x6 grid için)
        const remainingCells = 42 - daysContainer.children.length;
        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }
    }

    prevButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});

// Saat kutularının çizileceği alan
const time = document.querySelector(".reserv-time-selection");

// Saat seçenekleri
const timeItems = [
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "20:00", "21:00",
];

// Time kutularını oluştur
timeItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "time-selection-item selection-item";
    div.dataset.time = item; // ✅ saat bilgisi data attribute ile

    const h3 = document.createElement("h3");
    h3.className = "time-selection-label selection-item-label";
    h3.textContent = item;

    div.appendChild(h3);
    time.appendChild(div);
});

// Seçim olayını tanımla
document.querySelectorAll(".time-selection-item").forEach((el) => {
    el.addEventListener("click", function () {
        // Diğer seçimleri kaldır
        document.querySelectorAll(".time-selection-item").forEach((t) =>
            t.classList.remove("selected")
        );

        // Yeni seçimi işaretle
        el.classList.add("selected");

        console.log("Selected time:", el.dataset.time); // ✅ güvenli ve boşluk yok
    });
});
(function () {
    let currentPage = 1;
    const prevBtn = document.querySelector(".form .form-footer .form-prev");
    const nextBtn = document.querySelector(".form .form-footer .form-next");

    function movePage() {
        prevBtn.disabled = false;
        nextBtn.disabled = false;

        if (currentPage === 1) {
            prevBtn.disabled = true;
        }

        if (currentPage === 4) {
            nextBtn.innerHTML = "Send";
        } else {
            nextBtn.innerHTML = "Next";
        }

        document.querySelector(".form .pagination .active")?.classList.remove("active");
        document.querySelectorAll(".form .pagination .number")[currentPage - 1]?.classList.add("active");

        const stepNode = document.querySelector(".form .steps .step");
        const width = (currentPage - 1) * stepNode.offsetWidth * -1 + "px";
        stepNode.parentNode.style.marginLeft = width;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            movePage();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage === 4) {
            // --- Formdan verileri topla ---
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            const selectedPersonEl = document.querySelector(".guest-count-selection .selection-item.selected");
            const selectedPerson = selectedPersonEl ? selectedPersonEl.textContent.trim() : null;

            console.log("Selected person:", selectedPerson);

            const selectedDay = document.querySelector(".days .selected")?.dataset.date?.trim();
            const selectedMonthYear = document.querySelector(".month-year")?.textContent.trim();
            const selectedTime = document.querySelector(".reserv-time-selection .selected")?.dataset.time?.trim();

            if (!name || !email || !phone || !selectedPerson || !selectedDay || !selectedMonthYear || !selectedTime) {
                alert("Lütfen tüm alanları ve seçimleri doldurun.");
                return;
            }

            // --- ISO formatlı tarih oluştur ---
            const fullDateStr = `${selectedDay} ${selectedMonthYear} ${selectedTime}`;
            const selectedDateTime = new Date(fullDateStr);

            // --- POST isteği at ---
            fetch("http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/reservation/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    restaurantId: 1,
                    customerName: name,
                    customerEmail: email,
                    customerPhoneNumber: phone,
                    description: message,
                    peopleCounts: Number(selectedPerson),
                    reservationTime: selectedDateTime.toISOString(),
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Sunucu hatası");
                    return res.json();
                })
                .then((data) => {
                    console.log("API Response:", data); // 👈 use response here
                    alert("🎉 Rezervasyon başarıyla oluşturuldu!");
                    dialog.close();
                    document.body.style.overflow = "auto";
                    document.querySelector("dialog").style.display = "none";

                    // ✅ Form görünürlüğünü kapat (Eğer .form dışarıda görünür kaldıysa)
                    const formContainer = document.querySelector(".form");
                    if (formContainer) {
                        formContainer.style.display = "none";
                    }

                    // ✅ Tüm inputları temizle
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("message").value = "";

                    // ✅ Seçili item'ları temizle
                    document.querySelectorAll(".selection-item.selected").forEach(el => el.classList.remove("selected"));

                    // ✅ Adımı başa al
                    currentPage = 1;
                    movePage();

                })
                .catch((err) => {
                    alert("Bir hata oluştu: " + err.message);
                    console.error(err);
                });

        } else {
            currentPage++;
            movePage();
        }
    });

    // Sayfa yüklendiğinde ilk adımı göster
    movePage();
})();

// DOM tamamen yüklendiğinde bu kod çalışır
document.addEventListener("DOMContentLoaded", () => {
    // Login butonunu seçiyoruz
    const loginButton = document.querySelector(".nav-buttons .btn-yellow-border");

    // Popup dialog ve kapatma butonunu seçiyoruz
    const popup = document.getElementById("reservationPopup");
    const closeBtn = document.querySelector(".close-popup");




    // Login butonuna tıklanınca kullanıcıdan bilgi al ve rezervasyonları getir
    loginButton.addEventListener("click", () => {
        const name = prompt("Enter your name:");
        if (!name) return; // İptal veya boşsa hemen çık
        const email = prompt("Enter your email:");
        if(!email) return;
        const phone = prompt("Enter your phone number:");

        if (!name || !email || !phone) {
            alert("Please enter all fields.");
            return;
        }

        // API'ye istek at: Kullanıcının rezervasyonlarını al
        fetch("http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/customer/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phone,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch reservations");
                return res.json();
            })
            .then((reservations) => {
                // Rezervasyonları kart olarak göster
                displayReservations(reservations);
            })
            .catch((err) => {
                alert("An error occurred: " + err.message);
                console.error(err);
            });
    });

    // Customera Rezervasyonları gösteren fonksiyon
    function displayReservations(reservations) {
        const container = document.getElementById("reservationList");
        container.innerHTML = ""; // Önceki içerikleri temizle

        reservations.forEach((rsv) => {
            const card = document.createElement("div");
            card.className = "reservation-card";

            card.innerHTML = `
                <h5>Reservation for ${rsv.customerName}</h5>
                
                <p><strong>Phone:</strong> ${rsv.customerPhoneNumber}</p>
                <p><strong>People:</strong> ${rsv.peopleCounts}</p>
                <p><strong>Date:</strong> ${new Date(rsv.reservationTime).toLocaleString()}</p>
                <p><strong>Description:</strong> ${rsv.description || "N/A"}</p>
            `;

            container.appendChild(card);
        });

        // Popup'ı göster
        popup.showModal();
        document.body.style.overflow = "hidden";
    }


    // Close butonuna tıklanınca dialog'u kapat ve içeriği temizle
    document.querySelector(".close-popup").addEventListener("click", () => {
        const popup = document.getElementById("reservationPopup");
        popup.close(); // ✅ Popup'u kapat
        document.body.style.overflow = "auto"; // Scroll'u geri aç
        document.getElementById("reservationList").innerHTML = ""; // İçeriği temizle
        popup.style.display = "none"; // DOM'da görünmez yap


});

    // Admin Login butonuna tıklanınca admin.html'e yönlendir
    document.getElementById("admin-login").addEventListener("click", () => {
        window.location.href = "admin.html";
    });


});

