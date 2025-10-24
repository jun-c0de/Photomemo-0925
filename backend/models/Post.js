const express = require('express')
const router = express.router()
const Post = require('../models/Posts')
const jwt = require('jsonwebtoken')
const { presignGet } = require('../src/s3')
const mongoose = require('mongoose')


const postSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        fileUrl: {
            type: [String],
            trim: true
        },
        viewLogs: [
            {
                ip: String,
                userAgent: String,
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }

    },
    {
        timestamps: true
    }
)

const authenticateToken = (req, res, next) => {

    let token = null;

    const h = req.headers.authorization;

    if (h.toLowerCase().startsWith('bearer')) {
        token = h.slice(7).trim()
    }

    if (req.cookies?.token) {
        token = req.cookies.token
    }


    if (!token) return res.status(401).json({ message: '토큰이 없습니다.' })

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(403).json({ message: '유효하지 않은 토큰입니다.' })
    }

}

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, content, fileUrl, imageUrl } = req.body

        if (typeof fileUrl === 'string') {
            try {
                fileUrl = JSON.parse(fileUrl)
            } catch (error) {
                fileUrl = [fileUrl]
            }
        }

        const latest = await Post.findOne().sort({ number: -1 })

        const nextNumber = latest ? latest.number + 1 : 1

        const post = await Post.create({
            user: req.user._id || req.user.id,
            number: nextNumber,
            title,
            content,
            fileUrl,
            imageUrl
        })

        res.status(201).json(post)
    } catch (error) {
        console.error('POST /api/posts 실패:', error)
        res.status(500).json({ message: '서버 오류가 발생했습니다.' })

    }
})



const Post = mongoose.model("Post", postSchema)

module.exports = Post