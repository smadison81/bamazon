const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require("cli-table");
const colors = require("colors");
const boxen = require('boxen');

const connectionsql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'foreelz1',
    database: 'bamazon'

});

connectionsql.connect();


function display() {
    connectionsql.query('SELECT * FROM PRODUCTS', function (err, res) {
            var table = new Table({
                head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
                colors: true,
                style: {
                    head: ['red'],
                }
            });
            console.log(colors.green(boxen('\n                                       Welcome to Steve-Azon                                       \n', {
                padding: 1,
                borderStyle: 'double'
            })))

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);

            };
            console.log(colors.yellow(table.toString()));
            buyingPrompt();
        }

    )
};


display();

function buyingPrompt() {

    inquirer.prompt([{
            type: 'input',
            name: 'product_id',
            message: 'Please Choose The Number Of The Item You Would Like To Purchase',
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How Many Of The Item Do You Want?',
            filter: Number
        }
    ]).then(res => {
        itemNum = parseInt(res.product_id);
        quantNum = parseInt(res.quantity);
        purchase(itemNum, quantNum);
    })

    function purchase(itemNum, quantNum) {

        quantQuery = `SELECT stock_quantity FROM products where item_id = ${itemNum}`;

        connectionsql.query(quantQuery, function (err, res) {

            if (err) throw err;

            currentStock = parseInt(res[0].stock_quantity);

            if (quantNum <= currentStock) {

                newQuant = currentStock - quantNum;

                updateQuant(itemNum, newQuant)

            } else {

                console.log(colors.red(`The ammount of the item selected exceeds the quantity at hand which is ${currentStock}`))

                starOver();


            }


        })


    }


};

starOver = () => {

    inquirer.prompt([{
        type: 'confirm',
        name: 'continue',
        message: 'Gimme More Money Now?!??',
        default: true
    }]).then(res => {
        answer = res.continue;
        if (answer === true) {
            display();

        } else {

            console.log(colors.yellow(`You'll be back`))
            connectionsql.end()


        }
    })



};

function updateQuant(itemNum, newQuant) {


    updateQuery = `UPDATE products SET stock_quantity = ${newQuant} WHERE item_id = ${itemNum}`;

    connectionsql.query(updateQuery, function (err, res) {

        if (err) throw err;

        console.log(colors.yellow((`You've wasted your hard earned money enjoy`));
        starOver();

    });

};