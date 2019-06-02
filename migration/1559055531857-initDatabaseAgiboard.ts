import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabaseAgiboard1559055531857 implements MigrationInterface {


    //Perform migration
    public async up(queryRunner: QueryRunner): Promise<any> {
    //-----Filling Tables---
        //Add users
        await queryRunner.query("INSERT INTO user"+
        "(name, email, password, creationDate, lastUpdate, admin)"+
        "VALUES ('user1', 'user1@gmail.com', 'aaaaaaaaaa', NOW(), NOW(), TRUE);");


        await queryRunner.query("INSERT INTO user"+
        "(name, email, password, creationDate,lastUpdate, admin)"+
        "VALUES ('user2', 'user2@gmail.com', 'bbbbbbbbbb', NOW(), NOW(), TRUE);");

        await queryRunner.query("INSERT INTO user"+
        "(name, email, password, creationDate, lastUpdate, admin)"+
        "VALUES ('userAdmin', 'userAdmin@gmail.com', 'abc', NOW(), NOW(), TRUE);");
    }

    //Reverse migration
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DELETE FROM user "+
        "WHERE email='user1@gmail.com';");

        await queryRunner.query("DELETE FROM user "+
        "WHERE email='user2@gmail.com';");

        await queryRunner.query("DELETE FROM user "+
        "WHERE email='userAdmin@gmail.com';");
    }
}