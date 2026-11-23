const cars = [
    {
        name: "BMW 3 Series", category: "Sedan", price: "₹72 Lakh",
        engine: "1998 cc", power: "258 HP", mileage: "15 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        features: "Sunroof, Luxury Interior, Touchscreen"
    },
    {
        name: "Mercedes C-Class", category: "Sedan", price: "₹61 Lakh",
        engine: "1496 cc", power: "204 HP", mileage: "16 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        features: "Ambient Lighting, Premium Audio"
    },
    {
        name: "Range Rover Evoque", category: "SUV", price: "₹69 Lakh",
        engine: "1997 cc", power: "247 HP", mileage: "12 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
        features: "AWD, Panoramic Roof, Premium Seats"
    },
    {
        name: "Porsche 911", category: "Sports", price: "₹2 Crore",
        engine: "2981 cc", power: "388 HP", mileage: "10 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        features: "Sports Mode, Performance Brakes"
    },
    {
        name: "Audi Q7", category: "SUV", price: "₹90 Lakh",
        engine: "2995 cc", power: "340 HP", mileage: "11 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        features: "Quattro AWD, 7 Seats, Virtual Cockpit"
    },
    {
        name: "Lamborghini Huracan", category: "Sports", price: "₹4 Crore",
        engine: "5204 cc", power: "640 HP", mileage: "7 km/l",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
        features: "V10 Engine, Sports Exhaust, Launch Control"
    }
];

const container = document.getElementById("carContainer");

function displayCars(list) {
    container.innerHTML = "";

    list.forEach(car => {
        const card = document.createElement("article");
        card.className = "car-card";

        const image = document.createElement("img");
        image.src = car.image;
        image.alt = car.name;
        image.loading = "lazy";

        const info = document.createElement("div");
        info.className = "car-info";

        const title = document.createElement("h3");
        title.textContent = car.name;

        const category = document.createElement("p");
        category.textContent = car.category;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = car.price;

        const specs = document.createElement("div");
        specs.className = "specs";
        specs.textContent =
            `Engine: ${car.engine}\nPower: ${car.power}\nMileage: ${car.mileage}\n` +
            `Transmission: ${car.transmission}\nFeatures: ${car.features}`;
        specs.style.whiteSpace = "pre-line";

        const button = document.createElement("button");
        button.textContent = "Book Test Drive";
        button.addEventListener("click", () => selectCar(car.name));

        info.append(title, category, price, specs, button);
        card.append(image, info);
        container.appendChild(card);
    });

    if (list.length === 0) {
        container.textContent = "No cars found. Try another search.";
    }
}

function filterCars() {
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;

    const filtered = cars.filter(car =>
        car.name.toLowerCase().includes(search) &&
        (category === "all" || car.category === category)
    );
    displayCars(filtered);
}

function selectCar(name) {
    document.getElementById("bookingCar").value = name;
    document.getElementById("testdrive").scrollIntoView({ behavior: "smooth" });
}

function compareCars() {
    const first = cars.find(car => car.name === document.getElementById("car1").value);
    const second = cars.find(car => car.name === document.getElementById("car2").value);

    if (!first || !second || first === second) {
        alert("Please select two different cars.");
        return;
    }

    const fields = ["price", "engine", "power", "mileage", "transmission", "features"];
    const result = document.getElementById("comparisonResult");
    const table = document.createElement("table");
    const header = document.createElement("tr");

    ["Specifications", first.name, second.name].forEach(value => {
        const th = document.createElement("th");
        th.textContent = value;
        header.appendChild(th);
    });
    table.appendChild(header);

    fields.forEach(field => {
        const row = document.createElement("tr");
        [field.toUpperCase(), first[field], second[field]].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    result.replaceChildren(table);
}

function setupDropdowns() {
    ["car1", "car2", "bookingCar"].forEach(id => {
        const select = document.getElementById(id);
        cars.forEach(car => {
            const option = document.createElement("option");
            option.value = car.name;
            option.textContent = car.name;
            select.appendChild(option);
        });
    });
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const car = document.getElementById("bookingCar").value;
    const date = document.getElementById("date").value;

    document.getElementById("message").textContent =
        `Thank you ${name}! Your test drive request for ${car} on ${date} has been received.`;

    this.reset();
});

displayCars(cars);
setupDropdowns();
