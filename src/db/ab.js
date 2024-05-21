const express = require('express');
const app = express();

// Define an asynchronous operation (for example, a database query)
const someAsyncOperation = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve("Operation succeeded");
            } else {
                reject(new Error("Operation failed"));
            }
        }, 1000);
    });
};

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};


var x = asyncHandler( async (req, res, next) => {
    const result = await someAsyncOperation();
    res.send(result);
})


app.get('/some-route', );

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



var higher = (functions) => {
    return (a, b) => {
        console.log('Hello World');
    }
}

const returnedFunction = higher();
