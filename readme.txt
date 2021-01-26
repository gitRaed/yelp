Hello all ! This project will be my official third one. It'll be a yelp clone with PERN stack.
PERN stands for PostgreSql, Express, React and Node.

Comparing to my others projects, I'll add here a way for you to easily create your database so you can try this project.

Install postgreSql for your Operating System with this link : https://www.postgresql.org/download/

Then open psql terminal and enter this to create the database : 

CREATE DATABASE yelp; 

press enter;  ;)

Now let's create the table : 

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

press enter; ;)

And that's it for now !

Clone this project and do this step to fully use this project ! 

The only thing that'll ask you to do is to change your password in the backend file to connect to the database !