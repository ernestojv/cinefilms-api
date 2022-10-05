const boom = require('@hapi/boom');
const Category = require('../models/category.model');

class CategoryService {
    async addCategory(category) {
        const existingCategory = await Category.getCategoryByName(category.name);
        if (existingCategory) {
            throw boom.conflict('Category already exists');
        }
        return Category.addCategory(category);
    }

    async getCategories() {
        return Category.getCategories();
    }

    async getCategory(id) {
        const category = await Category.getCategory(id);
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return category;
    }

    async getCategoryByName(name) {
        const category = await Category.getCategoryByName(name);
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return category;
    }

    async updateCategory(id, category) {
        const oldCategory = await Category.getCategory(id);
        if (!oldCategory) {
            throw boom.notFound('Category not found');
        }
        return Category.updateCategory(id, category);
    }

    async deleteCategory(id) {
        const category = await Category.getCategory(id);
        if (!category) {
            throw boom.notFound('Category not found');
        }
        return Category.deleteCategory(id);
    }
}

module.exports = CategoryService;