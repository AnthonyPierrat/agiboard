import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, Like } from 'typeorm';
import { User } from "../entity/user.entity";
import { UserRegisterDto } from '../dtos/user.dto';

@Service()
export class UserService {

    /**
     * @constructor
     * @param {Repository<User>} userRepository 
     */
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    /**
     * Create a user
     * @param {UserRegisterDto} user user to create
     * @returns {Promise<User>}
     */
    async create(user: UserRegisterDto): Promise<User> {
        let { name, email, password, creationDate, lastUpdate } = user;
        name = email.split('@')[0];
        const existingUsers = await this.userRepository.find({ name: Like(`%${name}%`) });
        if (existingUsers.length > 0) {
            name = email.split('@')[0] + existingUsers.length++;
        }
        password = await hash(password, 10);
        creationDate = new Date();
        lastUpdate = new Date();
        return await this.userRepository.save({ name, email, password, creationDate, lastUpdate });
    }

    /**
     * Return all user
     * @returns {Promise<User[]>}
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /**
     * Find user by id
     * @param {number} id 
     * @returns {Promise<User>}
     */
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({ relations: ["userProjects"] });
    }

    /**
     * Find user by email
     * @param {string} email
     * @returns {Promise<User>}
     */
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ email });
    }

    /**
     * Update a user
     * @param {User} user user to update
     * @returns {Promise<User>}
     */
    async save(user: User): Promise<User> {
        user.lastUpdate = new Date();
        return await this.userRepository.save(user);
    }

    /**
     * Delete a user
     * @param {number} id id of user to update to delete
     * @returns {Promise<User>}
     */
    async delete(id: number): Promise<User> {
        let user = await this.userRepository.findOne(id);
        user.deleted = true;
        return await this.userRepository.save(user);
    }
}