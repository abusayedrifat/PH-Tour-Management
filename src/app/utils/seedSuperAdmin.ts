import  bcrypt  from 'bcryptjs';
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model"

export const seedSuperAdmin = async() =>{

    try {
        const isSuperAdminExists = await User.findOne({email :  envVars.SUPER_ADMIN_EMAIL})

        if (isSuperAdminExists) {
            console.log('super admin already exist');
            return
        }

        console.log('trying to create super admin');
        

        const hasedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND)) 

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload:IUser = {
            name: "Super_Admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hasedPassword,
            isVarified: true,
            auths: [authProvider]
        }
        const superAdmin = await User.create(payload)

        console.log("super admin created successfully",superAdmin);
        

    } catch (error) {
        console.log(error);
        
    }

}