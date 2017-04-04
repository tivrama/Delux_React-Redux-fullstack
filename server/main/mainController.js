var Main = require('./MainModel.js');

module.exports = {

// CATEGORIES:
  // the input is the userID, which in this case will be the parent of the categories we want
  getCategories: function (userID) {
    // find the categories with the given userID and return them
    return Main.Category.find({'ancestors.user': userID}, function (err, categories) {
      if (err) {
        console.log('err in controller getCategories fn: ', err);
        return err;
      }
      return categories;
    });
  },

  addCategory: function (data) {
    // create a new subcategory from the category model
    var newCategory = Main.Category({
      name: data.name,
      ancestors: {
        user: data.userID,
      },
    });

    // save that new entry to the db, and return whatever its callback returns
    return newCategory.save(function (err, savedCategory) {
      if (err) {
        console.log('err in controller addCategory fn: ', err);
        return err;
      }
      console.log('Success saving category to db: ', savedCategory);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  updateCategory: function (category, next) {
    var query = { _id: category.categoryID };
    var update = {
      name: category.type,
      ancestors: {
        user: category.userID,
      },
    };
    return Main.Category.update(query, update, function (err, success) {
      if (err) {
        console.log('err in controller updateEntry fn: ', err);
        next(err);
        return;
      }
      console.log('success: ', success);
      next(success);
      return;
    });
  },

  deleteCategory: function (category, next) {
    console.log('Inside deletesubcategory Controller: ', category);
    var query = { _id: category.categoryID };

    return Main.Category.remove(query, function (err) {
      if (err) {
        console.log('err in controller delete category fn: ', err);
        next(err);
        return;
      } else {
        console.log('Success deleting category');
        next();
        return;
      }
    });
  },

// SUBCATEGORIES:
  // the input is the categoryID, which in this case will be the parent of the subcats we want
  getSubcategories: function (categoryID) {
    // find the subcategories with the given categoryID and return them
    return Main.Subcategory.find({'ancestors.category': categoryID}, function (err, subcategories) {
      if (err) {
        console.log('err in controller getSubcategories fn: ', err);
        return err;
      }
      return subcategories;
    });
  },

  addSubcategory: function (data) {
    // create a new subcategory from the model
    var newSubcategory = Main.Subcategory({
      name: data.name,
      description: data.description,
      ancestors: {
        user: data.userID,
        category: data.categoryID,
      },
    });

    // save that new entry to the db, and return whatever its callback returns
    return newSubcategory.save(function (err, savedSubcategory) {
      if (err) {
        console.log('err in controller addSubcategory fn: ', err);
        return err;
      }
      console.log('Success saving subcategory to db: ', savedSubcategory);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  updateSubcategory: function (subcategory, next) {
    var query = { _id: subcategory.subcategoryID };
    var update = {
      name: subcategory.name,
      description: subcategory.description,
    };
    return Main.Subcategory.update(query, update, function (err, success) {
      if (err) {
        console.log('err in controller updateEntry fn: ', err);
        next(err);
        return;
      }
      console.log('success: ', success);
      next(success);
      return;
    });
  },

  deleteSubcategory: function (subcategory, next) {
    console.log('Inside deletesubcategory Controller: ', subcategory);
    var query = { _id: subcategory.subcategoryID };

    return Main.Subcategory.remove(query, function (err) {
      if (err) {
        console.log('err in controller delete subcategory fn: ', err);
        next(err);
        return;
      } else {
        console.log('Success deleting subcategory');
        next();
        return;
      }
    });
  },

//ENTRIES
  // the input is the subcategoryID, which in this case will be the parent of the entries we want
  getEntries: function (subcategoryID) {
    // find the entries with the given subcategoryID and return them
    return Main.Entry.find({'ancestors.subcategory': subcategoryID}, function (err, entries) {
      if (err) {
        console.log('err in controller getEntries fn: ', err);
        return err;
      }
      return entries;
    });
  },

  addEntry: function (data) {
    // create a new entry from the model
    var newEntry = Main.Entry({
      type: data.type,
      notes: data.notes,
      rating: data.rating,
      ancestors: {
        user: data.userID,
        category: data.categoryID,
        subcategory: data.subcategoryID,
      },
    });

    // save that new entry to the db, and return whatever its callback returns
    return newEntry.save(function (err, savedEntry) {
      if (err) {
        console.log('err in controller addEntry fn: ', err);
        return err;
      }
      console.log('Success saving entry to db: ', savedEntry);
      // Since our POSTs return all the entries, which we get as a promise in the route itself, we don't need to return anything
    });
  },

  updateEntry: function (entry, next) {
    console.log('Inside updateEntry Controller: ', entry);
    var query = { _id: entry._id };
    var update = {
      type: entry.type,
      notes: entry.notes,
      rating: entry.rating,
    };
    return Main.Entry.update(query, update, function (err, success) {
      if (err) {
        next(err);
        console.log('err in controller updateEntry fn: ', err);
        return;
      }
      next(success);
      console.log('success: ', success);
      return; //success;
    });
  },

  deleteEntry: function (entry, next) {
    console.log('Inside deleteEntry Controller: ', entry);
    var query = { _id: entry._id };

    return Main.Entry.remove(query, function (err) {
      if (err) {
        console.log('err in controller deleteEntry fn: ', err);
        next(err);
        return;
      } else {
        console.log('Success deleting entry');
        next();
        return;
      }
    });
  },

};
