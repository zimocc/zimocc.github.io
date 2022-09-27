let arrowL = document.querySelector(".arrowL");
let arrowR = document.querySelector(".arrowR");

let focus = document.querySelector(".focus");

let images = document.querySelector(".images");

let circle = document.querySelector(".circle");

focus.addEventListener("mouseenter", function (e) {
    arrowL.style.display = "block";
    arrowR.style.display = "block";
    clearInterval(autoScroll);
});

focus.addEventListener("mouseleave", function (e) {
    arrowL.style.display = "none";
    arrowR.style.display = "none";
    autoScroll = setInterval(function (e) {
        arrowR.click();
    }, 2000);
});

let autoScroll = setInterval(function (e) {
    arrowR.click();
}, 2000);

for (let i = 0; i < images.children.length; i++) {
    let li = document.createElement("li");
    li.addEventListener("click", function (e) {
        images.style.transition = "all 0.8s ease";
        imageIndex = i + 1;
        circleIndex = i;
        images.style.left = -imageIndex * step + 'px';
        changeCircle();
    });
    i === 0 ? li.classList.add("current") : 0;
    circle.appendChild(li);
}

let li = images.children[0].cloneNode(true);
let li1 = images.children[images.children.length - 1].cloneNode(true);
images.insertBefore(li1, images.children[0]);
images.appendChild(li);

let imageIndex = 1;
let circleIndex = 0;
let step = focus.offsetWidth;
let flag = true;
images.style.left = -step + 'px';
images.style.transition = "all 0.8s ease";

function changeCircle() {
    for (let i = 0; i < circle.children.length; i++) {
        circle.children[i].className = "";
    }
    circle.children[circleIndex].className = "current";
}

arrowR.addEventListener('click', function (e) {
    if (flag) {
        flag = false;
        if (!images.style.transition) {
            images.style.transition = "all 0.8s ease";
        }
        imageIndex++;
        images.style.left = -imageIndex * step + 'px';
        circleIndex++;
        changeCircle();
    }
});

arrowL.addEventListener('click', function (e) {
    if (flag) {
        flag = false;
        if (!images.style.transition) {
            images.style.transition = "all 0.8s ease";
        }
        imageIndex--;
        images.style.left = -imageIndex * step + 'px';
        circleIndex--;
        changeCircle();
    }
});

images.addEventListener('transitionend', function (e) {
    if (imageIndex === images.children.length - 1) {
        images.style.transition = "";
        images.style.left = -step + 'px';
        imageIndex = 1;
        circleIndex = 0;
        changeCircle();
    }

    if (imageIndex === 0) {
        images.style.transition = "";
        images.style.left = -(images.children.length - 2) * step + 'px';
        imageIndex = images.children.length - 2;
        circleIndex = circle.children.length - 1;
        changeCircle();
    }
    flag = true;
});