document.addEventListener("DOMContentLoaded", () => {
    // Admin bilgileri alınır
    const name = prompt("Admin username:");
    const password = prompt("Admin password:");

    // Bilgiler eksikse anasayfaya yönlendir
    if (!name || !password) {
        alert("Access denied.");
        window.location.href = "home.html"; // Anasayfa dosya adını senin dosyana göre değiştir
        return;
    }

    // API'ye istek at (backend bu bilgileri kontrol edecek)
    fetch("http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
    })
        .then((res) => {
            if (!res.ok) throw new Error("Not authorized");
            return res.json();
        })
        .then((data) => displayReservations(data))
        .catch((err) => {
            alert("Access denied or error occurred.");
            console.error(err);
            window.location.href = "home.html";
        });

    // Rezervasyonları göster
    function displayReservations(reservations) {
        const container = document.getElementById("admin-reservation-list");
        container.innerHTML = "";

        reservations.forEach((rsv) => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card shadow p-3">
                    <h5 class="card-title">Name: ${rsv.customerName}</h5>
                    <p><strong>Email:</strong> ${rsv.customerEmail}</p>
                    <p><strong>Phone:</strong> ${rsv.customerPhoneNumber}</p>
                    <p><strong>People:</strong> ${rsv.peopleCounts}</p>
                    <p><strong>Date:</strong> ${new Date(rsv.reservationTime).toLocaleString()}</p>
                    <p><strong>Description:</strong> ${rsv.description || "N/A"}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }
    //password change
    document.getElementById("passwordForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const adminName = document.getElementById("adminName").value.trim();
        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();

        if (!adminName || !currentPassword || !newPassword) {
            alert("Please fill all fields.");
            return;
        }

        // Not: id'yi backendde name ile eşleştiriyorsanız id = 0 da olabilir, dummy olarak
        const adminDto = {
            id: 1, // veya backendde id zorunlu değilse bu alanı çıkar
            name: adminName,
            password: currentPassword
        };

        const apiUrl = `http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/password?newPassword=${encodeURIComponent(newPassword)}`;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminDto)
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update password.");
                return res.text(); // Backend sadece String döndürüyor gibi
            })
            .then(message => {
                alert("✅ " + message);
            })
            .catch(err => {
                alert("❌ Error: " + err.message);
            });
    });



});
