// Creating an asyncHandler to tackle all the async and sync controllers as well appropriately

export default function asyncHandler(reqHandler) {
    return function (req, res, next) {
        Promise.resolve(reqHandler(req, res)).catch(next);
    }
}