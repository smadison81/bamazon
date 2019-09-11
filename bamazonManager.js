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

function managerPrompt() {

    inquirer.prompt([{
        type: 'list',
        name: 'managerChoice',
        message: 'What will it be boss?',
        choices: ['View Products for Sale', new inquirer.Separator(), 'View Low Inventory', new inquirer.Separator(), 'Add to Inventory', new inquirer.Separator(), 'Add New Product']
    }]).then(answers => {

        switch (answers.managerChoice) {
            case "View Products for Sale":
                productView();
                break;
            case "View Low Inventory":
                lowView();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                managerPrompt();

        }
    })
}

managerPrompt();

function productView() {

    connectionsql.query('SELECT * FROM products', function (err, res) {
            var table = new Table({
                head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
                colors: true,
                style: {
                    head: ['red'],
                }
            });
            console.log(colors.green(boxen('\n                                       Current Inventory                                       \n', {
                padding: 1,
                borderStyle: 'double'
            })))

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);

            };
            console.log(colors.yellow(table.toString()));
            startOver();
        }

    )




}

function lowView() {

    connectionsql.query('SELECT * FROM products WHERE stock_quantity <= 5', function (err, res) {
            var table = new Table({
                head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
                colors: true,
                style: {
                    head: ['red'],
                }
            });
            console.log(colors.green(boxen('\n                                       Low Inventory Items                                       \n', {
                padding: 1,
                borderStyle: 'double'
            })))

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);

            };
            console.log(colors.yellow(table.toString()));
            startOver();
        }

    )

}

function addInventory() {

    connectionsql.query('SELECT * FROM products', function (err, res) {
            var table = new Table({
                head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
                colors: true,
                style: {
                    head: ['red'],
                }
            });
            console.log(colors.green(boxen('\n                                       Current Inventory                                       \n', {
                padding: 1,
                borderStyle: 'double'
            })))

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);

            };
            console.log(colors.yellow(table.toString()));

            inquirer.prompt([{
                    type: 'input',
                    name: 'product_id',
                    message: 'Please Choose The Number Of The Item You Would Like To Add To',
                    filter: Number
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'What Is The New Quantity?',
                    filter: Number
                }
            ]).then(res => {
                itemNum = parseInt(res.product_id);
                quantNum = parseInt(res.quantity);
                updateQuery = `UPDATE products SET stock_quantity = ${quantNum} WHERE item_id = ${itemNum}`;
                connectionsql.query(updateQuery, function (err, res) {
                    if (err) throw err;
                    console.log(colors.yellow((`The New Quantity of Item #${itemNum} is ${quantNum}`)));
                    startOver();
                });

            })
        }

    )




};

function addProduct() {

    inquirer.prompt([{
            type: 'input',
            name: 'product_name',
            message: 'What is the Name of the product?',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the Department of the Product?',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What Is The Price Of The Item?',
            filter: Number
        } ,
        {
            type: 'input',
            name: 'quantity',
            message: 'What is the Quanitity of the Item?',
            filter: Number
        }

    ]).then(res => {
        itemName = res.product_name;
        deptName = res.department_name;
        itemPrice = parseInt(res.price);
        quantNum = parseInt(res.quantity);
        insertQuery = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${itemName}", "${deptName}", ${itemPrice}, ${quantNum})`
        connectionsql.query(insertQuery, function (err, res) {
            if (err) throw err;
            console.log(colors.yellow((`The New Product ${itemName} and cost $${itemPrice} there are ${quantNum} of the product`)));
            startOver();
        });

    })

}

function startOver() {

    inquirer.prompt([{
        type: 'confirm',
        name: 'continue',
        message: 'Anything Else I Can Help You With?',
        default: true
    }]).then(res => {
        answer = res.continue;
        if (answer === true) {
            managerPrompt();

        } else {

            console.log(colors.yellow(`Anytime Boss, Take Care`))
            connectionsql.end()


        }
    })

}