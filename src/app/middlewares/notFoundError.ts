import { NextFunction, Request, Response } from 'express';

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found"
    });
}

export default notFoundError;