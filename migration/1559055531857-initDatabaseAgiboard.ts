import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabaseAgiboard1559055531857 implements MigrationInterface {


    //Perform migration
    public async up(queryRunner: QueryRunner): Promise<any> {
    //-----Filling Tables---
        //Add users
        await queryRunner.query("INSERT INTO user"+
        "(name, email, password, creationDate, lastUpdate, admin)"+
        "VALUES ('user1', 'userClient1@gmail.com', '$2b$10$oTvDtxo7cnvLXR.TUUVZweoe4cO7Fvo8uugpP0JZEW9rRTCrArF8S', NOW(), NOW(), TRUE);");

        await queryRunner.query("INSERT INTO user"+
        "(name, email, password, creationDate, lastUpdate, admin)"+
        "VALUES ('userAdmin', 'userAdmin@gmail.com', '$2b$10$65T9vGrKBDFrlOh3hvYNIe18kpoOpngFUkbbCeakRtzU/9sW.8E/e', NOW(), NOW(), TRUE);");
    }

    //Reverse migration
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DELETE FROM user "+
        "WHERE email='userClient1@gmail.com';");

        await queryRunner.query("DELETE FROM user "+
        "WHERE email='userAdmin@gmail.com';");
    }
}