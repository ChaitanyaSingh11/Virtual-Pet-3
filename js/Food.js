let foodStock, foodS;
let bed, garden, wash;
class Food {
    constructor() {
        this.milkImg = loadImage('Assets/milk.png');
        // referring to foodStock in database
        foodS = database.ref('Food');
        // reading the value of stock from database
        foodS.on("value", function (data) {
            foodStock = data.val();
        });
        bed = loadImage("Assets/Bed Room.png");
        garden = loadImage("Assets/Garden.png");
        wash = loadImage("Assets/Wash Room.png");
    }
    updateFoodStock(x) {
        if (x <= 0)
            x = 0;
        else
            x--;
        database.ref('/').update({
            Food: x
        });
    }
    addFood(y) {
        if (y != 20) {
            y++;
            database.ref('/').update({
                Food: y
            });
        }
    }
    display() {
        let x = 150,
            y = 850;
        if (foodStock && foodStock != 0) {
            for (let i = 1; i <= foodStock; i++) {
                imageMode(CENTER);
                image(this.milkImg, x, y, 65, 150);
                if (i % 10 == 0) {
                    x = 80;
                    y += 80;
                }
                x += 70;
            }
        }
    }
    bedroom() {
        background(bed);
    }
    Garden() {
        background(garden);
    }
    washroom() {
        background(wash);
    }
}