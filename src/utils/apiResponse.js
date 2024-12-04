// Creating an apiResponse function which makes it easy to send api response by just passing the message, statusCode and data as an argument instead of creating an object everytime.

export default function apiResponse(statusCode = 200, message = "Success", data = {}) {
    return {
        statusCode,
        success: statusCode <= 200,
        message,
        data,
    }
}