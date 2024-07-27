(function main() {
    let x; // Camelcase, dynamically typed, primitive default value is 'undefined'
    console.log(x);
    
    luckyNum = new Object(); // any value that's not a primitive will inherit from the object class 
    
    const y = 10; // const to prevent reassignment
    
    // var is the old way to create objects but not recommended anymore 
    
    function addPrim(a, b) {
        return a + b;
    }
    
    const add = function(a, b) { // functions are just objects, so they can be used in higher order functions as an argument or value 
        return a + b;
    }
    
    const highFunc = function(func, a, b) {
        return func(a, b);
    }
    
    console.log(highFunc(add, 15, 20))
    
    function giveMeClosure() {
        let a = 10;
        return function() {
            a++;
            return a;
        }
    }
    
    // for loop:
    arr = [1, 2, 3, 4, 5]
    
    // no append, we use push
    arr.push(6)
    function fn(a, b) {
        return a + b
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i], i)
    }
    
    // console.log(this); references the window object in the browser, the global object 
    
    function wtfIsThis() {
        console.log(this);
    }
    
    const person = {
        wtfIsThis: () => { // arrow syntax functions are always anonymous 
            console.log(this)
        }
    }
    
    PersonFun = wtfIsThis.bind(person)
    console.log(PersonFun)
    
    const num = 23;
    const obj = new Object()
    
    function someFun(a, b) {
        return;
    }
    
    someFun(num, obj) // primitives passed by value, others passed by reference from heap 
    
    // objects can be created in two ways: object literal and constructor
    const way_one = {}
    const way_two = new Object()
    
    // objects contain properties, key: value pairs
    const human = {
        dna: 'AACTG',
        name: 'Jeff',
        born: Date.now(),
        walk() {
            console.log('walking');
        }
        // or, alternatively, walk: function() {...}
    }
    
    // objects can inherit properties from each other via the prototype chain 
    human.__proto__.__proto__; // no longer recommended 
    
    // when javascript looks for an attribute in a class / object: traverses the prototype chain, starting from the properties of the current object, then the properties of its .__proto__, then of .__proto__'s .__proto__, and so on. This is how inheritance works in Javascript. 
    
    // supports OOP 
    class Human { // syntactic sugar
        constructor(name, gender) {
            this.data = 'AACTG'
            this.name = name
            this.gender = gender
        }
        
        get gender() {
            return this.gender;
        }
        
        set gender(val) {
            this.gender = val 
        }
        
        static isHuman(human) {
            if (human.dna == 'AACTG') {
                return true;
            }
        }
    }
    
    // garbage collected 
    
    // Map: all properties will always be referenced, use WeakMap for garbage collected ver
    
    // most interesting feature: non-blocking event loop, allows the writing of asyncronous functions that runs in a separate thread pool 
    
    const promise = new Promise((resolve, reject) => { // a promise is a wrapper for a value that's unknown right now but will resolve to a value in the future (third party API and such)
            // promise logic goes here 
        })
        .then(success => {
            console.log('yay', success);
        })
        .catch(err => {
            console.log('oh no!', err);
        })
    })

    // better yet, async function which will automatically return a promise
    async function asyncFun() {
        const result = await promise; 
    }

    export default function helper() {
        console.log('help me, help you');
    }

    // using npm
    // npm install, npm uninstall, 

    // code runs in the browser using the DOM model, tree of html elements nodes. 
    // browser provides apis to interact with the nodes, most important one of which is the document.
    // const btn = document.querySelector('.button')
    // const btnAll = document.querySelectorAll('.button')
    // finds the html element with the same class name, id, or tag name 
    
    // then, we can add an event listener
    // btn.addEventListener('click', () => {
        // console.log('clicked')
        // document.body.style.backgroundColor = 'red'
    // })  // imperiative code; that's why we use frontend libraries that allows us to write declarative code instead 

    // console log is actually great for debugging.
    // use computed property names: gives variable name
    const foo = {name: 'tom', age: 30, nervous: false};
    const bar = {name: 'dick', age: 40, nervous: false};
    const baz = {name: 'harry', age: 50, nervous: true};

    // can make it stand out with custom css
    console.log('%c My Friends', 'color: orange, font-weight: bold')
    console.log({foo, bar, baz});

    // if objects all share common properties, we display them in a table
    console.table([foo, bar, baz]);

    // can keep track of time via console.time
    console.time('looper')
    let i = 0;
    while (i < 1000000) { i++ }
    console.timeEnd('looper')

    // stack trace logs
    const deleteMe = () => console.trace('bye bye database')
    deleteMe()
    deleteMe()

    // destructuring
    const turtle = {
        name: 'Bob',
        legs: 4,
        shell: true,
        type: 'amphibious',
        meal: 10,
        diet: 'berries'
    }
    
    // other ways to destructure:
    // dot notation: const val = object.obj.x;
    // bracket notation: const val = object["obj"]["x"];
    
    
    // bad code 
    function feed_bad(animal) {
        return 'Feed ${animal.name} ${animal.meal} kilos of ${animal.diet}';
    }

    // good code: object destructuring
    function feed_decent({ name, meal, diet }) {
    }
    // alternatively, 
    function feed(animal) {
        const { name, meal, diet } = animal;
        return 'Feed ${name} ${meal} kilos of ${diet}'
    }

    // three dots: spread syntax 
    let pokemon = ['Arbok', 'Raichu', 'Sandshrew']
    
    // equivalent of array push 
    pokemon = [...pokemon, 'Bulbasur', 'Metapod', 'Weedle']

    // equivalent of array unshift
    pokemon = ['Bulbasur', 'Metapod', 'Weedle', ...pokemon]

    // better loops
    const orders = [500, 30, 99, 15, 223]

    const total = orders.reduce((acc, cur) => acc + cur)
    // when loop finishes: total of all elements in that array
    
    // mapping for looping to update
    const withTax = orders.map(v => v * 1.1)
    
    // filtering
    const highValue = orders.filter(v => v > 100);

    // closures: in javascript, functions have a reference to all variables declared in the same scope as well as any outer scopes, this is called the function's lexical environment. 
    // scope still applies, in functions, blocks (in if, for etc), where it cannot be accessed from the outside 

    // basics of an arrow function
    // (parameters) => expression is equal to
    // function(parameters) { return expression; }

    // for single expressions without braces: expression is automatically returned, else must state it explicitly via the return keyword

    // parameters: single = no need for brackets, zero or multiple = need brackets


    


    




