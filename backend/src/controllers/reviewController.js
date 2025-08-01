import reviewModel from '../models/reviewModel.js'

const getreviewbyid = async(req , res) =>{
    try{
        const pid = req.body.id;
        if(!pid){
            return res.status(400).json({error: 'Productid not provided'});
        }
        const review_on_product = await reviewModel.find(pid);
        if(!review_on_product){
            return res.status(400).json({error: 'cant find the id'});
        }
        return res.status(200).json(review_on_product);
    }
    catch(error){
        return res.status(404).json(error);
    }

}

const getallreviews = async(req , res) =>{
    try{
        const all_reviews = await reviewModel.find();
        res.status(200).json(all_reviews);
    }
    catch(error){
        res.status(404).json({ message: 'Error fetching reviews', error });
    }
}

export default{
    getallreviews,
    getreviewbyid

}