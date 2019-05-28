import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabaseAgiboard1559055531857 implements MigrationInterface {


    //Perform migration
    public async up(queryRunner: QueryRunner): Promise<any> {
        //reset database agiboard
        //await queryRunner.dropTable("user", true);
        await queryRunner.dropDatabase("agiboard", true);
        await queryRunner.createDatabase("agiboard", true);
        await queryRunner.query("use agiboard");

        //creating the migration table
        await queryRunner.query("CREATE TABLE `agiboard`.`migrations` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` bigint NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");

    //-----Creating Tables---
        //create USER table
        await queryRunner.query("CREATE TABLE user ("+
        "userId INT PRIMARY KEY AUTO_INCREMENT,"+
        "email VARCHAR(255) NOT NULL,"+
        "password VARCHAR(255) NOT NULL,"+
        "userStatus ENUM ('Collaborator','External', 'Admin') NOT NULL);");

        //create WORKSPACE table
        await queryRunner.query("CREATE TABLE workspace ("+
        "workspaceId INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "date_creation DATE NOT NULL,"+
        "userId INT NOT NULL,"+
        "FOREIGN KEY (userId) REFERENCES user(userId));");

        //create PROJECT table
        await queryRunner.query("CREATE TABLE project ("+
        "projectId INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "description VARCHAR(255) NOT NULL,"+
        "projectStatus ENUM ('Draft','InProgress', 'Done') NOT NULL,"+
        "workspaceId INT NOT NULL,"+
        "FOREIGN KEY (workspaceId) REFERENCES workspace(workspaceId));");
    

    //-----Filling Tables---
        //Add users
        await queryRunner.query("INSERT INTO user(email, password, userStatus)"+
        "VALUES ('userCollaborator@gmail.com', 'mdp', 'Collaborator');");

        await queryRunner.query("INSERT INTO user(email, password, userStatus)"+
        "VALUES ('userAdmin@gmail.com', 'mdp', 'Admin');");

        await queryRunner.query("INSERT INTO user(email, password, userStatus)"+
        "VALUES ('userExternal@gmail.com', 'mdp', 'External');");
    }

    //Reverse migration
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropDatabase("agiboard", true);
    }

}