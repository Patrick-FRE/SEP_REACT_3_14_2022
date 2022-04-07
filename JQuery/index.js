
class PQuery {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
    }
    html(innerhtml) {
        this.elements.forEach(element => {
            element.innerHTML = innerhtml;
        })
    }
    hide() {
        this.elements.forEach(element => {
            element.preDisplay = element.style.display;
            element.style.setProperty('display', 'none');
        })
    }
    on(eventType, cb) {
        this.elements.forEach(element => {
            element.addEventListener(eventType, cb)

        })
    }
    show() {
        this.elements.forEach(element => {
            element.style.setProperty('display', element.preDisplay);
        })
    }
}


const $$ = (selector) => {
    return new PQuery(selector)
}

$$.ajax = () => {
    console.log('ajax')
}

// const test = $$('button.continue')

// test.html('Next Step...');
const btn = $$('button.continue')

btn.html('Next Step...!!!');


var hiddenBox = $$("#banner-message");
hiddenBox.html("New message").hide();

console.log(btn.html == hiddenBox.html)

$$("#button-container button").on("click", function (event) {
    hiddenBox.show();
});



$$.ajax({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    success: function (result) {
        console.log(result)
    }
});


