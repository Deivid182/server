import { NextFunction, Request, Response } from "express";
import { ObjectEntries, ObjectSchema, parse, ValiError } from "valibot";

export const validateSchema =
  (schema: ObjectSchema<ObjectEntries, undefined>) =>
    (req: Request, res: Response, next: NextFunction) => {

      try {
        console.log(req.body, "middleware schema")
        const result = parse(schema, {
          body: req.body,
          query: req.query,
          params: req.params
        })

        next()
      } catch (err) {
        const error = err as ValiError
        console.log("from middleware")
        // console.log(error.issues.map(issue => issue.path))
        return res.status(400).json(
          error.issues.map(issue => ({
            path: issue.path ? issue.path[0].key : undefined,
            message: issue.message
          }))
        )
      }
    };
