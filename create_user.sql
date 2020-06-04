-- trebuie rulat dupa creearea bazei de date tema_pw ca root
-- sgbd: mysql 8.0
CREATE USER 'foo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL ON `tema_pw`.* to 'foo'@'localhost' WITH GRANT OPTION;