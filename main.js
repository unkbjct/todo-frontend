// localStorage.removeItem("list")

let btn = document.getElementById("add-item");
let input = document.getElementById("input");
let list = document.getElementById("list");
let storageList = (localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];
let isGrabbing = false;

let startX = null;
let startY = null;

storageList.forEach((item) => {
    buildItem(item.text, item.done);
})

btn.addEventListener("click", function () {
    addItem();
})

input.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        addItem();
    };
})

list.addEventListener("mousedown", function (e) {
    if (e.target !== this) return;
    document.querySelectorAll(".list-selected").forEach((e) => {
        e.classList.remove("list-selected");
    })
})

// list.addEventListener("mousedown", function (event) {
//     let divSelecting = document.createElement("div");
//     divSelecting.classList.add("selecting");
//     list.append(divSelecting);

//     startY = event.pageY - list.offsetTop;
//     startX = event.pageX - list.offsetLeft;
//     divSelecting.style.top = `${startY}px`
//     divSelecting.style.left = `${startX}px`
//     divSelecting.style.right = `${list.offsetWidth - startX}px`

//     list.addEventListener("mousemove", selecting);
// })
// document.addEventListener("mouseup", function (event) {
//     list.removeEventListener("mousemove", selecting);
//     document.querySelector(".selecting").remove();
// })

list.ondragstart = function () {
    return false;
}

function selecting(event) {
    let divSelecting = document.querySelector(".selecting");

    if (startX > event.pageX - list.offsetLeft) {
        let posX = event.pageX - list.offsetLeft;
        divSelecting.style.left = `${posX}px`;
        divSelecting.style.right = `${list.offsetWidth - startX}px`;
    } else {
        let posX = list.offsetWidth + list.offsetLeft - event.pageX;
        divSelecting.style.right = `${posX}px`;
        divSelecting.style.left = `${startX}px`
    }
    console.log(startY, event.pageY - list.offsetTop)
    if (event.pageY - list.offsetTop > startY) {
        let posY = list.offsetHeight + list.offsetTop - event.pageY;
        divSelecting.style.bottom = `${posY}px`;
        divSelecting.style.top = `${startY}px`;
    } else {
        let posY = event.pageY - list.offsetTop;
        divSelecting.style.top = `${posY}px`;
        divSelecting.style.bottom = `${list.offsetHeight - startY}px`
    }

}

document.getElementById("btn-done").addEventListener("click", function () {
    let done = document.querySelectorAll(".list-selected")[0].querySelector(".btn-done").dataset.done == 'false' ? true : false;
    document.querySelectorAll(".list-selected").forEach((e) => {
        doneItem(e, done)
    })
})

document.getElementById("btn-remove").addEventListener("click", function () {
    let done = document.querySelectorAll(".list-selected")[0].querySelector(".btn-done").dataset.done == 'false' ? true : false;
    document.querySelectorAll(".list-selected").forEach((e) => {
        removeItem(e, e.querySelector(".list-text").textContent)
    })
})

function addItem() {
    let isRepeat = false;
    document.querySelectorAll(".list-text span").forEach((e) => {
        if (e.textContent == input.value) {
            isRepeat = true;
            return;
        }
    })
    if (!input.value) return

    storageList.push({
        text: input.value,
        done: false,
    });
    localStorage.setItem("list", JSON.stringify(storageList));

    buildItem(input.value);
    input.select();
}

function doneItem(e, isDone) {
    // console.log(e)
    storageList[storageList.findIndex(({ text }) => text == e.children[0].textContent)].done = isDone;
    e.querySelector(".btn-done").dataset.done = isDone;
    localStorage.setItem("list", JSON.stringify(storageList));
    isDone ? e.querySelector(".list-text").classList.add("done") : e.querySelector(".list-text").classList.remove("done");
}

function buildItem(value, isDone = false) {
    let svgDone = Svg("0 0 16 16", [
        "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z",
        "M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
    ])
    let svgEdit = Svg("0 0 16 16", [
        "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
    ])
    let svgRemove = Svg("0 0 16 16", [
        "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z",
        "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
    ])
    let svgList = Svg("0 0 16 16", [
        "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    ])


    let item = document.createElement("div");
    item.classList.add("list-item")
    item.addEventListener("click", function (e) {
        console.log(this.children[0])
        if (e.target !== this) return;

        this.classList.contains("list-selected") ? this.classList.remove("list-selected") : this.classList.add("list-selected")
    })
    item.classList.add("droppable")

    let listText = document.createElement("div");
    listText.classList.add("list-text");
    if (isDone) listText.classList.add("done");
    item.append(listText);

    let span = document.createElement("span");
    span.textContent = value;
    listText.append(span);

    let listControls = document.createElement("div");
    listControls.classList.add("list-controls");
    item.append(listControls);

    let btnDone = document.createElement("button");
    btnDone.classList.add("list-btn");
    btnDone.classList.add("btn-done");
    btnDone.dataset.done = isDone;
    btnDone.append(svgDone);
    btnDone.addEventListener("click", function () {
        doneItem(this.parentNode.parentNode, (this.dataset.done == 'true') ? false : true)
    })
    listControls.append(btnDone);

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("list-btn");
    btnEdit.classList.add("btn-edit");
    btnEdit.append(svgEdit);
    listControls.append(btnEdit)

    let btnRemove = document.createElement("button");
    btnRemove.classList.add("list-btn");
    btnRemove.classList.add("btn-remove");
    btnRemove.append(svgRemove);
    btnRemove.addEventListener("click", function () { removeItem(item, value) })
    listControls.append(btnRemove);

    let btnList = document.createElement("button");
    btnList.classList.add("list-btn");
    btnList.classList.add("btn-list");
    btnList.append(svgList);

    btnList.addEventListener("mousedown", function (e) {
        isGrabbing = true;
        let parent = this.parentNode.parentNode;
        // parent.style.pointerEvents = "none";
        parent.classList.add("is-draggable");
        parent.classList.remove("droppable");
        list.addEventListener("mousemove", draggabling);
        document.querySelector(".is-draggable").style.top = `${e.pageY - list.offsetTop}px`;
    })

    item.addEventListener("mouseup", function (e) {
        if (!isGrabbing) return;
        isGrabbing = false;
        this.style.pointerEvents = "none";
        let closest = document.elementFromPoint(e.clientX, e.clientY).closest(".droppable");
        if (closest) {
            (e.pageY - (closest.offsetTop + list.offsetTop) > closest.offsetHeight / 2) ? closest.after(this) : closest.before(this);
        } else {
            list.append(this)
        }

        this.style.pointerEvents = "all";

        this.style.top = "auto";
        this.classList.remove("is-draggable");
        this.classList.add("droppable");
        list.removeEventListener("mousemove", draggabling);
        storageList = [];
        document.querySelectorAll(".list-item").forEach((e) => {
            if (e.classList.contains("settings")) return
            storageList.push({
                text: e.querySelector(".list-text").textContent,
                done: e.querySelector(".list-text").classList.contains("done"),
            });
            localStorage.setItem("list", JSON.stringify(storageList));
        })
    })
    listControls.append(btnList);

    list.append(item)
}

function draggabling(e) {
    document.querySelector(".is-draggable").style.top = `${e.pageY - list.offsetTop}px`;
    let elem = document.elementFromPoint(e.clientX, e.clientY);
}

function removeItem(e, value) {
    storageList.splice(storageList.findIndex(({ text }) => text == value), 1)
    localStorage.setItem("list", JSON.stringify(storageList));
    e.remove()
}

function Svg(viewBox, paths = []) {
    let wh = 16;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", wh);
    svg.setAttribute("width", wh);
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("fill", "currentColor");

    paths.forEach(element => {
        let svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath.setAttribute("d", element);
        svg.append(svgPath);
    });
    return svg;
}