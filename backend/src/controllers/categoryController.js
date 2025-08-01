import categoryModel from '../models/categoryModel.js';
const AddCategory = async(req , res ) =>{
    try{
        const categoryname = req.body.categoryname;
        // console.log("Inside Create Category");
        if(!categoryname){
            return res.status(400).json({ error: 'Category name is required' });
        }
        const newCategory = new categoryModel({categoryname});
        const savedCategory = await newCategory.save();
        res.send('Category added successfully');
    }
    catch(error){
        console.error(error);
    }
}
const RemoveCategory = async(req , res) =>{
    try{
        const categoryname = req.body.categoryname;
        console.log("Inside Delete Category");
        if(!categoryname){
            return res.status(400).json({error: 'Category name is required'});
        }
        const deleteCategory = await categoryModel.findOneAndDelete({ name: { $regex: new RegExp(`^${categoryname}$`, "i") } });
        if(!deleteCategory){
            return res.status(404).json({error: 'Category not found'});
        }
        res.send('Category deleted successfully');
    }
    catch(error){
        console.error(error);
   }
}    
const getAllCategory = async (req , res) => {
    try {
      const category = await categoryModel.find();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Category' });
    }
  }

const getCategorybyname = async(req , res) => {
    try{
        const categoryname = req.body.categoryname;
        if(!categoryname){
            return res.status(400).json({error: 'Category name is required'});
        }
        const reqcategory = await categoryModel.findOne({ name: { $regex: new RegExp(`^${categoryname}$`, "i") } });
        if(!reqcategory){
            return res.status(404).json({error: 'Category not found'});
        }
        res.status(200).json(reqcategory);
    }
    catch(error){
        res.status(500).json({error: 'Failed to fetch Category by name'});
    }
}

export default {
    AddCategory,
    RemoveCategory,
    getAllCategory,
    getCategorybyname
}
