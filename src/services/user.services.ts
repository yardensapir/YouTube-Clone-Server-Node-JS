import { User, UserModel } from "../modules/user/user.model"

export const createUser = async (user:Omit<User,"comparePassword">)=>{
return UserModel.create(user)
} 

export const findUserByEmail = async (email:User['email'])=>{
    return UserModel.findOne({email})
}