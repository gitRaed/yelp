Hello all ! This project will be my official third one. It'll be a yelp clone with PERN stack.
PERN stands for PostgreSql, Express, React and Node.

Comparing to my others projects, I'll add here a way for you to easily create your database so you can try this project.

Clone this project, then : 

1. Install postgreSql for your Operating System with this link : https://www.postgresql.org/download/

2. open psql terminal and enter this to create the database : 

    CREATE DATABASE yelp; 

press enter;  

3. Now let's create the table : 

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

press enter;

4. Open the file called reviewTable.sql and copy-paste everything in your psql terminal.

That's it ! You can now fully use this project ! 

The only thing that'll ask you to do is to change your password in the .env (backend) file to connect to the database !

Please do contact if u find a bug or just to give this newbie some advices. Waiting for your feedback ! 
