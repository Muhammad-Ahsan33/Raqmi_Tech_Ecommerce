import inventoryModel from '../models/inventoryModel.js'

const getAllInventory = async (req, res) => {
    try {
        const inventory = await inventoryModel.find();
        if(!inventory){
            return res.status(400).json({error: 'Error while fetching inventory related data'});
        }
        return res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Inventory data', error });
    }
};

const getInventoryByProductId = async (req, res) => {
    try {
        const productId = req.params.id; 
        if (!productId) {
            return res.status(400).json({ error: 'Product ID not provided' });
        }

        const inv = await inventoryModel.findOne({ productId }); 
        if (!inv) return res.status(404).json({ message: 'Item not found' });

        res.status(200).json(inv);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Inventory data', error });
    }
};

const addInventoryItem = async (req, res) => {
    try {
        const { productId, productName, quantity, price, supplier } = req.body;

        if (!productId || !productName || !quantity || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newItem = new inventoryModel({ productId, productName, quantity, price, supplier });

        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding inventory item', error });
    }
};

const updateInventory = async (req, res) => {
    try {
        const inventoryId = req.params.id;

        if (!inventoryId) {
            return res.status(400).json({ error: 'Inventory ID not provided' });
        }

        const updatedItem = await inventoryModel.findByIdAndUpdate(inventoryId, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating inventory item', error });
    }
};

const deleteInventoryItem = async (req, res) => {
    try {
        const inventoryId = req.params.id;

        if (!inventoryId) {
            return res.status(400).json({ error: 'Inventory ID not provided' });
        }

        const deletedItem = await Inventory.findByIdAndDelete(inventoryId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting inventory item', error });
    }
};

export default{
    getAllInventory,
    getInventoryByProductId,
    updateInventory,
    addInventoryItem,
    deleteInventoryItem
}


