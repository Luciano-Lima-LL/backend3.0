const CategoryController = require('../controllers/CategoryController'); 

const routerCategory = express.Router();

routerCategory.get('/', (req , res) => {

})

routerCategory.get('/v1/category/search', CategoryController.getCategories);
routerCategory.get('/v1/category/:id', CategoryController.getCategoryById);
routerCategory.post('/v1/category', CategoryController.createCategory);
routerCategory.put('/v1/category/:id', CategoryController.updateCategory);
routerCategory.delete('/v1/category/:id', CategoryController.deleteCategory);

module.exports = {routerCategory}; 