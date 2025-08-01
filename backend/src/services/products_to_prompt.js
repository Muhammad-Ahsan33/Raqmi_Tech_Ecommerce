import fs from "fs";

const SYSTEM_PROMPT_FILE = "system_prompt.txt";

/**
 * Adds a product under its category and sub-category in the system prompt file.
 * Only includes attributes that are non-null and non-empty.
 * @param {Object} product - Product object from the database
 */
function updateSystemPrompt(product) {
    const {
        product_name,
        category,
        sub_category,
        discounted_price,
        actual_price,
        discount_percentage,
        rating,
        rating_count,
        description,
        product_link,
        ...attributes // Capture all other attributes dynamically
    } = product;

    // Read the existing system prompt file
    let systemPrompt = fs.existsSync(SYSTEM_PROMPT_FILE)
        ? fs.readFileSync(SYSTEM_PROMPT_FILE, "utf-8")
        : "";

    const lines = systemPrompt.split("\n");
    let categoryIndex = -1;
    let subCategoryIndex = -1;

    // Find if category exists
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase() === `${category.toLowerCase()}:`) {
            categoryIndex = i;
            break;
        }
    }

    if (categoryIndex !== -1) {
        // Find if sub-category exists under category
        for (let i = categoryIndex + 1; i < lines.length; i++) {
            if (lines[i].toLowerCase() === `  ${sub_category.toLowerCase()}:`) {
                subCategoryIndex = i;
                break;
            }
            if (lines[i] === "" || lines[i][0] !== " ") break; // Stop if a new category starts
        }
    }

    // Construct product entry
    let productEntry = `    - ${product_name} (Discounted: $${discounted_price}, Actual: $${actual_price}, Discount: ${discount_percentage}%, Rating: ${rating}⭐ (${rating_count} reviews))`;

    if (description) productEntry += `\n      Description: ${description}`;
    if (product_link) productEntry += `\n      Link: ${product_link}`;

    // Add only non-null attributes dynamically
    for (const [key, value] of Object.entries(attributes)) {
        if (value !== null && value !== undefined && value !== "") {
            let formattedKey = key.replace(/_/g, " "); // Convert snake_case to normal text
            formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1); // Capitalize first letter
            productEntry += `\n      ${formattedKey}: ${value}`;
        }
    }

    if (subCategoryIndex !== -1) {
        // Sub-category exists, add product under it
        lines.splice(subCategoryIndex + 1, 0, productEntry);
    } else if (categoryIndex !== -1) {
        // Category exists but sub-category does not
        lines.splice(categoryIndex + 1, 0, `  ${sub_category}:`, productEntry);
    } else {
        // Neither category nor sub-category exists
        lines.push(`${category}:`, `  ${sub_category}:`, productEntry);
    }

    // Write updated content back to the file
    fs.writeFileSync(SYSTEM_PROMPT_FILE, lines.join("\n"), "utf-8");
    console.log(`System prompt updated with new product: ${product_name}`);
}

export default updateSystemPrompt;
