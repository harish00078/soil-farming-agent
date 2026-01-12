require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Soil = require('./models/Soil');
const Distributor = require('./models/Distributor');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    // Check if an admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists. No action taken.');
      return;
    }

    // Ensure required environment variables are set
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    if (!adminPassword) {
      console.error('Error: ADMIN_PASSWORD environment variable is not set.');
      console.log('Please set a secure password for the admin account.');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the new admin user
    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Default admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log('Password: [Set from your ADMIN_PASSWORD environment variable]');

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

const seedData = async () => {
  try {
    // Clear existing data to ensure a clean slate with the new larger dataset
    await Soil.deleteMany({});
    await Distributor.deleteMany({});
    console.log('Cleared existing Soil and Distributor data.');

    console.log('Seeding large sample dataset...');

    const distributorData = [
      { name: "AgriTech Solutions", location: "California, USA", contact: "contact@agritech.com", products: ["Fertilizers", "Seeds"] },
      { name: "GreenEarth Supplies", location: "Texas, USA", contact: "info@greenearth.com", products: ["Pesticides", "Tools"] },
      { name: "FarmHelp Distributors", location: "Florida, USA", contact: "support@farmhelp.com", products: ["Machinery", "Soil Enhancers"] },
      { name: "Nature's Best Agro", location: "Oregon, USA", contact: "sales@naturesbest.com", products: ["Organic Compost", "Bio-pesticides"] },
      { name: "Global Soil Systems", location: "Nevada, USA", contact: "hello@globalsoil.com", products: ["Soil Testing Kits", "Irrigation"] },
      { name: "EcoFarm Partners", location: "Washington, USA", contact: "eco@farmpartners.com", products: ["Sustainable Seeds", "Greenhouse Tech"] },
      { name: "HarvestTime Logistics", location: "Iowa, USA", contact: "logistics@harvesttime.com", products: ["Heavy Machinery", "Harvest Tools"] },
      { name: "CropCircle Supply Co.", location: "Kansas, USA", contact: "support@cropcircle.com", products: ["Drone Sprayers", "Sensors"] }
    ];

    const createdDistributors = await Distributor.insertMany(distributorData);
    const allDistributorIds = createdDistributors.map(d => d._id);

    // Helper to get random distributors (min 3)
    const getRandomDistributors = () => {
      const shuffled = [...allDistributorIds].sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 3) + 3; // Randomly pick 3 to 5
      return shuffled.slice(0, count);
    };

    const soilData = [
      { name: "Loamy Soil", description: "Ideal for most crops, rich in nutrients and holds water well.", crops: ["Wheat", "Cotton", "Sugarcane", "Peppers"], phLevel: "6.0 - 7.0" },
      { name: "Sandy Soil", description: "Warm, light, dry and tends to be acidic. Low nutrients.", crops: ["Carrots", "Potatoes", "Watermelon", "Peanuts"], phLevel: "5.5 - 6.5" },
      { name: "Clay Soil", description: "Heavy soil that benefits from high nutrient content. Retains water.", crops: ["Broccoli", "Brussels Sprouts", "Cabbage", "Cauliflower"], phLevel: "6.2 - 7.0" },
      { name: "Silt Soil", description: "Smooth and soapy to the touch. Retains water better than sand.", crops: ["Tomatoes", "Lettuce", "Grass", "Willow"], phLevel: "6.0 - 7.5" },
      { name: "Peat Soil", description: "Dark brown or black, soft, easily compressed, rich in organic matter.", crops: ["Sphagnum Moss", "Root Crops", "Salad Greens"], phLevel: "4.0 - 5.5" },
      { name: "Chalk Soil", description: "Stony and free draining, often overlays chalk or limestone bedrock.", crops: ["Spinach", "Beets", "Sweet Corn", "Lilac"], phLevel: "7.1 - 8.0" },
      { name: "Alluvial Soil", description: "Fertile soil deposited by surface water.", crops: ["Rice", "Wheat", "Sugarcane", "Jute"], phLevel: "6.5 - 8.0" },
      { name: "Black Soil (Regur)", description: "Rich in clay, retains moisture, ideal for cotton.", crops: ["Cotton", "Citrus", "Tobacco", "Millets"], phLevel: "7.0 - 8.5" },
      { name: "Red Soil", description: "Rich in iron, porous structure. Needs irrigation.", crops: ["Groundnut", "Potato", "Maize", "Ragi"], phLevel: "5.5 - 7.0" },
      { name: "Laterite Soil", description: "Rich in iron and aluminum, forms in tropical areas.", crops: ["Tea", "Coffee", "Cashew", "Rubber"], phLevel: "4.5 - 6.5" },
      { name: "Desert Soil", description: "Sandy, low organic matter, high soluble salts.", crops: ["Cactus", "Date Palms", "Millet", "Barley"], phLevel: "7.5 - 9.0" },
      { name: "Mountain Soil", description: "Rich in humus but thin layer. Varies with altitude.", crops: ["Apples", "Pears", "Plums", "Tea"], phLevel: "5.0 - 6.5" },
      { name: "Saline Soil", description: "High salt content, poor for most crops.", crops: ["Barley", "Sugarbeet", "Date Palm"], phLevel: "8.5 - 10.0" },
      { name: "Marshy Soil", description: "Heavy, black, and highly acidic. Rich in organic matter.", crops: ["Mangroves", "Jute", "Rice"], phLevel: "3.5 - 5.0" },
      { name: "Podzol Soil", description: "Acidic soil typical of coniferous forests.", crops: ["Oats", "Rye", "Potatoes", "Berries"], phLevel: "4.0 - 5.0" },
      { name: "Chernozem", description: "Black-colored soil containing a high percentage of humus.", crops: ["Wheat", "Barley", "Corn", "Sunflowers"], phLevel: "6.5 - 7.5" },
      { name: "Andisols", description: "Formed from volcanic ash, high water holding capacity.", crops: ["Coffee", "Sugar Cane", "Tropical Fruits"], phLevel: "5.5 - 6.5" },
      { name: "Gleysols", description: "Wetland soils that are saturated with groundwater.", crops: ["Rice", "Taro", "Water Spinach"], phLevel: "6.0 - 7.0" },
      { name: "Ferralsols", description: "Deep, intensely weathered red or yellow soils of the humid tropics.", crops: ["Oil Palm", "Cocoa", "Rubber"], phLevel: "4.5 - 5.5" },
      { name: "Vertisols", description: "Churning heavy clay soils with high proportion of swelling clays.", crops: ["Sorghum", "Cotton", "Chickpeas"], phLevel: "6.0 - 8.0" }
    ];

    const soilsWithDistributors = soilData.map(soil => ({
      ...soil,
      distributors: getRandomDistributors()
    }));

    await Soil.insertMany(soilsWithDistributors);

    console.log(`Successfully seeded ${createdDistributors.length} distributors and ${soilsWithDistributors.length} soils!`);
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

const seedAll = async () => {
  await seedAdmin();
  await seedData();
};

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedAll();
    } catch (err) {
      console.error(err);
    } finally {
      mongoose.connection.close();
    }
  })();
}

module.exports = seedAll;
