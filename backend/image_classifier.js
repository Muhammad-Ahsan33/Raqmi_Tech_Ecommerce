import tf from "@tensorflow/tfjs-node";
import sharp from "sharp";

const classLabels = ["Headphones", "Keyboard", "Monitor", "Mouse", "Speakers"];

/**
 * Predicts the class of an image using a trained TensorFlow.js model.
 * @param {tf.LayersModel} model - Trained TensorFlow.js model.
 * @param {string} imgPath - Path to the image file.
 * @returns {Promise<string>} - Predicted class name.
 */
async function predictImageClass(model, imgPath) {
    try {
        // Read and preprocess the image using Sharp
        const imageBuffer = await sharp(imgPath)
            .resize(224, 224) // Resize to 224x224
            .toBuffer(); // Convert to buffer

        // Decode the image into a Tensor
        let imgTensor = tf.node.decodeImage(imageBuffer, 3)
            .div(tf.scalar(255.0)) // Normalize
            .expandDims(0); // Add batch dimension

        // Predict
        const predictions = model.predict(imgTensor);
        const predictedIndex = predictions.argMax(1).dataSync()[0];

        // Get class label
        const className = classLabels[predictedIndex];
        return className;
    } catch (error) {
        console.error("Error processing image:", error);
        return null;
    }
}

// Function to load the model
async function loadModel() {
    const modelPath = `file://${path.join(__dirname, "model_js/model")}`;
    return await tf.loadLayersModel(modelPath);
}

// Export functions
export default { predictImageClass, loadModel };
