const dbo = require('../db/connection');

class Movie {
    static async addMovie(movie) {
        const db = await dbo.getDb();
        return db.collection('movies').insertOne(movie);
    }

    static async getMovies() {
        const db = await dbo.getDb();
        return db.collection('movies').find().toArray();
    }

    static async getMovie(id) {
        const db = await dbo.getDb();
        return db.collection('movies').findOne({ _id: id });
    }

    static async getMovieByName(name) {
        const db = await dbo.getDb();

        let requestValues = name.split(' ');
        requestValues = requestValues.map(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        })

        let movies = [];

        for (const value of requestValues) {
            const movie = await db.collection('movies')
                .find({ 'name': { '$regex': value } })
                .toArray();
            if (movie) {
                movies = movies.concat(movie);
            }
        }
        if (requestValues.lenght > 1) {
            const search = movies.reduce((acc, movie) => {
                acc[movie.name] = ++acc[movie.name] || 0;
                return acc;
            }, {});

            let data = movies.filter((movie) => {
                return search[movie.name];
            });

            let hash = {};

            data = data.filter(o => {
                let hashoid = hash[o.id];
                return hashoid ? false : true
            });

            return data
        } else {
            return movies;
        }
    }

    static async updateMovie(id, movie) {
        const db = await dbo.getDb();
        return db.collection('movies').updateOne({ _id: id }, { $set: movie });
    }

    static async deleteMovie(id) {
        const db = await dbo.getDb();
        return db.collection('movies').deleteOne({ _id: id });
    }

    static async getMoviesByCategory(categoryId) {
        const db = await dbo.getDb();
        return db.collection('movies').find({ categoryId: categoryId }).toArray();
    }
}

module.exports = Movie;