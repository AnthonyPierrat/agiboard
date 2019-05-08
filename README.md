# Agiboard

# Running agiboard locally

## get repository
git pull <repo-name>

## set up mysql
1. docker pull mysql
2. docker run -d --name mysql_agiboard -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=agiboard -p 3306:3306 mysql_dev
3. docker logs mysql_agiboard 2>&1 | grep GENERATED
4. docker exec -it mysql_agiboard mysql -u root -p
5. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
6. ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '<password>';
  
## set up agiboard project
1. download node
2. install npm
3. npm install
4. npm start

## ready to go try the api with postman !
download postman


