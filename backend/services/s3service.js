const aws = require( 'aws-sdk');

const crypto =require('crypto')
const { query} = require("express");
var main = require("../server")
const mysql = require('mysql');
var express = require('express');
var app= main.app;
var router = express.Router();


const region = "us-east-2"
const bucketName = "etsyproto"
const accessKeyId = "AKIAY4GW4OHN6XLAVW6X"
const secretAccessKey = "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"

const s3Controller = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

exports.imageUpload = async ( result) => {
    const server_url = await generateUploadURL()
    result(null,server_url)
}

async function generateUploadURL() {
    const rawBytes = await crypto.randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 120
    })

    const uploadURL = await s3Controller.getSignedUrlPromise('putObject', params)
    return uploadURL;
}
