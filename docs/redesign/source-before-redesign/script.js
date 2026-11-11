document.getElementById("hamburger").addEventListener("click", function () {
    var navList = document.getElementById("nav-list");
    navList.classList.toggle("active");
});

document.querySelectorAll(".nav ul li a").forEach(link => {
    link.addEventListener("click", function () {
        document.getElementById("nav-list").classList.remove("active");
    });
});