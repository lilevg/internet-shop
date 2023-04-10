import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    //уникальный емеил
    //ограничить имя фамилию до 100
    //телефон не обязательный
    //гендкр из енама
    // створити свойства createdat, deletedat і назначити їм декоратори @CreateDateColumn() i @DeleteDateColumn()
}