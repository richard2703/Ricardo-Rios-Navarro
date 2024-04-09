create database tienda;
use tienda

create table users(
id int unsigned NOT null auto_increment,
name varchar(254) not NULL,
pass varchar(254) not NULL,
phone varchar(20) DEFAULT NULL,
img_profile varchar(254) DEFAULT NULL,
PRIMARY KEY (id)
);

create table access_tokens(
id int unsigned NOT null auto_increment,
user_id int unsigned not NULL,
token varchar(254) not NULL,
PRIMARY KEY (id),
CONSTRAINT FK_users_access_tokens_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

create table catalog_products(
id int unsigned NOT null auto_increment,
name varchar(254) not NULL,
description text null,
height FLOAT(5,1) ,
length FLOAT(5,1),
width FLOAT(5,1)
PRIMARY KEY (id)
);

