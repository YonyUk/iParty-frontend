import { RegisterUserDataDTO } from "../dtos/RegisterUserDataDTO";
import { User } from "../entities/User";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { UserName } from "../value-objects/UserName";
import { IUserCriteria } from "./UserCriteria";

export interface IUserRepository{
    /**
     *
     * @param data data of the new user
     * @returns the id of the just created user
     */
    register(data:RegisterUserDataDTO):Promise<string>;

    /**
     *
     * @param username username of the user
     * @param password password of the user
     * @returns true if the user was successfully logged
     */
    login(username:UserName,password:Password):Promise<boolean>;

    /**
     * @returns The info of the current logged user
     */
    me():Promise<User>;

    /**
     * @returns true if the user was successfully unlogged
     */
    logout():Promise<boolean>;
    /**
     *
     * @param password the new password value
     */
    changePassword(password:Password):Promise<void>;

    /**
     *
     * @param id id of the user
     * @returns the user with the given id if exists
     * @throws UserNotFoundError if the requested user doesn't exists
     */
    getById(id:string):Promise<User>;

    /**
     *
     * @param username username of the user
     * @returns the user with the given username
     * @throws UserNotFoundError if the requested user doesn't exists
     */
    getByName(username:UserName):Promise<User>;

    /**
     *
     * @param email email of the user
     * @returns the user with the given email
     * @throws UserNotFoundError if the requested user doesn't exists
     */
    getByEmail(email:Email):Promise<User>;

    /**
     *
     * @param criteria criteria to select users
     */
    getUsers(criteria:IUserCriteria):Promise<User[]>;

    /**
     *
     * @throws UserNotFoundError if the user doesn't exists
     */
    delete():Promise<void>;
}
