create database bamazon;

use bamazon;

create table products (
	item_id int primary key not null auto_increment,
    product_name varchar (45) not null,
    department_name varchar (45) not null,
    price dec (50,2) not null,
    stock_quantity int not null
    );
    
insert into products (product_name, department_name, price, stock_quantity)
values 
("BioBidet Bliss BB2000", "Home Improvement", 629.20, 10),
("Jaeger LeCoultre Atmos 566", "Jewelry", 119600.37, 1),
("Google - Pixel 3a", "Mobile Phones", 399.00, 30),
("DJI Mavic 2 Pro Drone Quadcopter", "Hobbies", 1499.00, 15),
("Nintendo Switch", "Video Games", 299.00, 100),
("Borderlands: The Handsome Collection", "Video Games", 499.00, 4),
("LG OLED65C9PUA TV", "Electronics", 2496.99, 10),
("Bose QuietComfort 35 II", "Electronics", 349.00, 10),
("HONBAY Convertible Sectional Sofa", "Furniture", 314.99, 10),
("Precious Stars Jewelry 14K White Gold Ring", "Jewelry", 8054.99, 2);