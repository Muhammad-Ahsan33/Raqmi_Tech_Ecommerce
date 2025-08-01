import userModel from '../models/userModel.js'

const Adduser = async(req , res ) =>{
    try{
        const {username , email} = req.body;
        // console.log("Inside Create Category");
        if(!username , !email){
            return res.status(400).json({ error: 'Data not Provided' });
        }
        const newuser = new userModel({username , email});
        const saveduser = await newuser.save();
        res.send('User added successfully');
    }
    catch(error){
        console.error(error);
    }
}

const RemoveUser_by_name = async(req , res) =>{
    try{
        username = req.body.name;
        if(!username){
            return res.status(400).json({error: 'User name not provided'});
        }
        const deleteuser = await userModel.findOneAndDelete({ name: { $regex: new RegExp(`^${username}$`, "i") } });
        if(!deleteuser){
            return res.status(404).json({error: 'User not found'});
        }
        res.send('User Deleted Successfully');
    }
    catch(error)
    {
        console.error(error);

    }
}

const RemoveUser_by_email = async(req , res) =>{
    try{
        useremail = req.body.email;
        if(!useremail){
            return res.status(400).json({error: 'User email not provided'});
        }
        const deleteuser = await userModel.findOneAndDelete({ email })
        if(!deleteuser){
            return res.status(404).json({error: 'User not found'});
        }
        res.send('User Deleted Successfully');
    }
    catch(error)
    {
        console.error(error);

    }
}

const getAllUsers = async(req , res) =>{
    try {
        const users = await userModel.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Users' });
      }
}

const getUserby_name = async(req , res) =>{
    try{
        const username = req.body.categoryname;
        if(!username){
            return res.status(400).json({error: 'User name is required'});
        }
        const requser = await userModel.findOne({ name: { $regex: new RegExp(`^${username}$`, "i") } });
        if(!requser){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(requser);
    }
    catch(error){
        res.status(500).json({error: 'Failed to fetch User by name'});
    }
}

const getUserby_email = async(req , res) =>{
    try{
        userEmail = req.body.email;
        if(!userEmail){
            return res.status(400).json({error: 'User Email is required'});
        }
        const user = await userModel.findOne({userEmail});
        if(!user){
            return res.status(404).json({error: 'User with this Email is not found'});
        }
        return res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({error: 'Failed to fetch User by Email'});
    }
}

export default{
    Adduser,
    RemoveUser_by_name,
    RemoveUser_by_email,
    getAllUsers,
    getUserby_email,
    getUserby_name
}

