// src/db/models/student/js

import {
    Schema
} from "mongoose";

const studentsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required,
        true,
        enum: ['male', 'female', 'other'],
    },
})
