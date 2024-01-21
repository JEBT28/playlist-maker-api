import { Transaction } from "@planetscale/database";
import { NewUser, User, UserUpdate, users } from "../../../db/schemas/user";
import { Connect } from "../../../db/connection";
import * as schema from '../../../db/schemas/index';
import { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { eq, or } from "drizzle-orm";
import { QuerySearch } from "../../../types/SearchParams.interface";
class UserService {
    db: PlanetScaleDatabase<typeof schema>;

    constructor() {
        this.db = Connect();
    }

    async getUsers({
        limit = 10,
        offset = 0,
        order,
        search,
        status
    }: QuerySearch) {

        const where = (users: any, { eq }: any) => {
            if (search) {
                return eq(users.username, search)
            }
            if (status) {
                return eq(users.status, status)
            }
        }

        const orderBy = (users: any, { asc, desc }: any) => {
            if (!order) {
                return asc(users.id)
            }

            const [key, type] = order;
            if (type === 'asc') {
                return asc(users[key])
            } else {
                return desc(users[key])
            }
        }
        const res = await this.db.query.users.findMany({
            where: where,
            orderBy,
            limit,
            offset,
            columns: {
                password: false
            }
        })
        return res;
    }

    async getUserById(id: number, t?: Transaction) {
        const user = await this.db.query.users.findFirst({
            where: eq(users.id, id),
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getUserByUsernameOrEmail(val: string, t?: Transaction): Promise<User> {
        const user = await this.db.query.users.findFirst({
            where: or(eq(users.username, val), eq(users.email, val)),
        })
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async createUser(newUser: NewUser, t?: Transaction) {
        const user = this.db.insert(users).values(newUser);
        return user;
    }

    async updateUser(user_id: number, userData: UserUpdate, t?: Transaction) {
        const exists = await this.getUserById(user_id, t);

        const result = await this.db.update(users).set({ ...userData, updated_at: new Date() }).where(eq(users.id, exists.id));

        if (!result.rowsAffected) {
            throw new Error("Any record was updated")
        }

        return { ...exists, ...userData }
    }

    async deleteUser(user_id: number, t?: Transaction) {
        const exists = await this.getUserById(user_id, t);

        const result = await this.db.update(users).set({ status: false, updated_at: new Date() }).where(eq(users.id, exists.id));


        if (!result.rowsAffected) {
            throw new Error("Any records was updated")
        }

        return { ...exists, status: false }
    }

}



export default new UserService();